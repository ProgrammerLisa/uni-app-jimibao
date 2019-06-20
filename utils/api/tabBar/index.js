import request from '@/utils/request/index'
export default {
	home (obj) {
		return request.post('/common/indexOfInfo', obj)
	},
	// 存入米库
	storage (obj, header) {
		return request.post('/fundFlow/rice/harvest', obj, header)
	},
	sendCode (obj, header) {
		return request.post('/firm/sendCode', obj, header)
	},
	// 官方信息
	phoneVersion (obj) {
		return request.get('/common/PhoneVersion', obj)
	},
	// 修改个人信息
	updateInfo (obj) {
		return request.post('/firm/addfirminfo', obj)
	},
	// 上传头像
	uploadImage (obj) {
		return request.post('/firm/addfirmheadImage', obj)
	},
	// 会员等级
	level (obj) {
		return request.get('/firm/firmlevel', obj)
	},
	// 抽奖
	lottery (obj) {
		return request.post('/prize/lottery_v13', obj)
	},
	// 奖池|规则
	lotteryPool (obj) {
		return request.get('/prize/pool', obj)
	},
	// 抽奖次数
	lotteryChance (obj) {
		return request.get('/prize/firmPrizeTimes', obj)
	},
	// 抽奖次数
	lotteryExchange (obj) {
		return request.post('/prize/exchange/' + obj)
	},
	// 会员流水信息
	TransactionRecord (obj) {
		return request.get('/firm/firmflows', obj)
	},
	// 会员积分余额
	AccountBalance (obj) {
		return request.get('/firm/firmfounds', obj)
	},
	address (obj) {
		return request.get('/firmaddress/firmaddress', obj)
	},
	addAddress (obj) {
		return request.post('/firmaddress/addfirmaddress', obj)
	},
	editAddress (obj) {
		return request.post('/firmaddress/updatefirmaddress', obj)
	},
	deleteAddress (obj) {
		return request.post('/firmaddress/delfirmaddress', obj)
	},
	// 反馈列表
	feedback (obj) {
		return request.get('/message/historicalMessage', obj)
	},
	addFeedback (obj) {
		return request.post('/message/addmessage', obj)
	},
	// 版本信息
	version (obj) {
		return request.get('/appversion/appversioninfo', obj)
	},
	// 获取银行列表
	bank (obj) {
		return request.get('/bank/bankinfo', obj)
	},
	// 激活鼓励金
	encourage (obj) {
		return request.post('/firm/activeEncourage', obj)
	},
	// 实名认证
	realName (obj) {
		return request.postJson('/firm/realNameByFaceCheck', obj)
	},
	// 我的团队
	team (obj) {
		return request.get('/firm/myteam', obj)
	},
	// 打赏
	reward (obj) {
		return request.post('/firm/reward/' + obj.number, obj)
	},
	// 订单
	order (obj) {
		return request.get('/order/mine/' + obj.sign, obj)
	},
	// 撤销订单
	revoke (obj) {
		return request.post('/order/delete/' + obj.orderid, obj)
	},
	// 根据订单获取聊天室id
	getChatIdByOrderId (obj) {
		return request.get('/chat/chatByOrderid/' + obj.orderid, obj)
	},
	// 首页消息-系统推送
	newsSystem (obj) {
		return request.get('/notice/findAllNotices', obj)
	},
	// 首页消息-个人接收的系统消息
	newsSystemSelf (obj) {
		return request.get('/chat/firmTipsInfo', obj)
	},
	// 获取所有工具
	tools (obj) {
		return request.get('/tool/findAllTools', obj)
	},
	// 获取我的工具
	toolMine (obj) {
		return request.get('/tool/firmtoolsInfo', obj)
	},
	// 兑换工具
	toolExchange (obj) {
		return request.post('/tool/exchangeTools', obj)
	},
	// 视频区-3/合作媒体-2/新手指南-1
	article (obj) {
		return request.get('/article/articleInfo', obj)
	},
	// 查询合伙人信息
	partner (obj) {
		return request.get('/partner/current', obj)
	},
	// 申请合伙人
	partnerAdd (obj) {
		return request.post('/partner/apply', obj)
	},
	// 查询合伙人信息
	partnerTeam (obj) {
		return request.get('/partner/getFirmPartnerInfo', obj)
	},
	// 交换列表
	exchangeList (obj) {
		return request.get('/order/' + obj.sign, obj)
	},
	// 发布订单
	exchangeSend (obj) {
		return request.post('/order/push/' + obj.sign, obj)
	},
	exchangeInfo (obj) {
		return request.get('/order/tradeInfo', obj)
	},
	// 交换
	exchange (obj) {
		return request.post('/order/' + obj.type + '/' + obj.orderid, obj)
	},
	// 批量抽奖所需
	batchNeedCount (obj) {
		return request.get('/prize/batchLottery/consumeNumber', obj)
	},
	// 批量抽奖
	batchLottery (obj) {
		return request.post('/prize/batchLottery', obj)
	},
	// 抽奖记录
	lotteryRecord (obj) {
		return request.get('/prize/firmFirmPrizeInfo', obj)
	},
	// 集米
	collet (obj) {
		return request.post('/steal/collect', obj)
	},
	// 被偷人
	uglyPerson (obj) {
		return request.get('/steal/searchMasters', obj)
	},
	// 小偷
	thief (obj) {
		return request.get('/steal/loseArchives', obj)
	},
	// 主动偷
	stoleActive (obj) {
		return request.post('/steal/justSteal', obj)
	},
	// 被动偷
	stolePassive (obj) {
		return request.post('/steal/revenge', obj)
	}
	
}