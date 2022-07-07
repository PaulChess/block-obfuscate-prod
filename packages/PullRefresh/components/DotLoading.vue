<template>
  <div ref="dotContainer"
    class="dotloading-block
      hxmui-fontsize-adapter">
    <div class="dot-1"
      ref="ball1"
      :style="dotStyle">
    </div>
    <div
      class="dot-2"
      ref="ball2"
      :style="dotStyle">
    </div>
    <div class="dot-3"
      ref="ball3"
      :style="dotStyle">
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';

// 开始计算进度的距离
const START_DISTANCE = 20;

// 小球透明度系数,此系数是为了小球透明度随着进度改变时多改变一点，防止因误差达不到最终距离
const BALL_OPACITY_INDEX = 1.6;

// 为了小球2在进度0%~50%之间每次随着进度改变时多改变一点，防止因误差达不到最终距离
const BALL2_LEFT_INDEX = 1.3;

// 为了小球3在进度50%~100%之间每次随着进度改变时多改变一点，防止因误差达不到最终距离
const BALL3_LEFT_INDEX = 1.1;

@Component({
  name: 'DotLoading',
})
export default class DotLoading extends Vue {
  // 当前下拉距离
  @Prop() private currDistance!: number;

  // 下拉刷新区域的总高度，默认50
  @Prop() private maxDistance!: number;

  @Prop() private dpr!: number;

  $refs!: {
    dotContainer: HTMLElement;
    ball1: HTMLDivElement;
    ball2: HTMLDivElement;
    ball3: HTMLDivElement;
  }

  @Watch('currDistance')
  currDistanceChange() {
    if (this.currDistance <= this.maxDistance && this.currDistance > this.startDistance) {
      // 运动进度小于等于50%
      if (this.currProgress <= 0.5) {
        this.$refs.ball2.style.opacity = this.getBall2Opacity();
        this.$refs.ball2.style.left = `${this.getBall2OffsetLeft()}px`;
      } else {
        // 运动进度大于50%
        this.$refs.ball3.style.opacity = this.getBall3Opacity();
        this.$refs.ball3.style.left = `${this.getBall3OffsetLeft()}px`;
      }
    } else if (this.currDistance > this.maxDistance) {
      // 兜底，将第2个球和第3个球直接设置到最终状态
      this.$refs.ball2.style.opacity = '1';
      this.$refs.ball3.style.opacity = '1';
      this.$refs.ball2.style.left = `${this.getMiddleOffset}px`;
      this.$refs.ball3.style.left = `${this.getRightOffset}px`;
    }
  }

  get startDistance() {
    return this.dpr * START_DISTANCE;
  }

  get currProgress() {
    return (this.currDistance - this.startDistance)
      / (this.maxDistance - this.startDistance);
  }

  // 整个盒子的宽度
  get containerWidth() {
    return parseInt(
      getComputedStyle(this.$refs.dotContainer).width, 10,
    );
  }

  // 盒子一半的宽度
  get halfContainerWidth() {
    return 0.5 * this.containerWidth;
  }

  // 小球的半径
  get ballRadius() {
    return parseInt(
      getComputedStyle(this.$refs.ball1).width, 10,
    ) / 2;
  }

  get firstBallOffsetLeft() {
    return parseInt(
      this.$refs.ball1.offsetLeft.toString(), 10,
    );
  }

  // 第2个球/第3个球的运动距离
  get ballMoveDistance() {
    return this.halfContainerWidth - (this.ballRadius + this.firstBallOffsetLeft);
  }

  // 第2个球最终的运动位置
  get getMiddleOffset() {
    return this.halfContainerWidth;
  }

  // 第3个球的最终的移动位置
  get getRightOffset() {
    return 0.8 * this.containerWidth;
  }

  // 兼容部分安卓机下使用em小球变形的问题
  get dotStyle() {
    return {
      width: `${6 * this.dpr}px`,
      height: `${6 * this.dpr}px`,
    };
  }

  getBall2Opacity() {
    let opacity = 0.02 * 100 * this.currProgress * BALL_OPACITY_INDEX;
    if (opacity >= 1) {
      opacity = 1;
    }
    return String(opacity);
  }

  getBall2OffsetLeft() {
    let offsetLeft = this.firstBallOffsetLeft
      + this.ballRadius
      + ((this.ballMoveDistance / 50) * BALL2_LEFT_INDEX)
      * this.currProgress * 100;
    if (offsetLeft >= this.getMiddleOffset) {
      offsetLeft = this.getMiddleOffset;
    }
    return offsetLeft;
  }

  getBall3Opacity() {
    let opacity = 0.02 * 100 * (this.currProgress - 0.5) * BALL_OPACITY_INDEX;
    if (opacity >= 1) {
      opacity = 1;
    }
    return String(opacity);
  }

  getBall3OffsetLeft() {
    let offset = this.firstBallOffsetLeft
      + this.ballRadius
      + ((this.ballMoveDistance / 50) * BALL3_LEFT_INDEX)
      + (this.currProgress - 0.5) * 100;
    if (offset >= this.getRightOffset) {
      offset = this.getRightOffset;
    }
    return offset;
  }
}
</script>

<style lang="less" scoped>
.dotloading-block {
  position: relative;
  width: 0.4em;
  height: 0.4em;
}
.dot-1,.dot-2,.dot-3 {
  position: absolute;
  background: #FA6060;
  border-radius: 200px;
  top: 50%;
  transform: translate(-50%,-50%);
  [theme-mode="black"] & {
    background: #a34a47;
  }
}
.dot-1 {
  left: 20%;
}
.dot-2 {
  left: 20%;
  opacity: 0;
}
.dot-3 {
  left: 50%;
  opacity: 0;
}
</style>
