# Toast 轻提示

## 简介

<card>

### 介绍
在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。

</card>

## 代码演示

<card>

### 基础用法

调用 `this.$toast`,传入展示内容的字符串。目前支持的一行长度为 `10` 个中文字符。

```javascript
this.$toast('文字提示');
```
</card>

<card>

### 修改展示时长

`Toast` 的默认展示时长为2s,可以通过 `duration` 属性来进行修改，单位为 `ms`。

```javascript
this.$toast('展示时长为1s', {
  duration: 1000,
});
```
</card>

<card>

### 修改z-index层级

在有些页面布局中，可能会出现 `Toast` 层级不够高导致被遮挡的问题，可以通过 `zIndex` 属性修改层级。

```javascript
this.$toast('设置z-index为100', {
  zIndex: 100,
});
```
</card>

<card>

### 提示类型

目前内置支持`成功`、`失败`、`警告`类型。

```javascript
this.$toast.success('成功文案');
this.$toast.error('失败文案');
this.$toast.warn('警告文案');
```
</card>

<card>

### 自定义Html代码段

`this.$toast` 中可以自定义Html代码段内容，如 `em`、`\n` 等。

```javascript
this.$toast('一个<em>内容</em>为<br>html<br>字符串的 Toast');
```
</card>


## API

<card>

### Props

| 参数 | 说明 | 类型 | 默认值 |
|:---:|:---:|:---:|:---:|
| duration | Toast展示时长 | number | `2000` |
| zIndex | Toast层级 | number | `9999` |

</card>

<card>

### Events

| 方法名 | 说明 | 参数 |
|:---:|:---:|:---:|
| success | 展示成功提示 | `见上表` |
| error | 展示失败提示 | `见上表` |
| warn | 展示警告提示 | `见上表` |

</card>

<demo/>