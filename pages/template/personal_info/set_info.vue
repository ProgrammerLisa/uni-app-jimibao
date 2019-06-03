<template>
	<view class="y-content-hasNav">
		<input maxlength="20" :value="value" :placeholder="`请输入${info.title}`" />
	</view>
</template>

<script>
	export default {
		data () {
			return {
				value: '',
				info: {}
			}
		},
		onLoad (e) {
			this.info = e
			uni.setNavigationBarTitle({
				title: e.title
			})
		},
		onNavigationBarButtonTap (e) {
			uni.showToast({
				title: '开始请求',
				icon: 'none'
			})
		}
	}
</script>
	
<style lang="scss" scoped>
	.y-content-hasNav {
		background: #fff;
		color: #555;
	}
	input {
		font-size: 15px;
		padding: 20upx;
		border-bottom: 1px solid #d7d7d7;
	}
</style>
