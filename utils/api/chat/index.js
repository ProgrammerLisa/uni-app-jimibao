import request from '@/utils/request/index'
export default {
	// 联系人
	contacts (obj) {
		return request.get('/chat/OneToMany', obj)
	},
	// 聊天记录
	record (obj) {
		return request.get('/chat/onetoone/' + obj.id, obj)
	},
	// 获取本人信息
	getInfo (obj) {
		return request.get('/firm/logininfo', obj)
	}
}
