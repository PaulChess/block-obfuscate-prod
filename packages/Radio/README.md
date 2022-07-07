# Radio 单选框

## 简介

<card>

### 介绍
用于在多个选项中选择单个结果。

</card>

## 代码演示

<card>

### 基础用法

通过 `v-model` 绑定单选框的勾选状态。

```javascript
<hxm-radio v-model="status">
  <p class="radio-content">同步</p>
</hxm-radio>

export default {
  data() {
    status: false,
  }
}
```
```css
// less
.radio-content {
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

通过 `size` 属性可以修改单选框的边长尺寸。

```javascript
<hxm-radio v-model="status" size="0.32rem">
  <p class="checkbox-content">自定义尺寸</p>
</hxm-radio>

export default {
  data() {
    status: false,
  }
}
```
</card>

<card>

### 自定义形状

将 `shape` 属性改为 `rect`，可以将单选框的形状改为方形。

```javascript
<hxm-radio v-model="status" shape="rect">
  <p class="checkbox-content">单选框</p>
</hxm-radio>

export default {
  data() {
    status: false,
  }
}
```
</card>

<card>

### 禁用复选框

通过设置 `disabled` 属性可以禁用单选框

```javascript
<hxm-radio v-model="status" disabled>
  <p class="checkbox-content">禁用单选框</p>
</hxm-radio>

export default {
  data() {
    status: false,
  }
}
```
</card>

<card>

### 异步切换

如果想要实现异步切换单选框状态，可以使用 `checked` 属性和 `@change` 事件代替 `v-model`，在事件回调函数中手动处理复选框的选中状态。

```javascript
<hxm-radio :checked="status" @change="changeStatus">
  <p class="checkbox-content">1秒后切换</p>
</hxm-radio>

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

### 单选框组

单选框可以与单选框组一起使用，单选框组通过 `v-model` 绑定单选框的勾选状态。`radio` 组件需要绑定 `name` 属性来告诉 `radio-group` 这个是哪个单选框。

```javascript
<hxm-radio-group v-model="radioGroupValue">
  <div class="radio-group-block">
    <hxm-radio name="Foo">
      <p class="radio-content">Foo</p>
    </hxm-radio>
    <hxm-radio name="Bar">
      <p class="radio-content">Bar</p>
    </hxm-radio>
  </div>
</hxm-radio-group>

export default {
  data() {
    return {
      radioGroupValue: 'Foo',
    }
  },
}
```
```css
// less
.radio-group-block {
  .hxm-radio {
    margin-bottom: 0.2rem;
  }
}
```
</card>

<card>

### 搭配单元格组件使用 

搭配单元格组件使用时，需要再引入 `Cell` 和 `CellGroup` 组件，并通过 Radio 实例上的 handleClick 方法触发切换。

::: tip 提示
组件库 `1.8.0` 版本新增
:::

```javascript
<hxm-radio-group v-model="radioCell">
  <hxm-cell
    v-for="(item, index) in serviceNameList"
    :key="item.name"
    :title="item.title"
    clickable
    @click="toggleRadio(index)">
    <hxm-radio
      :name="item.name"
      :disableTransition="true"
      slot="right"
      ref="hxmRadioNode">
    </hxm-radio>
  </hxm-cell>
</hxm-radio-group>

export default {
  data() {
    return {
      radioCell: 'mobile',
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
    toggleRadio(index) {
      this.$refs.hxmRadioNode[index].handleClick();
    },
  }
}
```
</card>

## API

<card>

### Radio Props

| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---:|:---:|
| v-model | 是否为选中状态 | boolean | - |
| name | 标识符 | any | - |
| size | 单选框尺寸，需要加上单位 | string | `0.22em` |
| shape | 单选框形状，可选值为`circle`,`rect` | string | `circle` |
| disabled | 是否禁用单选框 | boolean | `false` |
| checked | 单选框选中状态，需要异步切换时使用该属性 | boolean | `false` |
| initialTransition(`v1.5.0`) | 是否初始化radio的transition | boolean | `false` |

</card>

<card>

### RadioGroup Props

| 参数 | 说明 | 类型 | 默认值 |
|:---:|:---:|:---:|:---:|
| v-model | 选中项的标识符 | string | - |

</card>

<card>

### Radio Events

| 事件名 | 说明 | 回调参数 |
|:---:|:---:|:---:|
| change | 单选框状态切换时触发 | _value: false_ |

</card>

## 常见问题

<card>

#### 为什么手动切换 `radio-group` v-model 绑定属性的值的时候视图不更新？

组件库 `1.8.0` 版本对该问题进行了修复，请升级到 `1.8.0` 以上。

</card>

<demo/>