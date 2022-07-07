# Clamp 文本截断[新] <Badge text="1.10.0+" />

## 简介

<card>

### 介绍
实现常用多行文本截断的需求。当前仅支持普通字符串，不支持富文本。

</card>

## 代码演示

<card>

### 设置最大行数

通过 `maxLines` 可以设置文本展示的最大行数。  
`contentClass` 参数可以自定义文本类名，用于设置文本的样式。  
具名插槽 `before` 和 `after` 可以自定义文本前后的元素，暴露的具体参数见下表。

:::tip 提示
1. 展开的时候，按钮默认是跟在文本后面的，如果按钮需要固定在右下角，需要给该按钮设置 `float:right`，在如下的例子中绑定的是 `expand` 类名。  
2. `contentClass` 属性用于给文本绑定自定义类来设置样式，比如行间距、颜色，或者 `word-break: break-all;`、`word-break: break-word` 等。
:::

```javascript
<hxm-clamp :maxLines="maxLines" contentClass="content-class">
  {{ text }}
  <template #after="{ toggle, expanded }">
    <span class="btn expand" @click="toggle" v-if="expanded">
      收起
    </span>
    <span class="btn" @click="toggle" v-else>
      展开
    </span>
  </template>
</hxm-clamp>

export default {
  data() {
    return {
      maxLines: 3
    }
  }
}
```

```css
// 自定义的一些样式，根据实际业务场景来写
.content-class {
  color: #323232;
  [theme-mode="black"] & {
    color: #d2d2d3;
  }
}
button {
  position: relative;
  bottom: 4px;
  margin-left: 10px;
}
.btn {
  margin-left: 0.12rem;
  color: #4691EE;
  white-space: nowrap;
  [theme-mode="black"] & {
    color: #3D76B8;
  }
}
// 展开的时候将按钮设置在右下角
.expand {
  float: right;
  clear: both;
}
```

</card>

<card>

### 设置最大高度

通过 `maxHeight` 属性设置文本区域展示的最大高度。

```javascript
<hxm-clamp :maxHeight="maxHeight" contentClass="content-class">
  {{ text }}
  <template #after="{ toggle, expanded }">
    <span class="btn expand" @click="toggle" v-if="expanded">
      收起
    </span>
    <span class="btn" @click="toggle" v-else>
      展开
    </span>
  </template>
</hxm-clamp>

export default {
  data() {
    return {
      maxHeight: '1.8rem'
    }
  }
}
```

</card>

<card>

### 设置初始状态

通过 `expanded` 属性可以设置文本的初始展开收起状态。`true` 为 展开， `false` 为收起。

```javascript
<hxm-clamp
  :maxLines="maxLines"
  :expanded="isExpanded"
  contentClass="content-class"
>
  {{ text }}
  <template #after="{ toggle, expanded }">
    <span class="btn expand" @click="toggle" v-if="expanded">
      收起
    </span>
    <span class="btn" @click="toggle" v-else>
      展开
    </span>
  </template>
</hxm-clamp>

export default {
  maxLines: 3,
  isExpanded: true
}
```

</card>

<card>

### 设置文本前显示内容

通过 `before` 插槽可以设置文本前的展示内容

```javascript
<hxm-clamp :maxLines="maxLines" contentClass="content-class">
  {{ text }}
  <template #before>
    <hxm-icon name="refresh" color="#e93030" size="0.28rem"></hxm-icon>
  </template>
</hxm-clamp>

export default {
  maxLines: 3
}
```

</card>

## API

<card>

### Props

| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---:|:---:|
| maxLines | 最大行数 | number | - |
| maxHeight | 最大高度 | number/string | - |
| ellipsis | 省略符号 | string | `...` |
| contentClass | 文本内容自定义类名 | string | - |

</card>

<card>

### Slots
| 名称 | 说明 | 参数 |
|:---:|:---:|:---:|
| default | 需要截断的文本，只能是纯文本 | - |

</card>

<card>

### Scoped Slots
:::tip 提示
组件提供了 `before` 和 `after` 两个作用域插槽，用于自定义阶段文本前后的内容。作用域插槽共暴露了 `5` 个参数，详情见下表。
:::
| 参数 | 说明 | 类型 |
|:---|:---|:---|
| expand | 展开被截断的文本 | Function |
| collapse | 收起被截断的文本 | Function |
| toggle | 切换被截断文本的展开收起状态 | Function |
| clamped | 内容是否处于截断状态 | Boolean |
| expanded | 内容是否处于展开状态 | Boolean |

</card>

<card>

### Events

| 事件名 | 说明 | 回调参数 |
|:---|:---|:---|
| toggle | 展开收起状态切换的时候触发 | _expanded: Boolean_ `true`: 展开 `false`: 收起 |

</card>

<demo />

