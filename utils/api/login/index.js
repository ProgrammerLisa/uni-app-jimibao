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
	}
}