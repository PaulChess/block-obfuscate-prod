(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2bf33ed6"],{"8f8e":function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"example-pullrefresh"},[s("hxm-demo-block",[s("div",{staticClass:"refresh-times text-primary"},[e._v(" 刷新次数: "+e._s(e.refreshTimes)+" ")]),s("hxm-tabs",{attrs:{type:"slide",swipeable:!1},on:{toggleTab:e.toggleTab}},[s("hxm-tab-panel",{attrs:{title:"基础用法",name:"basic"}}),s("hxm-tab-panel",{attrs:{title:"自定义提示",name:"custom"}})],1),"basic"===e.currTabName?[s("div",{staticClass:"pullrefresh"},[s("hxm-pull-refresh",{attrs:{successText:e.successText},on:{refresh:e.refresh},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},[s("ul",{staticClass:"demo-list"},e._l(e.listData,(function(t,a){return s("li",{key:a,staticClass:"list-item"},[e._v(" "+e._s(t)+" ")])})),0)])],1)]:e._e(),"custom"===e.currTabName?[s("div",{staticClass:"pullrefresh"},[s("hxm-pull-refresh",{on:{refresh:e.refresh},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},[s("template",{slot:"pulling"},[s("div",[e._v("自定义下拉")])]),s("template",{slot:"loosing"},[s("div",[e._v("自定义释放")])]),s("template",{slot:"loading"},[s("div",[e._v("自定义加载")])]),s("template",{slot:"success"},[s("div",{staticClass:"success-block"},[e._v(" 已更新10条数据 ")])]),s("ul",{staticClass:"demo-list"},e._l(e.listData,(function(t,a){return s("li",{key:a,staticClass:"list-item"},[e._v(" "+e._s(t)+" ")])})),0)],2)],1)]:e._e()],2)],1)},l=[],i={name:"PullRefreshDemo",data:function(){return{refreshTimes:0,updateNums:15,listData:[],currTabName:"basic",loading:!1}},computed:{successText:function(){return"更新了".concat(this.updateNums,"条内容")}},created:function(){this.getData()},methods:{getData:function(){for(var e=0;e<20;e++)this.listData.push("列表内容 ".concat(e+1))},refresh:function(){var e=this;setTimeout((function(){e.refreshTimes++,e.loading=!1}),3e3)},toggleTab:function(e){this.currTabName=e}}},n=i,r=(s("eadc"),s("2877")),c=Object(r["a"])(n,a,l,!1,null,null,null);t["default"]=c.exports},eadc:function(e,t,s){"use strict";s("fd05")},fd05:function(e,t,s){}}]);