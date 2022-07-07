<template>
  <div class="klineloading-block
    hxmui-fontsize-adapter">
    <div class="first-kline">
      <div class="dot-up"></div>
      <div class="dot-down"></div>
      <div class="mask"
        :class="maskClass">
      </div>
    </div>
    <div class="second-kline">
      <div class="dot-up"></div>
      <div class="dot-down"></div>
      <div class="mask"
        :class="maskClass">
      </div>
    </div>
    <div class="third-kline">
      <div class="dot-up"></div>
      <div class="dot-down"></div>
      <div class="mask"
        :class="maskClass">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

@Component({
  name: 'KlineLoading',
})
export default class KlineLoading extends Vue {
  @Prop() private maskBg!: string;

  // 1.6.3版本新增
  @Prop({ default: 'hxm-pullrefresh-kloding-mask' }) private maskClass!: string;

  get maskBgStyle() {
    return {
      backgroundColor: this.maskBg,
    };
  }
}
</script>

<style lang="less" scoped>
.klineloading-block {
  width: 0.3em;
  height: 0.3em;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.first-kline, .second-kline, .third-kline {
  position: relative;
  width: 0.06em;
  height: 0.1em;
  background: #fa6060;
  border-radius: 0.02em;
  [theme-mode="black"] & {
    background: #a34a47;
  }
  .mask {
    position: absolute;
    bottom: -0.04em;
    left: -1px;
    content: '';
    display: inline-block;
    width: 0.1em;
    height: 0.3em;
    z-index: 999;
  }
  .dot-up, .dot-down {
    position: absolute;
    width: 0.02em;
    height: 0.03em;
    background: #fa6060;
    left: 50%;
    transform: translateX(-50%);
    [theme-mode="black"] & {
      background: #a34a47;
    }
  }
  .dot-up {
    top: -0.03em;
    border-top-left-radius: 0.01em;
    border-top-right-radius: 0.01em;
  }
  .dot-down {
    bottom: -0.03em;
    border-bottom-left-radius:0.01em;
    border-bottom-right-radius:0.01em;
  }
}
.first-kline {
  top: 0.03em;
  width: 0.07em;
  height: 0.08em;
  .mask {
    animation: moveMask 0.45s infinite alternate;
    animation-delay: 0.1s;
    bottom: -0.04em;
  }
}
.second-kline {
  width: 0.07em;
  height: 0.11em;
  margin: 0 0.04em;
  .mask {
    animation: moveMask 0.45s infinite alternate;
    animation-delay: 0.2s;
    bottom: -0.04em;
  }
}
.third-kline {
  top: -0.03em;
  width: 0.07em;
  height: 0.12em;
  .mask {
    animation: moveMask 0.45s infinite alternate;
    animation-delay: 0.3s;
    bottom: -0.04em;
  }
}

// 1.6.3新增 默认mask的颜色
.hxm-pullrefresh-kloding-mask {
  background-color: #fff;
  [theme-mode="black"] & {
    background-color: #121212;
  }
}

@keyframes moveMask {
  0% {
    bottom: -0.04em;
  }
  100% {
    bottom: calc(100% + 0.03em);
  }
}
</style>
