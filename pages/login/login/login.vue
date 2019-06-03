<template>
	<view class="y-content-hasTab">
		<view class="box">
			<view class="logo">
				<image :src="logo"></image>
			</view>
			<view>
				<form @submit="formSubmit">
					<view class="login-item">
						<text class="y-label">账号</text>
						<view class="uni-form-item">
							<view class="y-input-border with-fun">
								<input name="phone" class="y-input" :value="inputClearValue" @input="clearInput" />
								<view class="uni-icon uni-icon-clear" v-if="showClearIcon" @click="clearIcon"></view>
							</view>
						</view>
					</view>
					<view class="login-item">
						<text class="y-label">密码</text>
						<view class="uni-form-item">
							<view class="y-input-border with-fun">
								<input name="password" :password="showPassword" class="y-input" />
								<view class="uni-icon uni-icon-eye" :class="[!showPassword ? 'uni-active' : '']" @click="showPassword=!showPassword"></view>
							</view>
						</view>
					</view>
					<view class="y-login-btn">
						<button formType="submit" class="y-login">登录</button>
					</view>
				</form>
			</view>
			<view class="y-flex y-login-btn">
				<text @click="toForgetPassword">忘记密码？</text>
				<text @click="toRegister">新用户注册</text>
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
				pickerHidden: true,
				chosen: '',
				showPassword: true,
				showClearIcon: false,
				inputClearValue: ''
			}
		},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
		created () {
			uni.getStorage({
				key: 'Authorization',
				success: function (res) {
					if (res.data) {
						uni.switchTab({
							url: '/pages/tabBar/home/home'
						})
					}
				}
			})
		},
		methods: {
			formSubmit: function(e) {
				let data = {}
				if (this.checkForm(e.detail.value)) {
					if (rules.phone.test(e.detail.value.phone)) {
						this.sendFormRequest(e.detail.value)
					} else {
						data = {
							account: e.detail.value.phone,
							password: e.detail.value.password
						}
						this.sendFormRequest(data)
					}
				}
			},
			async sendFormRequest (e) {
				const res = await api.login(e, { 'Content-Type': 'application/json' })
				if (res.success) {
					uni.setStorage({
						key: 'Authorization',
						data: res.data.token,
						success: function() {
							uni.showToast({
								title: '登录成功'
							})
							uni.switchTab({
								url: '/pages/tabBar/home/home'
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
					case 'phone':
						if (value) {
							return {
								status: true
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
							return {
								status: true
							}
						} else {
							return {
								status: false,
								message: '请输入密码'
							}
						}
						break
				}
			},
			clearIcon: function() {
				this.inputClearValue = '';
				this.showClearIcon = false;
			},
			clearInput: function(event) {
				this.inputClearValue = event.target.value;
				if (event.target.value.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
				}
			},
			toForgetPassword () {
				uni.navigateTo({
					url: '/pages/login/register/register'
				})
			},
			toRegister () {
				uni.navigateTo({
					url: '/pages/login/register/register'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import '@/static/scss/login.scss'
</style>
<style scoped lang="scss">
	.y-content-hasTab {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: $uni-login-bg-color;
		color: $uni-font-color;
		display: flex;
		.box {
			height: 1000px;
			padding-top: 25%;
		}
	}
	.uni-icon {
		border: none;
		margin-bottom: 1px;
	}
	.uni-icon:active {
		border: none;
	}
</style>
