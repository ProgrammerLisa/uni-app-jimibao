<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			uni.removeStorage({
				key: 'home-dot'
			})
			console.log('App Hide')
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
		border: 1upx solid $uni-router-color;
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
