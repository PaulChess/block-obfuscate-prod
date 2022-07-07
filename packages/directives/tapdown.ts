import { VueConstructor } from 'vue/types/umd';
import { DirectiveBinding } from 'vue/types/options';

/**
 * @description: 点击区域以外的内容触发事件
 * @usage v-hxmui-clickoutside
 */
export default (Vue: VueConstructor) => {
  Vue.directive('hxmui-tapdown', {
    bind(el: any, binding: DirectiveBinding) {
      window.addEventListener('touchstart', () => {
        el.classList.add('hxmui-tapdown');
      });
      window.addEventListener('touchend', () => {
        el.classList.remove('hxmui-tapdown');
      });
    },
  });
};
