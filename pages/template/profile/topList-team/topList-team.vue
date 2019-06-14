<template>
	<view>
		<view class="top-box">
			<view class="top-box-item">
				<view class="top-box-line">
					<view class="top-box-title">团队总人数</view>
					<view class="top-box-count">0</view>
				</view>
			</view>
			<view class="top-box-item">
				<view class="top-box-title">直推总人数</view>
				<view class="y-rounter-color">0</view>
			</view>
		</view>
		<view class="my-recommender">
			<view>我的推荐人： ******</view>
			<uni-icon type="chat" class="chat"></uni-icon>
		</view>
		<y-tabs :tabList="tabList" :active="active" @changeTabs="changeTabs" tabColor="#424242" activeBgColor="#333333" textColor="#c9c9c9" activeTextColor="#fff" lineColor="#7f7f7f">
			
		</y-tabs>
		<view class="y-swiper-item-box" v-for="(item, itemIndex) in tabList" :key="itemIndex">
			<view v-if="itemIndex===active">
				<uni-mescroll @down="downCallback" @up="upCallback" @init="mescrollInit">
					<view class="y-card-box" v-for="(value, key) in item.dataList" :key="key" >
						<view class="y-card-header">
							<view class="left">
								<image class="avatar" :src="value.headimage?imageUrl+value.headimage:defaultAvatar"></image>
								<text class="nickname">{{value.nickname?value.nickname:''}}</text>
							</view>
							<view class="right">
								<uni-icon type="chat"></uni-icon>
							</view>
						</view>
						<view class="y-card-body">
							<view class="left">
								<view class="count">贡献值：<text class="y-rounter-color">{{value.contribution}}</text></view>
								<view class="count">活跃度：<text class="y-rounter-color">{{value.activevalue}}</text></view>
								<view class="count">团队人数：<text class="y-rounter-color">{{value.num-1}}</text></view>
							</view>
							<view class="right">
								<image :src="rewardImage" @click="openReward(value.firmid)"></image>
							</view>
						</view>
					</view>
				</uni-mescroll>
			</view>
		</view>
		<y-input-confirm :show="rewardShow" :zIndex="10" title="打赏" tips="请输入数量" type="number" @confirm="reward" @hideModal="rewardShow=false"></y-input-confirm>
		<y-input-confirm :show="passwordShow" :zIndex="11" :notHide="true" title="密码" tips="请输入密码" type="password" @confirm="checkPassword" @hideModal="passwordShow=false"></y-input-confirm>
	</view>
	
	
</template>
<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import uniMescroll from '@/components/mescroll-uni/mescroll-uni.vue'
	import yTabs from '@/components/y-tabs/y-tabs.vue'
	import yInputConfirm from '@/components/y-confirm/y-input-confirm.vue'
	import api from '@/utils/api/tabBar/index.js'
	import defaultAvatar from '@/static/image/avatar.png'
	import rewardImage from '@/static/image/rewardImage.png'
	
	export default {
		components: {
			uniIcon,
			uniMescroll,
			yTabs,
			yInputConfirm
		},
		data() {
			return {
				rewardImage,
				defaultAvatar,
				rewardShow: false,
				passwordShow: false,
				rewardId: '',
				rewardCount: '',
				imageUrl: '',
				active: 0,
				tabList: [
					{ title: '全部成员', value: 2, dataList: [] },
					{ title: '实名成员', value: 1, dataList: [] },
					{ title: '未实名成员', value: 0, dataList: [] }
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
				},
				// 列表数据
				dataList: []
			}
		},
		onLoad() {
			this.imageUrl = this.$imageUrl
		},
		onShow () {
			this.getData(2)
			this.getData(1)
			this.getData(0)
		},
		onNavigationBarButtonTap (e) {
			uni.navigateTo({
				url: '../topList-team-recruit/topList-team-recruit'
			})
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
			async getData(e) {
				let index
				const res = await api.team({ status: e })
				if (res.success) {
					switch (e) {
						case 0:
							index = 2
							break
						case 1:
							index = 1
							break
						case 2:
							index = 0
							break
					}
					this.tabList[index].dataList = res.data.list
				}
			},
			async changeTabs(e) {
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
					if (parseFloat(e) > 0 && parseFloat(e) <= 0.1) {
						if (/^0.\d{1,3}$/.test(parseFloat(e))) {
							this.rewardCount = e
							this.passwordShow = true
						} else {
							uni.showToast({
								title: '最多三位小数',
								icon: 'none'
							})
						}
					} else {
						uni.showToast({
							title: '每次最多打赏0.1kg',
							icon: 'none'
						})
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
				const res = await api.reward({ toFirmId: this.rewardId, tradepassword: e, number: this.rewardCount })
				if (res.success) {
					this.passwordShow = false
					this.rewardShow = false
					uni.showToast({
						title: '谢谢老板 老板大气'
					})
				}
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
				let status
				switch (this.active) {
					case 0:
						status = 2
						break
					case 1:
						status = 1
						break
					case 2:
						status = 0
						break
				}
				const res = await api.team({ page: pageNum, size: pageSize, status: status })
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
	.y-rounter-color {
		color: $uni-router-color;
	}
	.top-box {
		display: flex;
		background: $uni-box-color;
		border-bottom: 1px solid $uni-box-line;
		.top-box-item {
			flex: 1;
			text-align: center;
			padding: 30upx;
			.top-box-title {
				font-weight: bold;
			}
		}
		// .top-box-line {
		// 	border-right: 1px solid $uni-box-line-inverse;
		// }
	}
	.my-recommender {
		text-align: center;
		padding: 30upx 0;
		position: relative;
		.chat {
			position: absolute;
			right: 20upx;
			top: 30upx;
		}
	}
	.y-card-box {
		background: $uni-box-color;
		border-bottom: 1px solid $uni-box-line;
		border-radius: 6upx;
		.y-card-header,.y-card-body {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20upx;
		}
		.y-card-header {
			.left {
				display: flex;
				align-items: center;
				.avatar {
					width: 80upx;
					height: 80upx;
					border-radius: 100%;
					margin-right: 20upx;
				}
			}
		}
		.y-card-body {
			padding-right: 10upx;
			.right {
				image {
					width: 80upx;
					height: 80upx;
				}
			}
			.count {
				font-size: $uni-font-size-sm;
			}
		}
	}
	.y-swiper {
		display: flex;
		flex-wrap: nowrap;
		position: relative;
		transition: .5s;
	}
	.y-swiper-item-box {
		padding: 0 20upx;
		background: $uni-box-color;
		height: 100%;
	}
</style>
