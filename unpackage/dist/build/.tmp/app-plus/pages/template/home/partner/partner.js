(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/template/home/partner/partner"],{"03a7":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement;t._self._c},r=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return r})},5069:function(t,n,e){"use strict";e.r(n);var a=e("03a7"),r=e("5708");for(var o in r)"default"!==o&&function(t){e.d(n,t,function(){return r[t]})}(o);e("cc89");var u=e("2877"),c=Object(u["a"])(r["default"],a["a"],a["b"],!1,null,"6eed2d4f",null);n["default"]=c.exports},5708:function(t,n,e){"use strict";e.r(n);var a=e("ab07"),r=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(n,t,function(){return a[t]})}(o);n["default"]=r.a},"887b":function(t,n,e){},ab07:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=u(e("a34a")),r=u(e("e137")),o=u(e("ba90"));function u(t){return t&&t.__esModule?t:{default:t}}function c(t,n,e,a,r,o,u){try{var c=t[o](u),i=c.value}catch(s){return void e(s)}c.done?n(i):Promise.resolve(i).then(a,r)}function i(t){return function(){var n=this,e=arguments;return new Promise(function(a,r){var o=t.apply(n,e);function u(t){c(o,a,r,u,i,"next",t)}function i(t){c(o,a,r,u,i,"throw",t)}u(void 0)})}}var s=function(){return e.e("components/uni-icon/uni-icon").then(e.bind(null,"d227"))},l={components:{uniIcon:s},data:function(){return{partner:o.default,optionShow:!1,index:0,sendId:"",valueList:[],dataList:[],docx:[{title:"第一章 总则",item:[{content:"为了维护公司和合伙人利益，特制定本规则，公司股东及合伙人必须严格遵守。本规则中所涉及的集米宝用户均为实名认证用户。"},{content:"合伙人需年满十八周岁，并具有完全民事权利能力和完全民事行为能力的自然人。"},{content:"合伙人需遵守公司相关的规章制度，协助公司搞好市场，不得扰乱市场有序经营。"},{content:"合伙人之间的竞争冲突，以公司裁定为准。"},{content:"合伙人不得参与经营与本公司或其他合伙人竞争的业务。"},{content:"合伙人未经公司同意而转让其服务权益，所产生的后果自行负责。"},{content:"双方约定合伙期限到期的，可选择续期或者退伙。"},{content:"因违反合作机制契约精神，借用公司名义进行虚假宣传以谋取不正当利益的，给公司造成重大影响的，将追究合伙人的相关责任后并进行退伙处理。"}]},{title:"第二章 细则",item:[{content:"合伙人是根据省市县/区的层级划分来确定的，每个省市县/区有且只有一位。层级等级越高，合伙人的权益越大。"},{content:'合伙人分红是根据层级划分以及合伙人所处的层级以下实名认证账户进行定义的。合伙人层级等级越高，该层级以下用户人数越多，所得分红越多。合伙人所得分红=<span style="color: #f68728;">合伙人所处层级以下的其他所有已实名会员</span>每日定时赠送米粒总数x百分比<span style="color: #f68728;">（省/直辖市/自治区合伙人为1%，地级市/直辖市的区合伙人为3%，县/地级市的区合伙人为5%）</span> (具体情况根据市场进行变更，可在系统消息中查看)'}]}]}},onShow:function(){this.getData()},onNavigationBarButtonTap:function(n){t.navigateTo({url:"./partner-team"})},methods:{getData:function(){var t=i(a.default.mark(function t(){var n,e;return a.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,r.default.partner();case 2:n=t.sent,n.success&&(this.valueList=n.data,this.sendId=n.data[this.index].plocalnumber,e=n.data.map(function(t){return"".concat(t.partnername," - 时间").concat(t.validtime,"天 - 价格").concat(t.partnerprice,"kg")}),this.dataList=e);case 4:case"end":return t.stop()}},t,this)}));function n(){return t.apply(this,arguments)}return n}(),bindPickerChange:function(t){this.index=t.target.value,this.sendId=this.valueList[parseInt(t.target.value)].plocalnumber},partnerSend:function(){var n=i(a.default.mark(function n(){var e;return a.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,r.default.partnerAdd({plocalnumber:this.sendId});case 2:e=n.sent,e.success&&t.showToast({title:"申请成功！"});case 4:case"end":return n.stop()}},n,this)}));function e(){return n.apply(this,arguments)}return e}()}};n.default=l}).call(this,e("6e42")["default"])},cc89:function(t,n,e){"use strict";var a=e("887b"),r=e.n(a);r.a}},[["24b2","common/runtime","common/vendor"]]]);