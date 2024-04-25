import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

export interface RequestOptions {
  /**
   * request pathname
   */
  baseApiUrl?: string | (() => string);
  /**
   * 是否加入url前缀
   * Default is `false`.
   */
  applyUrlPrefix?: boolean;
  /**
   * url前缀
   */
  urlPrefix?: string;
  /**
   * 错误消息提示类型
   * Default is `'none'`.
   */
  errorMessageMode?: ErrorMessageMode;
  /**
   * 请求超时提示信息
   * Default is `服务超时，请稍后重试`.
   */
  timeOutMsg?: string;
  /**
   * 是否在请求头中携带token。
   * Default is `true`.
   */
  includeToken?: boolean;
  /**
   * 要添加到令牌中的授权方案前缀
   * Default is ``.
   */
  authSchemePrefix?: string;
  /**
   * 将请求参数拼接到url（注意：它会把params与data中的参数全部拼接到url上）
   * Default is `false`.
   */
  attachParamsToUrl?: boolean;
  /**
   * 如果是moment类型的日期，是否格式化成字符串
   * Default is `false`.
   */
  formatRequestMomentDates?: boolean;
  /**
   * 是否在pathname后面添加时间戳
   * Default is `true`.
   */
  appendTimestamp?: boolean;
  /**
   * 是否取消重复请求
   * Default is `false`.
   */
  cancelDuplicateRequest?: boolean;
  /**
   * 是否直接返回axios原生的数据
   * Default is `false`.
   */
  returnAxiosResponse?: boolean;
  /**
   * 是否直接直接返回接口响应数据，不进行任何处理（接口返回什么，调用请求的函数拿到的就是什么）
   * Default is `false`.
   */
  returnRequestResponse?: boolean;
  /**
   * 当状http status 为200时，业务状态码非200时是否把接口的返回值直接作为错误信息进行抛出，
   * 抛出的 error 为 axios 的 response.data 对象（接口的response）
   * Default is `false`.
   */
  throwOnBusinessError?: boolean;
  /**
   * 当请求过期时，用于判断是否需要刷新token（值为刷新token的pathname）
   */
  refreshTokenServiceUrl?: string;
  /**
   * 用于配置接口验签请求头，防止接口被篡改
   */
  headerVerifySignature?: {
    key: string;
  };
  // 此项目业务相关配置参数（授权值为固定参数）
  alwaysAuthorize?: string;
}

export interface Result<T = any> {
  code: number;
  msg: string;
  message?: string;
  data?: T;
}

// multipart/form-data: upload file
export interface RequestUploadFileOptions {
  // Other parameters
  data?: Record<string, any>;
  // File parameter interface field name
  name?: string;
  // file name
  file: File | Blob;
  // file name
  filename?: string;
  [key: string]: any;
}

export interface UploadApiResult {
  message: string;
  code: number;
  url: string;
}

export interface ContextOptions {
  /**
   * 用于获取token
   */
  getTokenFunction?: () => Nullable<string>;

  /**
   * 用于获取refreshToken
   */
  getRefreshTokenFunction?: () => Nullable<string>;

  /**
   * 当token过期时，用于刷新token
   */
  refreshTokenFunction?: () => Promise<any>;

  /**
   * NOTE: 新增了 refreshToken 功能后，403 由后端定义专门用来处理 token 过期的状态码，具体由什么原因导致的 403，由 data.code 字段来区分
   * 此处新增的 refreshTokenErrorFunction 是为了防止后期后端修改了 403 的含义，导致前端无法正常处理，如果 403 的定义不变，可以直接使用 httpForbiddenFunction 来处理
   *
   * 建议当前使用此函数来用户用处身份过期的情况（确保 403 请求只会存在于用户身份过期这一种情况）
   */
  refreshTokenErrorFunction?: () => void;

  /**
   * 当 http status  = 401 时会触发此函数
   */
  httpUnauthorizedFunction?: <T>(response: AxiosResponse<T>, message: string) => void;

  /**
   * http status 403
   */
  httpForbiddenFunction?: <T>(response: AxiosResponse<T>, message: string) => void;

  // 业务状态码 401（response.code）
  unauthorizedFunction?: <T>(response: AxiosResponse<T>, message: string) => void;

  // 业务状态码 403（response.code）
  forbiddenFunction?: <T>(response: AxiosResponse<T>, message: string) => void;

  handleHttpStateErrorFunction?: <T>(
    response: AxiosResponse<T>,
    message: string,
    errorMessageMode: ErrorMessageMode,
  ) => void;

  /**
   *
   */
  errorMessageFunction?: <T>(response: AxiosResponse<T>, message: string) => void;

  errorModalFunction?: <T>(
    response: AxiosResponse<T>,
    modalInfo: { title: string; content: string },
  ) => void;

  errorLogFunction?: <T>(response: AxiosResponse<T>, error: any) => void;

  timeoutFunction?: <T>(response: AxiosResponse<T>, message: string) => void;
}

export interface ExpiredRequestTask {
  config: AxiosRequestConfig;
  resolve: Function;
}
