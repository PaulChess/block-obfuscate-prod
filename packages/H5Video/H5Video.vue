<template>
  <div class="hxm-video-container" :style="videoConStyle">
    <div
      v-if="videoConfig.videoType === 'live' && !showVideoPlayer"
      @click="changeSlideStatus"
      class="hxm-video-slide-slot">
      <slot name="video-slide"></slot>
    </div>
    <div v-show="showVideoPlayer" class="hxm-video-player-container">
      <video
        ref="videoPlayer"
        class="video-js vjs-big-play-centered"
        x5-video-player-type="h5"
        x5-video-player-fullscreen
        x5-video-orientation="landscape|portrait"
        webkit-playsinline="true"
        playsinline="true"
        :style="videoStyle"></video>
      <div v-if="showVideoTitle && videoConfig.title !== ''" class="hxm-video-title">
        <div class="hxm-video-title-desc">{{ videoConfig.title }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import SetFontSize from '../mixins/SetFontSize';
import zhCNConfig from './zh-CN';

let videojs: any;

//播放器的配置字段
interface VideoConfig {
  offline?: boolean,
  title?: string,
  videoType?: string,
  autoplay?: boolean | string,
  controls?: boolean,
  height?: number,
  loop?: boolean,
  muted?: boolean,
  poster?: string,
  preload?: string,
  src?: string,
  width?: number,
  aspectRatio?: string,
  autoSetup?: boolean,
  breakpoints?: object,
  fluid?: boolean,
  inactivityTimeout?: number,
  language?: string,
  liveui?: boolean,
  nativeControlsForTouch?: boolean,
  notSupportedMessage?: string,
  fullscreen?: object,
  playbackRates?: any[],
  plugins?: any,
  responsive?: boolean,
  sources?: any[],
  techOrder: any[],
  suppressNotSupportedError?: boolean,
  techCanOverridePoster?: boolean,
  userActions?: object,
  nativeAudioTracks?: boolean,
  nativeTextTracks?: boolean,
  nativeVideoTracks?: boolean,
  preloadTextTracks?: boolean,
  [propsName: string]: any,
}

//播放器默认配置
const defaultOptions: VideoConfig = {
  offline: false,
  title: '视频直播',
  videoType: 'live',
  autoplay: false,
  controls: true,
  loop: false,
  muted: false,
  poster: '',
  preload: 'auto',
  aspectRatio: '16:9',
  fluid: true,
  inactivityTimeout: 3000,
  language: 'zh-CN',
  liveui: false,
  nativeControlsForTouch: false,
  notSupportedMessage: '视频播放出错',
  fullscreen: {options: {navigationUI: 'show'} },
  playbackRates: [0.5, 1, 1.5, 2, 2.5, 3],
  sources: [],
  techOrder: ['html5', 'flvjs'],
  suppressNotSupportedError: true,
  preloadTextTracks: false,
  plugins: {}
};

interface ModelDialogConfig {
  content?: any,
  description?: string,
  fillAlways?: boolean,
  label?: string,
  pauseOnOpen?: boolean,
  temporary?: boolean,
  uncloseable?: boolean
}

@Component({
  name: 'H5Video',
  mixins: [SetFontSize],
})

export default class H5Video extends Vue {
  @Prop({
    default() {
      return defaultOptions
    }
  }) private options!: VideoConfig;

  //播放器的配置
  public videoConfig: VideoConfig = this.options;

  //播放器对象
  public player: any = null;

  //是否展示视频播放器
  public showVideoPlayer: boolean = true;

  //是否展示视频的标题
  public showVideoTitle: boolean = true;

  //图标是展开还是收起状态
  public slideStatus: string = 'up';

  //视频播放器外层容器样式
  get videoConStyle() {
    return {
      fontSize: this.fontSize + 'px'
    }
  }

  //视频组件的样式
  get videoStyle() {
    return {
      height: '100%',
      width: '100%'
    }
  }

  @Watch('options', { immediate: true, deep: true })
  getOptions(newObject: object) {
    this.videoConfig = Object.assign(this.videoConfig, defaultOptions, newObject);
    this.initVideoPlayer();
  }

  //切换展开还是收起状态
  public changeSlideStatus() {
    if(this.slideStatus === 'up') {
      this.showVideoPlayer = false;
      this.slideStatus = 'down';
    }
    else {
      this.showVideoPlayer = true;
      this.slideStatus = 'up';
    }
    //通知页面已经展开或者收起
    this.$nextTick(() => {
      this.boardcastPageSlide();
    });
  }

  //通知页面已经展开或者收起
  @Emit('on-video-slide')
  public boardcastPageSlide() {
    return this.slideStatus;
  }

  //视频组件初始化前先创建自定义组件
  public createCustomComponents() {
    this.createReflushButton();
    this.createSlideButton();
  }

  //在播放工具栏中创建刷新按钮
  public createReflushButton() {
    let self = this;
    let replayVideoPlugin = function() {
      let Button = videojs.getComponent("Button");
      let replayVideoBtn = (videojs as any).extend(Button, {
        constructor(this, player: any, options: any){
          Button.call(this, player, options);
        },
        //处理重新开始播放点击事件
        handleClick: function() {
          self.player.pause();
          self.player.currentTime(0);
          self.player.play();
        },
        //组件的class
        buildCSSClass: function () {
          return "vjs-control vjs-button hxm-video-replay";
        }
      });
      videojs.registerComponent('replayVideoBtn', replayVideoBtn);
    };
    videojs.registerPlugin('replayVideoPlugin', replayVideoPlugin);
  }

  //在播放工具栏中创建收起和展开按钮
  public createSlideButton() {
    let self = this;
    let slideVideoPlugin = function () {
      let Button = videojs.getComponent("Button");
      let slideVideoBtn = (videojs as any).extend(Button, {
        constructor(this, player: any, options: any) {
          Button.call(this, player, options);
        },
        //处理视频上拉收起和下拉展开的事件
        handleClick: function () {
          self.changeSlideStatus();
        },
        //组件的class
        buildCSSClass: function() {
          return "vjs-control vjs-button hxm-video-slide hxm-video-slideUp";
        }
      });
      videojs.registerComponent('slideVideoBtn', slideVideoBtn);
    };
    videojs.registerPlugin('slideVideoPlugin', slideVideoPlugin);
  }

  //初始化视频播放器
  public initVideoPlayer() {
    if(this.videoConfig.sources && this.videoConfig.sources.length > 0 && !this.player) {
      this.videoConfig.plugins = {
        replayVideoPlugin: {
          name: 'replayVideoPlugin'
        }
      };
      //如果当前类型是直播则添加上拉收起下拉展开的按钮
      if(this.videoConfig.videoType === 'live') {
        this.videoConfig.plugins.slideVideoPlugin = {
          name: 'slideVideoPlugin'
        }
      }
      //如果当前类型是录播则卸载上拉收起下拉展开的按钮
      else {
        (videojs as any).deregisterPlugin('slideVideoPlugin');
      }
      this.player = videojs(this.$refs.videoPlayer, this.videoConfig);
      //获取播放器高度
      this.getPlayerHeight();
      //判断视频是否下线
      this.isVideoOffline();
      //判断是否隐藏播放速率
      this.isShowVideoSpeed();
      //播放器的生命周期设置[前提条件视频未下线]
      !this.videoConfig.offline && this.playerSetup();
    }
  }

  //获取播放器的高度
  @Emit('on-video-height')
  public getPlayerHeight() {
    let dom = document.querySelector('.hxm-video-container') as HTMLElement;
    return dom.offsetHeight;
  }

  //判断视频是否下线
  public isVideoOffline() {
    if(this.videoConfig.offline) {
      this.removeVideoPoster();
      this.playOfflineModalDialog({
        description: '视频已下线',
        label: 'hxm-play-offline'
      });
    }
  }

  //判断是否隐藏播放速率
  public isShowVideoSpeed() {
    if(this.videoConfig.videoType === 'live') {
      let videoSpeedIcon = document.querySelector('.vjs-playback-rate ') as HTMLElement;
      (videoSpeedIcon !== null) && (videoSpeedIcon.style.cssText="display:none");
    }
  }

  //绑定播放器的生命周期设置
  public playerSetup() {
    let self = this;
    //播放器准备就绪
    this.player.ready(function(this: any) {
      self.listenerPlayEvent(this);
      self.listenerLoadStartEvent(this);
      self.listenerPlayingEvent(this);
      self.listenerPausedEvent(this);
      self.listenerAbortEvent(this);
      self.listenerErrorEvent(this);
      self.listenerEndedEvent(this);
      self.listenerFullscreenEvent(this);
    });
  }

  //监听开始加载事件
  public listenerLoadStartEvent(player: any) {
    let self = this;
    //早播放器的控制器中增加刷新视频的按钮
    player.on('loadstart', function () {
      self.addrReplayBtnToControlBar(player);
      self.videoConfig.videoType === 'live' && self.addSlideBtnToControlBar(player);
    });
  }

  //播放器工具栏中增加重播按钮
  public addrReplayBtnToControlBar(player: any) {
    let controlBarElement = (document.querySelector('.vjs-control-bar') as HTMLElement);
    //添加刷新视频的按钮
    let replayBtn = player.controlBar.addChild('replayVideoBtn', {});
    let replaceReplayDom = controlBarElement.childNodes[1];
    replayBtn.el().childNodes[1].classList.remove('vjs-control-text');
    player.controlBar.el().insertBefore(replayBtn.el(), replaceReplayDom);
  }

  //播放器工具栏中增加上拉收起下拉展开按钮
  public addSlideBtnToControlBar(player: any) {
    //添加上拉收起和下拉展开
    let controlBarElement = (document.querySelector('.vjs-control-bar') as HTMLElement);
    let controlBarChildLen = controlBarElement.childNodes.length;
    let slideBtn = player.controlBar.addChild('slideVideoBtn', {});
    let replaceSlideDom = (document.querySelector('.vjs-control-bar') as HTMLElement).childNodes[controlBarChildLen - 1];
    slideBtn.el().childNodes[1].classList.remove('vjs-control-text');
    player.controlBar.el().insertBefore(slideBtn.el(), replaceSlideDom);
  }

  @Emit('on-video-play')
  //发出播放的事件通知
  public boardcastVideoPlay() {}

  @Emit('on-video-pause')
  //发出播放的事件通知
  public boardcastVideoPause() {}

  @Emit('on-video-end')
  //发出播放的事件通知
  public boardcastVideoEnd() {}

  //监听播放事件
  public listenerPlayEvent(player: any) {
    let self = this;
    //点击播放
    player.on('play', function () {
      self.boardcastVideoPlay();
    });
  }

  //监听正在播放的事件
  public listenerPlayingEvent(player: any) {
    let self = this;
    //正在进行播放
    player.on('playing', function () {
      self.showVideoTitle = false;
    });
  }

  //监听播放暂停事件
  public listenerPausedEvent(player: any) {
    let self = this;
    //播放暂停
    player.on('pause', function () {
      self.boardcastVideoPause();
    });
  }

  //监听播放终止事件
  public listenerAbortEvent(player: any) {
    let self = this;
    //播放终止
    player.on('abort', function () {
      //关闭默认的播放异常提示
      self.player.errorDisplay.close();
      //检查网络状态
      self.checkNetworkState();
    });
  }

  //监听播放结束事件
  public listenerEndedEvent(player: any) {
    let self = this;
    //播放结束
    player.on('ended', function () {
      self.videoConfig.videoType === 'record' && player.currentTime(0);
      self.boardcastVideoEnd();
    });
  }

  //监听全屏播放的事件
  public listenerFullscreenEvent(player: any) {
    player.on('fullscreenchange', function () {
      let isFullscreen = player.isFullscreen();
      let slideUpIcon = document.querySelector('.hxm-video-slideUp') as HTMLElement;
      if(slideUpIcon !== null) {
        //如果是全屏需要隐藏展开收起按钮
        if(isFullscreen) {
          slideUpIcon.style.cssText="display:none";
        }
        //如果非全屏需要显示展开收起按钮
        else {
          slideUpIcon.style.cssText="";
        }
      }
    });
  }

  //监听播放错误事件
  public listenerErrorEvent(player: any) {
    let self = this;
    //播放出错
    player.on('error', function () {
      //移除视频播放封面
      self.removeVideoPoster();
      //关闭默认的播放异常提示
      self.player.errorDisplay.close();
      //检查网络状态
      self.checkNetworkState();
    });
  }

  //检查网络状态
  public checkNetworkState() {
    let networkState = this.player.networkState();
    //视频未初始化/视频已经选取但是未启用网络
    if(networkState === 0 || networkState === 1) {
      //创建网络异常的模态框
      this.playErrorModalDialog({
        description: '视频加载失败，请检查网络',
        label: 'hxm-play-error'
      });
    }
    //未找到视频资源
    else if(networkState === 3) {
      //创建播放异常的模态框
      this.playErrorModalDialog({
        description: '视频播放异常，请重试',
        label: 'hxm-play-error'
      });
    }
  }

  //移除视频播放的封面
  public removeVideoPoster() {
    let posterDom = document.querySelector('.vjs-poster') as HTMLElement;
    if(posterDom === null) {
      throw ReferenceError('找不到视频封面元素class="vjs-poster"');
    }
    else {
      posterDom.style.cssText = '';
    }
  }

  //动态创建视频下线的模态框
  public playOfflineModalDialog(modalConfig: ModelDialogConfig) {
    let defaultConfig: ModelDialogConfig = {
      content: '',
      description: '',
      fillAlways: true,
      label: '',
      pauseOnOpen: true,
      temporary: false,
      uncloseable: true
    };
    let options: ModelDialogConfig = Object.assign(defaultConfig, modalConfig);
    let ModalDialog = (videojs as any).getComponent('ModalDialog');
    let modalDialog = new ModalDialog(this.player, options);
    this.player.createModal(modalDialog.el());
  }

  //动态创建弹窗组件
  public playErrorModalDialog(modalConfig: ModelDialogConfig) {
    let defaultConfig: ModelDialogConfig = {
      content: '',
      description: '',
      fillAlways: true,
      label: '',
      pauseOnOpen: true,
      temporary: false,
      uncloseable: true
    };
    let options: ModelDialogConfig = Object.assign(defaultConfig, modalConfig);
    let ModalDialog = (videojs as any).getComponent('ModalDialog');
    let modalDialog = new ModalDialog(this.player, options);
    let replayBtn = document.createElement('div');
    replayBtn.setAttribute('class', 'hxm-replay-btn');
    replayBtn.innerHTML = '重新加载';
    modalDialog.fillWith(replayBtn);
    let modal = this.player.createModal(modalDialog.el());
    //监听重新加载的事件
    this.bindReplayEvent(replayBtn, modal);
    //监听模态框的关闭事件
    this.bindPlayErrorModal(modal);
  }

  public bindReplayEvent(replayBtn: HTMLElement, modal: any) {
    let self = this;
    replayBtn.addEventListener('click', function () {
      modal.close();
      self.player.play();
    });
  }

  //绑定播放异常的事件
  public bindPlayErrorModal(modal: any) {
    //模态框的点击事件
    modal.on('click', function () {

    });
    //模态框关闭事件
    modal.on('modalclose', function () {

    });
  }

  //手动开始播放
  public startVideoPlay() {
    this.player && this.player.play();
  }

  //手动暂停播放
  public stopVideoPlay() {
    this.player && this.player.pause();
  }

  //销毁视频播放器
  public destoryVideoPlayer() {
    this.player && this.player.dispose() && (this.player = null);
  }

  created() {
    if (this.$hxmConfig && this.$hxmConfig.videojs) {
      videojs = this.$hxmConfig.videojs;
      videojs.addLanguage('zh-CN', zhCNConfig);
      this.createCustomComponents();
    } else {
      throw '[hxmui] H5Video 需要引入第三方依赖 video.js';
      this.$destroy();
      return;
    }
  }

  mounted() {
    this.initVideoPlayer();
  }

  beforeDestroy() {
    this.destoryVideoPlayer();
  }
}
</script>
