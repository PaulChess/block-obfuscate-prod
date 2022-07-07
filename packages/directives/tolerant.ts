import { VueConstructor } from 'vue/types/umd';
import { DirectiveBinding } from 'vue/types/options';

/**
 * @description: 对错误数据兜底处理显示替换符 (可修改，默认 "--")
 * @usage v-hxmui-tolerant
 */
export default (Vue: VueConstructor) => {
  function handler(el: HTMLElement, binding: DirectiveBinding) {
    const element = el;
    const { innerText } = el;
    const REPLACEMENT_CHAR = binding.value || '--';
    if (innerText !== REPLACEMENT_CHAR) {
      if (/null|undefined|nan|^\s*$/ig.test(innerText)) {
        element.innerText = REPLACEMENT_CHAR;
      }
    }
  }
  Vue.directive('hxmui-tolerant', (el, binding) => {
    handler(el, binding);
  });
};
