/**
 * @description 给组件实例添加 install 方法，使其被 Vue.use 调用时注册为全局组件
 */
import { VueConstructor } from 'vue/types/umd';
import setFontSize from './setFontSize';
import routeWatcher from './routeWatcher';

function installFn(this: InstanceType<VueConstructor>, Vue: VueConstructor, componentsConfig?: any): void {
  let name = (this.options && this.options.name) || this.name;
  name = name.startsWith('hxm') ? name : `hxm${name}`;
  if (!Vue.prototype.$hxmui) {
    Vue.prototype.$hxmui = Object.create(null);
  }
  if (this.portal) {
    this.portal(Vue);
  }
  Vue.use(routeWatcher);
  Vue.use(setFontSize);
  if (componentsConfig) {
    this.prototype.$hxmConfig = componentsConfig;
  }
  Vue.component(name, this);
}

export default function (sfc: any) {
  const installSFC = sfc;
  installSFC.install = installFn.bind(sfc);
  return installSFC;
}
