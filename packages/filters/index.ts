import { VueConstructor } from 'vue/types/umd';

/**
 * 手机号格式化
 * @param {String} phone
 */
const formatPhone = (phone: any) => {
  phone = phone.toString();
  return `${phone.substr(0, 3)}****${phone.substr(7, 11)}`;
};

/**
* 4位一空格（格式化银行卡）
* @param {String} val
*/
const formatBank = (val: any) => {
  if (val) {
    return val.toString().replace(/\s/g, '').replace(/(.{4})/g, '$1 ');
  }
  return val;
};

/**
* 千分位格式化
* @param {数字} val
*/
const toThousands = (val: any) => {
  let num = (val || 0).toString();
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return result;
};

/**
* 格式化小数位
* @param val 传入的值
* @param pos 保留的小数位
* @returns {*}
*/
const formatFloat = (val: any, pos = 2) => {
  let f = parseFloat(val);
  if (Number.isNaN(f)) {
    return false;
  }
  f = Math.round(val * 10 ** pos) / 10 ** pos; // pow 幂
  let s = f.toString();
  let rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + pos) {
    s += '0';
  }
  return s;
};

/**
* 格式化时长
* @param second
* @returns {string}
*/
const realFormatSecond = (second: number | number) => {
  const secondType = typeof second;

  if (secondType === 'number' || secondType === 'string') {
    second = parseInt(`${second}`, 10);

    const hours = Math.floor(second / 3600);
    second -= hours * 3600;
    const mimute = Math.floor(second / 60);
    second -= mimute * 60;

    return `${hours}:${(`0${mimute}`).slice(-2)}:${(`0${second}`).slice(-2)}`;
  }
  return '0:00:00';
};

const filters = {
  formatPhone,
  formatBank,
  toThousands,
  formatFloat,
  realFormatSecond,
};

export default (Vue: VueConstructor) => {
  Object.keys(filters).forEach((filterName: string) => {
    Vue.filter(filterName, filters[filterName]);
  });
};
