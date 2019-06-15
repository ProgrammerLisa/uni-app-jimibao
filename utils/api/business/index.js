import request from '@/utils/request/index'
export default {
	// 商品列表
	list (obj) {
		return request.get('/shop/production', obj)
	},
	// 购买商品
	pay (obj) {
		return request.post('/shop/production/' + obj.productionid, obj)
	},
	// 商品订单列表
	order (obj) {
		return request.get('/shop/productionorder', obj)
	}
}
