<template>
	<view class="y-content-hasNav">
		<view class="y-box">
			<view class="avatar">
			  <image :src="avatar?iamgeUrl+avatar:defaultAvatar"></image>
			</view>
			<view>我是集米宝粉丝</view>
			<view>我为集米宝代言</view>
			<view>
			  推荐码: {{code}}
			  <text class="y-copy" @click="copy">复制</text>
			</view>
		</view>
		<view class="_qrCode">
			<canvas  style="width: 100px;height: 100px;" class="_qrCodeCanvas" id="_myQrCodeCanvas" canvas-id="_myQrCodeCanvas" />
			<image :src="QRImage" style="width: 100px;height: 100px;"></image>
		</view>
	</view>
</template>

<script>
	import defaultAvatar from '@/static/image/avatar.png'
	import logo from '@/static/image/logo.png'
	import api from '@/utils/api/tabBar/index.js'
	import QRCode from '@/components/tki-qrcode/qrcode.js'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	let qrcode
	export default {
		components: {
			uniPopup
		},
		data () {
			return {
				defaultAvatar,
				logo,
				avatar: '',
				code: '',
				iamgeUrl: '',
				QRImage: '',
				shareUrl: 'https://static.gzjimibao.com/register/index.html?RecommendCode=',
				QR: {
					usingComponents: true,
					showLoading: true,
					loadingText: '二维码生成中',
					text: 'https://static.gzjimibao.com/register/index.html', // 生成内容
					size: 100, // 二维码大小
					background: '#fff', // 背景色
					foreground: "#000", // 前景色
					pdground: '#000', // 定位角点颜色
					correctLevel: 3, // 容错级别
					image: logo, // 二维码图标
					imageSize: 40,// 二维码图标大小
				}
			}
		},
		onNavigationBarButtonTap(e) {
			const _this = this
			plus.share.sendWithSystem({
				content: '集米宝 集出更好生活',
				href: _this.shareUrl + _this.code,
				pictures: logo
			}, function () {
				uni.showToast({
					title: '分享成功'
				})
			}, function () {
				uni.showToast({
					title: '分享失败',
					icon: 'none'
				})
			})
		},
		onLoad () {
			this.iamgeUrl = this.$imageUrl
		},
		onShow () {
			this.getData()
		},
		methods: {
			async getData () {
				const _this = this
				const res = await api.home()
				if (res.success) {
					this.avatar = res.data.TFirmPO.headimage
					this.code = res.data.TFirmPO.tuijianma
					qrcode = new QRCode({
						context: _this,
						..._this.QR,
						cbResult: function (res) { // 生成二维码的回调
							_this.QRImage = res
						},
					})
				}
			},
			copy () {
				const _this = this
				uni.setClipboardData({
					data: _this.code,
					success () {
						uni.showToast({
							title: '复制成功'
						})
					},
					fail () {
						uni.showToast({
							title: '复制失败',
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.y-content-hasNav {
		height: 100vh;
		overflow: hidden;
		background: url('https://static.gzjimibao.com/app/zhaomu.jpg');
		background-size: 100%;
	}
	view {
		color: #fff;
		font-weight: bold;
	}
	.y-box {
		position: absolute;
		bottom: 15vh;
		left: 10vw;
		.avatar {
		  width: 160upx;
		  height: 160upx;
		  margin-bottom: 20upx;
		  border-radius: 50%;
		  overflow: hidden;
		  border: 6upx solid #f5f5f5;
		  image {
			width: 100%;
			height: 100%;
		  }
		}
	}
	.y-copy {
		font-size: smaller;
		  background: #fff;
		  color: #f5b014;
		  padding: 4upx 20upx;
		  border-radius: 20upx;
		  margin-left: 20upx;
	}
	.code {
		position: absolute;
		top: 55%;
		right: 30upx;
		width: 200upx;
		height: 200upx;
	}
	.y-button {
		position: absolute;
		width: 80%;
		margin-left: 10%;
		bottom: 40upx;
		background: #fff;
		color: #F5B014;
	}
	.y-button:active {
		background: #ccc;
	}
	._qrCode {
	  position: absolute;
	  top: 55%;
	  right: 30px;
	}
	._qrCodeCanvas {
	  position: fixed;
	  top: -99999upx;
	  left: -99999upx;
	  z-index: -99999;
	}
</style>
