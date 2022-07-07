# Sticky 粘性布局 <Badge text="1.4.7+" />

## 简介

<card>

### 介绍
Sticky组件与CSS中的 `position: sticky` 属性实现的效果一致，当组件在屏幕范围内时，会按照正常的布局排列，当组件滚出屏幕范围时，始终会固定在屏幕顶部。

</card>

## 代码演示

<card>

### 基础用法

将内容包裹在 `Sticky` 组件内即可。

```html
<hxm-sticky>
  <hxm-button>基础用法</hxm-button>
</hxm-sticky>
```
</card>

<card>

### 吸顶距离

通过 `offset-top` 属性可以设置组件在吸顶时与顶部的距离。

```html
<hxm-sticky :offset-top="50">
  <hxm-button>吸顶距离</hxm-button>
</hxm-sticky>
```
</card>

<card>

### 指定容器

通过 `container` 属性可以指定组件的容器，页面滚动时，组件会始终保持在容器范围内，当组件即将超出容器底部时，会固定在容器底部。当容器超出屏幕可视区外时，
组件会随着容器一起消失在可视区外。

```javascript
<div ref="container" style="height: 150px; background-color="#f1f1f1"">
  <hxm-sticky :container="container">
    <hxm-button>指定容器</hxm-button>
  </hxm-sticky>
</div>

export default {
  data() {
    return {
      container: null
    }
  },
  mounted() {
    this.container = this.$refs.container;
  },
}
```
</card>

## API

<card>

### Props

| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---:|:---:|
| offset-top | 吸附时与顶部的距离，支持`px` `vw` `vh` `rem`等单位 | number/string | `0` |
| z-index | 吸顶或吸底时的z-index | number/string | `99` |
| container | 容器对应的HTML节点 | Element | - |

</card>

<card>

### Events

| 事件名 | 说明 | 回调参数 |
|:---:|:---:|:---:|
| change | 当吸顶状态改变时触发 | _isFixed: boolean_ |
| scroll | 滚动时触发 | _scrollTop: number, isFixed: boolean_ |

</card>

<demo/>