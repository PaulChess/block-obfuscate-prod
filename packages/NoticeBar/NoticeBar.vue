<template>
  <div class="hxmui-fontsize-adapter" :class="rootClasses" v-if="showNoticeBar">
    <div :class="getBemClasses('left-block')">
      <!-- scope: left-block -->
      <slot name="left-block">
        <hxm-icon name="notice"
          size="0.22em"
          :color="lightIconColors"
          :darkThemeColor="darkIconColors"
          v-if="showNoticeIcon">
        </hxm-icon>
        <div :class="getBemClasses('left-block-close')" v-if="showActionBtn && mode === 'close'">
          <hxm-icon name="close"
            size="0.12em"
            :color="lightIconColors"
            :darkThemeColor="darkIconColors"
            @click="close">
          </hxm-icon>
        </div>
      </slot>
    </div>
    <div ref="wrapRef" :class="getBemClasses('wrapper')" @click="jumpLink">
      <div ref="contentRef" :class="getBemClasses('content')" :style="marqueenStyles" @transitionend="onTransitionEnd">
        <!-- scope: default -->
        <slot>
          <div :class="getBemClasses('content-text')">
            {{ text }}
          </div>
        </slot>
      </div>
    </div>
    <div :class="getBemClasses('right-block')">
      <!-- scope: right-block -->
      <slot name="right-block">
        <!-- when use actionBtn -->
        <div :class="getBemClasses('action-btn')" v-if="showActionBtn" @click="clickBtn">
          <div :class="getBemClasses('action-btn-text')">
            {{ actionBtnText }}
          </div>
        </div>
        <!-- right-icon -->
        <div :class="getBemClasses('right-icon')" v-if="mode && !showLinearBlock">
          <hxm-icon name="forwardNew"
            size="0.12em"
            :color="lightIconColors"
            :darkThemeColor="darkIconColors"
            v-show="mode === 'link'"
            @click="jumpLink">
          </hxm-icon>
          <hxm-icon name="close"
            size="0.12em"
            :color="lightIconColors"
            :darkThemeColor="darkIconColors"
            v-show="mode === 'close' && !showActionBtn"
            @click="close">
          </hxm-icon>
        </div>
      </slot>

      <!-- gradient linear block -->
      <div :class="getBemClasses('linear-block')" v-if="showLinearBlock">
        <div :class="getBemClasses('linear-block-icon')" v-if="mode">
          <hxm-icon name="forwardNew"
            size="0.12em"
            :color="lightIconColors"
            :darkThemeColor="darkIconColors"
            v-show="mode === 'link'"
            @click="jumpLink">
          </hxm-icon>
          <hxm-icon name="close"
            class="linear-block-close"
            size="0.12em"
            :color="lightIconColors"
            :darkThemeColor="darkIconColors"
            v-show="mode === 'close'"
            @click="close">
          </hxm-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onActivated,
  onMounted,
  PropType,
  reactive,
  ref,
} from 'vue-demi';
import { createNamespace, doubleRaf, raf } from '../utils/index';
import { useRect } from '../Sticky/use/useRect';
import hxmIcon from '../Icon/index';

const [bem] = createNamespace('notice-bar');

type ModeType = 'close' | 'link' | '';

type ThemeType = 'orange' | 'blue';

export default defineComponent({
  name: 'hxmNoticeBar',
  components: {
    hxmIcon,
  },
  emits: ['reset', 'close', 'jumpLink', 'clickBtn'],
  props: {
    text: {
      type: String,
      default: '',
    },
    scrollable: {
      type: Boolean,
      default: true,
    },
    /**
     * 延迟触发动画的时间
     * unit: ms
     */
    delay: {
      type: [Number, String],
      default: 1000,
    },
    /**
     * 速率
     */
    speed: {
      type: [Number, String],
      default: 60,
    },
    mode: {
      type: String as PropType<ModeType>,
      default: '',
    },
    theme: {
      type: String as PropType<ThemeType>,
      default: 'orange',
    },
    showActionBtn: {
      type: Boolean,
      default: false,
    },
    /**
     * set when showActionBtn is true
     */
    actionBtnText: String,
    showNoticeIcon: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const wrapRef = ref<HTMLElement>();
    const contentRef = ref<HTMLElement>();
    const showLinearBlock = ref(false);
    // NodeJS.Timeout
    let timer: any;
    // Global params
    let wrapWidth = 0;
    let contentWidth = 0;

    const state = reactive({
      offset: 0,
      duration: 0,
    });

    const showNoticeBar = ref(true);

    // wrapper: outer container  content: scroll content
    const marqueenStyles = computed(() => ({
      transform: `translateX(${state.offset}px)`,
      transitionDuration: `${state.duration}s`,
    }));

    const lightIconColors = computed(() => {
      const lightThemeMap = {
        orange: '#FF801A',
        blue: '#4691EE',
      };
      return lightThemeMap[props.theme] || '';
    });

    const darkIconColors = computed(() => {
      const darkThemeMap = {
        orange: '#C26114',
        blue: '#3D76B8',
      };
      return darkThemeMap[props.theme] || '';
    });

    const rootClasses = computed(() => bem({
      orange: props.theme === 'orange',
      blue: props.theme === 'blue',
    }));

    // 每一次transition结束后都会执行该函数
    const onTransitionEnd = () => {
      // stop animation
      state.duration = 0;
      // set new start position
      state.offset = wrapWidth;
      // restart animation
      raf(() => {
        doubleRaf(() => {
          // *notice this calculate method
          state.offset = -(contentWidth);
          state.duration = (contentWidth + wrapWidth) / +props.speed;
          emit('reset');
        });
      });
    };

    const reset = () => {
      // reset params
      wrapWidth = 0;
      contentWidth = 0;
      state.offset = 0;
      state.duration = 0;
      // clear timer
      timer && clearTimeout(timer);

      wrapWidth = useRect(wrapRef.value).width;
      contentWidth = useRect(contentRef.value).width;

      showLinearBlock.value = contentWidth > wrapWidth || props.scrollable;

      const delayTime = props.delay ? +props.delay : 0;

      timer = setTimeout(() => {
        if (contentWidth > wrapWidth || props.scrollable) {
          doubleRaf(() => {
            state.offset = -contentWidth;
            state.duration = contentWidth / +props.speed;
          });
        }
      }, delayTime);
    };

    // event emits

    const close = () => {
      showNoticeBar.value = false;
      emit('close');
    };

    const jumpLink = () => {
      emit('jumpLink');
    };

    const clickBtn = () => {
      emit('clickBtn');
    };

    // lifecircles

    onMounted(() => {
      reset();
    });

    onActivated(() => {
      reset();
    });

    function getBemClasses<T>(params: T) {
      return bem(params);
    }

    return {
      wrapRef,
      contentRef,
      showLinearBlock,
      lightIconColors,
      darkIconColors,
      getBemClasses,
      rootClasses,
      marqueenStyles,
      onTransitionEnd,
      close,
      jumpLink,
      clickBtn,
      showNoticeBar,
    };
  },
});
</script>
