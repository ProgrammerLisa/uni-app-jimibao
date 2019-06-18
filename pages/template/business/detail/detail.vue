<template>
	<view class="content">
		<view class="y-content-db">
			<view class="banner">
				<image :src="dataList.image" mode="widthFix" class="banner-image"></image>
			</view>
			<view class="goods">
				<view class="title">{{dataList.productionname}}</view>
				<view class="info">
					<text class="price">米粒: {{dataList.productionprice}}kg</text>
					<text class="number">已售: {{dataList.sellnumber}}</text>
				</view>
			</view>
			<view class="detail">
				<view class="tips">详情</view>
				<view class="banner">
					<image v-if="renderImage" :src="dataList.details" mode="widthFix" class="banner-image"></image>
				</view>
			</view>
		</view>
		<view class="footer">
			<button class="y-button" @click="payShow=true">立即兑换</button>
		</view>
		<y-pay-confirm :show="payShow" @hideModal="payShow=false">
			<view class="modal">
				<view class="modal-title">兑换</view>
				<view class="modal-tips">提示: 请认真核对商品信息</view>
				<view class="modal-goods">
					<view class="modal-goods-item">
						<view>{{dataList.productionprice*count}}kg</view><view>单价</view>
					</view>
					<view class="modal-goods-item">
						<view>{{count}}</view><view>数量</view>
					</view>
				</view>
				<view class="modal-plus">
					<view class="modal-plus-label">购买数量</view>
					<view class="modal-plus-detail">
						<uni-icon @click="countMinus" type="minus" class="modal-plus-button" size="40"></uni-icon>
						<view>{{count}}</view>
						<uni-icon @click="countPlus" type="plus" class="modal-plus-button" size="40"></uni-icon>
					</view>
				</view>
				<view class="modal-address">
					<view class="modal-address-title" @click="goAddress">收货地址 {{address.addressid?'（重新选择）':'（未选择）'}}</view>
					<view class="modal-address-content">{{address.addressee}}</view>
					<view class="modal-address-content">{{address.phone}}</view>
					<view class="modal-address-content">{{address.location}} {{address.address}}</view>
				</view>
				<view class="modal-password">
					<view class="modal-password-box">
						<text class="modal-password-label">交换密码</text>
						<input class="modal-password-input" type="password" v-model="password" placeholder="请输入交换密码" />
					</view>
				</view>
				<view class="modal-password-tips">
					初始交换密码为123456
				</view>
				<view class="modal-submit">
					<button class="y-button" @click="pay">确定</button>
				</view>
			</view>
		</y-pay-confirm>
	</view>
</template>

<script>
	import yPayConfirm from '@/components/y-confirm/y-pay-confirm.vue'
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import api from '@/utils/api/business/index.js'
	export default {
		components: {
			yPayConfirm,
			uniIcon
		},
		data() {
			return {
				dataList: {},
				renderImage: false,
				payShow: false,
				count: 1,
				address: {
					addressee: '',
					phone: '',
					location: '',
					address: ''
				},
				password: ''
			}
		},
		onLoad (e) {
			this.dataList = JSON.parse(e.src).detail
		},
		methods: {
			countMinus() {
				if (this.count > 1) {
					this.count--
				}
			},
			countPlus() {
				this.count++
			},
			async pay () {
				if (!this.address.addressid) {
					uni.showToast({
						title: '请选择收货地址',
						icon: 'none'
					})
					return
				}
				if (!this.password) {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					})
					return
				}
				const res = await api.pay({ productionid: this.dataList.productionid, number: this.count, tradepassword: this.password, addressid: this.address.addressid })
				if (res.success) {
					this.payShow = false
					uni.showToast({
						title: '购买成功！'
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 500)
				}
			},
			goAddress () {
				uni.navigateTo({
					url: '/pages/template/profile/address/address?fromUrl=' + 'business'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		background: #fff;
	}
	.y-content-db {
		background: #fff;
		height: calc(100vh - 40px);
		overflow: scroll;
	}
	.banner-image {
		width: 100vw;
	}
	.goods {
		padding: 0 30upx;
		.title {
			font-weight: bold;
		}
		.info {
			display: flex;
			justify-content: space-between;
			.price {
				color: $uni-router-color;
			}
			.number {
				color: $uni-text-color-placeholder;
			}
		}
	}
	.detail {
		margin-top: 30upx;
		.tips {
			border-top: 1px solid $uni-input-border-color;
			border-bottom: 1px solid $uni-input-border-color;
			padding: 20upx 0;
			text-align: center;
			font-weight: bold;
		}
	}
	.modal {
		background: #fff;
		position: relative;
		padding-top: 100upx;
	}
	.modal-title {
		font-weight: bold;
		border-radius: 100%;
		width: 100upx;
		height: 100upx;
		background: $uni-router-color;
		position: absolute;
		top: -50upx;
		left: 50%;
		margin-left: -50upx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.modal-goods {
		display: flex;
		.modal-goods-item {
			flex: 1;
			text-align: center;
		}
	}
	.modal-tips {
		color: $uni-router-color;
		text-align: center;
	}
	.modal-plus {
		display: flex;
		padding: 20upx 20upx 20upx 50upx;
		justify-content: space-between;
		align-items: center;
		.modal-plus-detail {
			display: flex;
			align-items: center;
			.modal-plus-button {
				border-radius: 100%;
				color: $uni-router-color;
				margin: 0 30upx;
			}
		}
	}
	.modal-address {
		padding: 10upx 50upx;
		.modal-address-title {
			color: $uni-router-color;
		}
	}
	.modal-password {
		padding: 20upx 50upx;
		.modal-password-box {
			display: flex;
			background: $uni-bg-color-grey;
			border-radius: 10upx;
			padding: 20upx 10upx;
			.modal-password-label {
				flex: 1;
			}
			.modal-password-input {
				flex: 1;
			}
		}
	}
	.modal-password-tips {
		color: $uni-text-color-grey;
		text-align: center;
		padding-bottom: 20upx;
	}
	.modal-submit {
		.y-button {
			background: $uni-router-color;
			color: #fff;
			border-radius: 0;
			border:none;
		}
	}
</style>
