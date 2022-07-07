/**
 * animation related functions
 * refrence: https://github.com/youzan/vant/blob/vant_cli_v3/packages/vant-use/src/utils.ts
 * @date 2021-10-30
 */

let prev = Date.now();

function rafPolyfill(fn: FrameRequestCallback): number {
  const curr = Date.now();
  const ms = Math.max(0, 16 - (curr - prev));
  const id = setTimeout(fn, ms);
  prev = curr + ms;
  return id;
}

// requestAnimationFrame: 保证回调函数在每一次的刷新间隔中(根据屏幕刷新率决定, 60hz: 1/60, 70hz: 1/70)只被执行一次
// refrence: https://juejin.cn/post/6844903649366245384
export function raf(fn: FrameRequestCallback): number {
  const requestAnimationFrame = window.requestAnimationFrame || rafPolyfill;
  return requestAnimationFrame.call(window, fn);
}

export function cancelRaf(id: number) {
  const cancelAnimationFrame = window.cancelAnimationFrame || window.clearTimeout;
  cancelAnimationFrame.call(window, id);
}

// use double raf to ensure animation can start
// vant issue: https://github.com/youzan/vant/issues/3720
// Why doubleRef? Refrence: https://lequ7.com/guan-yu-javascript-cong-yi-ci-ye-wu-xu-qiu-xiang-dao-de-si-zhong-lun-bo-zu-jian-shi-xian-si-lu.html
export function doubleRaf(fn: FrameRequestCallback): void {
  raf(() => raf(fn));
}
