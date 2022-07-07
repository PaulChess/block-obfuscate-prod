<template>
  <div class="hxmui-agreement hxmui-fontsize-adapter">
    <div :class="rootClass">
      <div :class="getBemClasses('confirm-line')">
        <hxm-radio v-if="showCheckIcon"
          :class="getBemClasses('check')"
          v-model="isChecked"
          @change="checkedChange">
        </hxm-radio>
        <div :class="getBemClasses('content')">
          <div :class="getBemClasses('prefix')">
            <div :class="getBemClasses('text-inner')">{{ agreementPrefix }}</div>
          </div>
          <slot name="agreementlist">
            <ul :class="getBemClasses('list')">
              <li :class="getBemClasses('item')"
                :style="agreementItemStyle"
                v-for="(agreement, index) in agreementList"
                :key="agreement"
                @click="jumpAgreement(index)">
                <div :class="getBemClasses('text-inner')">{{ agreement }}</div>
              </li>
            </ul>
          </slot>
        </div>
      </div>
      <hxm-button size="large"
        :class="getBemClasses('btn')"
        :disabled="!isChecked"
        @click="confirm">
        {{btnText}}
      </hxm-button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
} from 'vue-demi';
import Vue from 'vue';
import { createNamespace } from '../utils/index';
import hxmToast from '../Toast/index';
import hxmButton from '../Button/index';
import hxmRadio from '../Radio/index';

const [bem] = createNamespace('agreement');

export default defineComponent({
  name: 'hxmAgreement',
  model: {
    prop: 'checked',
    event: 'change',
  },
  components: {
    hxmToast,
    hxmButton,
    hxmRadio,
  },
  emits: ['change', 'confirm', 'jumpAgreement'],
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
    showCheckIcon: {
      type: Boolean,
      default: true,
    },
    agreementPrefix: {
      type: String,
      default: '同意',
    },
    uncheckedTip: {
      type: String,
      default: '请阅读并同意以上条款',
    },
    agreementList: {
      type: Array,
      default: () => [],
    },
    agreementItemStyle: {
      type: Object,
      default: () => {},
    },
    btnText: String,
  },

  setup(props, { emit }) {
    const rootClass = computed(() => bem({ reverse: props.reverse }));
    const isChecked = ref(props.checked);
    const showToast = ref(false);
    const checkedChange = (val: boolean) => {
      emit('change', val);
    };
    const jumpAgreement = (idx: number) => {
      emit('jumpAgreement', idx);
    };
    const confirm = () => {
      if (!isChecked.value) {
        Vue.prototype.$toast(props.uncheckedTip);
      } else {
        emit('confirm');
      }
    };
    const getBemClasses = (params: any) => bem(params);

    return {
      rootClass,
      getBemClasses,
      checkedChange,
      isChecked,
      confirm,
      jumpAgreement,
      showToast,
    };
  },
});
</script>
