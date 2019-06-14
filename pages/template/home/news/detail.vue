<template>
	<view>
		<view class="title">{{title}}</view>
		<view class="content" v-html="content"></view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				content: '',
				title: ''
			}
		},
		onLoad (e) {
			this.content = e.content.replace(/<ol class/g, '')
			this.title = e.title
		}
	}
</script>

<style scoped lang="scss">
	.title {
		text-align: center;
		font-weight: bold;
		padding: 30upx;
		color: $uni-text-color;
	}
	.content {
		padding: 20upx 50upx;
		font-size: 30upx;
		color: #555;
	}
</style>
