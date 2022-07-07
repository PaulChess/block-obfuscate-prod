# Cards 卡片

## 代码演示

## 卡片类型

支持`large`、`small` 2 种类型，默认为`small`，需配合`cards-item`来使用，

- 大卡片支持吸附
- 小卡片不支持吸附

```html
<h2 class="mb-24">大尺寸</h2>
<hxm-cards size="large">
  <hxm-cards-item
    v-for="item in data"
    :key="item"
    size="large"
    :title="'标题' + item"
    @click="btnClick"
  >
    <div class="example-cards_inner">my order is {{ item }}</div>
  </hxm-cards-item>
</hxm-cards>
<h2 class="mb-24">小尺寸</h2>
<hxm-cards size="small" background="#f5f5f5">
  <hxm-cards-item
    v-for="item in data"
    :key="item"
    size="small"
    :title="'标题' + item"
    @click="btnClick"
  >
    <div class="example-cards_inner">my order is {{ item }}</div>
  </hxm-cards-item>
</hxm-cards>
<h2 class="mb-24">night大尺寸</h2>
<hxm-cards size="large" background="#f5f5f5" :night="1">
  <hxm-cards-item
    v-for="item in data"
    :key="item"
    size="large"
    :night="1"
    :title="'标题' + item"
    @click="btnClick"
  >
    <div class="example-cards_inner">my order is {{ item }}</div>
  </hxm-cards-item>
</hxm-cards>
<h2 class="mb-24">night小尺寸</h2>
<hxm-cards size="small" :night="2">
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
</hxm-cards>
```

## API

### Props

| 参数       | 说明                                                                      | 类型     | 默认值  |
| ---------- | ------------------------------------------------------------------------- | -------- | ------- |
| size       | 尺寸，可选值为 `large` `small`                                            | _string_ | `small` |
| background | 背景色                                                                    | _string_ | `#fff`  |
| night      | 安卓黑夜模式：1.背景色为#171616 2.背景色为#1E1E1E ios 黑夜模式大于 0 即可 | _number_ | `0`     |
