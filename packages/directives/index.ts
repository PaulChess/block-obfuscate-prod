import { VueConstructor } from 'vue/types/umd';
import redgreen from './redgreen';
import repairsign from './repairsign';
import tolerant from './tolerant';
import fontresize from './fontresize';
import clickoutside from './clickoutside';
import tapdown from './tapdown';
import clickpopover from './clickpopover';

export default (Vue: VueConstructor) => {
  Vue.use(redgreen);
  Vue.use(repairsign);
  Vue.use(tolerant);
  Vue.use(fontresize);
  Vue.use(clickoutside);
  Vue.use(tapdown);
  Vue.use(clickpopover);
};
