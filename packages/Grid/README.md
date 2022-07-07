# Grid 宫格

## 简介

<card>

### 介绍
宫格可以在水平方向上把页面分隔成等宽度的区块，用于展示内容或进行页面导航。

</card>

## 代码演示

<card>

### 基础用法

`type` 属性默认为 `nor`，宫格项从左到右依次排列，一行 `5` 个元素，超出自动换行。  

`listGrid` 属性传入宫格项数组，其中: `icon` 为图标链接，`url` 为点击宫格项跳转的地址，`title` 为标题。

```javascript
<hxm-grid :list-grid="listGridWithIcon"></hxm-grid>
<hxm-grid :list-grid="listGrid"></hxm-grid>

const iconSrc = '//i.thsi.cn/images/liejin/project/liejin/m/tzjy/helpcenter/images/footer_sevice.png';
const link = '//focus.10jqka.com.cn/special/phone/wapsubject_8389.shtml';

data() {
  return {
    listGridWithIcon: new Array(2).fill({
      icon: iconSrc,
      url: link,
      title: '标题',
    }),

    listGrid: new Array(12).fill({
      url: '//focus.10jqka.com.cn/special/phone/wapsubject_8389.shtml',
      title: '标题',
    }),
  }
}
```
</card>

<card>

### 居左排列

将 `type` 设置为 `norleft`，一行 `2` 个元素，图标和标题横向居左排列。  
使用数据同上。

```javascript
<hxm-grid :list-grid="listGridWithIcon" type="norleft"></hxm-grid>
<hxm-grid :list-grid="listGrid" type="norleft"></hxm-grid>
```
</card>

<card>

### 设置副标题

设置 `type` 为 `left`，且 `listGrid` 数组选项中传入 `subtitle`，会展示出副标题，其它 `type` 下传入 `subtitle` 无效。

```javascript
<hxm-grid :list-grid="listGridWithIcon" type="left"></hxm-grid>
<hxm-grid :list-grid="listGrid" type="left"></hxm-grid>

data() {
  return {
    listGridWithIcon: new Array(2).fill({
      icon: iconSrc,
      url: link,
      title: '标题',
      subtitle: '副标题',
    }),

    listGrid: new Array(12).fill({
      url: link,
      title: '标题',
      subtitle: '副标题',
    }),
  }
}
```
</card>

<card>

### 可滑动(切换到移动端查看)

设置 `type` 为 `slide`, 宫格项超出滑动，可以设置 `row` 属性来控制展示几行。

```javascript
<hxm-grid
  :list-grid="listGrid"
  type="slide"
  row="1">
</hxm-grid>
<hxm-grid
  :list-grid="listGrid"
  type="slide"
  row="2">
</hxm-grid>

data() {
  return {
    listGrid: new Array(12).fill({
      url: link,
      title: '标题',
    }),
  }
}
```
</card>

## API

<card>

### Props

| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---:|:---:|
| type | 宫格类型，可选值为`nor`，`norleft`，`left`，`slide` | string | `nor` |
| listGrid | 宫格列表项(具体参数见下方) | object[] | - |
| row | 滑动宫格展示的行数，配合type为 `slide` 使用 | number | 1 |

</card>

<card>

### ListGrid列表项参数

| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---:|:---:|
| icon | 图标地址 | string | - |
| url | 点击宫格项跳转地址 | string | - |
| title | 主标题 | string | - |
| subtitle | 副标题 | string | - |  
注: `subtitle` 仅当 `type` 为 `left` 时有效

</card>

<demo/>