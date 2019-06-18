<script>
	import api from '@/utils/api/chat/index.js'
	export default {
		data() {
			return {
				id: '',
				timeOut: '',
				intervalTime: null, // 重连间隔时间
				lockReconnect: false // 避免重复连接
			}
		},
		onLaunch: function() {
			this.noReadCount()
		},
		onShow: function() {
			const _this = this
			uni.getStorage({
				key: 'user',
				success (res) {
					if (res.data) {
						_this.id = res.data.firmid
						_this.socket()
					}
				}
			})
		},
		onHide: function() {
			uni.removeStorage({
				key: 'home-dot'
			})
			uni.onSocketOpen(function(){
				uni.closeSocket()
			})
		},
		methods: {
			// 创建连接 并初始化
			socket () {
				const _this = this
				uni.connectSocket({
					url: _this.$socketUrl + _this.id
				})
				uni.onSocketOpen(function(){
					_this.start()
				})
				uni.onSocketClose(function(){
					_this.connectAgain()
				})
				uni.onSocketError(function(err){
					_this.connectAgain()
				})
				uni.onSocketMessage(function(){
					_this.reset()
				})
			},
			// 重连
			connectAgain () {
				const _this = this
				if (this.lockReconnect) return false
				this.lockReconnect = true
				// 没连接上会一直重连，设置延迟，避免请求过多
				this.intervalTime && clearTimeout(_this.intervalTime)
				this.intervalTime = setTimeout(() => {
					_this.socket()
				})
			},
			// 重置心跳
			reset () {
				clearTimeout(this.timeOut)
				this.start()
			},
			// 心跳检测
			start () {
				this.timeOut = setTimeout(() => {
					uni.sendSocketMessage({
						data: 'heart'
					})
				}, 300000)
			},
			async noReadCount () {
				const res = await api.unRead()
				if (res.success) {
					if(res.data > 0) {
						let text
						if (res.data < 100) {
							text = res.data.toString()
						} else {
							text = '99+'
						}
						uni.setTabBarBadge({
							index: 3,
							text: text
						})
					}
				}
			}
		}
	}
</script>

<style>
	@import './static/scss/uni.css';
</style>
<style lang="scss">
	
	/*每个页面公共scss */
	page {
		background: $uni-bg-color;
		height: 100%;
		line-height: 1.8;
		color: $uni-text-color;
	}
	view {
		font-size: 32upx;
	}
	.y-content-db {
		min-height: $uni-content-db-height;
		background: $uni-bg-color;
		color: $uni-text-color;
	}
	.y-content-hasNav {
		min-height: $uni-content-hasNav-height;
		background: $uni-bg-color;
		color: $uni-text-color;
	}
	.y-content-hasTab {
		min-height: $uni-content-hasTab-height;
		background: $uni-bg-color;
		color: $uni-text-color;
	}
	.y-button {
		background: transparent;
		color: $uni-router-color;
		font-size: 32upx;
		transition: .2s;
	}
	.y-button:active {
		background: $uni-router-color;
		color: $uni-login-bg-color;
	}
	.y-button[disabled] {
		opacity: $uni-opacity-disabled;
	}
	 uni-button[disabled]:not([type]), uni-button[disabled][type=default] {
		 color: $uni-font-color;
		 background: transparent;
	 }
	 .y-tabs-item {
		 margin-top: 96upx;
	 }
</style>
