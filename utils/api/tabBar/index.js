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
	logout (obj, header) {
		return request.post('/firm/logout', obj, header)
	}
}