<template>
  <div class="hxm-cell hxmui-fontsize-adapter"
    :class="rootClass"
    @click="clickCell"
    ref="hxmCell"
    :style="rootStyle">
    <!-- absolute -->
    <i :class="getBemClasses('border')" v-show="showBottomBorder"></i>

    <!-- left -->
    <div :class="getBemClasses('left')">
      <!-- 标题左侧的图标 slot -->
      <div :class="getBemClasses('left-icon')" v-if="showLeftIcon">
        <slot name="leftIcon"></slot>
      </div>
      <!-- 信息 -->
      <div :class="getBemClasses('left-info-container')">
        <!-- 标题 -->
        <div :class="getBemClasses('title')">
          <div :class="[getBemClasses('title-text'), titleClass]">
            {{ title }}
          </div>
        </div>
        <!-- 备注信息 -->
        <div :class="getBemClasses('label')" v-if="label">
          <div :class="[getBemClasses('label-text'), labelClass]">
            {{ label }}
          </div>
        </div>
      </div>
      <!-- 标题右侧的提示信息图标 -->
      <div :class="getBemClasses('left-tooltip')"
        v-if="showTip"
        @click.stop="clickTip">
      </div>
    </div>

    <!-- right slot -->
    <div :class="getBemClasses('right')">
      <slot name="right">
        <!-- 文案 -->
        <div :class="getBemClasses('value')" v-if="value">
          <div :class="[getBemClasses('value-text'), valueClass]">{{ value }}</div>
        </div>
        <!-- 图标 -->
        <div :class="iconClass" v-if="isLink"></div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, ref, computed, PropType,
} from 'vue-demi';
import { createNamespace } from '../utils/create/index';

const [bem] = createNamespace('cell');

export type ArrowDirType = 'up' | 'down' | 'right';

export default defineComponent({
  name: 'hxmCell',
  props: {
    // 左侧的标题
    title: String,
    // 右侧的文案
    value: String,
    // 备注信息
    label: String,
    // 是否展示右侧的箭头
    isLink: {
      type: Boolean,
      default: false,
    },
    // 是否展示提示Icon
    showTip: {
      type: Boolean,
      default: false,
    },
    // 箭头方向
    arrowDirection: {
      type: String as PropType<ArrowDirType>,
      default: 'right',
    },
    // 是否开启点击反馈
    clickable: {
      type: Boolean,
      default: false,
    },
    // 备注自定义类
    labelClass: String,
    // 标题自定义类
    titleClass: String,
    // 文案自定义类
    valueClass: String,
    // 是否展示底部border
    showBottomBorder: {
      type: Boolean,
      default: true,
    },
    // 是否展示左右padding
    showPadding: {
      type: Boolean,
      default: true,
    },
    // 是否设置透明背景色
    transparentBackground: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click', 'clickTip'],

  setup(props, { emit, slots }) {
    const hxmCell = ref<HTMLElement>();

    const clickCell = (e: MouseEvent) => {
      // 阻止点击过快在ios上触发双击滑动
      e.preventDefault();
      emit('click');
    };

    const clickTip = () => emit('clickTip');

    const rootStyle = computed(() => {
      const style = {
        background: props.transparentBackground ? 'transparent' : null,
        paddingLeft: props.showPadding ? '0.16em' : '0',
        paddingRight: props.showPadding ? '0.16em' : '0',
        // 控制有无label时cell的高度
        height: props.label ? '0.64em' : '0.48em',
      };
      return style;
    });

    const rootClass = computed(() => {
      let isClickable = false;
      if (props.clickable) {
        isClickable = true;
      } else {
        isClickable = !!props.isLink;
      }
      return bem({ clickable: isClickable });
    });

    const iconClass = computed(() => bem('icon', [
      props.arrowDirection,
    ]));

    const showLeftIcon = computed(() => slots.leftIcon);

    const getBemClasses = (params: any) => bem(params);

    const removeLastChildBorder = () => {
      let nextElementClassList: Array<string> = [];
      if ((hxmCell.value)?.nextElementSibling?.classList) {
        nextElementClassList = Array.from((hxmCell.value)?.nextElementSibling?.classList);
      }
      if (!nextElementClassList.includes('hxm-cell')) {
        const hxmCellBorder = (hxmCell.value)?.getElementsByClassName('hxm-cell__border')[0];
        if (hxmCellBorder) {
          (hxmCellBorder as HTMLElement).style.display = 'none';
        }
      }
    };

    onMounted(() => removeLastChildBorder());

    return {
      hxmCell,
      rootClass,
      rootStyle,
      iconClass,
      clickCell,
      clickTip,
      showLeftIcon,
      getBemClasses,
    };
  },
});
</script>
