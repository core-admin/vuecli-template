import { name, version } from '../../package.json';
import { snakeCase } from 'lodash-es';

export function getEnv() {
  const {
    NODE_ENV,
    VUE_APP_ENV_MODE,
    VUE_APP_APP_TITLE,
    VUE_APP_DEFAULT_REQUEST_URL,
    VUE_APP_OBS_DEFAULT_BUCKET_NAME,
    VUE_APP_OFFICE_WEB_365_URL,
    VUE_APP_HUAWEI_SITE_MONITOR_APPID,
  } = process.env as NodeJS.ProcessEnv;

  return {
    NODE_ENV,
    VUE_APP_ENV_MODE,
    VUE_APP_APP_TITLE,
    VUE_APP_DEFAULT_REQUEST_URL,
    VUE_APP_OBS_DEFAULT_BUCKET_NAME,
    VUE_APP_OFFICE_WEB_365_URL,
    VUE_APP_HUAWEI_SITE_MONITOR_APPID,
  };
}

export function isDevMode(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function isProdMode(): boolean {
  return process.env.NODE_ENV === 'production';
}

export function getCurrentEnvMode() {
  return process.env.VUE_APP_ENV_MODE;
}

// 公共的缓存前缀
export function getCommonStoragePrefix() {
  return `${snakeCase(name)}__${getCurrentEnvMode()}`.toUpperCase();
}

// 本地缓存使用的键名
export function getStorageShortName() {
  return `${getCommonStoragePrefix()}${`__${version}`}__`.toUpperCase();
}

/**
 * 业务缓存使用的键名
 */
export function businesseStorageShortName(key: string) {
  return `${getCommonStoragePrefix()}__${key}`;
}
