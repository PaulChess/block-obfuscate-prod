import {
  Ref,
  onDeactivated,
  onBeforeUnmount,
  onMounted,
  onActivated,
} from 'vue-demi';

// @Experimental
export function useVisibilityChange(
  target: Ref<Element | undefined>,
  onChange: (visible: boolean) => void,
) {
  // compatibility: https://caniuse.com/#feat=intersectionobserver
  if (!window.IntersectionObserver) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      // visibility changed
      onChange(entries[0].intersectionRatio > 0);
    },
    { root: document.body },
  );

  const observe = () => {
    if (target.value) {
      observer.observe(target.value);
    }
  };

  const unobserve = () => {
    if (target.value) {
      observer.unobserve(target.value);
    }
  };

  onDeactivated(unobserve);
  onBeforeUnmount(unobserve);
  onMounted(observe);
  onActivated(observe);
}
