<template>
  <div id="hxm-picker-list" class="mid-text-primary  hxmui-fontsize-adapter">
      <hxm-overlay :show="visible" :preventCenter="true" @click="close">
        <transition name="hxmui-slide-bottom">
          <div class="hxm-picker-list__container card-bg" @click.stop v-if="visible">
            <div class="hxm-picker-list__head">
              <div class="hxm-picker-list__leftbtn">
                <slot></slot>
              </div>
              <div class="hxm-picker-list__title">
                <span>{{title}}</span>
              </div>
              <div class="hxm-picker-list__cancel" @click="cancel"></div>
            </div>
            <div class="hxm-picker-list__panel mid-text-primary">
              <ul ref="scrollview">
                <li v-for="(option, index) in data"
                :key="index"
                class="hxm-picker-list__option"
                :class="{'hxm-picker-list__option__active': selectIndex === index}"
                @click="select(option, index)">
                  <slot name="option" :option="option">
                    <template v-if="option.subText">
                      <span class="hxm-picker-list__value">{{option.value}}</span>
                      <span class="hxm-picker-list__subtext">{{option.subText}}</span>
                    </template>
                    <template v-else>
                      <span class="hxm-picker-list__value">{{option}}</span>
                    </template>
                  </slot>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </hxm-overlay>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';

@Component({
  name: 'PickerList',
})
export default class Picker extends Vue {
  @Prop({ default: false }) private visible!: boolean;

  @Prop() private data!: object;

  @Prop() private title!: string;

  @Prop({ default: null }) private selectIndex!: any;

  itemHeight = 0;

  $refs!: {
    scrollview: HTMLElement;
  }

  @Watch('visible', { immediate: true })
  visibleWatcher(nv: boolean) {
    if (nv) {
      this.$nextTick(() => {
        if (!this.itemHeight) {
          this.itemHeight = parseFloat(window.getComputedStyle(this.$refs.scrollview['children'][0], null)['height']);
        }
        this.$refs.scrollview['scrollTop'] = this.selectIndex * this.itemHeight;
      });
    }
  }

  select(option: any, index: number) {
    this.$emit('select', option, index);
    this.$emit('update:visible', false);
  }

  cancel() {
    this.$emit('update:visible', false);
    this.$emit('cancel', false);
  }

  close() {
    this.$emit('update:visible', false);
  }
}
</script>
