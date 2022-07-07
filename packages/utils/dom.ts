type ScrollType = HTMLElement | Window;

function getDefaultBackground() {
  const divBlock = document.createElement('div');
  document.head.appendChild(divBlock);
  const bg = window.getComputedStyle(divBlock).backgroundColor;
  document.head.removeChild(divBlock);
  return bg;
}

/**
 * 递归寻找指定元素的背景色
 * @param el 元素
 * @returns 背景色值
 * @author shenjiaqi
 */
export function getInheritedBackgroundColor(el: HTMLElement): string {
  const defaultStyle = getDefaultBackground();
  const { backgroundColor } = window.getComputedStyle(el);
  if (backgroundColor !== defaultStyle) {
    return backgroundColor;
  }
  if (!el.parentElement) {
    return defaultStyle;
  }
  return getInheritedBackgroundColor(el.parentElement);
}
