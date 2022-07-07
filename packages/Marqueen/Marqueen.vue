<template>
  <div class="hxm-marqueen" ref="marqueen" v-if="data.length">
    <transition name="marqueen" @before-leave="beforeLeave" @after-leave="afterLeave" @before-enter="beforeEnter">
      <ul
        class="hxm-marqueen-list"
        :class="'hxm-marqueen-dir-' + dir"
        v-if="move"
        :style="{'transition': transition, 'top': top}"
      >
        <li class="hxm-marqueen-item" v-for="i in counts" :key="i" @click="clickRow(i - 1)">
          <slot :row="list[i-1]">
            {{list[i-1]}}
          </slot>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';

@Component({
  name: 'Marqueen',
})

export default class Marqueen extends Vue {
  @Prop({ default: 1 }) private rows!: number;

  @Prop() private data!: object;

  @Prop({ default: 2000 }) private delay!: number;

  @Prop({ default: '1s' }) private transition!: string;

  @Prop({ default: 2000 }) private wait!: number;

  @Prop() private dir!: string;

  $refs!: {
    marqueen: HTMLElement;
  }

  list: Array<any> = [];

  top = '';

  counts = this.rows + 1;

  move = true;

  transform = '';

  startIndex = 0;

  leaveOutTimer: any = null;

  initTransformTimer: any = null;

  clickRow(i: number) {
    const index: number = (this.startIndex + i) % this.list.length;
    this.$emit('clickRow', this.data[index], index);
  }

  setTransform() {
    if (this.$refs.marqueen) {
      const list: any = this.$refs.marqueen['children'][0];
      list.style.transform = this.transform;
    }
  }

  clearTransform() {
    if (this.$refs.marqueen) {
      const list: any = this.$refs.marqueen['children'][0];
      list.style.transform = 'none';
    }
  }

  beforeLeave() {
    this.$nextTick(this.setTransform);
  }

  afterLeave() {
    this.move = true;
    const head: any = this.list.shift();
    this.list.push(head);
    // 更新初始下标
    this.startIndex++;
    if (this.startIndex === this.list.length) {
      this.startIndex = 0;
    }
    this.$nextTick(this.clearTransform);
    clearTimeout(this.leaveOutTimer);
    this.leaveOutTimer = setTimeout(() => {
      this.move = false;
    }, this.wait);
  }

  beforeEnter() {
    this.$emit('enter', this.startIndex, this.data[this.startIndex]);
  }

  initTransform() {
    const ih: string = getComputedStyle(
      this.$refs.marqueen['getElementsByClassName']('hxm-marqueen-item')[0],
      '',
    ).height;
    const iw: string = getComputedStyle(
      this.$refs.marqueen['getElementsByClassName']('hxm-marqueen-item')[0],
      '',
    ).width;

    switch (this.dir) {
      case 'left':
        this.$refs.marqueen['style'].height = `${ih}`;
        this.transform = `translateX(-${iw})`;
        break;
      case 'right':
        this.$refs.marqueen['style'].height = `${ih}`;
        this.transform = `translateX(${iw})`;
        break;
      case 'bottom':
        this.$refs.marqueen['style'].height = `${parseInt(ih, 10) * this.rows}px`;
        this.top = `-${ih}`;
        this.transform = `translateY(${ih})`;
        break;
      default:
        this.$refs.marqueen['style'].height = `${parseInt(ih, 10) * this.rows}px`;
        this.transform = `translateY(-${ih})`;
    }
  }

  init() {
    if (this.list.length <= this.rows) {
      this.counts = this.list.length;
      return;
    }
    this.counts = this.rows + 1;

    this.$nextTick(this.initTransform);

    this.startIndex = 0;
    clearTimeout(this.leaveOutTimer);
    clearTimeout(this.initTransformTimer);

    this.$emit('enter', this.startIndex, this.data[this.startIndex]);

    this.initTransformTimer = setTimeout(() => {
      this.move = false;
      this.setTransform();
    }, this.delay);
  }

  @Watch('data', { immediate: true, deep: true })
  dataWatcher(nv: any) {
    this.list = JSON.parse(JSON.stringify(nv));
    if (Array.isArray(this.list) && this.list.length > 0) {
      this.init();
    }
  }

  mounted() {
    this.init();
  }
}
</script>
