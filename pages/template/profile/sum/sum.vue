<template>
	<view>
		<view class="header">
			<view class="header-item">可用米粒<text>{{pageInfo.balance}}</text></view>
			<view class="header-item">米库总量<text>{{pageInfo.lastbalance}}</text></view>
			<view class="header-flex">
				<view class="header-item">冻结米粒<text>{{pageInfo.frozenfunds}}</text></view>
				<view class="header-item">鼓励金<text>{{pageInfo.encourage}}</text></view>
			</view>
		</view>
		<view>
			<uni-mescroll @down="downCallback" @up="upCallback" @init="mescrollInit">
				<view class="uni-list">
					<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value, key) in dataList" :key="key">
						<view class="uni-media-list uni-pull-right">
							<view class="uni-media-list-logo" :class="value.amount<0?'uni-media-list-title':''">
								{{value.amount}}
							</view>
							<view class="uni-media-list-body">
								<view class="uni-media-list-text-top">{{value.oprcodePO.oprcodename}}</view>
								<view class="uni-media-list-text-bottom uni-ellipsis">{{value.createtime}}</view>
							</view>
						</view>
					</view>
				</view>
			</uni-mescroll>
		</view>
	</view>
</template>

<script>
	import uniMescroll from '@/components/mescroll-uni/mescroll-uni.vue'
	import api from '@/utils/api/tabBar/index.js'
	export default {
		components: {
			uniMescroll
		},
		data () {
			return {
				 pageInfo: {},
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
				const res = await api.home()
				if (res.success) {
					this.pageInfo = res.data.FirmFunds
				}
			},
			// mescroll组件初始化的回调,可获取到mescroll对象
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			/*下拉刷新的回调, 有三种处理方式: */
			downCallback(mescroll){
				// 第1种: 请求具体接口
				// 第2种: 下拉刷新和上拉加载调同样的接口, 那以上请求可删, 直接用mescroll.resetUpScroll()代替
				mescroll.resetUpScroll() // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				// 第3种: 下拉刷新什么也不处理, 可直接调用或者延时一会调用 mescroll.endSuccess() 结束即可
				// mescroll.endSuccess()
			},
			/*上拉加载的回调*/
			async upCallback(mescroll) {
				// 此时mescroll会携带page的参数:
				let pageNum = mescroll.num; // 页码, 默认从1开始
				let pageSize = mescroll.size; // 页长, 默认每页10条
				const res = await api.TransactionRecord({ page: pageNum, size: pageSize })
				if (res.success) {
					// 接口返回的当前页数据列表 (数组)
					let curPageData = res.data.list
					// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
					// let totalPage = res.data.total
					// 接口返回的总数据量(比如列表有26个数据,每页10条,共3页; 则totalSize值为26)
					let totalSize = res.data.total
					// 接口返回的是否有下一页 (true/false)
					let hasNext = res.data.hasNextPage
					// 成功隐藏下拉加载状态
					//方法一(推荐): 后台接口有返回列表的总页数 totalPage
					// mescroll.endByPage(curPageData.length, totalPage)
					
					//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
					// mescroll.endBySize(curPageData.length, totalSize)
					
					//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
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
	.header {
		background: $uni-box-color;
		text-align: center;
		.header-item {
			line-height: 80upx;
			text {
				margin-left: 10upx;
				color: $uni-router-color;
			}
		}
		.header-flex {
			display: flex;
			.header-item {
				flex: 1;
				text-align: center;
			}
		}
	}
	.uni-media-list-text-top {
		color: #333;
	}
	.uni-media-list-logo {
		color: #555;
	}
	.uni-media-list-title {
		color: #f44336;
	}
</style>
