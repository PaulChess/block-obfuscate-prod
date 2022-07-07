<template>
  <div :class="`hxm-cards-item ${size}`" @click="cardClick" :style="cardsItemStyle">
    <header v-if="title">{{ title }}</header>
    <slot />
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

@Component({ name: 'hxmCardsItem' })
export default class CardsItem extends Vue {
  // 尺寸
  @Prop({ default: 'small', type: String }) size!: string;

  // 标题
  @Prop({ default: '', type: String }) title!: string;

  // 背景色
  @Prop({ default: '#fff', type: String }) background!: string;

  // 阴影
  @Prop({ default: 'rgba(0, 0, 0, 0.03)', type: String }) shadowColor!: string;

  // 字体颜色
  @Prop({ default: '', type: String }) color!: string;

  // 圆角大小
  @Prop({ default: 16, type: Number }) borderRadius!: number;

  // 黑夜模式
  @Prop({ default: 0, type: Number }) night!: number;

  get nightBg() {
    return judgeDevice() === 'ios' ? '#191919' : '#1E1E1E';
  }

  // 计算prop的样式
  get cardsItemStyle() {
    const background = `background-color: ${
      this.night ? this.nightBg : this.background
    };`;
    const color = `color: ${this.color || this.night ? '#D2D2D3' : '#323232'};`;
    const shadow = `box-shadow: ${
      this.night ? 'rgba(0, 0, 0, 0.1)' : this.shadowColor
    } 0 0 12px 4px;`;
    const borderRadius = `border-radius: ${this.borderRadius / 200}em;`;
    return background + shadow + borderRadius + color;
  }

  cardClick() {
    this.$emit('click');
  }
}
</script>
