<template>
  <div class="hxm-grid hxmui-fontsize-adapter">
    <div
      :class="[`hxm-grid__${type}`, {'one-line': isOneLine}]"
      ref="grid"
    >
      <div
        class="hxm-grid__block"
        v-for="(item, index) in listGrid"
        :key="index"
        @click="jumpUrl(item.url)"
      >
        <div
          class="hxm-grid__icon"
          :style="{'background': item.icon ? `transparent url(${item.icon}) 0/ 100% 100%` : ''}"
        ></div>
        <div class="hxm-grid__content">
          <div class="hxm-grid__title">{{item.title}}</div>
          <div
            class="hxm-grid__subtitle"
            v-if="isLeftType"
          >{{item.subtitle}}</div>
        </div>
      </div>
    </div>
    <div
      class="hxm-grid__pagination"
      v-if="isSlideType"
    >
      <div
        class="hxm-grid__pagination--inner"
        :style="{'left': left, 'width': width}"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'Grid',
})
export default class Loading extends Vue {
  @Prop({ default: {} }) private listGrid!: object[];

  @Prop({ default: 'nor' }) private type!: string;

  @Prop({ default: 1 }) private row!: number;

  left = '0';

  width = '';

  get isLeftType() {
    return this.type === 'left';
  }

  get isSlideType() {
    return this.type === 'slide';
  }

  get isOneLine() {
    if (this.type === 'nor' && this.listGrid.length <= 5) {
      return true;
    }
    if ((this.type === 'norleft' || this.type === 'left') && this.listGrid.length <= 2) {
      return true;
    }
    return false;
  }

  mounted() {
    if (this.isSlideType) {
      const dom: any = this.$refs.grid;
      dom.style.height = `${(0.91 + ((this.row - 1) * 0.61))}em`;
      if (this.row * 5 >= this.listGrid.length) {
        this.width = '100%';
      }
      const fn = (e: any) => {
        const num = (e.target.scrollLeft * 0.2) / (e.target.scrollWidth - e.target.clientWidth);
        this.left = `${num}em`;
      };
      dom.addEventListener('scroll', fn);
      this.$once('hook:beforeDestroy', () => {
        dom.removeEventListener('scroll', fn);
      });
    }
  }

  jumpUrl(url: string) {
    window.location.href = url;
  }
}
</script>
