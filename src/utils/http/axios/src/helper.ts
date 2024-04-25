import { isObject, isString } from '@/utils/is';
import { nanoid } from 'nanoid';
import MD5 from 'crypto-js/md5';
import { getFingerprintID } from '@/utils/fingerprint';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

// 重载签名要么全部导出 要么全部都不导出
// 往axios的params参数里添加当前时间戳
export function joinTimestamp<T extends boolean>(
  join: boolean,
  restful: T,
): T extends true ? string : object;
export function joinTimestamp(join: boolean, restful = false): string | object {
  // 不添加时间戳
  if (!join) {
    return restful ? '' : {};
  }
  const now = new Date().getTime();
  if (restful) {
    return `?_t=${now}`;
  }
  return { _t: now };
}

// 处理二次包装的时间对象
export function formatRequestDate(params: Recordable) {
  if (!isObject(params)) {
    return;
  }
  for (const key in params) {
    const format = params[key]?.format ?? null;
    if (format && typeof format === 'function') {
      // @ts-ignore
      params[key] = params[key].format(DATE_TIME_FORMAT);
    }
    if (isString(key)) {
      const value = params[key];
      if (value) {
        try {
          // 对字符串的值进行trim处理
          params[key] = isString(value) ? value.trim() : value;
        } catch (error: any) {
          throw new Error(error);
        }
      }
    }
    // 如果value是对象，进行二次处理（递归处理）
    if (isObject(params[key])) {
      formatRequestDate(params[key]);
    }
  }
}

export async function generHeaderVerifySignature(key: string) {
  const timestamp = Date.now();
  const nonce = nanoid(10);
  const fingerprintID = await getFingerprintID();
  const signature = MD5(`${key}${timestamp}${nonce}${fingerprintID}`).toString();
  return {
    key,
    timestamp,
    nonce,
    fingerprintID,
    signature,
  };
}

export async function buildHeaderVerifySignatureData(key: string) {
  const { timestamp, nonce, fingerprintID, signature } = await generHeaderVerifySignature(key);

  return {
    'X-Timestamp': timestamp,
    'X-Nonce': nonce,
    'X-Fingerprint': fingerprintID,
    'X-Signature': signature,
  };
}
