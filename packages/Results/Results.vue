<template>
  <div class="hxm-results hxmui-fontsize-adapter card-bg sub-text-gray" :class="`hxm-results__${type}`">
    <div class="hxm-results__icon"></div>
    <div class="hxm-results__title"><div class="hxm-results__title--txt">{{titleTxt}}</div></div>
    <div class="hxm-results__desc">{{desc}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

type ResultsType = 'success' | 'fail' | 'waiting';

enum resultsTitle {
  success = '成功',
  fail = '失败',
  waiting = '等待结果'
}

@Component({
  name: 'Results',
})
export default class Results extends Vue {
  @Prop({
    default: 'success',
  })
  type!: ResultsType;

  @Prop({
    default: '',
  })
  title?: string;

  @Prop({
    default: '',
  })
  desc?: string;

  get titleTxt() {
    return this.title || resultsTitle[this.type];
  }
}
</script>
