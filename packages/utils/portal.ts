/**
 * @description 将 Vue 组件挂载到页面 Dom 节点上
 * @usage
 *  import Toast from './Toast.vue';
 *  portal(Vue, {
 *    component: Toast,
 *    componentName: 'toast',
 *    methodName: 'show',
 *  });
 *  调用 portal 后可通过 this.$toast() 调用该 Toast 组件的 show 方法
 */

import { VueConstructor } from 'vue/types/umd';

interface OptionsType {
  component: any;
  componentName: string;
  methodOpts?: {[method: string]: string} | string;
  node?: string;
  props?: any;
}

function noop() {}

function getDom(selector: string | HTMLElement): HTMLElement | null {
  let res: HTMLElement | null;
  if (typeof selector === 'string') {
    res = document.querySelector(selector);
  } else {
    res = selector;
  }
  return res;
}

function portal(Vue: VueConstructor, options: OptionsType): void {
  const {
    component,
    componentName,
    methodOpts,
    node = 'body',
    props,
  } = options;

  let componentInstanceFunc: {
    [funcName: string]: (...val: any[]) => any;
  };

  component.newInstance = () => {
    if (componentInstanceFunc) {
      return componentInstanceFunc;
    }

    const ComponentCon = (Vue as any).extend({
      _isHxmUIComponent: true,
      render(h: any) {
        return h(component, {
          props,
        });
      },
    });

    const componentIns = new ComponentCon().$mount();

    const mountDom = getDom(node);

    if (mountDom) {
      mountDom.appendChild(componentIns.$el);
    } else {
      throw new Error('[hxmui] portal cannot find mount target');
    }

    // 缓存当前组件，防止多次实例化
    [componentInstanceFunc] = componentIns.$children;

    // 保存所有通过 portal 独立挂载到全局的组件实例
    if (Vue.prototype.$hxmui) {
      if (!Vue.prototype.$hxmui.portalComponents) {
        Vue.prototype.$hxmui.portalComponents = [];
      }
      Vue.prototype.$hxmui.portalComponents.push(componentInstanceFunc);
    }

    return componentInstanceFunc;
  };

  component.func = () => component.newInstance();
  component.trigger = () => {
    let triggerHandler: ((...val: any[]) => any) | object = noop;
    if (typeof methodOpts === 'string') {
      triggerHandler = (...val: any[]) => component.newInstance()[methodOpts](...val);
    } else if (methodOpts) {
      if (methodOpts.default) {
        triggerHandler = (...val: any[]) => {
          component.newInstance()[methodOpts.default](...val);
        };
      }
      for (const [methodKey, methodVal] of Object.entries(methodOpts)) {
        triggerHandler[methodKey] = (...val: any[]) => component.newInstance()[methodVal](...val);
      }
    }
    return triggerHandler;
  };

  Object.defineProperty(Vue.prototype, `$${componentName}`, {
    value: methodOpts ? component.trigger() : component.func(),
    configurable: false,
    writable: false,
  });
}

export default portal;
