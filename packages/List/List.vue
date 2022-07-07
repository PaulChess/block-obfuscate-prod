<template>
  <div class="hxm-list hxmui-fontsize-adapter" ref="list">
    <div class="hxm-list__main">
      <slot></slot>
    </div>
    <div class="hxm-list__bottom mid-text-sub" v-if="showBottomBlock">
      <p class="hxm-list__bottom__text" v-if="finished">{{ finishedText }}</p>

      <slot name="loading" v-else-if="value">
        <hxm-loading :size="loadingSize" :color="loadingColor"></hxm-loading>
      </slot>

      <slot name="error" v-else>
        <p class="hxm-list__bottom__error" @click="load">{{ errorText }}</p>
      </slot>
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
import scrollWatcher from '../utils/scrollWatcher';

@Component({
  name: 'List',
})
export default class List extends Vue {
  @Prop() private value!: boolean;

  @Prop() private finished!: boolean;

  @Prop() private error!: boolean;

  @Prop() private errorToast!: string;

  @Prop({ default: '上拉加载更多' }) private errorText!: string;

  @Prop({ default: '已经到底了' }) private finishedText!: string;

  @Prop({ default: false }) private bottomSafeArea!: boolean;

  @Prop({ default: '' }) private loadingColor!: string;

  @Prop({ default: '0.18em' }) private loadingSize!: string;

  get showBottomBlock() {
    return !(this.finished && this.finishedText === '');
  }

  private get bottomTxt() {
    let txt = '';
    if (this.finished) {
      txt = this.finishedText;
    } else if (this.value) {
      txt = '加载中...';
    }
    return txt;
  }

  @Watch('finished')
  handleFinishedChange(val: boolean) {
    if (val) {
      scrollWatcher.off('bottom', this.handleScroll);
    } else {
      scrollWatcher.on('bottom', this.handleScroll);
    }
  }

  handleScroll(type: string, isReturn: boolean) {
    if (type === 'bottom' && isReturn && !this.value && !this.finished) {
      this.$emit('input', true);
      this.$emit('load');
    }
  }

  load() {
    this.$emit('update:error', false);
    this.$emit('input', true);
    this.$emit('load');
  }

  mounted() {
    scrollWatcher.on('bottom', this.handleScroll);
  }
}
</script>
