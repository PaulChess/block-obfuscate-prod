# Tabs 选项卡

## 简介

<card>

### 介绍
选项卡用于平级区域大块内容的的收纳和展现

</card>

## 代码演示

<card>

### 基础用法

`type` 是Tab的类型，必传，共有3种类型，详见下面的例子或下表。  
每一个标签项为一个 `hxm-tab-panel` 组件，其中 `title` 为标签展示的名称,`name` 为点击标签事件回调中拿到的参数。

```html
<hxm-tabs type="slide">
  <hxm-tab-panel title="沪深" name="hushen"></hxm-tab-panel>
  <hxm-tab-panel title="板块" name="bankuai"></hxm-tab-panel>
  <hxm-tab-panel title="科创板" name="kechuangban1"></hxm-tab-panel>
  <hxm-tab-panel title="人气" name="renqi"></hxm-tab-panel>
  <hxm-tab-panel title="科创板" name="kechuangaban2"></hxm-tab-panel>
</hxm-tabs>
```
</card>

<card>

### Tab类型

Tab支持`slide`、`tap`、`fixedTap`3种类型。
注意: 当 `type` 为 `tap` 且选项卡的数量比较多的时候，需要配置 `swipeable` 属性支持滑动来让选项卡的样式不会挤在一起。
1. `slide`:
```html
<hxm-tabs type="slide">
  <hxm-tab-panel title="沪深" name="hushen"></hxm-tab-panel>
  <hxm-tab-panel title="板块" name="bankuai"></hxm-tab-panel>
  <hxm-tab-panel title="科创板" name="kechuangban1"></hxm-tab-panel>
  <hxm-tab-panel title="人气" name="renqi"></hxm-tab-panel>
  <hxm-tab-panel title="科创板" name="kechuangaban2"></hxm-tab-panel>
</hxm-tabs>
```

2. `tap`
```html
<hxm-tabs type="tap">
  <hxm-tab-panel title="沪深" name="hushen"></hxm-tab-panel>
  <hxm-tab-panel title="板块" name="bankuai"></hxm-tab-panel>
  <hxm-tab-panel title="科创板" name="kechuangban"></hxm-tab-panel>
</hxm-tabs>
```

3. `fixedTap`
```html
<hxm-tabs type="fixedTap">
  <hxm-tab-panel title="沪深" name="hushen"></hxm-tab-panel>
  <hxm-tab-panel title="板块" name="bankuai"></hxm-tab-panel>
  <hxm-tab-panel title="科创板" name="kechuangban"></hxm-tab-panel>
</hxm-tabs>
```
</card>

<card>

### Tab栏滑动

当选项卡数量过多的时候，可以配置 `swipeable` 属性来支持左右滑动。
注意: `swipeable` 当前只支持 `slide` 和 `tap` 两种类型，`fixedTap` 不建议用于Tab选项数量超过4个的情况

```html
<hxm-tabs type="slide" :swipeable="true">
  <hxm-tab-panel
    v-for="item in tablist"
    :key="item.name">
  </hxm-tab-panel>
</hxm-tabs>

<hxm-tabs type="tap" :swipeable="true">
  <hxm-tab-panel
    v-for="item in tablist"
    :key="item.name">
  </hxm-tab-panel>
</hxm-tabs>
```
```javascript
export default {
  data() {
    return {
      tablist: [
        { title: '沪深', name: 'hushen1' },
        { title: '板块', name: 'bankuai1' },
        { title: '科创板1', name: 'kechuangban1' },
        { title: '人气', name: 'renqi1' },
        { title: '科创板2', name: 'kechuangaban2' },
        { title: '沪深', name: 'hushen2' },
        { title: '板块', name: 'bankuai2' },
        { title: '科创板1', name: 'kechuangban3' },
        { title: '人气', name: 'renqi2' },
        { title: '科创板2', name: 'kechuangaban4' },
      ]
    };
  },
};
```
</card>

<card>

### 设置Tab栏侧边图标

Tab组件库中留了插槽用于侧边图标或按钮的位置，用户可自定义图标或按钮

```html
<hxm-tabs type="slide" :swipeable="true">
  <template v-slot:button>
    <div class="icon"></div>
  </template>
  <hxm-tab-panel
    v-for="item in tablist"
    :key="item.name">
  </hxm-tab-panel>
</hxm-tabs>

<hxm-tabs type="tap" :swipeable="true">
  <template v-slot:button>
    <div class="icon"></div>
  </template>
  <hxm-tab-panel
    v-for="item in tablist"
    :key="item.name">
  </hxm-tab-panel>
</hxm-tabs>
```
```javascript
export default {
  data() {
    return {
      tablist: [
        { title: '沪深', name: 'hushen1' },
        { title: '板块', name: 'bankuai1' },
        { title: '科创板1', name: 'kechuangban1' },
        { title: '人气', name: 'renqi1' },
        { title: '科创板2', name: 'kechuangaban2' },
        { title: '沪深', name: 'hushen2' },
        { title: '板块', name: 'bankuai2' },
        { title: '科创板1', name: 'kechuangban3' },
        { title: '人气', name: 'renqi2' },
        { title: '科创板2', name: 'kechuangaban4' },
      ]
    };
  },
};
```
```css
.icon {
  width: 100%;
  height: 100%;
  background: url('../assets/icon_list_drawer_open.svg')
    no-repeat center center;
  background-size: cover;
}
```
</card>

<card>

### 设置fixedTap类型按钮的位置

通过 `buttonPosition` 属性可设置按钮或图标的位置
注: 仅针对fixedTap类型

```html
<hxm-tabs type="fixedTap" buttonPosition="right">
  <template v-slot:button>
    <div class="button">文字按钮</div>
  </template>
  <hxm-tab-panel title="涨幅榜" name="zhangfuban"></hxm-tab-panel>
  <hxm-tab-panel title="跌幅榜" name="diefubang1"></hxm-tab-panel>
  <hxm-tab-panel title="跌幅榜" name="diefubang2"></hxm-tab-panel>
</hxm-tabs>

<hxm-tabs type="fixedTap" buttonPosition="left">
  <template v-slot:button>
    <div class="button">文字按钮</div>
  </template>
  <hxm-tab-panel title="涨幅榜" name="zhangfuban"></hxm-tab-panel>
  <hxm-tab-panel title="跌幅榜" name="diefubang1"></hxm-tab-panel>
  <hxm-tab-panel title="跌幅榜" name="diefubang2"></hxm-tab-panel>
</hxm-tabs>
```
</card>

<card>

### 设置选项右上角的红点标记

同时设置 `badge` 和 `badgeProps` 两个属性来设置选项右上角的红点。
```html
<hxm-tabs type="slide">
  <hxm-tab-panel title="沪深" name="hushen"></hxm-tab-panel>
  <hxm-tab-panel title="板块" name="bankuai"
    :badge="true"
    :badgeProps="{ isDot:true }">
  </hxm-tab-panel>
  <hxm-tab-panel title="科创板" name="kechuangban1"
    :badge="true"
    :badgeProps="{ isDot:true }">
  </hxm-tab-panel>
  <hxm-tab-panel title="人气" name="renqi"></hxm-tab-panel>
  <hxm-tab-panel title="科创板" name="kechuangaban2"></hxm-tab-panel>
</hxm-tabs>
```
</card>

<card>

### 自定义默认选中项

通过给 `activeItem` 传递想要默认选中的选项卡的 `name`,即可在初始的时候选中您想要的选项。
```html
<hxm-tabs type="slide" activeItem="bankuai">
  <hxm-tab-panel title="沪深" name="hushen"></hxm-tab-panel>
  <hxm-tab-panel title="板块" name="bankuai"></hxm-tab-panel>
  <hxm-tab-panel title="科创板" name="kechuangban1"></hxm-tab-panel>
  <hxm-tab-panel title="人气" name="renqi"></hxm-tab-panel>
  <hxm-tab-panel title="科创板" name="kechuangaban2"></hxm-tab-panel>
</hxm-tabs>
```
</card>

<card>

### 触发选中标签事件

`toggleTab` 的回调参数中返回用户点击的Tab选项卡的 `name`

```html
<hxm-tabs type="slide" @toggleTab="toggleTab">
  <hxm-tab-panel title="沪深" name="hushen"></hxm-tab-panel>
  <hxm-tab-panel title="板块" name="bankuai"></hxm-tab-panel>
  <hxm-tab-panel title="科创板" name="kechuangban1"></hxm-tab-panel>
  <hxm-tab-panel title="人气" name="renqi"></hxm-tab-panel>
  <hxm-tab-panel title="科创板" name="kechuangaban2"></hxm-tab-panel>
</hxm-tabs>
```
```javascript
export default {
  methods() {
    toggleTab(tabName) {
      this.$toast(`您点击了${tabName}`);
    }
  },
};
```
</card>

<card>

### 自定义选中态高亮颜色

通过设置 `activeTextColor` 属性可以设置Tab的默认选中颜色。
注意: 目前只支持 `slide` 和 `fixedTap` 两种类型的`边框`、`文字`颜色，`tap` 类型暂不支持修改其背景色。

```html
<hxm-tabs type="slide" activeTextColor="blue">
  <hxm-tab-panel title="沪深" name="hushen"></hxm-tab-panel>
  <hxm-tab-panel title="板块" name="bankuai"></hxm-tab-panel>
  <hxm-tab-panel title="科创板" name="kechuangban1"></hxm-tab-panel>
  <hxm-tab-panel title="人气" name="renqi"></hxm-tab-panel>
  <hxm-tab-panel title="科创板" name="kechuangaban2"></hxm-tab-panel>
</hxm-tabs>

<hxm-tabs type="fixedTap" activeTextColor="blue">
  <hxm-tab-panel title="沪深" name="hushen"></hxm-tab-panel>
  <hxm-tab-panel title="板块" name="bankuai"></hxm-tab-panel>
  <hxm-tab-panel title="科创板" name="kechuangban1"></hxm-tab-panel>
</hxm-tabs>
```
</card>

## API

<card>

### Tabs

#### props
| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---:|:---:|
| type| 类型，可选值为`slide` `tap` `fixedTap` | string | - |
| swipeable | 标签页是否可滑动 | boolean | `false` |
| activeItem | 默认选中的子选项卡的name | string | `第一个tab的name` |
| buttonPosition | type为`fixedTap`类型时按钮的位置，可选值为`left` `right` | string | - |
| activeTextColor | tab选中的颜色 | string | - |

#### Events
| 事件名 | 说明 | 回调参数 |
|:---:|:---:|:---:|:---:|
| toggleTab | 点击对应选项卡触发的事件,回调参数为选项卡的name值 | name: string |

</card>

<card>

### TabPanel

#### props

| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---:|:---:|
| title | 标签展示的名称 | string | - |
| name | 标签的name,在 `toggleTab` 回调中获取 | string | - |
| badge | 展示右上角的圆点，配合 `badgeProps` 使用 | boolean | `false` |
| badgeProps | 设置右上角的圆点，配合 `badge` 使用 | object | `none` |

</card>

<demo/>