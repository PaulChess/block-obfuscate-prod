import {
  Vue,
  Component,
  Prop,
  Emit,
  Watch,
} from 'vue-property-decorator';
import { CreateElement, VueConstructor } from 'vue/types/umd';
import emitter from '../mixins/emitter';

@Component({
  name: 'RadioGroup',
  mixins: [emitter],
})
export default class RadioGroup extends Vue {
  @Prop() value!: string;

  setRadioItemDefaultStatus(radioItem: InstanceType<VueConstructor>) {
    if (this.value && radioItem && radioItem.name) {
      radioItem.$emit('setFromGroup', this.value);
    }
  }

  updateRadioItemStatus(radioItem: VueConstructor) {
    if (!radioItem.name) {
      return;
    }
    this.updateValueByInput(radioItem);
    this.broadcastRadioItems();
  }

  // 监听value的变化触发选中radio的更新
  @Watch('value')
  handleValueChange() {
    this.$emit('input', this.value);
    this.broadcastRadioItems();
  }

  @Emit('input')
  updateValueByInput(radioItem: VueConstructor) {
    return radioItem.name;
  }

  broadcastRadioItems() {
    this.$nextTick(() => {
      this.broadcast('Radio', 'setFromGroup', this.value);
    });
  }

  created() {
    this.$on('getDefault', this.setRadioItemDefaultStatus);
    this.$on('updateStatus', this.updateRadioItemStatus);
  }

  beforeDestory() {
    this.$off('getDefault');
    this.$off('updateStatus');
  }

  render(h: CreateElement) {
    return h('div', this.$slots.default);
  }
}
