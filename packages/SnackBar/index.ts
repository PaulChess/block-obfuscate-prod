import { VueConstructor } from 'vue/types/umd';
import SnackBar from './SnackBar.vue';
import portal from '../utils/portal';
import install from '../utils/install';

(SnackBar as any).portal = (Vue: VueConstructor) => {
  portal(Vue, {
    component: SnackBar,
    componentName: 'snackbar',
    methodOpts: {
      default: 'show',
      hide: 'hide',
    },
  });
};

export default install(SnackBar);
