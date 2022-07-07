import Vue from 'vue';

export const subscription = new Vue();
export const first = (array: Array<string>) => (Array.isArray(array) && array.length > 0 ? array[0] : null);
export const forEachParent = (startElement: any, callback: any) => {
  let element = startElement;
  while (
    callback
        && element.parentNode
        && element.parentNode.tagName !== 'BODY'
  ) {
    callback(element);
    element = element.parentNode;
  }
};
export const getFixedPositionParents = (element: any) => {
  const fixed: Array<string> = [];
  forEachParent(element, (node: any) => {
    const { position } = window.getComputedStyle(node);
    if (position === 'fixed') {
      fixed.push(node);
    }
  });
  return fixed;
};
export const getMaxZIndex = (elements = []) => elements.reduce((z, node) => {
  const nz = parseInt(getComputedStyle(node)['z-index'], 0) || 1;
  return Math.max(z, nz);
}, 1);
