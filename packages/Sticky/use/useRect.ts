import { Ref, unref } from 'vue-demi';

// val is Window判断val是否属于Window类型
function isWindow(val: unknown): val is Window {
  return val === Window;
}

function makeDomRect(width: number, height: number) {
  return {
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    width,
    height,
  } as DOMRect;
}

type MaybeRef<T> = Ref<T> | T;

export const useRect = (
  elementOrRef: MaybeRef<Element | Window | undefined>,
) => {
  const element = unref(elementOrRef);

  if (isWindow(element)) {
    const width = element.innerWidth;
    const height = element.innerHeight;
    return makeDomRect(width, height);
  }

  if (element && element.getBoundingClientRect) {
    return element.getBoundingClientRect();
  }

  return makeDomRect(0, 0);
};
