import type { AxiosRequestConfig } from 'axios';

let pendingMap = new Map<string, AbortController>();

// 存储的标识符以&与请求方式和请求路径进行拼接
export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join('&');

export class AxiosCanceler {
  /**
   * Add request 挂起请求
   */
  addPending(config: AxiosRequestConfig): void {
    this.removePending(config);
    const url = getPendingUrl(config);
    const controller = new AbortController();
    config.signal = config.signal || controller.signal;
    if (!pendingMap.has(url)) {
      // 如果当前请求不在等待中，将其添加到等待中
      pendingMap.set(url, controller);
    }
  }

  /**
   * 清除所有挂起的请求，调用存储的所有cancel方法，然后清空
   */
  removeAllPending() {
    pendingMap.forEach(abortController => {
      if (abortController) {
        abortController.abort();
      }
    });
    this.reset();
  }

  /**
   * Removal request 删除挂起的请求
   */
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);
    if (pendingMap.has(url)) {
      // 如果当前请求在等待中，取消它并将其从等待中移除
      const abortController = pendingMap.get(url);
      if (abortController) {
        abortController.abort(url);
      }
      pendingMap.delete(url);
    }
  }

  /**
   * @description: reset
   */
  reset(): void {
    pendingMap.clear();
  }
}
