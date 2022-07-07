<template>
  <div class="hxm-search hxmui-fontsize-adapter card-bg" @click="handleClick">
    <div class="hxm-search__container global-bg">
      <i class="hxm-search__icon--search"></i>
      <input
        ref="inputRef"
        type="text"
        class="hxm-search__input global-bg mid-text-primary"
        :placeholder="placeholder"
        v-model="iptVal"
        :disabled="isDisabled"
        @input="handleInput"
        @focus="handleFocus"
      >
      <i
        v-show="iptVal !== ''"
        class="hxm-search__icon--close"
        @click="handleClearIpt"
      ></i>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Emit,
  Watch,
} from 'vue-property-decorator';
import emitter from '../mixins/emitter';

@Component({
  name: 'Search',
  mixins: [emitter],
})
export default class Search extends Vue {
  @Prop({ default: '股票代码/名称/简拼/功能关键词' }) placeholder?: string;

  @Prop({ default: '' }) value!: string;

  @Prop({ default: false }) disabled?: boolean | '';

  @Prop({ default: 300 }) debounceTimeout?: number;

  @Prop({ default: true }) autoFocus!: boolean;

  debounceTimer: number | null = null;

  iptVal = '';

  oldIptVal = '';

  $refs!: {
    inputRef: HTMLElement;
  }

  get isDisabled() {
    return this.disabled !== false;
  }

  @Watch('value')
  searchPatternWatcher(val: string) {
    this.iptVal = val;
  }

  handleInput() {
    this.debounceTimer && clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      if (this.oldIptVal !== this.iptVal) {
        this.oldIptVal = this.iptVal;
        this.emitInputEvent();
      }
    }, this.debounceTimeout);
  }

  @Emit('click')
  handleClick() {
    return undefined;
  }

  @Emit('clear')
  handleClearIpt() {
    this.iptVal = '';
    this.emitInputEvent();
  }

  @Emit('focus')
  handleFocus() {}

  @Emit('input')
  emitInputEvent() {
    this.dispatch('SearchPage', 'value-change', this.iptVal);
    return this.iptVal;
  }

  created() {
    this.iptVal = this.value;
    this.oldIptVal = this.value;
  }

  mounted() {
    if (this.autoFocus) {
      this.$nextTick(() => {
        const { inputRef } = this.$refs;
        if (inputRef) inputRef.focus();
      });
    }
  }
}
</script>
