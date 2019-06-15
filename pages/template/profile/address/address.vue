<template>
	<view>
		<view class="uni-list" v-if="dataList.length>0">
			<uni-swipe-action :options="options" @click="bindClick(key)" v-for="(value, key) in dataList" :key="key">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-media-list uni-pull-right">
						<view class="uni-media-list-logo" @click="goEdit(value)">
							<uni-icon type="compose"></uni-icon>
						</view>
						<view class="uni-media-list-body" @click="copyPath(value)">
							<view class="uni-media-list-text-top">{{value.location}} {{value.address}}</view>
							<view class="uni-media-list-text-bottom uni-ellipsis">
								<uni-tag class="default-tag" v-if="value.status === 1" size="small" type="warning" text="默认"/>
								<text>{{value.addressee}} {{value.phone}}</text>
							</view>
						</view>
					</view>
				</view>
			</uni-swipe-action>
		</view>
		<view class="default-null" v-else>
			<view class="image"><image :src="defaultImage"></image></view>
			<view>暂无信息</view>
		</view>
		<y-confirm :show="show" title="确定删除此条地址？" @hideModal="show=false" @confirm="deleteAddress"></y-confirm>
		<view class="button-box">
			<button class="y-button" @click="goAdd"><uni-icon type="plus"></uni-icon>新增</button>
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import uniTag from '@/components/uni-tag/uni-tag.vue'
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import yConfirm from '@/components/y-confirm/y-confirm.vue'
	import api from '@/utils/api/tabBar/index.js'
	import defaultImage from '@/static/image/avatar.png'
	export default {
		components: {
			uniIcon,
			uniSwipeAction,
			uniTag,
			yConfirm
		},
		data () {
			return {
				defaultImage,
				dataList: [],
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				show: false,
				deleteForm: {},
				canCopy: false
			}
		},
		onLoad (e) {
			if (e.fromUrl === 'business') {
				this.canCopy = true
			}
		},
		onShow () {
			this.getData()
		},
		methods: {
			async getData () {
				const res = await api.address()
				if (res.success) {
					this.dataList = res.data.list
				}
			},
			goAdd () {
				uni.navigateTo({
					url: '../address-add/address-add'
				})
			},
			goEdit (value) {
				uni.navigateTo({
					url: `../address-add/address-add?type=edit&value=${JSON.stringify(value)}`
				})
			},
			bindClick (value) {
				this.deleteForm = this.dataList[value]
				this.show = true
			},
			async deleteAddress () {
				this.show = false
				const res = await api.deleteAddress(this.deleteForm)
				if (res.success) {
					this.getData()
					setTimeout(() => {
						uni.showToast({
							title: '成功删除地址'
						})
					}, 500)
				}
			},
			copyPath (e) {
				if (this.canCopy) {
					let pages = getCurrentPages()
					let currPage = pages[pages.length - 1] // 当前页面
					let prevPage = pages[pages.length - 2] // 上一个页面
					prevPage._data.address = e
					uni.navigateBack()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-list {
		padding-bottom: 200upx;
		background: $uni-box-color;
	}
	.default-null {
		text-align: center;
		padding-top: 30vh;
		image {
			width: 160upx;
			height: 160upx;
		}
	}
	.button-box {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 20upx 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: $uni-bg-color;
	}
	.y-button {
		width: 90%;
		.uni-icon {
			margin-right: 10upx;
		}
	}
	.uni-media-list {
		background: $uni-box-color;
	}
	.default-tag {
		margin-right: 20upx;
	}
	.uni-media-list-text-top {
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.uni-media-list-logo {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
