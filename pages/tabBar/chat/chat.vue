<template>
	<view class="content">
		<uni-mescroll @down="downCallback" @up="upCallback" @init="mescrollInit">
			<view class="y-list" v-for="(value,key) in dataList" :key="key">
				<view class="y-list-item" @click="goRoom(value)">
					<view class="contacts-info">
						<view class="info-avatar">
							<image :src="value.gheadimage?imageUrl+value.gheadimage:defaultAvatar"></image>
						</view>
						<view class="info-nickname">
							{{value.gnickname?value.gnickname:''}}
							<view class="info-time">{{value.saytime}}</view>
						</view>
					</view>
					<view class="contacts-icon">
						<min-badge :count="value.unread">
							<uni-icon size="36" type="chatbubble"></uni-icon>
						</min-badge>
					</view>
				</view>
			</view>
		</uni-mescroll>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import uniMescroll from '@/components/mescroll-uni/mescroll-uni.vue'
	import minBadge from '@/components/min-badge/min-badge.vue'
	import api from '@/utils/api/chat/index.js'
	import defaultAvatar from '@/static/image/avatar.png'
	export default {
		components: {
			uniIcon,
			uniMescroll,
			minBadge
		},
		data() {
			return {
				mescroll: null, //mescroll实例对象
				// 下拉刷新的配置
				downOption: { 
					use: true, // 是否启用下拉刷新; 默认true
					auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
				},
				// 上拉加载的配置
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
					auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					isLock: false, // 是否锁定上拉加载 (可用于不触发upCallback,只保留回到顶部按钮的场景)
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 9, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据'
					}
				},
				dataList: [],
				defaultAvatar,
				imageUrl: ''
			}
		},
		// 必须注册滚动到底部的事件,使上拉加载生效
		onReachBottom() {
			this.mescroll && this.mescroll.onReachBottom();
		},
		// 必须注册列表滚动事件,使下拉刷新生效
		onPageScroll(e) {
			this.mescroll && this.mescroll.onPageScroll(e);
		},
		onLoad () {
			this.imageUrl = this.$imageUrl
		},
		onShow () {
			this.getData()
		},
		methods: {
			async getData () {
				const res = await api.contacts()
				if (res.success) {
					this.dataList = res.data.list
				}
			},
			async goRoom (e) {
				uni.setStorage({
					key: 'chat-id',
					data: e.bfirmid,
					success () {
						uni.navigateTo({
							url: '/pages/tabBar/chat/room'
						})
					}
				})
			},
			// mescroll组件初始化的回调,可获取到mescroll对象
			mescrollInit(mescroll) {
				this.mescroll = mescroll
			},
			/*下拉刷新的回调, 有三种处理方式: */
			downCallback(mescroll){
				mescroll.resetUpScroll() // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
			},
			/*上拉加载的回调*/
			async upCallback(mescroll) {
				// 此时mescroll会携带page的参数:
				let pageNum = mescroll.num; // 页码, 默认从1开始
				let pageSize = mescroll.size; // 页长, 默认每页10条
				let sign
				switch (this.active) {
					case 0:
						sign = 1
						break
					case 1:
						sign = 2
						break
				}
				const res = await api.contacts({ page: pageNum, size: pageSize, sign: sign })
				if (res.success) {
					let curPageData = res.data.list
					let totalSize = res.data.total
					let hasNext = res.data.hasNextPage
					setTimeout(() => {
						mescroll.endSuccess(curPageData.length, hasNext)
						//设置列表数据
						if (mescroll.num === 1) this.dataList = []; //如果是第一页需手动制空列表
						this.dataList = this.dataList.concat(curPageData); //追加新数据
					}, 500)
				} else {
					// 失败隐藏下拉加载状态
					mescroll.endErr()
				}
			},
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

<style scoped lang="scss">
	.y-list {
		background: $uni-box-color;
		padding: 0 20upx;
	}
	.y-list-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20upx;
	}
	.contacts-info {
		display: flex;
		align-items: center;
	}
	.info-avatar {
		width: 100upx;
		height: 100upx;
		overflow: hidden;
		border-radius: 100%;
		margin-right: 20upx;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.info-time {
		font-size: $uni-font-size-sm;
		color: $uni-text-color-grey;
	}
</style>
