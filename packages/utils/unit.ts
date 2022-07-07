// cache
let rootFontSize: number;

export function getRootFontSize() {
  if (!rootFontSize) {
    const doc = document.documentElement;
    const fontSize = doc.style.fontSize || window.getComputedStyle(doc).fontSize;
    rootFontSize = parseFloat(fontSize);
  }
  return rootFontSize;
}

export function convertRem(value: string): number {
  value = value.replace(/rem/g, '');
  return +value * getRootFontSize();
}

export function convertVw(value: string): number {
  value = value.replace(/vw/g, '');
  return (+value * window.innerWidth) / 100;
}

export function convertVh(value: string): number {
  value = value.replace(/vh/g, '');
  return (+value * window.innerHeight) / 100;
}

// 将单位转换成px
export function unitToPx(value: string | number): number {
  if (typeof value === 'number') {
    return value;
  }
  if (value.includes('rem')) {
    return convertRem(value);
  }
  if (value.includes('vw')) {
    return convertVw(value);
  }
  if (value.includes('vh')) {
    return convertVh('vh');
  }

  return parseFloat(value);
}
