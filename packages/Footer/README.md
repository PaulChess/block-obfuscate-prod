# Footer 页脚

## 简介

<card>

### 介绍
页脚一般出现在页面底部，展示一些辅助信息

</card>

## 代码演示

<card>

### 基础用法

设置 `type` 属性为 `text`，并设置 `content` 页脚内容，即可正常展示页脚。

```javascript
<hxm-footer
  type="text"
  content="没有更多了">
</hxm-footer>
```
</card>

<card>

### 跳转链接

设置 `type` 属性为 `link`, 即可展示链接样式，设置 `link-url` 链接地址，点击可直接跳转。

```javascript
<hxm-footer
  type="link"
  content="文字链接"
  link-url="//testm.10jqka.com.cn/vaserviece/hxmui-doc/guide/">
</hxm-footer>
```
</card>

<card>

### 风险提示

风险提示是在活动页等类型页面底部常用的展示内容，设置 `type` 为 `paragraphs` 即可展示风险提示样式；`is-need-extend` 控制是否展示底部的logo和slogan，`bottom-safe-area` 可控制是否留出底部安全区域。

```javascript
<hxm-footer
  type="paragraphs"
  :content="getContent"
  :is-need-extend=true
  :bottom-safe-area=true>
</hxm-footer>

export default {
  computed: {
    getContent() {
      return `
        <div style="line-height:0.34rem;">
          <p>风险提示：</p>
          <p>数据基于历史，不代表未来趋势；每个指标都有局限性，适合不同情况下的市场；股票池基于模型与测试，需要投资者根据不同行情合理应用、控制风险。</p>
          <p>证券咨询服务提供：</p>
          <p>浙江同花顺云软件有限公司[编号:ZX0050]</p>
        </div>
      `;
    },
  },
};
```
</card>

<card>

### 自定义标语

风险提示底部的slogan内容默认为 `同花顺xx年专业品质，让投资变得更简单`，可以通过传入 `slogan` 属性自定义slogan内容。

```javascript
<hxm-footer
  type="paragraphs"
  :content="getContent"
  slogan="自定义slogan"
  :is-need-extend=true
  :bottom-safe-area=true>
</hxm-footer>

export default {
  computed: {
    getContent() {
      return `
        <div style="line-height:0.34rem;">
          <p>风险提示：</p>
          <p>数据基于历史，不代表未来趋势；每个指标都有局限性，适合不同情况下的市场；股票池基于模型与测试，需要投资者根据不同行情合理应用、控制风险。</p>
          <p>证券咨询服务提供：</p>
          <p>浙江同花顺云软件有限公司[编号:ZX0050]</p>
        </div>
      `;
    },
  },
};
```
</card>

## API

<card>

### Props

| 参数 | 说明 | 类型 | 默认值 |
|:---:|:---|:---:|:---:|
| type | 页脚类型，可选值为`text`、`link`、`paragraphs` | string | - |
| content | 页脚内容 | string | - |
| linkUrl | 跳转链接，type为 `link` 时生效 | string | - |
| bgColor | 自定义页脚背景色 | string | - |
| isNeedExtend | 是否需要底部的logo和slogan | boolean | `false` |
| bottomSafeArea | 是否需要底部安全区域 | boolean | `false` |
| slogan | 自定义底部slogan内容 | string | - |

</card>

<demo/>