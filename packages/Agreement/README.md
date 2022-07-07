# Agreement 协议 <Badge text="1.5.0+" />

::: warning 提示
若发现使用cdn的方式进行引用时渲染出 `undefined` 的情况，可以尝试将 `vue` 的cdn版本升级到 `2.6.13` 以上
:::

## 简介

<card>

### 介绍
协议组件用于告知用户某些具体事项，多用于风险提示、购买等场景。

</card>

## 代码演示

<card>

### 基础用法

通过 `v-model` 绑定单选框的选中状态，即协议的确认状态。`btnText` 为按钮文案，`agreementList` 为协议列表，传一个协议名称的数组即可。  
当单选框处于禁止勾选状态，按钮也会显示为禁止点击状态，此时点击按钮会触发提示弹窗，提示内容可通过 `uncheckedTip` 属性进行修改。单选框状态切换时会触发 `change` 事件，在事件回调中我们可以拿到切换后的单选框状态。  
点击协议列表中的任意一个协议，会触发 `jumpAgreement` 事件，在事件回调中我们可以拿到传入的数组对应的索引，根据索引我们可以在回调中自行处理跳转。  
当按钮处于正常可点击状态时，会触发 `confirm` 事件。

```html
<hxm-agreement
  v-model="agreeValue"
  btnText="开启保障"
  :agreementList="agreementList"
  @change="agreementChange"
  @confirm="confirm"
  @jumpAgreement="jumpAgreement">
</hxm-agreement>
```
```javascript
export default {
  data() {
    return {
      agreeValue: false,
      agreementList: ['《保险条款》', '《投保须知》']
    }
  },
  methods: {
    confirm() {
      this.$toast('已开启保障');
    },
    agreementChange(val) {
      this.$toast(`选中状态: ${val}`);
    },
    jumpAgreement(idx) {
      this.$toast(`跳转${this.agreementList[idx]}`);
    },
  },
}
```
</card>

<card>

### 文案位置

协议组件的排列顺序默认是文案在上，按钮在下，如果想要调整二者的顺序，将 `reverse` 属性设为 `true` 即可。

```html
<hxm-agreement
  v-model="agreeValue"
  :reverse="true"
  btnText="开启保障"
  :agreementList="agreementList">
</hxm-agreement>
```
```javascript
export default {
  data() {
    return {
      agreeValue: true,
      agreementList: ['《保险条款》', '《投保须知》']
    }
  }
}
```
</card>

<card>

### 默认同意协议

默认情况下，我们会有一个单选框供用户进行勾选，如果想要隐藏单选框，默认同意协议，将 `showCheckIcon` 属性设为 `false` 即可。

```html
<hxm-agreement
  v-model="agreeValue"
  :reverse="true"
  :showCheckIcon="false"
  btnText="开启保障"
  :agreementList="agreementList">
</hxm-agreement>
```

</card>

## API

<card>

### Props

| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---|:---|
| v-model | 单选框选中状态 | boolean | `false` |
| agreementList | 协议列表数据 | Array | - |
| btnText | 按钮文案 | string | - |
| reverse | 是否将按钮和协议文案的位置调整为反向 | boolean | `false` |
| showCheckIcon | 是否展示单选框 | boolean | `true` |
| agreementPrefix | 协议文案前缀 | string | `同意` |
| agreementItemStyle | 协议列表单项样式自定义 | object | - |
| uncheckedTip | 当单选框未勾选时点击按钮弹出的Toast提示文案 | string | `请阅读并同意以上条款` |

</card>

<card>

### Events

| 事件名 | 说明 | 回调参数 |
|:---|:---|:---|
| change | 切换单选框状态时触发 | _val: Boolean_ |
| jumpAgreement | 点击单项协议时触发，返回值为数组索引 | _idx: Number_ |
| confirm | 点击按钮时触发(前提是已勾选单选框) | - |

</card>

<card>

### Slots

| 名称 | 说明 | 参数 |
|:---:|:---:|:---:|
| agreementlist | 协议列表插槽 | - |

</card>

<demo />