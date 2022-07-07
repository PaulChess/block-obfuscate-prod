## Results 结果展示

```html
<template>
  <div>
    <hxm-results
      type="success"
      desc="描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描"
    ></hxm-results>
    <hxm-results
      class="mt-24"
      type="fail"
      desc="描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描"
    ></hxm-results>
    <hxm-results
      class="mt-24"
      type="waiting"
      desc="描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描"
    ></hxm-results>
    <hxm-results
      class="mt-24"
      type="success"
      title="自定义标题"
      desc="描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描"
    ></hxm-results>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {}
</script>
```

| Prop | 类型 | 描述 | 可选 |
|:---:|:---:|:---:|:---:|
| type | `'success' | 'fail' | 'waiting'` | 结果类型 | 是，默认为 success |
| title | string | 标题文案 | 默认为 '成功' '失败' '等待结果' |
| desc | string | 描述文案 | 默认为 '' |
