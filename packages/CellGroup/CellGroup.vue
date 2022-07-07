<template>
  <div class="hxm-cell-group hxmui-fontsize-adapter">
    <!-- 标题 -->
    <div :class="getBemClasses('title')" v-if="showGroupTitle">
      <div :class="getBemClasses('title-text')">
        <slot name="title"></slot>
      </div>
    </div>

    <!-- 主体内容 -->
    <slot></slot>

    <!-- 描述 -->
    <div :class="getBemClasses('desc')" v-if="showGroupDesc">
      <div :class="getBemClasses('desc-text')">
        <slot name="desc"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi';
import { createNamespace } from '../utils/create/index';

const [bem] = createNamespace('cell-group');

export default defineComponent({
  name: 'hxmCellGroup',
  setup(props, { slots }) {
    const showGroupTitle = () => slots.title;

    const showGroupDesc = () => slots.desc;

    const getBemClasses = (params: any) => bem(params);

    return {
      showGroupTitle,
      showGroupDesc,
      getBemClasses,
    };
  },
});
</script>
