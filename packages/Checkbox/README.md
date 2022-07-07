# Checkbox 复选框

## 简介

<card>

### 介绍
用于在选中和非选中状态之间进行切换

</card>

## 代码演示

<card>

### 基础用法

通过 `v-model` 绑定复选框的勾选状态。

```javascript
<hxm-checkbox v-model="status">
  <p class="checkbox-content">同步</p>
</hxm-checkbox>

export default {
  data() {
    status: false,
  }
}
```
```css
// less
.checkbox-content {
  color: #323232;
  font-size: 0.28rem;

  [theme-mode="black"] & {
    color: #d2d2d3;
  }
}
```
</card>

<card>

### 自定义尺寸

通过 `size` 属性可以修改复选框的边长尺寸。

```javascript
<hxm-checkbox v-model="status" size="0.32rem">
  <p class="checkbox-content">自定义尺寸</p>
</hxm-checkbox>

export default {
  data() {
    status: false,
  }
}
```
</card>

<card>

### 自定义形状

将 `shape` 属性改为 `rect`，可以将复选框的形状改为方形。

```javascript
<hxm-checkbox v-model="status" shape="rect">
  <p class="checkbox-content">复选框</p>
</hxm-checkbox>

export default {
  data() {
    status: false,
  }
}
```
</card>

<card>

### 禁用复选框

通过设置 `disabled` 属性可以禁用复选框

```javascript
<hxm-checkbox v-model="status" disabled>
  <p class="checkbox-content">禁用复选框</p>
</hxm-checkbox>

export default {
  data() {
    status: false,
  }
}
```
</card>

<card>

### 异步切换

如果想要实现异步切换复选框状态，可以使用 `checked` 属性和 `@change` 事件代替 `v-model`，在事件回调函数中手动处理复选框的选中状态。

```javascript
<hxm-checkbox :checked="status" @change="changeStatus">
  <p class="checkbox-content">1秒后切换</p>
</hxm-checkbox>

export default {
  data() {
    status: false,
  },
  methods: {
    changeStatus(value) {
      setTimeout(() => {
        this.status = value;
      }, 1000);
    }
  },
}
```
</card>

<card>

### 复选框组

复选框可以与复选框组一起使用，复选框组通过 `v-model` 数组绑定复选框的勾选状态。`checkbox` 组件需要绑定 `name` 属性来告诉 `checkbox-group` 这个是哪个复选框。

```javascript
<hxm-checkbox-group v-model="checkboxGroupValue">
  <div class="checkbox-group-block">
    <hxm-checkbox name="Foo">
      <p class="checkbox-content">Foo</p>
    </hxm-checkbox>
    <hxm-checkbox name="Bar">
      <p class="checkbox-content">Bar</p>
    </hxm-checkbox>
    <hxm-checkbox name="Main">
      <p class="checkbox-content">Main</p>
    </hxm-checkbox>
    <hxm-checkbox name="Sub">
      <p class="checkbox-content">Sub</p>
    </hxm-checkbox>
  </div>
</hxm-checkbox-group>

export default {
  data() {
    return {
      checkboxGroupValue: ['Foo', 'Main'],
    }
  }
}
```
```css
// less
.checkbox-group-block {
  .hxm-checkbox {
    margin-bottom: 0.2rem;
  }
}
```
</card>

<card>

### 搭配单元格组件使用 

搭配单元格组件使用时，需要再引入 `Cell` 和 `CellGroup` 组件，并通过 Checkbox 实例上的 handleClick 方法触发切换。

::: tip 提示
组件库 `1.8.0` 版本新增
:::

```javascript
<hxm-checkbox-group v-model="checkboxCell">
  <hxm-cell
    v-for="(item, index) in serviceNameList"
    :key="item.name"
    :title="item.title"
    clickable
    @click="toggleCheckbox(index)">
    <hxm-checkbox
      :name="item.name"
      :disableTransition="true"
      slot="right"
      ref="hxmCheckboxNode">
    </hxm-checkbox>
  </hxm-cell>
</hxm-checkbox-group>

export default {
  data() {
    return {
      checkboxCell: ['mobile'],
      serviceNameList: [{
        name: 'computer',
        title: '电脑客户端',
      }, {
        name: 'mobile',
        title: '手机客户端',
      }, {
        name: 'sns',
        title: '手机短信',
      }],
    }
  },
  methods: {
    toggleCheckbox(index) {
      this.$refs.hxmCheckboxNode[index].handleClick();
    },
  }
}
```
</card>

## API

<card>

### Checkbox Props

| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---:|:---:|
| v-model | 是否为选中状态 | boolean | - |
| name | 标识符 | any | - |
| size | 复选框尺寸，需要加上单位 | string | `0.22em` |
| shape | 复选框形状，可选值为`circle`, `rect` | string | `circle` |
| disabled | 是否禁用复选框 | boolean | `false` |
| checked | 复选框选中状态，需要异步切换时使用该属性 | boolean | `false` |

</card>

<card>

### CheckboxGroup Props

| 参数 | 说明 | 类型 | 默认值 |
|:---:|:---:|:---:|:---:|
| v-model | 所有选中项的标识符 | array | - |

</card>

<card>

### Checkbox Events

| 事件名 | 说明 | 回调参数 |
|:---:|:---:|:---:|
| change | 复选框状态切换时触发 | _value: false_ |

</card>

<demo/>