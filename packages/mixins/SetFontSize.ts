import { Vue, Component } from 'vue-property-decorator';

/**
 * @escription 移动端适配字号
 * @usage 组件内添加该 mixin 并在组件根节点添加 :style="{fontSize: `${fontSize}px`}" ，其余样式单位使用 em
 */

@Component
export default class SetFontSize extends Vue {
  fontSize = 0;

  handleFontSizeChanged() {
    const screenWidth = window.screen.width;
    if (screenWidth > 480) {
      this.fontSize = 100;
    } else {
      this.fontSize = (window.innerWidth / 7.5 / 16) * 100 * 0.32;
    }
  }

  mounted() {
    this.handleFontSizeChanged();
    let sec = 1000;
    let width = window.innerWidth;
    const timer = setInterval(() => {
      if (sec > 0) {
        if (width !== window.innerWidth) {
          this.handleFontSizeChanged();
          width = window.innerWidth;
        }
        sec -= 100;
      } else {
        clearInterval(timer);
      }
    }, 100);
    window.addEventListener('resize', () => {
      this.handleFontSizeChanged();
    });
  }

  beforeDestory() {
    window.removeEventListener('resize', () => {
      this.handleFontSizeChanged();
    });
  }
}
