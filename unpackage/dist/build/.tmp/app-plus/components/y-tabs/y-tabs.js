(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/y-tabs/y-tabs"],{1407:function(t,e,n){"use strict";var a=n("6954"),i=n.n(a);i.a},"216d":function(t,e,n){"use strict";n.r(e);var a=n("857a"),i=n("b041");for(var u in i)"default"!==u&&function(t){n.d(e,t,function(){return i[t]})}(u);n("1407");var r=n("2877"),o=Object(r["a"])(i["default"],a["a"],a["b"],!1,null,"6a27c8aa",null);e["default"]=o.exports},"663d":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={props:{tabList:Array,tabColor:{type:String,default:"#424242"},textColor:{type:String,default:"#c9c9c9"},lineColor:{type:String,default:"#7f7f7f"},activeTextColor:{type:String,default:"#fff"},activeBgColor:{type:String,default:"#333"},position:{type:String,default:"relative"},top:{type:String,default:"0"},paddingTop:{type:String,default:"0"},zIndex:{type:Number,default:10},active:Number},data:function(){return{sub:0,list:this.tabList}},onLoad:function(){this.sub=this.active},watch:{active:function(t){this.sub=t},tabList:function(t){this.list=t}},methods:{changeTabs:function(t){this.$emit("changeTabs",t)}}};e.default=a},6954:function(t,e,n){},"857a":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},b041:function(t,e,n){"use strict";n.r(e);var a=n("663d"),i=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,function(){return a[t]})}(u);e["default"]=i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/y-tabs/y-tabs-create-component',
    {
        'components/y-tabs/y-tabs-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("216d"))
        })
    },
    [['components/y-tabs/y-tabs-create-component']]
]);                
