<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
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
		font-size: 30upx;
		line-height: 1.8;
	}
	.y-content-db {
		width: 100%;
		min-height: $uni-content-db-height;
		background: $uni-bg-color;
		color: $uni-font-color;
	}
	.y-content-hasNav {
		width: 100%;
		min-height: $uni-content-hasNav-height;
		background: $uni-bg-color;
		color: $uni-font-color;
	}
	.y-content-hasTab {
		width: 100%;
		min-height: $uni-content-hasTab-height;
		background: $uni-bg-color;
		color: $uni-font-color;
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
</style>
