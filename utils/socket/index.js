import url from '@/utils/request/config.js'
// 创建连接
let onMessageVal = ''
const socket = function (id) {
	const socketServer = {
	  socket: null,
	  wsUrl: url.socketUrl+id,
	  lockReconnect: false, // 避免重复链接
	  timeInterval: null, // 重连间隔时间
	  createWebSocket () {
		const _this = this
		try {
			_this.socket = uni.connectSocket({
				url: _this.wsUrl,
				complete () {}
			}) // 初始化
			_this.webSocketInit()
		} catch (e) {
			_this.webSocketReconnect() // 重连
		}
	  },
	  // 初始化连接
	  webSocketInit () {
		const _this = this
		_this.socket.onClose(function(){
			_this.webSocketReconnect()
		})
		_this.socket.onError(function(){
			_this.webSocketReconnect()
		})
		_this.socket.onOpen(function(){
			// 连接后启动心跳检测
			console.log('已连接')
			_this.start()
		})
		_this.socket.onMessage(function(res){
			// 接收一次消息 重置一次心跳检测
			console.log(res)
			onMessageVal = res.data
			_this.webSochetOnMessage(res.data)
			_this.reset()
		})
	  },
	  // 重连
	  webSocketReconnect () {
		const _this = this
		if (_this.lockReconnect) return false
		_this.lockReconnect = true
		// 没连接上会一直重连，设置延迟，避免请求过多
		_this.timeInterval && clearTimeout(_this.timeInterval)
		_this.timeInterval = setTimeout(() => {
		  _this.createWebSocket()
		})
	  },
	  // 接收消息
	  webSochetOnMessage (e) {
		let data = JSON.parse(e)
		return data
	  },
	  // 发送消息
	  sendMessage (msgData, callback) {
		const _this = this
		if (_this.socket) {
			let json = JSON.stringify(msgData)
			if (_this.socket['_webSocket'].readyState === 1) {
				_this.socket.send({
					data: '1',
					success (res) {
						console.log(res)
						callback({ code: 200 })
					},
					fail (err) {
						console.log(err)
						console.log({ code: 502, message: '发送失败，请重新发送' })
					}
				})
			} else {
				callback({ code: 500, message: '服务器已断开连接' })
			}
		} else {
			this.createWebSocket()
		}
	  },
	  sendFunction (msgData, callback) {
		  const _this = this
		  
	  },
	  // 心跳检测
	  timeOut: null,
	  timeNumber: 300000, // 300s
	  reset () {
		const _this = this
		// 接收成功一次推送，就将心跳检测的倒计时重置为30秒
		clearTimeout(_this.timeOut)
		_this.start()
	  },
	  start () {
		const _this = this
		_this.timeOut = setTimeout(() => {
		  let message = 'heart'
		  _this.socket.send(message)
		}, _this.timeNumber)
	  }
	}
	return {
		onSocket: socketServer,
		onMessageVal: onMessageVal
	}
}

export default socket
