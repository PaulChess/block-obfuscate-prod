(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6369b3ba"],{b2f3:function(e,t,c){"use strict";c.r(t);var o=function(){var e=this,t=e.$createElement,c=e._self._c||t;return c("div",{staticClass:"example-checkbox"},[c("hxm-demo-block",{attrs:{title:"基础用法"}},[c("hxm-checkbox",{model:{value:e.basicCheckboxStatus,callback:function(t){e.basicCheckboxStatus=t},expression:"basicCheckboxStatus"}},[c("p",{staticClass:"checkbox-content"},[e._v("同步")])])],1),c("hxm-demo-block",{attrs:{title:"自定义尺寸"}},[c("hxm-checkbox",{attrs:{size:"0.32rem"},model:{value:e.customSizeCheckboxStatus,callback:function(t){e.customSizeCheckboxStatus=t},expression:"customSizeCheckboxStatus"}},[c("p",{staticClass:"checkbox-content"},[e._v("自定义尺寸")])])],1),c("hxm-demo-block",{attrs:{title:"自定义形状"}},[c("hxm-checkbox",{attrs:{shape:"rect"},model:{value:e.customShapeCheckboxStatus,callback:function(t){e.customShapeCheckboxStatus=t},expression:"customShapeCheckboxStatus"}},[c("p",{staticClass:"checkbox-content"},[e._v("复选框")])])],1),c("hxm-demo-block",{attrs:{title:"禁用复选框"}},[c("hxm-checkbox",{attrs:{disabled:""},model:{value:e.disabledCheckboxStatus,callback:function(t){e.disabledCheckboxStatus=t},expression:"disabledCheckboxStatus"}},[c("p",{staticClass:"checkbox-content"},[e._v("禁用复选框")])])],1),c("hxm-demo-block",{attrs:{title:"异步切换"}},[c("hxm-checkbox",{attrs:{checked:e.asyncCheckboxStatus},on:{change:e.handleAsyncCheckboxChange}},[c("p",{staticClass:"checkbox-content"},[e._v("1秒后切换")])])],1),c("hxm-demo-block",{attrs:{title:"复选框组"}},[c("hxm-checkbox-group",{model:{value:e.checkboxGroupValue,callback:function(t){e.checkboxGroupValue=t},expression:"checkboxGroupValue"}},[c("div",{staticClass:"checkbox-group-block"},[c("hxm-checkbox",{attrs:{name:"Foo"}},[c("p",{staticClass:"checkbox-content"},[e._v("Foo")])]),c("hxm-checkbox",{attrs:{name:"Bar"}},[c("p",{staticClass:"checkbox-content"},[e._v("Bar")])]),c("hxm-checkbox",{attrs:{name:"Main"}},[c("p",{staticClass:"checkbox-content"},[e._v("Main")])]),c("hxm-checkbox",{attrs:{name:"Sub"}},[c("p",{staticClass:"checkbox-content"},[e._v("Sub")])])],1)])],1),c("hxm-demo-block",{attrs:{title:"搭配单元格组件使用",card:!1}},[c("hxm-checkbox-group",{model:{value:e.checkboxCell,callback:function(t){e.checkboxCell=t},expression:"checkboxCell"}},e._l(e.serviceNameList,(function(t,o){return c("hxm-cell",{key:t.name,attrs:{title:t.title,clickable:""},on:{click:function(t){return e.toggleCheckbox(o)}}},[c("hxm-checkbox",{ref:"hxmCheckboxNode",refInFor:!0,attrs:{slot:"right",name:t.name,disableTransition:!0},slot:"right"})],1)})),1)],1)],1)},a=[],s={data:function(){return{basicCheckboxStatus:!1,customSizeCheckboxStatus:!1,customShapeCheckboxStatus:!1,disabledCheckboxStatus:!1,checkboxStatus:!1,asyncCheckboxStatus:!1,checkboxGroupValue:["Foo","Main"],checkboxCell:["mobile"],serviceNameList:[{name:"computer",title:"电脑客户端"},{name:"mobile",title:"手机客户端"},{name:"sns",title:"手机短信"}]}},methods:{handleAsyncCheckboxChange:function(e){var t=this;setTimeout((function(){t.asyncCheckboxStatus=e}),1e3)},toggleCheckbox:function(e){this.$refs.hxmCheckboxNode[e].handleClick()}}},h=s,l=(c("d28a"),c("2877")),n=Object(l["a"])(h,o,a,!1,null,null,null);t["default"]=n.exports},b8e4:function(e,t,c){},d28a:function(e,t,c){"use strict";c("b8e4")}}]);