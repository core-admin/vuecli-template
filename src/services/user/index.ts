export * from './type';
import { defaultRequest as request } from '@/utils/request/default-request';
import { REFRESH_TOKEN_URL } from '@/configs/constant';
import { AuthToken } from './type';

export function refreshTokenApi(refreshToken: string) {
  return request.get<AuthToken>(
    {
      url: REFRESH_TOKEN_URL,
      params: { refreshToken },
    },
    {
      errorMessageMode: 'none',
      includeToken: false,
    },
  );
}
