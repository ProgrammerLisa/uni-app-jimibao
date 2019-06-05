<template>
	<view class="y-container">
		<view class="y-row">
			<uni-tag :mark="true" text="当前米库总量：0" :inverted="true" />
			<uni-tag :mark="true" text="我的奖品" class="uni-tag-right" :inverted="true" />
		</view>
		<view class="y-row">
			<uni-tag :mark="true" text="次数：0" :inverted="true" />
		</view>
		<view class="lottery-box">
			<view class="y-item" v-for="(i, index) in list" :key="index">
				<image class="y-image" :src="i.img"></image>
				<view class="y-modal" v-if="index === list.index"></view>
			</view>
		</view>
		<view class=""></view>
	</view>
</template>

<script>
	import uniTag from '@/components/uni-tag/uni-tag.vue'
	export default {
		components: {
			uniTag
		},
		data () {
			return {
				list: [
					{ img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-qiche.png', index: 0 },
					{ img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-shoubiao.png', index: 1 },
					{ img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-iphonex.png', index: 2 },
					{ img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-bingxiang.png', index: 3 },
					{ img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-chuifengji.png', index: 11 },
				    { img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-10kg.png', index: 12 },
				    { img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-5kg.png', index: 13 },
				    { img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-xiyiji.png', index: 4 },
				    { img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-zhazhiji.png', index: 10 },
				    { img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-0.1kg.png', index: 15 },
				    { img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-1kg.png', index: 14 },
				    { img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-kongtiao.png', index: 5 },
				    { img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-kouhong.png', index: 9 },
				    { img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-dianfengshan.png', index: 8 },
				    { img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-weibolu.png', index: 7 },
				    { img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-dianfanbao.png', index: 6 }
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.y-container {
		padding: 20upx 0;
	}
	.y-row {
		display: flex;
		justify-content: space-between;
		.uni-tag {
			background: transparent;
			color: $uni-font-color;
			border-color: $uni-router-color;
			margin: 10upx 0;
			transition: .2s;
		}
		.uni-tag:active {
			background: $uni-router-color;
			color: $uni-text-color-inverse;
		}
		.uni-tag-right {
			border-radius: 30upx 0 0 30upx;
		}
	}
	.lottery-box{
		outline: 10upx solid $uni-box-color;
		border-radius: 50upx;
		box-shadow: 0 0 0 10px moccasin;
		margin: 60upx auto 30upx;
		padding: 10upx 0;
		width: 90vw;
		height: 90vw;
		overflow: hidden;
		display: flex;
		flex-wrap: wrap;
	}
	.y-item {
		width: 25%;
		height: 25%;
		display: flex;
		align-items: center;
		justify-content: center;
		.y-image {
			width: 90%;
			height: 90%;
		}
	}
</style>
