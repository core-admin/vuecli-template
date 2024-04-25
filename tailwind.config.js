/**
 * 此配置作为tailwindcss的默认配置，当不同的项目使用不用的配置时，此文件可作为预设值使用
 * https://www.tailwindcss.cn/docs/presets
 */

const colorsVar = {
  'blue-color': 'var(--blue-color)',

  // 主题色
  'primary-color': 'var(--tj-primary-color)',
  'primary-color-hover': 'var(--tj-brand-color-hover)',
  'primary-color-focus': 'var(--tj-brand-color-focus)',
  'primary-color-active': 'var(--tj-brand-color-active)',
  'primary-color-disabled': 'var(--tj-brand-color-disabled)',
  'primary-color-light': 'var(--tj-brand-color-light)',

  'primary-color-1': 'var(--tj-primary-color-1)',
  'primary-color-2': 'var(--tj-primary-color-2)',
  'primary-color-3': 'var(--tj-primary-color-3)',
  'primary-color-4': 'var(--tj-primary-color-4)',
  'primary-color-5': 'var(--tj-primary-color-5)',
  'primary-color-6': 'var(--tj-primary-color-6)',
  'primary-color-7': 'var(--tj-primary-color-7)',
  'primary-color-8': 'var(--tj-primary-color-8)',
  'primary-color-9': 'var(--tj-primary-color-9)',

  'primary-color-opacity-1': 'var(--primary-color-opacity-1)',
  'primary-color-opacity-2': 'var(--primary-color-opacity-2)',
  'primary-color-opacity-3': 'var(--primary-color-opacity-3)',
  'primary-color-opacity-4': 'var(--primary-color-opacity-4)',
  'primary-color-opacity-5': 'var(--primary-color-opacity-5)',
  'primary-color-opacity-6': 'var(--primary-color-opacity-6)',
  'primary-color-opacity-7': 'var(--primary-color-opacity-7)',
  'primary-color-opacity-8': 'var(--primary-color-opacity-8)',
  'primary-color-opacity-9': 'var(--primary-color-opacity-9)',

  // ----------------------------------

  'error-color': 'var(--tj-error-color)',
  'error-color-hover': 'var(--tj-error-color-hover)',
  'error-color-focus': 'var(--tj-error-color-focus)',
  'error-color-active': 'var(--tj-error-color-active)',
  'error-color-disabled': 'var(--tj-error-color-disabled)',
  'error-color-light': 'var(--tj-error-color-light)',

  'error-color-1': 'var(--tj-error-color-1)',
  'error-color-2': 'var(--tj-error-color-2)',
  'error-color-3': 'var(--tj-error-color-3)',
  'error-color-4': 'var(--tj-error-color-4)',
  'error-color-5': 'var(--tj-error-color-5)',
  'error-color-6': 'var(--tj-error-color-6)',
  'error-color-7': 'var(--tj-error-color-7)',
  'error-color-8': 'var(--tj-error-color-8)',
  'error-color-9': 'var(--tj-error-color-9)',
  'error-color-10': 'var(--tj-error-color-10)',

  'error-color-opacity-1': 'var(--error-color-opacity-1)',
  'error-color-opacity-2': 'var(--error-color-opacity-2)',
  'error-color-opacity-3': 'var(--error-color-opacity-3)',
  'error-color-opacity-4': 'var(--error-color-opacity-4)',
  'error-color-opacity-5': 'var(--error-color-opacity-5)',
  'error-color-opacity-6': 'var(--error-color-opacity-6)',
  'error-color-opacity-7': 'var(--error-color-opacity-7)',
  'error-color-opacity-8': 'var(--error-color-opacity-8)',
  'error-color-opacity-9': 'var(--error-color-opacity-9)',

  // ----------------------------------

  'warning-color': 'var(--tj-warning-color)',
  'warning-color-hover': 'var(--tj-warning-color-hover)',
  'warning-color-focus': 'var(--tj-warning-color-focus)',
  'warning-color-active': 'var(--tj-warning-color-active)',
  'warning-color-disabled': 'var(--tj-warning-color-disabled)',
  'warning-color-light': 'var(--tj-warning-color-light)',

  'warning-color-1': 'var(--tj-warning-color-1)',
  'warning-color-2': 'var(--tj-warning-color-2)',
  'warning-color-3': 'var(--tj-warning-color-3)',
  'warning-color-4': 'var(--tj-warning-color-4)',
  'warning-color-5': 'var(--tj-warning-color-5)',
  'warning-color-6': 'var(--tj-warning-color-6)',
  'warning-color-7': 'var(--tj-warning-color-7)',
  'warning-color-8': 'var(--tj-warning-color-8)',
  'warning-color-9': 'var(--tj-warning-color-9)',
  'warning-color-10': 'var(--tj-warning-color-10)',

  'warning-color-opacity-1': 'var(--warning-color-opacity-1)',
  'warning-color-opacity-2': 'var(--warning-color-opacity-2)',
  'warning-color-opacity-3': 'var(--warning-color-opacity-3)',
  'warning-color-opacity-4': 'var(--warning-color-opacity-4)',
  'warning-color-opacity-5': 'var(--warning-color-opacity-5)',
  'warning-color-opacity-6': 'var(--warning-color-opacity-6)',
  'warning-color-opacity-7': 'var(--warning-color-opacity-7)',
  'warning-color-opacity-8': 'var(--warning-color-opacity-8)',
  'warning-color-opacity-9': 'var(--warning-color-opacity-9)',

  // ----------------------------------

  'success-color': 'var(--tj-success-color)',
  'success-color-hover': 'var(--tj-success-color-hover)',
  'success-color-focus': 'var(--tj-success-color-focus)',
  'success-color-active': 'var(--tj-success-color-active)',
  'success-color-disabled': 'var(--tj-success-color-disabled)',
  'success-color-light': 'var(--tj-success-color-light)',

  'success-color-1': 'var(--tj-success-color-1)',
  'success-color-2': 'var(--tj-success-color-2)',
  'success-color-3': 'var(--tj-success-color-3)',
  'success-color-4': 'var(--tj-success-color-4)',
  'success-color-5': 'var(--tj-success-color-5)',
  'success-color-6': 'var(--tj-success-color-6)',
  'success-color-7': 'var(--tj-success-color-7)',
  'success-color-8': 'var(--tj-success-color-8)',
  'success-color-9': 'var(--tj-success-color-9)',
  'success-color-10': 'var(--tj-success-color-10)',

  'success-color-opacity-1': 'var(--success-color-opacity-1)',
  'success-color-opacity-2': 'var(--success-color-opacity-2)',
  'success-color-opacity-3': 'var(--success-color-opacity-3)',
  'success-color-opacity-4': 'var(--success-color-opacity-4)',
  'success-color-opacity-5': 'var(--success-color-opacity-5)',
  'success-color-opacity-6': 'var(--success-color-opacity-6)',
  'success-color-opacity-7': 'var(--success-color-opacity-7)',
  'success-color-opacity-8': 'var(--success-color-opacity-8)',
  'success-color-opacity-9': 'var(--success-color-opacity-9)',

  // ----------------------------------

  'gray-color-1': 'var(--tj-gray-color-1)',
  'gray-color-2': 'var(--tj-gray-color-2)',
  'gray-color-3': 'var(--tj-gray-color-3)',
  'gray-color-4': 'var(--tj-gray-color-4)',
  'gray-color-5': 'var(--tj-gray-color-5)',
  'gray-color-6': 'var(--tj-gray-color-6)',
  'gray-color-7': 'var(--tj-gray-color-7)',
  'gray-color-8': 'var(--tj-gray-color-8)',
  'gray-color-9': 'var(--tj-gray-color-9)',
  'gray-color-10': 'var(--tj-gray-color-10)',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx,html}'],
  corePlugins: {
    preflight: true,
  },
  theme: {
    extend: {
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1600px',
      },
      colors: colorsVar,
      textColor: {
        ...colorsVar,
        black: {
          // text-black-[1-5] 对应黑色 五个透明度的色值
          5: 'var(--black-color-5)',
          4: 'var(--black-color-4)',
          3: 'var(--black-color-3)',
          2: 'var(--black-color-2)',
          1: 'var(--black-color-1)',
        },
      },
      borderRadius: {
        large: 'var(--rounded-large)',
        middle: 'var(--rounded-middle)',
        small: 'var(--rounded-small)',
      },
      fontSize: {
        12: ['var(--text-xs)', 'var(--text-xs-lh)'],
        14: ['var(--text-sm)', 'var(--text-sm-lh)'],
        16: ['var(--text-base)', 'var(--text-base-lh)'],
        18: ['var(--text-lg)', 'var(--text-lg-lh)'],
        20: ['var(--text-xl)', 'var(--text-xl-lh)'],
        24: ['var(--text-2xl)', 'var(--text-2xl-lh)'],

        '12t': 'var(--text-xs)',
        '14t': 'var(--text-sm)',
        '16t': 'var(--text-base)',
        '18t': 'var(--text-lg)',
        '20t': 'var(--text-xl)',
        '24t': 'var(--text-2xl)',
      },
    },
  },
  plugins: [
    // 文本截断 支持多行显示省略号 class > line-clamp-[1-6] https://github.com/tailwindlabs/tailwindcss-line-clamp
    // 3.3版本中被默认包含
    // require('@tailwindcss/line-clamp'),
  ],
};
