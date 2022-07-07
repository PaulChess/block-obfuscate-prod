# SearchPage 搜索页面

```html
<template>
  <div class="form-search">
    <hxm-search-page
      v-model="searchPattern"
      :result="result"
      :is-pending="searchIsPending"
      :save-history-len="3"
      @input="handleIptChange"
    >
      <template v-slot:input>
        <hxm-search></hxm-search>
      </template>
      <template v-slot="{ item, idx }">
        <div class="stock-item flex ai-c jc-sb fs-28 pd-24">
          <span>{{idx}}</span>
          <span>{{item.name}}</span>
          <span>{{item.code}}</span>
        </div>
      </template>
      <template v-slot:history="{ item, idx }">
        <div class="stock-item flex ai-c jc-sb fs-28 pd-24">
          <span>历史记录：{{idx}}</span>
          <span>{{item.name}}</span>
          <span>{{item.code}}</span>
        </div>
      </template>
    </hxm-search-page>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

const mockStocks = {
  300033: {
    stocks: [{
      name: '同花顺',
      code: '300033',
      key: '300033',
    }, {
      name: '同花顺3',
      code: '300036',
      key: '300036',
    }],
  },
  300034: {
    stocks: [{
      name: '同花顺1',
      code: '300034',
      key: '300034',
    }, {
      name: '同花顺2',
      code: '300035',
      key: '300035',
    }],
  },
};

@Component({
  name: 'FormSearch',
})
export default class FormSearch extends Vue {
  searchPattern = '';

  searchIsPending = false;

  result: {
    [searchKey: string]: any[];
  } = {};

  async handleIptChange(val: string) {
    // 接口请求前后修改 searchIsPending 状态
    this.searchIsPending = true;
    const [key, stocks] = await this.getData(val);
    this.searchIsPending = false;
    // result 为用于渲染搜索结果的数据
    // 格式为键值对，其中 key 为当前搜索匹配字符，value 为数组类型搜索结果
    this.$set(this.result, key, stocks);
  }

  // 模拟接口请求
  getData(val: string): Promise<[string, any[]]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          val,
          mockStocks[val] ? mockStocks[val].stocks : [],
        ]);
      }, 500);
    });
  }
}
</script>
```

| Prop | 类型 | 描述 | 可选 |
|:---:|:---:|:---:|:---:|
| value(v-model) | `string | number` | 搜索框输入内容 | 否 |
| result | object | 搜索结果 | 否 |
| saveHistoryLen | number | 本地保存搜索历史记录条数 | 是，默认为 0 |
| isPending | boolean | 是否为接口请求中状态 | 是，默认为 false |
| emptyTip | string | 搜索数据为空时兜底提示文案 | 是，默认为 '找不到任何匹配的内容' |


| Event | 参数 | 描述 |
|:---:|:---:|:---:|
| input | string | 搜索输入框内容变动 |

<demo />