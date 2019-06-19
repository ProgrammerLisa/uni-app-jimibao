<template>
	<view class="y-container">
		<view class="top">
			<view class="y-input-box">
				<input class="y-input" maxlength="11" type="number" placeholder="请输入手机号" v-model="phone" />
				<radio-group class="y-checkbox" @change="typeChange">
					<label>
						<radio value="buy"></radio>收单
					</label>
					<label>
						<radio value="sell"></radio>出单
					</label>
				</radio-group>
			</view>
			<view>
				<button class="y-button" @click="search">搜索</button>
			</view>
		</view>
		<view v-if="show">
			<uni-mescroll @down="downCallback" @up="upCallback" @init="mescrollInit">
				<view v-for="(value, index) in dataList" :key="index" class="y-list-item">
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
								<button :disabled="value.exist" class="y-button" @click="openPay(value)">{{type==='buy'?'出米':'收米'}}</button>
							</view>
						</view>
					</view>
				</view>
			</uni-mescroll>
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
	import uniMescroll from '@/components/mescroll-uni/mescroll-uni.vue'
	import yPayConfirm from '@/components/y-confirm/y-pay-confirm.vue'
	import api from '@/utils/api/tabBar/index.js'
	import rules from '@/static/js/formRules'
	import avatar from '@/static/image/avatar.png'
	export default {
		components: {
			uniMescroll,
			yPayConfirm
		},
		data() {
			return {
				avatar,
				phone: '',
				type: '',
				sign: null,
				show: false,
				payShow: false,
				pay: {},
				password: '',
				balance: '',
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
				// 列表数据
				dataList: []
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
		onShow () {
			this.getData()
		},
		methods: {
			async getData () {
				const response = await api.AccountBalance()
				if (response.success) {
					this.balance = response.data.balance
				}
			},
			typeChange (e) {
				this.type = e.detail.value
			},
			search () {
				if (!this.phone) {
					uni.showToast({
						title: '请输入手机号码',
						icon: 'none'
					})
					return false
				}
				if (!rules.phone.test(this.phone)) {
					uni.showToast({
						title: '手机号码格式不正确',
						icon: 'none'
					})
					return false
				}
				if (!this.type) {
					uni.showToast({
						title: '请选择订单类型',
						icon: 'none'
					})
					return false
				}
				if (this.type === 'buy') {
					this.sign = 1
				} else if (this.type === 'sell') {
					this.sign = 2
				}
				this.show = false
				setTimeout(() => {
					this.show = true
				}, 200)
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
				this.dataList.forEach(element => {
					if (this.pay = element) {
						element.exist = true
					}
				})
			},
			// mescroll组件初始化的回调,可获取到mescroll对象
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
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
				// let 
				const res = await api.exchangeList({ page: pageNum, size: pageSize, sign: this.sign, search: this.phone })
				if (res.success) {
					// 接口返回的当前页数据列表 (数组)
					let curPageData = res.data.list
					let totalSize = res.data.total
					// 接口返回的是否有下一页 (true/false)
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.y-container {
		background: $uni-box-color;
	}
	.top {
		border-bottom: 1px solid $uni-border-shallow-color;
		padding: 20upx 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.y-input {
			margin: 0 0 20upx;
			padding: 10upx 20upx;
			border-radius: 6upx;
			border: 1px solid $uni-border-shallow-color;
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
