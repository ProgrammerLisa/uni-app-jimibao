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
	}
}