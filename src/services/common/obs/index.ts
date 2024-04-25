export * from './type';
import { defaultRequest as request } from '@/utils/request/default-request';
import { ObsAccessInfo } from './type';
import { ContentTypeEnum } from '@/utils/http/axios';

/**
 * 获取OBS上传文件的access信息
 */
export function getObsAccessApi(data: { bucketName: string; dir: string }) {
  return request.post<ObsAccessInfo>(
    {
      url: '/obs/get_signature',
      data,
    },
    {
      errorMessageMode: 'none',
    },
  );
}

/**
 * OBS直传文件
 */
export function directUploadObsFileApi(data: FormData, url: string) {
  return request.post<void>(
    {
      data,
      headers: {
        'Content-Type': ContentTypeEnum.FORM_DATA,
      },
    },
    {
      baseApiUrl: url,
      applyUrlPrefix: false,
      returnRequestResponse: true,
      errorMessageMode: 'none',
    },
  );
}
