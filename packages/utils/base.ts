type themeType = 'white' | 'black';

const iphoneXFlag = 'thsIphoneXAdapter';

/**
 * @description 获取绑定在html上的theme-mode属性
 * @returns themeName: white|black
 */
export function getThemeMode() {
  let themeMode: themeType = 'white';
  if (document.documentElement.getAttribute('theme-mode')) {
    themeMode = document.documentElement.getAttribute('theme-mode') as themeType;
  }
  return themeMode;
}

/**
 * @description 设置绑定在html上的theme-mode属性
 * @param themeName 主题name: white|black
 */
export function setThemeMode(themeName: themeType) {
  document.documentElement.setAttribute('theme-mode', themeName);
}

export function isIphoneX() {
  if (document.documentElement.getAttribute('data-adapter') === iphoneXFlag) {
    return true;
  }
  return false;
}

/**
 * @description 将下划线命名转成驼峰命名
 * @param str 需要转换的字符串
 */
export function underscore2Camel(str: string): string {
  return str.split('_')
    .map((item) => item[0] && item[0].toUpperCase() + item.substr(1))
    .join('');
}

export const extend = Object.assign;

export function isTrueArray<T>(arr: Array<T>) {
  return Array.isArray(arr) && arr.length > 0;
}
