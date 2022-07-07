# Badge 徽标

## 简介

<card>

### 介绍
右上角的小提示

</card>

## 代码演示

<card>

### 基础用法

```html
<template>
  <div>
    <hxm-badge :value="100">
      <div class="badge-btn card-bg">数字</div>
    </hxm-badge>
    <hxm-badge :value="100" :max="99" class="ml-48">
      <div class="badge-btn card-bg">超最大值</div>
    </hxm-badge>
    <hxm-badge value="最新" class="ml-48">
      <div class="badge-btn card-bg">字符串</div>
    </hxm-badge>
    <hxm-badge is-dot class="ml-48">
      <div class="badge-btn card-bg">小圆点</div>
    </hxm-badge>
    <br>
    <hxm-badge :value="100" color="gold" class="mt-32">
      <div class="badge-btn primary-bg-red" :style="{color: '#fff'}">红底时黄色徽标</div>
    </hxm-badge>
    <hxm-badge is-dot color="gold" class="mt-32 ml-48">
      <div class="badge-btn primary-bg-red" :style="{color: '#fff'}">红底时黄色徽标</div>
    </hxm-badge>
    <br>
    <hxm-badge is-dot color="#009900" class="mt-32">
      <div class="badge-btn card-bg">自定义颜色</div>
    </hxm-badge>
    <hxm-badge is-dot :hidden="badgeHidden" class="mt-32 ml-48">
      <div class="badge-btn card-bg" @click="badgeHidden = !badgeHidden">
        点击{{badgeHidden ? '显示' : '隐藏'}}徽标
      </div>
    </hxm-badge>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  badgeHidden = false;
}
</script>
```

</card>

<card>

| Prop | 类型 | 描述 | 可选 |
|:---:|:---:|:---:|:---:|
| value | `string | number` | 徽标内容 | 是，默认 `''` |
| max | `number` | 徽标内容为 number 时限制最大值 | 是，默认 `Infinity`|
| isDot | `boolean` | 是否为小圆点样式 | 是，默认 `false` |
| hidden | `boolean` | 是否隐藏 | 是，默认 `false` |
| color | `string` | 徽标颜色，可设为 `'gold'` 或其他色号 | 是，默认手炒主题红 |

</card>

<demo />