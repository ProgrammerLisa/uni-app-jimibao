(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/template/profile/address/address"],{"6e4e":function(t,n,e){"use strict";var i=e("9d51"),u=e.n(i);u.a},"8ba4":function(t,n,e){"use strict";e.r(n);var i=e("8dce"),u=e("f94c");for(var a in u)"default"!==a&&function(t){e.d(n,t,function(){return u[t]})}(a);e("6e4e");var r=e("2877"),o=Object(r["a"])(u["default"],i["a"],i["b"],!1,null,"6b1e13d6",null);n["default"]=o.exports},"8dce":function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement;t._self._c;t._isMounted||(t.e0=function(n){t.show=!1})},u=[];e.d(n,"a",function(){return i}),e.d(n,"b",function(){return u})},"9d51":function(t,n,e){},b7c5:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=r(e("a34a")),u=r(e("e137")),a=r(e("2932"));function r(t){return t&&t.__esModule?t:{default:t}}function o(t,n,e,i,u,a,r){try{var o=t[a](r),s=o.value}catch(c){return void e(c)}o.done?n(s):Promise.resolve(s).then(i,u)}function s(t){return function(){var n=this,e=arguments;return new Promise(function(i,u){var a=t.apply(n,e);function r(t){o(a,i,u,r,s,"next",t)}function s(t){o(a,i,u,r,s,"throw",t)}r(void 0)})}}var c=function(){return e.e("components/uni-icon/uni-icon").then(e.bind(null,"d227"))},d=function(){return e.e("components/uni-tag/uni-tag").then(e.bind(null,"dff8"))},f=function(){return e.e("components/uni-swipe-action/uni-swipe-action").then(e.bind(null,"c880"))},l=function(){return e.e("components/y-confirm/y-confirm").then(e.bind(null,"762f"))},h={components:{uniIcon:c,uniSwipeAction:f,uniTag:d,yConfirm:l},data:function(){return{defaultImage:a.default,dataList:[],options:[{text:"删除",style:{backgroundColor:"#dd524d"}}],show:!1,deleteForm:{}}},onShow:function(){this.getData()},methods:{getData:function(){var t=s(i.default.mark(function t(){var n;return i.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,u.default.address();case 2:n=t.sent,n.success&&(this.dataList=n.data.list);case 4:case"end":return t.stop()}},t,this)}));function n(){return t.apply(this,arguments)}return n}(),goAdd:function(){t.navigateTo({url:"../address-add/address-add"})},goEdit:function(n){t.navigateTo({url:"../address-add/address-add?type=edit&value=".concat(JSON.stringify(n))})},bindClick:function(t){this.deleteForm=this.dataList[t],this.show=!0},deleteAddress:function(){var n=s(i.default.mark(function n(){var e;return i.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return this.show=!1,n.next=3,u.default.deleteAddress(this.deleteForm);case 3:e=n.sent,e.success&&(this.getData(),setTimeout(function(){t.showToast({title:"成功删除地址"})},500));case 5:case"end":return n.stop()}},n,this)}));function e(){return n.apply(this,arguments)}return e}()}};n.default=h}).call(this,e("6e42")["default"])},f94c:function(t,n,e){"use strict";e.r(n);var i=e("b7c5"),u=e.n(i);for(var a in i)"default"!==a&&function(t){e.d(n,t,function(){return i[t]})}(a);n["default"]=u.a}},[["ad04","common/runtime","common/vendor"]]]);