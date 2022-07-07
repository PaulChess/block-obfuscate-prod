# Dialog 弹出框

## 简介

<card>

### 介绍
弹出模态框，常用于消息提示、消息确认，或在当前页面内完成特定的交互操作。

</card>

## 代码演示

<card>

### 基本用法

调用 `this.$dialog`，传入一个对象对弹窗内容进行定义。  

其中 `title` 为弹窗标题，`content` 为正文内容, `btns` 属性为一个数组，一个按钮就是数组中的一个对象，`text` 为按钮的文案。

```javascript
// 有标题
this.$dialog({
  title: '标题',
  content: '代码写出来是给人看的',
  btns: [
    {
      text: '我知道了',
    },
  ],
});

// 无标题
this.$dialog({
  content: '代码写出来是给人看的',
  btns: [
    {
      text: '我知道了',
    },
  ],
});
```
</card>

<card>

### 按钮排列

`btnDirection` 属性控制两个按钮的排列方向，可选值为 `row`、`column`, 默认为 `row` 横向排列。

```javascript
// 横向排列
this.$dialog({
  title: '标题',
  content: '确认是否要删除?',
  btns: [
    {
      text: '取消',
    },
    {
      text: '确认',
    },
  ],
});

// 纵向排列
this.$dialog({
  title: '标题',
  content: '代码写出来是给人看的，附带能够在机器上运行',
  btnDirection: 'column',
  btns: [
    {
      text: '取消',
    },
    {
      text: '确认',
    },
  ],
});
```
</card>

<card>

### 按钮样式

在 `btns` 按钮数组的对象中，设置 `highlight` 属性可控制按钮样式，可选值为 `true`、`false`、`bold`。  

其中，`true` 表示高亮按钮文字，`false` 表示取消高亮按钮文字，`bold` 表示加粗按钮文字，默认最后一个按钮的 `highlight` 为 `true`。

```javascript
this.$dialog({
  title: '标题',
  content: '代码写出来是人看的',
  btns: [
    {
      text: '取消',
      highlight: true,
    },
    {
      text: '确认',
      highlight: false,
    },
  ],
});
```
</card>

<card>

### 关闭行为

设置 `asyncClose` 属性为 `true` 可以触发异步关闭，该值默认为 `false`；设置 `autoClose` 为 `false` 可以禁止弹窗自动关闭，默认为 `true`。

```javascript
// 异步关闭
this.$dialog({
  title: '标题',
  content: '代码写出来是人看的',
  asyncClose: true,
  btns: [
    {
      text: '取消',
      callback: (done) => {
        setTimeout(() => {
          done();
        }, 1000);
      },
    },
    {
      text: '确认',
      callback: ((done) => {
        setTimeout(() => {
          done();
        }, 1000);
      }),
    },
  ],
});

// 禁止自动关闭
this.$dialog({
  title: '禁止自动关闭',
  content: '过两秒后再关闭',
  autoClose: false,
  btns: [
    {
      text: '我知道了',
      callback: (done) => {
        setTimeout(() => {
          done();
        }, 2000);
      },
    },
  ],
});
```
</card>

<card>

### 自定义渲染

如果用户想要完全自定义弹窗中的内容，组件中提供了 `innerRender属性`，可以引入自己写好的组件，进行渲染；也可以直接在 `innerRender` 中直接编写render函数。一般情况下，我们推荐的做法还是直接渲染组件来保证传入对象的整洁性。

```javascript
// 直接渲染组件
import CustomDialog from '../components/CustomDialog.vue';
this.$dialog({
  innerRender(h) {
    return h(CustomDialog);
  },
});

// 渲染render函数
this.$dialog({
  title: '注意',
  innerRender(h) {
    return h(
      'div',
      {
        style: {
          color: 'green',
          fontSize: '0.32rem',
          textAlign: 'center',
        },
      },
      '自定义内容',
    );
  },
  btns: [
    {
      text: '我知道了',
    },
  ],
});
```
</card>

## API

<card>

### Dialog props

| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---:|:---:|
| title | 弹窗标题 | string | - |
| content | 弹窗正文 | string | - |
| btns | 按钮组 | array  | - |
| btnDirection(`v0.5.0`) | 按钮排列方向，可选值为`row`和`column` | string | `row` |
| asyncClose | 是否异步关闭 | boolean | `false` |
| autoClose | 是否自动关闭弹窗 | boolean | `true` |
| innerRender(`v0.5.0`) | 自定义内容渲染函数 | function | - |

</card>

<card>

### Btn props
| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---:|:---:|
| text | 按钮文案 | string | - |
| highlight | 按钮文字样式，可选值为`true`、`false`、`bold` | boolean/string | 最后一个按钮的highlight为`true` |
| btnColor(`v1.4.10`) | 按钮颜色 | string | - |
| callback | 点击按钮的触发事件 | function | - |

</card>

<card>

### Events

| 事件名 | 说明 | 回调参数 |
|:---:|:---|:---:|
| close(`v0.5.0`) | 可调用 `this.$dialog.close()` 手动关闭弹窗，一般用于自定义渲染组件  | - |

</card>

<demo/>