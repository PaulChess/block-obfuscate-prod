# DropdownMenu 下拉菜单 <Badge text="1.8.4+" />

## 简介

<card>

### 介绍
用于筛选选项的菜单

:::tip 提示
`v1.8.4` 版本对该组件进行了重构，`v0.9.6` 版本上线的 `DropdownMenu` 废弃
:::

</card>

## 代码演示

<card>

### 基础用法

```javascript
<hxm-dropdown-menu>
  <hxm-dropdown-item
    v-model="value"
    :options="options">
  </hxm-dropdown-item>
</hxm-dropdown-menu>

export default {
  data() {
    return {
      value: 0,
      options: [
        { text: '最新', value: 0 },
        { text: '年报', value: 1 },
        { text: '中报', value: 2 },
        { text: '三年报', value: 3 },
      ],
    }
  }
}
```
</card>

<card>

### 设置宽度

通过给 `DropdownItem` 设置 `width` 属性可以设置下拉菜单入口宽度。

```javascript
<hxm-dropdown-menu>
  <hxm-dropdown-item
    v-model="value"
    :options="options"
    width="3rem">
  </hxm-dropdown-item>
</hxm-dropdown-menu>

export default {
  data() {
    return {
      value: 0,
      options: [
        { text: '最新', value: 0 },
        { text: '年报', value: 1 },
        { text: '中报', value: 2 },
        { text: '三年报', value: 3 },
      ],
    }
  }
}
```
</card>

<card>

### 控制菜单方向

通过给 `Dropdown` 设置 `direction` 属性可以设置下拉菜单展开方向。默认值为 `down`，当需要向上展开时，可以设为 `up`。

```javascript
<hxm-dropdown-menu direction="up">
  <hxm-dropdown-item
    v-model="value3"
    :options="options">
  </hxm-dropdown-item>
</hxm-dropdown-menu>

export default {
  data() {
    return {
      value: 0,
      options: [
        { text: '最新', value: 0 },
        { text: '年报', value: 1 },
        { text: '中报', value: 2 },
        { text: '三年报', value: 3 },
      ],
    }
  }
}
```
</card>

## API

<card>

### Dropdown Props

| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---:|:---:|
| direction | 控制菜单展开方向，可选值为 `down` `up` | string | `down` |
| showOverlay | 菜单展开时是否展示蒙层 | boolean | `true` |
| overlayZIndex | 蒙层层级 | string/number | `1` |
| menuZIndex | 菜单层级 | string/number | `2` |

</card>

<card>

### DropdownItem Props

| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---:|:---:|
| v-model | 控制当前选中项的值（和 `options` 中的 `value` 对应） | string/number | - |
| width | 菜单入口宽度 | string | `1.9rem` |
| options | 菜单选项数组, 数组项为 `title` 和 `value` | Array | - |

</card>

<demo />