(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4c066b11"],{"9ce6":function(t,n,e){},b7eb:function(t,n,e){"use strict";e("9ce6")},bcde:function(t,n,e){"use strict";e.r(n);var o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"example-dialog"},[e("hxm-demo-block",{attrs:{title:"基本用法"}},[e("hxm-cell",{attrs:{title:"提示弹窗"},on:{click:t.showDefaultDialog}}),e("hxm-cell",{attrs:{title:"提示弹窗(无标题)"},on:{click:t.showDefaultDialog2}})],1),e("hxm-demo-block",{attrs:{title:"按钮排列"}},[e("hxm-cell",{attrs:{title:"横向排列"},on:{click:t.showRowButton}}),e("hxm-cell",{attrs:{title:"纵向排列"},on:{click:t.showColumnButton}})],1),e("hxm-demo-block",{attrs:{title:"按钮样式"}},[e("hxm-cell",{attrs:{title:"提示弹窗"},on:{click:t.showControlStyle}})],1),e("hxm-demo-block",{attrs:{title:"关闭行为"}},[e("hxm-cell",{attrs:{title:"异步关闭"},on:{click:t.showAsyncClose}}),e("hxm-cell",{attrs:{title:"禁止关闭"},on:{click:t.showForbiddenClose}})],1),e("hxm-demo-block",{attrs:{title:"自定义渲染"}},[e("hxm-cell",{attrs:{title:"渲染组件"},on:{click:t.showRenderComponent}}),e("hxm-cell",{attrs:{title:"渲染render函数"},on:{click:t.showCustomRenderFunc}})],1)],1)},l=[],i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"hxm-custom-dialog"},[e("div",{staticClass:"counter"},[e("hxm-button",{on:{click:t.minus}},[t._v(" -1 ")]),e("span",{staticClass:"nums"},[t._v("count is "+t._s(t.count))]),e("hxm-button",{on:{click:t.plus}},[t._v(" +1 ")])],1),e("hxm-button",{staticClass:"cancel-btn",attrs:{round:"true",type:"plain"},on:{click:t.handleClose}},[t._v("关闭")])],1)},c=[],s={data:function(){return{count:0}},methods:{handleClose:function(){this.$dialog.close()},minus:function(){this.count--},plus:function(){this.count++}}},u=s,a=(e("b7eb"),e("2877")),h=Object(a["a"])(u,i,c,!1,null,"f57a6240",null),r=h.exports,f={methods:{showDefaultDialog:function(){this.$dialog({title:"标题",content:"代码写出来是给人看的",btns:[{text:"我知道了"}]})},showDefaultDialog2:function(){this.$dialog({content:"代码写出来是给人看的",btns:[{text:"我知道了"}]})},showRowButton:function(){this.$dialog({title:"标题",content:"确认是否要删除?",btns:[{text:"取消"},{text:"确认"}]})},showColumnButton:function(){this.$dialog({title:"标题",content:"代码写出来是给人看的，附带能够在机器上运行",btnDirection:"column",btns:[{text:"取消"},{text:"确认"}]})},showControlStyle:function(){this.$dialog({title:"标题",content:"代码写出来是人看的",btns:[{text:"取消",highlight:!0},{text:"确认",highlight:!1}]})},showAsyncClose:function(){this.$dialog({title:"标题",content:"代码写出来是人看的",asyncClose:!0,btns:[{text:"取消",callback:function(t){setTimeout((function(){t()}),1e3)}},{text:"确认",callback:function(t){setTimeout((function(){t()}),1e3)}}]})},showForbiddenClose:function(){this.$dialog({title:"禁止自动关闭",content:"过两秒后再关闭",autoClose:!1,btns:[{text:"我知道了",callback:function(t){setTimeout((function(){t()}),2e3)}}]})},showRenderComponent:function(){this.$dialog({innerRender:function(t){return t(r)}})},showCustomRenderFunc:function(){this.$dialog({title:"注意",innerRender:function(t){return t("div",{style:{color:"green",fontSize:"0.32rem",textAlign:"center"}},"自定义内容")},btns:[{text:"我知道了"}]})}}},m=f,d=(e("fee5"),Object(a["a"])(m,o,l,!1,null,null,null));n["default"]=d.exports},f09f:function(t,n,e){},fee5:function(t,n,e){"use strict";e("f09f")}}]);