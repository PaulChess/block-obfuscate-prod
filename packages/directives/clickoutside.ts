import { VueConstructor } from 'vue/types/umd';
import { DirectiveBinding } from 'vue/types/options';

/**
 * @description: 点击区域以外的内容触发事件
 * @usage v-hxmui-clickoutside
 */
export default (Vue: VueConstructor) => {
  Vue.directive('hxmui-clickoutside', {
    bind(el: any, binding: DirectiveBinding) {
      function tap(ele: any, callBack: Function) {
        let startTime = 0;
        let isMove = false;
        const maxTime = 250;
        ele.addEventListener('touchstart', function () {
          startTime = Date.now();
          isMove = false;
        });
        ele.addEventListener('touchmove', function () {
          isMove = true;
        });
        ele.addEventListener('touchend', function (e: Event) {
          if (isMove) {
            return;
          }
          if ((Date.now() - startTime) > maxTime) {
            return;
          }
          callBack(e);
        });
      }
      function documentHandler(e: any) {
        const targetEle = e.target;
        if (el.contains(targetEle)) {
          return false;
        }
        if (binding.expression) {
          binding.value(e);
        }
        return true;
      }
      tap(document, documentHandler);
      el.__hxmuiClickOutside__ = documentHandler;
    },
    unbind(el: any) {
      // document.removeEventListener('click', el.__hxmuiClickOutside__);
      delete el.__hxmuiClickOutside__;
    },
  });
};
