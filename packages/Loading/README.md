# Loading 加载 <Badge text="1.5.0+" />

## 简介

<card>

### 介绍
在内容还没有加载出来时缓解用户等待的焦虑感

</card>

## 代码演示

<card>

### 加载类型

加载图标默认为圆圈类型，如果想展示为菊花类型可以将 `bloom` 属性设置为 `true`

```html
<hxm-loading></hxm-loading>
<hxm-loading :bloom="true"></hxm-loading>
```
</card>

<card>

### 加载文案

组件提供了默认插槽用于填充加载文案

```html
<hxm-loading>加载中...</hxm-loading>
<hxm-loading :bloom="true">加载中...</hxm-loading>
```
</card>

<card>

### 垂直排列

如果希望图标和文案垂直排列，可以将 `vertical` 属性设置为 `true`

```html
<hxm-loading :vertical="true">加载中...</hxm-loading>
<hxm-loading :bloom="true" :vertical="true">加载中...</hxm-loading>
```
</card>

<card>

### 自定义颜色

通过 `color` 属性可以自定义加载图标颜色，当 `color` 的类型为 `string` 时，黑夜白天模式统一为所设色值，
如果黑夜白天模式不一致，可以传入一个对象，对象中的 `dark` 属性和 `light` 属性分别代表黑夜和白天模式下的图标色值

```html
<hxm-loading color="#4691ee"></hxm-loading>
<hxm-loading color="#4691ee" :bloom="true"></hxm-loading>
```
</card>

<card>

### 自定义大小

通过 `size` 属性可以自定义加载图标大小

```html
<hxm-loading size="0.5rem"></hxm-loading>
<hxm-loading size="0.5rem" :bloom="true"></hxm-loading>
```
</card>

<card>

### 适配黑夜模式

如上所述，通过给 `color` 传入一个对象可以自定义加载图标的黑夜白天模式颜色

```html
<hxm-loading :color="color">
  加载中...
</hxm-loading>

<hxm-loading 
  bloom="true" 
  :color="color">
  加载中...
</hxm-loading>
```

```javascript
export default {
  data() {
    return {
      color: {
        light: '#4691ee',
        dark: '#3d76b8',
      },
    }
  }
}
```
</card>

## API

<card>

### Props

| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---:|:---|
| bloom | 是否展示成菊花图标，默认为圆圈图标 | boolean | `false` |
| color | 图标颜色，传入类型为object时 `light` 表示白天模式，`dark` 表示黑夜模式 | string/object | 白天: `#e93030` 黑夜: `#fd4332` |
| size | 图标尺寸 | string | `0.2em` |
| textColor | 加载文案颜色，传入类型为object时 `light` 表示白天模式，`dark` 表示黑夜模式 | string/object | 白天: `#666666` 黑夜: `#a9a9a9` |
| textSize | 加载文案字体大小 | string | `0.13em` |
| vertical | 是否垂直排列图标和文案 | boolean | `false` |

</card>

<card>

### Slots
| 名称 | 说明 | 参数 |
|:---:|:---:|:---:|
| default | 加载文案 | - |

</card>

<demo />