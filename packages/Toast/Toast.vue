<template>
  <transition name="hxmui-fade">
    <div v-show="isShow" class="hxm-toast hxmui-fontsize-adapter" :style="{ zIndex: zIndex}">
      <div v-if="hasValidIcon" class="hxm-toast__icon" :class="`hxm-toast__icon--${type}`"></div>
      <p class="hxm-toast__txt" v-html="content"></p>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

interface OptionsType {
  duration?: number;
  zIndex?: number;
  type?: 'success' | 'error' | 'warn';
}

@Component({
  name: 'Toast',
})
export default class Toast extends Vue {
  duration = 2000;

  isShow = false;

  content = '';

  zIndex = 9999;

  timer?: number;

  type: 'success' | 'error' | 'warn' | '' = '';

  /**
   * 当前是否显示 icon 且类型有效
   */
  get hasValidIcon() {
    return ['success', 'error', 'warn'].includes(this.type);
  }

  show(content: string, options: OptionsType = {}) {
    this.content = content;
    if (options.zIndex) {
      this.zIndex = options.zIndex;
    }
    this.type = options.type || '';
    this.isShow = true;
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.isShow = false;
    }, options.duration || this.duration);
  }

  success(content: string, options: OptionsType = {}) {
    this.show(content, {
      type: 'success',
      ...options,
    });
  }

  error(content: string, options: OptionsType = {}) {
    this.show(content, {
      type: 'error',
      ...options,
    });
  }

  warn(content: string, options: OptionsType = {}) {
    this.show(content, {
      type: 'warn',
      ...options,
    });
  }
}
</script>
