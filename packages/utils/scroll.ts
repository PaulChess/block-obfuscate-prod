import { raf } from './animation';

type ScrollType = HTMLElement | Window;

const overflowScrollReg = /scroll|auto/i;

/**
 * 获取元素的scrollTop值
 * @param el 元素
 * @returns scrollTop值
 * @author shenjiaqi
 */
export function getScrollTop(el: ScrollType): number {
  const top = 'scrollTop' in el ? el.scrollTop : el.pageYOffset;

  // ios的弹性效果会导致scrollTop为负
  return Math.max(top, 0);
}

/**
 * 获取元素的scrollLeft值
 * @param el 元素
 * @returns scrollLeft值
 * @author shenjiaqi
 */
export function getScrollLeft(el: ScrollType): number {
  const left = 'scrollLeft' in el ? el.scrollLeft : el.pageXOffset;

  return Math.max(left, 0);
}

/**
 * 获取指定元素最近的可滚动元素
 * @param el 元素
 * @param root window
 * @returns 可滚动元素
 * @author shenjiaqi
 */
export function getScroller(el: Element, root: ScrollType = window): ScrollType {
  let node = el;

  while (
    node
    && node.tagName !== 'HTML'
    && node.tagName !== 'BODY'
    && node.nodeType === 1
    && node !== root
  ) {
    const { overflowY } = window.getComputedStyle(node);
    // Hack
    // 由于表格的td元素默认为overflow: auto, 且无法修改该属性，在向上查找父元素的时候会被误当作滚动容器，因此这里将其排除
    // 因此这里也杜绝了将td作为滚动父容器
    if (overflowScrollReg.test(overflowY) && node.tagName !== 'TD') {
      return node as ScrollType;
    }
    node = node.parentNode as HTMLElement;
  }
  return root;
}

interface ScrollToOptions {
  top?: number;
  left?: number;
  duration?: number;
  animation: (progress: number) => number;
}

export function scrollTo(
  element: HTMLElement | Window,
  {
    top = 0,
    left = 0,
    duration = 200,
    animation,
  }: ScrollToOptions,
): Promise<void> {
  const startTime = Date.now();

  const scrollTop = getScrollTop(element);
  const scrollLeft = getScrollLeft(element);

  return new Promise((resolve) => {
    const frame = () => {
      const progress = (Date.now() - startTime) / duration;

      if (progress < 1) {
        const nextTop = scrollTop + (top - scrollTop) * animation(progress);
        const nextLeft = scrollLeft + (left - scrollLeft) * animation(progress);

        element.scrollTo(nextLeft, nextTop);
        raf(frame);
      } else {
        element.scrollTo(left, top);
        resolve();
      }
    };

    raf(frame);
  });
}
