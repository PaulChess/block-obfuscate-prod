<template>
  <div ref="tooltip" class="hxm-tooltip hxmui-fontsize-adapter" @click.stop="handleSlotTap">
    <slot></slot>
    <transition-group name="hxmui-fade">
      <div key="tooltipBlock" v-show="tooltipShow">
        <div
          ref="tooltipBlock"
          class="hxm-tooltip-block"
          :style="tooltipStyle"
          v-html="content"
        ></div>
        <div
          ref="tooltipArrow"
          class="tooltip-arrow"
          :class="`tooltip-arrow-${direaction}`"
          :style="tooltipArrowCls"
        ></div>
      </div>
    </transition-group>
  </div>
</template>

<script>

export default {
  name: 'hxmToolTip',
  props: {
    content: {
      type: String,
      default: '',
    },
    placement: {
      type: String,
      default: 'bottom',
    },
    zIndex: {
      type: Number,
      deafult: 100,
    },
  },
  data() {
    return {
      direaction: 'bottom', // 方向
      alignment: 'center', // 对齐方式
      // slot 元素宽高
      slotOffset: {
        width: 0,
        height: 0,
      },
      // tooltip 元素宽高
      toolTipOffset: {
        width: 0,
        height: 0,
      },
      // 小三角形元素宽高
      arrowOffset: {
        width: 0,
        height: 0,
      },
      tooltipShow: false,
    };
  },
  computed: {
    dpr() {
      return document.querySelector('html').getAttribute('data-dpr') || 1;
    },
    // 小三角形位置
    tooltipArrowCls() {
      let res = '';
      // 根据方向修改 tooltip 和 三角形 位置
      if (this.direaction === 'top') {
        // 方向为 top
        res = `top: -${6 * this.dpr + 2}px;`;
      } else if (this.direaction === 'bottom') {
        // 方向为 bottom
        res = `top: ${this.slotOffset.height + 6 * this.dpr - this.arrowOffset.height + 2}px;`;
      } else if (this.direaction === 'right') {
        // 方向为 right
        res = `left: ${this.slotOffset.width + 8 * this.dpr + 2}px;`;
      } else if (this.direaction === 'left') {
        // 方向为 left
        res = `right: ${this.slotOffset.width + 8 * this.dpr - this.arrowOffset.width + 2}px;`;
      }
      if (this.direaction === 'top' || this.direaction === 'bottom') {
        res += `left: ${this.slotOffset.width / 2 - this.arrowOffset.width / 2}px;`;
      } else {
        res += `top: ${this.slotOffset.height / 2 - this.arrowOffset.height / 2}px;`;
      }
      res += `z-index: ${this.zIndex};`;
      return res;
    },
    // tooltip 位置
    tooltipStyle() {
      let directionStyle = '';
      let alignmentStyle = '';
      // 根据方向修改 tooltip 和 三角形 位置
      if (this.direaction === 'top') {
        // 方向为 top
        directionStyle = `top: -${this.toolTipOffset.height + 6 * this.dpr}px;`;
      } else if (this.direaction === 'bottom') {
        // 方向为 bottom
        directionStyle = `bottom: -${this.toolTipOffset.height + 6 * this.dpr}px;`;
      } else if (this.direaction === 'right') {
        // 方向为 right
        directionStyle = `right: -${this.toolTipOffset.width + 8 * this.dpr}px;`;
      } else if (this.direaction === 'left') {
        // 方向为 left
        directionStyle = `left: -${this.toolTipOffset.width + 8 * this.dpr}px;`;
      }
      // 根据对齐方式修改 tooltip 位置
      if (this.alignment === 'center') {
        // 对齐方式为 center
        if (this.direaction === 'top' || this.direaction === 'bottom') {
          const align = this.toolTipOffset.width / 2 - this.slotOffset.width / 2;
          alignmentStyle = `transform: translateX(-${align}px);`;
        } else {
          const align = this.toolTipOffset.height / 2 + this.slotOffset.height / 2;
          alignmentStyle = `transform: translateY(-${align}px);`;
        }
      } else if (this.alignment === 'start') {
        // 对齐方式为 start
        if (this.direaction === 'top' || this.direaction === 'bottom') {
          alignmentStyle = '';
        } else {
          alignmentStyle = `transform: translateY(-${
            this.slotOffset.height
          }px);`;
        }
      } else if (this.alignment === 'end') {
        // 对齐方式为 end
        if (this.direaction === 'top' || this.direaction === 'bottom') {
          const align = this.toolTipOffset.width - this.slotOffset.width;
          alignmentStyle = `transform: translateX(-${align}px);`;
        } else {
          alignmentStyle = `transform: translateY(-${
            this.toolTipOffset.height
          }px);`;
        }
      }
      return `${directionStyle}${alignmentStyle}z-index: ${this.zIndex};`;
    },
  },
  watch: {
    placement(val) {
      this.checkPlacement(val);
    },
  },
  methods: {
    // slot 元素点击后切换 tooltip 显示和隐藏
    handleSlotTap() {
      if (!this.tooltipShow) {
        this.tooltipShow = true;
        this.$nextTick(() => {
          this.getDomOffset();
        });
      } else {
        this.tooltipShow = false;
      }
    },
    // tooltip 点击自身后隐藏
    hideTooltip() {
      this.tooltipShow = false;
    },
    // 检查定位参数 确定 方向 及 对齐方式
    checkPlacement(val) {
      const DIRECTION = val.split('-')[0];
      const ALIGNMENT = val.split('-')[1] || 'center';
      // 检查非法参数报错提示
      const DIRECTION_LIST = ['top', 'bottom', 'left', 'right'];
      if (DIRECTION_LIST.indexOf(DIRECTION) === -1) {
        throw Error('placement should be one of top, bottom, left,right');
      }
      const ALIGNMENT_LIST = ['start', 'center', 'end'];
      if (ALIGNMENT_LIST.indexOf(ALIGNMENT) === -1) {
        throw Error('alignment should be one of start, center, end');
      }
      this.direaction = DIRECTION;
      this.alignment = ALIGNMENT;
    },
    // 获取 DOM 节点宽高
    getDomOffset() {
      if (this.$refs.tooltip) {
        this.slotOffset.width = this.$refs.tooltip.offsetWidth;
        this.slotOffset.height = this.$refs.tooltip.offsetHeight;
      }
      if (this.$refs.tooltipBlock) {
        this.toolTipOffset.width = this.$refs.tooltipBlock.offsetWidth;
        this.toolTipOffset.height = this.$refs.tooltipBlock.offsetHeight;
      }
      if (this.$refs.tooltipArrow) {
        this.arrowOffset.width = this.$refs.tooltipArrow.offsetWidth;
        this.arrowOffset.height = this.$refs.tooltipArrow.offsetHeight;
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.checkPlacement(this.placement);
      this.getDomOffset();
    });
    document.removeEventListener('click', this.hideTooltip);
    document.addEventListener('click', this.hideTooltip);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.hideTooltip);
  },
};
</script>
