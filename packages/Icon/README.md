# Icon 图标 <Badge text="1.2.3+" />

## 简介

<card>

### 介绍
基于svg的图标集，可以通过调用Icon组件的方式直接在项目中使用图标。

</card>

## 代码演示

<card>

### 基础用法

目前组件库中仅支持了 `17` 个内置图标供开发者直接使用，通过 `name` 属性直接传入图标对应的名称即可。`name` 见对应的demo。

:::tip 提示
`1.9.0` 版本新增 `notice`、`forwardNew` 2 个图标
:::

```html
<hxm-icon name="back"></hxm-icon>
<hxm-icon name="forward"></hxm-icon>
```
</card>

<card>

### 设置图标大小

通过 `size` 属性可以设置图标的大小。
注意: `size` 是 `字符串` 类型,需要带字体单位

```html
<hxm-icon name="search" size="0.32rem"></hxm-icon>
<hxm-icon name="search" size="0.6rem"></hxm-icon>
```
</card>

<card>

### 设置图标颜色

通过 `color` 属性可以设置图标颜色，如果项目中需要适配黑夜模式，可以传 `darkThemeColor` 来设置黑夜模式下图标的颜色。

```html
<hxm-icon
  name="back"
  color="#e93030"
  darkThemeColor="#fd4332">
</hxm-icon>

<hxm-icon
  name="back"
  color="#009900"
  darkThemeColor="#30a431">
</hxm-icon>
```
</card>

## API

<card>

### props

| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---:|:---:|
| name | 图标名称，必传 | string | - |
| size | 图标尺寸，可选 | string | `0.24em` |
| color | 图标颜色，可选 | string | - |
| darkThemeColor | 黑夜模式下的图标颜色，可选 | string | - |

</card>

<card>

### Events

| 事件名 | 说明 | 回调参数 |
|:---:|:---:|:---:|
| click | 点击图标触发 | _event: MouseEvent_ |

</card>

<demo/>