<template>
  <div
    class="hxm-radio hxmui-fontsize-adapter"
    :class="{ 'hxm-form__disabled': disabled !== false }"
    :style="shape === 'circle' && 'display: flex;align-items:center;'"
    @click.stop="handleClick"
  >
    <div
      :class="[
        `hxm-radio-${shape}`,
        `hxm-radio-${shape}__${checkedStatus ? 'checked' : 'uncheck'}`,
        `${checkedStatus ? 'primary-text' : 'mid-text-sub'}`,
      ]"
       :style="shape === 'circle' && iconStyle">
      <div v-if="shape === 'rect'" class="hxm-radio-rect__slot">
        <slot></slot>
      </div>
    </div>
    <div v-if="shape === 'circle'" class="hxm-radio-circle__slot">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Emit,
  Vue,
  Watch,
} from 'vue-property-decorator';
import emitter from '../mixins/emitter';

type RadioShape = 'rect' | 'circle';

@Component({
  name: 'Radio',
  model: {
    prop: 'checked',
    event: 'change',
  },
  mixins: [emitter],
})
export default class Radio extends Vue {
  @Prop({ default: false }) private checked!: boolean;

  @Prop({ default: '0.22em' }) private size!: string;

  @Prop({ default: '' }) private name!: string;

  @Prop({ default: false }) private disabled!: boolean;

  @Prop({ default: 'circle' }) private shape!: RadioShape;

  @Prop({ default: false }) private initialTransition!: boolean;

  isLoading = false;

  checkedFromGroup: boolean | -1 = -1;

  private transitionCtrl = this.initialTransition;

  get checkedStatus() {
    if (this.checkedFromGroup !== -1) {
      return this.checkedFromGroup;
    }
    return this.checked;
  }

  get iconStyle() {
    const style = {
      width: this.size || `${0.22 * (this as any).scale}em`,
      height: this.size || `${0.22 * (this as any).scale}em`,
    };
    if (this.transitionCtrl && this.checkedStatus) {
      style['animation'] = 'hxmui-fade-in 0.3s both ease-in';
    }
    return style;
  }

  handleClick() {
    if (!this.isLoading) {
      this.transitionCtrl = true;
      this.isLoading = true;
      this.handleChange();
    }
  }

  @Watch('checkedStatus')
  checkedWatcher() {
    this.isLoading = false;
  }

  @Emit('change')
  handleChange() {
    this.dispatch('RadioGroup', 'updateStatus', this);
    return !this.checkedStatus;
  }

  getDefaultFromGroup() {
    if (this.name) {
      this.$on('setFromGroup', (value: string) => {
        this.checkedFromGroup = value === this.name;
      });
      this.dispatch('RadioGroup', 'getDefault', this);
    }
  }

  beforeMount() {
    this.getDefaultFromGroup();
  }

  beforeDestory() {
    this.$off('set-default');
  }
}
</script>
