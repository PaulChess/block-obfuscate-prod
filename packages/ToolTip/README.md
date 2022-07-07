# ToolTip

```html
<template>
  <div>
    <section class="flex jc-c">
      <hxm-tool-tip content="提示文案提示文案" placement="left">
        <button>left</button>
      </hxm-tool-tip>
      <hxm-tool-tip content="提示文案提示文案" placement="right">
        <button>right</button>
      </hxm-tool-tip>
    </section>
    <section class="flex jc-c mt-48">
      <hxm-tool-tip content="提示文案提示文案" placement="bottom">
        <button>默认 bottom</button>
      </hxm-tool-tip>
      <hxm-tool-tip content="提示文案提示文案" placement="top">
        <button>top</button>
      </hxm-tool-tip>
    </section>
  </div>
</template>
```

| Prop | 类型 | 描述 | 可选 |
|:---:|:---:|:---:|:---:|
| content | string | 提示文案 | 否 |
| placement | string | 位置 | 是，默认 bottom |
| zIndex | number | css 层级 | 是，默认 100 |
