<template>
  <div class="hxm-switch hxmui-fontsize-adapter">
    <div
      class="hxm-switch__box"
      :class="[
        { 'hxm-form__disabled': disabled !== false },
        checkedCtrl ? 'primary-bg' : 'line-dark'
      ]"
      :style="boxStyle"
      @click.stop="handleClick">
      <div v-show="!checkedCtrl" class="line-dark hxm-switch__box--inner"
        :style="{borderRadius}">
      </div>
      <div class="hxm-switch__dot__wrapper" ref="switchBox">
        <div class="hxm-switch__dot" :class="{'hxm-switch_dot_transition': transCtrl}" :style="dotStyle" ref="switchDot">
          <hxm-loading v-if="loading" size='0.16em'></hxm-loading>
        </div>
      </div>
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
import hxmLoading from '../Loading';

@Component({
  name: 'hxmSwitch',
  model: {
    prop: 'checked',
    event: 'change',
  },
  components: {
    hxmLoading,
  },
})
export default class HxmSwitch extends Vue {
  @Prop({ default: false }) private checked!: boolean | number | string;

  @Prop({ default: true }) private activeValue!: boolean | number | string;

  @Prop({ default: false }) private inactiveValue!: boolean | number | string;

  @Prop({ default: false }) private disabled!: boolean;

  @Prop({ default: false }) private loading!: boolean;

  @Prop({
    default() {
      return ['0.525em', '0.32em'];
    },
  }) private size!: string[];

  private transCtrl = false;

  dotOffset = 0;

  // 对checked属性进行二次包装，真正用于控制按钮的状态
  get checkedCtrl() {
    let res = false;
    switch (this.checked) {
      case this.activeValue:
        res = true;
        break;
      case this.inactiveValue:
        res = false;
        break;
      default:
        console.warn('hxmSwitch: 请确保checked的值与activeValue或inactiveValue保持一致');
        break;
    }
    return res;
  }

  get borderRadius() {
    return this.size[1].replace(/^(\d+.?\d+)/, (num: string) => `${+num / 2}`);
  }

  get boxStyle() {
    return {
      width: this.size[0],
      height: this.size[1],
      borderRadius: this.borderRadius,
    };
  }

  get dotStyle() {
    const res = this.size[1].replace(/^(\d+.?\d+)/, (num: string) => `${+num - 0.04}`);
    const left = this.checkedCtrl ? this.dotOffset : 0;
    return {
      width: res,
      height: res,
      left: `${left}px`,
    };
  }

  checkedDotOffset() {
    this.$nextTick(() => {
      const boxWidth = this.$refs.switchBox ? (this.$refs.switchBox as HTMLElement).offsetWidth : 0;
      const dotWidth = this.$refs.switchDot ? (this.$refs.switchDot as HTMLElement).offsetWidth : 0;
      this.dotOffset = boxWidth - dotWidth;
    });
  }

  handleClick(e: MouseEvent) {
    if (this.loading) {
      return;
    }
    // 开启transition过渡
    this.transCtrl = true;
    this.handleChange();
    this.$emit('click', e);
  }

  @Watch('checked')
  checkedWatcher() {
    this.checkedDotOffset();
  }

  handleChange() {
    let res: string | boolean | number = false;
    // 将状态取反
    switch (this.checked) {
      case this.inactiveValue:
        res = this.activeValue;
        break;
      case this.activeValue:
        res = this.inactiveValue;
        break;
      default:
        console.warn('hxmSwitch: 请确保checked的值与activeValue或inactiveValue保持一致');
        break;
    }
    this.$emit('change', res);
  }

  mounted() {
    this.checkedDotOffset();
  }
}
</script>
