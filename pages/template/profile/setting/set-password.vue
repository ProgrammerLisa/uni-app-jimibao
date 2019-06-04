<template>
	<view class="y-content-hasNav">
		<view class="tips" v-if="type.type === 'Tread'">提示： 新注册用户初始交换密码为123456</view>
		<view class="y-content">
			<form @submit="formSubmit">
				<view class="uni-form-item uni-column">
                    <view class="title">旧密码</view>
                    <input class="uni-input" :password="showPassword" v-model="oldPwd" name="oldTradePassword" />
                </view>
				<view class="uni-form-item uni-column">
				    <view class="title">新密码</view>
				    <input class="uni-input" :password="showPassword" v-model="password" name="newTradePassword" />
				</view>
				<view class="uni-form-item uni-column">
				    <view class="title">确认密码</view>
				    <input class="uni-input" :password="showPassword" name="newpreTradePassword" />
				</view>
				<view class="uni-btn-v forget-box">
					<view class="uni-icon uni-icon-eye" :class="[!showPassword ? 'uni-active' : '']" @click="showPassword=!showPassword"></view>
					<view class="forgetPwd" @click="goForget">忘记密码</view>
				</view>
				 <view class="uni-btn-v">
                    <button formType="submit" class="y-button">确定</button>
                </view>
			</form>
		</view>
	</view>
</template>

<script>
	import rules from '@/static/js/formRules'
	import api from '@/utils/api/login/index'
	export default {
		data () {
			return {
				oldPwd: '',
				password: '',
				showPassword: true,
				type: ''
			}
		},
		onLoad (e) {
			this.type = e
			uni.setNavigationBarTitle({
				title: '修改'+e.title
			})
		},
		methods: {
			goback () {
				uni.navigateBack()
			},
			goForget () {
				uni.navigateTo({
					url: `/pages/template/profile/setting/forget-password?title=${this.type.title}&type=${this.type.type}`
				})
			},
			formSubmit (e) {
				if (this.checkForm(e.detail.value)) {
					switch (this.type.type) {
						case 'Tread':
							this.sendTreadRequest(e.detail.value)
							break
						case 'Login':
							let data = {}
							data.oldPassword = e.detail.value.oldTradePassword
							data.newPassword = e.detail.value.newTradePassword
							data.newprePassword = e.detail.value.newpreTradePassword
							this.sendLoginRequest(data)
					}
				}
			},
			async sendTreadRequest (e) {
				const _this = this
				const res = await api.updateTreadPwd(e)
				if (res.success) {
					uni.showToast({
						title: '修改成功'
					})
					setTimeout(function () {
						_this.goback()
					}, 500)
				}
			},
			async sendLoginRequest (e) {
				const res = await api.updateLoginPwd(e)
				if (res.success) {
					uni.showToast({
						title: '请重新登录'
					})
					uni.removeStorage({
						key: 'user',
						success: function (res) {
							uni.reLaunch({
								url: '/pages/login/login/login'
							})
						}
					})
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
					case 'oldTradePassword':
						if (value) {
							return {
								status: true
							}
						} else {
							return {
								status: false,
								message: '请输入旧密码'
							}
						}
						break
					case 'newTradePassword':
						if (value) {
							if (rules.password.test(value)) {
								if (value === this.oldPwd) {
									return {
										status: false,
										message: '新密码不能与旧密码重复'
									}
								} else {
									return {
										status: true
									}
								}
							} else {
								return {
									status: false,
									message: '密码8-16位，至少含数字/字母/字符2种组合'
								}
							}
						} else {
							return {
								status: false,
								message: '请输入新密码'
							}
						}
						break
						
					case 'newpreTradePassword':
						if (value) {
							if (value !== this.password) {
								return {
									status: false,
									message: '两次密码输入不一致'
								}
							} else {
								return {
									status: true
								}
							}
						} else {
							return {
								status: false,
								message: '请确认新密码'
							}
						}
						break
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.y-content-hasNav {
		position: relative;
	}
	.tips {
		background: $uni-box-color;
		padding: 20upx;
		text-align: center;
	}
	.y-content {
		padding: 0;
		background: $uni-box-color;
		margin-top: 20upx;
		padding: 0 20upx;
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
