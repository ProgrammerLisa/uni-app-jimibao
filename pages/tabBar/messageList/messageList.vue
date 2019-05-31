<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<view>
			<text class="title" @click="setTabBarBadge">{{title}}</text>
			<uni-icon :type="item" :color="'#8f8f94'" size="40" @click="switchActive()" />
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default {
		components: {
			uniIcon
		},
		data() {
			return {
				title: 'Hello',
				item: 'weixin'
			}
		},
		onLoad() {

		},
		methods: {
			setTabBarBadge () {
				if (!this.hasSetTabBarBadge) {
					uni.setTabBarBadge({
						index: 2,
						text: '2'
					})
				} else {
					uni.removeTabBarBadge({
						index: 2
					})
				}
				this.hasSetTabBarBadge = !this.hasSetTabBarBadge
			}
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
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
</style>
