/**
 * 华为云 obs 直传
 * 此版本上传文件时，前端权限比较大，拥有对桶的直传权限。（此种方式可能会随着后期的安全性完善而被取代）
 */
import { nanoid } from 'nanoid';
import { parseFileDetail } from '@/utils/file';
import { ObsAccessInfo } from '@/services/common/obs';
import { getObsDomainUrl, getObssecretInfo } from './config';
import { MessagePlugin as Message } from 'tj-design-vue';
import { getEnv } from '../env';
import { directUploadObsFileApi } from '@/services/common/obs';
import { TaskQueue } from '@/utils/task-queue';

const { VUE_APP_OBS_DEFAULT_BUCKET_NAME: _bucketName } = getEnv();

function generatePath(file: File, bucketName?: string) {
  const fileDetail = parseFileDetail(file);
  // TODO: /custom-dir/ 这个为桶的一级目录，后续需要根据业务需求进行修改，也可以删除
  const path = `/custom-dir/${nanoid(10).toLowerCase()}/${fileDetail.fullName}`;
  const obsDomainUrl = getObsDomainUrl(bucketName);
  const obsAccessUrl = `${obsDomainUrl}${path}`;
  const fileParam = {
    fileName: fileDetail.fileName,
    filePath: obsAccessUrl,
    fileFormat: fileDetail.fileSuffix,
    fileSize: fileDetail.size,
  };
  return {
    fileDetail,
    fileParam,
    path,
    obsDomainUrl,
    obsAccessUrl,
  };
}

function structureBaseFormData(file: File, path: string, obsAccessInfo: ObsAccessInfo) {
  const formData = new FormData();
  formData.append('key', path.slice(1));
  formData.append('accessKeyId', obsAccessInfo.accessKeyId);
  formData.append('signature', obsAccessInfo.signature);
  formData.append('policy', obsAccessInfo.policy);
  formData.append('file', file);
  return formData;
}

type ParseFileDetail = ReturnType<typeof parseFileDetail>;

interface FileParamType {
  fileName: string;
  filePath: string;
  fileFormat: string;
  fileSize: number | string;
}

export function uploadObsFile({
  file,
  bucketName = _bucketName,
  showErrorMessage = true,
}: {
  file: File;
  bucketName?: string;
  showErrorMessage?: boolean;
}) {
  return new Promise<{
    fileDetail: ParseFileDetail;
    fileParam: FileParamType;
    obsAccessUrl: string;
  }>((resolve, reject) => {
    const { path, obsDomainUrl, obsAccessUrl, fileDetail, fileParam } = generatePath(
      file,
      bucketName,
    );
    getObssecretInfo({
      bucketName,
      dir: path.slice(1),
    })
      .then(obsAccessInfo => {
        const formData = structureBaseFormData(file, path, obsAccessInfo);
        return directUploadObsFileApi(formData, obsDomainUrl);
      })
      .then(() => {
        resolve({
          fileDetail,
          fileParam,
          obsAccessUrl,
        });
      })
      .catch(() => {
        showErrorMessage && Message.error(`文件：【${fileDetail.fileName}】上传失败，请重试`);
        reject({
          fileDetail,
          obsAccessUrl,
        });
      });
  });
}

/**
 * 多文件上传-优化版本，支持并发上传（设置最大并发次数，浏览器默认情况下同域名最大并发次数为6）
 * 但由于每次上传时都需要获取一次签名，所以并发上传时，签名获取的次数也会增加，默认为3次
 *
 * 获取签名+上传文件等于一次并发数，3次并发，相当于一次发起6个请求
 *
 * 同名文件上传时，默认情况下会覆盖原文件（https://support.huaweicloud.com/obs_faq/obs_faq_0050.html）
 */
export function optimizeUploadFiles({
  files,
  bucketName = _bucketName,
  maxConcurrentLimit = 3,
}: {
  files: File[];
  bucketName?: string;
  maxConcurrentLimit?: number;
}) {
  const queue = new TaskQueue<{
    fileParam: FileParamType;
    fileDetail: ParseFileDetail;
    obsAccessUrl: string;
  }>(maxConcurrentLimit);

  files.forEach(file => {
    queue.push(() => uploadObsFile({ file, bucketName, showErrorMessage: false }));
  });

  return queue.start();
}
