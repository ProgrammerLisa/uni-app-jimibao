const patternDevelopment = true // true是开发模式 false是生产模式
let url, uploadImgUrl, socketUrl
if (patternDevelopment) {
	url = 'http://192.168.0.105:88/api',
	uploadImgUrl = 'https://static.gzjimibao.com',
	socketUrl = 'ws://192.168.1.111:88/api/userChannel'
} else {
	url = 'https://app.gzjimibao.com/api',
	uploadImgUrl = 'https://static.gzjimibao.com',
	socketUrl = 'wss://app.gzjimibao.com/api/userChannel'
}
export default {
	url: url,
	uploadImgUrl: uploadImgUrl,
	socketUrl: socketUrl
}