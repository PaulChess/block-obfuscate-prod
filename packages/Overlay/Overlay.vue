<template>
  <transition name="hxmui-fade" v-on:after-leave="transitionAfterLeave">
    <div
      v-show="show"
      :class="[getBemClass(), className]"
      :style="getOverlayStyle"
      @click="onClickOverlay">
      <slot></slot>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Emit,
  Vue,
  Watch,
} from 'vue-property-decorator';
import {
  createNamespace,
  preventDefault,
} from '../utils/index';
import { getScroller } from '../utils/scroll';
import TouchMixin from '../mixins/touch';

const [bem] = createNamespace('overlay');

const BODY_LOCK_CLASS = 'hxm-overflow-hidden';

let totalLockCount = 0;

@Component({
  name: 'Overlay',
  mixins: [TouchMixin],
})
export default class Overlay extends Vue {
  @Prop({ default: false }) private show!: boolean;

  @Prop() private zIndex!: number | string;

  @Prop() private duration!: number | string;

  @Prop() private className!: string;

  @Prop({ default: () => {} }) private customStyle!: any;

  @Prop({ default: true }) private fixedBody!: boolean;

  @Emit('click')
  private onClickOverlay() {}

  @Watch('shouldLockBody')
  shouldLockWatcher(lock: boolean) {
    lock ? this.addBodyLock() : this.removeBodyLock();
  }

  get shouldLockBody() {
    return this.show && this.fixedBody;
  }

  get getOverlayStyle() {
    return {
      zIndex: this.zIndex !== undefined ? +this.zIndex : undefined,
      animationDuration: this.duration !== undefined ? `${this.duration}ms` : undefined,
      ...this.customStyle,
    };
  }

  private addBodyLock() {
    document.addEventListener('touchstart', this.touchStart);
    document.addEventListener('touchmove',
      this.onTouchMove,
      { passive: false });
    if (totalLockCount === 0) {
      document.body.classList.add(BODY_LOCK_CLASS);
    }
    totalLockCount++;
  }

  private removeBodyLock() {
    if (totalLockCount) {
      document.removeEventListener('touchstart', this.touchStart);
      document.removeEventListener('touchmove', this.onTouchMove);
      totalLockCount--;
      if (totalLockCount === 0) {
        document.body.classList.remove(BODY_LOCK_CLASS);
      }
    }
  }

  // https://blog.csdn.net/riddle1981/article/details/102659958
  private onTouchMove(e: TouchEvent) {
    this.touchMove(e);
    const el = getScroller(e.target as HTMLElement,
      this.$refs.popupRef as HTMLElement) as HTMLElement;
    const { scrollTop, offsetHeight, scrollHeight } = el;
    const direction = this.pos.deltaY > 0 ? '10' : '01';
    let status = '11';
    if (scrollTop === 0) {
      status = offsetHeight >= scrollHeight ? '00' : '01';
    } else if (scrollTop + offsetHeight >= scrollHeight) {
      status = '10';
    }
    if (status !== '11'
       && this.isVertical
       && !(parseInt(status, 2) & parseInt(direction, 2))) {
      if (e.cancelable) {
        preventDefault(e, true);
      }
    }
  }

  private reset() {
    totalLockCount = 0;
    document.body.classList.remove(BODY_LOCK_CLASS);
  }

  // v1.11.4 暴露overlay transition 结束的回调
  private transitionAfterLeave() {
    this.$emit('overlay-after-leave');
  }

  private getBemClass(params: any) {
    return bem(params);
  }

  beforeDestroy() {
    this.reset();
  }
}
</script>
