<template>
  <div
    v-show="isShow"
    class="hxm-page-status hxmui-fontsize-adapter"
    :style="{'z-index': zIndex}">
    <div v-show="isShow === 'loading'" :class="getBemClass('loading')">
      <div :class="getBemClass('logo-loading')" v-if="loadingType === 'logo'">
        <div class="logo"></div>
        <div class="light"></div>
      </div>
      <div :class="getBemClass('spinner-loading')" v-else>
        <div :class="getBemClass('loadingtext')">
          <hxm-loading size=".18em">正在加载....</hxm-loading>
        </div>
      </div>
    </div>

    <div v-show="isShow === 'fail'" :class="getBemClass('fail')">
      <div :class="getBemClass('error')"></div>
      <div :class="getBemClass('maintext')" v-if="failTip.mainText">
        <p v-html="failTip.mainText" ></p>
      </div>
      <div :class="getBemClass('subtext')" v-if="failTip.subText">
        <p v-html="failTip.subText"></p>
      </div>
      <hxm-button
        v-if="failTip.btnText"
        :customClass="getBemClass('btn')"
        type="plain"
        size="small"
        @click="refreshClick">
        {{failTip.btnText}}
      </hxm-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import hxmLoading from '../Loading';
import hxmButton from '../Button';
import { createNamespace } from '../utils/index';

const [bem] = createNamespace('page-status');

const BODY_LOCK_CLASS = 'hxm-overflow-hidden';

type LoadingType = 'logo' | 'spinner';

interface LoadingOptions {
  type: LoadingType;
}

@Component({
  name: 'PageStatus',
  components: {
    hxmLoading,
    hxmButton,
  },
})
export default class PageStatus extends Vue {
  private isShow: 'loading' | 'fail' | boolean = false;

  private loadingType = 'logo';

  private failBackgroundClickCallback: any = null;

  zIndex = 9999;

  failTip = {
    mainText: '数据异常，请重试',
    subText: '',
    btnText: '刷新',
  };

  @Watch('isShow')
  isShowVal(val: boolean | string) {
    val ? this.addBodyLock() : this.removeBodyLock();
  }

  addBodyLock() {
    document.body.classList.add(BODY_LOCK_CLASS);
  }

  removeBodyLock() {
    document.body.classList.remove(BODY_LOCK_CLASS);
  }

  reset() {
    document.body.classList.remove(BODY_LOCK_CLASS);
  }

  loading(opts: LoadingOptions) {
    this.isShow = 'loading';
    this.loadingType = opts?.type || 'logo';
    this.$on('hxm-route-update', this.close);
  }

  // v1.8.7 新增error参数，用于skywalking监控
  // v1.11.5 删除error参数及抛出异常的逻辑，由开发者主动上报
  fail(callback?: any) {
    if (callback && typeof callback === 'function') {
      this.failBackgroundClickCallback = callback;
    }
    this.isShow = 'fail';
    this.$on('hxm-route-update', this.close);
  }

  close() {
    this.failBackgroundClickCallback = null;
    this.isShow = false;
    this.$off('hxm-route-update');
  }

  setFailTip(option: any) {
    if (typeof option !== 'object') {
      throw new Error('pageStatus: failTip need an object');
    }
    this.failTip.mainText = option.mainText;
    this.failTip.subText = option.subText;
    this.failTip.btnText = option.btnText;
  }

  refreshClick() {
    if (this.failBackgroundClickCallback) {
      this.failBackgroundClickCallback();
    }
  }

  beforeDestroy() {
    this.reset();
  }

  getBemClass(options: any) {
    return bem(options);
  }
}
</script>
