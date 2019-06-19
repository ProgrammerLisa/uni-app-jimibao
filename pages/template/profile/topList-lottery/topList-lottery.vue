<template>
	<view class="y-container">
		<view class="banner-container">
			<image :src="top1" mode="widthFix" class="banner-top"></image>
			<view class="banner-content">
				<view class="banner-title">当前米库总量</view>
				<view class="banner-count">{{sum}}<text>kg</text></view>
			</view>
			<view class="y-row banner-tips">
				<view class="y-col">抽奖次数：{{chance}}</view>
				<view class="y-col y-col-right no-tips" @click="goRecord">我的奖品</view>
			</view>
			<view class="y-row y-row-end banner-tips" style="top: 50px;">
				<view class="y-col y-col-right no-tips" @click="lotteryRuleShow=true">活动详情</view>
			</view>
		</view>
		<view class="y-tips-box">
			<view class="y-tips-item">每1kg米粒可以进行5次抽奖活动</view>
			<view class="y-tips-item">批量抽奖有优惠</view>
		</view>
		<view class="lottery-box">
			<view class="y-item" v-for="(i, index) in list" :key="index">
				<image class="y-image" :src="i.img"></image>
				<view class="y-modal" :class="allHide||(i.index===subShow)?`y-modal-hide`:''"></view>
				<view class="y-modal-single" :style="i.index===subShow?`opacity:0.3`:`opacity:0`"></view>
			</view>
		</view>
		<view class="y-button-box">
			<button class="y-button" :disabled="lotterySub" @click="lotteryOnce">单次抽奖</button>
			<button class="y-button" :disabled="lotterySub" @click="batchLottery">批量抽奖</button>
		</view>
		<y-modal :show="sexModalShow" boxType="confirm" @hideModal="sexModalShow=false"></y-modal>
		<y-confirm title="恭喜您获得" bottom="40%" :tips="lotteryInfo.prizename+' '+lotteryInfo.prizecontent" :cancel="false" :show="lotteryBoxShow" @confirm="lotteryBoxShow=false" @hideModal="lotteryBoxShow=false">
			<view class="giftImage-box">
				<image class="giftImage" :src="giftImage"></image>
			</view>
		</y-confirm>
		<y-confirm :show="exchangeBoxShow" title="你的抽奖可用次数已不足1次 是否兑换？" @confirm="exchangeSuccess" @hideModal="exchangeBoxShow=false"></y-confirm>
		<y-input-confirm type="number" title="兑换次数" tips="请输入整数" :show="buyBoxShow" @confirm="buySuccess" @hideModal="buyBoxShow=false"></y-input-confirm>
		<y-confirm :show="batchBoxShow" title="请选择批量抽奖次数" bottom="30%" @hideModal="batchBoxShow=false" :cancel="false" :sure="false" :hideAuto="false">
			<view class="batch-container">
				<view class="batch-box">
					<view v-for="(i, index) in box" :key="index" class="batch-item" :class="batchChooseIndex===i.count?'boxActive':''" @click="batchChoose(i.count)">
						<view class="count">{{i.count}}次</view>
						<view class="discount">{{i.discount}}</view>
					</view>
				</view>
				<view class="batch-footer">
					<view class="batch-tips">
						<text>所需: {{batchNeedCount}}kg</text>
					</view>
					<view class="batch-submit">
						<view class="batch-button" @click="batchSubmit">批量抽奖</view>
					</view>
				</view>
			</view>
		</y-confirm>
		<y-confirm title="恭喜您获得" :bottom="luckyPrize.length>3?'15%':'30%'" :cancel="false" :show="batchLotteryBoxShow" @confirm="batchLotteryBoxShow=false" @hideModal="batchLotteryBoxShow=false">
			<view class="gift-box">
				<view class="gift-box-item" v-for="(i, index) in luckyPrize" :key="index">
					<image class="gift-image" mode="widthFix" :src="i.img"></image>
					<view class="gift-name">{{i.prizename}}×{{i.winNumber}}</view>
					<view class="gift-tips">{{i.prizecontent}}</view>
				</view>
			</view>
		</y-confirm>
		<y-confirm :show="lotteryRuleShow" zIndex="99" bottom="10%" :cancel="false" :sure="false" @hideModal="lotteryRuleShow=false">
			<view class="rule-container">
				<view class="rule-content">
					<text class="rule-title">奖品详情</text>
					<view class="rule-detail">
						<view v-for="(i, index) in detail" :key="index">{{i.title}} {{i.name}}</view>
					</view>
					<text class="rule-title">奖品详情</text>
					<view class="rule-detail">
						<view v-for="(i, index) in rule" :key="index">{{index+1}}. {{i}}</view>
					</view>
				</view>
				<view class="rule-button">
					<button class="y-button" @click="lotteryRuleShow=false">我知道了</button>
				</view>
			</view>
		</y-confirm>
	</view>
</template>

<script>
	import api from '@/utils/api/tabBar/index.js'
	import yConfirm from '@/components/y-confirm/y-confirm.vue'
	import yInputConfirm from '@/components/y-confirm/y-input-confirm.vue'
	import yModal from '@/components/uni-popup/uni-popup.vue'
	import top1 from '@/static/image/lottery1.png'
	export default {
		components: {
			yConfirm,
			yModal,
			yInputConfirm
		},
		data () {
			return {
				top1,
				sexModalShow: false,
				sum: 0,
				chance: 0,
				allHide: false,
				subShow: null,
				lotterySub: false,
				lotteryInfo: {},
				lotteryBoxShow: false,
				lotteryBox: {},
				exchangeBoxShow: false,
				exchangeBox: {},
				buyBoxShow: false,
				buyBox: {},
				batchBoxShow: false,
				batchLotteryBoxShow: false,
				lotteryRuleShow: false,
				lotteryOnceImage: '',
				giftImage: '',
				batchNeedCount: '??',
				batchChooseIndex: '',
				luckyPrize: [],
				list: [
					{ img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-qiche.png', index: 0, direction: 'right' },
					{ img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-shoubiao.png', index: 1 },
					{ img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-iphonex.png', index: 2 },
					{ img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-bingxiang.png', index: 3 },
					{ img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-chuifengji.png', index: 11 },
				    { img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-10kg.png', index: 12 },
				    { img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-5kg.png', index: 13 },
				    { img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-xiyiji.png', index: 4 },
				    { img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-zhazhiji.png', index: 10 },
				    { img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-0.1kg.png', index: 15 },
				    { img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-1kg.png', index: 14 },
				    { img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-kongtiao.png', index: 5 },
				    { img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-kouhong.png', index: 9 },
				    { img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-dianfengshan.png', index: 8 },
				    { img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-weibolu.png', index: 7 },
				    { img: 'https://gzjimibao.oss-cn-shenzhen.aliyuncs.com/prize/prize-dianfanbao.png', index: 6 }
				],
				box: [
					{ count: 5, discount: '99折' },
					{ count: 10, discount: '98折' },
					{ count: 20, discount: '96折' },
					{ count: 50, discount: '95折' },
					{ count: 100, discount: '9折' },
					{ count: 500, discount: '85折' }
				],
				detail: [
					{ title: '特等奖', name: '市价40万宝马X3汽车一台' },
					{ title: '一等奖', name: '市价1.5万浪琴名士手表一块' },
					{ title: '二等奖', name: '市价8千元苹果X手机一部' },
					{ title: '三等奖', name: '市价5999元海尔冰箱一台' },
					{ title: '四等奖', name: '市价4999元海尔洗衣机一台' },
					{ title: '五等奖', name: '市价3000元格力智能空调一台' },
					{ title: '六等奖', name: '市价500元苏泊尔电饭煲一个' },
					{ title: '七等奖', name: '市价399元美的微波炉1个' },
					{ title: '八等奖', name: '市价299元美的电风扇一台' },
					{ title: '九等奖', name: '市价199元MAC口红1个' },
					{ title: '十等奖', name: '市价99元苏泊尔榨汁机1个' },
					{ title: '十一等奖', name: '市价69元飞科吹风机1个' },
					{ title: '十二等奖', name: '奖励米粒10kg' },
					{ title: '十三等奖', name: '奖励米粒5kg' },
					{ title: '十四等奖', name: '奖励米粒1kg' },
					{ title: '幸运奖', name: '奖励米粒0.1kg' }
				],
				rule: [
					'活动开始时间：2019年5月13日，结束时间以集米宝官方通告公布为准。',
					'参与活动对象：所有在集米宝app已实名的会员朋友。',
					'活动注意事项：参与活动前，请详细阅读本活动规则，凡参与活动者，则被认为同意活动规则。',
					'抽奖前，需用米粒兑换抽奖次数，1kg米粒可以兑换5次抽奖机会，兑换次数不受限制，且抽奖过程不产生手续费。',
					'批量抽奖无需兑换，并有优惠和折扣。',
					'中奖信息以抽奖页面的弹窗提示和系统消息为准，虚拟类奖励可在抽奖记录中查看，实物类奖励需在中奖后三个工作日内联系我司客服填写收货信息，且中奖者需自行承担运费及相关税费。',
					'如未在三个工作日内联系我司客服填写收货信息，则被视为放弃奖励。',
					'所有中奖奖品，不得要求折换成现金或者更换产品。',
					'中奖奖品以收到的实物为准。',
					'如需人工协助，请联系我司客服。',
					'最终解释权归广州集米宝网络科技有限公司。'
				]
			}
		},
		onLoad() {
			this.getData()
		},
		onShow () {
			setTimeout(() => {
				this.allHide = true
			}, 300)
		},
		watch: {
			batchBoxShow (val) {
				this.batchChooseIndex = ''
				this.batchNeedCount = '??'
			}
		},
		methods: {
			async getData () {
				const res = await api.home()
				if (res.success) {
					this.sum = res.data.FirmFunds.lastbalance
				}
				const response = await api.lotteryChance()
				if (response.success) {
					this.chance = response.data.availabletimes
				}
			},
			async lotteryOnce () {
				const _this = this
				const res = await api.lottery()
				if (res.success) {
					this.lotteryInfo = res.data
					this.getData()
					this.checkImage(res.data)
					this.lotteryOnceAnimate()
				} else {
					if (res.message === '你的抽奖可用次数已不足1次') {
						this.exchangeBoxShow = true
					}
				}
			},
			checkImage (e) {
				this.list.forEach(element => {
					if (element.index === (parseInt(e.prizeid)/100-1)) {
						this.lotteryOnceImage = element.img
					}
				})
			},
			buyAfter () {
				this.getData()
				setTimeout(() => {
					uni.showToast({
						title: '兑换成功'
					})
				}, 100)
			},
			lotteryOnceAnimate () {
				this.subShow = 0
				this.lotterySub = true
				const _this = this
				let num = 0
				let timer = setInterval(() => {
					this.subShow += 1
					if (this.subShow > 15) {
						this.subShow = 0
						num+=1
					}
					if (num > 1 && (this.subShow === (parseInt(this.lotteryInfo.prizeid)/100-1))) {
						this.lotterySub = false
						clearInterval(timer)
						this.list.forEach(element => {
							if(parseInt(element.index) === (parseInt(this.lotteryInfo.prizeid)/100-1)) {
								this.giftImage = element.img
							}
						})
						this.lotteryBoxShow = true
					}
				}, 50)
			},
			exchangeSuccess () {
				this.exchangeBoxShow = false
				setTimeout(() =>{
					this.buyBoxShow = true
				}, 200)
			},
			lotterySuccess (e) {
				this.lotteryBoxShow = false
			},
			buySuccess (e) {
				let _this = this
				console.log(e)
				if (e) {
					const self = this
					if (/^[0-9]+$/.test(e)) {
						api.lotteryExchange(e).then(res => {
							if (res.success) {
								_this.buyBoxShow = false
								_this.buyAfter()
							}
						})
					} else {
						uni.showToast({
							title: '兑换数量必须大于0',
							icon: 'none'
						})
					}
				} else {
					uni.showToast({
						title: '请输入兑换个数',
						icon: 'none'
					})
				}
			},
			batchLottery () {
				this.batchBoxShow = true
			},
			async batchChoose (index) {
				 this.batchChooseIndex = index
				  const res = await api.batchNeedCount({ number: index })
				  if (res.success) {
					this.batchNeedCount = res.data
				  }
			},
			async batchSubmit () {
				if (!this.batchChooseIndex) {
					uni.showToast({
						title: '请选择批量次数',
						icon: 'none'
					})
					return false
				}
				const res = await api.batchLottery({ number: this.batchChooseIndex })
				if (res.success) {
					let data = []
					res.data.forEach(item => {
					  if (item.winNumber !== 0) {
						data.push(item)
					  }
					})
					this.checkPrize(data)
				}
			},
			checkPrize (e) {
				let data = this.list
				let prize = []
				data.forEach(item => {
					e.forEach(element => {
						let index = element.prizeid.toString().replace('00', '')
						if (item.index === parseInt(index) - 1) {
							prize.push({...element, img: item.img})
						}
					})
				})
				this.luckyPrize = prize
				this.batchBoxShow = false
				setTimeout(() => {
				this.batchLotteryBoxShow = true
				}, 100)
			},
			goRecord () {
				uni.navigateTo({
					url: './lottery-record'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.y-container {
		padding: 20upx 0 50upx;
		background: $uni-box-color;
	}
	.y-row {
		display: flex;
		justify-content: space-between;
		.y-col {
			background: $uni-box-color;
			color: $uni-font-color;
			border: $uni-router-color 1px solid;
			margin: 10upx 0;
			transition: .2s;
			padding: 10upx 20upx;
			font-size: $uni-font-size-base;
			border-radius: 0 40upx 40upx 0;
			border-left: none;
			border-right: none;
		}
		.y-col-right {
			border-radius: 40upx 0 0 40upx;
		}
		.y-col:active {
			background: $uni-router-color;
			color: $uni-text-color-inverse;
		}
	}
	.y-row-end {
		justify-content: flex-end;
		margin-top: 30upx;
	}
	.rule-content {
		height: 65vh;
		overflow: scroll;
	}
	.rule-title {
		border-radius: 0 40upx 40upx 0;
		background: #fc5566;
		color: #fff;
		display: inline-block;
		padding: 10upx 30upx;
	}
	.rule-detail {
		padding: 30upx;
		text-indent: 50upx;
	}
	.banner-container {
		position: relative;
	}
	.banner-top {
		width: 100%;
	}
	.banner-content {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		color: #fff;
		.banner-title {
			font-size: 40upx;
			margin-top: -50upx;
		}
		.banner-count {
			font-size: 48upx;
		}
	}
	.banner-tips {
		position: absolute;
		top: 30upx;
		left: 0;
		width: 100%;
		.no-tips {
			color: #FFD800;
		}
	}
	.y-tips-item {
		text-align: center;
		color: #fc5566;
		font-size: 40upx;
	}
	.lottery-box{
		outline: 10upx solid $uni-bg-color;
		border-radius: 50upx;
		box-shadow: 0 0 0 10px moccasin;
		margin: 30upx auto 30upx;
		padding: 10upx 0;
		width: 90vw;
		height: 90vw;
		overflow: hidden;
		display: flex;
		flex-wrap: wrap;
	}
	.y-item {
		width: 25%;
		height: 25%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		.y-image {
			width: 90%;
			height: 90%;
		}
		.y-modal, .y-modal-single {
			 // v-if="index === list.index"
			width: 90%;
			height: 90%;
			background: #7F7F7F;
			position: absolute;
			top: 5%;
			left: 5%;
			transition: .5s;
		}
		.y-modal-single {
			opacity: 0;
			transition: .03s;
		}
		.y-modal-hide {
			width: 0;
			height: 0;
			top: 50%;
			left: 50%;
		}
	}
	.y-button-box {
		display: flex;
		margin-top: 50upx;
	}
	.giftImage-box {
		text-align: center;
		.giftImage {
			width: 150upx;
			height: 150upx;
			margin: 20upx;
		}
	}
	.batch-container {
		padding: 20upx;
		.batch-box {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
		.batch-item {
			width: 30%;
			text-align: center;
			border: 1px solid #a0a0a0;
			border-radius: 10px;
			margin-bottom: 20upx;
			transition: .5s;
			.discount {
			  color: #fc5566;
			}
		}
		.boxActive {
			background: #5929b2;
			.count {
				color: #fff;
			}
		}
		.batch-footer {
			text-align: center;
			.batch-tips {
				color: $uni-text-color-grey;
				margin-bottom: 20upx;
			}
			.batch-submit {
				padding-bottom: 30upx;
			}
			.batch-button {
				width: 300upx;
				height: 100upx;
				margin: auto;
				color: #fff;
				font-weight: bold;
				line-height: 90upx;
				background: url('../../../../static/image/batchBtn.png');
				background-repeat: no-repeat;
				background-size: 100% 100%;
			}
		}
	}
	.gift-box {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
	}
	.gift-box-item {
		width: 30%;
		text-align: center;
		margin-bottom: 20upx;
		overflow: hidden;
		.gift-image {
			width: 80%;
		}
		.gift-name {
			font-size: $uni-font-size-base;
			word-wrap: break-word;
		}
		.gift-tips {
			color: $uni-text-color-grey;
			font-size: $uni-font-size-sm;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}
	}
</style>
