(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7c396036"],{"2fb8":function(t,s,o){"use strict";o.r(s);var a=function(){var t=this,s=t.$createElement,o=t._self._c||s;return o("div",{staticClass:"example-toast"},[o("hxm-demo-block",{attrs:{title:"基础用法"}},[o("hxm-cell",{attrs:{title:"文字提示"},on:{click:t.showDefaultToast}})],1),o("hxm-demo-block",{attrs:{title:"设置展示时间"}},[o("hxm-cell",{attrs:{title:"展示 1s"},on:{click:t.showDurationToast}})],1),o("hxm-demo-block",{attrs:{title:"设置Toast层级"}},[o("hxm-cell",{attrs:{title:"zIndex 100"},on:{click:t.showZindexToast}})],1),o("hxm-demo-block",{attrs:{title:"提示类型"}},[o("hxm-cell",{attrs:{title:"成功提示"},on:{click:t.showSuccessToast}}),o("hxm-cell",{attrs:{title:"失败提示"},on:{click:t.showFailToast}}),o("hxm-cell",{attrs:{title:"警告提示"},on:{click:t.showWarningToast}})],1),o("hxm-demo-block",{attrs:{title:"自定义Html代码段"}},[o("hxm-cell",{attrs:{title:"自定义代码段"},on:{click:t.showCustomToast}})],1)],1)},l=[],e={methods:{showDefaultToast:function(){this.$toast("文字提示")},showDurationToast:function(){this.$toast("展示时长为1s",{duration:1e3})},showZindexToast:function(){this.$toast("设置z-index为100",{zIndex:100})},showSuccessToast:function(){this.$toast.success("成功文案")},showFailToast:function(){this.$toast.error("失败文案")},showWarningToast:function(){this.$toast.warn("警告文案")},showCustomToast:function(){this.$toast("一个<em>内容</em>为<br>html<br>字符串的 Toast")}}},i=e,c=(o("3246"),o("2877")),n=Object(c["a"])(i,a,l,!1,null,null,null);s["default"]=n.exports},3246:function(t,s,o){"use strict";o("5903")},5903:function(t,s,o){}}]);