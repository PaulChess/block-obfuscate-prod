<template>
  <div ref="root" :style="rootStyle">
    <div class="hxm-sticky"
      :class="getBemClasses({ fixed: state.fixed })"
      :style="stickyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ref,
  reactive,
  defineComponent,
  computed,
  watch,
} from 'vue-demi';
import { useEventListener } from './use/useEventListener';
import {
  unitToPx,
  getScrollTop,
  createNamespace,
} from '../utils/index';
import {
  useScrollParent,
  useRect,
  useVisibilityChange,
} from './use/index';

const [bem] = createNamespace('sticky');

export default defineComponent({
  name: 'hxmSticky',

  props: {
    zIndex: {
      type: [Number, String],
      default: 99,
    },
    container: {
      type: [Element, HTMLElement],
    },
    offsetTop: {
      type: [Number, String],
      default: 0,
    },
  },

  setup(props, { emit }) {
    const root = ref<HTMLElement>();
    const scrollParent = useScrollParent(root);
    const state = reactive({
      fixed: false,
      width: 0, // root width
      height: 0, // root width
      transform: 0,
    });

    // 对传过来的偏移量进行单位转化
    const offset = computed(() => unitToPx(props.offsetTop));

    const rootStyle = computed(() => {
      const { fixed, height, width } = state;
      return fixed ? {
        width: `${width}px`,
        height: `${height}px`,
      } : {};
    });

    const stickyStyle = computed(() => {
      if (!state.fixed) {
        return {};
      }
      const style = {
        width: `${state.width}px`,
        height: `${state.height}px`,
        top: `${offset.value}px`,
        zIndex: `${props.zIndex}`,
        transform: state.transform ? `translate3d(0, ${state.transform}px, 0)` : '',
      };
      return style;
    });

    // 提交滚动事件
    const emitScroll = (scrollTop: number) => {
      emit('scroll', scrollTop, state.fixed);
    };

    const onScroll = () => {
      const { container } = props;
      const rootRect = useRect(root);
      const scrollTop = getScrollTop(window);

      state.width = rootRect.width;
      state.height = rootRect.height;

      if (container) {
        const containerRect = useRect(container);
        const difference = containerRect.bottom - (offset.value + state.height);
        state.fixed = offset.value > rootRect.top && containerRect.bottom > 0;
        state.transform = difference < 0 ? difference : 0;
      } else {
        state.fixed = offset.value > rootRect.top;
      }

      emitScroll(scrollTop);
    };

    // 当fixed的状态发生变化的时候发出通知
    watch(() => state.fixed, (value) => emit('change', value));

    const getBemClasses = (params: any) => bem(params);

    useEventListener('scroll', onScroll, { target: scrollParent });
    useVisibilityChange(root, onScroll);

    return {
      root,
      state,
      rootStyle,
      stickyStyle,
      getBemClasses,
    };
  },
});
</script>
