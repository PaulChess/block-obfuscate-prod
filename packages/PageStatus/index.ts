import { VueConstructor } from 'vue/types/umd';
import PageStatus from './PageStatus.vue';
import portal from '../utils/portal';
import install from '../utils/install';

(PageStatus as any).portal = (Vue: VueConstructor) => {
  portal(Vue, {
    component: PageStatus,
    componentName: 'pageStatus',
    methodOpts: {
      default: 'loading',
      loading: 'loading',
      fail: 'fail',
      close: 'close',
      setFailTip: 'setFailTip',
      refreshClick: 'refreshClick',
    },
  });
};

export default install(PageStatus);
