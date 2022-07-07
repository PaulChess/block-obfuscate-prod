<template>
<div class="hxmui-fontsize-adapter hxmui-segment" ref="segmentDom">
    <div :class="getBemClasses('segment-tab')">
      <!-- 整体模块 -->
      <div :class="[getBemClasses('pack'), getBemClasses(judgeType(segmentType))]">
        <div :class="getBemClasses('left-text')" v-if="segmentType === 'leftText' && segmentNum < 4">
          <slot name="text"></slot>
        </div>
        <div :class="getBemClasses('content')">
          <div :class="getBemClasses('content-swiper')">
            <template v-if="segmentList.length">
              <div :class="getBemClasses('content-container')">
                <div
                  :class="[getBemClasses('content-container-list-box'), currentActive(segmentItem),
                  currentActiveNext(index)]"
                  v-for="(segmentItem, index) in segmentList"
                  :key="segmentItem.value"
                  ref="segmentListItemRef"
                  :style="{ width: segmentStyleWidth }"
                  @click="clickSegment(segmentItem, index)">
                <div :class="[getBemClasses('content-container-list'), fourStepClassName('content-container-list-4')]">
                  <div :class="getBemClasses('content-container-list-item')">
                    <div :class="[getBemClasses('content-container-list-item-text') ,segmentSmallSize[index]]">
                      <span v-if="!segmentItem.icon.name" :class="getBemClasses('content-container-list-item-text-label')" ref="segmentSpan">{{ segmentItem.title }}</span>
                      <hxm-icon
                        v-if="segmentItem.icon.name"
                        :name="segmentItem.icon.name"
                        :color="setIcon(segmentItem.icon, 'color', '')"
                        :darkThemeColor="setIcon(segmentItem.icon, 'darkThemeColor', '#d2d2d3')"
                        :size="setIcon(segmentItem.icon, 'size', '0.18em')"
                        :class="getBemClasses('content-container-list-item-text-icon')"
                      ></hxm-icon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div :class="getBemClasses('content-swiper-module')" :style="swipeModuleStyle" @transitionend="onTransitionEnd"></div>
            </template>
          </div>
        </div>
        <div :class="getBemClasses('right-text')" v-if="segmentType === 'rightText' && segmentNum < 4">
          <slot name="text"></slot>
        </div>
      </div>
    </div>
    <div :class="getBemClasses('panel-content')">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  watch,
  provide,
  readonly,
  computed,
} from 'vue-demi';
import { createNamespace } from '../utils/index';
import { getStrLength } from './utils';
import { SegmentAttr, ActiveVal, SegmentIcon } from './interface';
import hxmIcon from '../Icon/Icon.vue';

const prop = {
  // modelValue Vue3使用
  value: {
    type: [String, Number],
    default: '0',
  },
  type: {
    type: String,
    default: 'segment',
    require: false,
  },
};

const [bem] = createNamespace('segment');

export default defineComponent({
  name: 'hxmTabsSegment',
  props: prop,
  emits: ['input', 'click', 'change', 'transitionEnd'],
  components: {
    hxmIcon,
  },
  setup(props, context) {
    const activateValue = reactive<ActiveVal>({ value: props.value });
    const segmentListItemRef = ref([]);
    const segmentType = ref(props.type);
    const segmentNum = ref(0);
    const activateIndex = ref(0);
    const segmentList = ref<SegmentAttr[]>([]);
    const activateDistance = ref(0);
    const segmentDom = ref();
    const segmentFont = ref(0);
    const segmentSpan = ref([]);
    const segmentSmallSize = ref<any[]>([]);

    // 注入响应式数据对象
    provide('activateValue', readonly(activateValue));

    // 根据宽度来计算
    const narrowFontSizeByWidth = (segmentWidth: number) => {
      // span正常实际宽度值 0.24为左右内边距
      // fix Android 精度问题 (Math.round)
      const spanNormalWidth = Math.round(segmentWidth - 0.24 * segmentFont.value);
      if (segmentSpan.value && segmentSpan.value.length) {
        segmentSpan.value.forEach((ele: HTMLElement) => {
          // 如果字数宽度大于盒子宽度则缩小字体
          const spanClass = ele.offsetWidth > spanNormalWidth ? bem('content-container-list-item-text-small') : '';
          // 这里设定当Tab的个数为4且字符数>8的时候才设置添加类进行处理
          const fourStepClass = (segmentNum.value === 4 && getStrLength(ele.innerText) > 8) ? bem('content-container-list-item-text-4') : '';
          segmentSmallSize.value.push([spanClass, fourStepClass]);
        });
      }
    };

    // 计算segment宽度
    const segmentWidth = computed(() => {
      if (!segmentListItemRef.value || !segmentListItemRef.value.length) {
        return 0;
      }
      const arr: number[] = segmentListItemRef.value.map((ele: HTMLElement) => ele.offsetWidth);
      const newSegmentWidth = Math.max.apply(Math, [...arr]);
      narrowFontSizeByWidth(newSegmentWidth);
      return newSegmentWidth;
    });

    // 获取当前选择segment元素信息
    const changeSegmentActive = (index: number) => {
      if (segmentFont.value) {
        // 滑块距离 = 模块距离 + 模块内边距
        activateDistance.value = segmentWidth.value * index + 0.04 * segmentFont.value;
      }
    };

    // 更新activateValue和activateIndex
    const updateActivate = () => {
      const segmentNameList = segmentList.value.map((item) => item.name);
      const index = activateValue.value ? segmentNameList.indexOf(activateValue.value) : 0;
      activateValue.value = index > -1 ? segmentNameList[index] : segmentNameList[0];
      activateIndex.value = index > -1 ? index : 0;
    };

    // 获取传值信息包括label和value
    const getSegmentInfo = () => {
      if (!context.slots.default) {
        segmentList.value.length = 0;
      } else {
        // 获取子组件信息
        const slot = context.slots.default();
        const segmentSlots = slot.length ? slot.filter((item: any) => (item.tag ? item.tag.indexOf('hxmTabsSegmentPanel') > -1 : item)) : [];
        segmentNum.value = segmentSlots.length;
        if (segmentNum.value) {
          segmentSlots.forEach((item: any, index: number) => {
            if (item.data.attrs) {
              const { attrs } = item.data;
              segmentList.value.push({
                title: attrs.title || '',
                name: item.componentInstance.name || String(index),
                icon: attrs.icon || { name: '' },
              });
            }
          });
          updateActivate();
        }
      }
    };

    // 点击segment
    const clickSegment = async (item: SegmentAttr, index: number) => {
      const segmentAttr = {
        ...item,
        index,
      };
      context.emit('click', segmentAttr);
      if (index === activateIndex.value) {
        return;
      }
      // Vue3使用update:modelValue
      context.emit('input', item.name);
      activateValue.value = item.name;
      activateIndex.value = index;
      changeSegmentActive(index);
      context.emit('change', segmentAttr);
    };

    const onTransitionEnd = function () {
      context.emit('transitionEnd');
    };

    // 当segment宽度发生变化的时候需要重新计算模块偏移量
    watch(
      segmentWidth,
      (width: number) => {
        width && changeSegmentActive(activateIndex.value);
      },
    );

    // 解决value改变视图不更新的问题: http://gogs.myhexin.com/Ths-Kernel-Fe/thsc-hxmui/issues/91
    watch(() => props.value, (val) => {
      activateValue.value = val;
      updateActivate();
      changeSegmentActive(activateIndex.value);
    });

    // 判断是否需要加入侧边内容
    const judgeType = (type: string) => {
      if (!type) {
        return null;
      }
      let typeName = '';
      // 考虑后续type定义多种内容
      switch (type) {
        case 'leftText':
        case 'rightText':
          typeName = 'text';
          break;
        default:
          break;
      }
      return typeName;
    };

    // 更新单个segment宽度样式
    const segmentStyleWidth = computed(() => (segmentWidth.value ? `${segmentWidth.value}px` : null));

    const swipeModuleStyle = computed(() => ({
      width: `${segmentWidth.value - 0.04 * segmentFont.value}px`,
      transform: `translate(${activateDistance.value}px, -50%)`,
    }));

    // 判断当前激活状态
    const currentActive = (item: SegmentAttr) => (item.name === activateValue.value ? bem('content-container-list-item-active') : null);

    // 清除激活状态下一个的伪元素样式
    const currentActiveNext = (index: number) => {
      if (index !== 0) {
        return index === activateIndex.value + 1 ? bem('content-container-list-item-active-next') : null;
      }
      return bem('content-container-list-item-active-next');
    };

    // 4段式样式设置
    const fourStepClassName = (str: string) => (segmentNum.value === 4 ? bem(str) : null);

    // 获取当前字体来计算边距距离
    const updateFontsize = () => {
      if (segmentDom.value) {
        const fSize = window.getComputedStyle(segmentDom.value).fontSize;
        const fNumber = fSize ? fSize.replace('px', '') : 200;
        segmentFont.value = fNumber as number;
      }
    };

    // Icon设置
    const setIcon = (item: SegmentIcon, type: string, defaultConfig: string) => (item[type] || defaultConfig);

    const getBemClasses = (params: any) => bem(params);

    onMounted(() => {
      updateFontsize();
      getSegmentInfo();
    });

    return {
      getBemClasses,
      activateValue,
      segmentListItemRef,
      clickSegment,
      segmentList,
      activateDistance,
      segmentNum,
      segmentType,
      judgeType,
      segmentStyleWidth,
      currentActive,
      currentActiveNext,
      fourStepClassName,
      segmentDom,
      setIcon,
      swipeModuleStyle,
      narrowFontSizeByWidth,
      segmentSpan,
      segmentSmallSize,
      onTransitionEnd,
    };
  },
});
</script>
