(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/template/profile/edition/edition"],{"0cc2":function(t,e,n){"use strict";n.r(e);var o=n("d373"),i=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,function(){return o[t]})}(a);e["default"]=i.a},"8b5c":function(t,e,n){"use strict";n.r(e);var o=n("8f17"),i=n("0cc2");for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);n("9dae");var r=n("2877"),u=Object(r["a"])(i["default"],o["a"],o["b"],!1,null,"1a09d94b",null);e["default"]=u.exports},"8f17":function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return i})},9178:function(t,e,n){},"9dae":function(t,e,n){"use strict";var o=n("9178"),i=n.n(o);i.a},d373:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=r(n("a34a")),i=r(n("7d61")),a=r(n("e137"));function r(t){return t&&t.__esModule?t:{default:t}}function u(t,e,n,o,i,a,r){try{var u=t[a](r),s=u.value}catch(d){return void n(d)}u.done?e(s):Promise.resolve(s).then(o,i)}function s(t){return function(){var e=this,n=arguments;return new Promise(function(o,i){var a=t.apply(e,n);function r(t){u(a,o,i,r,s,"next",t)}function s(t){u(a,o,i,r,s,"throw",t)}r(void 0)})}}var d={data:function(){return{logo:i.default,description:"",update:!1,content:"",info:{},doUpdate:!1,speed:0,updateLength:0,allLength:0}},onLoad:function(){var e=this;t.getSystemInfo({success:function(t){e.description=t.platform,e.getData()},fail:function(e){t.showToast({title:"无法获取设备信息"})}})},methods:{getData:function(){var t=s(o.default.mark(function t(){var e;return o.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,a.default.version({description:this.description,versionname:this.$version});case 2:e=t.sent,e.success&&(e.data.update?this.update=!0:this.update=!1,e.data.update&&(this.info=e.data.versions[0]));case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),sendUpdate:function(){var t=this;"ios"===this.description?plus.runtime.openURL(t.info.downloadurl):"android"===this.description&&this.AndroidCheckUpdate()},AndroidCheckUpdate:function(){var e=this,n=t.downloadFile({url:e.info.downloadurl,success:function(e){200===e.statusCode&&plus.runtime.install(e.tempFilePath,{},function(){},function(e){t.showToast({title:"安装失败",mask:!1,duration:1500})})},fail:function(){t.showToast({title:"下载失败",icon:"none"}),e.doUpdate=!1}});n.onProgressUpdate(function(t){e.doUpdate=!0,e.speed=t.progress,e.updateLength=(t.totalBytesWritten/1024/1024).toFixed(2),e.allLength=(t.totalBytesExpectedToWrite/1024/1024).toFixed(2),100===t.progress&&(e.doUpdate=!1)})}}};e.default=d}).call(this,n("6e42")["default"])}},[["3e56","common/runtime","common/vendor"]]]);