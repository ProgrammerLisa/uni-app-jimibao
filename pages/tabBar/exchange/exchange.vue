<template>
	<view>
		<y-tabs :tabList="tabList" :active="active" @changeTabs="changeTabs" tabColor="#424242" activeBgColor="#333333" textColor="#c9c9c9" activeTextColor="#fff" lineColor="#7f7f7f"></y-tabs>
		<view class="y-flex">
			<view class="y-flex-item">米库总量： {{allUse}}</view>
			<view class="y-flex-item">可用米粒： {{canUse}}</view>
		</view>
		<view class="y-tips">
			初始交换密码为 123456
		</view>
		<view v-for="(i, index) in tabList" :key="index">
			<view v-if="active===index" class="y-list">
				<uni-mescroll @down="downCallback" @up="upCallback" @init="mescrollInit">
					<view v-for="(value, key) in i.dataList" :key="key" class="y-list-item">
						<view class="left">
							<image class="image" :src="{value: value.name, type: 'img'} | imageFilter" mode="aspectFit"></image>
						</view>
						<view class="right rightAll" v-if="active===0">
							<view>
								<view class="title"><text>{{value.name}}</text> <uni-badge class="badge" type="warning" :text="'最多可兑换'+value.limitnumber+'个'"></uni-badge></uni-badge> </view>
								<view class="rightAll-font">每次收集： {{value.harvestpd}}kg</view>
								<view class="rightAll-font">总共奖励： {{value.sumReward}}kg</view>
								<view class="rightAll-font">有效时间： {{value.validitytime}}kg</view>
							</view>
							<view class="rightAll-right">
								<view class="rightAll-font exchange">兑换： {{{value: value.name, type:'text'} | imageFilter}}</view>
								<button class="y-button" @click="openReward(value.toolid)">兑换</button>
							</view>
						</view>
						<view class="right" v-if="active===1">
							<view class="title"><text>{{value.name}}</text> <uni-badge class="badge" type="warning" :text="value.toolnumber+'个'"></uni-badge></uni-badge> </view>
							<view class="rightAll-font">每次收集： {{value.harvestpd}}kg</view>
							<view class="rightAll-font">总共奖励： {{value.sumReward}}kg</view>
							<view class="rightAll-font">生效时间： {{value.ftbegintime}}</view>
							<view class="rightAll-font">到期时间： {{value.ftendtime}}</view>
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
	import api from '@/utils/api/tabBar/index.js'
	import tool1 from '@/static/image/tool1.png'
	import tool2 from '@/static/image/tool2.png'
	import tool3 from '@/static/image/tool3.png'
	import tool4 from '@/static/image/tool4.png'
	import tool5 from '@/static/image/tool5.png'
	export default {
		components: {
			uniBadge,
			uniMescroll,
			yTabs,
			yInputConfirm
		},
		filters: {
			imageFilter (e) {
				switch (e.value) {
					case '小米袋':
						if (e.type === 'img') {
							return tool1
						} else {
							return '10kg'
						}
					case '中米袋':
						if (e.type === 'img') {
							return tool2
						} else {
							return '50kg'
						}
					case '大米袋':
						if (e.type === 'img') {
							return tool3
						} else {
							return '100kg'
						}
					case '米缸':
						if (e.type === 'img') {
							return tool4
						} else {
							return '1000kg'
						}
					case '米仓':
						if (e.type === 'img') {
							return tool5
						} else {
							return '50000kg'
						}
				}
			}
		},
		data () {
			return {
				active: 0,
				tabList: [
					{ title: '集米工具', dataList: [] },
					{ title: '我的工具', dataList: [] }
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
		onShow () {
			this.getData(0)
			this.getData(1)
			this.getAll()
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
						url = api.tools
						break
					case 1:
						url = api.toolMine
				}
				const res = await url()
				if (res.success) {
					this.tabList[e].dataList = res.data.list
				}
			},
			async getAll () {
				const res = await api.AccountBalance()
				if (res.success) {
					this.canUse = res.data.balance
					this.allUse = res.data.lastbalance
				}
			},
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
				let url
				switch (this.active) {
					case 0:
						url = api.tools
						break
					case 1:
						url = api.toolMine
						break
				}
				const res = await url({ page: pageNum, size: pageSize })
				if (res.success) {
					let curPageData, totalSize, hasNext
					if (this.active === 0) {
						curPageData = res.data
						totalSize = res.data.length
						hasNext = false
					} else {
						curPageData = res.data.list
						totalSize = res.data.total
						hasNext = res.data.hasNextPage
					}
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
			.image {
				width: 200upx;
				height: 200upx;
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
