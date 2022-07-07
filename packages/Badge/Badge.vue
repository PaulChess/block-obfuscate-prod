<template>
  <div class="hxm-badge hxmui-fontsize-adapter">
    <div
      v-show="!hidden"
      :class="badgeValueCls"
      :style="(!color || color !== 'gold') && {'background-color': color}">
      <p>{{isDot ? '' : badgeVal}}</p>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'Badge',
})
export default class Badge extends Vue {
  @Prop({ default: '' }) value!: string | number;

  @Prop({ default: Infinity }) max!: number;

  @Prop({ default: false }) isDot?: boolean | '';

  @Prop({ default: false }) hidden!: boolean;

  @Prop({ default: '' }) color!: string;

  get badgeVal() {
    if (this.isTextVal) {
      return this.value;
    }
    return this.value > this.max ? `${this.max}+` : this.value;
  }

  get isTextVal() {
    return typeof this.value === 'string';
  }

  get badgeValueCls() {
    const cls = [];
    if (this.isDot !== false) {
      cls.push('hxm-badge__dot');
    } else {
      cls.push('hxm-badge__value');
      if (this.isTextVal) {
        cls.push('hxm-badge__value--text');
      }
    }
    if (!this.color) {
      cls.push('primary-bg');
    } else if (this.color === 'gold') {
      cls.push('sub-bg-yellow');
    }
    return cls;
  }
}
</script>
