import { ref, Ref, onMounted } from 'vue-demi';
import { getScroller } from '../../utils/scroll';

type ScrollElement = HTMLElement | Window;

export function useScrollParent(
  el: Ref<Element | undefined>,
  root: ScrollElement = window,
) {
  const scrollParent = ref<Element | Window>();

  onMounted(() => {
    if (el.value) {
      scrollParent.value = getScroller(el.value, root);
    }
  });

  return scrollParent;
}
