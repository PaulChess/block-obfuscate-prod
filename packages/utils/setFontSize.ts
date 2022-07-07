/**
 * @description 页面中插入 style 样式为组件设置 fontSize
 * @usage 组件的根节点添加 class="hxmui-fontsize-adapter"
 * @author panhailiang
 */

import { VueConstructor } from 'vue/types/umd';

let Vue: VueConstructor;
let styleEl: null | Element = null;
let isInserted = false;
const now = Date.now();
const STYLE_ID = `hxmuiSetFontsize_${now}`;

function createStyle(style: string): Element {
  if (styleEl) {
    return styleEl;
  }

  const el = document.querySelector(`head ${STYLE_ID}`) || document.createElement('style');

  el.setAttribute('id', STYLE_ID);
  el.setAttribute('type', 'text/css');
  el.innerHTML = style;
  styleEl = el;

  return el;
}

function insertToHead(el: Element): void {
  if (isInserted) {
    return;
  }

  const head = document.querySelector('head');
  const id = el.getAttribute('id');

  if (id) {
    const existingEl = document.querySelector(`head ${id}`);
    if (existingEl) {
      const parentEl = existingEl.parentElement;
      if (parentEl) {
        parentEl.removeChild(el);
      }
    }
  }
  if (head) {
    isInserted = true;
    head.appendChild(el);
  }
}

// 1.10.2: 解决在ios低版本机型上使用document.getElementsByTagName('meta')['viewport']不兼容的问题
function getMeta(metaArr: any, metaName: string) {
  let res: any;
  for (let i = 0; i < metaArr.length; i++) {
    if (metaArr[i].getAttribute('name') === metaName) {
      res = metaArr[i];
      break;
    }
  }
  return res;
}

function getMetaColumn(metaContent: string, columnName: string) {
  const res = {};
  if (metaContent) {
    metaContent = metaContent.replace(/\s*/g, '');
    const contentArr = metaContent.split(',');
    contentArr.forEach((item) => {
      const arr = item.split('=');
      // eslint-disable-next-line prefer-destructuring
      res[arr[0]] = arr[1];
    });
  }
  return res[columnName];
}

// 1.10.1: 解决字体根据屏幕宽度无限放大的问题
function getFontSize() {
  const metaArrs = document.getElementsByTagName('meta');
  const hxmLimitSizeMeta = getMeta(metaArrs, 'hxmLimitSize')?.content;
  const viewPortMeta = getMeta(metaArrs, 'viewport')?.content;

  const initialScale = getMetaColumn(viewPortMeta, 'initial-scale')
    ? Number(getMetaColumn(viewPortMeta, 'initial-scale'))
    : 1;
  const maxLimitWidth = getMetaColumn(hxmLimitSizeMeta, 'max-width')
    ? Number(getMetaColumn(hxmLimitSizeMeta, 'max-width'))
    : 480;

  let fontSize = (window.innerWidth / 7.5 / 16) * 100 * 0.32;
  if (window.innerWidth >= (maxLimitWidth / initialScale)) {
    fontSize = (maxLimitWidth / initialScale / 7.5 / 16) * 100 * 0.32;
  }
  return fontSize;
}

export default (_Vue: VueConstructor) => {
  if (Vue) {
    return;
  }
  Vue = _Vue;
  Vue.mixin({
    created(this: InstanceType<VueConstructor>) {
      // 排除非根组件与通过 util/portal.ts 挂载到页面中的组件
      if (this.$parent || (this as any).$options._isHxmUIComponent) {
        return;
      }
      insertToHead(createStyle(`
        @charset "utf-8";
        .hxmui-fontsize-adapter {
          font-size: ${getFontSize()}px;
        }
      `));
    },
  });
};
