# Exposure 曝光组件

```html
<template>
  <div>
    <!-- 图片懒加载 img 设置 data-src 则会在曝光时自动设置到 src 属性 -->
    <hxm-exposure tag="img" :data-src="logoSrc"/>
    <!-- 图片懒加载 也可以手动响应 exposure 事件修改 src -->
    <hxm-exposure tag="img" :src="exposureImg0Src" @exposure="handleImgExposure('exposureImg0Src')"/>
    <!-- 同时监听元素 出现 / 消失 在可视区域 -->
    <hxm-exposure @exposure="handleListExposure(true)" @hide="handleListExposure(false)">
      <ul>
        <li
          v-for="idx in 4"
          :key="idx"
          class="list-cell hxmui-border__bottom card-bg"
        >list {{idx}}</li>
      </ul>
    </hxm-exposure>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

export default class App extends Vue {

  logoSrc = 'http://so.thsi.cn/js/m/mobile/images/black-icon-white.png';

  exposureImg0Src = '';

  exposureList = 0

  handleImgExposure(target: string) {
    this.$toast('图片出现在可视区内，触发懒加载');
    setTimeout(() => {
      this[target] = this.logoSrc;
    }, 300);
  }

  handleListExposure(isShow: boolean) {
    this.$toast(`list${isShow ? '出现' : '消失'}在可视区`);
  }
}
</script>
```

| Prop | 类型 | 描述 | 可选 |
|:---:|:---:|:---:|:---:|
| tag | string | 组件根节点渲染的 html 标签 | 是，默认为 div |

| Event | 参数 | 描述 |
|:---:|:---:|:---:|
| exposure | 无 | 元素曝光在可视区域时触发事件 |
| hide | 无 | 元素消失在可视区域时触发事件 |

**当仅监听 exposure 事件时则只会触发一次后取消该元素的监听，同时监听 hide 事件时则不会在曝光后被取消监听，下次曝光时仍会触发 exposure 事件。**

<demo />