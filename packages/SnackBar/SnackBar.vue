<template>
  <transition name="hxmui-fade">
    <div
      class="hxm-snackbar_mask"
      v-show="isShow"
      @click="hide"
      ref="mask"
      :style="{ zIndex: option.zIndex }"
    >
      <div
        class="hxm-snackbar hxmui-fontsize-adapter"
        :style="calcHeight + calcBorderRadius"
        @click.stop="isShow = true"
      >
        <span :style="calcFontSise">{{ option.text }}</span>
        <button v-if="option.btnName" @click.stop="btnClick">{{ option.btnName }}</button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import hxmButton from '../Button';

type OptionType = {
  text: string;
  zIndex?: number;
  btnName?: string;
  height?: number;
  fontSize?: number;
  borderRadius?: number;
  btnClick?: Function | null;
};

@Component({ components: { hxmButton } })
export default class SnackBar extends Vue {
  isShow = false;

  // 配置
  option: OptionType = {
    // 文本
    text: '',
    zIndex: 10,
    btnName: '',
    height: 88,
    fontSize: 28,
    borderRadius: 8,
    btnClick: null,
  };

  // 定时器
  timer = 0;

  get calcHeight() {
    return this.option.height ? `height: ${this.option.height / 200}em;` : '';
  }

  get calcFontSise() {
    return this.option.fontSize
      ? `font-size: ${this.option.fontSize / 200}em;`
      : '';
  }

  get calcBorderRadius() {
    return this.option.borderRadius
      ? `border-radius: ${this.option.borderRadius / 200}em;`
      : '';
  }

  // 显示snackbar
  show(option?: OptionType | string) {
    this.isShow = true;
    if (typeof option === 'object') {
      Object.assign(this.option, option);
    }
    if (typeof option === 'string') {
      this.option.text = option;
    }
    this.timer = setTimeout(() => {
      this.hide();
    }, 5000);
  }

  // 隐藏snackbar
  hide() {
    clearTimeout(this.timer);
    this.isShow = false;
    this.option = {
      text: '',
      zIndex: 10,
      btnName: '',
      height: 88,
      fontSize: 28,
      borderRadius: 8,
      btnClick: null,
    };
  }

  // 点击遮罩事件
  clickMask() {
    this.hide();
  }

  btnClick() {
    typeof this.option.btnClick === 'function' && this.option.btnClick();
  }

  bindTouchEvent() {
    let startY: number;
    const touchstart = (e: TouchEvent) => {
      startY = e.touches[0].pageY;
    };
    const touchmove = (e: TouchEvent) => {
      const diff = e.changedTouches[0].pageY - startY;
      if (diff < 0) {
        this.hide();
      }
    };
    const dom = this.$refs.mask as HTMLElement;
    dom.addEventListener('touchstart', touchstart);
    dom.addEventListener('touchmove', touchmove);
    this.$once('hook:beforeDestroy', () => {
      dom.removeEventListener('touchstart', touchstart);
      dom.removeEventListener('touchmove', touchmove);
    });
  }

  mounted() {
    this.bindTouchEvent();
  }
}
</script>
