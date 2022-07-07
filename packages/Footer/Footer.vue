<template>
  <div
    class="hxm-footer hxmui-fontsize-adapter"
    :class="{'hxm-footer_safe_bottom': bottomSafeArea}"
    :style="`background-color: ${bgColor}; ` "
  >
    <div
      class="hxm-footer_content"
      :class="`hxm-footer_content_${type}`"
      @click="jumpPage"
      v-if="type && content"
      v-html="content">
    </div>

    <div class="hxm-footer_extend" v-if="isNeedExtend">
      <div class="hxm-footer_logo"></div>
      <div class="hxm-footer_slogan">{{ slogan }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

// 默认的solgan标语
function getSloganDefault() {
  const year = new Date().getFullYear() - 1996;
  return `同花顺${year}年专业品质，让投资变得更简单`;
}

@Component({
  name: 'Footer',
})
export default class Footer extends Vue {
  // 页脚类型
  @Prop() private type!: string;

  // 页脚内容
  @Prop() private content!: string;

  // 页脚超链接跳转地址
  @Prop() private linkUrl!: string;

  // 自定义背景色
  @Prop({ default: '' }) private bgColor!: string;

  // 底部slogan内容
  @Prop({ default: getSloganDefault() }) private slogan!: string;

  // 是否需要底部的logo和slogan
  @Prop({ default: false }) private isNeedExtend!: boolean;

  // 是否需要底部安全区域
  @Prop({ default: false }) private bottomSafeArea!: boolean;

  // 页面跳转
  public jumpPage() {
    if (this.type === 'link' && this.linkUrl) {
      window.location.href = this.linkUrl;
    }
  }
}
</script>
