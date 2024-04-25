import type {
  AxiosResponse,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosInstance,
  AxiosError,
} from 'axios';
import type { AxiosTransform, CreateAxiosOptions } from './axios-transform';
import type { RequestOptions, Result, ContextOptions, ExpiredRequestTask } from './types';
import { cloneDeep, merge, isString, isFunction, clone } from 'lodash-es';
import { VAxios } from './Axios';
import { checkStatus } from './check-http-status';
import { setObjToUrlParams } from '@/utils/bom';
import { RequestEnum, ResultEnum, ContentTypeEnum } from './enums';
import { joinTimestamp, formatRequestDate, buildHeaderVerifySignatureData } from './helper';
import { defaultContext } from '../brideg';
import { isEmpty } from '@/utils/is';

let isTokenRefreshing = false;
const expiredRequestQueue: ExpiredRequestTask[] = [];

// 数据处理，方便区分多种处理方式
const transform: AxiosTransform = {
  /**
   * 请求之前处理（根据传递的options，处理请求数据的格式、拼接url、转换数据等）
   * 此函数仅处理数据，此处与axios配置无关
   */
  beforeRequestHook(config: AxiosRequestConfig, options: RequestOptions) {
    const {
      baseApiUrl,
      attachParamsToUrl = false,
      applyUrlPrefix,
      urlPrefix,
      formatRequestMomentDates = false,
      appendTimestamp = true,
    } = options;

    let baseUrl = '';

    // 处理url请求地址
    if (baseApiUrl) {
      baseUrl = isString(baseApiUrl) ? baseApiUrl : isFunction(baseApiUrl) ? baseApiUrl?.() : '';
    }
    if (applyUrlPrefix) {
      urlPrefix ? (baseUrl += urlPrefix) : null;
    }
    config.url = `${baseUrl}${config.url ? config.url : ''}`;

    const params = config.params || {};
    const data = config.data || false;

    formatRequestMomentDates && data && !isString(data) && formatRequestDate(data);

    // 处理get类型的请求
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(appendTimestamp, false));
      } else {
        // 兼容restful风格 例：/account/1 >>> /account/1?_t=1636511234276
        config.url = config.url + params + `${joinTimestamp(appendTimestamp, true)}`;
        config.params = undefined;
      }
    } else {
      // 非get请求
      if (!isString(params)) {
        formatRequestMomentDates && formatRequestDate(params);
        if (
          Reflect.has(config, 'data') &&
          config.data &&
          (isEmpty(config.data) || (config.data as any) instanceof FormData)
        ) {
          config.data = data;
        }

        config.params = params;

        if (attachParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data),
          );
        }
      } else {
        /** 兼容restful风格 举例：
         *  define API: { url: '/getlist' }
         *  send request: { params: '/48546/id/45445' }
         *  实际请求的地址：url: '/getlist/48546/id/45445'
         */
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  // 请求拦截器处理
  async requestInterceptors(config: InternalAxiosRequestConfig, options: CreateAxiosOptions) {
    const requestOptions = options.requestOptions || {};
    const {
      headerVerifySignature,
      alwaysAuthorize,
      includeToken = true,
      authSchemePrefix,
    } = requestOptions;

    if (headerVerifySignature && headerVerifySignature.key) {
      Object.assign(
        config.headers,
        await buildHeaderVerifySignatureData(headerVerifySignature.key),
      );
    }

    if (alwaysAuthorize) {
      config.headers['Authorization'] = alwaysAuthorize;
      return config;
    }

    const context = options.contextOptions;
    const token = context?.getTokenFunction?.();
    if (token && includeToken) {
      config.headers.Authorization = authSchemePrefix ? `${authSchemePrefix} ${token}` : token;
    }
    return config;
  },

  // 处理请求过来的数据。如果数据不是预期格式，可直接抛出错误
  transformResponseHook(
    axiosResponse: AxiosResponse<Result>,
    options: RequestOptions,
    context?: ContextOptions,
  ) {
    const {
      returnRequestResponse = false,
      returnAxiosResponse = false,
      throwOnBusinessError = false,
    } = options;
    const { data: businessResponse } = axiosResponse;

    if (returnAxiosResponse) {
      return axiosResponse;
    }
    // 不进行任何处理，直接返回接口响应数据
    if (returnRequestResponse) {
      return businessResponse;
    }

    // 默认情况下，接口响应数据格式中，data字段必须有值，否则抛出错误
    if (!businessResponse) {
      // return '[HTTP] Request has no return value';
      throw new Error('请求出错，请稍候重试');
    }
    //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { code, data: businessResponseData, msg } = businessResponse;

    // 这里逻辑可以根据项目进行修改
    const hasSuccess =
      businessResponse && Reflect.has(businessResponse, 'code') && code === ResultEnum.SUCCESS;
    if (hasSuccess) {
      return businessResponseData;
    }
    /**
     * 在此处根据自己项目的实际情况对不同的code执行不同的操作
     * 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
     */
    let message = '请求出错，请稍候重试';
    switch (code) {
      // 身份验证无效或过期 执行对应的操作
      case ResultEnum.Unauthorized:
        message = '身份验证无效或过期，请重新登录';
        context?.unauthorizedFunction?.(axiosResponse, message);
        break;
      case ResultEnum.Forbidden:
        message = '没有权限访问该资源';
        context?.forbiddenFunction?.(axiosResponse, message);
        break;
      default:
        message = msg || businessResponse.message || message;
    }

    if (options.errorMessageMode === 'modal') {
      context?.errorModalFunction?.(axiosResponse, {
        title: '错误提示',
        content: message,
      });
    } else if (options.errorMessageMode === 'message') {
      context?.errorMessageFunction?.(axiosResponse, message);
    }

    if (throwOnBusinessError) {
      message = businessResponse as any;
    }

    throw new Error(message);
  },

  // 响应拦截器处理
  responseInterceptors(res: AxiosResponse<any>) {
    return res;
  },

  // 响应拦截器错误处理
  // error: AxiosError
  responseInterceptorsCatch(
    axiosInstance: AxiosInstance,
    options: CreateAxiosOptions,
    error: AxiosError,
  ) {
    const { response, code, message } = error || {};
    const { contextOptions: context, requestOptions } = options;
    const { errorMessageMode = 'none', timeOutMsg = '服务超时，请稍后重试' } = requestOptions || {};
    context?.errorLogFunction?.(response!, error);

    const msg: string = (response?.data as any)?.msg ?? '';
    // 浏览器级别的错误信息
    const err: string = error?.toString?.() ?? '';
    let errMessage = '';

    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        errMessage = timeOutMsg;
        context?.timeoutFunction?.(response!, errMessage);
      }
      if (err?.includes('Network Error')) {
        errMessage = '网络不可用，请检查您的网络连接并稍后重试。';
      }

      if (errMessage) {
        if (errorMessageMode === 'modal') {
          context?.errorModalFunction?.(response!, {
            title: '错误提示',
            content: errMessage,
          });
        } else if (errorMessageMode === 'message') {
          context?.errorMessageFunction?.(response!, errMessage);
        }
        throw new Error(errMessage as unknown as string);
      }
    } catch (error) {
      throw new Error((error as unknown as Error).message);
    }

    function defaultErrorHandle() {
      checkStatusRes.hook?.();
      if (checkStatusRes.errMessage) {
        throw new Error(checkStatusRes.errMessage);
      }

      return Promise.reject(error);
    }

    const checkStatusRes = checkStatus({
      status: response!.status,
      msg,
      errorMessageMode,
      context,
      response: response!,
    });

    /**
     * 插入接口过期处理逻辑，当接口401时，尝试调用 refreshTokenFunction 刷新接口请求
     */
    const axiosInstanceConfig = response!.config;

    if (!requestOptions?.refreshTokenServiceUrl) {
      return defaultErrorHandle();
    }

    if (
      checkStatusRes.code === 403 &&
      !axiosInstanceConfig.url?.includes(requestOptions.refreshTokenServiceUrl)
    ) {
      if (!isTokenRefreshing) {
        isTokenRefreshing = true;

        const refreshToken = context?.getRefreshTokenFunction?.();
        if (!refreshToken) {
          context?.refreshTokenErrorFunction?.();
          return Promise.reject(error);
        }

        return context
          ?.refreshTokenFunction?.()
          .then(() => {
            isTokenRefreshing = false;
            const p = axiosInstance(axiosInstanceConfig);
            while (expiredRequestQueue.length) {
              const request = expiredRequestQueue.shift();
              request?.resolve(axiosInstance(request.config));
            }
            return p;
          })
          .catch(() => {
            isTokenRefreshing = false;
            expiredRequestQueue.length = 0;
            return Promise.reject(error);
          });
      } else {
        return new Promise(resolve => {
          expiredRequestQueue.push({
            resolve,
            config: axiosInstanceConfig,
          });
        });
      }
    } else if (
      checkStatusRes.code === 403 &&
      axiosInstanceConfig.url?.includes(requestOptions.refreshTokenServiceUrl)
    ) {
      isTokenRefreshing = false;
      expiredRequestQueue.length = 0;
      context?.refreshTokenErrorFunction?.();
      return Promise.reject(error);
    }

    return defaultErrorHandle();
  },
};

export const defaultInitAxiosOptions: CreateAxiosOptions = {
  timeout: 30 * 1000,
  headers: { 'Content-Type': ContentTypeEnum.JSON },
  transform: clone(transform),
  // 配置项，下面的选项都可以在独立的接口请求中覆盖
  requestOptions: {
    authSchemePrefix: 'bearer',
    errorMessageMode: 'message',
  },
  contextOptions: defaultContext,
};

export function createAxios(opt: Partial<CreateAxiosOptions> = {}) {
  return new VAxios(merge(cloneDeep(defaultInitAxiosOptions), opt));
}
