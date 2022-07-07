# TabsSegment 标签页 <Badge text="1.7.0+" />

## 简介

<card>

### 介绍

Segement 作为分控组件，用于平级区域主内容的切换进行收纳展示。接受 1-4 个内容的展示，分为一段式，二段式，三段式以及四段式。
注：由于目前 Tabs 组件还在重构中，Segment 作为 Tabs 的一个类型后续会并进 Tabs 组件当中使用。

</card>

## 代码演示

<card>

### 基本用法

每一个标签项为一个`hxm-tabs-segment-panel`组件，其中`title`为标签展示的名称，`name`为该标签相对应的属性值。

#### 四个标签内容

1. `正常字数(不超过4个字)`

```html
<hxm-tabs-segment>
  <template v-for="item in arr1">
    <hxm-tabs-segment-panel :key="item.name" :title="item.title" :name="item.name"> </hxm-tabs-segment-panel>
  </template>
</hxm-tabs-segment>
```

2. `非正常字数（超出字数省略号显示）`

```html
<hxm-tabs-segment>
  <template v-for="item in arr2">
    <hxm-tabs-segment-panel :key="item.name" :title="item.title" :name="item.name">
    </hxm-tabs-segment-panel>
  </template>
</hxm-tabs-segment>
```

#### 小于四个标签内容

1. `不超过12个字符`

```html
<hxm-tabs-segment>
  <template v-for="item in arr3">
      <hxm-tabs-segment-panel :key="item.name" :title="item.title" :name="item.name"></hxm-tabs-segment-panel>
  </template>
</hxm-tabs-segment>
```
2. `超过12个字符(缩小字号)`

```html
<hxm-tabs-segment>
  <template v-for="item in arr4">
    <hxm-tabs-segment-panel :key="item.name" :title="item.title" :name="item.name">
    </hxm-tabs-segment-panel>
  </template>
</hxm-tabs-segment>
```

```javascript
export default {
  data() {
    return {
      arr1: [
        {
          title: '按行业的',
          name: 'hangye',
        },
        {
          title: '按份额',
          name: 'fene',
        },
        {
          title: '按地区',
          name: 'diqu',
        },
        {
          title: '按产品',
          name: 'chanpin',
        },
      ],
      arr2: [
        {
          title: '按行业的话',
          name: 'hangye',
        },
        {
          title: '超出字符按省略号',
          name: 'fene',
        },
        {
          title: '地区',
          name: 'diqu',
        },
        {
          title: '产品',
          name: 'chanpin',
        },
      ],
      arr3: [
        {
          title: '控件组件',
          name: 'segment',
        },
        {
          title: '组件2',
          name: 'segment2',
        },
        {
          title: '分控组件Seg',
          name: 'segment3',
        },
      ],
      arr4: [
        {
          title: '沪深证券交易所',
          name: 'hushen',
        },
        {
          title: '三大板块',
          name: 'bankuai',
        },
        {
          title: '北京证券交易所',
          name: 'beijiaosuo',
        },
      ],
    };
  },
};
```

</card>


<card>

### 带图标展示

`icon`为传入 Icon 内容，支持 Icon 图标显示。Icon作为对象支持颜色，尺寸设置。

```html
<hxm-tabs-segment @change="getSegment">
  <template v-for="item in arr">
    <hxm-tabs-segment-panel :key="item.name" :title="item.title" :name="item.name" :icon="item.icon">
    </hxm-tabs-segment-panel>
  </template>
</hxm-tabs-segment>
```
``` javascript
export default {
  data() {
    return {
      arr: [
        {
          title: '按行业',
          name: 'hangye',
        },
        {
          title: '按份额',
          name: 'fene',
          icon: {
            name: 'selected',
            color: '#f10125',
          },
        },
        {
          title: '按地区',
          name: 'diqu',
        },
        {
          title: '按产品',
          name: 'chanpin',
          icon: {
            name: 'settings',
            color: '#009900',
          },
        },
      ],
    };
  }
};
```
</card>

<card>

### 自定义默认选中
支持v-model双向绑定，对应标签`name`属性，如果为空，默认选中第一项

```html
<hxm-tabs-segment v-model="segment">
  <template v-for="item in arr6">
    <hxm-tabs-segment-panel 
    :key="item.name" :title="item.title" :name="item.name" :icon="item.icon">
    </hxm-tabs-segment-panel>
  </template>
</hxm-tabs-segment>
```
```javascript
export default {
  data() {
    return {
      arr: [
        {
          title: '按行业',
          name: 'hangye',
        },
        {
          title: '按份额',
          name: 'fene',
          icon: {
            name: 'selected',
            color: '#f10125',
          },
        },
        {
          title: '按地区',
          name: 'diqu',
        },
        {
          title: '按产品',
          name: 'chanpin',
          icon: {
            name: 'settings',
            color: '#009900',
          },
        },
      ],
      segment: 'fene'
    }
  };
};
```
</card>

<card>

### 带面板内容切换
可以根据不同标签选中状态，展示不同内容面板

```html
<hxm-tabs-segment>
  <template v-for="item in arr">
    <hxm-tabs-segment-panel :key="item.name" :title="item.title" :name="item.name">
      <template>
        <div class="panel-text">
            This is the 
            <span>{{ item.title }}
            </span>
        </div>
      </template>
    </hxm-tabs-segment-panel>
  </template>
</hxm-tabs-segment>
```
```javascript
export default {
  data() {
    return {
      arr: [
        {
          title: '按行业',
          name: 'hangye',
        },
        {
          title: '按份额',
          name: 'fene',
        },
        {
          title: '按地区',
          name: 'diqu',
        },
        {
          title: '按产品',
          name: 'chanpin',
        },
      ],
    }
  };
}
```
</card>

<card>

### 触发点击事件
点击标签触发`change`事件，默认返回当前点击标签内容信息
```html
<hxm-tabs-segment @change="toggleTab">
  <template v-for="item in arr">
    <hxm-tabs-segment-panel :key="item.name" :title="item.title" :name="item.name"> 
    </hxm-tabs-segment-panel>
  </template>
</hxm-tabs-segment>
```
```javascript
export default {
  data() {
    return {
      arr: [
        {
          title: '按行业',
          name: 'hangye',
        },
        {
          title: '按份额',
          name: 'fene',
        },
        {
          title: '按地区',
          name: 'diqu',
        },
        {
          title: '按产品',
          name: 'chanpin',
        },
      ],
    }
  },
  methods: {
    toggleTab(val) {
      this.$toast(`您触发了${val.title}标签`);
    }
  }
};
```
</card>

<card>

### 左右结构
接受左侧和右侧有自定义内容填充。分段数量控制2 - 3。 `type`类型为`leftText`时，自定义内容居左，标签栏居右；`type`类型为`rightText`时，自定义内容居右，标签内容居左。当使用文本内容时，对于文明内容需要使用 `v-slot:text`插槽来进行内容填充，同时文本内容和标签内容需要同级

1. 内容居左，标签居右

`type`类型为`leftText`

```html
<hxm-tabs-segment type="leftText">
  <template v-slot:text>
    <div style="fontSize: 0.1em; color: red">BUTTON 左侧</div>
  </template>
  <template v-for="item in arr1">
    <hxm-tabs-segment-panel :key="item.name" :title="item.title" :name="item.name" :icon="item.icon"></hxm-tabs-segment-panel>
  </template>
</hxm-tabs-segment>
```
2. 内容居右，标签居左

```html
<hxm-tabs-segment @change="getSegment" type="rightText">
  <template v-slot:text>
    <div class="right-text" style="fontSize: 0.1em; color: green;width: 100%; height: 100%; text-align:center"></div>
  </template>
  <template v-for="item in arr2">
    <hxm-tabs-segment-panel :key="item.name" :title="item.title" :name="item.name"></hxm-tabs-segment-panel>
  </template>
</hxm-tabs-segment>
```
```javascript
export default {
  data() {
    return {
      arr1: [
        {
          title: '科创板沪深daddd',
          name: 'scince',
        },
        {
          title: '沪深板块',
          name: 'finance',
        },
      ],
      arr2: [
        {
          title: '控件组件',
          name: 'segment',
        },
        {
          title: '组件2',
          name: 'segment2',
        },
        {
          title: '分控组件Seg',
          name: 'segment3',
        },
      ],
    }
  }
}
```
</card>

## API

<card>

### TabsSegment

#### Props

| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---:|:---:|
| type | 类型， 可选值为`segment` `rightText` `rightText` | string | `segment` |
| v-model | 当前绑定的标签值 | `number`|`string` | `0` |

#### Events

| 事件名 | 说明 | 回调参数 |
|:---:|:---:|:---:|:---:|
| click | 点击对应标签触发的事件 | { title: string, name: string|number, icon: object } |
| change | 切换标签发生改变时触发的事件 | { title: string, name: string|number, icon: object } |
| transitionEnd(`v1.9.2`) | 执行完动画触发的事件 | - |


</card>

<card>

### TabsSegmentPanel

#### Props

| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---:|:---:|
| title | 标签显示的名称 | string | - |
| name | 标签名称，作为标签匹配的标识符 | string|number | 标签索引值 |
| icon | 标签显示的图标(包括图标名称，大小，颜色{name, size, color, darkThemeColor}) | object | - |
| forceRender | 是否重新渲染内容面板 | boolean | false |
| swiper | 是否滑动展示，需配合`forceRender`，当`forceRender`为fasle时 | boolean | false |

</card>

<demo />