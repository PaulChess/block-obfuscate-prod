# SnackBar 临时消息栏

## 简介

<card>

### 介绍
SnackBar是Toast的强化版，用于提供有关操作，适合用于需要撤销或可能存在进一步操作的场景提示。

</card>

## 代码演示

<card>

### 基础用法

调用 `this.$snackbar`,`text` 为snackbar中的描述文案，`btnName` 为snackbar右侧按钮的文案。

```javascript
this.$snackbar({
  text: '已添加至自选股列表',
  btnName: '管理列表',
});
```
</card>

<card>

### 触发按钮方法

`btnClick` 属性支持传入一个自定义方法，用于点击按钮后的回调。

```javascript
this.$snackbar({
  text: '已添加至自选股列表',
  btnName: '管理列表',
  btnClick: () => {
    this.$snackbar.hide(); // 隐藏snackbar
    this.$toast('弹出列表');
  },
});
```
</card>

## API

<card>

### Props

| 参数 | 说明 | 类型 | 默认值 |
|:---:|:---:|:---:|:---:|
| text | 提示文案 | string   | - |
| btnName | 按钮文案 | string   | - |
| btnClick | 按钮点击事件 | function | `null` |
| zIndex | `z-index` 层级 | string/number | `10` |
| fontSize | 字体大小 | number | `28` |
| borderRadius | 圆角大小 | number | `88` |

</card>

<card>

### Events

| 函数名 | 说明 | 参数 |
|:---:|:---|:---:|
| show | 展示 snackbar，默认方法，可简写为 `this.$snackbar` | `见上表` |
| hide | 隐藏 snackbar | - |

</card>

<demo/>