# Button 按钮

```html
<template>
<div>
    <hxm-collapse expanded="true" title="标题">
           我是内容我是内容，我是内容我是内容，我是内容我是
            内容，我是内容我是内容，我是内容我是内容，我是内
            容我是内容，我是内容我是内容。
            我是内容我是内容，我是内容我是内容，我是内容我是
            内容，我是内容我是内容，我是内容我是内容，我是内
            容我是内容，我是内容我是内容。
    </hxm-collapse>
    <hxm-collapse expanded="true" title="标题1" :isRight="false">
        我是内容我是内容，我是内容我是内容，我是内容我是
            内容，我是内容我是内容，我是内容我是内容，我是内
            容我是内容，我是内容我是内容。
            我是内容我是内容，我是内容我是内容，我是内容我是
            内容，我是内容我是内容，我是内容我是内容，我是内
            容我是内容，我是内容我是内容。
    </hxm-collapse>
    <hxm-collapse gradient showText="余下全文" downText="收起">
       <div v-for="(item,index) in [1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3]" :key="index" style="height:1.2em;font-size:0.14em;">111</div>
    </hxm-collapse>
    <hxm-collapse titlebar showText="余下全部" downText="收起">
       <div v-for="(item,index) in [1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3]" :key="index" style="font-size:0.14em;">
           容我是内容，我是内容我是内容，我是内容我是
            内容，我是内容我是内容，我是内容我是内容，我是内
            容我是内容，我是内容我是内容。
            我是内容我是内
       </div>
    </hxm-collapse>
    <hxm-collapse collapseText content="容我是内容，我是内容我是内容，我是内容我是
            内容，我是内容我是内容，我是内容我是内容，我是内
            容我是内容，我是内容我是内容。
            我是内容我是内容">
    </hxm-collapse>
</div>
</template>
<script>
export default {

};
</script>
```




## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| expanded | 是否展开折叠面板 | _boolean_ | `false` |
| isRight | 箭头是否在右边 | _boolean_ | `false` |
| gradient | 折叠面板类型(带蒙版) | _boolean_ | `false` |
| titlebar | 折叠面板类型(没有蒙版) | _boolean_ | `false` |
| collapseText| 折叠面板类型（文字折叠面板） | _boolean_ | `false` |
| content| 文本折叠面板的内容 | string | '' |
| showText | 展开的文本 | string |'' |
| downText| 收起的文本 | string | '' |
| title | 折叠面板的标题| string | '' |


### Events

| 事件名     | 说明                                     | 回调参数            |
| ---------- | ---------------------------------------- | ------------------- |
| click      | 点击按钮，且按钮状态不为加载或禁用时触发 | _event: Event_      |
