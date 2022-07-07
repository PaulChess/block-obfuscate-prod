// hash 路由切换监听
export function routeChangeWatcher(handler: () => any) {
  window.removeEventListener('hashchange', handler);
  window.addEventListener('hashchange', handler);
}

export function uuid(len: number, radix: number) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZzbcdefghijklmnopqrstuvwxyz'.split('');
  const id = [];
  radix = radix || chars.length;
  if (len) {
    for (let i = 0; i < len; i += 1) {
      id[i] = chars[0 | Math.random() * radix];
    }
  } else {
    id[8] = '-';
    id[13] = '-';
    id[18] = '-';
    id[23] = '-';
    id[14] = '4';
    for (let i = 0; i < 36; i += 1) {
      if (!id[i]) {
        const r = 0 | Math.random() * 16;
        id[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return id.join('');
}

const { userAgent } = navigator;

// 列出app名称对应的ua映射关系
const uaMap = {
  // 股市教练
  gsjl: userAgent.match(/((Gsjl_Android)|(IHexin_gsjl))\/\w*(\d+\.*\d*\.*\d*)/),
  // 投资账本
  tzzb: userAgent.match(/((GHexin_xcs)|(IHexin_xcs))\/\w*(\d+\.*\d*\.*\d*)/),
  // 猎金
  liejin: userAgent.match(/((Hexin_Metal)|(IHexin_Metal))\/\w*(\d+\.*\d*\.*\d*)/),
  // 期货
  qihuo: userAgent.match(/((Hexin_Futures)|(IHexin_Futures))\/\w*(\d+\.*\d*\.*\d*)/),
  // 爱基金
  ijijin: userAgent.match(/((GphoneIjiJin)|(IphoneIJiJinAPP))\/\w*(\d+\.*\d*\.*\d*)/),
  // ifind
  ifind: userAgent.match(/((ifind_gphone)|(ifind_iphone))\/\w*(\d+\.*\d*\.*\d*)/),
  // 爱问财
  iwencai: userAgent.match(/((IHexin_Fortune)|(GHexin_Fortune))\/\w*(\d+\.*\d*\.*\d*)/),
  // 财经
  caijing: userAgent.match(/((StocksHotNews_gphone)|(StocksHotNews_iPhone))\/\w*(\d+\.*\d*\.*\d*)/),
  // 手炒至尊版
  thsSuper: userAgent.match(/((Hexin_Gphone)+\/(\d+\.*\d*\.*\d*).*GZ+)|((hexinPro)+.*\/(\d+\.*\d*\.*\d*))/),
  // 手炒普通版
  ths: userAgent.match(/((Hexin_Gphone)+\/(\d+\.*\d*\.*\d*).*G+)|((IHexin)+\/(\d+\.*\d*\.*\d*))/),
  // 微信
  weixin: userAgent.match(/(MicroMessenger)+\/(\d+\.*\d*\.*\d*)/),
};

interface AppInfo {
  appName: string;
  platform: string;
  version: any;
}

export function getApp() {
  if (!Object.prototype.hasOwnProperty.call(window, 'getPlatform')) {
    throw ReferenceError('请先引入公共的手抄js库');
  }
  const appInfo: AppInfo = {
    appName: 'other',
    platform: (window as any).getPlatform(),
    version: '',
  };
  for (const property in uaMap) {
    if (Object.prototype.hasOwnProperty.call(uaMap, property)) {
      const mateched: any = uaMap[property];
      if (mateched) {
        appInfo.version = parseInt(mateched[0].match(/\d+\.*\d*\.*\d*/)[0].replace(/\./g, ''), 10);
        appInfo.appName = property;
        break;
      }
    }
  }
  return appInfo;
}

// 判断目标是否为函数
export function isFunction(target: any): target is Function {
  return Object.prototype.toString.apply(target) === '[object Function]';
}

// 判断目标是否为字符串
export function isString(target: any): target is string {
  return typeof target === 'string';
}

// 判断目标是否为数组
export function isArray(target: any): target is any[] {
  return Object.prototype.toString.apply(target) === '[object Array]';
}

// 根据表达式获取所有 DOM 节点
export function getDoms(expOrEl: string | Element): Element[] {
  if (isString(expOrEl)) {
    return Array.from(window.document.querySelectorAll(expOrEl));
  }
  return [expOrEl];
}

// 根据表达式获取 DOM 节点
export function getDom(expOrEl: string | Element) {
  if (isString(expOrEl)) {
    return window.document.querySelector(expOrEl);
  }
  return expOrEl;
}

// 函数节流
export function throttle(fn: Function, delay: number, ctx: InstanceType<any>) {
  let last = 0;
  return function throttledFn(...args: any[]) {
    const now = +new Date();
    if (now - last > delay) {
      fn.apply(ctx, args);
      last = now;
    }
  };
}

// 将函数包装为仅触发一次
export function createOnceHandler(fn: Function, ctx: InstanceType<any> = null) {
  let onceFlag = true;
  return function onceHandler(...args: InstanceType<any>[]) {
    if (onceFlag) {
      fn.apply(ctx, args);
      onceFlag = false;
    }
  };
}

// 判断是白天模式还是黑夜模式
export function getThemeMode(): string {
  enum themeNameMap {
    dark = 'black',
    light = 'white',
    black = 'black',
    white = 'white',
  }
  let themeName = 'white';
  const htmlEl = document.querySelector('html');
  if (htmlEl) {
    const themeMode = htmlEl.getAttribute('theme-mode');
    if (themeMode === themeNameMap['dark'] || themeMode === themeNameMap['black']) {
      themeName = 'black';
    }
  }
  return themeName;
}
