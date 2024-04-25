/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export const setObjToUrlParams = (baseUrl: string, obj: any): string => {
  let parameters = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
};

export function parseUrl(url: string) {
  let urlObj = {
    protocol: /^(.+)\/\//,
    host: /:\/\/(.+?)[?#\s\/]/,
    path: /\w(\/.*?)[?#\s]/,
    query: /\?(.+?)[#\/\s]/,
    hash: /#(\w+)\s$/,
  };
  let res: {
    [K in keyof typeof urlObj]: any;
  } & Recordable = {} as any;
  url += ' ';
  function formatQuery(str: string) {
    return str.split('&').reduce((a, b) => {
      let arr = b.split('=');
      // 解码一下
      a[decodeURIComponent(arr[0])] = decodeURIComponent(arr[1]);
      return a;
    }, {} as Recordable);
  }
  for (let key in urlObj) {
    let pattern = urlObj[key as keyof typeof urlObj];
    res[key] =
      key === 'query'
        ? pattern.exec(url) && formatQuery(pattern.exec(url)![1])
        : pattern.exec(url) && pattern.exec(url)![1];
  }
  return res;
}
