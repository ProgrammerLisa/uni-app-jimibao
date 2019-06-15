<template>
	<view>
		<y-tabs :tabList="tabList" position="fixed" :active="active" @changeTabs="changeTabs" tabColor="#424242" activeBgColor="#333333" textColor="#c9c9c9" activeTextColor="#fff" lineColor="#7f7f7f"></y-tabs>
		<view v-for="(i, index) in tabList" :key="index" class="y-tabs-item">
			<view v-if="active===index" class="order-box">
				<uni-mescroll @down="downCallback" @up="upCallback" @init="mescrollInit">
					<view v-for="(value, key) in i.dataList" :key="key" class="y-order">
						<view class="order-left">
							<uni-icon class="icon" @click="orderEvent(value)" :type="value.status===0||value.status===-1?'close':value.status===1||value.status===5?'spinner-cycle':'chat'"></uni-icon>
						</view>
						<view class="order-right">
							<uni-card :title="value.status | statusFilter" :note="value.ordertime">
								<view class="order-flex">
									<view class="order-price order-flex-item">单价: {{value.price}}</view>
									<view class="order-count order-flex-item">数量: {{value.number}}</view>
								</view>
								<view class="order-flex">
									<view v-show="value.frozennumber" class="order-frozennumber order-flex-item">冻结数量: {{value.frozennumber}}</view>
									<view v-show="value.sfee" class="order-sfee order-flex-item">手续费率: {{value.sfee}}</view>
								</view>
							</uni-card>
						</view>
					</view>
				</uni-mescroll>
			</view>
		</view>
		<y-confirm title="确定撤销此订单吗？" :show="revokeShow" @hideModal="revokeShow=false" @confirm="revoke"></y-confirm>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import uniCard from '@/components/uni-card/uni-card.vue'
	import uniMescroll from '@/components/mescroll-uni/mescroll-uni.vue'
	import yConfirm from '@/components/y-confirm/y-confirm.vue'
	import yTabs from '@/components/y-tabs/y-tabs.vue'
	import api from '@/utils/api/tabBar/index.js'
	export default {
		components: {
			uniIcon,
			uniCard,
			uniMescroll,
			yConfirm,
			yTabs
		},
		filters: {
			iconFilter () {
				
			},
			statusFilter (e) {
				switch (e) {
					case -1:
					    return '自动撤销'
					case 0:
					    return '手动撤销'
					case 1:
					    return '（匹配中）正在求购'
					case 2:
					    return '（已匹配）请收方付款'
					case 3:
						return '（已付款）请出方确认'
					case 4:
						return '成交'
					case 5:
						return '（匹配中）正在出售'
					case 6:
						return '向平台兑换工具成功'
				}
			}
		},
		data () {
			return {
				active: 0,
				tabList: [
					{ title: '收单', dataList: [] },
					{ title: '出单', dataList: [] }
				],
				revokeShow: false,
				orderId: '',
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
		// 必须注册滚动到底部的事件,使上拉加载生效
		onReachBottom() {
			this.mescroll && this.mescroll.onReachBottom();
		},
		// 必须注册列表滚动事件,使下拉刷新生效
		onPageScroll(e) {
			this.mescroll && this.mescroll.onPageScroll(e);
		},
		methods: {
			async changeTabs (e) {
				this.active = e
			},
			orderEvent (e) {
				this.orderId = e.orderid
				if (e.status === 1 || e.status === 5) {
					// 撤销
					this.revokeShow = true
				} else if (e.status === -1 || e.status === 0) {
					uni.showToast({
						title: '订单不存在',
						icon: 'none'
					})
				} else {
					this.getChatRoomId()
				}
			},
			async getChatRoomId () {
				const res = await api.getChatIdByOrderId({ orderid: this.orderId })
				if (res.success) {
					uni.setStorage({
						key: 'chat-id',
						data: res.data.gfirmid,
						success () {
							uni.navigateTo({
								url: '/pages/tabBar/chat/room'
							})
						}
					})
				}
			},
			async revoke () {
				const res = await api.revoke({ orderid: this.orderId })
				if (res.success) {
					this.tabList[this.active].dataList.forEach(element => {
						if (element.orderid === this.orderId) {
							element.status = 0
						}
					})
					this.revokeShow = false
					uni.showToast({
						title: '订单已撤销'
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
				let sign
				switch (this.active) {
					case 0:
						sign = 1
						break
					case 1:
						sign = 2
						break
				}
				const res = await api.order({ page: pageNum, size: pageSize, sign: sign })
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
		.order-left {
			flex: 1;
			text-align: center;
			.icon {
				background: $uni-box-color;
				padding: 20upx;
				border: solid 1px #7A7A81;
				border-radius: 100%;
			}
		}
		.order-right {
			flex: 5;
			.order-flex {
				display: flex;
				justify-content: space-between;
				
			}
			.order-frozennumber, .order-sfee {
				font-size: $uni-font-size-sm;
			}
		}
	}
</style>
