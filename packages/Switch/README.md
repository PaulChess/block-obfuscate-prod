# Switch 开关

## 介绍

<card>

### 介绍
用于在打开和关闭状态之间进行切换。

</card>

## 代码演示

<card>

### 基础用法

通过 `v-model` 绑定开关的选中状态，`true` 表示打开，`false` 表示关闭。
`v-model` 在该组件中实际上是 `checked` 属性与 `change` 事件的语法糖。

```javascript
<hxm-switch v-model="status"></hxm-switch>

export default {
  data() {
    return {
      status: true
    }
  }
}
```
</card>

<card>

### 自定义尺寸

通过 `size` 属性，传入一个数组，数组的第一项为开关的宽度，数组的第二项为开关的高度，从而实现开关尺寸的自定义。

```javascript
<hxm-switch
  v-model="status"
  :size="['0.64rem', '0.32rem']">
</hxm-switch>

export default {
  data() {
    return {
      status: true
    }
  } 
}
```
</card>

<card>

### 禁用开关

通过 `disabled` 属性来禁用开关，禁用状态下开关不可点击。

```javascript
<hxm-switch v-model="status" disabled></hxm-switch>

export default {
  data() {
    return {
      status: true
    }
  }
}
```
</card>

<card>

### 加载状态

::: tip 提示
请引用组件库 `1.4.7` 以上版本
:::

通过 `loading` 属性设置开关为加载状态，加载状态下开关不可点击。通过绑定 `checked` 属性可以在方法中自行控制开关状态。

```javascript
<hxm-switch
  :checked="asyncSwitchStatus"
  :loading="loading"
  @click="callInterface">
</hxm-switch>

export default {
  data() {
    return {
      asyncSwitchStatus: false,
      loading: false,
    }
  },
  methods: {
    callInterface() {
      const random = Math.floor(Math.random() * 3);
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        // 模拟接口调用，只有调用成功才切换状态
        if (random !== 2) {
          this.asyncSwitchStatus = !this.asyncSwitchStatus;
        } else {
          // random === 2 模拟接口调用失败
          this.$toast('模拟接口调用失败');
        }
      }, 1000);
    },
  }
}
```
</card>

<card>

### 扩展checked类型(新)

::: tip 提示
请引用组件库 `1.3.7` 以上版本
:::

通过设置 `active-value` 和 `inactive-value` 属性，使switch的开关状态值不局限于默认的 `true` 和 `false`，
接受 `boolean`、`string` 或 `number` 类型的值。注意此时 `v-model` 绑定的值一定要是两个属性其中的一个。

```javascript
<hxm-switch v-model="status"
  :active-value="100"
  :inactive-value="0">
</hxm-switch>

export default {
  data() {
    return {
      status: 100
    }
  },
}
```
</card>

<card>

### 搭配单元格使用

::: tip 提示
组件库 `1.8.0` 版本新增
:::

```javascript
<hxm-cell title="飞行模式">
  <hxm-switch v-model="status" slot="right"></hxm-switch>
</hxm-cell>

export default {
  data() {
    return {
      status: false
    }
  }
}
```
</card>

## API

<card>

### Props
| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---:|:---:|
| v-model | 开关选中状态 | boolean/string/number | - |
| checked | 开关选中状态，需要异步切换时使用该属性 | boolean/string/number | `false` |
| size | 开关尺寸，数组第一项为开关宽度，第二项为开关高度 | array | `['525em', '0.32em']` |
| disabled | 是否为禁用状态 | boolean | `false` |
| loading`(v1.4.7)` | 控制switch的loading显示状态 | boolean | `false` |
| active-value`(v1.3.7)` | switch打开时的值 | boolean/string/number | `true` |
| inactive-value`(v1.3.7)` | switch关闭时的值 | boolean/string/number | `false` |

</card>

<card>

### Events

| 事件名 | 说明 | 回调参数 |
|:---:|:---:|:---:|
| change | 开关状态切换时触发 | _value: false_ |
| click`(v1.4.7)` | 点击开关时触发 | _e: MouseEvent_ |

</card>

<demo />