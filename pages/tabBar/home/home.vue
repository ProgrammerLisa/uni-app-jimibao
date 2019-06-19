<template>
	<view class="y-content-db">
		<template>
			<uni-swiper-dot :info="carousel" :current="current" :mode="mode" field="content" :dotsStyles="dotsStyles">
				<swiper class="swiper-box" @change="change">
					<swiper-item v-for="(item ,index) in carousel" :key="index">
						<view class="swiper-item">
							<image :src="item.imageurl" mode="aspectFill" @click="goPath(item.appurl)" />
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</template>
		<view class="uni-swiper-msg">
			<view class="uni-swiper-msg-icon">
				<uni-icon type="sound" color="#E16912"></uni-icon>
			</view>
			<swiper vertical="true" autoplay="true" circular="true" interval="3000">
				<swiper-item v-for="(item, index) in msg" :key="index">
					<navigator :url="'/pages/template/home/news/detail?content='+item.content">{{item.title}}</navigator>
				</swiper-item>
			</swiper>
		</view>
		<view class="y-list">
			<view v-for="(i, index) in list" :key="index" @click="goPath(i.path)" class="y-list-item">
				<image :src="i.img" class="image"></image>
				<text class="title">{{i.title}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import api from '@/utils/api/tabBar/index.js'
	import apiChat from '@/utils/api/chat/index.js'
	import partner from '@/static/image/partner.png'
	import propaganda from '@/static/image/propaganda.png'
	import tool from '@/static/image/tool.png'
	import course from '@/static/image/course.png'
	import lottery from '@/static/image/lottery.png'
	export default {
		components: {
			uniSwiperDot,
			uniIcon
		},
		data() {
			return {
				carousel: [],
				current: 0,
				mode: 'long',
				dotsStyles: {
					backgroundColor: 'rgba(255,255 255, .3)',
					border: '1px rgba(255, 255, 255, .3) solid',
					color: '#fff',
					selectedBackgroundColor: 'rgba(255, 255, 255, .9)',
					selectedBorder: '1px rgba(255, 255, 255, .9) solid'
				},
				msg : [],
				list: [
					{ title: '合伙人', path: '/pages/template/home/partner/partner', img: partner },
					{ title: '招募', path: '/pages/template/profile/topList-team-recruit/topList-team-recruit', img: propaganda },
					{ title: '工具', path: '/pages/template/home/tool/tool', img: tool },
					{ title: '商学院', path: '/pages/template/home/course/course', img: course },
					{ title: '抽奖', path: '/pages/template/profile/topList-lottery/topList-lottery', img: lottery }
				]
			}
		},
		onNavigationBarButtonTap(e) {
			if (e.tips === 'news') {
				uni.setStorage({
					key: 'home-dot',
					data: 'prohibit',
					success () {
						uni.navigateTo({
							url: '/pages/template/home/news/news'
						})
					}
				})
			}
			if (e.tips === 'scanCode') {
				uni.scanCode({
					success (res) {
						if ((res.result.indexOf('http://') !== -1) || (res.result.indexOf('https://') !== -1)) {
							uni.navigateTo({
								url: '/pages/template/home/course/web-view?title="扫描结果"&src=' + res.result
							})
						} else {
							uni.navigateTo({
								url: '/pages/template/home/scan-code/scan-code?content=' + res.result
							})
						}
					},
					fail () {
						uni.showToast({
							title: '解析失败',
							icon: 'none'
						})
					}
				})
			}
		},
		onShow() {
			const _this = this
			uni.getStorage({
				key: 'home-dot',
				success (res) {
					if (res.data === 'prohibit') {
						_this.setStyle(0, false)
					} else {
						_this.setStyle(0, true)
					}
				},
				fail () {
					_this.setStyle(0, true)
				}
			})
			this.getData()
			
			uni.onSocketMessage(function(res){
				if (JSON.parse(res.data).type === 'CHAT') {
					_this.noReadCount()
				}
			})
		},
		
		methods: {
			/**
			 * 修改导航栏buttons
			 * index[number] 修改的buttons 下标索引，最右边索引为0
			 * show[boolean] 显示还是隐藏角标或者红点
			 * text[string] 需要修改的角标的text 内容 ，如果定义redDot 此参数无效 ，如果定义badgeText请设置具体，如果不用输入
			 */
			setStyle(index, show,text) {
				let pages = getCurrentPages()
				let page = pages[pages.length - 1]
				// #ifdef APP-PLUS
				let currentWebview = page.$getAppWebview()
				if(show){
					if(index === 0){
						currentWebview.showTitleNViewButtonRedDot({index:index,text:text})
					}else{
						currentWebview.setTitleNViewButtonBadge({index:index,text:text})
					}
				}else{
					if(index === 0){
						currentWebview.hideTitleNViewButtonRedDot({index:index})
					}else{
						currentWebview.removeTitleNViewButtonBadge({index:index})
					}
				}
				
				// #endif
			},
			async getData () {
				const res = await api.home({ description: 'banner' })
				if (res.success) {
					this.carousel = res.data.AppUrl
					this.msg = res.data.NoticePO
				}
			},
			async noReadCount () {
				const res = await api.unRead()
				if (res.success) {
					if(res.data > 0) {
						let text
						if (res.data < 100) {
							text = res.data.toString()
						} else {
							text = '99+'
						}
						uni.setTabBarBadge({
							index: 3,
							text: text
						})
					}
				}
			},
			change(e) {
				this.current = e.detail.current
			},
			goPath (path) {
				uni.navigateTo({
					url: path
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #fff
	}
	
	view {
		font-size: 28upx;
		line-height: inherit
	}
	
	.example {
		padding: 0 30upx 30upx
	}
	
	.example-title {
		font-size: 32upx;
		line-height: 32upx;
		color: #777;
		margin: 40upx 25upx;
		position: relative
	}
	
	.example .example-title {
		margin: 40upx 0
	}
	
	.example-body {
		padding: 0 40upx
	}
	
	.swiper-box {
		height: 400upx;
	}
	
	.swiper-item {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		background: #eee;
		color: #fff;
	}
	
	.swiper-item image {
		width: 100%;
		height: 100%;
	}
	.uni-swiper-msg {
		padding: 10upx 20upx;
		background: $uni-box-color;
	}
	.y-list {
		display: flex;
		padding: 20upx 0;
		margin: 10upx 0;
		// border-top: 10upx solid $uni-box-spacing-line;
		// border-bottom: 10upx solid $uni-box-spacing-line;
		background: $uni-login-bg-color;
		.y-list-item {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			text-align: center;
			.image {
				width: 70upx;
				height: 70upx;
				margin: auto;
			}
			.title {
				font-size: 30upx;
			}
		}
	}
</style>
