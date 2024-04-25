export const prefixCls = 'khfw';

export interface Theme {
  'primary-color': string;
  'primary-color-hover': string;
  'primary-color-pressed': string;
  gradient: Recordable<string>;
  themeOpacityColor: Recordable<string>;
}

export const themes: MarkPropsAsOptional<Theme, 'themeOpacityColor'>[] = [
  // 蓝色
  {
    'primary-color': '#3296fa',
    'primary-color-hover': '#85caff',
    'primary-color-pressed': '#2074d4',
    gradient: {
      'primary-color-1': '#f0faff',
      'primary-color-2': '#d6f0ff',
      'primary-color-3': '#addeff',

      'primary-color-4': '#85caff',
      'primary-color-5': '#3296fa',
      'primary-color-6': '#2074d4',

      'primary-color-7': '#1155ad',
      'primary-color-8': '#073a87',
      'primary-color-9': '#042661',
    },
  },
  // 黄色
  {
    'primary-color': '#d6aa56',
    'primary-color-hover': '#e3c37f',
    'primary-color-pressed': '#b0843e',
    gradient: {
      'primary-color-1': '#fffcf0',
      'primary-color-2': '#fcf5de',
      'primary-color-3': '#f0ddad',

      'primary-color-4': '#e3c37f',
      'primary-color-5': '#d6aa56',
      'primary-color-6': '#b0843e',

      'primary-color-7': '#8a6229',
      'primary-color-8': '#634219',
      'primary-color-9': '#3d270f',
    },
  },
  // 紫色
  {
    'primary-color': '#6764ed',
    'primary-color-hover': '#9a95fc',
    'primary-color-pressed': '#4a4cc7',
    gradient: {
      'primary-color-1': '#f3f0ff',
      'primary-color-2': '#e8e6ff',
      'primary-color-3': '#c2bdff',

      'primary-color-4': '#9a95fc',
      'primary-color-5': '#6764ed',
      'primary-color-6': '#4a4cc7',

      'primary-color-7': '#3339a1',
      'primary-color-8': '#21287a',
      'primary-color-9': '#161d54',
    },
  },
  // 绿色
  {
    'primary-color': '#34b07c',
    'primary-color-hover': '#86d4ae',
    'primary-color-pressed': '#228a62',
    gradient: {
      'primary-color-1': '#f2faf5',
      'primary-color-2': '#e2f6eb',
      'primary-color-3': '#c1f2d9',

      'primary-color-4': '#86d4ae',
      'primary-color-5': '#34b07c',
      'primary-color-6': '#228a62',

      'primary-color-7': '#146348',
      'primary-color-8': '#093d2d',
      'primary-color-9': '#031711',
    },
  },
];

export const defaultTheme = Object.assign({}, themes[0], {
  themeOpacityColor: {
    '--primary-color-opacity-1': 'rgba(50, 150, 250, 0.1)',
    '--primary-color-opacity-2': 'rgba(50, 150, 250, 0.2)',
    '--primary-color-opacity-3': 'rgba(50, 150, 250, 0.3)',
    '--primary-color-opacity-4': 'rgba(50, 150, 250, 0.4)',
    '--primary-color-opacity-5': 'rgba(50, 150, 250, 0.5)',
    '--primary-color-opacity-6': 'rgba(50, 150, 250, 0.6)',
    '--primary-color-opacity-7': 'rgba(50, 150, 250, 0.7)',
    '--primary-color-opacity-8': 'rgba(50, 150, 250, 0.8)',
    '--primary-color-opacity-9': 'rgba(50, 150, 250, 0.9)',
  },
});
