<template>
  <div class="hxm-clamp" ref="rootRef" :style="rootStyle">
    <span ref="contentRef"
        class="hxm-clamp-content"
        :class="contentClass">
      <!-- before scopedSlots -->
      <slot name="before"
        :toggle="toggle"
        :expand="expand"
        :collapse="collapse"
        :clamped="isClamped"
        :expanded="localExpanded">
      </slot>

      <!-- text -->
      <span ref="textRef">
        {{ realText }}
      </span>

      <!-- after scopedSlots -->
      <slot name="after"
        :toggle="toggle"
        :expand="expand"
        :collapse="collapse"
        :clamped="isClamped"
        :expanded="localExpanded">
      </slot>
    </span>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, onMounted, onUpdated, ref, watch, nextTick,
} from 'vue-demi';

export default defineComponent({
  name: 'hxmClamp',
  props: {
    maxLines: Number,
    maxHeight: [String, Number],
    ellipsis: {
      type: String,
      default: '...',
    },
    expanded: Boolean,
    contentClass: String,
  },

  setup(props, { slots, emit }) {
    function getText(slotsDefault: any[]) {
      // Look for the first non-empty text node
      const [content] = slotsDefault.filter((node) => !node.tag && !node.isComment);
      return content ? content.text : '';
    }

    const contentRef = ref<HTMLElement>();
    const textRef = ref<HTMLElement>();
    const rootRef = ref<HTMLElement>();
    const offset = ref(0);
    const text = ref('');
    const localExpanded = ref<boolean>(!!props.expanded);

    // computed
    const clampedText = computed(() => (text.value.slice(0, offset.value) || '').trim() + props.ellipsis);

    const isClamped = computed(() => {
      if (!text.value) {
        return false;
      }
      return offset.value !== text.value.length;
    });

    const realText = computed(() => (isClamped.value ? clampedText.value : text.value));

    const realMaxHeight = computed(() => {
      if (localExpanded.value || !props.maxHeight) {
        return null;
      }
      const { maxHeight } = props;
      return typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;
    });

    const rootStyle = computed(() => ({
      maxHeight: realMaxHeight.value,
      height: realMaxHeight.value,
      overflow: 'hidden',
    }));

    function getLines() {
      // getClientRects: https://juejin.cn/post/6959116302816378893
      return Object.keys(
        Array.prototype.slice.call(contentRef.value?.getClientRects()).reduce(
          (prev, { top, bottom }) => {
            const key = `${top}/${bottom}`;
            if (!prev[key]) {
              prev[key] = true;
            }
            return prev;
          },
          {},
        ),
      ).length;
    }

    // 向DOM中填入文本内容
    function applyChange() {
      if (textRef.value) {
        textRef.value.textContent = realText.value;
      }
    }

    function isOverflow() {
      if (!props.maxLines && !props.maxHeight) {
        return false;
      }

      if (props.maxLines) {
        if (getLines() > props.maxLines) {
          return true;
        }
      }

      if (props.maxHeight) {
        const scrollHeight = rootRef.value?.scrollHeight || 0;
        const offsetHeight = rootRef.value?.offsetHeight || 0;
        if (scrollHeight > offsetHeight) {
          return true;
        }
      }

      return false;
    }

    function clampAt(offsetVal: number) {
      offset.value = offsetVal;
      applyChange();
    }

    function moveEdge(edge: number) {
      clampAt(offset.value + edge);
    }

    function fill() {
      while (
        (!isOverflow() || getLines() < 2)
        && offset.value < text.value.length
      ) {
        moveEdge(1);
      }
    }

    function clamp() {
      while (isOverflow() && getLines() > 1 && offset.value > 0) {
        moveEdge(-1);
      }
    }

    function stepToFit() {
      fill();
      clamp();
    }

    // 二分查找
    function search(...range: any) {
      const [from = 0, to = offset.value] = range;
      if (to - from <= 3) {
        // 微调
        stepToFit();
        return;
      }
      const target = Math.floor((to + from) / 2);
      clampAt(target);
      if (isOverflow()) {
        search(from, target);
      } else {
        search(target, to);
      }
    }

    function update() {
      if (!localExpanded.value) {
        applyChange();

        // isOverflow中获取scrollHeight和offsetHeight需要等DOM渲染完，因此用nextTick包裹一下
        nextTick(() => {
          if (isOverflow() || isClamped.value) {
            search();
          }
        });
      }
    }

    function expand() {
      localExpanded.value = true;
    }

    function collapse() {
      localExpanded.value = false;
    }

    function toggle() {
      localExpanded.value = !localExpanded.value;
      emit('toggle', localExpanded.value);
    }

    function init() {
      const slotsDefault = slots.default ? slots.default() : [];
      if (!slotsDefault) {
        return;
      }
      // init text value
      text.value = getText(slotsDefault);
      offset.value = text.value.length;

      update();
    }

    watch(localExpanded, (val) => {
      if (val) {
        clampAt(text.value.length);
      } else {
        update();
      }
    });

    watch([
      () => props.maxLines,
      () => props.maxHeight,
      () => props.ellipsis,
    ], () => {
      update();
    });

    watch(isClamped, () => {
      update();
    });

    watch(text, () => {
      init();
    });

    onMounted(() => {
      init();
    });

    onUpdated(() => {
      const slotsDefault = slots.default ? slots.default() : [];
      if (!slotsDefault) {
        return;
      }
      text.value = getText(slotsDefault);
      applyChange();
    });

    return {
      rootStyle,
      rootRef,
      contentRef,
      textRef,
      realText,
      expand,
      collapse,
      toggle,
      isClamped,
      localExpanded,
    };
  },
});
</script>
