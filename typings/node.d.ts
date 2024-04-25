declare namespace NodeJS {
  interface ProcessEnv {
    // 当前所运行模式
    NODE_ENV: 'development' | 'production';
    // 当前所运行环境
    VUE_APP_ENV_MODE: 'development' | 'test' | 'preview' | 'production';
    // 项目名称标题
    VUE_APP_APP_TITLE: string;
    // 华为云oss默认桶名
    VUE_APP_OBS_DEFAULT_BUCKET_NAME: string;
    // web365文件预览服务地址
    VUE_APP_OFFICE_WEB_365_URL: string;
    // 华为云站点监控 appid
    VUE_APP_HUAWEI_SITE_MONITOR_APPID: string;
  }
}
