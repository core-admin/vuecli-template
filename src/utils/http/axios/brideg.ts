/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ContextOptions } from './src/types';

export let defaultContext: ContextOptions = {
  // message 形式的请求错误处理函数
  errorMessageFunction: (response, message) => {
    // some code
  },
  // 请求错误 弹窗的形式 modal
  errorModalFunction: (response, { title, content }) => {
    // some code
  },
  // 调用时机为axios响应拦截器错误处理函数执行时，一般用于记录错误日志
  errorLogFunction: () => {},
  // axios checkStatus 函数存在错误信息时执行的回调函数
  handleHttpStateErrorFunction: (response, message, errorMessageMode) => {
    // some code
  },
  // 超时处理函数
  timeoutFunction: (response, message) => {
    // some code
  },

  // http status 401 错误处理函数
  httpUnauthorizedFunction: (response, message) => {
    // some code
  },
  // 业务状态码 code 401 错误处理函数
  unauthorizedFunction: (response, message) => {
    // some code
  },
  // http status 403 错误处理函数
  httpForbiddenFunction: (response, message) => {
    // some code
  },
  // 业务状态码 code 403 错误处理函数
  forbiddenFunction: (response, message) => {
    // some code
  },

  getTokenFunction: () => undefined,
};
