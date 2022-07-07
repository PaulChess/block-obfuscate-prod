<template>
  <div class="hxmui-bottomsheet hxmui-fontsize-adapter">
    <hxm-popup
      :show="showBottomSheet"
      :round="true"
      :height="popupHeight"
      position="bottom"
      @overlay-click="handleOverlayClick">
      <div class="hxm-bottomsheet">
        <div :class="getBemClasses('title')" v-if="title">
          <div :class="getBemClasses('title-text')">{{ title }}</div>
        </div>

        <div :class="getBemClasses('container')">
          <div :class="getBemClasses('main')">
            <div :class="getBemClasses('main-tips')" v-if="tips">
              <div :class="getBemClasses('main-tips-text')">{{ tips }}</div>
            </div>
            <div :class="getBemClasses('main-body')">
              <slot name="body"></slot>
            </div>
          </div>
          <!-- 按钮组 -->
          <div :class="getBemClasses('btns')">
            <hxm-button
              v-for="(item, index) in btnList"
              :key="index"
              :size="btnSize"
              :class="item.class"
              :customClass="item.class"
              :customContainerStyle="getBtnStyle(index)"
              @click="clickBtn(item.type)">
              {{item.text}}
            </hxm-button>
          </div>
        </div>
      </div>
    </hxm-popup>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, computed, watch,
} from 'vue-demi';
import { createNamespace } from '../utils/index';
import Popup from '../Popup';

type BtnItemType = {
  class?: string;
  type: string;
  text: string;
};

const [bem] = createNamespace('bottomsheet');

const btnLenSizeMap = {
  1: 'large',
  2: 'medium',
};

export default defineComponent({
  name: 'hxmBottomSheet',
  components: {
    Popup,
  },
  emits: ['confirm', 'cancel', 'close'],
  model: {
    prop: 'show',
    event: 'close',
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: String,
    tips: String,
    btns: {
      type: Array,
      default: () => [
        { type: 'cancel', text: '取消' },
        { type: 'confirm', text: '完成' },
      ],
    },
    popupHeight: {
      type: String,
      default: '66%',
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true,
    },
    disableClose: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const showBottomSheet = ref(props.show);

    const disableCloseVal = ref(props.disableClose);

    const handleOverlayClick = () => {
      setTimeout(() => {
        if (!props.closeOnClickOverlay || disableCloseVal.value) {
          return;
        }
        showBottomSheet.value = false;
        emit('close', false);
      });
    };

    const btnList = computed(() => {
      const arr: Array<BtnItemType> = [...(props.btns) as Array<BtnItemType>];
      arr.forEach((item: BtnItemType) => {
        item['class'] = `${bem()}__btns-${item.type}`;
      });
      return arr;
    });

    const btnlistLength = computed(() => +btnList.value.length);

    const validateBtnLenth = () => {
      if (!btnLenSizeMap[btnlistLength.value]) {
        console.warn('[hxmui BottomSheet]: 请保证传入的按钮个数在1-2之间');
        return false;
      }
      return true;
    };

    const btnSize = computed(() => {
      if (!validateBtnLenth()) {
        return false;
      }
      return [btnLenSizeMap[btnlistLength.value]];
    });

    const getBtnStyle = (idx: number) => {
      if (!validateBtnLenth()) {
        return false;
      }
      return {
        // 控制按钮的宽度占比
        width: `${100 / btnlistLength.value}%`,
        // 当存在2个按钮时控制第一个按钮的marginRight
        marginRight: (btnlistLength.value === 2 && idx === 0) ? '0.08em' : 0,
        // 当存在2个按钮时控制第二个按钮的marginLeft
        marginLeft: (btnlistLength.value === 2 && idx === 1) ? '0.08em' : 0,
      };
    };

    const clickBtn = (type: string) => {
      if (type) {
        emit(type);
        handleOverlayClick();
      } else {
        console.warn('[hxmui BottomSheet: 请确保按钮传值正确]');
      }
    };

    watch(() => props.show, (val) => {
      showBottomSheet.value = val;
    });

    watch(() => props.disableClose, (val) => {
      disableCloseVal.value = val;
    }, { immediate: true });

    const getBemClasses = (params: any) => bem(params);

    return {
      showBottomSheet,
      handleOverlayClick,
      btnList,
      btnSize,
      clickBtn,
      getBtnStyle,
      getBemClasses,
    };
  },
});
</script>
