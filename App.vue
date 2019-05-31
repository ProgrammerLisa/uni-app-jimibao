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
		font-size: 28upx;
		line-height: 1.8;
	}
	.y-content-db {
		min-height: $uni-content-db-height;
		background: $uni-bg-color;
		color: $uni-font-color;
	}
	.y-content-hasNav {
		min-height: $uni-content-hasNav-height;
		background: $uni-bg-color;
		color: $uni-font-color;
	}
	.y-content-hasTab {
		min-height: $uni-content-hasTab-height;
		background: $uni-bg-color;
		color: $uni-font-color;
	}
</style>
