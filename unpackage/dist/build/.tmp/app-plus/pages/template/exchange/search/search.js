(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/template/exchange/search/search"],{"0388":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(n("a34a")),o=r(n("e137")),s=r(n("c3b0")),i=r(n("2932"));function r(t){return t&&t.__esModule?t:{default:t}}function c(t,e,n,a,o,s,i){try{var r=t[s](i),c=r.value}catch(u){return void n(u)}r.done?e(c):Promise.resolve(c).then(a,o)}function u(t){return function(){var e=this,n=arguments;return new Promise(function(a,o){var s=t.apply(e,n);function i(t){c(s,a,o,i,r,"next",t)}function r(t){c(s,a,o,i,r,"throw",t)}i(void 0)})}}var l=function(){return Promise.all([n.e("common/vendor"),n.e("components/mescroll-uni/mescroll-uni")]).then(n.bind(null,"5d2a"))},h=function(){return n.e("components/y-confirm/y-pay-confirm").then(n.bind(null,"8e27"))},f={components:{uniMescroll:l,yPayConfirm:h},data:function(){return{avatar:i.default,phone:"",type:"",sign:null,show:!1,payShow:!1,pay:{},password:"",balance:"",mescroll:null,downOption:{use:!0,auto:!0},upOption:{use:!0,auto:!0,isLock:!1,page:{num:0,size:10},noMoreSize:9,empty:{tip:"暂无相关数据"}},dataList:[]}},onReachBottom:function(){this.mescroll&&this.mescroll.onReachBottom()},onPageScroll:function(t){this.mescroll&&this.mescroll.onPageScroll(t)},onShow:function(){this.getData()},methods:{getData:function(){var t=u(a.default.mark(function t(){var e;return a.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,o.default.AccountBalance();case 2:e=t.sent,e.success&&(this.balance=e.data.balance);case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),typeChange:function(t){this.type=t.detail.value},search:function(){var e=this;return this.phone?s.default.phone.test(this.phone)?this.type?("buy"===this.type?this.sign=1:"sell"===this.type&&(this.sign=2),this.show=!1,void setTimeout(function(){e.show=!0},200)):(t.showToast({title:"请选择订单类型",icon:"none"}),!1):(t.showToast({title:"手机号码格式不正确",icon:"none"}),!1):(t.showToast({title:"请输入手机号码",icon:"none"}),!1)},openPay:function(t){this.pay=t,this.payShow=!0},exchange:function(){var e=u(a.default.mark(function e(){var n,s;return a.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(this.password){e.next=3;break}return t.showToast({title:"请输入密码",icon:"none"}),e.abrupt("return",!1);case 3:return n=1===this.pay.sign?"sell":"buy",e.next=6,o.default.exchange({type:n,orderid:this.pay.orderid,owner:this.pay.firmid,tradepassword:this.password});case 6:s=e.sent,this.payShow=!1,s.success&&(this.existCheck(),t.showToast({title:"兑换成功"}));case 9:case"end":return e.stop()}},e,this)}));function n(){return e.apply(this,arguments)}return n}(),existCheck:function(){var t=this;this.dataList.forEach(function(e){(t.pay=e)&&(e.exist=!0)})},mescrollInit:function(t){this.mescroll=t},downCallback:function(t){t.resetUpScroll()},upCallback:function(){var t=u(a.default.mark(function t(e){var n,s,i,r,c,u=this;return a.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=e.num,s=e.size,t.next=4,o.default.exchangeList({page:n,size:s,sign:this.sign,search:this.phone});case 4:i=t.sent,i.success?(r=i.data.list,i.data.total,c=i.data.hasNextPage,setTimeout(function(){e.endSuccess(r.length,c),1===e.num&&(u.dataList=[]),u.dataList=u.dataList.concat(r)},500)):e.endErr();case 6:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()}};e.default=f}).call(this,n("6e42")["default"])},"2e27":function(t,e,n){"use strict";var a=n("9c8d"),o=n.n(a);o.a},"542a":function(t,e,n){"use strict";n.r(e);var a=n("0388"),o=n.n(a);for(var s in a)"default"!==s&&function(t){n.d(e,t,function(){return a[t]})}(s);e["default"]=o.a},"98c3":function(t,e,n){"use strict";n.r(e);var a=n("feb4"),o=n("542a");for(var s in o)"default"!==s&&function(t){n.d(e,t,function(){return o[t]})}(s);n("2e27");var i=n("2877"),r=Object(i["a"])(o["default"],a["a"],a["b"],!1,null,"66b90fb0",null);e["default"]=r.exports},"9c8d":function(t,e,n){},feb4:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.payShow=!1})},o=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return o})}},[["18e7","common/runtime","common/vendor"]]]);