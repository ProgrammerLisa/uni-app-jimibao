import request from '@/utils/request/index'
export default {
	login (obj, header) {
		return request.post('/firm/login', obj, header)
	},
	register (obj, header) {
		return request.post('/firm/register', obj, header)
	},
	sendCode (obj) {
		return request.post('/firm/sendCode', obj)
	},
	logout (obj, header) {
		return request.post('/firm/logout', obj, header)
	},
	forgetLoginPwd (obj) {
		return request.post('/firmpassword/resetLoginPawwoord', obj)
	},
	forgetTreadPwd (obj) {
		return request.post('/firmpassword/resetTreadPawwoord', obj)
	},
	updateLoginPwd (obj) {
		return request.post('/firmpassword/updateLoginPawwoord', obj)
	},
	updateTreadPwd (obj) {
		return request.post('/firmpassword/updateTreadPawwoord', obj)
	}
}