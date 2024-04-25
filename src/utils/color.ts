/**
 * 获取dom元素的css变量值
 */
export function getCssRootVariableValue(key: string, el: string | HTMLElement = ':root') {
  const element = el instanceof HTMLElement ? el : document.querySelector(el);
  if (!element) {
    throw new Error('Could not find element with the provided selector or element');
  }
  const value = getComputedStyle(element)
    .getPropertyValue(key.startsWith('--') ? key : `--${key}`)
    .trim();
  return value;
}

// 设置dom元素的css变量值
export function setCssRootVariableValue<T extends string>(
  key: T,
  value: string,
  el: string | HTMLElement = ':root',
) {
  const element = el instanceof HTMLElement ? el : (document.querySelector(el) as HTMLElement);
  if (!element) {
    throw new Error('Could not find element with the provided selector or element');
  }
  element.style.setProperty(key.startsWith('--') ? key : `--${key}`, value.trim());
}

// 将16进制颜色转换为rgba
export function hexToRgba(hex: string, alpha = 1) {
  if (hex.charAt(0) === '#') {
    hex = hex.slice(1);
  }
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(function (char) {
        return char + char;
      })
      .join('');
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
