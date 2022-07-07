import { CreateElement } from 'vue';
import { Component, Vue } from 'vue-property-decorator';
import { isFunction } from '../utils/helper';
import hxmLoading from '../Loading';
import hxmOverlay from '../Overlay';

interface Btn {
  text: string;
  highlight: boolean | 'bold';
  btnColor: string;
  callback: (handleClose: (done?: () => void) => void) => any;
  hover: boolean;
  hoverTimeout?: number;
}

interface Options {
  title?: string;
  content: string;
  btns?: Btn[];
  autoClose?: boolean;
  asyncClose?: boolean;
  zIndex?: number;
  innerRender?: object | Function;
  btnDirection?: 'column' | 'row';
  fixedBody?: boolean;
}

@Component({
  name: 'Dialog',
  components: {
    hxmLoading,
    hxmOverlay,
  },
})
export default class Dialog extends Vue {
  lock =false;

  isShow = false;

  title = '';

  content = '';

  btnsGroup: Btn[] = [];

  asyncClose = false;

  autoClose = true;

  loadingBtnIndex = -1;

  zIndex = 200;

  /**
   * 自定义内容的 render 函数
   */
  innerRender?: object | Function = undefined;

  /**
   * 按钮组中的排列方式
   */
  btnDirection: 'column' | 'row' = 'row';

  fixedBody = true;

  mergeOptions(options: Options) {
    let hasHighLightBtn = false;
    this.title = options.title || '';
    this.content = options.content || '';
    this.autoClose = options.autoClose === false ? options.autoClose : true;
    this.btnsGroup = [];
    if (options.btns && options.btns instanceof Array) {
      options.btns.forEach((btn) => {
        if (btn.text) {
          this.btnsGroup.push(btn);
          if (btn.highlight) {
            hasHighLightBtn = true;
          }
        }
      });
      // 默认最后一个按钮高亮
      const lastBtnHighLight = this.btnsGroup[this.btnsGroup.length - 1].highlight;
      if (!hasHighLightBtn && this.btnsGroup.length && lastBtnHighLight !== false) {
        this.btnsGroup[this.btnsGroup.length - 1].highlight = true;
      }
    }
    this.asyncClose = options.asyncClose || false;
    this.zIndex = options.zIndex || 200;
    this.innerRender = options.innerRender;
    if (options.btnDirection && ['column', 'row'].includes(options.btnDirection)) {
      this.btnDirection = options.btnDirection;
    } else {
      this.btnDirection = 'row';
    }
    this.fixedBody = options.fixedBody || false;
  }

  /**
   * 显示弹窗
   * @param options 配置选项
   */
  show(options: Options) {
    this.mergeOptions(options);
    this.isShow = true;
  }

  /**
   * 关闭弹窗
   */
  close() {
    this.loadingBtnIndex = -1;
    this.isShow = false;
  }

  /**
   * 响应按钮点击
   * @param btn 点击的按钮
   * @param idx 点击按钮索引
   * @param e 事件对象
   */
  handleBtnClick(btn: Btn, idx: number, e: Event) {
    e && e.stopPropagation();
    if (this.loadingBtnIndex === idx || this.lock) {
      return;
    }
    if ((!this.asyncClose || !btn.callback) && this.autoClose) {
      // 自动关闭的时候加锁，防止快速点击的时候重复触发 callback 中的方法
      this.lock = true;
      this.handleClose();
    } else {
      this.loadingBtnIndex = idx;
    }
    // v1.11.5 执行回调放在最后
    if (btn.callback && typeof btn.callback === 'function') {
      btn.callback(this.handleClose);
    }
  }

  /**
   * 响应弹窗关闭
   */
  handleClose() {
    this.close();
  }

  /**
   * 响应按钮 touchStart
   * @param idx touch 按钮索引
   */
  handleBtnTouchStart(idx: number) {
    const item = this.btnsGroup[idx];
    item.hover = true;
    this.$set(this.btnsGroup, idx, item);
  }

  /**
   * 响应按钮 touchEnd
   * @param idx touch 按钮索引
   */
  handleBtnTouchEnd(idx: number) {
    const item = this.btnsGroup[idx];
    if (item.hoverTimeout) {
      clearTimeout(item.hoverTimeout);
    }
    const groups = this.btnsGroup;
    item.hoverTimeout = setTimeout(() => {
      item.hover = false;
      this.$set(groups, idx, item);
    }, 150);
  }

  overlayAfterLeave() {
    // 在 overlay transition 动画结束的时候解锁，防止该过程中重复点击
    // 这个方法在时间上会在 close 方法之后执行
    this.lock = false;
  }

  mounted() {
    this.$on('hxm-route-update', this.close);
  }

  renderCustomContent(h: CreateElement) {
    if (this.innerRender) {
      return isFunction(this.innerRender)
        ? this.innerRender(h)
        : h(this.innerRender);
    }
    return '';
  }

  getBtnHighlightCls(item: Btn) {
    return item.highlight && (item.highlight === 'bold' ? 'hxm-dialog__btn--highlight-bold' : 'primary-text');
  }

  getBtnHighlightStyle(item: Btn) {
    return {
      color: item.btnColor ? item.btnColor : undefined,
    };
  }

  getBtnBorderCls(idx: number) {
    return this.btnDirection === 'column' ? { 'hxmui-border__top': idx > 0 } : { 'hxmui-border__left': idx > 0 };
  }

  render(h: CreateElement) {
    return (
      <hxmOverlay show={this.isShow} zIndex={this.zIndex} fixedBody={this.fixedBody} on-overlay-after-leave={ this.overlayAfterLeave }>
        <transition name="hxmui-scale">
          <div class="hxm-dialog other-bg-primarycard mid-text-primary hxmui-fontsize-adapter">
            <div class="hxm-dialog__box">
              { this.title ? <div class="hxm-dialog__title">
                <p>{this.title}</p>
              </div> : '' }
              {
                this.content
                  ? (
                    <div class="hxm-dialog__content">
                      <div class="hxm-dialog__content--inner">
                        <div class="hxm-dialog__content--inner--text" domPropsInnerHTML={this.content}></div>
                      </div>
                    </div>
                  ) : ''
              }
              { this.renderCustomContent(h) }
            </div>
            {
              this.btnsGroup && this.btnsGroup.length ? (
                <div class={[
                  'hxm-dialog__btn hxmui-border__top',
                  `hxm-dialog__btn--${this.btnDirection}`,
                ]}>
                  {
                    this.btnsGroup.map((item, idx) => (
                      <div
                        key={item.text + idx}
                        class={[
                          `hxm-dialog__btn--${idx}`,
                          this.getBtnBorderCls(idx),
                          this.getBtnHighlightCls(item),
                          { 'hxm-dialog__btn--hover': item.hover },
                        ]}
                        style={ this.getBtnHighlightStyle(item) }
                        onClick={this.handleBtnClick.bind(this, item, idx)}
                        onTouchstart={this.handleBtnTouchStart.bind(this, idx)}
                        onTouchend={this.handleBtnTouchEnd.bind(this, idx)}
                      >
                        {
                          (this.loadingBtnIndex === idx && this.asyncClose)
                            ? <hxmLoading />
                            : <span domPropsInnerHTML={item.text}></span>
                        }
                      </div>
                    ))
                  }
                </div>
              ) : ''
            }
          </div>
        </transition>
      </hxmOverlay>
    );
  }
}
