# PullRefresh 下拉刷新 <Badge text="1.2.3+" />

## 简介

<card>

### 介绍
用于提供下拉刷新的交互操作，适用于类似快讯列表等实时性强的页面。

</card>

## 代码演示

<card>

### 基础用法

`v-model` 绑定一个用于控制loading的变量，下拉刷新会触发 `refresh` 事件，在事件的回调函数中可以进行同步或异步操作，如获取接口数据等，操作完成后手动将 `v-model` 绑定的值设置为 `false`, 即表示加载完成。`successText` 为自定义的成功提示文案，其他可配置参数见下表。

```html
<hxm-pull-refresh
  v-model="loading"
  :successText="successText"
  @refresh="refresh">
  <ul class="demo-list">
    <li class="list-item"
      v-for="(item, index) in listData"
      :key="index">
      {{ item }}
    </li>
  </ul>
</hxm-pull-refresh>
```

```javascript
export default {
  data() {
    loading: false,
    updateNums: 15, // 更新条数
    refreshTimes: 0, // 刷新次数
    listData: [], // 数据项
  },
  computed: {
    successText() {
      return `更新了${this.updateNums}条内容`;
    },
  },
  methods: {
    refresh() {
      setTimeout(() => {
        this.refreshTimes++;
        this.loading = false;
      }, 3000);
    },

    getData() {
      for (let i = 0; i < 20; i++) {
        this.listData.push(`列表内容 ${i + 1}`);
      }
    }
  },
  created() {
    this.getData(); // 模拟列表数据
  }
}
```
</card>

<card>

### 自定义提示

组件提供了一系列插槽用于自定义下拉刷新过程中的提示内容

```html
<hxm-pull-refresh
  v-model="loading"
  @refresh="refresh">
  <!-- 自定义内容 -->
  <template slot="pulling">
    <div>自定义下拉</div>
  </template>
  <template slot="loosing">
    <div>自定义释放</div>
  </template>
  <template slot="loading">
    <div>自定义加载</div>
  </template>
  <template slot="success">
    <div class="success-block">
      已更新10条数据
    </div>
  </template>
  <!-- 列表内容 -->
  <ul class="demo-list">
    <li class="list-item"
      v-for="(item, index) in listData"
      :key="index">
      {{ item }}
    </li>
  </ul>
</hxm-pull-refresh>
```

```css
.success-block {
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  color: #fff;
  background-color: red;
}
```
</card>

## API

<card>

### Props

| 参数 | 说明 | 类型 | 默认值 |
|:---:|:---:|:---:|:---:|
| v-model | 是否处于加载中状态 | boolean | - |
| pullingText | 下拉过程提示文案 | string | `下拉刷新` |
| loosingText | 释放过程提示文案 | string | `释放刷新` |
| loadingText | 加载过程提示文案 | string | `加载中` |
| successText | 刷新成功提示文案 | string | `刷新成功` |
| successDuration | 刷新成功提示文案展示时长(ms) | number/string | 1000 |
| animationDuration | 动画时长(ms) | number/string | 300 |
| headHeight | 下拉区域高度 | number/string | 50 |
| disabled | 是否禁用下拉刷新 | boolean | false |
| maskClass(`v1.6.3`) | 动画蒙层类名 | string | - |

</card>

<card>

### Events
| 事件名 | 说明 | 回调参数 |
|:---:|:---:|:---:|:---:|
| refresh | 下拉刷新触发 | - |

</card>

<card>

### Slots
| 名称 | 说明 | 参数 |
|:---:|:---:|:---:|:---:|
| pulling | 下拉过程中顶部内容 | - |
| loosing | 释放过程中顶部内容 | - |
| loading | 加载过程中顶部内容 | - |
| success | 刷新成功提示内容 | - |


</card>

<demo/>