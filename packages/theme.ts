import { VueConstructor } from 'vue/types/umd';

type ThemeType = 'dark' | 'white' | 'black' | 'white' | 'auto';

const normalizeTheme = (theme: string): 'white' | 'black' => {
  enum themeNameMap {
    dark = 'black',
    light = 'white',
    black = 'black',
    white = 'white',
  }
  const themeName = themeNameMap[theme] || 'auto';
  if (themeName === 'auto') {
    return navigator.userAgent.includes('hxtheme/1') ? 'black' : 'white';
  }
  return themeName;
};

/**
 * 注册主题模式，Vue 原型对象上添加响应式属性 hxmuiTheme 用于切换主题
 * @param Vue Vue构造器
 * @param theme 主题类型
 */
const registerThemeMode = (Vue: VueConstructor, theme: ThemeType): void => {
  const htmlEl = document.querySelector('html');
  const bodyEl = document.querySelector('body');
  let themeMode = normalizeTheme(theme);
  const os = /Android/ig.test(navigator.userAgent) ? 'gphone' : 'iphone';
  if (htmlEl && bodyEl) {
    htmlEl.setAttribute('theme-mode', themeMode);
    htmlEl.setAttribute('theme-platform', os);
    if (!Vue.prototype.$hxmui) {
      Vue.prototype.$hxmui = Object.create(null);
    }
    Object.defineProperty(Vue.prototype.$hxmui, 'theme', {
      get() {
        return themeMode;
      },
      set(value) {
        themeMode = normalizeTheme(value);
        htmlEl.setAttribute('theme-mode', themeMode);
      },
    });
  } else if (process.env.NODE_ENV !== 'production') {
    throw new Error('[hxmui] html and body elements are not found.');
  }
};

export default registerThemeMode;
