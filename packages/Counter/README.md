# Counter 页面计数器

## 简介

<card>

### 介绍
页面计数器用于在较长页面或者表单下显示当前滑动的位置和总计的数量

</card>

## 代码演示

<card>

### 基础用法

当页面滚动时，页面计数器会出现在页面下方，页面停止滚动1s后，计数器自动消失。用户需要传`current`和`total`两个参数表示当前页码和总页码。一般情况下，我们是判断页面到达底部之后，触发`current`+1，但也不排除其他的触发情况，所以监听页面是否到达底部或其他触发时机需要用户自己去定义，判断页面是否到达底部可以参考demo。

```javascript
<div class="example-counter">
  <hxm-counter :total="total" :current="current" />
</div>

export default {
  data() {
    return {
      current: 1,
      total: 100,
    };
  },

  methods: {
    // 判断页面是否到底部
    judgeIsToBottom() {
      const scrollTop = document.documentElement.scrollTop
        || document.body.scrollTop;
      const windowHeight = document.documentElement.clientHeight
        || document.body.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight
        || document.body.scrollHeight;

      if (scrollTop + windowHeight >= scrollHeight) {
        return true;
      }
      return false;
    },

    changeCurrentPage() {
      if (this.judgeIsToBottom()) {
        if (this.current === 99) {
          this.current = 1;
        } else {
          this.current++;
        }
      }
    },
  },

  created() {
    window.addEventListener('scroll', this.changeCurrentPage);
  },

  unmounted() {
    window.removeEventListener('scroll', this.changeCurrentPage);
  },
};
```

</card>

## API

<card>

### Props

| 参数 | 说明 | 类型 | 默认值 |
|:---:|:---:|:---:|:---:|
| current | 当前页 | number | 0 |
| total | 总页数 | number | 0 |


</card>

<demo/>