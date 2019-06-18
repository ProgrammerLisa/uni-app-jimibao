<template>
	<view class="content">
		<view class="banner">
			<image :src="business" mode="widthFix" class="banner-image"></image>
		</view>
		<view class="uni-product-list">
			<view class="uni-product" v-for="(product, index) in productList" :key="index" @click="goDetail(product)">
				<view class="image-view">
					<image v-if="renderImage" class="uni-product-image" :src="product.image"></image>
				</view>
				<view class="uni-product-title">{{product.productionname}}</view>
				<view class="uni-product-price">
					<!-- <text class="uni-product-price-favour">米粒: {{product.originalPrice}}</text> -->
					<text class="uni-product-price-original">米粒: {{product.productionprice}}kg</text>
					<text class="uni-product-tip">{{product.tip}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/utils/api/business/index.js'
	import apiChat from '@/utils/api/chat/index.js'
	import business from '@/static/image/business.png'
	import goods1 from '@/static/image/goods1.png'
	import goods2 from '@/static/image/goods2.png'
	import goods3 from '@/static/image/goods3.png'
	import goods4 from '@/static/image/goods4.png'
	export default {
		data() {
			return {
				business,
				renderImage: false,
				productList: [
					{ image: goods1, details: 'https://static.gzjimibao.com/app/shop-kongtiao-xiangqing.png' },
					{ image: goods2, details: 'https://static.gzjimibao.com/app/shop-dianfanbao-xiangqing.png' },
					{ image: goods3, details: 'https://static.gzjimibao.com/app/shop-fengshan-xiangqing.png' },
					{ image: goods4, details: 'https://static.gzjimibao.com/app/shop-zhazhiji-xiangqing.png' }
				]
			}
		},
		onShow() {
			this.getData()
			setTimeout(()=> {
			    this.renderImage = true
			}, 300)
			
			const _this = this
			uni.onSocketMessage(function(res){
				if (JSON.parse(res.data).type === 'CHAT') {
					_this.noReadCount()
				}
			})
		},
		onNavigationBarButtonTap (e) {
			uni.navigateTo({
				url: '/pages/template/business/order/order'
			})
		},
		methods: {
			async getData () {
				const res = await api.list()
				if (res.success) {
					const _this = this
					this.productList = res.data.list.map((element, index) => {
						return { ...element, ..._this.productList[index] }
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
			goDetail (e) {
				uni.navigateTo({
					url: '/pages/template/business/detail/detail?src=' + JSON.stringify({ detail: e })
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		background: $uni-box-color;
	}
	.banner-image {
		width: 100vw;
	}
	.uni-product-price-original {
		color: $uni-router-color;
	}
</style>
