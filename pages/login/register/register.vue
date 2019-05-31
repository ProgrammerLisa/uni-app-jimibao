<template>
	<view class="y-content-hasNav">
		<view class="box">
			<view class="logo">
				<image :src="logo"></image>
			</view>
			<view>
				<form @submit="formSubmit">
					<view class="register-item">
						<text class="y-label">手机号</text>
						<input name="phone" v-model="phone" class="y-input" />
					</view>
					<view class="register-item">
						<text class="y-label">密码</text>
						<input name="password" password class="y-input" />
					</view>
					<view class="register-item">
						<text class="y-label">验证码</text>
						<view class="y-code">
							<input maxlength="4" type="number" name="code" class="y-input" />
							<button class="y-login" :disabled="disabled" @click="getCode">{{codeText}}</button>
						</view>
					</view>
					<view class="register-item">
						<text class="y-label">推荐人</text>
						<input name="superior" class="y-input" />
					</view>
					<view class="y-label y-agree">
						<checkbox-group @change="checkboxChange" style="flex: 1;">
							<checkbox value="agree" :checked="checkbox" class="y-checkbox"></checkbox>
						</checkbox-group>
						<view style="flex: 10;">
							我同意<text class="y-caret" @click="goAgreement">《服务协议》</text>
						</view>
					</view>
					<view class="y-register-btn">
						<button formType="submit" class="y-login">注册</button>
					</view>
					<view class="y-label">
						<text class="y-login-back" @click="goback">已注册？<text class="y-caret">登录</text></text>
					</view>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	import logo from '@/static/image/96@2x.png'
	import rules from '@/static/js/formRules'
	import api from '@/utils/api/login/index.js'
	export default {
		data () {
			return {
				logo: logo,
				checkbox: false,
				disabled: false,
				codeText: '获取验证码',
				phone: ''
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
					if (this.checkbox) {
						e.detail.value.repassword = e.detail.value.password
						this.sendFormRequest(e.detail.value)
					} else {
						uni.showToast({
							title: '请先同意注册协议',
							icon: 'none'
						})
					}
				}
			},
			async sendFormRequest (e) {
				const res = await api.register(e, { 'Content-Type': 'application/json' })
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
					case 'password':
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
					case 'code':
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
		align-items: center;
		background: $uni-login-bg-color;
	}
	.y-agree {
		justify-content: left;
		margin-top: 20upx;
	}
</style>
