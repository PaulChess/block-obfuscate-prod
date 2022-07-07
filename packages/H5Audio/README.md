# H5Audio H5音频

## 简介

<card>

### 介绍
用于h5页面的音频播放器

</card>

## 代码演示

<card>

### 基础用法

在组件中传入 `config` 设置视频的一些参数，参数见下表。`onAudioPlay` 用于触发音频开始播放的事件，`onAudioPause` 用于触发音频暂停播放的事件。`onAudioEnd` 用于触发音频结束播放的事件。

```html
<div class="audio-insert"></div>
<hxm-h5-audio
  :config="audioConfig"
  @on-audio-play="onAudioPlay"
  @on-audio-pause="onAudioPause"
  @on-audio-end="onAudioEnd">
</hxm-h5-audio>
```
```javascript
export default {
  data() {
    return {
      audioConfig: {
        audioTitle: '',
        audioUrl: '',
        replaceDom: '',
      },
    };
  },
  methods: {
    onAudioPlay() {
      this.$toast('play');
    },
    onAudioPause() {
      this.$toast('pause');
    },
    onAudioEnd() {
      this.$toast('end');
    },
  },
  created() {
    setTimeout(() => {
      this.audioConfig.audioTitle = '对话时博时基金基金经理尹浩对话时博时基金基金经理尹浩';
      this.audioConfig.audioUrl = 'https://videopull.10jqka.com.cn:8188/snsaudio/fang_1582872327472_tc_1582872348077.mp3';
      this.audioConfig.replaceDom = 'audio-insert';
    }, 100);
  },
};
```
</card>

## API

<card>

### Props

| 参数 | 说明 | 类型 | 默认值 |
|:---:|:---:|:---:|:---:|
| config | 音频参数 | _object_ | - |

</card>

<card>

### Events

| 事件名 | 说明 | 回调参数 |
|:---:|:---:|:---:|
| onAudioPlay | 音频开始播放 | - |
| onAudioPause | 音频暂停播放 | - |
| onAudioEnd | 音频结束播放 | - |

</card>

<card>

### Config参数

| 参数 | 说明 | 类型 | 默认值 |
|:---:|:---:|:---:|:---:|
| audioTitle | 音频标题 | _string_ | - |
| audioUrl | 音频地址 | _string_ | - |
| replaceDom | 想要替换的元素的class名称 | _string_ | - |

</card>

注:
replaceDom详解: 如果不传replaceDom或者replaceDom为空则音频组件按dom结构顺序渲染,如果replaceDom="aaa",那么将替换class="aaa"这个元素为音频组件,也就是动态替换元素位置的效果

<demo/>