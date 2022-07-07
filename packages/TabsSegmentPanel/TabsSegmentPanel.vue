<template>
  <div class="hxmui-fontsize-adapter hxmui-segment-panel">
    <div v-if="forceRender">
      <template>
        <div v-if="activateValue.value === segmentVal">
          <slot></slot>
        </div>
      </template>
    </div>
    <div v-else>
      <div v-show="activateValue.value === segmentVal">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent, ref, inject,
} from 'vue-demi';

const prop = {
  forceRender: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: '0',
  },
  swiper: {
    type: Boolean,
    default: false,
  },
};

export default defineComponent({
  name: 'hxmTabsSegmentPanel',
  props: prop,
  setup(props) {
    const activateValue = ref(inject('activateValue'));
    const segmentVal = ref(props.name);
    return {
      activateValue,
      segmentVal,
    };
  },
});
</script>
