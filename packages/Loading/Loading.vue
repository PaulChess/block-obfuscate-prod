<template>
  <div class="hxmui-loading hxmui-fontsize-adapter">
    <div :class="rootClass">
      <div :class="spinnerClass" :style="spinnerStyle">
        <svg
          v-if="!bloom"
          :class="loadingClass"
          viewBox="25 25 50 50">
          <circle cx="50" cy="50" r="20" fill="none"></circle>
        </svg>
        <div v-else
          :class="loadingClass">
          <i v-for="i in 12" :key="i"></i>
        </div>
      </div>
      <span :class="getBemClasses('text')">
        <span
          :class="getBemClasses('text--inner')"
          :style="loadingTextStyle">
          <slot></slot>
        </span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue-demi';
import { createNamespace } from '../utils/create/index';
import { getThemeMode } from '../utils';

const [bem] = createNamespace('loading');

export default defineComponent({
  name: 'hxmLoading',
  props: {
    bloom: {
      type: Boolean,
      default: false,
    },
    size: String,
    color: [Object, String],
    textSize: String,
    textColor: [Object, String],
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const loadingType = computed(() => (props.bloom ? 'bloom' : 'circle'));
    const rootClass = computed(() => bem({ vertical: props.vertical }));
    const spinnerClass = computed(() => bem('spinner', loadingType.value));
    const loadingClass = computed(() => bem(loadingType.value));

    const setColor = (color: any) => {
      let res = '';
      if (typeof color === 'string') res = color;
      if (typeof color === 'object') res = getThemeMode() === 'black' ? color.dark : color.light;
      return res;
    };
    const spinnerStyle = computed(() => {
      const styleObj = {
        width: props.size ? props.size : undefined,
        height: props.size ? props.size : undefined,
        color: setColor(props.color),
      };
      return styleObj;
    });
    const loadingTextStyle = computed(() => {
      const styleObj = {
        fontSize: props.textSize ? props.textSize : undefined,
        color: props.textColor ? setColor(props.textColor) : undefined,
      };
      return styleObj;
    });
    const getBemClasses = (params: any) => bem(params);

    return {
      rootClass,
      spinnerClass,
      loadingType,
      loadingClass,
      spinnerStyle,
      loadingTextStyle,
      getBemClasses,
    };
  },
});
</script>
