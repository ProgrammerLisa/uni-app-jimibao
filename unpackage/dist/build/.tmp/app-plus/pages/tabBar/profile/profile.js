(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabBar/profile/profile"],{"05b1":function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=d(a("a34a")),i=d(a("e9c0")),o=d(a("35ac")),r=d(a("2932")),l=d(a("deb8")),s=d(a("457f")),c=d(a("7016")),u=d(a("e137"));function d(e){return e&&e.__esModule?e:{default:e}}function f(e,t,a,n,i,o,r){try{var l=e[o](r),s=l.value}catch(c){return void a(c)}l.done?t(s):Promise.resolve(s).then(n,i)}function p(e){return function(){var t=this,a=arguments;return new Promise(function(n,i){var o=e.apply(t,a);function r(e){f(o,n,i,r,l,"next",e)}function l(e){f(o,n,i,r,l,"throw",e)}r(void 0)})}}var g=function(){return a.e("components/uni-icon/uni-icon").then(a.bind(null,"d227"))},h=function(){return a.e("components/uni-list/uni-list").then(a.bind(null,"94bd"))},w=function(){return a.e("components/uni-list-item/uni-list-item").then(a.bind(null,"713a"))},b={components:{uniIcon:g,uniList:h,uniListItem:w},data:function(){return{hot:l.default,diamond:s.default,gift:c.default,wave1:[i.default,i.default],wave2:[o.default,o.default],defaultAvatar:r.default,imageUrl:"",userInfo:{},servicePhone:{},extraIcon1:{color:"#007aff",size:"22",type:"info-filled"},levelList:[{title:"会员等级",type:"level",icon:s.default,text:""},{title:"活跃值",type:"active",icon:l.default,text:""},{title:"贡献值",type:"contribution",icon:c.default,text:""}],topList:[{title:"抽奖",type:"lottery",icon:"spinner",url:"/pages/template/profile/topList-lottery/topList-lottery"},{title:"订单",type:"order",icon:"compose",url:"/pages/template/profile/topList-order/topList-order"},{title:"团队",type:"team",icon:"contact",url:"/pages/template/profile/topList-team/topList-team"},{title:"鼓励金",type:"encourage",icon:"circle-filled",url:"/pages/template/profile/topList-encourage/topList-encourage"}],list:[{title:"米库总量",type:"sum",showArrow:!0,showExtraIcon:!0,extraIcon:{color:"#a1adc1",size:"22",type:"star-filled"},showBadge:!0,badgeText:null,badgeType:"warning",runningWay:"goPage",path:"/pages/template/profile/list-sum/list-sum"},{title:"实名认证",type:"realName",showArrow:!0,showExtraIcon:!0,extraIcon:{color:"#a1adc1",size:"22",type:"personadd-filled"},showBadge:!0,badgeText:null,badgeType:"warning",runningWay:"goPage",path:"/pages/template/profile/list-real-name/list-real-name"},{title:"收货地址",type:"address",showArrow:!0,showExtraIcon:!0,extraIcon:{color:"#a1adc1",size:"22",type:"location-filled"},showBadge:!1,badgeText:null,badgeType:"warning",runningWay:"goPage",path:"/pages/template/profile/list-address/list-address"},{title:"问题反馈",type:"feedback",showArrow:!0,showExtraIcon:!0,extraIcon:{color:"#a1adc1",size:"22",type:"help-filled"},showBadge:!1,badgeText:null,badgeType:"warning",runningWay:"goPage",path:"/pages/template/profile/list-feedback/list-feedback"},{title:"检测版本",type:"edition",showArrow:!0,showExtraIcon:!0,extraIcon:{color:"#a1adc1",size:"22",type:"info-filled"},showBadge:!0,badgeText:null,badgeType:"warning",runningWay:"goPage",path:"/pages/template/profile/list-edition/list-edition"},{title:"客服微信",type:"wechat",showArrow:!1,showExtraIcon:!0,extraIcon:{color:"#a1adc1",size:"22",type:"weixin"},showBadge:!0,badgeText:null,badgeType:"default",runningWay:"copy"},{title:"客服热线",type:"phone",showArrow:!1,showExtraIcon:!0,extraIcon:{color:"#a1adc1",size:"22",type:"phone-filled"},showBadge:!0,badgeText:null,badgeType:"default",runningWay:"dialPhone"}]}},onLoad:function(){this.getData(),this.getListData(),this.imageUrl=this.$imageUrl},onReady:function(){},methods:{getData:function(){var e=p(n.default.mark(function e(){var t,a=this;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.default.home();case 2:t=e.sent,t.success&&(this.userInfo=t.data.TFirmPO,this.levelList.forEach(function(e){switch(e.type){case"level":e.text="Lv"+a.userInfo.levelid;break;case"active":e.text=a.userInfo.activevalue;break;case"contribution":e.text=a.userInfo.contribution;break}}),this.list.forEach(function(e){switch(e.type){case"sum":e.badgeText=t.data.FirmFunds.lastbalance;break;case"edition":e.badgeText="当前版本： "+a.$version;break}}));case 4:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),getListData:function(){var e=p(n.default.mark(function e(){var t;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.default.phoneVersion();case 2:t=e.sent,t.success&&(this.servicePhone=t.data,this.list.forEach(function(e){switch(e.type){case"wechat":e.badgeText=t.data.wechat;break;case"phone":e.badgeText=t.data.telphone}}));case 4:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),goSetting:function(){e.navigateTo({url:"/pages/template/profile/setting/setting"})},goSetInfo:function(){e.navigateTo({url:"/pages/template/profile/info/info"})},goLevel:function(){e.navigateTo({url:"/pages/template/profile/level/level"})},goToplist:function(t){e.navigateTo({url:this.topList[t].url})},running:function(t){var a=this.list[t];switch(a.runningWay){case"copy":e.setClipboardData({data:a.badgeText,success:function(){e.showToast({title:"复制成功"})},fail:function(){e.showToast({title:"复制失败",icon:"none"})}});break;case"dialPhone":e.makePhoneCall({phoneNumber:a.badgeText,fail:function(){e.showToast({title:"调用手机拨号失败，请手动输入号码拨号",icon:"none"})}});break;case"goPage":e.navigateTo({url:a.path});break}}}};t.default=b}).call(this,a("6e42")["default"])},"0edc":function(e,t,a){"use strict";var n=a("ee41"),i=a.n(n);i.a},"247a":function(e,t,a){"use strict";a.r(t);var n=a("05b1"),i=a.n(n);for(var o in n)"default"!==o&&function(e){a.d(t,e,function(){return n[e]})}(o);t["default"]=i.a},a3d6:function(e,t,a){"use strict";a.r(t);var n=a("ff54"),i=a("247a");for(var o in i)"default"!==o&&function(e){a.d(t,e,function(){return i[e]})}(o);a("0edc");var r=a("2877"),l=Object(r["a"])(i["default"],n["a"],n["b"],!1,null,"2388fad0",null);t["default"]=l.exports},ee41:function(e,t,a){},ff54:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement;e._self._c},i=[];a.d(t,"a",function(){return n}),a.d(t,"b",function(){return i})}},[["2118","common/runtime","common/vendor"]]]);