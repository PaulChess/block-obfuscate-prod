// 获取小数部分长度
function digitLength(num: number) {
  const nv = num.toString().split('.')[1];
  return nv ? nv.length : 0;
}

// 加法
function plus(num1: number, num2: number) {
  const baseNum = 10 ** Math.max(digitLength(num1), digitLength(num2));
  return (num1 * baseNum + num2 * baseNum) / baseNum;
}

function subtract(num1: number, num2: number) {
  const baseNum = 10 ** Math.max(digitLength(num1), digitLength(num2));
  return (num1 * baseNum - num2 * baseNum) / baseNum;
}
export default {
  plus,
  subtract,
};
