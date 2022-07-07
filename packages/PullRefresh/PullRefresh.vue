<template>
  <div class="hxm-pull-refresh hxmui-fontsize-adapter">
    <div :class="getBemClass('track')"
      :style="trackStyle"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd">
      <div :class="getBemClass('head')"
        :style="getHeadStyle">
        <!-- 默认渲染内容 -->
        <div :class="getBemClass('default-container')">
          <!-- pulling/loosing/loading的样式与success完全不同，所以分开来写 -->
          <div :class="getBemClass('status-block')">
            <div :class="getBemClass('left-icon')">
              <div class="dot-loading"
                v-if="isShowPullingIcon">
                <dot-loading
                  :currDistance="realPullDistance"
                  :maxDistance="realHeadHeightBydpr"
                  :dpr="dpr"/>
              </div>
              <div class="kline-loading"
                v-if="isShowLoadingIcon">
                <kline-loading :maskClass="maskClass"/>
              </div>
            </div>
            <span class="status-text"
              v-if="status !== 'success'">
              {{renderText}}
            </span>
          </div>
          <div :class="getBemClass('success-block')"
            :style="isShowDefaultSuccess ? 'opacity: 1' : 'opacity: 0'">
            <span class="success-text">
              {{renderText}}
            </span>
          </div>
        </div>
        <!-- 具名插槽内容 -->
        <div :class="getBemClass('slots-container')">
          <slot name="pulling" v-if="status === 'pulling'"></slot>
          <slot name="loosing" v-if="status === 'loosing'"></slot>
          <slot name="loading" v-if="status === 'loading'"></slot>
          <slot name="success" v-if="status === 'success'"></slot>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Watch,
} from 'vue-property-decorator';
import SetFontSize from '../mixins/SetFontSize';
import { getScrollTop, getScroller } from '../utils/scroll';
import { createNamespace, unitToPx } from '../utils/index';
import KlineLoading from './components/KlineLoading.vue';
import DotLoading from './components/DotLoading.vue';

const [bem] = createNamespace('pull-refresh');

const MIN_DISTANCE = 10;

const DEFAULT_HEAD_HEIGHT = 50;

type ScrollType = HTMLElement | Window;

@Component({
  name: 'PullRefresh',
  mixins: [SetFontSize],
  components: {
    DotLoading,
    KlineLoading,
  },
})
export default class PullRefresh extends Vue {
  private scrollEl: ScrollType = window;

  private reachTop = false;

  private duration = 0;

  private distance = 0;

  private realPullDistance = 0;

  private dpr = 1;

  private position = {
    startX: 0,
    startY: 0,
    deltaX: 0,
    deltaY: 0,
  };

  private isVertical = false;

  private status = 'normal'; // loading loosing pulling normal success

  @Prop({ default: false }) private value!: boolean;

  @Prop({ default: false }) private disabled!: boolean;

  @Prop({ default: DEFAULT_HEAD_HEIGHT }) private headHeight!: number | string;

  @Prop({ default: 300 }) private animationDuration!: number | string;

  @Prop({ default: 1000 }) private successDuration!: number | string;

  // 1.6.3 新增，让用户自己设置mask蒙层的颜色，后期有更好的方案可以替换掉
  @Prop() private maskClass!: string;

  @Prop({ default: '下拉刷新' }) private pullingText!: string;

  @Prop({ default: '释放刷新' }) private loosingText!: string;

  @Prop({ default: '加载中' }) private loadingText!: string;

  @Prop({ default: '刷新成功' }) private successText!: string;

  // 1.6.4新增 让用户自己指定寻找父级可滚动容器的元素
  @Prop() private targetTouchEl!: null;

  get trackStyle() {
    return {
      transitionDuration: `${this.duration}ms`,
      transform: `translateY(${this.distance}px)`,
      transitionProperty: 'transform',
    };
  }

  get renderText() {
    // 当未触发下拉或对应的状态插槽中有内容，默认文本不展示
    if (this.status === 'normal' || this.$slots[this.status]) {
      return '';
    }
    return this[`${this.status}Text`];
  }

  get isShowDefaultSuccess() {
    return this.status === 'success' && !this.$slots.success;
  }

  get isShowPullingIcon() {
    return (this.status === 'pulling' || this.status === 'loosing')
      && !(this.$slots.pulling || this.$slots.loosing);
  }

  get isShowLoadingIcon() {
    return this.status === 'loading' && !this.$slots.loading;
  }

  get realHeadHeightBydpr() {
    // 当传入的 headHeight 为 rem时，转换为px后不需要再乘以 dpr
    // issue: http://gogs.myhexin.com/Ths-Kernel-Fe/thsc-hxmui/issues/89
    return (typeof this.headHeight === 'string' && this.headHeight.includes('rem'))
      ? unitToPx(this.headHeight) : this.dpr * unitToPx(this.headHeight);
  }

  get getHeadStyle() {
    return {
      height: `${this.realHeadHeightBydpr}px`,
      lineHeight: `${this.realHeadHeightBydpr}px`,
    };
  }

  @Watch('value')
  valueChange(val: boolean) {
    if (val) {
      this.setStatus(+this.realHeadHeightBydpr, true);
    } else if (this.$slots.success || this.successText) {
      // 展示加载成功的文案
      this.showSuccessTip();
    } else {
      this.setStatus(0, false);
    }
  }

  @Watch('targetTouchEl')
  targetTouchElChange(el: HTMLElement | null) {
    this.getScrollEl(el);
  }

  init() {
    this.getScrollEl(this.targetTouchEl);
    this.getDpr();
  }

  getScrollEl(el: HTMLElement | null) {
    this.scrollEl = el ? getScroller(el) : getScroller(this.$el as HTMLElement);
  }

  // 是否可触发滑动
  isTouchable() {
    return !this.disabled
    && this.status !== 'loading'
    && this.status !== 'success';
  }

  checkPosition(e: TouchEvent) {
    this.reachTop = getScrollTop(this.scrollEl) === 0;

    if (this.reachTop) {
      this.duration = 0;
      this.position.startX = e.touches[0].clientX;
      this.position.startY = e.touches[0].clientY;
    }
  }

  setStatus(distance: number, isLoading?: boolean) {
    this.distance = distance;

    if (isLoading) {
      this.status = 'loading';
    } else if (distance === 0) {
      this.status = 'normal';
    } else if (distance < this.realHeadHeightBydpr) {
      this.status = 'pulling';
    } else {
      this.status = 'loosing';
    }
  }

  // calculate real distance according to headHeight
  ease(distance: number) {
    const headHeight = +this.realHeadHeightBydpr;

    if (distance > headHeight) {
      if (distance < headHeight * 2) {
        distance = headHeight + (distance - headHeight) / 2;
      } else {
        distance = headHeight * 1.5 + (distance - headHeight * 2) / 4;
      }
    }
    return distance;
  }

  showSuccessTip() {
    this.status = 'success';
    setTimeout(() => {
      this.setStatus(0);
    }, +this.successDuration);
  }

  isVerticalDirection(x: number, y: number) {
    return y > x && y > MIN_DISTANCE;
  }

  onTouchStart(e: TouchEvent) {
    this.checkPosition(e);
  }

  onTouchMove(e: TouchEvent) {
    this.position.deltaX = e.touches[0].clientX - this.position.startX;
    this.position.deltaY = e.touches[0].clientY - this.position.startY;
    this.isVertical = this.isVerticalDirection(Math.abs(this.position.deltaX),
      Math.abs(this.position.deltaY));

    if (this.isTouchable()) {
      if (!this.reachTop) {
        this.checkPosition(e);
      }

      if (this.reachTop && this.position.deltaY > 0 && this.isVertical) {
        if (e.cancelable) {
          e.preventDefault();
        }
        this.realPullDistance = this.position.deltaY / 1.6; // 除以1.6是为了增加下拉阻尼
        this.setStatus(this.ease(this.realPullDistance));
      }
    } else if (e.cancelable
      && this.reachTop
      && this.position.deltaY > 0
      && this.isVertical) {
      e.preventDefault();
    }
  }

  onTouchEnd() {
    this.duration = +this.animationDuration;
    if (this.isTouchable() && this.reachTop) {
      if (this.status === 'loosing') {
        this.setStatus(+this.realHeadHeightBydpr, true);
        // 触发loading
        this.$emit('input', true);
        this.$nextTick(() => {
          this.$emit('refresh');
        });
      } else {
        this.setStatus(0);
      }
    }
  }

  getDpr() {
    if (document.documentElement.getAttribute('data-dpr')) {
      this.dpr = +(document as any).documentElement.getAttribute('data-dpr');
    }
  }

  getBemClass(params: any) {
    return bem(params);
  }

  mounted() {
    this.init();
  }
}
</script>
