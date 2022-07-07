<template>
  <div class="hxm-dropdown-item-part hxmui-fontsize-adapter">
    <template>
      <div :class="getBemClasses('bar')"
        :style="barStyles"
        @click="switchMenuCollapse">
        <div :class="getBemClasses('title')">
          <div :class="getBemClasses('title-text')">
            {{ currTextName }}
          </div>
        </div>
        <i :class="arrowClasses" />
      </div>

      <ul ref="dropdownMenuListRef"
        :class="menuListClasses"
        :style="menuListStyles"
        v-show="showMenu"
      >
        <li :class="getMenuItemClasses(item)"
            v-for="item in options"
            :key="item.value"
            @click="chooseItem(item)">
          <div :class="getBemClasses('item-text')">
            {{item.text}}
          </div>
        </li>
      </ul>
    </template>

    <hxm-overlay
      :show="renderOverlay"
      duration="100"
      :zIndex="overlayZIndex"
      @click="switchMenuCollapse"
    >
    </hxm-overlay>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  nextTick,
  onMounted,
  computed,
} from 'vue-demi';
import hxmOverlay from '../Overlay/index';
import { createNamespace } from '../utils/index';
import { DropdownItemPartProps } from '../DropdownMenu/PropsConfigs';
import { OptionsType, MenuDirection } from '../DropdownMenu/TypesDef';

const [bem] = createNamespace('dropdown-item-part');

export default defineComponent({
  name: 'DropdownItemPart',

  components: {
    hxmOverlay,
  },

  props: DropdownItemPartProps,

  setup(props, { emit }) {
    const showMenu = ref(false);
    // menu是否展示在屏幕右侧
    const menuShowRight = ref(true);
    // menu上下方向，可选值: up | down
    const menuDirection = ref<MenuDirection>(props.direction);
    const dropdownMenuListRef = ref<HTMLElement>();
    const currValue = ref<string | number>(0);
    const currTextName = ref('');

    function judgeMenuPosition() {
      nextTick(() => {
        const ele = dropdownMenuListRef.value;
        if (ele) {
          const { left, y, height } = ele.getBoundingClientRect();
          // 当menu距离屏幕左侧的距离 < 20px, 需要将menu展示在左侧
          if (left < 20) {
            menuShowRight.value = false;
          }
          // v1.8.8新增: 当menu距离屏幕底部的距离 < 20px, 将menu的方向改成向上
          // 计算方式: 屏幕高度 - 元素距离屏幕顶部高度 - 元素高度
          if (menuDirection.value === 'down' && ((window.innerHeight - y - height) < 20)) {
            menuDirection.value = 'up';
          }
          if (menuDirection.value === 'up' && y < 20) {
            menuDirection.value = 'down';
          }
        }
      });
    }

    const renderOverlay = computed(() => showMenu.value && props.showOverlay);

    const barStyles = computed(() => ({
      zIndex: showMenu.value ? props.menuZIndex : 0,
      width: props.width === '' ? 'auto' : props.width,
    }));

    const arrowClasses = computed(() => bem('arrow',
      {
        up: showMenu.value,
      }));

    const menuListClasses = computed(() => bem('list', {
      up: menuDirection.value === 'up',
      left: !menuShowRight.value,
    }));

    const menuListStyles = computed(() => ({
      zIndex: showMenu.value ? props.menuZIndex : 0,
    }));

    const getMenuItemClasses = (item: OptionsType) => bem('item', {
      active: currValue.value === item.value,
    });

    const changeCurrTextName = (value: number | string) => {
      props.options.forEach((option: OptionsType) => {
        if (option.value === value) {
          currTextName.value = option.text;
        }
      });
    };

    watch(() => props.value, (newVal) => {
      currValue.value = newVal;
      changeCurrTextName(newVal);
    }, { immediate: true });

    // issue: http://gogs.myhexin.com/Ths-Kernel-Fe/thsc-hxmui/issues/87
    watch(() => props.options, () => {
      changeCurrTextName(props.value);
    });

    watch(showMenu, (val) => {
      val && judgeMenuPosition();
      // 菜单收起的时候将方向进行初始化
      if (!val) {
        menuDirection.value = props.direction;
      }
    }, { immediate: true });

    const closeMenu = () => {
      setTimeout(() => {
        showMenu.value = false;
      }, 80);
    };

    const chooseItem = (item: OptionsType) => {
      closeMenu();
      currValue.value = item.value;
      props.options.forEach((option: OptionsType) => {
        if (option.value === item.value) {
          currTextName.value = option.text;
        }
      });
      emit('input', item.value);
    };

    const switchMenuCollapse = () => {
      showMenu.value = !showMenu.value;
    };

    function getBemClasses<T>(params: T) {
      return bem(params);
    }

    onMounted(() => {
      document.body.addEventListener('touchstart', function () {});
    });

    return {
      showMenu,
      menuShowRight,
      dropdownMenuListRef,
      currTextName,
      renderOverlay,
      barStyles,
      arrowClasses,
      menuListClasses,
      menuListStyles,
      getMenuItemClasses,
      closeMenu,
      chooseItem,
      switchMenuCollapse,
      getBemClasses,
    };
  },
});
</script>
