<template>
  <div>
    <hxm-overlay
      :show="show"
      :zIndex="zIndexVal"
      :className="overlayClass"
      :duration="duration"
      :customStyle="overlayStyle"
      :fixedBody="fixedBody"
      @click="onClickOverlay">
    </hxm-overlay>

    <transition
      :name="getTransitionName"
      :appear="transitionAppear"
      @afterEnter="onOpened"
      @afterLeave="onClosed">
      <div ref="popupRef"
        v-show="show"
        class="hxmui-fontsize-adapter"
        :class="popupClasses"
        :style="popupStyles"
        @click="onClick">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Emit,
  Watch,
  Vue,
} from 'vue-property-decorator';
import hxmOverlay from '../Overlay';
import {
  createNamespace,
  isIphoneX,
} from '../utils/index';
import TouchMixin from '../mixins/touch';

const [bem] = createNamespace('popup');

let globalZIndex = 2000;

type PositionType = 'bottom' | 'top' | 'left' | 'right' | 'center';

@Component({
  name: 'Popup',
  components: {
    hxmOverlay,
  },
  mixins: [TouchMixin],
})
export default class Popup extends Vue {
  // control popup and overlay display
  @Prop({ default: false }) private show!: boolean;

  // popup width: only when position is left or right or center is effective
  @Prop({ default: '30%' }) private width!: string;

  // popup height: only when position is top or bottom or center is effective
  @Prop({ default: '30%' }) private height!: string;

  // display position
  @Prop({ default: 'center' }) private position!: PositionType;

  // cotrol border-radius display
  @Prop({ default: false }) private round!: boolean;

  @Prop() private zIndex!: number | string;

  // control lock body scroll
  @Prop({ default: true }) private fixedBody!: boolean;

  @Prop({ default: true }) private bottomSafeArea!: boolean;

  @Prop() private overlayStyle!: any;

  @Prop() private overlayClass!: any;

  @Prop() private duration!: number | string;

  @Prop() private popupStyle!: any;

  // animation class name
  @Prop() private transition!: string;

  // 是否在初始渲染时启用过渡动画
  @Prop({ default: false }) private transitionAppear!: boolean;

  private zIndexVal = 1;

  private totalLockCount = 0;

  @Emit('overlay-click')
  private onClickOverlay() {}

  // emit when click popup
  @Emit('click')
  private onClick() {}

  // set zIndex when popup is open
  @Emit('open')
  private onOpen() {
    if (this.zIndex !== undefined) {
      globalZIndex = +this.zIndex;
    }
    this.zIndexVal = globalZIndex;
  }

  // emit when close popup
  @Emit('close')
  private onClose() {}

  // emit when popup open and animation ended
  @Emit('opened')
  private onOpened() {}

  // emit when popup clos and animation ended
  @Emit('closed')
  private onClosed() {}

  @Watch('show')
  showWatcher(show: boolean) {
    if (show) {
      this.onOpen();
    } else {
      this.onClose();
    }
  }

  get getTransitionName() {
    let transitionName = this.position === 'center'
      ? 'hxmui-fade' : `hxmui-slide-${this.position}`;
    if (this.transition) {
      transitionName = this.transition;
    }
    return transitionName;
  }

  get popupClasses() {
    return bem({
      round: this.round,
      [this.position]: this.position,
      'safe-bottom-area': this.isShowSafeBottomArea,
    });
  }

  get isShowSafeBottomArea() {
    return this.bottomSafeArea
      && (this.position === 'bottom')
      && isIphoneX();
  }

  // integrate style props
  get popupStyles() {
    return {
      width: this.getPopupWidth,
      height: this.getPopupHeight,
      zIndex: this.zIndexVal,
      animationDuration: this.duration !== undefined
        ? `${this.duration}ms` : undefined,
      ...this.popupStyle,
    };
  }

  get getPopupWidth() {
    let width = '100%';
    const excludedPositionList = ['top', 'bottom'];
    if (excludedPositionList.indexOf(this.position) === -1) {
      width = this.width;
    } else if (this.width !== '30%') {
      console.warn('[popup] you don’t need to pass "width" prop');
    }
    return width;
  }

  get getPopupHeight() {
    let height = '100%';
    const excludedPositionList = ['left', 'right'];
    if (excludedPositionList.indexOf(this.position) === -1) {
      height = this.height;
    } else if (this.height !== '30%') {
      console.warn('[popup] you don’t need to pass "height" prop');
    }
    return height;
  }

  private getBemClass(params: any) {
    return bem(params);
  }
}
</script>
