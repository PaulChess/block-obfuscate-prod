<template>
  <div class="hxmui-fontsize-adapter" :class="rootClass">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  provide,
} from 'vue-demi';
import { createNamespace } from '../utils/index';
import { DropdownMenuProps } from './PropsConfigs';

const [bem] = createNamespace('dropdown-menu');

export default defineComponent({
  name: 'DropdownMenu',

  props: DropdownMenuProps,

  setup(props) {
    provide('hxmDropdownMenu', {
      type: props.type,
      direction: props.direction,
      showOverlay: props.showOverlay,
      overlayZIndex: props.overlayZIndex,
      menuZIndex: props.menuZIndex,
    });

    const rootClass = computed(() => [
      bem({ global: props.type === 'global' }),
    ]);

    return {
      rootClass,
    };
  },
});
</script>
