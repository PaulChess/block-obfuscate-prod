## Search 搜索栏

## 简介

<card>

### 介绍
搜索栏用于有大量的数据项需要用户筛选查找的场景，这边的搜索栏仅提供搜索框，不包含数据列表。

</card>

## 代码演示

<card>

### 基本用法

`v-model` 绑定input框的数据，当输入框有值时右侧会出现关闭按钮，点击关闭按钮input框的数据会自动置空。  
组件内部已经做了 `300ms` 的防抖，可通过 `debounceTimeout` 属性对防抖时间进行修改。

```html
<hxm-search v-model="searchPattern"></hxm-search>
```
```javascript
export default {
  data() {
    return {
      searchPattern: ''
    }
  }
}
```
</card>

<card>

### 自定义placeholder

和普通的input框一样，通过设置 `placeholder` 可修改输入提示。

```html
<hxm-search
  v-model="searchPattern"
  placeholder="自定义placeholder">
</hxm-search>
```
```javascript
export default {
  data() {
    return {
      searchPattern: ''
    }
  }
}
```
</card>

<card>

### 点击跳转

有时候我们会遇到点击禁止输入状态的input框，点击进入到真正的搜索页面的场景，可以通过设置 `disabled` 使input框变成禁止态，并通过暴露出来的 `click` 事件自行跳转到真正的搜索页面。

```html
<hxm-search
  disabled
  v-model="searchPattern"
  placeholder="设置 disabled 后监听点击并跳转"
  @click="handleStaticSearchClick">
</hxm-search>
```
```javascript
export default {
  data() {
    return {
      searchPattern: '',
    };
  },
  methods: {
    handleStaticSearchClick() {
      this.$router.push({
        name: 'SearchPage',
      });
    },
  },
};
```
</card>

## API

<card>

### Props

| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---:|:---|
| v-model | 绑定input框的输入内容 | string | - |
| placeholder | 输入框占位符 | string | `股票代码/名称/简拼/功能关键词` |
| debounceTimeout | 输入框input事件防抖延时时间(ms) | number | `300` |
| disabled | 是否禁用输入框 | boolean | `false` |
| autoFocus(`v1.6.1`) | 是否自动聚焦 | boolean | `true` |

</card>

<card>

### Events

| 事件名 | 说明 | 回调参数 |
|:---|:---|:---:|
| input | 用户输入时触发 | `当前input框的值` |
| clear | 用户点击清空按钮时触发 | `当前input框的值` |
| click | 用户点击输入框时触发 | - |
| focus(`v1.6.1`) | 输入框聚焦时触发 | - |

</card>

<demo/>