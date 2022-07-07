<template>
  <div
    v-show="showAudio"
    class="hxm-audio line-base-bd card-bg hxmui-fontsize-adapter">
    <div class="hxm-audio-left">
      <div class="hxm-audio-left-operate">
        <!--开始播放状态-->
        <i
          v-show="playStatus === 'play'"
          class="hxm-audio-left-operate-icon play"
          @click="changePlayStatus"></i>
        <!--暂停播放状态-->
        <i
          v-show="playStatus === 'pause'"
          class="hxm-audio-left-operate-icon pause"
          @click="changePlayStatus"></i>
        <!--加载中的状态-->
        <i
          v-show="playStatus === 'loading'"
          class="hxm-audio-left-operate-icon loading"
          @click="changePlayStatus"></i>
        <!--播放出错的状态-->
        <i
          v-show="playStatus === 'error'"
          class="hxm-audio-left-operate-icon error"
          @click="changePlayStatus"></i>
      </div>
    </div>
    <div class="hxm-audio-right">
      <div class="hxm-audio-right-title lightTheme-txt-main">
        <div class="hxm-audio-right-title-txt mid-text-primary hxmui-ellipsis">{{ audioConfig.audioTitle }}</div>
      </div>
      <div class="hxm-audio-right-processbar line-base" :class="processClassName">
        <!--拖拽进度条-->
        <div class="hxm-audio-right-processbar-cover" :style="dragStyle">
          <!--拖拽的滑块-->
          <div class="hxm-audio-right-processbar-cover-drag primary-bg-red_after" :class="dragClassName"></div>
        </div>
        <!--缓冲进度条-->
        <div class="hxm-audio-right-processbar-loaded hxmui-background__gray4" :style="cacheStyle"></div>
      </div>
      <div class="hxm-audio-right-tools">
        <span class="hxm-audio-right-tools-curtime text-desc">{{ audioStartTime }}</span>
        <span class="hxm-audio-right-tools-totaltime text-desc">{{ audioEndTime }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { getApp, uuid } from '../utils/helper';
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';

interface AudioConfig {
  isWxJsReady: boolean,
  audioTitle: string,
  audioUrl: string,
  replaceDom?: string
}

@Component({
  name: 'H5Audio',
})

export default class H5Audio extends Vue {
  @Prop({
    default() {
      return {
        isWxJsReady: false,
        audioTitle: '',
        audioUrl: '',
        replaceDom: ''
      }
    }
  }) private config!: AudioConfig;

  public curApp: any = getApp();

  public audioConfig: AudioConfig = this.config;

  public showAudio: boolean = false;

  public audioLoaded: boolean = false;

  public isDragPercent: boolean = false;

  public playStatus: string = 'loading';

  public audio: any = null;

  public autoPlay: boolean = false;

  public cacheTimer: any = null;

  public dragTimer: any = null;

  public timeInterval: any = null;

  public audioDragPercent: number = 0;

  public audioCachePercent: number = 0;

  public audioStartTime: string = '00:00';

  public audioEndTime: string = '00:00';

  public processClassName: string = `process${uuid(8 ,16)}`;

  public dragClassName: string = `dragblock${uuid(8, 16)}`;

  get dragStyle() {
    return {
      width: `${this.audioDragPercent}%`
    }
  }

  get cacheStyle() {
    return {
      width: `${this.audioCachePercent}%`
    }
  }

  @Watch('config', { immediate: true, deep: true })
  getAudioConfig(newObject: object) {
    this.audioConfig = Object.assign(this.audioConfig, newObject);
  }

  @Emit('on-audio-play')
  private onAudioPlay() {}

  @Emit('on-audio-pause')
  private onAudioPause() {}

  @Emit('on-audio-end')
  private onAudioEnd() {}

  // 改变当前播放状态
  public changePlayStatus() {
    if(this.playStatus === 'play') {
      this.audio.play();
    }
    else if(this.playStatus === 'pause') {
      this.audio.pause();
    }
    else if(this.playStatus === 'loading') {
      // 点击如果处于加载中则开启自动播放
      this.autoPlay = true;
      this.$toast('音频加载中...');
    }
    else {
      this.$toast('音频播放出错...');
    }
  }

  // 增加微信js初始化监听函数
  public addWxJSBridgeReady() {
    let self = this;
    // 微信中音频的初始化必须在回调函数中执行
    if(this.curApp.appName === 'weixin') {
      document.addEventListener('WeixinJSBridgeReady', function () {
        self.config.isWxJsReady = true;
        // 此处开一个定时器为了保证微信js初始化完成后能够执行到该函数
        self.AudioInitInterval();
      }, false);
    }
    else {
      this.config.isWxJsReady = true;
      this.AudioInitInterval();
    }
  }

  // 音频初始化定时器
  public AudioInitInterval() {
    this.timeInterval = setInterval(() => {
      this.startInitAudio();
    }, 500);
  }

  // 停止初始化的定时器
  public stopInitInterval() {
    clearInterval(this.timeInterval);
    this.timeInterval = null;
  }

  // 开始初始化音频
  public startInitAudio() {
    // 有音频地址并且当前音频组件还未展示的时候再渲染音频组件
    this.$nextTick(() => {
      if(!this.showAudio && this.audioConfig.audioUrl !== '' && this.audioConfig.isWxJsReady) {
        this.stopInitInterval();
        this.showAudioWay()
      }
    });
  }

  // 展示音频的方式
  public showAudioWay() {
    // replaceDom为空时直接展示
    if(this.audioConfig.replaceDom === '' || !this.audioConfig.replaceDom) {
      this.showAudio = true;
    }
    // replaceDom不为空时动态解析替换
    else {
      let originDom: Element | null = document.querySelector(`.${this.audioConfig.replaceDom}`);
      if(originDom === null) {
        throw ReferenceError(`找不到需要替换的class=${this.audioConfig.replaceDom}的元素请检查`);
      }
      else {
        let dom: any = originDom;
        dom.parentNode.replaceChild(this.$el, originDom);
      }
      this.$nextTick(() => {
        this.showAudio = true;
      })
    }
    // 初始化音频组件
    this.initAudio();
  }

  // 初始化音频组件
  public initAudio() {
    this.audio = new Audio();
    this.audio.src = this.audioConfig.audioUrl;
    this.audio.load();
    this.addAudioEventListener();
  }

  // audio的监听事件
  public addAudioEventListener() {
    // 开始计算浏览器缓冲音频的进度
    this.computedVideoCache();
    // 当浏览器可在不因为缓冲而停顿的情况下进行播放时
    this.listenCanPlayThrough();
    // 监听音频播放事件
    this.listenAudioPlay();
    // 监听音频暂停事件
    this.listenAudioPause();
    // 监听音频播放结束
    this.listenAudioStop();
    // 监听音频播放出错
    this.listenAudioError();
    // 监听音频进度条的拖拽事件
    this.listenAduioDragTouchMove();
    // 监听音频进度条的拖拽结束事件
    this.listenAudioDragTouchEnd();
    // 监听音频进度条的点击事件
    this.listenAudioDragClick();
  }

  // 开始计算音频播放的进度同时计算当前的时间
  public computedVideoPercent() {
    this.dragTimer = setInterval(() => {
      if(!this.isDragPercent) {
        let percent: number = this.audio.currentTime / this.audio.duration;
        this.audioDragPercent = percent * 100;
        this.audioStartTime = this.formatAudioTime(percent);
        if(this.audioDragPercent === 100) {
          this.stopAudioDragPercent();
        }
      }
    }, 1000);
  }

  // 停止计算当前音频的播放进度
  public stopAudioDragPercent() {
    clearInterval(this.dragTimer);
    this.dragTimer = null;
  }

  // 开始计算浏览器缓冲音频的进度
  public computedVideoCache() {
    this.cacheTimer = setInterval(() => {
      let audioCacheStart: number = Number(this.audio.buffered.start(0));
      let audioCacheEnd: number = Number(this.audio.buffered.end(0));
      let audioDuration: number = Number(this.audio.duration);
      let audioCacheDiff: number = Number(audioCacheEnd - audioCacheStart);
      let percent: number = Number(audioCacheDiff / audioDuration);
      this.audioCachePercent = percent * 100;
      if(this.audioCachePercent === 100) {
        this.stopAudioCachePercent();
      }
    }, 1000);
  }

  // 停止计算当前音频的缓冲进度
  public stopAudioCachePercent() {
    clearInterval(this.cacheTimer);
    this.cacheTimer = null;
  }

  // 当浏览器可在不因为缓冲而停顿的情况下进行播放时
  public listenCanPlayThrough() {
    let self = this;
    this.audio.addEventListener('canplaythrough', function() {
      self.audioLoaded = true;
      if(self.playStatus === 'loading' || self.playStatus === 'error') {
        self.playStatus = 'play';
      }
      // 音频缓冲部分后就可计算播放总共需要的时间
      self.audioEndTime = self.formatAudioTime(1);
      // 如果是自动播放并且已经处于准备播放的状态，则开始自动播放[在手炒中不支持自动播放给出了toast提示]
      self.curApp === 'ths' && self.autoPlay && self.playStatus === 'play' && self.$toast('音频加载完成');
      self.autoPlay && self.playStatus === 'play' && self.audio.play();
    });
  }

  // 监听音频播放事件
  public listenAudioPlay() {
    let self = this;
    this.audio.addEventListener('play', function() {
      // 发送播放音频的通知事件
      self.onAudioPlay();
      self.playStatus = 'pause';
      // 开始计算音频播放进度
      self.computedVideoPercent();
    })
  }

  // 监听音频暂停事件
  public listenAudioPause() {
    let self = this;
    this.audio.addEventListener('pause', function () {
      self.onAudioPause();
      self.stopAudioDragPercent();
      self.playStatus = 'play';
    });
  }

  // 监听音频播放结束
  public listenAudioStop() {
    let self = this;
    this.audio.addEventListener('ended', function() {
      self.onAudioEnd();
      // 如果音频播放结束但是还在拖动进度条，那么不允许改变当前设置的变量
      if(!self.isDragPercent) {
        self.audioStartTime = self.formatAudioTime(1);
        setTimeout(() => {
          self.audio.currentTime = 0;
          self.audioDragPercent = 0;
          self.audioStartTime = self.formatAudioTime(0);
        }, 2000);
      }
    })
  }

  // 监听音频播放出错
  public listenAudioError() {
    let self = this;
    this.audio.addEventListener('error', function() {
      // 音频加载出错时停止计算当前音频缓存进度
      self.stopAudioCachePercent();
      self.playStatus = 'error';
      self.audioLoaded = false;
    })
  }

  // 监听音频进度条的拖拽事件
  public listenAduioDragTouchMove() {
    let self = this;
    let dragDom: any = document.querySelector(`.${this.dragClassName}`);
    dragDom.addEventListener('touchmove', function(e: any) {
      if(!self.audioLoaded) {
        self.$muiToast('音频加载中...');
        return;
      }
      e.preventDefault();
      self.isDragPercent = true;
      // 修改进度条工具栏中的百分比和时间
      let percent = self.getDragPercent(e.changedTouches[0].clientX);
      self.audioDragPercent = percent * 100;
      self.audioStartTime = self.formatAudioTime(percent);
    });
  }

  // 监听音频进度条的拖拽结束事件
  public listenAudioDragTouchEnd() {
    let self = this;
    let dragDom: any = document.querySelector(`.${this.dragClassName}`);
    dragDom.addEventListener('touchend', function (e: any) {
      if(!self.audioLoaded) {
        return;
      }
      e.preventDefault();
      // 修改真正的音频当前时间
      let percent = self.getDragPercent(e.changedTouches[0].clientX);
      self.audio.currentTime = percent * self.audio.duration;
      self.isDragPercent = false;
    });
  }

  // 监听音频进度条的点击事件
  public listenAudioDragClick() {
    let self = this;
    let processDom: any = document.querySelector(`.${this.processClassName}`);
    processDom.addEventListener('click', function(e: any) {
      if(!self.audioLoaded) {
        self.$muiToast('音频加载中...');
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      self.isDragPercent = false;
      let percent = self.getDragPercent(e.clientX);
      self.audioDragPercent = percent * 100;
      self.audioStartTime = self.formatAudioTime(percent);
      self.audio.currentTime = percent * self.audio.duration;
    });
  }

  // 获取进度条拖拽的百分比
  public getDragPercent(clickX: number) {
    let audioDragDom: any = document.querySelector(`.${this.processClassName}`);
    let dragWidth: number = clickX - audioDragDom.offsetLeft;
    let totalWidth: number = audioDragDom.offsetWidth;
    let percent: number = dragWidth / totalWidth;
    if(percent <= 0) {
      percent = 0;
    }
    if(percent >= 1) {
      percent = 1;
    }
    return percent;
  }

  // 将当前进度百分比转换为时间mm:ss
  public formatAudioTime(percent: number) {
    let totalSeconds = this.audio.duration * percent;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    return (minutes < 10 ? `0${minutes}` : minutes) + ":" + (seconds < 10 ? `0${seconds}` : seconds);
  }

  created() {
    // 增加微信中的js初始化监听函数
    this.addWxJSBridgeReady();
  }
}
</script>
