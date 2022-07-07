<template>
  <div class="hxm-tabs hxmui-fontsize-adapter">
    <div class="hxm-tabs-nav-button__fixed" v-if="type!=='fixedTap' && $slots.button">
      <slot name="button" />
    </div>
    <div
      class="hxm-tabs-nav__linear"
      v-if="swipeable"
      :style="type!=='fixedTap' && $slots.button ? {right:'.4em'}:{right:0}"
    ></div>
    <div class="hxm-tabs-nav" ref="panels" :class="[fixedLayout,borderBottom,'text-sub']">
      <div
        class="hxm-tabs-nav-slider primary-bg-red"
        v-if="type === 'slide'"
        :style="sliderTransform"
      ></div>
      <div
        class="hxm-tabs-nav-button"
        v-if="type==='fixedTap' && buttonPosition === 'left'"
        :style="{left:'1.23em'}"
      >
        <slot name="button" />
      </div>
      <div class="hxm-tabs-nav-panels" :class="tabsClass" @touchmove="slide">
        <div
          v-for="(item, index) in panelList"
          :key="item.title + index"
          class="hxm-tabs-nav-panel"
          @click="updateTab(item.name)"
          :class="[panelClass, { [`${panelType}__active`]: currentItem === item.name }]"
          :style="
          [currentItem === item.name && activeTextColor
            ? {
                color: activeTextColor,
                border:type === 'fixedTap' ? `1px solid ${activeTextColor}` : {},
              }
            : {},borderRadius,{
              margin:type === 'fixedTap' ? '-1px' : ''
            }]
        "
        >
          <hxm-badge v-if="item.badge" v-bind="item.badgeProps">
            <div
              class="hxm-tabs-nav-panel-text__badge"
              :style="currentItem === item.name && type === 'slide'? {'font-size':'0.17em'}:''"
            >{{ item.title }}</div>
          </hxm-badge>
          <span v-else class="hxm-tabs-nav-panel-text">{{ item.title }}</span>
        </div>
        <div class="hxm-tabs-nav-panel__empty" v-if="$slots.button && swipeable"></div>
      </div>
      <div
        class="hxm-tabs-nav-button"
        v-if="type==='fixedTap' && buttonPosition === 'right'"
        :style="{right:'1.23em'}"
      >
        <slot name="button" />
      </div>
    </div>
    <div class="hxm-tabs-content" ref="tabContent">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch, Emit,
} from 'vue-property-decorator';
import hxmBadge from '../Badge';

type TabType = 'slide' | 'tap' | 'fixedTap';

type buttonPosition = 'left' | 'right';

@Component({
  name: 'Tabs',
  components: {
    hxmBadge,
  },
})
export default class Tabs extends Vue {
  @Prop({ default: '' }) private type!: TabType;

  @Prop({ default: false }) private swipeable!: boolean;

  @Prop({ default: '' }) private activeItem!: string;

  @Prop({ default: '0.28em' }) private round!: string;

  @Prop({ default: '' }) private activeTextColor!: string;

  @Prop() private buttonPosition?: buttonPosition;

  currentItem = this.activeItem;

  panelList = [] as any[];

  transformDistance = 0;

  panelType = '';

  mounted() {
    this.initTab();
  }

  // 当布局为fixedTap时改变父元素的布局
  get fixedLayout() {
    const prefix = 'hxm-tabs-nav__fixed';
    if (this.type === 'fixedTap') {
      if (this.buttonPosition) {
        return this.buttonPosition === 'left'
          ? `${prefix}--right`
          : `${prefix}--left`;
      }
      return `${prefix}--center`;
    }
    return '';
  }

  get tabsClass() {
    if (this.type === 'fixedTap') {
      const fixedTap = 'hxm-tabs-nav-panels__fixed';
      const fixedBorder = 'hxm-tabs-nav-panels__fixedBorder';
      return `${fixedTap} ${fixedBorder}`;
    }
    return this.swipeable
      ? 'hxm-tabs-nav-panels__swipe'
      : 'hxm-tabs-nav-panels__flex';
  }

  get borderBottom() {
    return this.type === 'slide' ? 'hxm-tabs-nav__bottom' : '';
  }

  get panelClass() {
    const list = [];
    const prefix = 'hxm-tabs-nav-panel';
    // 类型为slide或tap
    const panelType = `${prefix}__${this.type}`;
    this.panelType = panelType;
    // 是否可滑动
    const swipe = this.swipeable ? `${panelType}__swipe` : `${panelType}__flex`;
    list.push(panelType, swipe);
    let stringClass = '';
    list.map((item) => {
      stringClass += `${item} `;
      return null;
    });
    return stringClass;
  }

  get borderRadius() {
    if (this.type !== 'slide') {
      return this.round ? { 'border-radius': this.round } : '';
    }
    return '';
  }

  get sliderTransform() {
    if (this.type === 'slide' && this.activeTextColor) {
      return {
        'background-color': this.activeTextColor,
        transform: `translateX(${this.transformDistance}px)`,
      };
    }
    return { transform: `translateX(${this.transformDistance}px)` };
  }

  @Watch('activeItem')
  onItemChange() {
    this.currentItem = this.activeItem;
    this.updateTab(this.currentItem);
  }

  @Emit()
  slide() {
  }

  @Watch('transformDistance')
  addTransition(newVal: number, oldVal: number) {
    if (oldVal === 0) {
      return false;
    }
    const panels = this.$refs.panels as HTMLElement;
    const slider = panels.querySelector('.hxm-tabs-nav-slider') as HTMLElement;
    slider.style.transition = 'all .2s';
    return true;
  }

  initTab() {
    this.panelList = [];
    if (!this.$slots.default) {
      return false;
    }
    const slots = this.$slots.default as any;
    for (let i = 0; i < slots.length; i++) {
      if (slots[i].tag && slots[i].tag.includes('tab-panel')) {
        const { attrs } = slots[i].data;
        const panelAttr = {
          title: attrs.title,
          name: attrs.name,
          badge: attrs.badge,
          badgeProps: attrs.badgeProps,
        };
        this.panelList.push(panelAttr);
      }
    }
    this.currentItem = this.activeItem || this.panelList[0].name;
    this.$nextTick(() => this.updateTab(this.currentItem, false));

    return null;
  }

  updateTab(name: string, trigger = true) {
    const index = this.panelList.findIndex((item) => item.name === name);
    if (index === -1) {
      return false;
    }
    this.currentItem = name;
    const panels = this.$refs.panels as any;
    const panelsDom = panels.querySelectorAll(
      '.hxm-tabs-nav-panel',
    ) as NodeListOf<any>;
    const slider = panels.querySelector('.hxm-tabs-nav-slider') as HTMLElement;
    if (slider) {
      this.$nextTick(() => {
        this.transformDistance = panelsDom[index].offsetLeft
          + panelsDom[index].offsetWidth / 2
          - slider.offsetWidth / 2;
      });
    }

    if (this.swipeable) {
      panels.scroll && panels.scroll(
        panelsDom[index].offsetLeft
          + panelsDom[index].offsetWidth / 2
          - panels.offsetWidth / 2,
        0,
      );
    }
    const content = this.$refs.tabContent as HTMLElement;
    const items = content.querySelectorAll('.hxm-tab-content__single');
    for (let i = 0; i < items.length; i++) {
      !items[i].classList.contains('hide') && items[i].classList.add('hide');
      i === index && items[i].classList.remove('hide');
    }
    if (trigger) {
      this.$emit('toggleTab', name);
    }
    return this.panelList[index].name;
  }
}
</script>
