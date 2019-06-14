<template>
	<view class="content-box">
		<view class="content">
			{{content}}
		</view>
		<view class="button">
			<button class="y-button" @click="copy">点击复制</button>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				content: ''
			}
		},
		onLoad (e) {
			this.content = e.content
		},
		methods: {
			copy () {
				const _this = this
				uni.setClipboardData({
					data: _this.content,
					success () {
						uni.showToast({
							title: '复制成功'
						})
					},
					fail () {
						uni.showToast({
							title: '复制失败',
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	.button {
		text-align: center;
	}
	.y-button {
		width: 80%;
	}
	.content {
		margin: 30upx 10%;
		padding: 30upx;
		text-align: center;
		border: solid 2px #ccc;
		background: #fff;
	}
</style>
