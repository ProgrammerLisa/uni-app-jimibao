import dataUrl from '@/utils/request/config.js'
import store from '@/utils/store/index.js'
function checkStatus (response) {
	uni.hideLoading()
	if (response[1]) {
		if (response[1].statusCode === 200 || response.statusCode[1] === 304) {
			return response[1].data
		} else {
			return {
				success: false,
				message: '网络异常 请稍后再试'
			}
		}
	} else {
		return {
			success: false,
			message: '网络异常 请稍后再试'
		}
	}
}
function checkCode (res) {
	if (res.code === 403) {
		uni.removeStorage({
			key: 'user',
			success: function (res) {
				uni.reLaunch({
					url: '/pages/login/login/login'
				})
			}
		})
	}
	if (!res.success) {
		uni.showToast({
			title: res.message,
			icon: 'none',
			duration: 2000
		})
		return res
	} else {
		return res
	}
}
export default {
	post (url, data, header =  null) {
		uni.showLoading({
			mask: true
		})
		var Authorization
		uni.getStorage({
			key: 'user',
			success: function(res){
				Authorization = res.data.token
			}
		})
		return uni.request({
			url: dataUrl.url + url,
			data: header ? JSON.stringify(data) : data,
			method: 'POST',
			header: {
				'Authorization': Authorization,
				'app-version': dataUrl.versionHeader,
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				...header
			}
		}).then(checkStatus).then(checkCode)
	},
	postJson (url, data, header =  null) {
		uni.showLoading({
			mask: true
		})
		var Authorization
		uni.getStorage({
			key: 'user',
			success: function(res){
				Authorization = res.data.token
			}
		})
		return uni.request({
			url: dataUrl.url + url,
			data: header ? JSON.stringify(data) : data,
			method: 'POST',
			header: {
				'Authorization': Authorization,
				'app-version': dataUrl.versionHeader,
				'Content-Type': 'application/json',
				...header
			}
		}).then(checkStatus).then(checkCode)
	},
	get (url, params, header) {
		var Authorization
		if (params) {
			let paramsArray = []
			Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
			if (url.search(/\?/) === -1) {
				url += '?' + paramsArray.join('&')
			} else {
				url += '&' + paramsArray.join('&')
			}
		}
		uni.getStorage({
			key: 'user',
			success: function(res){
				Authorization = res.data.token
			}
		})
		return uni.request({
			url: dataUrl.url + url,
			data: header ? JSON.stringify(params) : params,
			method: 'GET',
			header: {
				'Authorization': Authorization,
				'app-version': dataUrl.versionHeader,
				...header
			}
		}).then(checkStatus).then(checkCode)
	}
}