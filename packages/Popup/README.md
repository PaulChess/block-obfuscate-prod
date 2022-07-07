# Popup 弹出层 <Badge text="1.3.6+"/>

## 简介

<card>

### 介绍
弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加显示。

</card>

## 代码演示

<card>

### 基础用法

通过 `show` 属性控制弹出层是否展示。触发弹窗显示的时候将属性设为 `true`，在 `overlay-click` 事件回调中将其设为 `false` 即可。

```html
<hxm-cell title="展示弹出层" @click="showBasic = true"></hxm-cell>

<hxm-popup
  :show="showBasic"
  width="2rem"
  height="2rem"
  @overlay-click="showBasic = false">
</hxm-popup>
```
```javascript
export default {
  data() {
    return {
      showBasic: false,
    },
  },
}
```
</card>

<card>

### 弹出位置

通过 `position` 属性设置弹出位置，默认为 `center`，还可以设置为`top` 、`bottom` 、`left` 、`right`。

```html
<hxm-cell title="顶部弹出" @click="showTop = true"></hxm-cell>

<hxm-popup
  :show="showTop"
  position="top"
  @overlay-click="showTop = false">
</hxm-popup>
```
</card>

<card>

### 圆角弹窗

设置 `round` 属性后，弹窗会根据弹出位置添加各自的圆角样式。

```html
<hxm-cell title="圆角弹窗" @click="showRound = true"></hxm-cell>

<hxm-popup
  :show="showRound"
  position="bottom"
  :round="true"
  @overlay-click="showRound = false">
</hxm-popup>
```
</card>

<card>

### 测试多弹窗锁屏

`fixedBody` 属性设置当弹出层出现时，原本的文档内容是否不可滚动。默认为 `true`，即文档会被固定。这里测试了在多弹窗情况下是否影响锁屏功能。

```html
<hxm-cell title="打开第一个弹窗" @click="showFirstPopup = true"></hxm-cell>

<hxm-popup
  :show="showFirstPopup"
  width="3rem"
  height="3rem"
  @overlay-click="showFirstPopup = false">
  <div class="popup-content">
    <hxm-button @click="showSecondPopup = true">第二个</hxm-button>
  </div>
</hxm-popup>

<hxm-popup
  :show="showSecondPopup"
  position="left"
  @overlay-click="showSecondPopup = false">
</hxm-popup>
```
</card>

## API

<card>

### Props

| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---:|:---:|
| show | 是否显示弹出层 | boolean | `false` |
| position | 弹窗的展示位置,可选值为: `bottom`、`top`、`left`、`right`、`center` | string | `center` |
| width | 弹出框宽度,仅当 `position` 为`left`、`right`、`center`时生效 | string | `30%` |
| height | 弹出框高度,仅当 `position` 为`top`、`bottom`、`center`时生效 | string | `30%` |
| round | 是否开启圆角 | boolean | `false` |
| overlay-class | 自定义遮罩层类名 | string | - |
| overlay-style | 自定义遮罩层样式 | object | - |
| popup-style | 自定义弹出层样式 | object | - |
| duration | 动画时长 | number/string | `300ms` |
| transition | 自定义动画类名 | string | - |
| zIndex | 设置弹窗层级 | number | `2000` |
| bottomSafeArea | 当 `position` 为 `bottom` 时是否预留底部安全区 | boolean | `true` |
| fixedBody | 弹窗显示时是否禁止文档内容滚动 | boolean | `true` |
</card>

<card>

### Events

| 事件名 | 说明 | 回调参数 |
|:---|:---|:---:|
| click | 点击弹出层时触发 | _event: MouseEvent_ |
| overlay-click | 点击遮罩层时触发 | _event: MouseEvent_ |
| open | 弹出层打开时触发 | - |
| close | 弹出层关闭时触发 | - |
| opened | 弹出层打开且动画结束后触发 | - |
| closed | 弹出层关闭且动画结束后触发 | - |
</card>

<card>

### Slots
| 名称 | 说明 |
|:---:|:---:|
| default | 默认插槽，嵌入在弹出层中的内容 |
</card>

<demo/>