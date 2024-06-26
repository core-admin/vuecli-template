import { AxiosResponse } from 'axios';
import type { ErrorMessageMode, ContextOptions } from './types';

interface CheckStatusProps {
  status: number;
  msg: string;
  errorMessageMode?: ErrorMessageMode;
  context?: ContextOptions;
  response: AxiosResponse;
}

// 校验http错误状态码
export function checkStatus({
  status,
  msg,
  context,
  response,
  errorMessageMode = 'message',
}: CheckStatusProps): {
  code: number;
  errMessage?: string;
  hook?: () => any;
} {
  let errMessage = '';
  let hook: () => any | undefined;

  switch (status) {
    case 400:
      errMessage = msg || '请求参数与服务器不匹配，请检查';
      break;
    case 401:
      errMessage = '身份验证无效或过期，请重新登录';
      hook = () => context?.httpUnauthorizedFunction?.(response, errMessage);
      break;
    case 403:
      errMessage = msg || '没有权限访问该资源';
      hook = () => context?.httpForbiddenFunction?.(response, errMessage);
      break;
    // 404请求不存在
    case 404:
      errMessage = '网络请求错误，未找到该资源';
      break;
    case 405:
      errMessage = '网络请求错误，请求方法未允许';
      break;
    case 408:
      errMessage = '网络请求超时';
      break;
    case 500:
      errMessage = msg || '服务器错误,请联系管理员!';
      break;
    case 501:
      errMessage = '网络未实现';
      break;
    case 502:
      errMessage = '服务网关或代理错误';
      break;
    case 503:
      errMessage = '服务不可用，服务器暂时过载或维护';
      break;
    case 504:
      errMessage = '网络超时';
      break;
    case 505:
      errMessage = 'http版本不支持该请求';
      break;
    default:
  }
  if (errMessage) {
    hook = () => context?.handleHttpStateErrorFunction?.(response!, errMessage, errorMessageMode);
  }

  return {
    code: status,
    errMessage: errMessage || undefined,
    // @ts-expect-error
    hook: hook || undefined,
  };
}
