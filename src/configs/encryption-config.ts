import { isProdMode } from '@/utils/env';

// 系统默认缓存时间（秒）
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

// 系统默认缓存时间（秒）
export const cacheCipher = {
  key: '_yzjx.yyyyxxxx@',
  iv: '@yzjx.yyyyxxxx_',
};

// 系统缓存是否使用 aes 加密
export const enableStorageEncryption = isProdMode();
