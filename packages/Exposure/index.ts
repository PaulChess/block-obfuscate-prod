import { CreateElement } from 'vue/types/umd';
import { Component, Vue, Prop } from 'vue-property-decorator';
import install from '../utils/install';
import ExposureWatcher from './exposureWatcher';

@Component({
  name: 'Exposure',
})
class Exposure extends Vue {
  @Prop({ default: 'div' }) private tag!: string;

  get hasHideListener(): boolean {
    return !!this.$listeners.hide;
  }

  handleExposure(e: Event) {
    this.$emit('exposure', e);
  }

  handleHide(e: Event) {
    this.$emit('hide', e);
  }

  mounted() {
    this.exposureWatcher = new ExposureWatcher();
    this.exposureWatcher.add(
      this.$refs.comEl as Element,
      this.handleExposure,
      this.hasHideListener ? this.handleHide : undefined,
    );
    this.exposureWatcher.beginWatch();
  }

  destroyed() {
    if (this.$refs.comEl) {
      this.exposureWatcher.remove(this.$refs.comEl as Element);
    }
  }

  render(h: CreateElement) {
    return h(this.tag, {
      ref: 'comEl',
    }, this.$slots.default);
  }
}

export default install(Exposure);
