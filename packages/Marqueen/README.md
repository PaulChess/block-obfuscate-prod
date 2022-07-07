# Marqueen 跑马灯

## 简介

<card>

### 介绍
跑马灯用于循环播放文字，例如基金销售时，“用户1已购买XXX基金”，活跃购买气氛

</card>

## 代码演示

<card>

### 基础用法

`data` 属性传一个数组，是滚动的内容。`v-slot` 是作用域插槽，可以拿到当前列表项的内容。在插槽中我们可以自定义内容及内容的样式。组件暴露了一个 `clickRow` 方法，在该方法中我们可以拿到当前列表项内容以及在数组中的索引。

```html
<hxm-marqueen :data="marqueenList" :rows="1"  @clickRow="clickRow">
  <template v-slot="{row}">
    <p class="marqueen-content">{{row}}</p>
  </template>
</hxm-marqueen>
```
```javascript
export default {
  data() {
    return {
      marqueenList: [
        '0000****01出现红波信号',
        '0000****02出现绿波信号',
        '0000****03出现红波信号',
        '0000****04出现绿波信号'
      ]
    }
  },
  methods: {
    clickRow(item, index) {
      this.$toast(`下标：${index} 内容：${item}`);
    },
  }
}
```
```css
/* 自定义样式 */
.marqueen-content {
  height: 1rem;
  line-height: 1rem;
  font-size: 0.3rem;
  color: #323232;
  [theme-mode="black"] & {
    color: #d2d2d3;
  }
}
```
</card>

<card>

### 多行滚动

通过设置 `rows` 可以实现多行的滚动

```html
<hxm-marqueen :data="marqueenList" :rows="2"  @clickRow="clickRow">
  <template v-slot="{row}">
    <p class="marqueen-content">{{row}}</p>
  </template>
</hxm-marqueen>
```
```javascript
export default {
  data() {
    return {
      marqueenList: [
        '0000****01出现红波信号',
        '0000****02出现绿波信号',
        '0000****03出现红波信号',
        '0000****04出现绿波信号'
      ]
    }
  }, 
  methods: {
    clickRow(item, index) {
      this.$toast(`下标：${index} 内容：${item}`);
    },
  }
}
```
```css
/* 自定义样式 */
.marqueen-content {
  height: 1rem;
  line-height: 1rem;
  font-size: 0.3rem;
  color: #323232;
  [theme-mode="black"] & {
    color: #d2d2d3;
  }
}
```
</card>

<card>

### 设置滚动方向

通过设置 `dir` 属性可以实现不同方向的滚动，默认为自下向上滚动 `top`，可以不传。其他可选参数为 `bottom`、`left`、`right`。

```html
<!-- 从下往上 -->
<hxm-marqueen :data="marqueenList" @clickRow="clickRow">
  <template v-slot="{row}">
    <p class="marqueen-content">{{row}}</p>
  </template>
</hxm-marqueen>

<!-- 从上往下 -->
<hxm-marqueen :data="marqueenList" @clickRow="clickRow" dir="bottom">
  <template v-slot="{row}">
    <p class="marqueen-content">{{row}}</p>
  </template>
</hxm-marqueen>

<!-- 从左往右 -->
<hxm-marqueen :data="marqueenList" @clickRow="clickRow" dir="left">
  <template v-slot="{row}">
    <p class="marqueen-content">{{row}}</p>
  </template>
</hxm-marqueen>

<!-- 从右往左 -->
<hxm-marqueen :data="marqueenList" @clickRow="clickRow" dir="right">
  <template v-slot="{row}">
    <p class="marqueen-content">{{row}}</p>
  </template>
</hxm-marqueen>
```
```javascript
export default {
  data() {
    return {
      marqueenList: [
        '0000****01出现红波信号',
        '0000****02出现绿波信号',
        '0000****03出现红波信号',
        '0000****04出现绿波信号'
      ]
    }
  }, 
  methods: {
    clickRow(item, index) {
      this.$toast(`下标：${index} 内容：${item}`);
    },
  }
}
```
```css
/* 自定义样式 */
.marqueen-content {
  height: 1rem;
  line-height: 1rem;
  font-size: 0.3rem;
  color: #323232;
  [theme-mode="black"] & {
    color: #d2d2d3;
  }
}
```
</card>

<card>

### 设置滚动速度

通过 `wait` 属性可以设置滚动的间隔时间，默认是 `2000ms`。

```html
<hxm-marqueen :data="marqueenList" @clickRow="clickRow" wait="500">
  <template v-slot="{row}">
    <p class="marqueen-content">{{row}}</p>
  </template>
</hxm-marqueen>
```
```javascript
export default {
  data() {
    return {
      marqueenList: [
        '0000****01出现红波信号',
        '0000****02出现绿波信号',
        '0000****03出现红波信号',
        '0000****04出现绿波信号'
      ]
    }
  }, 
  methods: {
    clickRow(item, index) {
      this.$toast(`下标：${index} 内容：${item}`);
    },
  }
}
```
```css
/* 自定义样式 */
.marqueen-content {
  height: 1rem;
  line-height: 1rem;
  font-size: 0.3rem;
  color: #323232;
  [theme-mode="black"] & {
    color: #d2d2d3;
  }
}
```
</card>

<card>

### 设置延时滚动

通过 `delay` 属性可以设置开始滚动的延时时间，默认为 `2000ms`。

```html
<hxm-marqueen :data="marqueenList" @clickRow="clickRow" delay="5000">
  <template v-slot="{row}">
    <p class="marqueen-content">{{row}}</p>
  </template>
</hxm-marqueen>
```
```javascript
export default {
  data() {
    return {
      marqueenList: [
        '0000****01出现红波信号',
        '0000****02出现绿波信号',
        '0000****03出现红波信号',
        '0000****04出现绿波信号'
      ]
    }
  }, 
  methods: {
    clickRow(item, index) {
      this.$toast(`下标：${index} 内容：${item}`);
    },
  }
}
```
```css
/* 自定义样式 */
.marqueen-content {
  height: 1rem;
  line-height: 1rem;
  font-size: 0.3rem;
  color: #323232;
  [theme-mode="black"] & {
    color: #d2d2d3;
  }
}
```
</card>

## API

<card>

### Props
| 参数 | 说明 | 类型 | 默认值 |
|:---:|:---|:---:|:---:|
| data | 用来轮播的数组数据 | array | `[]` |
| rows | 展示行数 | number | `1` |
| dir | 滚动方向，可选值`top`,`bottom`,`left`,`right` | string | `top` |
| wait | 展示间隔 | number | `2000` |
| delay | 延迟多少毫秒后开始滚动 | number | `2000` |
| transition | 动画过渡时间 | string | `1s` |

</card>

<card>

### Events

| 事件名 | 说明 | 回调参数 |
|:---:|:---|:---|
| clickRow | 点击列表项触发 | _itemIndex_(列表项索引) , _item_(列表项数据) |
| enter(`v1.10.5`) | 当元素进入到显示区域内触发 | _idx_(索引)，_item_(数据) |

</card>

<demo/>