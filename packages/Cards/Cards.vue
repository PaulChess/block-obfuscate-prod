<template>
  <div
    :class="`hxm-cards hxm-cards_${size} hxmui-fontsize-adapter`"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
    ref="cards"
    :style="cardsStyle"
  >
    <div class="hxm-cards_box" :style="boxWidth + boxTransform + duration">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

// 判断是安卓还是ios
const judgeDevice = () => {
  const u = navigator.userAgent;
  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
  if (isIOS) {
    return 'ios';
  }
  if (isAndroid) {
    return 'android';
  }
  return '';
};

const MIN_DISTANCE = 20;

@Component({ name: 'hxmCards' })
export default class Cards extends Vue {
  @Prop({ default: '#fff', type: String }) background!: string;

  @Prop({ default: 'small', type: String }) size!: string;

  @Prop({ default: 0, type: Number }) night!: number;

  get nightBg() {
    const color = this.night === 1 ? '#171616' : '#1E1E1E';
    return judgeDevice() === 'ios' ? '#020202' : color;
  }

  // 卡片的样式
  get cardsStyle() {
    const background = this.night ? this.nightBg : this.background;
    return `background-color: ${background};`;
  }

  get wholeWidth() {
    const [width, gap] = this.size === 'small' ? [1.365, 0.12] : [3.13, 0.1];
    return this.children.length * (width + gap) - gap;
  }

  get boxWidth() {
    const height = this.size === 'small' ? 1.88 : 1.515;
    return `width: ${this.wholeWidth}em;height: ${height}em;`;
  }

  get boxTransform() {
    if (this.size === 'small') return '';
    const delta = (this.moveX - this.startX) / 200;
    let offset: number;
    if (this.moving) {
      if (Math.abs(delta) > this.childWidth) {
        offset = delta > 0 ? this.childWidth : -this.childWidth;
      } else {
        offset = delta;
      }
    } else {
      offset = 0;
    }
    return `transform: translateX(${this.position + offset}em);`;
  }

  // 过渡持续时间
  get duration() {
    return this.size === 'small'
      ? ''
      : `transition-duration: ${this.moving ? 0 : 300}ms;`;
  }

  get children() {
    return (this as any).$slots.default;
  }

  get dom() {
    return this.$refs.cards as HTMLElement;
  }

  // 滑块宽
  childWidth = 3.24;

  // 当前位置
  position = 0;

  // 滑块开始的X
  startX = 0;

  // 滑块移动的X
  moveX = 0;

  // 开始touch的时间点
  touchStartTime = 0;

  // 是否手指还在屏幕上
  moving = false;

  resetStatus() {
    this.moveX = 0;
    this.startX = 0;
  }

  touchStart(e: TouchEvent) {
    if (this.size === 'small') return;
    this.startX = e.touches[0].clientX;
    this.touchStartTime = Date.now();
    document.body.style.overflow = 'hidden';
  }

  touchMove(e: TouchEvent) {
    if (this.size === 'small') return;
    this.moving = true;
    this.moveX = e.touches[0].clientX;
  }

  touchEnd() {
    if (this.size === 'small') return;
    document.body.style.overflow = 'auto';
    this.moving = false;
    const delta = this.moveX - this.startX;
    const absDelta = Math.abs(delta);
    if (absDelta > MIN_DISTANCE) {
      const duration = Date.now() - this.touchStartTime;
      const speed = absDelta / duration;
      const shouldSwipe = speed > 0.25 || absDelta > this.childWidth * 100;
      // 符合滑动条件 滑至下一个滑块
      if (shouldSwipe) {
        if (delta > 0) {
          this.position += this.childWidth;
        } else {
          this.position -= this.childWidth;
        }
        const minusWidth = this.wholeWidth - 3.43;
        if (this.position > 0) {
          this.position = 0;
        } else if (this.position < -minusWidth) {
          this.position = -minusWidth;
        }
      } else {
        this.resetStatus();
      }
    } else {
      this.resetStatus();
    }
  }
}
</script>
