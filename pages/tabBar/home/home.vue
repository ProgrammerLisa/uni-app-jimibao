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
		<view class="game">
			<view class="animate">
				<image :src="animateImage" mode="widthFix"></image>
				<view class="uni-center collet">{{colletNumber}}</view>
				<view class="button-box">
					<button class="y-button" @click="collet">集米</button>
				</view>
			</view>
			<view class="ugly">
				<image :src="gameBg" mode="widthFix"></image>
				<view class="ugly-content">
					<view class="ugly-header">
						<view class="ugly-header-content">
							<image class="header-avatar" :src="selfInfo.headimage?imageUrl+selfInfo.headimage:avatar" mode="widthFix"></image>
							<view class="header-flex">
								<image class="header-flex-image" :src="shengdai" mode="widthFix"></image>
								<image class="header-flex-image" :src="shengdai" mode="widthFix"></image>
								<image class="header-flex-image" :src="shengdai" mode="widthFix"></image>
							</view>
						</view>
					</view>
					<view class="ugly-box">
						<view class="ugly-box-item" v-for="(i, index) in ugly" :key="index">
							<image :src="i.name | imageFilter" mode="widthFix" class="ugly-box-image"></image>
						</view>
					</view>
					<view class="ugly-button">
						<image :src="uglyType?duomi:choujia" mode="widthFix" @click="uglyTypeChange"></image>
					</view>
					<view>
						<scroll-view :scroll-x="true" class="scroll-view_H">
							<view class="ugly-person">
								<view v-for="(i, index) in uglyList" :key="index" class="ugly-person-item scroll-view-item_H">
									<image :src="i.headimage?imageUrl+i.headimage:avatar" mode="widthFix" @click="stole(i)" :style="i.using?'filter: grayscale(100%);':''"></image>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
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
	import animateImage from '@/static/image/game/animate.gif'
	import gameBg from '@/static/image/game/bg.png'
	import avatar from '@/static/image/avatar.png'
	import shengdai from '@/static/image/game/shengdai.png'
	import shidai from '@/static/image/game/shidai.png'
	import xiandai from '@/static/image/game/xiandai.png'
	import yuanwai from '@/static/image/game/yuanwai.png'
	import caizhu from '@/static/image/game/caizhu.png'
	import dizhu from '@/static/image/game/dizhu.png'
	import dianhu from '@/static/image/game/dianhu.png'
	import funong from '@/static/image/game/funong.png'
	import zhongnong from '@/static/image/game/zhongnong.png'
	import pinnong from '@/static/image/game/pinnong.png'
	import choujia from '@/static/image/game/choujia.png'
	import duomi from '@/static/image/game/duomi.png'
	import tool1 from '@/static/image/game/tool1.png'
	import tool2 from '@/static/image/game/tool2.png'
	import tool3 from '@/static/image/game/tool3.png'
	import tool4 from '@/static/image/game/tool4.png'
	import tool5 from '@/static/image/game/tool5.png'
	import tool6 from '@/static/image/game/tool6.png'
	
	export default {
		components: {
			uniSwiperDot,
			uniIcon
		},
		filters: {
			imageFilter (val) {
				switch (val) {
					case '小米袋':
						return tool1
					case '中米袋':
						return tool2
					case '大米袋':
						return tool3
					case '米缸':
						return tool4
					case '米仓':
						return tool5
				}
			}
		},
		data() {
			return {
				animateImage, gameBg, avatar, shengdai, shidai, xiandai, yuanwai, caizhu, dizhu, dianhu,
				funong, zhongnong, pinnong, choujia, duomi, tool1, tool2, tool3, tool4, tool5, tool6,
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
				],
				ugly: [tool1, tool2, tool3, tool4, tool5, tool6, tool1, tool2, tool3, tool4, tool5, tool6, tool1, tool2, tool3, tool4, tool5, tool6],
				colletNumber: 0,
				selfInfo: {},
				imageUrl: '',
				uglyType: true,
				uglyList: []
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
		onLoad () {
			this.imageUrl = this.$imageUrl
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
			this.getUgly()
			
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
					this.colletNumber = res.data.activevalueNumber.number
					this.selfInfo = res.data.TFirmPO
				}
				const response = await api.toolMine()
				if (response.success) {
					if (response.data.hasNextPage) {
						this.getTool(response.data.total)
					} else {
						this.ugly = response.data.list
					}
				}
			},
			async getTool (e) {
				const res = await api.toolMine({page: 1, size: e})
				if (res.success) {
					this.ugly = res.data.list
				}
			},
			async getUgly () {
				let url
				if (this.uglyType) {
					url = api.uglyPerson
				} else {
					url = api.thief
				}
				const res = await url()
				if (res.success) {
					this.uglyList = res.data.map(element => {
						return {...element, using: false}
					})
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
			async collet () {
				const res = await api.collet()
				if (res.success) {
					this.colletNumber = 0
					uni.showToast({
						title: '收集成功'
					})
				}
			},
			uglyTypeChange () {
				this.uglyType = !this.uglyType
				this.getUgly()
			},
			async stole (e) {
				if (e.using) {
					uni.showToast({
						title: '今天已经偷过该用户',
						icon: 'none'
					})
					return false
				}
				let url, query, title
				if (this.uglyType) {
					url = api.stoleActive
					query = { masterid: e.firmid },
					title = '夺米成功'
				} else {
					url = api.stolePassive
					query = { thief: e.firmid },
					title = '复仇成功'
				}
				const res = await url(query)
				if (res.success) {
					this.uglyList.forEach(element => {
						if (element.firmid === res.data.master) {
							element.using = true
							uni.showToast({
								title: title
							})
						}
					})
				}
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
	@keyframes slidein {
	  from {
		top: 20upx;
	  }
	  50% {
		  top: 50upx;
	  }
	  to {
		top: 20upx;
	  }
	}
	.y-content-db {
		width: 100vw;
		overflow-x: hidden;
	}
	.game {
		width: 100vw;
		overflow: hidden;
		.animate {
			position: relative;
			image {
				width: 100%;
			}
			.collet {
				position: absolute;
				left: 20upx;
				top: 20upx;
				width: 80upx;
				height: 80upx;
				border-radius: 100%;
				background: $uni-router-color;
				line-height: 80upx;
				color: #fff;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: $uni-font-size-sm;
				animation: slidein 1.5s infinite linear;
			}
			.button-box {
				position: absolute;
				top: 20upx;
				right: 20upx;
				.y-button {
					background: $uni-router-color;
					color: #fff;
				}
			}
		}
		.ugly {
			position: relative;
			image {
				width: 100%;
			}
			.ugly-content {
				overflow: hidden;
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
			}
			.ugly-header {
				display: flex;
				justify-content: flex-end;
				margin-top: 160upx;
			}
			.ugly-header-content {
				width: 200upx;
				margin-right: 70upx;
				.header-avatar {
					width: 90%;
					margin-left: 5%;
					border-radius: 100%;
				}
			}
			.header-flex {
				display: flex;
				justify-content: space-around;
				.header-flex-image {
					width: 30%;
				}
			}
			.ugly-box {
				display: flex;
				flex-wrap: wrap;
				padding: 0 100upx;
				height: 330upx;
				margin: 60upx 0;
				overflow: scroll;
				align-items: center;
			}
			.ugly-box-item {
				width: 20%;
				text-align: center;
			}
			.ugly-box-image {
				width: 80%;
			}
			.ugly-button {
				width: 200upx;
			}
			.ugly-person-item {
				width: 80upx;
				height: 80upx;
				border-radius: 100%;
				margin: 0 20upx;
				overflow: hidden;
				.ugly-person-using {
					transition: .2s;
				}
			}
			.scroll-view_H {
				white-space: nowrap;
				width: 84%;
				margin-left: 8%;
			}
			.scroll-view-item_H {
				display: inline-block;
				text-align: center;
			}
		}
	}
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
