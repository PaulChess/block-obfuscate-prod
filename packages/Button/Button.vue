<template>
 <div class="hxmui-button hxmui-fontsize-adapter"
  :style="[getConatainerWidth, customContainerStyle]">
   <button
    :class="[styleClasses, customClass]"
    @click="handleClick"
    @touchstart="()=>{}"
    :disabled="disabledStatus">
    <div :class="getBemClass('content')"
      @click="handleClick">
      <!-- normal -->
      <span class="text" v-if="!loading">
        <slot></slot>
      </span>
      <!-- loading -->
      <div class="loading-block" v-if="loading">
        <hxm-loading :color="loadingColor" :size="loadingSize"></hxm-loading>
        <span class="loading-text" v-if="loadingText">{{loadingText}}</span>
      </div>
      <!-- icon -->
      <div class="icon-block" v-if="icon && !loading">
        <img class="icon" :src="icon" :style="{width: iconWidth}">
        <span class="icon-text" v-if="iconText">{{iconText}}</span>
      </div>
    </div>
  </button>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';
import SetFontSize from '../mixins/SetFontSize';
import hxmLoading from '../Loading';
import { createNamespace } from '../utils/create/index';

const [bem] = createNamespace('button');

@Component({
  mixins: [SetFontSize],
  name: 'hxmButton',
  components: {
    hxmLoading,
  },
})

export default class HxmButton extends Vue {
  @Prop({ default: 'primary' }) private type!: string;

  @Prop({ default: 'normal' }) private size!: string;

  @Prop({ default: false }) private disabled!: boolean;

  @Prop({ default: false }) private round!: boolean; // 圆形

  @Prop({ default: false }) private square!: boolean; // 方形

  @Prop({ default: false }) private loading!: boolean;

  @Prop({ default: '' }) private loadingText!: string;

  @Prop({ default: '0.16em' }) private loadingSize!: string;

  @Prop({ default: '#fff' }) private loadingColor!: string;

  @Prop({ default: '' }) private icon!: string;

  @Prop({ default: '0.16em' }) private iconWidth!: string;

  @Prop({ default: '' }) private iconText!: string;

  @Prop({ default: '' }) private customClass !: string;

  @Prop() private customContainerStyle !: any;

  get styleClasses() {
    return bem([
      this.type,
      this.size,
      {
        round: this.round,
        square: this.square,
        disabled: this.disabled,
        loading: this.loading,
      },
    ]);
  }

  get getConatainerWidth() {
    let widthStyle = {};
    if (this.size === 'large') {
      widthStyle = { width: '100%' };
    } else if (this.size === 'medium') {
      widthStyle = { width: '50%' };
    }
    return widthStyle;
  }

  get disabledStatus() {
    let disabled = false;
    if (this.loading || this.disabled) {
      disabled = true;
    }
    return disabled;
  }

  getBemClass(params: any) {
    return bem(params);
  }

  handleClick() {
    this.$emit('click');
  }
}
</script>
