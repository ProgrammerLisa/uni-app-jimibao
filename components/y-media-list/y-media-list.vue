<template>
	<view>
		<view class="list-cell" hover-class="uni-list-cell-hover" @click="bindClick">
			<view class="media-list" v-if="options.title">
				<view class="media-image-left">
					<text class="media-title media-title2">{{options.title}}</text>
					<view class="image-section image-section-left">
						<view class="y-mask" v-if="maskShow">
							<uni-icon type="videocam" color="#fff"></uni-icon>
						</view>
						<image class="image-list1 image-list2" mode="aspectFill"
						 :src="options.path?imageUrl+options.path:defaultImage"></image>
					</view>
				</view>
				<view class="media-foot">
					<view class="media-info">
						<text class="info-text">{{tips}}</text>
						<text class="info-text">发布于</text>
						<text class="info-text">{{options.uploadtime}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import defaultImage from '@/static/image/avatar.png'
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default {
		components: {
			uniIcon
		},
		props: {
			options: {
				type: Object,
				default: function(e) {
					return {}
				}
			},
			tips: {
				type: String,
				default: '集米宝教程'
			},
			maskShow: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				defaultImage,
				imageUrl: this.$imageUrl
			}
		},
		onLoad () { 
		},
		methods: {
			close(e) {
				this.$emit('close');
			},
			bindClick() {
				this.$emit('click');
			}
		}
	}
</script>

<style scoped lang="scss">
	view {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	.list-cell {
		width: 750upx;
		padding: 0 30upx;
	}

	.uni-list-cell-hover {
		background-color: #eeeeee;
	}

	.media-list {
		flex: 1;
		flex-direction: column;
		padding: 20upx 0;
	}

	.media-image-right {
		flex-direction: row;
	}

	.media-image-left {
		flex-direction: row-reverse;
		align-items: center;
	}

	.media-title {
		flex: 1;
	}

	.media-title {
		lines: 3;
		text-overflow: ellipsis;
		font-size: 32upx;
		color: #555555;
	}

	.media-title2 {
		flex: 1;
		margin-top: 6upx;
		margin-left: 10upx;
		line-height: 40upx;
	}

	.image-section {
		margin-top: 20upx;
		flex-direction: row;
		justify-content: space-between;
	}

	.image-section-right {
		margin-top: 0upx;
		margin-left: 10upx;
		width: 225upx;
		height: 146upx;
	}

	.image-section-left {
		margin-top: 0upx;
		margin-right: 10upx;
		width: 225upx;
		height: 146upx;
		position: relative;
	}

	.image-list1 {
		width: 690upx;
		height: 481upx;
	}

	.image-list2 {
		width: 225upx;
		height: 146upx;
	}

	.image-list3 {
		width: 225upx;
		height: 146upx;
	}

	.media-info {
		flex-direction: row;
	}

	.info-text {
		margin-right: 20upx;
		color: #999999;
		font-size: 24upx;
	}

	.media-foot {
		margin-top: 20upx;
		flex-direction: row;
		justify-content: space-between;
	}

	.max-close-view {
		align-items: center;
		justify-content: flex-end;
		flex-direction: row;
		height: 40upx;
		width: 80upx;
	}

	.close-view {
		border-style: solid;
		border-width: 1px;
		border-color: #999999;
		border-radius: 10upx;
		justify-content: center;
		height: 30upx;
		width: 40upx;
		line-height: 30upx;
	}

	.close {
		text-align: center;
		color: #999999;
		font-size: 28upx;
	}
	
	.y-mask {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(0, 0, 0, .5);
	}
</style>
