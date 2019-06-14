(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/y-tabs/y-tabs"],{"216d":function(t,e,n){"use strict";n.r(e);var a=n("dcae"),i=n("b041");for(var u in i)"default"!==u&&function(t){n.d(e,t,function(){return i[t]})}(u);n("3628");var r=n("2877"),o=Object(r["a"])(i["default"],a["a"],a["b"],!1,null,"aa465486",null);e["default"]=o.exports},3628:function(t,e,n){"use strict";var a=n("73ae"),i=n.n(a);i.a},"663d":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={props:{tabList:Array,tabColor:{type:String,default:"#fff"},textColor:{type:String,default:"#333"},lineColor:{type:String,default:"red"},activeTextColor:{type:String,default:"red"},activeBgColor:{type:String,default:"#777"},active:Number},data:function(){return{sub:0,list:this.tabList}},onLoad:function(){this.sub=this.active},watch:{active:function(t){this.sub=t},tabList:function(t){this.list=t}},methods:{changeTabs:function(t){this.$emit("changeTabs",t)}}};e.default=a},"73ae":function(t,e,n){},b041:function(t,e,n){"use strict";n.r(e);var a=n("663d"),i=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,function(){return a[t]})}(u);e["default"]=i.a},dcae:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/y-tabs/y-tabs-create-component',
    {
        'components/y-tabs/y-tabs-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("216d"))
        })
    },
    [['components/y-tabs/y-tabs-create-component']]
]);                
