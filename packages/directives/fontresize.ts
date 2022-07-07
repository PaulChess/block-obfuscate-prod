/**
 * @description: 根据文本溢出比例，等比例缩小字体，过长的字体溢出裁剪，使用前提示绑定的元素宽度固定或者有最大宽度
 * @usage v-hxmui-fontresize
 */

interface Binding {
  value: any;
}
export default (Vue: any) => {
  function handler(el: HTMLElement, binding: Binding) {
    el.classList.remove('hxmui-ellipsis');
    let originSize = Number(el.getAttribute('origin-fontsize'));
    if (!originSize) {
      originSize = parseFloat(getComputedStyle(el, '')['font-size']);
      el.setAttribute('origin-fontsize', String(originSize));
    }
    el.style.fontSize = `${originSize}px`;
    if (el.scrollWidth - el.offsetWidth <= 0) {
      el.style.fontSize = `${originSize}px`;
      return;
    }
    const overflowrate = Number(Number(1 + (el.scrollWidth - el.offsetWidth) / el.offsetWidth).toFixed(2));
    const fontsize = parseFloat(getComputedStyle(el, '')['font-size']);
    const minSize = Number(document.documentElement.getAttribute('data-dpr') || 1) * ((binding.value && binding.value.minSize) || 12);
    let newSize;
    newSize = fontsize / overflowrate;
    if (newSize < minSize) {
      newSize = minSize;
      el.classList.add('hxmui-ellipsis');
    }
    el.style.fontSize = `${newSize}px`;
  }
  Vue.directive('hxmui-fontresize', {
    bind(el: HTMLElement, binding: Binding) {
      setTimeout(() => {
        handler(el, binding);
      }, 30);
    },
    componentUpdated(el: HTMLElement, binding: Binding) {
      setTimeout(() => {
        handler(el, binding);
      }, 50);
    },
  });
};
