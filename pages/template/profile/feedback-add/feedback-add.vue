<template>
	<view class="y-content">
		<form @submit="formSubmit">
			<view class="uni-form-item uni-column">
		        <view class="title">姓名</view>
		        <input class="uni-input" :value="form.name" placeholder="最少2个字,最多15个字" name="name" />
		    </view>
			<view class="uni-form-item uni-column">
			    <view class="title">手机号</view>
			    <input class="uni-input" :value="form.phone" placeholder="请输入11位手机号码" type="number" name="phone" />
			</view>
			<view class="uni-form-item uni-column">
			    <view class="title">身份证</view>
			    <input class="uni-input" :value="form.idcard" placeholder="请输入真实身份证号码" name="idcard" />
			</view>
			<view class="uni-form-item uni-column">
			    <view class="title">问题类型</view>
			    <view @click="showSinglePicker"><input class="uni-input" :value="form.messagetype" placeholder="点击选择问题类型" name="messagetype" disabled /></view>
			</view>
			<view class="uni-item-flex">
				<view class="uni-item-image" @click="chooseImage">
					<image v-if="imageUrl" :src="imageUrl"></image>
					<uni-icon v-else type="plus"></uni-icon>
				</view>
				<textarea class="uni-item-text" :value="form.content" name="content" auto-height placeholder="请用文字描述您在使用集米宝APP中遇到的问题, 我们一定以最效率的方式修复, 祝您生活愉快" />	
			</view>
			<view class="uni-btn-v">
			    <button formType="submit" class="y-button">确定</button>
			</view>
			
			<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" mode="selector" :deepLength="1" :pickerValueDefault="[0]"
			 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerSingleArray"></mpvue-picker>
		</form>
	</view>
</template>

<script>
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue'
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import api from '@/utils/api/tabBar/index.js'
	import { pathToBase64, base64ToPath } from '@/common/image-tools/index.js'
	import rules from '@/static/js/formRules'
	export default {
		components: {
			mpvuePicker,
			uniIcon
		},
		data () {
			return {
				imageUrl: '',
				form: {
					messagetype: ''
				},
				themeColor: '#007AFF',
				cityPickerValueDefault: [0, 0, 1],
				pickerSingleArray: [{
						label: '解绑(提供身份证正面)',
						value: 1
					},
					{
						label: '解冻(提供身份证正面)',
						value: 2
					},
					{
						label: '商圈售后(提供订单号截图)',
						value: 3
					},
					{
						label: '其他问题',
						value: 4
					}
				]
			}
		},
		methods: {
			goBack () {
				uni.navigateBack()
			},
			onCancel () {
				
			},
			onConfirm (e) {
				this.form.messagetype = e.label
			},
			showSinglePicker() {
				this.$refs.mpvuePicker.show()
			},
			chooseImage () {
				const _this = this
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					success (e) {
						pathToBase64(e.tempFilePaths[0]).then(res => {
							_this.imageUrl = res
						})
					},
					fail (e) {
						uni.showToast({
							title: '取消选择',
							icon: 'none'
						})
					}
				})
			},
			formSubmit (e) {
				if (this.checkForm(e.detail.value)) {
					let data = e.detail.value
					if (!this.imageUrl) {
						uni.showToast({
							title: '请上传相关图片',
							icon: 'none'
						})
						return false
					}
					this.sendForm({...data, file: this.imageUrl, type: 'feedback'})
				}
			},
			async sendForm (e) {
				const res = await api.addFeedback(e)
				if (res.success) {
					uni.showToast({
						title: '反馈成功'
					})
					setTimeout(() => {
						this.goBack()
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
					case 'name':
						if (!value) {
							return {
								status: false,
								message: '请输入姓名'
							}
						}
						if (value.length < 2 || value.length > 15) {
							return {
								status: false,
								message: '姓名不正确'
							}
						}
						return {
							status: true
						}
						break
					case 'phone':
						if (!value) {
							return {
								status: false,
								message: '请输入电话号码'
							}
						}
						if (!rules.phone.test(value)) {
							return {
								status: false,
								message: '手机号码格式不正确'
							}
						}
						return {
							status: true
						}
						break
					case 'idcard':
						if (!value) {
							return {
								status: false,
								message: '身份证不能为空'
							}
						}
						if (!rules.IdCard.test(value)) {
							return {
								status: false,
								message: '身份证号码格式不正确'
							}
						}
						return {
							status: true
						}
						break
					case 'messagetype':
						if (!value) {
							return {
								status: false,
								message: '请选择问题类型'
							}
						}
						return {
							status: true
						}
						break
					case 'content':
						if (!value) {
							return {
								status: false,
								message: '请输入问题详情'
							}
						}
						return {
							status: true
						}
						break
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.mpvue-picker-view {
		background: #000;
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
		.set-default {
			padding: 20upx;
		}
		.uni-item-flex {
			display: flex;
			align-items: center;
			margin-top: 20upx;
			padding: 0 20upx;
			.uni-item-image {
				flex: 1;
				width: 150upx;
				height: 200upx;
				line-height: 200upx;
				overflow: hidden;
				border: 1px solid $uni-text-color;
				text-align: center;
				margin-right: 10upx;
				image {
					width: 100%;
					min-height: 100%;
				}
			}
			.uni-item-text {
				flex: 2;
				border: 1px solid #63646B;
				min-height: 160upx;
				padding: 20upx;
				overflow: scroll;
			}
		}
	}
</style>
