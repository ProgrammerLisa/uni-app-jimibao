<template>
	<view class="y-content-hasNav">
		<view class="y-content">
			<form @submit="formSubmit">
				<view class="uni-form-item uni-column">
	                <view class="title">验证码</view>
	                <view class="y-code">
	                	<input maxlength="4" type="number" name="phoneCode" class="uni-input" />
	                	<button class="y-button" :disabled="disabled" @click="getCode">{{codeText}}</button>
	                </view>
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
				</view>
				 <view class="uni-btn-v">
	                <button formType="submit" class="y-button y-submit">确定</button>
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
				codeText: '获取验证码',
				disabled: false,
				password: '',
				phone: '',
				showPassword: true,
				type: ''
			}
		},
		onLoad (e) {
			this.type = e
			const _this = this
			uni.setNavigationBarTitle({
				title: '找回'+e.title
			})
			try {
				const value = uni.getStorageSync('user')
				if (value) {
					_this.phone = value.phone
				}
			} catch (e) {
				
			}
		},
		methods: {
			goback () {
				uni.navigateBack({
					delta: 2
				})
			},
			async getCode () {
				const res = await api.sendCode({ phone: this.phone })
				if (res.success) {
					this.disabled = true
					this.disabledAnimate()
					uni.showToast({
						title: '短信验证码已发送',
						icon: 'none'
					})
				}
			},
			disabledAnimate () {
				let _this = this
				let num = 90
				this.codeText = num + 's'
				let timer = setInterval(function() {
					if (num > 0) {
						num -= 1
						_this.codeText = num + 's'
					} else {
						clearInterval(timer)
						_this.codeText = '获取验证码'
						_this.disabled = false
					}
				}, 1000)
			},
			formSubmit (e) {
				if (this.checkForm(e.detail.value)) {
					switch (this.type.type) {
						case 'Tread':
							this.sendTreadRequest({ ...e.detail.value, phone: this.phone })
							break
						case 'Login':
							let data = {}
							data.newPassword = e.detail.value.newTradePassword
							data.newprePassword = e.detail.value.newpreTradePassword
							this.sendLoginRequest({ ...data, phone: this.phone })
					}
				}
			},
			async sendTreadRequest (e) {
				let _this = this
				const res = await api.forgetTreadPwd(e)
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
				const res = await api.forgetLoginPwd(e)
				if (res.success) {
					uni.showToast({
						title: '请重新登录'
					})
					setTimeout(function () {
						uni.removeStorage({
							key: 'user',
							success: function (res) {
								uni.reLaunch({
									url: '/pages/login/login/login'
								})
							}
						})
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
					case 'phoneCode':
						if (value) {
							return {
								status: true
							}
						} else {
							return {
								status: false,
								message: '请输入验证码'
							}
						}
						break
					case 'newTradePassword':
						if (value) {
							if (rules.password.test(value)) {
								return {
									status: true
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
		.y-submit {
			margin: 120upx 20upx 20upx;
		}
	}
	.y-code {
		display: flex;
		justify-content: space-between;
		align-items: center;
		input {
			flex: 2;
		}
		button {
			font-size: small;
			flex: 1;
		}
	}
</style>
