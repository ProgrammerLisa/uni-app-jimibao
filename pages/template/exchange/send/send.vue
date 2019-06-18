<template>
	<view>
		<y-tabs :tabList="tabList" :active="active" @changeTabs="changeTabs"></y-tabs>
		<view class="y-content">
			<form @submit="formSubmit">
				<view class="uni-form-item uni-column">
		            <view class="title">数额(kg)</view>
		            <input class="uni-input" type="number" name="volume" placeholder="请输入整数" />
		        </view>
				<view class="uni-form-item uni-column">
				    <view class="title">价格(元)</view>
				    <input class="uni-input" type="number" name="price" />
				</view>
				<view class="uni-form-item uni-column">
				    <view class="title">密码</view>
				    <input class="uni-input" type="password" name="tradepassword" />
					<view class="tips">初始交换密码为123456</view>
				</view>
				<view class="uni-form-item uni-column">
				    <view class="title">是否自动匹配</view>
					<switch :checked="checked" @change="checkedChange" />
				</view>
				<view class="uni-btn-v">
		            <button formType="submit" class="y-button">确定</button>
		        </view>
			</form>
		</view>
	</view>
</template>

<script>
	import yTabs from '@/components/y-tabs/y-tabs.vue'
	import api from '@/utils/api/tabBar/index.js'
	export default {
		components: {
			yTabs
		},
		data() {
			return {
				active: 0,
				tabList: [
					{ title: '买入', dataList: [] },
					{ title: '出售', dataList: [] }
				],
				checked: false
			}
		},
		methods: {
			async changeTabs (e) {
				this.active = e
			},
			checkedChange (e) {
				this.checked = e.detail.value
			},
			formSubmit (e) {
				if (this.checkForm(e.detail.value)) {
					let autoMatch
					if (this.checked) {
						autoMatch = 1
					} else {
						autoMatch = 0
					}
					this.sendForm(e.detail.value, autoMatch)
				}
			},
			async sendForm (e, autoMatch) {
				const res = await api.exchangeSend({ sign: this.active + 1, ...e, autoMatch: autoMatch })
				if (res.success) {
					uni.showToast({
						title: '发布成功'
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 500)
				}
			},
			checkForm (e) {
				const _this = this
				let status
				for (let i in e) {
					let callback = _this.checkItem(i, e[i])
					if (callback.status) {
						status = true
					} else {
						uni.showToast({
							title: callback.message,
							icon: 'none'
						})
						return false
					}
				}
				return status
			},
			checkItem (e, value) {
				switch (e) {
					case 'volume':
						if (!value) {
							return {
								status: false,
								message: '请输入交换数额'
							}
						}
						if (!/^[0-9]*[1-9][0-9]*$/.test(value)) {
							return {
								status: false,
								message: '数额必须是正整数'
							}
						}
						return { status: true }
						
					case 'price':
						if (!value) {
							return {
								status: false,
								message: '请输入价格'
							}
						}
						if (!/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(parseFloat(value))) {
							return {
								status: false,
								message: '价格最多有两位小数'
							}
						}
						return { status: true }
						
					case 'tradepassword':
						if (!value) {
							return {
								status: false,
								message: '请输入交换密码'
							}
						}
						return { status: true }
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.y-content {
		padding: 0;
		background: $uni-box-color;
		margin-top: 20upx;
		padding: 0 20upx;
		.title {
			font-size: $uni-font-size-base;
		}
		.tips {
			font-size: $uni-font-size-sm;
			padding: 20upx;
			color: $uni-text-color-grey;
		}
		input {
			background: $uni-input-bg-color;
			border: solid 1upx $uni-input-border-color;
			border-radius: 10upx;
			margin: 0 20upx;
		}
		.forget-box {
			display: flex;
			justify-content: space-between;
			padding: 20upx;
			.uni-icon {
				color: #555;
			}
			.uni-active {
				color: #f7f7f7;
			}
			.forgetPwd {
				color: $uni-router-color;
			}
		}
		.y-button {
			margin: 120upx 20upx 20upx;
		}
	}
</style>
