import { VueConstructor } from 'vue/types/umd';
import { DirectiveBinding } from 'vue/types/options';

/**
 * @description: 根据数字正负自动修改红绿色
 * @usage v-hxmui-redgreen
 */
export default (Vue: VueConstructor) => {
  function handler(el: HTMLElement, binding: DirectiveBinding) {
    const element = el;
    if (binding.value == null || binding.value) {
      const text = el.innerText;
      if (/-\d+/gi.test(text)) {
        element.classList.add('sub-text-green');
        element.classList.remove('primary-text');
      } else if (/\d+/gi.test(text) && +(text.toString().replace(/\D/g, '')) !== 0) {
        element.classList.add('primary-text');
        element.classList.remove('sub-text-green');
      } else {
        element.classList.remove('primary-text');
        element.classList.remove('sub-text-green');
      }
    }
  }
  Vue.directive('hxmui-redgreen', {
    bind(el, binding) {
      handler(el, binding);
    },
    componentUpdated(el, binding) {
      handler(el, binding);
    },
  });
};
