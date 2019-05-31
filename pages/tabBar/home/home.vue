<template>
	<view class="y-content-db">
		<template>
			<uni-swiper-dot :info="carousel" :current="current" :mode="mode" :dots-styles="dotsStyles" field="content">
				<swiper class="swiper-box" @change="change">
					<swiper-item v-for="(item ,index) in carousel" :key="index">
						<view class="swiper-item">
							<image :src="item.imageurl" mode="aspectFill" />
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</template>
		<view class="uni-swiper-msg">
			<view class="uni-swiper-msg-icon">
				<image :src="icon" mode="widthFix"></image>
			</view>
			<swiper vertical="true" autoplay="true" circular="true" interval="3000">
				<swiper-item v-for="(item, index) in msg" :key="index">
					<navigator>{{item.title}}</navigator>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'
	import api from '@/utils/api/tabBar/index.js'
	import icon from '@/static/image/img_announ.png'
	export default {
		components: {
			uniSwiperDot
		},
		data() {
			return {
				icon,
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
				msg : []
			}
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '/pages/about/about'
			});
		},
		onLoad() {
			
		},
		created () {
			this.getData()
		},
		methods: {
			switchActive () {
				
			},
			async getData () {
				const res = await api.home({ description: 'banner' })
				if (res.success) {
					this.carousel = res.data.AppUrl
					this.msg = res.data.NoticePO
				}
			},
			change(e) {
				this.current = e.detail.current
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
</style>
