<template>
  <div :class="`hxm-counter hxmui-fontsize-adapter${dark ? ' dark' : ''}`" v-show="show">
    <p>{{ current }}/{{ total }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ name: 'hxmCounter' })
export default class Counter extends Vue {
  @Prop({ type: Number, default: 0 }) current!: number;

  @Prop({ type: Number, default: 0 }) total!: number;

  @Prop(Boolean) dark!: boolean;

  show = false;

  onScroll() {
    let timer: null | number = null;
    const _this = this;
    return function () {
      if (timer !== null) {
        _this.show = true;
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        _this.show = false;
      }, 1000);
    };
  }

  created() {
    window.addEventListener('scroll', this.onScroll());
  }
}
</script>
