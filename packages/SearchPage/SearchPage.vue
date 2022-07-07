<template>
  <div class="hxm-search-page hxmui-fontsize-adapter">
    <slot name="input"></slot>
    <div
      class="hxm-search-page__result"
      v-for="(item, idx) in activeResult"
      :key="item.key || idx"
      @click="setHistoryRec(item)"
    >
      <slot
        :item="item"
        :idx="idx"
      ></slot>
    </div>
    <div
      class="hxm-search-page__history"
      v-show="saveHistoryLen && (value == '')"
    >
      <slot
        name="history"
        v-for="(item, idx) in localHistory"
        :item="item"
        :idx="idx"
      ></slot>
    </div>
    <div v-show="isShowEmpty" class="hxm-search-page__empty hxmui-fontsize-adapter">
      <div class="hxm-search-page__icon--empty"></div>
      <div class="hxm-search-page__empty--tip sub-text-gray">{{ emptyTip }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
} from 'vue-property-decorator';
import { isArray } from '../utils/helper';

const LOCAL_HISTORY_DEFAULT_KEY = 'HXMUI_SEARCH_HISTORY_REC';
const CURRENT_PAGE_KEY = window.location.href.replace(/\W/g, '');

@Component({
  name: 'SearchPage',
})
export default class SearchPage extends Vue {
  @Prop({ default: '' }) value!: string | number;

  @Prop({ default: '找不到任何匹配的内容' }) emptyTip?: string;

  @Prop({ default: 0 }) saveHistoryLen?: number;

  @Prop({
    default() {
      return {};
    },
  }) result!: object;

  @Prop({ default: false }) isPending?: boolean;

  private historyRec?: any[];

  get localHistory(): any[] {
    if (!this.historyRec) {
      const parsedData = this.parseLocalHistoryData();
      let currentPageData: any[] = parsedData[CURRENT_PAGE_KEY];
      if (!currentPageData || !isArray(currentPageData)) {
        currentPageData = [];
      }
      this.historyRec = currentPageData.slice(0, this.saveHistoryLen);
    }
    return this.historyRec;
  }

  set localHistory(val) {
    const parsedData = this.parseLocalHistoryData();
    parsedData[CURRENT_PAGE_KEY] = val;
    localStorage.setItem(LOCAL_HISTORY_DEFAULT_KEY, JSON.stringify(parsedData));
    this.historyRec = val;
  }

  get activeResult() {
    if (!this.result || !this.value || !this.result[this.value]) {
      return [];
    }
    return this.result[this.value];
  }

  get isShowEmpty() {
    return !this.isPending && this.value !== '' && this.activeResult.length === 0;
  }

  parseLocalHistoryData() {
    const localData = window.localStorage.getItem(LOCAL_HISTORY_DEFAULT_KEY) || '{}';
    let parsedData = {};
    try {
      parsedData = JSON.parse(localData);
    } catch (error) {
      parsedData = {};
    }
    return parsedData;
  }

  setHistoryRec(item: any) {
    if (!this.saveHistoryLen || !item.key) {
      return;
    }
    const historyTemp = JSON.parse(JSON.stringify(this.localHistory));
    let idxInHistoryArr = -1;
    for (let i = 0; i < this.localHistory.length; i++) {
      const curItem = this.localHistory[i];
      if (curItem.key && (curItem.key === item.key)) {
        idxInHistoryArr = i;
        break;
      }
    }
    if (idxInHistoryArr === -1) {
      historyTemp.unshift(item);
    }
    this.localHistory = historyTemp.slice(0, this.saveHistoryLen);
  }

  created() {
    this.$on('value-change', (value: string) => {
      this.$emit('input', value);
    });
  }

  mounted() {
    window.scrollTo(0, 0);
  }
}
</script>
