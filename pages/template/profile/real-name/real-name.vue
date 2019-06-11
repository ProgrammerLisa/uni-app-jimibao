<template>
	<view>
		
		<view v-if="info.idcard">
			<view class="y-top"><text class="y-top-title">您已实名</text></view>
			<view class="y-content">
				<view class="y-list" v-for="(i, index) in dataList" :key="index">
					<view class="y-list-left">{{i.label}}</view>
					<view class="y-list-right">
						{{i.value}}
					</view>
				</view>
			</view>
		</view>
		<view class="y-container y-content-hasNav" v-else>
			<view class="y-content">
				<form @submit="formSubmit">
					<view class="uni-form-item uni-column">
				        <view class="title">姓名</view>
				        <input class="uni-input" v-model="form.name" placeholder="最少2个字,最多15个字" name="name" />
				    </view>
					<uni-cpimg ref="cpimg" @result="cpimgOk" @err="cpimgErr" :number="2" :fixOrientation="true" :size="500" :maxWidth="1000" :ql="0.9" type="url"></uni-cpimg>
					<view class="uni-form-item uni-column">
					    <view class="title">身份证</view>
					    <input class="uni-input" v-model="form.idcard" placeholder="请输入真实身份证号码" name="idcard" />
					</view>
					<view class="uni-form-item uni-column">
					    <view class="title">银行名称</view>
					    <view @click="showSinglePicker"><input class="uni-input" v-model="form.bankname" placeholder="点击选择银行(选填)" name="bankname" disabled /></view>
					</view>
					<view class="uni-form-item uni-column">
					    <view class="title">银行卡</view>
					    <input class="uni-input" v-model="form.bankaccount" placeholder="选填" type="number" name="bankaccount" />
					</view>
					<view class="uni-form-item uni-column">
					    <view class="title">支付宝</view>
					    <input class="uni-input" v-model="form.alipayid" placeholder="请输入支付宝" name="alipayid" />
					</view>
					<view class="uni-form-item uni-column">
					    <view class="title">微信</view>
					    <input class="uni-input" v-model="form.wechatid" placeholder="请输入微信" name="wechatid" />
					</view>
					<view class="y-top"><text class="y-top-title">上传本人实拍图</text></view>
					<view class="uni-item-flex">
						<view class="uni-item-image" @click="judgeChoose">
							<image v-if="imageUrl" mode="aspectFill" :src="imageUrl"></image>
							<uni-icon v-else type="plus"></uni-icon>
						</view>
					</view>
					<view class="uni-btn-v">
					    <button formType="submit" class="y-button">确定</button>
					</view>
					<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" mode="selector" :deepLength="1" :pickerValueDefault="[0]"
					 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="bankList"></mpvue-picker>
				</form>
			</view>
			<view class="y-tips">
				<view class="y-tips-title">亲爱的集米宝用户：</view>
			    <view class="y-tips-content">为保障用户的真实性，集米宝将调用第三方公司认证系统进行实名认证，整个认证过程中仅做用户真实性匹配对比，不做其他任何用途。</view>
			    <view class="y-tips-content">如您不愿认证请勿认证；如您认证将视为同意本协议。</view>
			</view>
			<y-popup :show="changeImageShow" @hideModal="changeImageShow=false" @getItem="getSubIndex" :list="changeImageList"></y-popup>
		</view>
	</view>
</template>

<script>
	import api from '@/utils/api/tabBar/index.js'
	import { pathToBase64, base64ToPath } from '@/common/image-tools/index.js'
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue'
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import yPopup from '@/components/uni-popup/uni-popup.vue'
	import uniCpimg from '@/components/uni-cpimg/uni-cpimg.vue'
	import rules from '@/static/js/formRules'
	export default {
		components: {
			mpvuePicker,
			uniIcon,
			yPopup,
			uniCpimg
		},
		data () {
			return {
				info: {},
				bankList: [],
				dataList: [],
				form: {
					bankname: ''
				},
				imageUrl: '',
				themeColor: '#007AFF',
				cityPickerValueDefault: [0, 0, 1],
				changeImageShow: false,
				changeImageList: [
					{ title: '重选', value: 0 },
					{ title: '查看照片', value: 1 }
				]
			}
		},
		onShow () {
			this.getBank()
		},
		methods: {
			cpimgOk (e) {
				console.log(e)
			},
			cpimgErr () {
				
			},
			async getData () {
				const res = await api.home()
				if (res.success) {
					const _this = this
					this.info = res.data.TFirmPO
					this.dataList = [
						{ label: '姓名', value: res.data.TFirmPO.name },
						{ label: '身份证', value: res.data.TFirmPO.idcard },
						{ label: '银行名称', value: _this.getBankName(res.data.TFirmPO.bankaccount, res.data.TFirmPO.bankid) },
						{ label: '银行卡', value: res.data.TFirmPO.bankaccount ? res.data.TFirmPO.bankaccount : '无' },
						{ label: '支付宝', value: res.data.TFirmPO.alipayid },
						{ label: '微信', value: res.data.TFirmPO.wechatid }
					]
				}
			},
			async getBank () {
				const res = await api.bank()
				if (res.success) {
					this.bankList = res.data.map(element => {
						return {
							label: element.bankname,
							value: element.bankid
						}
					})
					this.getData()
				}
			},
			getBankName (status, type) {
				if (status) {
					this.bankList.forEach(element => {
						if (type === element.value) {
							return element.label
						}
					})
				} else {
					return '无'
				}
			},
			showSinglePicker() {
				this.$refs.mpvuePicker.show()
			},
			onCancel () {},
			onConfirm (e) {
				this.form.bankname = e.label
				this.form.bankid = e.value
			},
			judgeChoose () {
				if (this.imageUrl) {
					// 已有图片 进入 重选/查看
					this.changeImageShow = true
				} else {
					// 没有图片
					this.chooseImage()
				}
			},
			getSubIndex (e) {
				this.changeImageShow = false
				switch (e.value) {
					case 0:
						this.chooseImage()
						break
					case 1:
						this.checkImage()
				}
			},
			chooseImage () {
				const _this = this
				let date = new Date().getTime()
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['camera'],
					success (e) {
						_this.filePath = e.tempFilePaths[0]
						let dstUrl = `_doc/self${date}.jpg`
						plus.zip.compressImage({
							src: e.tempFilePaths[0],
							dst: dstUrl,
							width: '15%',
							quality: 30
						}, function (res) {
							pathToBase64(dstUrl).then(response => {
								console.log(response.length)
								_this.imageUrl = response
							})
							uni.showToast({
								icon: 'loading',
								title: '解析图片中 请稍等几秒..'
							})
						}, function (error) {
							uni.showToast({
								icon: 'none',
								title: error.message
							})
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
			checkImage () {
				const _this = this
				uni.previewImage({
					current: _this.filePath,
					urls: [_this.filePath],
					indicator: 'none',
					fail(err) {
						uni.showToast({
							title: '无法打开图片',
							icon: 'none'
						})
					}
				})
			},
			formSubmit (e) {
				if (this.checkForm(e.detail.value)) {
					if (!this.imageUrl) {
						uni.showToast({
							title: '请上传相关图片',
							icon: 'none'
						})
						return false
					}
					let base64 = this.imageUrl.substring(23)
					let data = { ...e.detail.value, bankid: this.form.bankid, base64Str: base64 }
					console.log(base64)
					console.log(base64.length)
					this.sendForm(data)
				}
			},
			async sendForm (e) {
				const res = await api.realName(e)
				if (res.success) {
					uni.showToast({
						title: '认证成功'
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
					case 'bankname':
						if (value) {
							if (!this.form.bankaccount) {
								return {
									status: false,
									message: '请输入银行卡号'
								}
							}
						}
						return {
							status: true
						}
						break
					case 'bankaccount':
						if (value) {
							if (!rules.bankCodeReg.test(value)) {
							  return {
									status: false,
									message: '银行卡号格式不正确'
								}
							}
						}
						return {
							status: true
						}
						break
					case 'alipayid':
						if (!value) {
							return {
								status: false,
								message: '支付宝不能为空'
							}
						}
						return {
							status: true
						}
						break
					case 'wechatid':
						if (!value) {
							return {
								status: false,
								message: '微信不能为空'
							}
						}
						if (!rules.wechat.test(value) && !rules.phone.test(value)) {
							return {
								status: false,
								message: '微信格式不正确'
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

<style lang="scss" scoped>
	.y-top {
		text-align: center;
		padding: 50upx 0;
		.y-top-title {
			display: inline-block;
			padding: 10upx 20upx;
			border: solid 1px $uni-router-color;
			color: $uni-router-color;
		}
	}
	.y-content-hasNav {
		position: relative;
	}
	.y-container {
		padding-bottom: 180upx;
	}
	.y-content {
		padding: 0 20upx;
		background: $uni-box-color;
	}
	.y-list {
		display: flex;
		align-items: center;
		color: #ccc;
		padding: 30upx 20upx;
		justify-content: space-between;
		border-bottom: 1px solid $uni-box-line;
		.y-list-left {
			font-size: 32upx;
		}
		.y-list-right {
			font-size: 32upx;
			display: flex;
			align-items: center;
		}
	}
	.y-list:last-child {
		border-bottom: none;
	}
	.y-content {
		padding: 0;
		background: $uni-box-color;
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
		.set-default {
			padding: 20upx;
		}
		.uni-item-flex {
			padding: 0 20upx 50upx;
			.uni-item-image {
				width: 100%;
				height: 100%;
				min-height: 200upx;
				display: flex;
				align-items: center;
				justify-content: center;
				overflow: hidden;
				border: 1px solid $uni-text-color;
				margin-right: 10upx;
				image {
					width: 100%;
				}
			}
		}
	}
	.uni-btn-v {
		position: absolute;
		bottom: 0;
		left: 0;
		background: $uni-input-bg-color;
		width: 100%;
		.y-button {
			width: 90%;
			margin-left: 5%;
		}
	}
	.y-tips {
		padding: 30upx;
		.y-tips-title {
			font-weight: bold;
			color: $uni-router-color;
		}
		.y-tips-content{
			font-size: $uni-font-size-base;
		}
	}
</style>
