<template>
  <div class="hxmui-icon hxmui-fontsize-adapter" @click="click">
    <svg class="icon"
      aria-hidden="true"
      :style="iconStyle">
      <use :xlink:href="iconName"></use>
    </svg>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Emit,
} from 'vue-property-decorator';
import './assets/svg-symbols';
import './assets/svg-symbols2';

@Component({
  name: 'hxmIcon',
})

export default class HxmIcon extends Vue {
  @Prop({ default: '' }) private name!: string;

  @Prop({ default: '0.24em' }) private size!: string;

  @Prop({ default: '' }) private color!: string;

  @Prop({ default: '' }) private darkThemeColor!: string;

  private renderColor = this.color;

  get iconName() {
    return `#icon-${this.name}`;
  }

  get iconStyle() {
    const mode = document.documentElement.getAttribute('theme-mode');
    if (mode === 'black') {
      this.renderColor = this.darkThemeColor;
    } else {
      this.renderColor = this.color;
    }
    return {
      width: this.size,
      height: this.size,
      fill: this.renderColor,
    };
  }

  // v1.9.0 增加click的emit
  @Emit('click')
  click(e: MouseEvent) {
    return e;
  }
}
</script>
