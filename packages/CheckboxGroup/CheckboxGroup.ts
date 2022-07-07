import {
  Vue,
  Component,
  Prop,
  Emit,
} from 'vue-property-decorator';
import { CreateElement, VueConstructor } from 'vue/types/umd';

@Component({
  name: 'CheckboxGroup',
  provide() {
    return {
      groupValue: this.value,
    };
  },
})
export default class CheckboxGroup extends Vue {
  @Prop() value!: string[];

  @Emit('input')
  updateCheckboxItemStatus(checkboxItem: InstanceType<VueConstructor>) {
    if (!checkboxItem.name) {
      return this.value;
    }
    const valueTemp = this.value;
    const itemIdx = this.value.indexOf(checkboxItem.name);
    if (itemIdx > -1) {
      valueTemp.splice(itemIdx, 1);
    } else {
      valueTemp.push(checkboxItem.name);
    }
    return valueTemp;
  }

  created() {
    this.$on('updateStatus', this.updateCheckboxItemStatus);
  }

  beforeDestory() {
    this.$off('updateStatus');
  }

  render(h: CreateElement) {
    return h('div', this.$slots.default);
  }
}
