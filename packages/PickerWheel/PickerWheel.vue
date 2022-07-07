<template>
  <div
    id="hxm-picker"
    :style="{ fontSize: `${fontSize}px` }"
    class="mid-text-primary"
  >
    <template v-if="showModal">
      <hxm-overlay :show="visible" :preventCenter="true" @click="close">
        <transition name="hxmui-slide-bottom">
          <div class="hxm-picker-container other-bg-primarycard" @click.stop v-if="visible">
            <div class="hxm-picker-head">
              <div class="hxm-picker-cancel sub-text-gray" @click="cancel">
                <span>{{ cancelText }}</span>
              </div>
              <div class="hxm-picker-title">
                <slot name="title">
                  <span>{{ title }}</span>
                </slot>
              </div>
              <div class="hxm-picker-submit" @click="pick">
                <span>{{ confirmText }}</span>
              </div>
            </div>
            <div class="hxm-picker-panel mid-text-primary">
              <div class="hxm-picker-wheel-wrapper" ref="wheelWrapper">
                <div
                  class="hxm-picker-wheel"
                  :class="'hxm-picker-wheel-' + key"
                  v-for="(list, key) in menu"
                  :key="key"
                  :style="{ height: rows * height + unit }"
                >
                  <ul class="hxm-picker-wheel-scroll" :style="{ top: top }">
                    <li
                      class="hxm-picker-wheel-item"
                      :style="{ height: itemHeight }"
                      v-for="(item, index) in list"
                      :key="index"
                    >
                      <slot name="option" :option="getLabelName(item)">
                        <span>{{ getLabelName(item) }}</span>
                      </slot>
                    </li>
                  </ul>
                </div>
                <div
                  class="hxm-picker-mask-top hxmui-border__bottom"
                  :style="{ height: top }"
                ></div>
                <div
                  class="hxm-picker-mask-bottom hxmui-border__top"
                  :style="{ height: top }"
                ></div>
              </div>
            </div>
          </div>
        </transition>
      </hxm-overlay>
    </template>
    <template v-else>
      <div class="hxm-picker-container hxm-alert-card-bg" @click.stop>
        <div class="hxm-picker-head" v-if="!hideHead">
          <div class="hxm-picker-cancel sub-text-gray" @click="cancel">
            <span>{{ cancelText }}</span>
          </div>
          <div class="hxm-picker-title">
            <slot name="title">
              <span>{{ title }}</span>
            </slot>
          </div>
          <div class="hxm-picker-submit" @click="pick">
            <span>{{ confirmText }}</span>
          </div>
        </div>
        <div class="hxm-picker-panel mid-text-primary">
          <div class="hxm-picker-wheel-wrapper" ref="wheelWrapper">
            <div
              class="hxm-picker-wheel"
              :class="'hxm-picker-wheel-' + key"
              v-for="(list, key) in menu"
              :key="key"
              :style="{ height: rows * height + unit }"
            >
              <ul class="hxm-picker-wheel-scroll" :style="{ top: top }">
                <li
                  class="hxm-picker-wheel-item"
                  :style="{ height: itemHeight }"
                  v-for="(item, index) in list"
                  :key="index"
                >
                  <slot name="option" :option="item">
                    <span>{{ item }}</span>
                  </slot>
                </li>
              </ul>
            </div>
            <div
              class="hxm-picker-mask-top hxmui-border__bottom"
              :style="{ height: top }"
            ></div>
            <div
              class="hxm-picker-mask-bottom hxmui-border__top"
              :style="{ height: top }"
            ></div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import SetFontSize from '../mixins/SetFontSize';
import { isString } from '../utils/helper';
import hxmOverlay from '../Overlay/index';

let BScroll: any;

@Component({
  name: 'PickerWheel',
  mixins: [SetFontSize],
  components: {
    hxmOverlay,
  },
})
export default class Picker extends Vue {
  @Prop({ default: false }) private visible!: boolean;

  @Prop({ default: '取消' }) private cancelText!: string;

  @Prop({ default: '确定' }) private confirmText!: string;

  @Prop({ default: '.4em' }) private itemHeight!: string;

  @Prop({ default: 5 }) private rows!: number;

  @Prop({ default: 2500 }) private swipeTime!: boolean;

  @Prop() private data!: object;

  @Prop() private title!: string;

  @Prop() private defaultIndex!: any;

  @Prop({ default: null }) private value!: any;

  @Prop({ default: true }) private showModal!: boolean;

  @Prop({ default: false }) private hideHead!: boolean;

  @Prop({ default: false }) private define!: boolean;

  wheels = {};

  get menu() {
    if (this.data instanceof Array) {
      return { __option__: this.data };
    }
    return this.data;
  }

  get top() {
    return Math.floor(this.rows / 2) * this.height + this.unit;
  }

  // 单位
  get unit() {
    return this.itemHeight.replace(/\.|\d+/g, '') || 'em';
  }

  // 行高
  get height() {
    return parseFloat(this.itemHeight);
  }

  close() {
    this.$emit('update:visible', false);
  }

  cancel() {
    this.$emit('cancel');
    this.$emit('update:visible', false);
  }

  pick() {
    const result = {};
    const index = {};
    for (const key of Object.keys(this.wheels)) {
      result[key] = this.menu[key][this.wheels[key].selectedIndex];
      index[key] = this.wheels[key].selectedIndex;
    }

    const keys = Object.keys(result);

    if (keys.includes('__option__') && keys.length === 1) {
      // 单列
      this.pickSingleRow(result, index);
    } else {
      // 多列
      this.pickMultipleRow(result, index, keys);
    }

    this.$emit('update:visible', false);
  }

  pickSingleRow(result: object, index: object) {
    if (isString(result['__option__'])) {
      this.$emit('update:value', result['__option__'], index['__option__']);
      this.$emit('confirm', result['__option__'], index['__option__']);
    } else {
      this.$emit('update:value', result['__option__'].label, result['__option__'].value);
      this.$emit('confirm', result['__option__'].label, result['__option__'].value);
    }
  }

  pickMultipleRow(result: any, index: object, keys: any) {
    const firstKey = keys[0];

    if (firstKey && result[firstKey] && isString(result[firstKey])) {
      this.$emit('update:value', result, index);
      this.$emit('confirm', result, index);
    } else {
      const labels = {};
      const values = {};
      for (const key in result) {
        if (Object.prototype.hasOwnProperty.call(result, key)) {
          labels[key] = result[key].label;
          values[key] = result[key].value;
        }
      }
      this.$emit('update:value', labels, values);
      this.$emit('confirm', labels, values);
    }
  }

  init() {
    this.$nextTick(() => {
      if (!this.$refs.wheelWrapper) return;
      for (const key of Object.keys(this.menu)) {
        const index = this.getInitValueIndex(key, this.menu, this.value);

        this.wheels[key] = new BScroll(
          this.$refs.wheelWrapper['getElementsByClassName'](
            `hxm-picker-wheel-${key}`,
          )[0],
          {
            wheel: {
              selectedIndex: index >= 0 ? index : 0,
              rotate: 22,
            },
            swipeTime: this.swipeTime,
            momentumLimitDistance: 10,
          },
        );
        const wheel = this.wheels[key];
        wheel.on('scrollEnd', () => {
          setTimeout(() => {
            this.$nextTick(() => {
              this.$emit(
                'scrollend',
                key,
                this.menu[key][wheel.getSelectedIndex()],
                wheel,
              );
            });
          });
        });
        wheel.on('scrollStart', () => {
          this.$emit('scrollstart');
        });
      }
    });
  }

  getInitValueIndex(key: string, menu: object, value: any) {
    let index = 0;
    if (!value) {
      return 0;
    }
    // 单列
    if (isString(value)) {
      if (isString(menu[key][0])) {
        index = menu[key].indexOf(value);
      } else {
        index = menu[key].findIndex((item: any) => item.label === value);
      }
    } else if (isString(menu[key][0])) {
      index = menu[key].indexOf(value[key]);
    } else {
      index = menu[key].findIndex((item: any) => item.label === value[key]);
    }
    return index;
  }

  getLabelName(item: any) {
    if (isString(item)) {
      return item;
    }
    if (item.label) {
      return item.label;
    }
    return '';
  }

  @Watch('menu', { immediate: true })
  menuWatcher(nv: any) {
    if (Object.keys(nv).length) {
      this.init();
    }
  }

  @Watch('visible', { immediate: true })
  visibleWatcher(nv: boolean) {
    if (nv) {
      this.init();
    }
  }

  mounted() {
    if (this.$hxmConfig && this.$hxmConfig.BScroll) {
      BScroll = this.$hxmConfig.BScroll;
    } else {
      this.$destroy();
      throw new Error('[hxmui] Picker 需要引入第三方依赖 bscroll.js');
    }
  }
}
</script>
