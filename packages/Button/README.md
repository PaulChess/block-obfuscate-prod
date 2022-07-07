# Button 按钮 <Badge text="1.1.3+" />

## 简介

<card>

### 介绍
按钮用于触发一个操作，如点击跳转

</card>

## 代码演示

<card>

### 按钮类型

按钮支持`primary`、`light`、`plain`、`grey`、`link`五种类型，默认为`primary`。
::: warning 注意
正常情况下按钮支持`light`类型，但由于light类型目前没有适配`disabled`样式，示例暂不展示
:::

```html
<hxm-button type="primary">主要按钮</hxm-button>
<hxm-button type="plain">朴素按钮</hxm-button>
<hxm-button type="grey">灰色按钮</hxm-button>
<hxm-button type="link">文字按钮</hxm-button>
```
</card>

<card>

### 禁用状态

通过`disabled`属性来禁用按钮，禁用状态下按钮不可点击，但依然会暴露`click`事件供开发者使用

```html
<hxm-button type="primary" disabled="true">主要按钮</hxm-button>
<hxm-button type="plain" disabled="true">朴素按钮</hxm-button>
<hxm-button type="grey" disabled="true">灰色按钮</hxm-button>
<hxm-button type="link" disabled="true">文字按钮</hxm-button>
```
</card>

<card>

### 按钮尺寸

支持`large`、`medium`、`subMedium`、`normal`、`small`、`mini`六种尺寸, 默认为`normal`

```html
<hxm-button size="large">大号按钮</hxm-button>
<hxm-button size="medium">中号按钮</hxm-button>
<hxm-button size="subMedium">次中按钮</hxm-button>
<hxm-button size="normal">常规按钮</hxm-button>
<hxm-button size="small">小号按钮</hxm-button>
<hxm-button size="mini">迷你按钮</hxm-button>
```
</card>

<card>

### 按钮形状

通过`square`设置方形按钮，通过`round`设置圆形按钮

```html
<hxm-button square="true">方形按钮</hxm-button>
<hxm-button round="true">圆形按钮</hxm-button>
```
</card>

<card>

### 加载状态
通过`loading`属性将按钮设置为加载状态，加载状态下默认会隐藏按钮文字，可以通过`loading-text`设置加载状态下的文字

::: tip 提示
`1.5.0`版本以后支持将icon或普通文本与loading状态合写进一个标签
:::

```html
<hxm-button loading="true"></hxm-button>
<hxm-button loading="true" loading-text="加载中..."></hxm-button>
```
</card>

<card>

### 图标按钮

通过`icon`属性设置按钮图标,当前仅支持传入URL; 通过`icon-text`设置图标按钮文案

```html
<hxm-button
  type="plain"
  icon="https://testm.10jqka.com.cn/cd/mbweb-vaserviece-strategy-api-container/newjuece_v3/img/top1.89c5c19.png">
</hxm-button>
<hxm-button
  type="plain"
  icon-text="榜1"
  icon="https://testm.10jqka.com.cn/cd/mbweb-vaserviece-strategy-api-container/newjuece_v3/img/top1.89c5c19.png">
</hxm-button>
```
</card>

<card>

### 点击事件

按钮组件暴露了`click`事件供开发者自定义事件

```html
 <hxm-button @click="handleClick">点击按钮</hxm-button>
```
</card>

<card>

### 自定义样式

如果出现按钮组件内置样式不支持的情况，如`颜色`,`padding`,`圆角`等，用户可以通过`customClass`属性传入自定义类名覆盖按钮样式

```html
<hxm-button customClass="attention">按钮</hxm-button>
<hxm-button customClass="has-attentioned">按钮</hxm-button>
```
```css
// less
.attention {
  background-color: rgba(233, 48, 48, 0.1);
  color: #e93030;
  [theme-mode="black"] & {
    background-color: rgba(233, 48, 48, 0.1);
    color: #fd4332;
  }
}
.has-attentioned {
  background-color: #f6f6f6;
  color: #999;
  [theme-mode="black"] & {
    background-color: #252525;
    color: #8e8e8e;
  }
}
```
</card>

## API

<card>

### props

| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---:|:---:|
| type| 类型，可选值为`primary` `light` `plain` `grey` `link` | string | `primary` |
| size | 尺寸，可选值为`large` `medium` `subMedium` `normal` `small` `mini` | string | `normal` |
| disabled | 是否禁用按钮 | boolean | `false` |
| square | 是否为方形按钮 | boolean | `false` |
| round | 是否为圆形按钮 | boolean | `false` |
| loading | 是否显示为加载状态 | boolean | `false`
| loading-text | 加载状态提示文字 | string | - |
| icon | 图标链接 | string | - |
| icon-text | 图标提示文字 | string | - |
| customClass | 自定义类名 | string | - |

</card>

<card>

### Events

| 事件名 | 说明 | 回调参数 |
|:---|:---|:---|
| click | 点击按钮，按钮为禁用或加载状态下也会触发 | _event: Event_ |

</card>

<demo/>
