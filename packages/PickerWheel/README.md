# PickerWheel 滚轮列表

## 简介

<card>

### 介绍
组件提供弹出可旋转滚轮的列表选择功能。

</card>

## 引入方式

<card>

组件依赖 bscroll.js 需在注册组件时将依赖传入
cdn地址：

```html
<script type="text/javascript" src="//so.thsi.cn/js/m/lib/scripts/bscroll.min.js"></script>
```

```js
// 引入 npm 或 cdn
import BScroll from 'better-scroll';

Vue.use(hxmui, {
  componentsConfig: {
    PickerWheel: {
      BScroll: BScroll,
    },
  },
})
```

```js
import { PickerWheel } from 'thsc-hxmui'
import BScroll from 'better-scroll'

Vue.use(PickerWheel, {
  BScroll: BScroll,
})
```
</card>

## 代码演示

<card>

### 基础用法

通过属性 `visible` 控制列表显隐，支持 `.sync` 修饰符，通过 `data` 属性向列表组件传入数据，提供 `confirm` 事件支持确定后回调，提供插槽可以自定义内容，其余属性和事件请查看下方 API。

```js
<template>
  <p class="demo-btn card-bg" @click="visibleHandle()">点击</p>
  <hxm-picker-wheel
    @confirm="pickItem"
    :visible.sync="visible"
    :data="data">
    <template v-slot:option="{ option }">
      <p class="option">{{ option }}</p>
    </template>
  </hxm-picker-wheel>
</template>

export default {
  data() {
    return {
      visible: false,
      data: ['选项一', '选项二', '选项三', '选项四', '选项五', '选项六'],
    };
  },
  methods: {
    pickItem(value, index) {
      console.log(value, index);
    },
    visibleHandle() {
      this.visible = true;
    },
  },
};
```
</card>

<card>

### 自定义列表标题和按钮文案

通过 `title` 属性可以自定义列表标题，通过 `confirmText`、`cancelText` 属性可以自定义确定、取消按钮文案

```js
<template>
  <hxm-picker-wheel
    title="自定义标题"
    confirmText="confirm"
    cancelText="cancel">
  </hxm-picker-wheel>
</template>
```
</card>

<card>

### 记录上次选择结果

通过 `value` 属性控制选中列表元素，支持 `.sync` 修饰符用法。

```js
<template>
  <hxm-picker-wheel
    :value.sync="value"
    :data="data"
  >
  </hxm-picker-wheel>
</template>

export default {
  data() {
    return {
      data: ['选项一', '选项二', '选项三', '选项四', '选项五', '选项六'],
      value: '选项一',
    };
  }
};
```
</card>

<card>

### 支持自定义行高、行数、惯性滚动时间

通过 `item-height` 属性自定义行高，通过 `rows` 属性自定义展示行数，通过 `swipe-time` 属性自定义惯性滚动时间。

```js
<template>
  <hxm-picker-wheel
    :rows="7"
    :swipe-time="30000"
    item-height="1rem">
  </hxm-picker-wheel>
</template>
```
</card>

<card>

### 多列

当 `data` 属性赋值为对象（如下面代码中结构）时，列表展示多列。

```js
<template>
  <hxm-picker-wheel
    :data="data">
  </hxm-picker-wheel>
</template>

export default {
  data() {
    return {
      data: {
        name: ['张三', '李四', '王五'],
        age: ['10岁', '11岁', '12岁'],
      },
    };
  },
};
```
</card>

<card>

### 单列支持 [{ value, label }]

通过给 `data` 属性赋值为对象数组（如下面代码中结构) 支持单列 [{ value, label }]

```js
<template>
  <hxm-picker-wheel
    @confirm="pickItem"
    :value.sync="value"
    :data="data">
    <template v-slot:option="{ option }">
      <p class="option">{{ option }}</p>
    </template>
  </hxm-picker-wheel>
</template>

export default {
  data() {
    return {
      data: [
        { value: 'Mon', label: '星期一' },
        { value: 'Tue', label: '星期二' },
        { value: 'Wed', label: '星期三' },
        { value: 'Thurs', label: '星期四' },
        { value: 'Fri', label: '星期五' },
        { value: 'Sat', label: '星期六' },
        { value: 'Sun', label: '星期日' },
      ],
      value: '星期三',
    };
  },
  methods: {
    pickItem(value, index) {
      console.log(value, index)
    },
  },
};
```
</card>

<card>

### 多列支持 [{ value, label }]

多列情况下，通过改变 `data` 属性数据结构（如下面代码中结构) 支持多列 [{ value, label }]

```js
<template>
  <hxm-picker-wheel
    @confirm="pickItem"
    :data="data">
  </hxm-picker-wheel>
</template>

export default {
  data() {
    return {
      data: {
        name: [
          { value: '3', label: '张三' },
          { value: '4', label: '李四' },
          { value: '5', label: '王五' },
        ],
        age: [
          { value: '18', label: '18岁' },
          { value: '19', label: '19岁' },
          { value: '20', label: '20岁' },
        ],
      },
    };
  },
  methods: {
    pickItem(value, index) {
      console.log(value, index)
    },
  },
};
```
</card>

## API

<card>

### props
| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---:|:---:|
| data | 数据源 | array\|object | - |
| value | 当前选中的选项(支持 .sync ) | string\|object | - |
| visible | 是否显示选择器(支持 .sync ) | boolean | `false` |
| title | 标题  | string | - |
| confirm-text | 确认按钮文案 | string| `确定` |
| cancel-text | 取消按钮文案 | string | `取消` |
| item-height | 每一行的高度 | string | `.4em` |
| rows | 展示行数| number  | `5` |
| swipe-time | 惯性滑动时间(ms) | number | `2500` |
| show-modal | 是否以弹窗形式展示| boolean | `true` |
| hide-head | 是否隐藏标题栏 | boolean | `false` |

</card>

<card>

### Events

| 事件名 | 说明 | 回调参数 |
|:---:|:---:|:---|
| confirm | 点击确认时触发 | value |
| scrollend | 滚动结束触发 | key: 选项组的, value: 选项的值, wheel: 实例 |
| scrollstart | 滚动开始触发 | - |
| cancel | 点击取消时触发 | - |

</card>

<demo />