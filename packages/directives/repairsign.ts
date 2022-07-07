import { VueConstructor } from 'vue/types/umd';

/**
 * @description: 自动补全正数前的 + 加号
 * @usage v-hxmui-repairsign
 */
export default (Vue: VueConstructor) => {
  function handler(el: HTMLElement) {
    const element = el;
    if (el.innerText && !/^[+, -]/.test(el.innerText)) {
      element.innerText = `+${element.innerText}`;
    }
  }
  Vue.directive('hxmui-repairsign', (el) => {
    handler(el);
  });
};
