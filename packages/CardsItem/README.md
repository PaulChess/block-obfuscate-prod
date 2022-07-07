# Cards 卡片项目

## 代码演示

## 卡片类型

支持`large`、`small` 2 种类型，默认为`small`，需配合`cards`来使用，

- 大卡片支持吸附
- 小卡片不支持吸附

```html
<hxm-cards-item
  v-for="item in data"
  :key="item"
  size="small"
  :night="1"
  :title="'标题' + item"
  @click="btnClick"
>
  <div class="example-cards_inner">my order is {{ item }}</div>
</hxm-cards-item>
```

## API

### Props

| 参数         | 说明                                                                      | 类型     | 默认值    |
| ------------ | ------------------------------------------------------------------------- | -------- | --------- |
| size         | 尺寸，可选值为 `large` `small`                                            | _string_ | `small`   |
| background   | 背景色                                                                    | _string_ | `#fff`    |
| title        | 标题文字，默认不展示                                                      | _string_ | ``        |
| shadowColor  | 阴影颜色                                                                  | _string_ | `#dedede` |
| borderRadius | 圆角大小                                                                  | _number_ | `16`      |
| night        | 安卓黑夜模式：1.背景色为#171616 2.背景色为#1E1E1E ios 黑夜模式大于 0 即可 | _number_ | `0`       |
| color        | 字体颜色，默认跟着是否黑夜模式走                                          | _string_ | ``        |

### Events

| 事件名 | 说明                                     | 回调参数       |
| ------ | ---------------------------------------- | -------------- |
| click  | 点击按钮，且按钮状态不为加载或禁用时触发 | _event: Event_ |
