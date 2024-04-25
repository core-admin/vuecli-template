export function formatFileSize(fileSize = 0) {
  if (fileSize === 0) {
    return '0 B';
  }

  const unitArr = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let size = fileSize * 1;
  let index = Math.floor(Math.log(size) / Math.log(1024));
  size = size / Math.pow(1024, index);
  return String(size.toFixed(2)) + unitArr[index];
}

export function getUrlFileNameAndType(fileName: string) {
  return {
    type: fileName.replace(/.+\./, ''),
    fileName: fileName.replace(/(.*\/)*([^.]+).*/gi, '$2'),
  };
}

/**
 * 获取文件详细信息
 */
export function parseFileDetail(file: File) {
  const { name, size, type: mime } = file;
  const { fileName, type } = getUrlFileNameAndType(name);
  return {
    // 文件名称（包含后缀名）
    fullName: name,
    // 文件名称（不包含后缀名）
    fileName,
    fileSuffix: type.toLocaleLowerCase(),
    fileSuffixUpper: type.toLocaleUpperCase(),
    size,
    mime,
    formatSize: formatFileSize(size),
    raw: file,
  };
}

type UrlFileInfo = {
  name: string;
  type: string;
  fileName: string;
};

/**
 * 根据url路径提取文件类型和文件名
 */
export function extractFileInfoFromUrl(url: string): UrlFileInfo | null {
  const matches = url.match(/\/([^/]+\.[^/?#]+)(\?.*)?(#.*)?$/);

  if (!matches || matches.length < 2) {
    return null;
  }

  const filePath = matches[1];
  const lastDotIndex = filePath.lastIndexOf('.');
  const fileExt = filePath.slice(lastDotIndex + 1);
  const fileName = filePath.slice(0, lastDotIndex);
  return {
    type: fileExt,
    name: fileName,
    fileName: `${fileName}.${fileExt}}`,
  };
}

/**
 * 判断是否为base64文件
 */
export function isBase64File(str: string) {
  // 数据URI的正则表达式
  const regex = /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,.*$/;
  return regex.test(str);
}

/**
 * 将文件转换为base64
 */
export function fileToBase64Async(file: File | Blob) {
  return new Promise<string>((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      resolve(e.target?.result as string);
    };
    reader.onerror = reject;
  });
}

export function base64ToBlob(base64Buf: string): Blob {
  const arr = base64Buf.split(',');
  const typeItem = arr[0];
  const mime = typeItem.match(/:(.*?);/)![1];
  const bstr = window.atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

export function extractBase64File(base64: string): {
  type: string;
  data: string;
} {
  const matches = base64.match(/^data:(.+);base64,(.*)$/);

  if (!matches || matches.length !== 3) {
    throw new Error('Invalid base64 file format');
  }

  const [, type, data] = matches;
  return { type, data };
}

export function base64ToFile(base64: string, filename: string): File {
  const { type, data } = extractBase64File(base64);
  const binaryStr = atob(data);
  const len = binaryStr.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }

  return new File([bytes], `${filename}.${type.split('/').pop()}`, { type });
}

/**
 * 根据 base64 下载图片
 */
export const downloadByBase64Image = (
  base64Data: string,
  filename: string,
  mime?: string,
  bom?: BlobPart,
) => {
  const base64Buf = base64ToBlob(base64Data);
  downloadByData(base64Buf, filename, mime, bom);
};

/**
 * 将 img url 转换为 base64
 */
export function imageToBase64(url: string, mineType?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let canvas = document.createElement('CANVAS') as Nullable<HTMLCanvasElement>;
    const ctx = canvas!.getContext('2d');

    const img = new Image();
    img.crossOrigin = '';
    img.onload = function () {
      if (!canvas || !ctx) {
        return reject();
      }
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL(mineType || 'image/png');
      canvas = null;
      resolve(dataURL);
    };
    img.src = url;
  });
}

/**
 * 根据后台接口文件流下载
 */
export function downloadByData(data: BlobPart, filename: string, mime?: string, bom?: BlobPart) {
  const blobData = typeof bom !== 'undefined' ? [bom, data] : [data];
  const blob = new Blob(blobData, { type: mime || 'application/octet-stream' });

  const blobURL = window.URL.createObjectURL(blob);
  const tempLink = document.createElement('a');
  tempLink.style.display = 'none';
  tempLink.href = blobURL;
  tempLink.setAttribute('download', filename);
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank');
  }
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  window.URL.revokeObjectURL(blobURL);
}

/**
 * 下载在线图片
 */
export const downloadImageByOnlineUrl = (
  url: string,
  filename: string,
  mime?: string,
  bom?: BlobPart,
) => {
  return imageToBase64(url).then(base64 => {
    downloadByBase64Image(base64, filename, mime, bom);
  });
};

/**
 * 下载在线文件
 */
export function downloadFileByOnlineUrl(fileUrl: string, fileName?: string): void {
  const a = document.createElement('a');
  a.href = fileUrl;
  if (fileName) {
    a.download = fileName;
  } else {
    const fileInfo = extractFileInfoFromUrl(fileUrl);
    if (fileInfo) {
      a.download = fileInfo.fileName;
    }
  }
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
