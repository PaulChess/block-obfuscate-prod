<template>
  <div
    class="hxm-checkbox hxmui-fontsize-adapter"
    :class="{ 'hxm-form__disabled': disabled !== false }"
    :style="shape === 'circle' && 'display: flex;align-items:center;'"
    @click.stop="handleClick"
  >
    <div
      :class="[
        `hxm-checkbox-${shape}`,
        `hxm-checkbox-${shape}__${checkedStatus ? 'checked' : 'uncheck'}`,
        `${checkedStatus ? 'primary-text' : 'mid-text-sub'}`,
      ]"
       :style="shape === 'circle' && iconStyle"
    >
      <div v-if="shape === 'rect'" class="hxm-checkbox-rect__slot">
        <slot></slot>
      </div>
    </div>
    <div v-if="shape === 'circle'" class="hxm-checkbox-circle__slot">
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

type CheckboxShape = 'rect' | 'circle';

@Component({
  name: 'Checkbox',
  model: {
    prop: 'checked',
    event: 'change',
  },
  mixins: [emitter],
  inject: {
    groupValue: {
      default: [],
    },
  },
})
export default class Checkbox extends Vue {
  @Prop({ default: true }) private checked!: boolean;

  @Prop({ default: '0.22em' }) private size!: string;

  @Prop({ default: '' }) private name!: string;

  @Prop({ default: false }) private disabled!: boolean;

  @Prop({ default: 'circle' }) private shape!: CheckboxShape;

  isLoading = false;

  get checkedStatus() {
    if (this.groupValue && this.name) {
      return this.groupValue.includes(this.name);
    }
    return this.checked;
  }

  get iconStyle() {
    return {
      width: this.size,
      height: this.size,
    };
  }

  handleClick() {
    if (!this.isLoading) {
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
    this.dispatch('CheckboxGroup', 'updateStatus', this);
    return !this.checkedStatus;
  }
}
</script>
