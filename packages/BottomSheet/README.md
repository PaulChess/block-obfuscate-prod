# BottomSheet 底部视图 <Badge text="1.6.0+" />

## 简介

<card>

### 介绍
底部视图是用户发起，与当前情景中相关的任务或者入口， 用户可以通过它立马来执行操作。

</card>

## 代码演示

<card>

### 基础用法

`v-model` 控制底部视图组件的展示和隐藏。  

`title` 属性可以设置大标题，若不传该属性则不展示。  

具名插槽 `body` 中使用者自行填充主要展示内容。

::: tip Tips
建议将插槽所在的容器的css属性 `height` 的值设置为 `100%`
:::


```javascript
<hxm-cell title="展示底部视图" @click="show = true"></hxm-cell>

<hxm-bottom-sheet v-model="show" title="标题">
  <div slot="body" class="basic-body">
    内容区域
  </div>
</hxm-bottom-sheet>

export default {
  data() {
    return {
      show: false
    }
  },
}
```
```css
/* 内容区域的样式，自定义 */
.basic-body {
  height: 100%;
  font-size: 0.32rem;
  color: #323232;
  [theme-mode="black"] & {
    color: #d2d2d3;
  }
  display: flex;
  justify-content: center;
  align-items: center;
}
```
</card>

<card>

### 设置提示

`tips` 属性用来设置提示语

```javascript
<hxm-cell title="展示底部视图" @click="show = true"></hxm-cell>

<hxm-bottom-sheet v-model="show" :tips="tips">
  <div slot="body" class="basic-body">
    内容区域
  </div>
</hxm-bottom-sheet>

export default {
  data() {
    return {
      show: false,
      tips: '提示：您可任选一种或两种提示方式，但由于运营商或技术因素，可能存在延时'
    }
  }
}
```
</card>

<card>

### 设置底部按钮

通过 `btns` 属性可以设置组件底部的按钮。`btns` 为数组，数组中的每一项代表对一个按钮的控制，其中，
`type` 属性为按钮类型，目前仅支持 `cancel` 和 `confirm` 两个值；`text` 属性为按钮文案。

```javascript
<hxm-cell title="展示底部视图" @click="show = true"></hxm-cell>

<hxm-bottom-sheet v-model="show" title="标题" :btns="bottomSheetBtn">
  <div slot="body" class="basic-body">
    内容区域
  </div>
</hxm-bottom-sheet>

export default {
  data() {
    return {
      bottomSheetBtn: [{
        type: 'cancel',
        text: '取消',
      }, {
        type: 'confirm',
        text: '确定'
      }]
    }
  }
}
```
</card>

<card>

### 设置弹出层高度

`popupHight` 属性可以控制弹出层高度，尺寸单位和百分比均可。

```javascript
<hxm-cell title="展示底部视图" @click="show = true"></hxm-cell>

<hxm-bottom-sheet v-model="show" title="标题" popupHeight="6rem">
  <div slot="body" class="basic-body">
    内容区域
  </div>
</hxm-bottom-sheet>
```
</card>

<card>

### 综合案例

以下案例是在真实项目中使用到的在 `BottomSheet组件` 中嵌入一个 `复选框组` 的demo。

```javascript
<hxm-cell title="展示底部视图" @click="show = true"></hxm-cell>

<hxm-bottom-sheet
  popupHeight="5.7rem"
  :btns="btns"
  :tips="tips"
  v-model="show">
  <div slot="body" class="body">
    <hxm-checkbox-group v-model="checkboxCell">
      <hxm-cell title="电脑客户端"
        :transparentBackground="true"
        :showBottomBorder="false"
        :showPadding="false">
        <hxm-checkbox name="computer" slot="right"></hxm-checkbox>
      </hxm-cell>
      <hxm-cell title="手机客户端"
        :transparentBackground="true"
        :showBottomBorder="false"
        :showPadding="false">
        <hxm-checkbox name="mobile" slot="right"></hxm-checkbox>
      </hxm-cell>
      <hxm-cell title="手机短信"
        :transparentBackground="true"
        :showBottomBorder="false"
        :showPadding="false">
        <hxm-checkbox name="sms" slot="right"></hxm-checkbox>
      </hxm-cell>
    </hxm-checkbox-group>
  </div>
</hxm-bottom-sheet>

export default {
  data() {
    return {
      show: false,
      checkboxCell: [],
      btns: [{
        type: 'confirm',
        text: '完成',
      }],
    }
  }
}
```
```css
.body {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
```
</card>

## API

<card>

### Props

| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---:|:---|
| v-model | 控制底部视图的显示和隐藏 | boolean | `false` |
| title | 底部视图标题 | string | `''` |
| tips | 底部视图提示 | string | `''` |
| btns | 按钮组 | Array | `[{ type: 'cancel', text: '取消' }, { type: 'confirm', text: '完成' }]` |
| popupHeight | 弹出层高度 | string | `66%` |
| closeOnClickOverlay | 点击蒙层是否关闭弹出层 | boolean | `true` |
| disableClose | 禁止关闭(用于点击按钮时控制弹出层关闭逻辑) | boolean | `false` |

</card>

<card>

### Events

| 事件名 | 说明 | 回调参数 |
|:---:|:---|:---:|
| confirm | 点击确定按钮(`type` 为 `confirm`)时触发 | - |
| cancel | 点击取消按钮(`type` 为 `cancel`时触发) | - |
| close | 弹出层关闭时触发 | - |

</card>

<card>

### Slots
| 名称 | 说明 | 参数 |
|:---:|:---:|:---:|
| body | 主体内容插槽 | - |

</card>

<demo />