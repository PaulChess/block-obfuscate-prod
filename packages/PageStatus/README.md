# PageStatus 页面状态

## 简介

<card>

### 介绍
页面状态用于展示加载中或者加载失败的场景，减少用户等待焦虑及提供失败重试机制。

</card>

## 代码演示

<card>

### 全局加载

组件提供的所有方法都挂载在 `$pageStatus` 对象上。通过调用 `this.$pageStatus.loading()` 展示全局加载。
当异步方法(比如接口请求)调用完成后，调用 `this.$pageStatus.close()` 关闭加载页面。

::: tip Tips
从 `1.8.1` 版本以后，loading的默认展示效果为品牌Logo加载，  
如果想用回之前的 `spinner` 加载，需要在loading方法的参数中额外传   
`{ type: 'spinner' }` 对象
:::

```javascript
<hxm-cell
  title="全局加载（默认品牌动画）"
  isLink
  @click="handleLoading">
</hxm-cell>

methods: {
  handleLoading() {
    this.$pageStatus.loading();
    setTimeout(() => {
      this.$pageStatus.close();
    }, 3000);
  },
},
```
```javascript
<hxm-cell
  title="全局加载（Spinner类型）"
  isLink
  @click="handleSpinnerLoading">
</hxm-cell>

methods: {
  handleSpinnerLoading() {
    this.$pageStatus.loading({
      type: 'spinner',
    });
    setTimeout(() => {
      this.$pageStatus.close();
    }, 3000);
  },
}
```

</card>

<card>

### 加载失败

调用 `this.$pageStatus.fail()`，展示加载失败的页面。在 `fail` 方法中可以传入回调函数用于触发用户点击刷新后的重试或其他事件。

::: warning 注意
组件库 `1.8.7` 版本以后在调用 `fail` 方法的时候，需要传第二个参数 `error`, 建议将主程序写在 `try` 语法中，在 `catch` 中捕获错误调用 `fail` 方法。  
这样做是为了接入 `SkyWalking` 能统计到异常信息。  
如果未传该参数，组件内会给出一个warn提示。
:::

```javascript
<hxm-cell
  title="全局加载失败"
  isLink
  @click="handleFail">
</hxm-cell>

methods: {
  handleFail() {
    try {
      // 这里故意调用一个不存在的方法
      window._noneExitFunc();
    } catch (err) {
      this.$pageStatus.fail(() => {
        this.$toast('刷新成功');
        this.$pageStatus.close();
      }, err);
    }
  },
},
```
</card>

<card>

### 自定义失败提示

有时候我们想要自定义失败提示，可以调用 `this.$pageStatus.setFailTip()` 进行设置。  
该方法接收一个对象，在该对象中，`mainText` 为主提示，`subText` 为副提示，`btnText` 为按钮文案。此时再调用`this.$pageStatus.fail()` 方法即可看到自定义的失败提示。

```javascript
<hxm-cell
  title="自定义失败提示文案"
  isLink
  @click="handleFailTip">
</hxm-cell>

methods: {
  handleFailTip() {
    this.$pageStatus.setFailTip({
      mainText: '加载失败',
      subText: '请检查您的网络，重新刷新一下',
      btnText: '立即刷新',
    });

    this.$pageStatus.fail(() => {
      this.$toast('刷新成功');
      this.$pageStatus.close();
    });
  },
},
```
</card>

## API

<card>

### Props

| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---:|:---:|
| loading | 页面加载状态 | Function | - |
| close | 关闭页面状态 | Function | - |
| fail | 页面失败状态 | Function | - |
| setFailTip | 设置失败状态提示文案 | Function | - |
| zIndex | 页面状态层级 | number | `9999` |

</card>

<card>

### failTip Props

| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---:|:---:|
| mainText | 主提示 | string | `数据异常，请重试` |
| subText | 副提示 | string | - |
| btnText | 刷新按钮文案 | string | `刷新` |

</card>

<demo/>