<template>
  <div class="hxm-doc-demo-block">
    <h2 v-if="title" class="hxm-doc-demo-block__title text-primary">{{title}}</h2>
    <div v-if="card" class="hxm-doc-demo-block__card" :style="cardStyle">
      <slot />
    </div>
    <slot v-else></slot>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

@Component({
  name: 'DemoBlock',
})
export default class DemoBlock extends Vue {
  @Prop({ default: '' }) private title!: string;

  @Prop({ default: true }) private card!: boolean;

  @Prop({ default: true }) private showCardBorderRadius!: boolean;

  get cardStyle() {
    const style = {
      borderRadius: this.showCardBorderRadius ? undefined : 0,
    };
    return style;
  }
}
</script>

<style lang="less">
.hxm-doc-demo-block {
  &__title {
    box-sizing: border-box;
    padding: 0.48rem 0.16rem 0.24rem 0.16rem;
    font-weight: 400;
    letter-spacing: 0.5px;
  }
  &__card {
    // overflow: hidden;
    margin: 0 0.16rem;
    border-radius: 0.32em;
  }
  &:first-of-type {
    .hxm-doc-demo-block__title {
      padding-top: 0.32rem;
    }
  }
}
</style>
