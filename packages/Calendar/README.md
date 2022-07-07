# Calendar 日历 <Badge text="1.6.0+" />

## 简介

<card>

### 介绍
日历组件提供一种能选择独立日期或日期范围的功能。

</card>

## 代码演示

<card>

### 基础用法

在大部分的业务里，我们的日期都是从接口获取的一个数组。因此日历组件最简单的用法就是把数据传给 `dateArr` 属性。
日历会从数组第一项所在的月份渲染到最后一项所在的月份，数组中没有的日期渲染为不可点击状态。

::: tip Tips
数组中的日期字符串 `YYYY-MM-DD` 以及 `YYYY/MM/DD` 等格式均支持
:::

```javascript
<hxm-calendar :dateArr="dateArr"></hxm-calendar>

export default {
  data() {
    return {
      dateArr: [
        '2020-07-27',
        '2020-07-28',
        '2020-07-29',
        '2020-07-30',
        '2020-07-31',
        '2020-08-03',
        ...,
        '2021-07-23',
        '2021-07-26',
      ]
    }
  },
}
```
</card>

<card>

### 自定义日期区间

如果不是从接口获取的日期数据，日历组件还支持自定义日期区间。其中，`startDate` 属性设置起始日期，`endDate` 属性设置结束日期，组件渲染的有效日期在起始日期和结束日期之间。  
`defaultSelectDate` 为默认选中的日期。  
如果在渲染的日期中有些日期需要设为禁止点击状态的，我们可以通过 `effectDateRule` 属性自定义规则，函数的参数为date, 如果日期为有效日期则返回true, 不可点日期则返回false。例如示例中的规则设置为周六、周日以及大于今天的日期为不可点击的日期。

::: tip Tips
注意`startDate`、`endDate`、`defaultSelectDate` 的类型均为 `Date` 类型。  
new Date()的参数传字符串的时候需要为 `YYYY/MM/DD` 格式以解决ios上的兼容问题。
:::

```javascript
<hxm-calendar
  :startDate="startDate"
  :endDate="endDate"
  :defaultSelectDate="defaultSelectDate"
  :effectDateRule="effectDateRule">
</hxm-calendar>

export default {
  computed: {
    today() {
      const today = new Date();
      return today;
    },
    startDate() {
      return new Date(this.today.getFullYear(), this.today.getMonth() - 10, this.today.getDate());
    },
    endDate() {
      return this.today;
    },
    defaultSelectDate() {
      return new Date('2021/07/02');
    },
  },
  methods: {
    effectDateRule(date) {
      date = new Date(date);
      if (date.getDay() === 0
        || date.getDay() === 6
        || date.getTime() > this.today.getTime()
      ) {
        return false;
      }
      return true;
    },
  },
}
```
</card>

<card>

### 自定义入口

日历组件提供了一个默认的入口，如果想隐藏这个入口，只需要 `useDefaultEntry` 属性设置为 `false` 即可，
`v-model` 属性控制日历弹窗的显示和隐藏。

```javascript
<hxm-button size="large" @click="showCalendar">打开日历</hxm-button>

<hxm-calendar
  :useDefaultEntry="false"
  v-model="show"
  :dateArr="dateArr">
</hxm-calendar>

export default {
  data() {
    return {
      show: false,
      dateArr: [
        '2020-07-27',
        '2020-07-28',
        '2020-07-29',
        '2020-07-30',
        '2020-07-31',
        '2020-08-03',
        ...,
        '2021-07-23',
        '2021-07-26',
      ]
    }
  },
}
```
</card>

## API

<card>

### Props

| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---:|:---|
| v-model | 控制日历的显示和隐藏 | boolean | `false` |
| useDefaultEntry | 是否使用默认的入口 | boolean | `true` |
| title | 日历标题 | string | `选择日期` |
| startDate | 开始日期 | Date | 本月的前2个月的今天 |
| endDate | 结束日期 | Date | 今天 |
| defaultSelectDate | 默认选择的日期 | Date | - |
| dateArr | 需要渲染的日期数组 | Array | `[]` |
| seperatorSign | 日期分割符 | string | `/` |
| effectDateRule | 日期规则 | Function | `() => true` |

</card>

<card>

### Events

| 事件名 | 说明 | 回调参数 |
|:---:|:---|:---:|
| confirm | 选中某个日期时触发 | - |
| cancel | 点击取消按钮触发 | - |
| close | 弹出层关闭时触发 | - |

</card>

<demo />