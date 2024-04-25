import { useUserStoreWithOut } from '@/store/user';
import { ContextOptions, createAxios } from '../http/axios';
import { Message, createErrorAlertModal } from '@/hooks/web/useMessage';
import { getEnv } from '../env';
import { VAxios } from '../http/axios/src/Axios';
import { router } from '@/router';

const userStore = useUserStoreWithOut();

function getDefaultRequestContextOptions(): ContextOptions {
  return {
    getTokenFunction() {
      return userStore.getAccessToken;
    },
    getRefreshTokenFunction() {
      return userStore.getRefreshToken;
    },
    refreshTokenFunction() {
      return userStore.refreshTokenAction();
    },
    refreshTokenErrorFunction() {
      // TODO: 测试代码，使用方自行修改
      userStore.logoutAction();
      Message.error('登录已过期，请重新登录（刷新令牌失效）');
      setTimeout(() => {
        router.replace('/login');
      }, 2000);
    },
    httpUnauthorizedFunction(_response, _message) {
      const userStore = useUserStoreWithOut();
      userStore.logoutAction();
    },
    handleHttpStateErrorFunction(_response, message, errorMessageMode) {
      if (errorMessageMode === 'modal') {
        const instance = createErrorAlertModal({
          header: '错误提示',
          body: message,
          onConfirm() {
            instance.hide();
          },
        });
        return;
      }
      if (errorMessageMode === 'message') {
        Message.error(message);
      }
    },
    // code 401 用户身份过期
    unauthorizedFunction(_response, _message) {
      const userStore = useUserStoreWithOut();
      userStore.logoutAction();
    },
    // code 403 没有权限
    forbiddenFunction(_response, _message) {
      // some code
    },
    errorModalFunction(_response, { title, content }) {
      const instance = createErrorAlertModal({
        header: title || '错误提示',
        body: content,
        onConfirm() {
          instance.hide();
        },
      });
    },
    errorMessageFunction(_response, message) {
      Message.error(message);
    },
  };
}

function _defaultRequest(): VAxios {
  const { VUE_APP_DEFAULT_REQUEST_URL } = getEnv();
  return createAxios({
    headers: {},
    requestOptions: {
      baseApiUrl: VUE_APP_DEFAULT_REQUEST_URL,
    },
    contextOptions: getDefaultRequestContextOptions(),
  });
}

export const defaultRequest = _defaultRequest();
