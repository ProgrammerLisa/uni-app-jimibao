<template>
	<view>
		<view class="level-box">
			<view class="level-flex">
				<uni-icon color="#ffe0b2" type="navigate"></uni-icon>
				<text class="level">我的会员等级</text>
				<text class="count">Lv1</text>
			</view>
			<view class="level-flex">
				<text>当前贡献值：</text>
				<text class="contribution">0</text>
			</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in list" :key="key">
				<view class="uni-media-list">
					<view class="uni-media-list-logo">
						<uni-icon color="#ffe0b2" type="paperplane"></uni-icon>
					</view>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">
							<text>{{value.title}}</text>
							<text>{{value.count}}</text>
						</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">{{value.content}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import api from '@/utils/api/tabBar/index.js'
	export default {
		components: {
			uniIcon
		},
		data () {
			return {
				list: []
			}
		},
		onLoad () {
			this.getData ()
		},
		methods: {
			async getData () {
				const res = await api.level()
				if (res.success) {
					this.list = res.data.map(element => {
						return {
							title: '会员等级 Lv' + element.levelid,
							count: '贡献值≥' + element.levelstandard,
							content: '交易手续费率 ' + element.sfee*100 + '%'
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.level-box {
		text-align: center;
		padding: $uni-spacing-row-lg 0;
		background: $uni-box-color;
	}
	.level-flex {
		margin-bottom: $uni-spacing-row-lg;
		display: flex;
		align-items: center;
		width: 100%;
		justify-content: center;
		font-size: $uni-font-size-lg;
		.level {
			margin: 0 15upx;
		}
		.count {
			background: $uni-router-color;
			color: $uni-text-color-inverse;
			padding: 0 15upx;
			border-radius: 10upx;
			line-height: 1.5;
		}
		.contribution {
			background: transparent;
			padding: 0 15upx;
			border-radius: 10upx;
			line-height: 1.5;
			border: solid 1px $uni-router-color;
		}
	}
	.level-flex:last-child {
		margin-bottom: 0;
	}
	.uni-list {
		background: transparent;
	}
	.uni-media-list-logo {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.uni-media-list-text-top {
		display: flex;
		justify-content: space-between;
		text:first-child {
			color: $uni-router-color;
		}
	}
</style>
