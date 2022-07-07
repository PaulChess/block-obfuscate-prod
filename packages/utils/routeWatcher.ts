import { VueConstructor } from 'vue/types/umd';
import { Route } from 'vue-router';

let Vue: VueConstructor;

// 通知所有通过 portal 独立挂载到全局的组件
function notifyPortalComponents(to: Route, from: Route) {
  if (!Vue) {
    return;
  }
  if (Vue.prototype.$hxmui && Vue.prototype.$hxmui.portalComponents) {
    Vue.prototype.$hxmui.portalComponents.forEach((component: InstanceType<VueConstructor>) => {
      component.$emit('hxm-route-update', {
        to,
        from,
      });
    });
  }
}

export default (_Vue: VueConstructor) => {
  if (Vue) {
    return;
  }
  Vue = _Vue;
  Vue.mixin({
    created(this: InstanceType<VueConstructor>) {
      // 排除非根组件与通过 util/portal.ts 挂载到页面中的组件
      if (this.$parent || (this.$options as any)._isHxmUIComponent) {
        return;
      }
      // 根组件中监听路由变化后通知 portal 安装的组件
      this.$watch('$route', (to: Route, from: Route) => {
        notifyPortalComponents(to, from);
      });
    },
  });
};
