<template>
  <div class="hxm-stepper hxmui-fontsize-adapter"
  :class="theme === 'blue' ? 'hxm-stepper-blue sub-text-blue' : 'primary-text'"
  :style="{'width': width, 'height': height}">
    <div class="hxm-subtract"
    :class="{'hxm-stepper-disablebtn': disableSubtract,
    'hxm-stepper-enablebtn': !disableSubtract,
    'hxm-stepper-enablebtn_active': subtractActive
    }"
    @click="subtract" @touchstart="touchStart('subtract')" @touchend="touchEnd('subtract')">
      <div class="hxm-icon hxm-icon-subtract"></div>
    </div>
    <div class="hxm-stepper-input-box" :class="{'hxm-stepper_disable': disable}">
      <input class="mid-text-primary hxm-font-thsm"
      :type="type"
      :placeholder="placeholder"
      v-model="inputValue"
      :disabled="disableInput || disable"
      @blur="blur"
      >
    </div>
    <div class="hxm-plus"
    :class="{'hxm-stepper-disablebtn': disablePlus,
    'hxm-stepper-enablebtn': !disablePlus,
    'hxm-stepper-enablebtn_active': plusActive
    }"
    @click="plus" @touchstart="touchStart('plus')" @touchend="touchEnd('plus')">
      <div class="hxm-icon hxm-icon-plus"></div>
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
import math from '../utils/math';

let timer1: any;
let timer2: any;

@Component({
  name: 'Stepper',
})
export default class Stepper extends Vue {
  // 初始值
  @Prop() private value!: any;

  @Prop() private width!: string;

  @Prop() private height!: string;

  @Prop({ default: 0 }) private decimalLength!: number;

  @Prop() private disable!: boolean;

  @Prop() private disableInput!: boolean;

  @Prop({ default: '' }) private placeholder!: string;

  @Prop() private step!: number;

  @Prop() private min!: number;

  @Prop() private max!: number;

  @Prop() private theme!: string;

  inputValue: string = this.value === '' ? '' : Number(this.value).toFixed(this.decimalLength);

  subtractActive = false;

  plusActive = false;

  type = document.documentElement.getAttribute('theme-platform') === 'gphone' ? 'tel' : 'number';

  get disableSubtract() {
    return this.min >= Number(this.inputValue) || this.disable;
  }

  get disablePlus() {
    return this.max <= Number(this.inputValue) || this.disable;
  }

  get reg() {
    return new RegExp(`^-?\\d*${this.decimalLength ? '\\.?' : ''}\\d{0,${this.decimalLength}}$`);
  }

  @Watch('inputValue')
  inputValueWatcher(nv: string, ov: string) {
    if (!this.reg.test(nv)) {
      this.inputValue = ov;
      this.$emit('change', +ov, 'ilegal');
    } else {
      this.$emit('change', +nv);
    }
  }

  // 长按减
  touchStart(btn: string) {
    this[`${btn}Active`] = true;
    timer1 = setTimeout(() => {
      timer2 = setInterval(() => {
        this[btn]();
      }, 100);
    }, 1000);
  }

  // 停止长按
  touchEnd(btn: string) {
    setTimeout(() => {
      this[`${btn}Active`] = false;
    }, 100);
    clearTimeout(timer1);
    clearInterval(timer2);
  }

  // 当前值减去步进
  subtract() {
    if (this.disableSubtract) {
      return;
    }
    let inputValue = math.subtract(Number(this.inputValue), Number(this.step));
    this.min !== undefined && (inputValue = Number(inputValue < this.min ? (this.$emit('change', this.min, 'min') && this.min.toFixed(this.decimalLength)) : inputValue.toFixed(this.decimalLength)));
    this.inputValue = String(inputValue.toFixed(this.decimalLength));
    this.$emit('subtract', this.inputValue);
  }

  // 当前值加上步进
  plus() {
    if (this.disablePlus) {
      return;
    }
    let inputValue = math.plus(Number(this.inputValue), Number(this.step));
    this.max !== undefined && (inputValue = Number(inputValue > this.max ? (this.$emit('change', this.max, 'max') && this.max.toFixed(this.decimalLength)) : inputValue.toFixed(this.decimalLength)));
    this.inputValue = String(inputValue.toFixed(this.decimalLength));
    this.$emit('plus', this.inputValue);
  }

  // 失去焦点
  blur() {
    if (this.inputValue === '') return;
    this.inputValue = Number(this.inputValue).toFixed(this.decimalLength);
    if (Number(this.inputValue) < this.min) {
      this.inputValue = String(this.min.toFixed(this.decimalLength));
      this.$emit('change', this.min, 'min');
    } else if (Number(this.inputValue) > this.max) {
      this.inputValue = String(this.max.toFixed(this.decimalLength));
      this.$emit('change', this.max, 'max');
    }
  }
}
</script>
