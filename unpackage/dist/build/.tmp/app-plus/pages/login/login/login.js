(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login/login"],{"02e2":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=s(n("a34a")),r=s(n("7d61")),a=s(n("c3b0")),u=s(n("7cc9"));function s(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n,o,r,a,u){try{var s=e[a](u),i=s.value}catch(c){return void n(c)}s.done?t(i):Promise.resolve(i).then(o,r)}function c(e){return function(){var t=this,n=arguments;return new Promise(function(o,r){var a=e.apply(t,n);function u(e){i(a,o,r,u,s,"next",e)}function s(e){i(a,o,r,u,s,"throw",e)}u(void 0)})}}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){f(e,t,n[t])})}return e}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var d={data:function(){return{logo:r.default,pickerHidden:!0,chosen:"",showPassword:!0,showClearIcon:!1,inputClearValue:"",phoneInfo:{}}},onLoad:function(){var t=this;e.getStorage({key:"user",success:function(n){n.data&&(t.myId=n.data.firmid,setTimeout(function(){e.switchTab({url:"/pages/tabBar/home/home"})},500))}}),plus&&(this.phoneInfo={model:plus.device.model,vendor:plus.device.vendor,imei:plus.device.imei,uuid:plus.device.uuid})},methods:{formSubmit:function(e){var t=this,n={};this.checkForm(e.detail.value)&&(a.default.phone.test(e.detail.value.phone)?this.sendFormRequest(l({},e.detail.value,{firmDevice:t.phoneInfo})):(n={account:e.detail.value.phone,password:e.detail.value.password,firmDevice:t.phoneInfo},this.sendFormRequest(n)))},sendFormRequest:function(){var t=c(o.default.mark(function t(n){var r,a;return o.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return r=this,t.next=3,u.default.login(n);case 3:a=t.sent,a.success&&e.setStorage({key:"user",data:a.data,success:function(){e.showToast({title:"登录成功"}),e.connectSocket({url:r.$socketUrl+a.data.firmid}),setTimeout(function(){e.switchTab({url:"/pages/tabBar/home/home"})},500)}});case 5:case"end":return t.stop()}},t,this)}));function n(e){return t.apply(this,arguments)}return n}(),checkForm:function(t){var n,o=this;for(var r in t){var a=o.checkItem(r,t[r]);if(!a.status)return e.showToast({title:a.message,icon:"none"}),!1;n=!0}return n},checkItem:function(e,t){switch(e){case"phone":return t?{status:!0}:{status:!1,message:"请输入手机号码"};case"password":return t?{status:!0}:{status:!1,message:"请输入密码"}}},clearIcon:function(){this.inputClearValue="",this.showClearIcon=!1},clearInput:function(e){this.inputClearValue=e.target.value,e.target.value.length>0?this.showClearIcon=!0:this.showClearIcon=!1},toForgetPassword:function(){e.navigateTo({url:"/pages/login/forget-password/forget-password"})},toRegister:function(){e.navigateTo({url:"/pages/login/register/register"})}}};t.default=d}).call(this,n("6e42")["default"])},"1f75":function(e,t,n){"use strict";n.r(t);var o=n("02e2"),r=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,function(){return o[e]})}(a);t["default"]=r.a},"32cc":function(e,t,n){},"37eb":function(e,t,n){},"3db5":function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.showPassword=!e.showPassword})},r=[];n.d(t,"a",function(){return o}),n.d(t,"b",function(){return r})},a9ff:function(e,t,n){"use strict";n.r(t);var o=n("3db5"),r=n("1f75");for(var a in r)"default"!==a&&function(e){n.d(t,e,function(){return r[e]})}(a);n("e262"),n("eb73");var u=n("2877"),s=Object(u["a"])(r["default"],o["a"],o["b"],!1,null,"7123c7a0",null);t["default"]=s.exports},e262:function(e,t,n){"use strict";var o=n("37eb"),r=n.n(o);r.a},eb73:function(e,t,n){"use strict";var o=n("32cc"),r=n.n(o);r.a}},[["4b3f","common/runtime","common/vendor"]]]);