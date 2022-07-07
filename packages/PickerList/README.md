# PickWheel 滚轮列表

```html
<template>
  <div class="example-pickerlist">
    <hxm-demo :configs="configs" :btn="true">
      <hxm-picker-list :select-index="value" @select="select">
        <p  class="left-btn" @click="clickLeft">自定义按钮</p>
      </hxm-picker-list>
    </hxm-demo>
  </div>
</template>

<script>
import configs from "./PickerList/config";

export default {
  data() {
    return {
      configs,
      value: 0,
      show: true,
      data: [1, 2, 3, 4, 5, 6, 7, 8],
    };
  },
  methods: {
		clickLeft(){
			console.log('left');
		},
    select(option, index) {
      console.log(option, index);
      this.value = index;
    },
  },
};
</script>

<style>
.left-btn{
	font-size: .32rem;
}
</style>
```

| Prop | 类型 | 描述 | 可选 |
|:---:|:---:|:---:|:---:|
| visible | boolean | 是否显示选择器 | 否 |
| data | array | 数组 | 否 |
| title | string | 标题 | 是 |
| selectIndex | number | 选中下标 | 否 |



| Event | 参数 | 描述 |
|:---:|:---:|:---:|
| select | 选中的值 | 点击选项时触发 |
| cancel | 无 | 点击取消时触发 |

