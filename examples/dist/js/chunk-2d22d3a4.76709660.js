(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22d3a4"],{f730:function(t,e,s){"use strict";s.r(e);var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"example-exposure"},[s("h2",{staticClass:"mb-24"},[t._v("Exposure 曝光组件")]),s("hxm-exposure",{attrs:{tag:"img","data-src":t.logoSrc}}),s("hxm-exposure",{attrs:{tag:"img",src:t.exposureImg0Src},on:{exposure:function(e){return t.handleImgExposure("exposureImg0Src")}}}),s("hxm-exposure",{on:{exposure:function(e){return t.handleListExposure(!0)},hide:function(e){return t.handleListExposure(!1)}}},[s("ul",t._l(4,(function(e){return s("li",{key:e,staticClass:"list-cell hxmui-border__bottom card-bg"},[t._v("list "+t._s(e))])})),0)])],1)},r=[],n={data:function(){return{logoSrc:"http://s.thsi.cn/js/m/mobile/images/black-icon-white.png",exposureImg0Src:""}},methods:{handleImgExposure:function(t){var e=this;this.$toast("图片出现在可视区内，触发懒加载"),setTimeout((function(){e[t]=e.logoSrc}),300)},handleListExposure:function(t){this.$toast("list".concat(t?"出现":"消失","在可视区"))}}},u=n,i=s("2877"),a=Object(i["a"])(u,o,r,!1,null,null,null);e["default"]=a.exports}}]);