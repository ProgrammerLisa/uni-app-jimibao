<template>
	<view class="y-content">
		<form @submit="formSubmit">
			<view class="uni-form-item uni-column">
		        <view class="title">姓名</view>
		        <input class="uni-input" :value="form.addressee" placeholder="最少2个字,最多15个字" name="addressee" />
		    </view>
			<view class="uni-form-item uni-column">
			    <view class="title">电话</view>
			    <input class="uni-input" :value="form.phone" placeholder="不少于7位" type="number" name="phone" />
			</view>
			<view class="uni-form-item uni-column">
			    <view class="title">地区</view>
			    <view @click="showMulLinkageThreePicker"><input class="uni-input" :value="form.location" placeholder="省份 城市 县区" name="location" disabled /></view>
			</view>
			<view class="uni-form-item uni-column">
			    <view class="title">地址</view>
			    <input class="uni-input" :value="form.address" placeholder="请输入详细地址" name="address" />
			</view>
			<view class="set-default">
				<checkbox-group @change="checkboxChange" >
					<label>
						<checkbox :checked="form.status" />设置成默认收货地址
					</label>
				</checkbox-group>
			</view>
			<view class="uni-btn-v">
			    <button formType="submit" class="y-button">确定</button>
			</view>
			<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
			 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
		</form>
	</view>
</template>

<script>
	import api from '@/utils/api/tabBar/index.js'
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	export default {
		components: {
			mpvueCityPicker
		},
		data () {
			return {
				themeColor: '#007AFF',
				cityPickerValueDefault: [0, 0, 1],
				form: {
					location: ''
				},
				type: 'add'
			}
		},
		onLoad (e) {
			if (e.type === 'edit') {
				this.type = e.type
				uni.setNavigationBarTitle({
					title: '编辑地址'
				})
				let data = JSON.parse(e.value)
				if (data.status === 1) {
					data.status = true
				} else {
					data.status = false
				}
				this.form = data
			}
		},
		methods: {
			goBack () {
				uni.navigateBack()
			},
			onCancel(e) {
				
			},
			onConfirm(e) {
				this.form.location = e.label
			},
			// 三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			checkboxChange (e) {
				if (e.detail.value.length > 0) {
					this.form.status = true
				} else {
					this.form.status = false
				}
			},
			formSubmit (e) {
				if (this.checkForm(e.detail.value)) {
					let data = e.detail.value
					this.form.status ? data.status = 1 : data.status = 0
					this.sendForm(data)
				}
			},
			async sendForm (e) {
				let url
				let data = e
				if (this.type === 'add') {
					url = api.addAddress
				} else {
					url = api.editAddress
					data = {...e, addressid: this.form.addressid}
				}
				const res = await url(data)
				if (res.success) {
					uni.showToast({
						title: '操作成功'
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
					case 'addressee':
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
						if (!(value.length > 7)) {
							return {
								status: false,
								message: '号码不少于7位'
							}
						}
						return {
							status: true
						}
						break
					case 'location':
						if (!value) {
							return {
								status: false,
								message: '请选择地区'
							}
						}
						return {
							status: true
						}
						break
					case 'address':
						if (!value) {
							return {
								status: false,
								message: '请输入详细地址'
							}
						}
						return {
							status: true
						}
						break
					case 'status':
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
	}
</style>
