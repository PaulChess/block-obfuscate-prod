<template>
  <div class="hxm-dropdown-item hxmui-fontsize-adapter">
    <component
      :is="renderComp"
      :options="options"
      :direction="opts.direction"
      :showOverlay="opts.showOverlay"
      :overlayZIndex="opts.overlayZIndex"
      :menuZIndex="opts.menuZIndex"
      :title="title"
      :width="width"
      :globalWidth="globalWidth"
      :value="value"
      @input="handleValueChange">
    </component>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
} from 'vue-demi';
import { DropdownItemProps } from '../DropdownMenu/PropsConfigs';

interface InjectOptionsType {
  type: string;
  direction: string;
  showOverlay: boolean;
  menuZIndex: number | string;
  overlayZIndex: number | string;
}

export default defineComponent({
  name: 'DropdownItem',
  props: DropdownItemProps,

  setup(props, { emit }) {
    const opts: InjectOptionsType = inject('hxmDropdownMenu') as InjectOptionsType;

    const renderComp = computed(() => {
      let compName = '';
      if (opts.type === 'part') {
        compName = 'hxmDropdownItemPart';
      } else if (opts.type === 'global') {
        // TODO: Global后续接入
        compName = 'hxmDropdownItemGlobal';
      }
      return compName;
    });

    function handleValueChange<T>(value: T) {
      emit('input', value);
    }

    return {
      renderComp,
      handleValueChange,
      opts,
    };
  },
});
</script>
