<template>
	<view>
		<y-tabs position="fixed" :tabList="tabList" :active="active" @changeTabs="changeTabs">
			<view class="search-box">
				<view class="search" @click="goSearch">
					<uni-icon type="search" class="icon"></uni-icon>
					<view class="text">搜索</view>
				</view>
			</view>
		</y-tabs>
		<view class="y-tabs-item">
			<view v-for="(i, index) in tabList" :key="index">
				<view v-if="active===index" class="y-list">
					<view class="banner">
						<view class="banner-item">
							<view class="item-title">当前价格</view>
							<view class="item-count">{{info.curPrice.price}}</view>
						</view>
						<view class="banner-item">
							<view class="item-title">涨幅</view>
							<view class="item-count">{{(info.curPrice.price/info.curPrice.price-1)*100}}%</view>
						</view>
						<view class="banner-item">
							<view class="item-title">量比</view>
							<view class="item-count">{{info.curSellNum===0?0:info.curBuyNum/info.curSellNum}}</view>
						</view>
					</view>
					<uni-mescroll @down="downCallback" @up="upCallback" @init="mescrollInit">
						<view v-for="(value, key) in i.dataList" :key="key" class="y-list-item">
							<view class="left">
								<image class="image" :src="avatar" mode="aspectFit"></image>
							</view>
							<view class="right">
								<view class="y-flex">
									<view class="y-flex-item">单价： ￥{{value.price}}/kg</view>
									<view class="y-flex-item">数量： {{value.number}}kg</view>
								</view>
								<view class="y-flex">
									<view class="y-flex-item">合计： ￥{{value.price*value.number}}</view>
									<view class="y-flex-item">
										<button :disabled="value.exist" class="y-button" @click="openPay(value)">{{active===0?'出米':'收米'}}</button>
									</view>
								</view>
							</view>
						</view>
					</uni-mescroll>
				</view>
			</view>
		</view>
		<y-pay-confirm :show="payShow" @hideModal="payShow=false">
			<view class="modal">
				<view class="modal-title">{{pay.sign===1?'出米粒':'收米粒'}}</view>
				<view class="uni-center">正在{{pay.sign===1?'出米粒':'收米粒'}}</view>
				<view class="modal-tips">大米余额: {{balance}}kg</view>
				<view class="modal-goods">
					<view class="modal-goods-item">
						<view>{{pay.price}}</view><view>单价(￥)</view>
					</view>
					<view class="modal-goods-item">
						<view>{{pay.number}}</view><view>数量(kg)</view>
					</view>
				</view>
				<view class="modal-tips">提示: 请认真核对单价及数量</view>
				<view class="modal-password">
					<view class="modal-password-box">
						<text class="modal-password-label">交换密码</text>
						<input class="modal-password-input" type="password" v-model="password" placeholder="请输入交换密码" />
					</view>
				</view>
				<view class="modal-password-tips">
					初始交换密码为123456
				</view>
				<view class="modal-submit">
					<button class="y-button" @click="exchange">确定</button>
				</view>
			</view>
		</y-pay-confirm>
	</view>
</template>

<script>
	import yPayConfirm from '@/components/y-confirm/y-pay-confirm.vue'
	import uniMescroll from '@/components/mescroll-uni/mescroll-uni.vue'
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import yTabs from '@/components/y-tabs/y-tabs.vue'
	import api from '@/utils/api/tabBar/index.js'
	import apiChat from '@/utils/api/chat/index.js'
	import avatar from '@/static/image/avatar.png'
	export default {
		components: {
			uniMescroll,
			yTabs,
			yPayConfirm,
			uniIcon
		},
		data () {
			return {
				avatar,
				active: 0,
				tabList: [
					{ title: '收单', dataList: [] },
					{ title: '出单', dataList: [] }
				],
				info: {
					curBuyNum: 0,
					curSellNum: 0,
					curPrice: {
						beginTime: 0,
						price: 0
					}
				},
				payShow: false,
				pay: {},
				balance: '',
				password: '',
				timer: '',
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
		onNavigationBarButtonTap (e) {
			if (e.navType === 'order') {
				uni.navigateTo({
					url: '/pages/template/profile/topList-order/topList-order'
				})
			} else {
				uni.navigateTo({
					url: '/pages/template/exchange/send/send'
				})
			}
		},
		onShow () {
			this.initList()
			this.getData()
			this.timer = setInterval(() => {
				this.getData()
			}, 30000)
			
			const _this = this
			uni.onSocketMessage(function(res){
				if (JSON.parse(res.data).type === 'CHAT') {
					_this.noReadCount()
				}
			})
		},
		onHide () {
			const _this = this
			clearInterval(_this.timer)
		},
		watch: {
			payShow (val) {
				this.password = ''
			}
		},
		methods: {
			async getData () {
				const res = await api.exchangeInfo()
				if (res.success) {
					this.info = res.data
				}
				const response = await api.AccountBalance()
				if (response.success) {
					this.balance = response.data.balance
				}
			},
			async initList () {
				const res = await api.exchangeList({ sign: this.active + 1 })
				if (res.success) {
					this.tabList[this.active].dataList = res.data.list
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
			async changeTabs (e) {
				this.active = e
			},
			openPay (e) {
				this.pay = e
				this.payShow = true
			},
			async exchange () {
				if (!this.password) {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					})
					return false
				}
				let type
				if (this.pay.sign === 1) {
					type = 'sell'
				} else {
					type = 'buy'
				}
				const res = await api.exchange({ type: type, orderid: this.pay.orderid, owner: this.pay.firmid, tradepassword: this.password })
				this.payShow = false
				if (res.success) {
					this.existCheck()
					uni.showToast({
						title: '兑换成功'
					})
				}
			},
			existCheck () {
				this.tabList[this.active].dataList.forEach(element => {
					if (this.pay = element) {
						element.exist = true
					}
				})
			},
			goSearch () {
				uni.navigateTo({
					url: '/pages/template/exchange/search/search'
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
				const res = await api.exchangeList({ page: pageNum, size: pageSize, sign: sign })
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
	.y-tabs-item {
		padding-top: 140upx;
	}
	.search-box {
		padding: 20upx;
		.search {
			background: $uni-box-color;
			padding: 10upx 20upx;
			border-radius: 10upx;
			display: flex;
			align-items: center;
			.text {
				color: $uni-text-color-grey;
			}
		}
	}
	.banner {
		display: flex;
		align-items: center;
		width: 90vw;
		margin: 0 5vw 5vw;
		background: $uni-box-color;
		border-radius: 30upx;
		box-shadow: 10upx 10upx 30upx rgba(0, 0, 0, 0.05);
		.banner-item {
			flex: 1;
			text-align: center;
			padding: 30upx 0;
		}
	}
	.y-list-item {
		display: flex;
		align-items: center;
		padding: 20upx;
		border-bottom: 1px solid #f5f5f5;
		background: $uni-box-color;
		.left {
			flex: 1;
			.image {
				width: 100upx;
				height: 100upx;
				border-radius: 100%;
			}
		}
		.right {
			flex: 5;
			.y-flex {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 10upx;
			}
		}
	}
	.modal {
		background: #fff;
		position: relative;
		padding-top: 100upx;
	}
	.modal-title {
		font-weight: bold;
		border-radius: 100%;
		width: 100upx;
		height: 100upx;
		background: $uni-router-color;
		position: absolute;
		top: -50upx;
		left: 50%;
		margin-left: -50upx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.modal-tips {
		color: $uni-router-color;
		text-align: center;
		font-size: $uni-font-size-base;
	}
	.modal-goods {
		display: flex;
		.modal-goods-item {
			flex: 1;
			text-align: center;
		}
	}
	.modal-password {
		padding: 20upx 50upx;
		.modal-password-box {
			display: flex;
			background: $uni-bg-color-grey;
			border-radius: 10upx;
			padding: 20upx 10upx;
			.modal-password-label {
				flex: 1;
			}
			.modal-password-input {
				flex: 1;
			}
		}
	}
	.modal-password-tips {
		color: $uni-text-color-grey;
		text-align: center;
		padding-bottom: 20upx;
	}
	.modal-submit {
		.y-button {
			background: $uni-router-color;
			color: #fff;
			border-radius: 0;
			border:none;
		}
	}
</style>
