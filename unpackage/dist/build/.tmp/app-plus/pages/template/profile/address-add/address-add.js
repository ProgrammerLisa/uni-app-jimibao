(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/template/profile/address-add/address-add"],{"69e2":function(t,e,n){"use strict";n.r(e);var r=n("c1d0"),s=n("ea00");for(var a in s)"default"!==a&&function(t){n.d(e,t,function(){return s[t]})}(a);n("d413");var u=n("2877"),o=Object(u["a"])(s["default"],r["a"],r["b"],!1,null,"8909d6ca",null);e["default"]=o.exports},bd0c:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a(n("a34a")),s=a(n("e137"));function a(t){return t&&t.__esModule?t:{default:t}}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.forEach(function(e){o(t,e,n[e])})}return t}function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t,e,n,r,s,a,u){try{var o=t[a](u),i=o.value}catch(c){return void n(c)}o.done?e(i):Promise.resolve(i).then(r,s)}function c(t){return function(){var e=this,n=arguments;return new Promise(function(r,s){var a=t.apply(e,n);function u(t){i(a,r,s,u,o,"next",t)}function o(t){i(a,r,s,u,o,"throw",t)}u(void 0)})}}var f=function(){return Promise.all([n.e("common/vendor"),n.e("components/mpvue-citypicker/mpvueCityPicker")]).then(n.bind(null,"e4c6"))},d={components:{mpvueCityPicker:f},data:function(){return{themeColor:"#007AFF",cityPickerValueDefault:[0,0,1],form:{location:""},type:"add"}},onLoad:function(e){if("edit"===e.type){this.type=e.type,t.setNavigationBarTitle({title:"编辑地址"});var n=JSON.parse(e.value);1===n.status?n.status=!0:n.status=!1,this.form=n}},methods:{goBack:function(){t.navigateBack()},onCancel:function(t){},onConfirm:function(t){this.form.location=t.label},showMulLinkageThreePicker:function(){this.$refs.mpvueCityPicker.show()},checkboxChange:function(t){t.detail.value.length>0?this.form.status=!0:this.form.status=!1},formSubmit:function(t){if(this.checkForm(t.detail.value)){var e=t.detail.value;this.form.status?e.status=1:e.status=0,this.sendForm(e)}},sendForm:function(){var e=c(r.default.mark(function e(n){var a,o,i,c=this;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return o=n,"add"===this.type?a=s.default.addAddress:(a=s.default.editAddress,o=u({},n,{addressid:this.form.addressid})),e.next=4,a(o);case 4:i=e.sent,i.success&&(t.showToast({title:"操作成功"}),setTimeout(function(){c.goBack()},500));case 6:case"end":return e.stop()}},e,this)}));function n(t){return e.apply(this,arguments)}return n}(),checkForm:function(e){var n,r=this;for(var s in e){var a=r.checkItem(s,e[s]);if(!a.status)return t.showToast({title:a.message,icon:"none"}),!1;n=!0}return n},checkItem:function(t,e){switch(t){case"addressee":return e?e.length<2||e.length>15?{status:!1,message:"姓名不正确"}:{status:!0}:{status:!1,message:"请输入姓名"};case"phone":return e?e.length>7?{status:!0}:{status:!1,message:"号码不少于7位"}:{status:!1,message:"请输入电话号码"};case"location":return e?{status:!0}:{status:!1,message:"请选择地区"};case"address":return e?{status:!0}:{status:!1,message:"请输入详细地址"};case"status":return{status:!0}}}}};e.default=d}).call(this,n("6e42")["default"])},c1d0:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement;t._self._c},s=[];n.d(e,"a",function(){return r}),n.d(e,"b",function(){return s})},d413:function(t,e,n){"use strict";var r=n("d5de"),s=n.n(r);s.a},d5de:function(t,e,n){},ea00:function(t,e,n){"use strict";n.r(e);var r=n("bd0c"),s=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,function(){return r[t]})}(a);e["default"]=s.a}},[["7994","common/runtime","common/vendor"]]]);