# Overlay 遮罩层 <Badge text="1.3.6+" />

## 简介

<card>

### 介绍
创建一个遮罩层，用于强调特定的页面元素，并阻止用户进行其他操作。

</card>

## 代码演示

<card>

### 基础用法

```javascript
<hxm-button @click="show = true">显示遮罩层</hxm-button>
<hxm-overlay :show="show" @click="show = false"></hxm-overlay>

export default {
  data() {
    return {
      show: false,
    };
  },
}
```
</card>

<card>

### 嵌入内容

通过默认插槽可以在遮罩层上嵌入自定义内容。

```javascript
<hxm-button @click="showEmbedded = true">嵌入内容</hxm-button>

<hxm-overlay :show="showEmbedded" @click="showEmbedded = false">
  <div class="wrapper">
    <div class="block" />
  </div>
</hxm-overlay>

export default {
  data() {
    return {
      showEmbedded: false,
    }
  }
}
```
```css
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.block {
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  background-color: #fff;
}
```
</card>

## API

<card>

### Props

| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---:|:---:|
| show | 是否显示遮罩层 | boolean | `false` |
| z-index | z-index层级 | number/string | `1` |
| duration | 动画时长(单位为ms) | number/string | `300` |
| class-name | 自定义类名 | string | - |
| custom-style | 自定义样式 | object | - |
| fixedBody | 是否锁定背景滚动，锁定时蒙层中的内容也无法滚动 | boolean | `true` |

</card>

<card>

### Events

| 事件名 | 说明 | 回调参数 |
|:---:|:---:|:---:|
| click | 点击遮罩时触发 | _event: MouseEvent_ |

</card>

<card>

### Slots

| 名称 | 说明 |
|:---:|:---:|:---:|
| default | 默认插槽，用于在遮罩层上方嵌入内容 |

</card>

<demo/>
