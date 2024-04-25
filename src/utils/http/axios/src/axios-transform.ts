// 取消重复拦截可参考：https://juejin.cn/post/6968630178163458084

import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosInstance,
  AxiosError,
} from 'axios';
import type { RequestOptions, Result, ContextOptions } from './types';

export interface CreateAxiosOptions extends AxiosRequestConfig {
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
  contextOptions?: ContextOptions;
}

export abstract class AxiosTransform {
  // 发起请求前的配置
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;

  // 请求成功后的处理
  transformResponseHook?: (
    res: AxiosResponse<Result>,
    options: RequestOptions,
    contenxtOptions?: ContextOptions,
  ) => any;

  // 请求失败处理
  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>;

  // 请求拦截器
  requestInterceptors?: (
    config: InternalAxiosRequestConfig,
    options: CreateAxiosOptions,
  ) => Promise<InternalAxiosRequestConfig>;

  // 响应拦截器（请求之后的拦截器）
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

  // 请求之前的拦截器错误处理
  requestInterceptorsCatch?: (error: Error) => void;

  // 请求之后的拦截器错误处理
  responseInterceptorsCatch?: (
    axiosInstance: AxiosInstance,
    options: CreateAxiosOptions,
    error: AxiosError,
  ) => void;
}
