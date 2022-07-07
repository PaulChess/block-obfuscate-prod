# Cell 单元格 <Badge text="1.8.0+" />

## 简介

<card>

### 介绍
单元格为列表中的单个展示项。

</card>

## 代码演示

<card>

### 基础用法

```html
<hxm-cell title="单元格" value="详细信息" />
<hxm-cell title="单元格" value="详细信息" label="描述信息" />
```
</card>

<card>

### 展示箭头

设置 `isLink` 属性后可以在单元格右侧展示箭头，通过 `arrowDirection` 属性还可以控制箭头方向，
默认为 `right`。

```html
<hxm-cell title="单元格" is-link />
<hxm-cell title="单元格" is-link value="详细信息" />
<hxm-cell title="单元格" is-link label="描述信息" value="详细信息" />
```
</card>

<card>

### 展示提示图标

设置 `showTip` 属性可以在单元格标题右侧展示一个提示图标，点击图标触发 `clickTip` 回调方法。

```html
<hxm-cell title="单元格" showTip isLink  @clickTip="clickTip" />
```
</card>

<card>

### 设置左侧Icon

组件提供了 `leftIcon` 具名插槽用于自定义单元格标题左侧的图标。可以使用 hxmui 提供的 `Icon` 组件，也可以
使用自定义图标。

```html
<hxm-cell title="单元格" value="详细信息" isLink>
  <template slot="leftIcon">
    <hxm-icon
      size="0.18em"
      color="#ccc"
      darkThemeColor="#666"
      name="settings">
    </hxm-icon>
  </template>
</hxm-cell>

<hxm-cell title="单元格" value="详细信息或已选项" label="描述信息" isLink>
  <template slot="leftIcon">
    <hxm-icon
      size="0.22em"
      color="#ccc"
      darkThemeColor="#666"
      name="settings">
    </hxm-icon>
  </template>
</hxm-cell>
```
</card>

<card>

### 分组标题描述

如果是一组单元格，建议使用 `CellGroup` 组件将其包裹起来。同时，CellGroup 组件提供了 `title` 和 `desc` 
两个具名插槽分别用于设置分组的标题和描述。

```html
<hxm-cell-group>
  <div slot="title">
    小标题描述
  </div>

  <hxm-cell title="单行列表"></hxm-cell>
  <hxm-cell title="单行列表" value="详细信息"></hxm-cell>
  <hxm-cell title="单行列表" value="详细信息" isLink></hxm-cell>

  <div slot="desc">
    关闭后，其它用户在转账，收款，添加朋友时  将不能通过手机号／会员名搜索到你
  </div>
</hxm-cell-group>
```
</card>

## API

<card>

### Cell Props

| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---:|:---|
| title | 单元格左侧标题 | string | - |
| value | 单元格右侧内容 | string | - |
| label | 单元格描述信息 | string | - |
| isLink | 是否展示单元格右侧箭头并开启反馈 | boolean | `false` |
| showTip | 是否展示提示图标 | boolean | `false` |
| arrowDirection | 单元格右侧箭头方向，可选值 `right` `up` `down` | string | `right` |
| clickable | 是否开启单元格点击反馈 | boolean | `false` |
| titleClass | 单元格标题自定义类名 | string | - |
| valueClass | 单元格内容自定义类名 | string | - |
| labelClass | 单元格描述自定义类名 | string | - |
| showBottomBorder | 是否展示底部的border | boolean | `true` |
| showPadding | 是否展示左右侧的padding | boolean | `true` |
| transparentBackground | 是否将单元格的背景变成透明色 | boolean | `false` |

</card>

<card>

### Cell Events

| 事件名 | 说明 | 回调参数 |
|:---:|:---|:---:|
| click | 点击单元格时触发 | - |
| clickTip | 点击提示按钮时触发 | - |

</card>

<card>

### Cell Slots

| 名称 | 说明 | 参数 |
|:---:|:---:|:---:|
| leftIcon | 自定义左侧图标 | - |
| right | 自定义单元格右侧的内容 | - |

</card>

<card>

### CellGroup Slots

| 名称 | 说明 | 参数 |
|:---:|:---:|:---:|
| default | 默认插槽 | - |
| title | 自定义分组标题 | - |
| desc | 自定义分组描述 | - |

</card>

<demo />