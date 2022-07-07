# Stepper 步进器

## 简介

<card>

### 介绍
步进器由增加按钮、减少按钮和输入框组成，用于在一定范围内输入、调整数字。

</card>

## 代码演示

<card>

### 基础用法

通过 `value` 属性控制输入值，提供 `change` 事件在输入或加减时触发，提供 `subtract` 事件在减时触发，提供 `plus` 事件在加时触发，其余属性和事件请查看下方 API。

```js
<hxm-stepper
  :decimal-length="decimalLength"
  :value="price"
  :min="minPrice"
  :max="maxPrice"
  @change="changePrice"
  @subtract="subtract"
  @plus="plus">
</hxm-stepper>

export default {
  data() {
    return {
      price: 1,
      minPrice: -4,
      maxPrice: 10,
      decimalLength: 2,
    };
  },

  methods: {
    subtract() {
      this.$toast('减操作');
    },
    plus() {
      this.$toast('加操作');
    },
    changePrice(nv, flag) {
      this.price = nv;
      switch (flag) {
        case 'max':
          this.$toast(`至多输入${this.maxPrice}`);
          break;
        case 'min':
          this.$toast(`至少输入${this.minPrice}`);
          break;
        case 'ilegal':
          if (this.decimalLength === 0) {
            this.$toast('请输入整数');
          } else {
            this.$toast(`限制${this.decimalLength}位小数`);
          }
          break;
        default:
          break;
      }
    },
  },
};
```
</card>

<card>

### 主题

支持 `red`、`blue` 两种主题类型，默认为 `red` 。

```js
<hxm-stepper theme="red"></hxm-stepper>
```
</card>

<card>

### 输入禁用状态

通过 `disable-input` 属性来禁用输入。

```js
<hxm-stepper :disable-input="true"></hxm-stepper>
```
</card>

<card>

### 整体禁用状态

通过 `disable` 属性来禁用整个组件。

```js
<hxm-stepper :disable="true"></hxm-stepper>
```
</card>

<card>

### 有边界(单按钮禁用状态)

通过 `min`、`max` 属性来控制最小值和最大值边界。

```js
<hxm-stepper min="0" max="6"></hxm-stepper>
```
</card>

<card>

### 步进0.002/三位小数

通过 `step` 属性控制组件步进。

```js
<hxm-stepper step="0.002"></hxm-stepper>
```
</card>

<card>

### 无内容

组件 `value` 为 `undefined` 时展示 `placeholder`

```js
<hxm-stepper placeholder="买入价"></hxm-stepper>
```
</card>

## API

### props

<card>

| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---:|:---:|
| value | 初始值 | number｜string | - |
| step | 步进 | number | - |
| min | 最小值 | number | - |
| max | 最大值 | number | - |
| placeholder | 占位文案 | string | `''` |
| theme | 主题(红色red，蓝色blue)  | string | `red` |
| disable | 整体禁用 | boolean | `false` |
| disable-input | 输入禁用 | boolean | `false` |

</card>

<card>

### Events

| 事件名 | 说明 | 回调参数 |
|:---:|:---:|:---:|
| change | 输入或加减时触发 | value: 当前值， flag: 输入异常标志 |
| subtract | 减时触发 | value: 当前值 |
| plus | 加时触发 | value: 当前值 |

</card>

<demo />