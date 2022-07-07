# List 加载列表

## 简介

<card>

### 介绍
列表组件，自动判断页面滚动到底部触发加载更多

</card>

## 代码演示

<card>

### 基础用法

```html
<template>
  <div class="List sub-bg-card">
    <hxm-list
      v-model="listIsLoading"
      finished-text="到底了"
      :error.sync="error"
      error-text="加载失败，点击刷新"
      :finished="listFinished"
      @load="handleListLoad">
        <div v-for="idx in listLength"
          :key="idx"
          class="list-cell hxmui-border_bottom card-bg">
          {{idx}}
        </div>
    </hxm-list>
  </div>
</template>
```

```javascript
import { times } from 'lodash-es';

let errorflag = true;
export default {
  data() {
    return {
      listLength: 20,
      listIsLoading: false,
      listFinished: false,
      error: '',
    };
  },
  methods: {
    handleListLoad() {
      setTimeout(() => {
        // 加载结束将listIsLoading设置为false，否则再次滑到底部将不再触发load
        this.listIsLoading = false;
        if (this.listLength === 30 && errorflag) {
          errorflag = false;
          this.$toast('网络连接失败，请重试')
          // 加载失败将error设置为true，会出现加载失败的提示，提示内容可以自定义
          this.error = true;
        } else if (this.listLength > 35) {
          // 加载全部数据后将listFinished设置为true，将不再触发load
          this.listFinished = true;
        } else {
          this.listLength += 5;
        }
      }, 1000);
    },
  },
};
```
</card>

## API

<card>

### Props

| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---|:---|
| v-model | 是否正在加载 | boolean | - |
| finished | 是否加载完成 | boolean | - |
| finishedText | 加载完成后底部文案 | string | `没有更多内容了` |
| error | 是否加载失败 | boolean | `false` |
| errorText | 加载失败的底部文案 | string | `加载失败，点击刷新` |
| loadingColor(`v1.4.10`) | 加载图标颜色 | string | - |
| loadingSize(`v1.4.10`) | 加载图标尺寸 | string | - |

</card>

<card>

### Events
| 事件名 | 说明 | 回调参数 |
|:---:|:---:|:---:|
| load | 下拉到底部触发 | - |

</card>

<card>

### Slots
| 名称 | 说明 | 参数 |
|:---:|:---:|:---:|
| loading(`v1.4.10`) | 加载中内容 | - |
| error(`v1.4.10`) | 加载失败内容 | - |


</card>

<demo />