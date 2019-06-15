<template>
	<view>
		<y-tabs position="fixed" :tabList="tabList" :active="active" @changeTabs="changeTabs" tabColor="#424242" activeBgColor="#333333" textColor="#c9c9c9" activeTextColor="#fff" lineColor="#7f7f7f"></y-tabs>
		<view v-for="(i, index) in tabList" :key="index">
			<view v-if="active===index" class="y-list y-tabs-item">
				<uni-mescroll @down="downCallback" @up="upCallback" @init="mescrollInit">
					<view v-for="(value, key) in i.dataList" :key="key" class="y-list-item">
						<view v-if="active === 0">
							<y-media-list :options="value" :maskShow="true" @click="goVideoDetail(value)"></y-media-list>
						</view>
						<view v-if="active === 1">
							<y-media-list :options="value" tips="集米宝合作媒体" @click="goWebDetail(value)"></y-media-list>
						</view>
						<view v-if="active === 2">
							<uni-collapse>
								<uni-collapse-item :show-animation="true" :title="value.title" style="width: 100vw;">
									<view style="padding: 30upx;">
										折叠内容主体，可自定义内容及样式
									</view>
								</uni-collapse-item>
							</uni-collapse>
						</view>
					</view>
				</uni-mescroll>
			</view>
		</view>
	</view>
</template>

<script>
	import uniMescroll from '@/components/mescroll-uni/mescroll-uni.vue'
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import yTabs from '@/components/y-tabs/y-tabs.vue'
	import yMediaList from '@/components/y-media-list/y-media-list.vue'
	import api from '@/utils/api/tabBar/index.js'
	export default {
		components: {
			uniCollapse,
			uniCollapseItem,
			uniMescroll,
			yTabs,
			yMediaList
		},
		data () {
			return {
				active: 0,
				tabList: [
					{ title: '视频区', dataList: [] },
					{ title: '合作媒体', dataList: [] },
					{ title: '新手指南', dataList: [] }
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
			goVideoDetail (e) {
				uni.navigateTo({
					url: './video?src=' + e.fromurl + '&title=' + e.title
				})
			},
			goWebDetail (e) {
				uni.navigateTo({
					url: './web-view?src=' + e.fromurl + '&title=' + e.title
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
				let type
				switch (this.active) {
					case 0:
						type = 3
						break
					case 1:
						type = 2
						break
					case 2:
						type = 1
						break
				}
				const res = await api.article({ page: pageNum, size: pageSize, atid: type })
				if (res.success) {
					let curPageData
					if (this.active === 2) {
						curPageData = res.data.list.reverse()
					} else {
						curPageData = res.data.list
					}
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
