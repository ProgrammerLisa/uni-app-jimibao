<template>
	<view>
		<view class="y-top"><text class="y-top-title">剩余数量： <text class="y-top-count">{{info.encourage}}</text> kg</text></view>
		<view class="y-input-box">
			<view class="y-label">激活数量(必须为整数)</view>
			<input v-model="count" type="number" maxlength="3" />
			<button class="y-button" @click="submit">激活</button>
		</view>
	</view>
</template>

<script>
	import api from '@/utils/api/tabBar/index.js'
	export default {
		data () {
			return {
				info: {},
				count: ''
			}
		},
		onShow () {
			this.getData()
		},
		methods: {
			async getData () {
				const res = await api.AccountBalance()
				if (res.success) {
					const _this = this
					this.info = res.data
				}
			},
			submit () {
				if (!/^[123456789]\d{0,3}$/.test(this.count)) {
					uni.showToast({
						title: '请输入大于0的整数',
						icon: 'none'
					})
				} else {
					this.sendSubmit()
				}
			},
			async sendSubmit () {
				const res = await api.encourage({ number: this.count })
				if (res.success) {
					uni.showToast({
						title: '激活成功'
					})
					this.count = ''
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.y-top {
		text-align: center;
		padding: 50upx 0;
		.y-top-title {
			display: inline-block;
			padding: 10upx 20upx;
			border: solid 1px $uni-router-color;
			border-radius: 6upx;
		}
		.y-top-count {
			color: $uni-router-color;
		}
	}
	.y-input-box {
		text-align: center;
		padding: 0 20upx;
		input {
			margin: 20upx;
			border-bottom: 1px solid $uni-box-line-inverse;
		}
		input:focus{
			border-color: #fff;
		}
		.y-button {
			margin: 50upx 20upx;
		}
	}
</style>
