/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineStore } from 'pinia';
import { pinia } from '@/internal/pinia';
import { TokenInfo, UserInfo, UserInfoData } from '@/types/user';
import { businesseStorageShortName } from '@/utils/env';
import { refreshTokenApi } from '@/services/user';

interface UserState {
  tokenInfo: Nullable<TokenInfo>;
  userInfoData: Nullable<UserInfoData>;
}

export const useUserStore = defineStore({
  id: 'userStore',
  state: (): UserState => ({
    tokenInfo: null,
    userInfoData: null,
  }),
  getters: {
    getAccessToken(state): undefined | string {
      let accessToken = state.tokenInfo?.access_token;
      if (accessToken) {
        return accessToken;
      }
      const tokenInfo = localStorage.getItem(businesseStorageShortName('tokenInfo'));
      if (tokenInfo) {
        const { access_token } = JSON.parse(tokenInfo) as TokenInfo;
        return access_token;
      }
    },
    getRefreshToken(state): undefined | string {
      let refreshToken = state.tokenInfo?.refresh_token;
      if (refreshToken) {
        return refreshToken;
      }
      const tokenInfo = localStorage.getItem(businesseStorageShortName('tokenInfo'));
      if (tokenInfo) {
        const { refresh_token } = JSON.parse(tokenInfo) as TokenInfo;
        return refresh_token;
      }
    },
    getTokenInfo(state): Nullable<TokenInfo> {
      return state.tokenInfo;
    },
    /**
     * 获取当前用户的全部信息（包含其他身份及学校信息）
     */
    getUserInfoData(state): Nullable<UserInfoData> {
      return state.userInfoData;
    },
    getUserSchoolData(): UserInfoData['schoolInfo'] {
      return this.getUserInfoData?.schoolInfo || null;
    },
    /**
     * 仅获取userInfo接口中data字段下的userInfo字段信息
     */
    getUserData(): UserInfo {
      return this.getUserInfoData!.user;
    },
  },
  actions: {
    clearTokenUserAction() {
      this.setTokenInfoAction(null);
    },
    logoutAction() {
      this.clearTokenUserAction();
    },
    setTokenInfoAction(payload: Nullable<TokenInfo>, updateLocalData = true) {
      this.tokenInfo = payload;
      if (updateLocalData) {
        payload
          ? localStorage.setItem(businesseStorageShortName('tokenInfo'), JSON.stringify(payload))
          : localStorage.removeItem(businesseStorageShortName('tokenInfo'));
      }
    },
    refreshTokenAction() {
      const refreshToken = this.getRefreshToken;
      if (!refreshToken) {
        return Promise.reject(new Error('refreshToken为空'));
      }
      return refreshTokenApi(refreshToken).then(({ accessToken, refreshToken }) => {
        this.setTokenInfoAction({ access_token: accessToken, refresh_token: refreshToken });
        return accessToken;
      });
    },
    async getUserInfoDataAction() {
      // some code
    },
    resetStoreAction() {
      this.tokenInfo = null;
      this.userInfoData = null;
      // some code
    },
  },
});

export function useUserStoreWithOut() {
  return useUserStore(pinia);
}
