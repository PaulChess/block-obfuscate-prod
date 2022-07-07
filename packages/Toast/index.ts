import { VueConstructor } from 'vue/types/umd';
import Toast from './Toast.vue';
import portal from '../utils/portal';
import install from '../utils/install';

(Toast as any).portal = (Vue: VueConstructor) => {
  portal(Vue, {
    component: Toast,
    componentName: 'toast',
    methodOpts: {
      default: 'show',
      success: 'success',
      error: 'error',
      warn: 'warn',
    },
  });
};

export default install(Toast);
