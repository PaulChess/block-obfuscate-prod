<template>
    <div class="collapse-container hxmui-fontsize-adapter" :class="$hxmui.theme === 'black'?'black': 'white'"
    >
      <div :class="!show? 'header':'hxm-cell header'" @click="handleClick" v-if="gradient&&titlebar&&collapseText">
           <div class="left-icon" v-if="!isRight">
              <div :class="$hxmui.theme === 'black'?'icon-wrap black up':'icon-wrap light up'" v-if="!show"></div>
              <div :class="$hxmui.theme === 'black'?'icon-wrap black down':'icon-wrap light down'" v-if="show"></div>
           </div>
           <div :class="$hxmui.theme === 'black'?'title black': 'title'">{{title}}</div>
           <div class="right-icon" v-if="isRight">
             <div :class="$hxmui.theme === 'black'?'icon-wrap black up':'icon-wrap light up'" v-if="!show"></div>
             <div :class="$hxmui.theme === 'black'?'icon-wrap black down':'icon-wrap light down'" v-if="show"></div>
           </div>
       </div>
       <div :class="$hxmui.theme === 'black'?'content black':'content'" v-if="show&&gradient&&titlebar&&collapseText">
           <slot></slot>
       </div>
       <div class="main-container" v-if="!gradient">
         <div class="content-wrap" ref="content" style="overflow: hidden" :style="{height : showMore ? 'auto': showHeight/200 + 'em'}">
           <div class="slot-wrap"><slot></slot></div>
           <div :class="$hxmui.theme === 'black'?'bkg black': 'bkg light'" v-if="isLongContent&&!showMore"></div>
          </div>
         <div class="footer" @click="handleShow" v-show="isLongContent">
            <div class="left-text" v-if="!showMore">{{showText}}</div>
            <div :class="$hxmui.theme === 'black'?'icon-wrap black up':'icon-wrap light up'" v-if="!showMore"></div>
            <div class="left-text" v-if="showMore">{{downText}}</div>
            <div :class="$hxmui.theme === 'black'?'icon-wrap black down':'icon-wrap light down'" v-if="showMore"></div>
         </div>
       </div>
       <div class="titlebar" v-if="!titlebar">
          <div class="bar-wrap" ref="bar" style="overflow: hidden" :style="{height : showMore ? 'auto': showHeight/200 + 'em'}">
           <div class="slot-bar"><slot></slot></div>
          </div>
          <div class="footer" @click="handleShow" v-show="isLongContent">
            <div class="left-text" v-if="!showMore">{{showText}}</div>
            <div :class="$hxmui.theme === 'black'?'icon-wrap black up':'icon-wrap light up'" v-if="!showMore"></div>
            <div class="left-text" v-if="showMore">{{downText}}</div>
            <div :class="$hxmui.theme === 'black'?'icon-wrap black down':'icon-wrap light down'" v-if="showMore"></div>
         </div>
       </div>
       <div class="collapse-text" v-if="!collapseText">
         <div :class="textShowSate?'subtitle': 'alldata'">{{content}}</div>
         <div class="show-btn" @click="textShow" v-if="textShowSate">展开</div>
         <div :class="textShowSate?'show-btn': 'show-btn down'" @click="textShow" v-if="!textShowSate">收起</div>
       </div>
    </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

import SetFontSize from '../mixins/SetFontSize';

@Component({
  mixins: [SetFontSize],
  name: 'hxmCollapse',
  components: {
  },
})
export default class HxmCollapse extends Vue {
    @Prop({ default: false }) private expanded!: boolean;

    @Prop({ default: true }) private isRight!: boolean;

    @Prop({ default: true }) private gradient!: boolean;

    @Prop({ default: true }) private titlebar!: boolean;

    @Prop({ default: true }) private collapseText!: boolean;

    @Prop({ default: '' }) private showText?: string;

    @Prop({ default: 180 }) private showHeight!: number;

    @Prop({ default: '' }) private downText?: string;

    @Prop({ default: '' }) private title?: string;

     @Prop({ default: '' }) private content?: string;

      show=false;

      showMore=true;

      textShowSate=true;

      isLongContent=false;

      created() {
        this.show = this.expanded;
        console.log(this.$slots);
      }

      mounted() {
        if (!this.accordion) {
          this.$nextTick().then(() => {
            const contentHeight = this.$refs.content && this.$refs.content['clientHeight'];
            if (contentHeight > this.showHeight) {
              this.isLongContent = true;
              this.showMore = false;
            } else {
              this.isLongContent = false;
            }
          });
        }
        if (!this.titlebar) {
          this.$nextTick().then(() => {
            const contentHeight = this.$refs.bar && this.$refs.bar['clientHeight'];
            if (contentHeight > this.showHeight) {
              this.isLongContent = true;
              this.showMore = false;
            } else {
              this.isLongContent = false;
            }
          });
        }
      }

      handleClick() {
        this.show = !this.show;
      }

      textShow() {
        this.textShowSate = !this.textShowSate;
      }

      handleShow() {
        this.showMore = !this.showMore;
      }

      // computed
      get btnStyle() {
        const res: any = {
          'border-radius': `${this.radius}em`,
        };
        return res;
      }
}
</script>
