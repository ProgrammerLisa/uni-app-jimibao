<template>
	<view class="y-content-hasNav">
		<view class="box">
			<view>
				<form @submit="formSubmit">
					<view class="register-item">
						<text class="y-label">手机号</text>
						<input name="phone" v-model="phone" class="y-input y-input-border" />
					</view>
					<view class="register-item">
						<text class="y-label">验证码</text>
						<view class="y-code">
							<input maxlength="4" type="number" name="phoneCode" class="y-input y-input-border" />
							<button class="y-login" :disabled="disabled" @click="getCode">{{codeText}}</button>
						</view>
					</view>
					<view class="login-item">
						<text class="y-label">密码</text>
						<view class="uni-form-item">
							<view class="y-input-border with-fun">
								<input name="newPassword" :password="showPassword" class="y-input" v-model="password" />
								<view class="uni-icon uni-icon-eye" style="background: #fff;" :class="[!showPassword ? 'uni-active' : '']" @click="showPassword=!showPassword"></view>
							</view>
						</view>
					</view>
					<view class="login-item">
						<text class="y-label">确认密码</text>
						<view class="uni-form-item">
							<view class="y-input-border with-fun">
								<input name="newprePassword" :password="showPassword" class="y-input"/>
								<view class="uni-icon uni-icon-eye" style="background: #fff;" :class="[!showPassword ? 'uni-active' : '']" @click="showPassword=!showPassword"></view>
							</view>
						</view>
					</view>
					<view class="y-register-btn" style="margin-top: 30px">
						<button formType="submit" class="y-login">确定</button>
					</view>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	import rules from '@/static/js/formRules'
	import api from '@/utils/api/login/index.js'
	export default {
		data () {
			return {
				checkbox: false,
				disabled: false,
				codeText: '获取验证码',
				phone: '',
				password: '',
				showPassword: true
			}
		},
		methods: {
			goback () {
				uni.navigateBack()
			},
			getCode () {
				let callback = this.checkItem('phone', this.phone)
				if(callback.status) {
					this.sendCodeRequest()
				} else {
					uni.showToast({
						title: callback.message,
						icon: 'none'
					})
				}
			},
			async sendCodeRequest () {
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
			checkboxChange (e) {
				if (e.detail.value.length > 0) {
					this.checkbox = true
				} else {
					this.checkbox = false
				}
			},
			formSubmit (e) {
				if (this.checkForm(e.detail.value)) {
					this.sendFormRequest(e.detail.value)
				}
			},
			async sendFormRequest (e) {
				const res = await api.forgetLoginPwd(e)
				if (res.success) {
					this.goback()
				}
			},
			checkForm (e) {
				const _this = this
				let status
				for (let i in e) {
					if (i !== 'superior') {
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
					} else {
						status = true
					}
				}
				return status
			},
			checkItem (e, value) {
				switch (e) {
					case 'phone':
						if (value) {
							if (rules.phone.test(value)) {
								return {
									status: true
								}
							} else {
								return {
									status: false,
									message: '请输入正确的手机号码'
								}
							}
						} else {
							return {
								status: false,
								message: '请输入手机号码'
							}
						}
						break
					case 'phoneCode':
						if (value) {
							return {
								status: true
							}
						} else {
							return {
								status: false,
								message: '请输入手机验证码'
							}
						}
						break
					case 'newPassword':
						if (value) {
							if (rules.password.test(value)) {
								return {
									status: true
								}
							} else {
								return {
									status: false,
									message: '8-16位，至少含数字/字母/字符2种组合'
								}
							}
						} else {
							return {
								status: false,
								message: '请输入密码'
							}
						}
						break
					case 'newprePassword':
						if (!value) {
							return {
								status: false,
								message: '请确认密码'
							}
						}
						if (value !== this.password) {
							return {
								status: false,
								message: '两次密码输入不一致'
							}
						}
						return { status: true }
				}
			},
			goAgreement () {
				uni.navigateTo({
					url: 'agreement'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import '@/static/scss/login.scss'
</style>
<style scoped lang="scss">
	.y-content-hasNav {
		width: 100vw;
		min-height: 100vh;
		display: flex;
		background: $uni-login-bg-color;
	}
	.y-agree {
		justify-content: left;
		margin-top: 20upx;
	}
</style>
