import { VueConstructor } from 'vue/types/umd';
import Dialog from './Dialog';
import portal from '../utils/portal';
import install from '../utils/install';

(Dialog as any).portal = (Vue: VueConstructor) => {
  portal(Vue, {
    component: Dialog,
    componentName: 'dialog',
    methodOpts: {
      default: 'show',
      close: 'close',
    },
  });
};

export default install(Dialog);
