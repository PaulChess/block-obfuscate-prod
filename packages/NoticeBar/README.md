# NoticeBar 通知栏(新) <Badge text="1.9.0+" />

## 简介

<card>

### 介绍

用于循环播放展示一组消息通知。

</card>

## 代码演示

<card>

### 基础用法

通过 `text` 属性设置通知栏内容。

```html
<hxm-notice-bar
  text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。">
</hxm-notice-bar>
```

</card>

### 控制滚动

<card>

通过 `scrollable` 属性控制通知栏内容是否循环滚动，默认为 `true`。

```html
<hxm-notice-bar
  text="技术是开发它的人的共同灵魂"
  :scrollable="false">
</hxm-notice-bar>
```

</card>

### 通知栏模式

<card>

通知栏支持 `close` 和 `link` 两种模式，通过 `mode` 属性进行控制。

```html
<hxm-notice-bar
  text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
  mode="close">
</hxm-notice-bar>
```

```html
<hxm-notice-bar
  text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
  mode="link">
</hxm-notice-bar>
```

</card>

### 操作按钮

<card>

将 `showActionBtn` 属性设置为 `true`，可以在通知栏右侧展示操作按钮，通过`actionBtnText` 设置按钮文案。  
如果想要在左边展示关闭按钮的话，需设置 `mode` 属性为 `close`, 同时将 `showNoticeIcon` 设为 `false` 隐藏左侧通知图标。

```html
<hxm-notice-bar
  text="你需要开启通知功能才能使用预警"
  showActionBtn
  actionBtnText="去开启"
  :scrollable="false">
</hxm-notice-bar>
```

```html
<hxm-notice-bar
  text="你需要开启通知功能才能使用预警"
  :showNoticeIcon="false"
  mode="close"
  showActionBtn
  actionBtnText="去开启"
  :scrollable="false">
</hxm-notice-bar>
```

</card>

### 切换主题

<card>

通知栏组件内部支持 `orange` 和 `blue` 两种主题，通过 `theme` 属性进行设置，默认主题为 `orange`。

```html
<hxm-notice-bar
  text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
  theme="blue">
</hxm-notice-bar>
```

</card>

## API

<card>

### Props

| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---:|:---:|
| text | 通知栏内容 | string | `""` |
| scrollable | 是否开启滚动播放 | boolean | `true` |
| delay | 滚动动画的触发延迟时间 | number/string | `1000` |
| speed | 滚动速率 (px/s) | number/string | `60` |
| mode | 通知栏模式，可选值为 `close` `link` | string | `""` |
| theme | 通知栏主题，可选值为 `orange` `blue` | string | `orange` |
| showActionBtn | 是否展示通知栏右侧操作按钮 | boolean | `false` |
| actionBtnText | 通知栏右侧操作按钮文案 | string | `""` |
| showNoticeIcon | 是否展示通知图标 | boolean | `true` |

</card>

<card>

### Events

| 事件名 | 说明 | 回调参数 |
|:---:|:---:|:---:|
| close | 关闭通知栏触发 | `-` |
| jumpLink | 点击通知栏内容或跳转箭头时触发 | `-` |
| reset | 当通知栏循环滚动完一次触发 | `-` |
| clickBtn | 点击右侧操作按钮时触发 | `-` |

</card>

<card>

### Slots

| 名称 | 说明 | 参数 |
|:---:|:---:|:---:|
| default | 对应通知栏内容 | `-` |
| left-icon | 左侧图标 | `-` |
| right-icon | 右侧图标 | `-` |

</card>

<demo />