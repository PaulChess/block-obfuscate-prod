import { PropType } from 'vue-demi';
import { MenuDirection, MenuType, OptionsType } from './TypesDef';
import { extend } from '../utils/index';

export const DropdownMenuCommonProps = {
  direction: {
    type: String as PropType<MenuDirection>,
    default: 'down',
  },
  showOverlay: {
    type: Boolean,
    default: true,
  },
  overlayZIndex: {
    type: [String, Number],
    default: 1,
  },
  menuZIndex: {
    type: [String, Number],
    default: 2,
  },
};

export const DropdownItemCommonProps = {
  // v-model
  value: {
    type: [Number, String],
    default: '',
  },
  options: {
    type: Array as PropType<OptionsType[]>,
    default: () => [],
  },
  // Part类型的入口bar宽度
  width: {
    type: String,
    default: '1.9rem',
  },
};

export const DropdownMenuProps = extend(DropdownMenuCommonProps, {
  type: {
    type: String as PropType<MenuType>,
    default: 'part',
  },
});

export const DropdownItemProps = extend(DropdownMenuCommonProps, {
  // Global类型中的标题
  title: String,
  // Global类型的入口bar宽度
  globalWidth: {
    type: String,
    default: '1rem',
  },
});

export const DropdownItemPartProps = extend(DropdownMenuCommonProps, DropdownItemCommonProps, {});
