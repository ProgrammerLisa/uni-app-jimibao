<template>
	<view>
		<y-tabs :tabList="tabList" :active="active" @changeTabs="changeTabs" tabColor="#424242" activeBgColor="#333333" textColor="#c9c9c9" activeTextColor="#fff" lineColor="#7f7f7f"></y-tabs>
		<view v-for="(i, index) in tabList" :key="index">
			<view v-if="active===index" class="order-box">
				<uni-mescroll @down="downCallback" @up="upCallback" @init="mescrollInit">
					<view v-for="(value, key) in i.dataList" :key="key" class="y-order" @click="clickEvent(value)">
						<view class="left">
							<view class="title">{{active===0?value.title:value.content}}</view>
							<view class="time">{{active===0?value.releasetime:value.createTime}}</view>
						</view>
						<view class="right" v-if="active===0">
							<uni-icon type="arrowright"></uni-icon>
						</view>
					</view>
				</uni-mescroll>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import uniMescroll from '@/components/mescroll-uni/mescroll-uni.vue'
	import yTabs from '@/components/y-tabs/y-tabs.vue'
	import api from '@/utils/api/tabBar/index.js'
	export default {
		components: {
			uniIcon,
			uniMescroll,
			yTabs
		},
		data () {
			return {
				active: 0,
				tabList: [
					{ title: '系统消息', dataList: [] },
					{ title: '个人消息', dataList: [] }
				],
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
				}
			}
		},
		onShow () {
			this.getData(0)
			this.getData(1)
		},
		// 必须注册滚动到底部的事件,使上拉加载生效
		onReachBottom() {
			this.mescroll && this.mescroll.onReachBottom();
		},
		// 必须注册列表滚动事件,使下拉刷新生效
		onPageScroll(e) {
			this.mescroll && this.mescroll.onPageScroll(e);
		},
		methods: {
			async getData (e) {
				let url
				switch (e) {
					case 0:
						url = api.newsSystem
						break
					case 1:
						url = api.newsSystemSelf
				}
				const res = await url()
				if (res.success) {
					this.tabList[e].dataList = res.data.list
				}
			},
			async changeTabs (e) {
				this.active = e
			},
			clickEvent (e) {
				if (this.active === 0) {
					uni.navigateTo({
						url: './detail?content='+e.content+'&title='+e.title
					})
				}
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
				let url
				switch (this.active) {
					case 0:
						url = api.newsSystem
						break
					case 1:
						url = api.newsSystemSelf
						break
				}
				const res = await url({ page: pageNum, size: pageSize })
				if (res.success) {
					let curPageData = res.data.list
					let totalSize = res.data.total
					let hasNext = res.data.hasNextPage
					setTimeout(() => {
						mescroll.endSuccess(curPageData.length, hasNext)
						//设置列表数据
						if (mescroll.num === 1) this.tabList[this.active].dataList = []; //如果是第一页需手动制空列表
						this.tabList[this.active].dataList = this.tabList[this.active].dataList.concat(curPageData); //追加新数据
					}, 500)
				} else {
					// 失败隐藏下拉加载状态
					mescroll.endErr()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order-box {
		height: calc(100vh - 100upx);
		overflow: scroll;
	}
	.y-order {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20upx;
		border-bottom: 1px solid $uni-box-line;
		.right {
			min-width: 100upx;
			text-align: right;
		}
		.time {
			color: $uni-text-color-placeholder;
			font-size: $uni-font-size-sm;
		}
	}
</style>
