import { VueConstructor } from 'vue/types/umd';
import { DirectiveBinding } from 'vue/types/options';
import { first, subscription } from '../utils/popovers';

/**
 * @description: 点击传入内容相同触发事件
 * @usage v-hxmui-clickpopover
 */
// 声明默认定位
const defaultPosition = 'bottom';

// 点击时执行的准备
const prepareBinding = ({ arg = '', modifiers = {}, value = {} }) => {
  const mods = Object.keys(modifiers);
  const name: any = typeof value && (value as any).name === 'object' ? (value as any).name : arg;
  const position = first(mods) || (value as any).position || defaultPosition;
  return { name, position, value };
};
const addClickEventListener = (target: any, params: any) => {
  const onClick = (srcEvent: any) => {
    subscription.$emit('show-click', {
      ...params,
      target,
      srcEvent,
    });
    const onDocumentClick = (srcEvents: any) => {
      subscription.$emit('hide-click', {
        ...params,
        target,
        srcEvents,
      });
      document.removeEventListener('click', onDocumentClick);
    };
    document.addEventListener('click', onDocumentClick);
    srcEvent.stopPropagation();
  };
  target.addEventListener('click', onClick);

  target.$popoverRemoveClickHandlers = () => {
    target.removeEventListener('click', onClick);
  };
};
/**
* @description: 点击区域以外的内容触发事件
* @usage v-hxmui-clickpopover
*/
export default (Vue: VueConstructor) => {
  Vue.directive('hxmui-clickpopover', {
    bind(target: any, binding: DirectiveBinding) {
      const params = prepareBinding(binding);
      addClickEventListener(target, params);
    },
    unbind(target: any) {
      target.$popoverRemoveClickHandlers();
    },
  });
};
