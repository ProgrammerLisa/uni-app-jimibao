<template>
	<view>
		<y-tabs :tabList="tabList" :active="active" @changeTabs="changeTabs" tabColor="#424242" activeBgColor="#333333" textColor="#c9c9c9" activeTextColor="#fff" lineColor="#7f7f7f"></y-tabs>
		<view v-for="(i, index) in tabList" :key="index">
			<view v-if="active===index" class="y-list">
				<uni-mescroll @down="downCallback" @up="upCallback" @init="mescrollInit">
					<view v-for="(value, key) in i.dataList" :key="key" class="y-list-item">
						<view class="left">
							<image class="image" :src="value.productionname | imageFilter" mode="aspectFit"></image>
						</view>
						<view class="right rightAll">
							<view>
								<view class="title"><text>{{value.productionname}}</text> <uni-badge class="badge" type="warning" :text="value.status | statusFilter"></uni-badge></uni-badge> </view>
								<view class="rightAll-font">单价： {{value.price}}kg</view>
								<view class="rightAll-font">交易数量： {{value.number}}</view>
								<view class="rightAll-font">总费用： {{value.number*value.price}}kg</view>
								<view class="rightAll-font" v-if="value.expressname">快递公司： {{value.expressname}}</view>
								<view class="rightAll-font" v-if="value.expressname">快递单号： {{value.expressno}}</view>
							</view>
						</view>
					</view>
				</uni-mescroll>
			</view>
		</view>
		<y-input-confirm :show="rewardShow" :zIndex="10" title="兑换" tips="请输入个数" type="number" :maxlength="4" @confirm="reward" @hideModal="rewardShow=false"></y-input-confirm>
		<y-input-confirm :show="passwordShow" :zIndex="11" :notHide="true" title="密码" tips="请输入密码" type="password" @confirm="checkPassword" @hideModal="passwordHide"></y-input-confirm>
	</view>
</template>

<script>
	import uniBadge from '@/components/uni-badge/uni-badge.vue'
	import uniMescroll from '@/components/mescroll-uni/mescroll-uni.vue'
	import yTabs from '@/components/y-tabs/y-tabs.vue'
	import yInputConfirm from '@/components/y-confirm/y-input-confirm.vue'
	import api from '@/utils/api/business/index.js'
	import goods1 from '@/static/image/goods1.png'
	import goods2 from '@/static/image/goods2.png'
	import goods3 from '@/static/image/goods3.png'
	import goods4 from '@/static/image/goods4.png'
	export default {
		components: {
			uniBadge,
			uniMescroll,
			yTabs,
			yInputConfirm
		},
		filters: {
			imageFilter: function(value) {
				switch (value) {
					case '格力空调':
						return goods1
					case '美的电饭煲':
						return goods2
					case '美的电风扇':
						return goods3
					case '苏泊尔榨汁机':
						return goods4
				}
			},
			statusFilter (type) {
				switch (type) {
				case 0:
				  return '待发货'
				case 1:
				  return '已发货'
				case 2:
				  return '已签收'
				}
			}
		},
		data () {
			return {
				active: 0,
				tabList: [
					{ title: '待发货', dataList: [] },
					{ title: '待收货', dataList: [] },
					{ title: '已签收', dataList: [] }
				],
				rewardShow: false,
				passwordShow: false,
				rewardId: '',
				rewardCount: '',
				canUse: '',
				allUse: '',
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
			openReward (e) {
				this.rewardId = e
				this.rewardShow = true
			},
			reward (e) {
				if (!e) {
					uni.showToast({
						title: '数量不能为空',
						icon: 'none'
					})
				} else {
					if (!/^[123456789]\d{0,3}$/.test(e)) {
						uni.showToast({
							title: '请输入[1-9999]之间的整数',
							icon: 'none'
						})
					} else {
						this.rewardCount = e
						this.passwordShow = true
					}
				}
			},
			checkPassword (e) {
				if (!e) {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					})
				} else {
					this.sendReward(e)
				}
			},
			async sendReward (e) {
				const res = await api.toolExchange({ toolid: this.rewardId, tradepassword: e, number: this.rewardCount })
				if (res.success) {
					this.rewardShow = false
					this.passwordShow = false
					uni.showToast({
						title: '兑换成功'
					})
				}
			},
			passwordHide () {
				this.rewardShow = false
				this.passwordShow = false
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
				const res = await api.order({ page: pageNum, size: pageSize, status: this.active })
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
	.y-flex {
		display: flex;
		padding: 10upx 0;
		background: #fff;
		.y-flex-item {
			flex: 1;
			text-align: center;
			font-size: $uni-font-size-base;
		}
	}
	.y-tips {
		background: $uni-input-bg-color;
		padding: 10upx;
		text-align: center;
		color: $uni-text-color-grey;
	}
	.y-list {
		height: calc(100vh - 100upx);
		overflow: scroll;
		background: $uni-login-bg-color;
	}
	.y-list-item {
		display: flex;
		align-items: center;
		padding: 20upx;
		border-bottom: 1px solid $uni-box-line;
		.left {
			flex: 1;
			margin-right: 20upx;
			.image {
				width: 200upx;
				height: 200upx;
				border-radius: 10upx;
			}
		}
		.right {
			flex: 4;
			min-width: 100upx;
			.title {
				display: flex;
				align-items: center;
				font-weight: bold;
				margin-bottom: 20upx;
				.badge {
					margin-left: 10upx;
				}
			}
		}
		.rightAll {
			display: flex;
			justify-content: space-between;
			.rightAll-right {
				margin: auto 0;
			}
			.exchange {
				margin-bottom: 10upx;
			}
			.y-button {
				width: 150upx;
			}
		}
		.rightAll-font {
			font-size: $uni-font-size-base;
			color: $uni-color-subtitle;
		}
		.time {
			color: $uni-text-color-placeholder;
			font-size: $uni-font-size-sm;
		}
	}
</style>
