import {
  throttle,
  getDoms,
  getDom,
  isFunction,
} from '../utils/helper';

// 可视区域高度
const viewHeight = window.innerHeight || document.documentElement.clientHeight;

interface WatchersItem {
  el: Element;
  exposureHandler: Function;
  hideHandler?: Function;
  show?: boolean;
  _isCalled?: boolean;
}

interface ExposureWatcherIns {
  $watchers: WatchersItem[];
  $els: Element[];
  add: (expOrEl: string | Element, exposureHandler: Function, hideHandler?: Function) => ExposureWatcherIns;
  remove: (expOrEl: string | Element) => ExposureWatcherIns;
  beginWatch: () => void;
}

class ExposureWatcher {
  $watchers: WatchersItem[]

  $els: Element[]

  constructor() {
    // 记录监听中的元素与相应回调
    this.$watchers = [];
    this.$els = [];
  }

  // 添加监听元素与相应回调
  add(expOrEl: string | Element, exposureHandler: Function, hideHandler?: Function): ExposureWatcherIns {
    if (expOrEl) {
      const doms = getDoms(expOrEl);
      if (doms.length === 0) {
        return this;
      }
      // 收集 DOM 节点与相应回调
      for (let j = 0; j < doms.length; j += 1) {
        const el = doms[j];
        if (this.$els.indexOf(el) > -1) {
          continue;
        }
        // img 标签懒加载
        if (el.tagName === 'IMG') {
          const originExposureHandler = exposureHandler;
          exposureHandler = function (this: any, ...args: any[]) {
            const src = el.getAttribute('data-src');
            src && (el.setAttribute('src', src));
            originExposureHandler && originExposureHandler.apply(this, args);
          };
        }
        if (isFunction(exposureHandler)) {
          this.$watchers.push({
            el,
            exposureHandler,
            hideHandler,
          });
          this.$els.push(el);
        }
      }
    }
    return this;
  }

  remove(expOrEl: string | Element): ExposureWatcherIns {
    if (!expOrEl) {
      return this;
    }
    const _el = getDom(expOrEl);
    if (_el) {
      for (let i = 0; i < this.$watchers.length; i++) {
        const { el } = this.$watchers[i];
        if (el === _el) {
          this.$watchers.splice(i, 1);
        }
      }
    }
    return this;
  }

  // v1.11.5 暴露出去在组件的mounted中进行手动调用
  beginWatch() {
    const self = this;
    self._scrollHandler();
    window.addEventListener('scroll', function (e) {
      throttle(self._scrollHandler, 100, self)(e);
    }, false);
  }

  // 滚动条变化时响应回调
  private _scrollHandler(e?: Event) {
    if (this.$watchers.length === 0) {
      return;
    }
    const ctx = this;
    for (let i = 0; i < this.$watchers.length; i++) {
      const {
        el,
        exposureHandler,
        hideHandler,
      } = this.$watchers[i];
      const rectTop = el.getBoundingClientRect().top;
      const rectBottom = el.getBoundingClientRect().bottom;
      const distanceTop = viewHeight - rectTop;
      // 判断元素暴露在视窗内则触发回调
      if (distanceTop > 0 && rectBottom > 0) {
        if (this.$watchers[i].show) {
          return;
        }
        // 对于没有 hide 响应回调则标记已触发曝光并清楚该元素的监听
        !isFunction(hideHandler) && (this.$watchers[i]._isCalled = true);
        exposureHandler.apply(ctx, e);
        this.$watchers[i].show = true;
      } else if (this.$watchers[i].show) {
        isFunction(hideHandler) && hideHandler.apply(ctx, e);
        this.$watchers[i].show = false;
      }
    }
    // 已标记曝光元素取消监听
    for (let i = 0; i < this.$watchers.length; i++) {
      if (this.$watchers[i]._isCalled) {
        this.$watchers.splice(i, 1);
      }
    }
  }
}

export default ExposureWatcher;
