# H5Video H5视频

## 简介

<card>

### 介绍
用于h5页面的视频播放器

</card>

## 引入方式

<card>

组件依赖 video.js 需在注册组件时将依赖传入cdn地址

```javascript
// 组件的css样式
<link rel="stylesheet" href="//s.thsi.cn/cb?sns/lib/front/thsc-theme/ths-theme.min.css;;sns/js/mobile/components/hxmui/0.3.7/style/H5Video.css">
// 组件的js
<script type="text/javascript" src="//s.thsi.cn/cb?sns/lib/front/thsc-theme/ths-theme.min.js;;sns/js/mobile/components/;video/video_v7.7.6.min.js;hxmui/0.3.7/index.js"></script>
// flv的js
<script type="text/javascript" src="//s.thsi.cn/cb?sns/js/mobile/components/video/flv.min.js"></script>
// 基于videojs的flv
<script type="text/javascript" src="//s.thsi.cn/cb?sns/js/mobile/components/video/videojs-flvjs.min.js"></script>
```

```js
// 引入 npm 或 cdn
import videojs from 'videojs';

Vue.use(hxmui, {
  componentsConfig: {
    H5Video: {
      videojs: videojs,
    },
  },
})
```

```js
import { H5Video } from 'thsc-hxmui'
import videojs from 'videojs'

Vue.use(H5Video, {
  videojs: videojs,
})
```

</card>

## 代码演示

<card>

### 基础用法

在组件中传入 `options` 设置视频的一些参数，参数见下表。`onVideoPlay` 用于触发视频开始播放的事件，`onVideoPause` 用于触发视频暂停播放的事件。`onVideoEnd` 用于触发视频结束播放的事件。`onVideoHeight` 用于触发视频高度发生变化的事件。

```html
<hxm-h5-video
  ref="hxmH5Video"
  :options="options"
  @on-video-play="onVideoPlay"
  @on-video-pause="onVideoPause"
  @on-video-end="onVideoEnd"
  @on-video-height="setVideoHeight">
</hxm-h5-video>

<p class="info">videoHeight: {{videoHeight}}px</p>
```
```javascript
export default {
  data() {
    return {
      videoHeight: '',
      options: {
        offline: false,
        title: '',
        videoType: '',
        poster: '',
        sources: [],
        videoSrc: 'https://videopull.10jqka.com.cn:8188/defaultvhost/db1_1591927161648_tc_1591927323653.mp4?bitrate=83584&bitrate_after=30535',
      },
    };
  },
  methods: {
    onVideoPlay() {
      this.$toast('play');
    },
    onVideoPause() {
      this.$toast('pause');
    },
    onVideoEnd() {
      this.$toast('end');
    },
    // 返回播放器的高度为px
    setVideoHeight(height) {
      this.videoHeight = height;
    },
  },
  created() {
    setTimeout(() => {
      this.options = {
        title: '科技创新引领5G',
        videoType: 'live',
        poster: 'http://u.thsi.cn/avatar/default/12_108_108.png',
        sources: [{
          src: this.videoSrc,
          type: 'video/mp4',
        }],
      };
    }, 100);
  },
}
```
</card>

## API

<card>

### Props

| 参数 | 说明 | 类型 | 默认值 |
|:---:|:---:|:---:|:---:|
| options | 视频参数 | _object_ | - |

</card>

<card>

### Events

| 事件名 | 说明 | 回调参数 |
|:---:|:---:|:---:|
| onVideoPlay | 视频开始播放 | - |
| onVideoPause | 视频暂停播放 | - |
| onVideoEnd | 视频结束播放 | - |
| onVideoHeight | 视频高度发生变化 | `height视频高度` |

</card>

<card>

### Options参数

| 参数 | 说明 | 类型 | 默认值 |
|:---|:---|:---:|:---:|
| offline | 是否上下线 | _boolean_ | `false` |
| title | 视频直播的标题 | _string_ | `视频直播` |
| videoType | 视频类型,可选值为`live`(直播)和`record`(录播) | _string_ | `live` |
| autoplay | 是否允许自动播放 | _boolean_ | `false` |
| controls | 确定播放器是否具有用户可以与之交互的控件 | _boolean_ | `true` |
| loop | 是否允许自动播放 | _boolean_ | `false` |
| muted | 是否静音 | _boolean_ | `false` |
| poster | 视频封面 | __boolean__ | `true` |
| preload | 预加载，可选值为`auto`(立即开始加载视频(如果浏览器支持的话)),`metadata`(仅加载视频的元数据),`none`(不要预加载任何数据) | _string_ | `auto` |
| aspectRatio | 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。该值应代表一个比率-两个数字之间用冒号分隔（例如"16:9"或"4:3"）| _string_ | `16:9` |
| fluid |  Video.js播放器将具有可变大小 | _boolean_ | `true` |
| inactivityTimeout | 播放器控制条自动消失的空闲时间间隔(单位为ms) | _number_ | `3000` |
| liveui | 如果没有此选项，进度条将被隐藏 | _boolean_ | `false` |
| playbackRates | 播放视频的速率例如[0.5, 1, 1.5, 2] | _array_ | `[0.5, 1, 1.5, 2, 2.5, 3]` |
| sources | 播放器的播放地址和类型 例如 [{ src: '//path/to/video.mp4',type: 'video/mp4'}, {src: '//path/to/video.webm',type: 'video/webm' }] | _array_ | `[]` |
| suppressNotSupportedError | 如果设置为true，则不会立即触发不兼容的源错误，而是在第一次用户交互时发生。 | _boolean_ | `true` |
| techOrder | - | _array_ | `['html5', 'flash']` |
| preloadTextTracks | 不加载弹幕 | boolean |  `false` |

</card>

<demo/>