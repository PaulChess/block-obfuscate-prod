# DatePicker 日期选择器

```html
<template>
  <div>
    <hxm-date-picker
      :visible.sync="show"
      :start-date="startDate"
      :end-date="endDate"
      :format="Y年,M月,D日,h时,m分"
      @pickdate="pickDate"></hxm-date-picker>
  </div>
</template>

<script>
export default {
  show: false,
  startDate: new Date('2010/1/1'),
  endDate: new Date('2020/12/30')
}
</script>
```

| Prop | 类型 | 描述 | 可选 |
|:---:|:---:|:---:|:---:|
| visible | `boolean` | 是否展示 | 否，默认 `false` |
| start-date | `Date` | 开始日期 | 是，默认 `当前日期往前10年` 选择器不包含年份的时候可以不传 |
| end-date | `Date` | 结束日期 | 是，默认 `当前日期` 选择器不包含年份的时候可以不传 |
| current-date | `Date` | 当前选中日期 | 否 |
| format | `string` | 选项构成 | 是，默认 `Y,M,D` |

| Event | 参数 | 描述 |
|:---:|:---:|:---:|
| pickdate | 选中的值 | 点击确认时触发 |