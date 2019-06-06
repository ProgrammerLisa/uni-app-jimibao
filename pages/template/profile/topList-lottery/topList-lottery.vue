<template>
	<view class="y-container">
		<view class="y-row">
			<uni-tag :mark="true" :text="`当前米库总量：${info.sum} kg`" :inverted="true" />
		</view>
		<view class="y-row">
			<uni-tag :mark="true" :text="`次数：${info.chance}`" :inverted="true" />
			<uni-tag :mark="true" :disabled="lotterySub"  text="我的奖品" class="uni-tag-right" :inverted="true" />
		</view>
		<view class="lottery-box">
			<view class="y-item" v-for="(i, index) in list" :key="index">
				<image class="y-image" :src="i.img"></image>
				<view class="y-modal" :class="allHide||(i.index===subShow)?`y-modal-hide`:''"></view>
				<view class="y-modal-single" :style="i.index===subShow?`opacity:0.3`:`opacity:0`"></view>
			</view>
		</view>
		<view class="y-button-box">
			<button class="y-button" :disabled="lotterySub" @click="lotteryOnceTest">单次抽奖</button>
			<button class="y-button" :disabled="lotterySub">批量抽奖</button>
		</view>
		<y-modal :show="sexModalShow" boxType="confirm" @hideModal="sexModalShow=false"></y-modal>
		<y-confirm :type="lotteryBox" :show="lotteryBoxShow" @success="lotterySuccess" @fail="lotteryBoxShow=false"></y-confirm>
		<y-confirm :type="exchangeBox" :show="exchangeBoxShow" @success="exchangeSuccess" @fail="exchangeBoxShow=false"></y-confirm>
		<y-confirm :type="buyBox" :show="buyBoxShow" @success="buySuccess" @fail="buyBoxShow=false"></y-confirm>
	</view>
</template>

<script>
	import api from '@/utils/api/tabBar/index.js'
	import uniTag from '@/components/uni-tag/uni-tag.vue'
	import yConfirm from '@/components/y-confirm/y-confirm.vue'
	import yModal from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniTag,
			yConfirm,
			yModal
		},
		data () {
			return {
				sexModalShow: false,
				info: {
					num: 0,
					chance: 0
				},
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
				lotteryOnceImage: '',
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
				]
			}
		},
		onShow () {
			this.getData()
			setTimeout(() => {
				this.allHide = true
			}, 300)
		},
		methods: {
			async getData () {
				const res = await api.home()
				if (res.success) {
					this.info.sum = res.data.FirmFunds.lastbalance
				}
				const response = await api.lotteryChance()
				if (response.success) {
					this.info.chance = response.data.availabletimes
				}
			},
			lotteryOnceTest () {
				
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
						this.exchangeBox = {
							title: res.message + ' 是否兑换？',
							showCancel: true,
							contentType: ['image'],
							confirmText: '确定',
							cancelText: '取消'
						}
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
			buy () {
				const _this = this
				this.buyBoxShow = true
				this.buyBox = {
					title: '兑换',
					contentType: ['input'],
					showCancel: true,
					inputType: 'number',
					confirmText: '确定',
					cancelText: '取消'
				}
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
						this.lotteryBoxShow = true
						this.lotteryBox = {
							title: _this.lotteryInfo.prizename,
							content: `<uni-view style="text-align: center;"><uni-view style="margin-bottom:10px">恭喜您获得：</uni-view><image style="max-width: 100px;height:100px" src="${_this.lotteryOnceImage}"></image><uni-view>${_this.lotteryInfo.prizecontent}</uni-view></uni-view>`,
							show: true,
							showCancel: false,
							contentType: ['image'],
							inputType: 'text',
							confirmText: '确定',
							cancelText: '取消'
						}
					}
				}, 50)
			},
			exchangeSuccess (e) {
				this.exchangeBoxShow = false
				setTimeout(() =>{
					this.buy()
				}, 200)
			},
			lotterySuccess (e) {
				this.lotteryBoxShow = false
			},
			buySuccess (e) {
				let _this = this
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.y-container {
		padding: 20upx 0;
	}
	.y-row {
		display: flex;
		justify-content: space-between;
		.uni-tag {
			background: transparent;
			color: $uni-font-color;
			border-color: $uni-router-color;
			margin: 10upx 0;
			transition: .2s;
		}
		.uni-tag:active {
			background: $uni-router-color;
			color: $uni-text-color-inverse;
		}
		.uni-tag--disabled:active {
			background: transparent;
			color: $uni-font-color;
		}
		.uni-tag-right {
			border-radius: 30upx 0 0 30upx;
		}
	}
	.lottery-box{
		outline: 10upx solid $uni-bg-color;
		border-radius: 50upx;
		box-shadow: 0 0 0 10px moccasin;
		margin: 60upx auto 30upx;
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
			transition: .05s;
		}
		.y-modal-hide {
			transform: rotate(180deg);
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
</style>
