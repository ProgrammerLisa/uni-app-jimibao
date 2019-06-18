<template>
	<view class="y-content-hasTab">
		<view class="y-content-header">
			<view>
				<view class="header-setting">
					<uni-icon type="gear" :color="'#8f8f94'" size="36" @click="goSetting()" />
				</view>
				<view class="header-profile" @click="goSetInfo">
					<view class="profile-avatar">
						<image :src="userInfo.headimage?imageUrl+userInfo.headimage:defaultAvatar"></image>
						<view class="profile-info">
							<view class="text-black">{{userInfo.phone}}</view>
							<view>ID: {{userInfo.tuijianma}}</view>
						</view>
					</view>
					<view>
						<uni-icon type="forward"></uni-icon>
					</view>
				</view>
			</view>
			<view class="wave-box">
				<view class="wave-list-box">
					<swiper autoplay="true" circular="true" interval="0">
						<swiper-item v-for="(item, index) in wave1" :key="index">
							<image :src="item"></image>
						</swiper-item>
					</swiper>
				</view>
				<view class="wave-list-box">
					<swiper autoplay="true" circular="true" interval="0">
						<swiper-item v-for="(item, index) in wave2" :key="index">
							<image :src="item"></image>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view class="fill-box">
				<view class="fill-box-content" v-for="(i, index) in levelList" :key="'level'+index" @click="goLevel">
					<view class="fill-box-top">{{i.text}}</view>
					<view class="fill-box-bottom"><image :src="i.icon"></image><text>{{i.title}}</text></view>
				</view>
			</view>
		</view>
		<view class="y-list">
			<view class="y-list-box">
				<view class="y-list-box-item" v-for="(i, index) in topList" :key="'list'+index" @click="goToplist(index)">
					<uni-icon :type="i.icon" color="#ff9800"></uni-icon>
					<view>{{i.title}}</view>
				</view>
			</view>
			<view class="y-uni-list">
				<uni-list>
					<uni-list-item @click="running(index)" v-for="(i, index) in list" :key="'item'+index" :show-arrow="i.showArrow" :title="i.title" :show-extra-icon="i.showExtraIcon" :extra-icon="i.extraIcon" :show-badge="i.showBadge" :badge-text="i.badgeText" :badgeType="i.badgeType" />
				</uni-list>
			</view>
		</view>
	</view>
</template>

<script>
	import wave1 from '@/static/image/wave_01.png'
	import wave2 from '@/static/image/wave_02.png'
	import avatar from '@/static/image/avatar.png'
	import hot from '@/static/image/hot.png'
	import diamond from '@/static/image/diamond.png'
	import gift from '@/static/image/gift.png'
	
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import api from '@/utils/api/tabBar/index.js'
	import apiChat from '@/utils/api/chat/index.js'
	
	export default {
		components: {
			uniIcon,
			uniList,
			uniListItem
		},
		data() {
			return {
				hot,
				diamond,
				gift,
				wave1: [wave1, wave1],
				wave2: [wave2, wave2],
				defaultAvatar: avatar,
				imageUrl: '',
				userInfo: {},
				servicePhone: {},
				extraIcon1: {
					color: '#007aff',
					size: '22',
					type: 'info-filled'
				},
				levelList: [
					{ title: '会员等级', type: 'level', icon: diamond, text: 'Lv0' },
					{ title: '活跃值', type: 'active', icon: hot, text: '0' },
					{ title: '贡献值', type: 'contribution', icon: gift, text: '0' }
				],
				topList: [
					{ title: '抽奖', type: 'lottery', icon: 'spinner', url: '/pages/template/profile/topList-lottery/topList-lottery' },
					{ title: '订单', type: 'order', icon: 'compose', url: '/pages/template/profile/topList-order/topList-order' },
					{ title: '团队', type: 'team', icon: 'contact', url: '/pages/template/profile/topList-team/topList-team' },
					{ title: '收货地址', type: 'encourage', icon: 'location-filled', url: '/pages/template/profile/address/address' }
				],
				list: [
					{ title: '米库总量', type: 'sum', showArrow: true, showExtraIcon: true, extraIcon: { color: '#a1adc1', size: '22', type: 'star-filled' }, showBadge: true, badgeText: '', badgeType: 'warning', runningWay: 'goPage', path: '/pages/template/profile/sum/sum' },
					{ title: '实名认证', type: 'realName', showArrow: true, showExtraIcon: true, extraIcon: { color: '#a1adc1', size: '22', type: 'personadd-filled' }, showBadge: true, badgeText: '', badgeType: 'warning', runningWay: 'goPage', path: '/pages/template/profile/real-name/real-name' },
					{ title: '问题反馈', type: 'feedback', showArrow: true, showExtraIcon: true, extraIcon: { color: '#a1adc1', size: '22', type: 'help-filled' }, showBadge: false, badgeText: '', badgeType: 'warning', runningWay: 'goPage', path: '/pages/template/profile/feedback/feedback' },
					{ title: '检测版本', type: 'edition', showArrow: true, showExtraIcon: true, extraIcon: { color: '#a1adc1', size: '22', type: 'info-filled' }, showBadge: true, badgeText: '', badgeType: 'warning', runningWay: 'goPage', path: '/pages/template/profile/edition/edition' },
					{ title: '客服微信', type: 'wechat', showArrow: false, showExtraIcon: true, extraIcon: { color: '#a1adc1', size: '22', type: 'weixin' }, showBadge: true, badgeText: '', badgeType: 'default', runningWay: 'copy' },
					{ title: '客服热线', type: 'phone', showArrow: false, showExtraIcon: true, extraIcon: { color: '#a1adc1', size: '22', type: 'phone-filled' }, showBadge: true, badgeText: '', badgeType: 'default', runningWay: 'dialPhone' }
				]
			}
		},
		onShow() {
			this.getData()
			this.getListData()
			const _this = this
			uni.onSocketMessage(function(res){
				if (JSON.parse(res.data).type === 'CHAT') {
					_this.noReadCount()
				}
			})
		},
		onReady () {
			this.imageUrl = this.$imageUrl
		},
		methods: {
			async getData () {
				const res = await api.home()
				if (res.success) {
					this.userInfo = res.data.TFirmPO
					this.levelList.forEach(element => {
						switch (element.type) {
							case 'level':
								element.text = 'Lv'+this.userInfo.levelid
								break
							case 'active':
								element.text = this.userInfo.activevalue
								break
							case 'contribution':
								element.text = this.userInfo.contribution
								break
						}
					})
					this.list.forEach(element => {
						switch (element.type) {
							case 'sum':
								element.badgeText = res.data.FirmFunds.lastbalance
								break
							case 'realName':
								res.data.TFirmPO.idcard ? element.badgeText = '已认证' : element.badgeText = '未认证'
								break
							case 'edition':
								element.badgeText = this.$version
								break
						}
					})
				}
			},
			async getListData () {
				const res = await api.phoneVersion()
				if (res.success) {
					this.servicePhone = res.data
					this.list.forEach(element => {
						switch (element.type) {
							case 'wechat':
								element.badgeText = res.data.wechat
								break
							case 'phone':
								element.badgeText = res.data.telphone
						}
					})
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
			goSetting () {
				uni.navigateTo({
					url: '/pages/template/profile/setting/setting'
				})
			},
			goSetInfo () {
				uni.navigateTo({
					url: '/pages/template/profile/info/info'
				})
			},
			goLevel () {
				uni.navigateTo({
					url: '/pages/template/profile/level/level'
				})
			},
			goToplist (index) {
				uni.navigateTo({
					url: this.topList[index].url
				})
			},
			running (index) {
				let e = this.list[index]
				switch (e.runningWay) {
					case 'copy':
						uni.setClipboardData({
							data: e.badgeText,
							success () {
								uni.showToast({
									title: '复制成功'
								})
							},
							fail () {
								uni.showToast({
									title: '复制失败',
									icon: 'none'
								})
							}
						})
						break
					case 'dialPhone':
						uni.makePhoneCall({
							phoneNumber: e.badgeText,
							fail () {
								uni.showToast({
									title: '调用手机拨号失败，请手动输入号码拨号',
									icon: 'none'
								})
							}
						})
						break
					case 'goPage':
						uni.navigateTo({
							url: e.path
						})
						break
				}
			}
		}
	}
</script>

<style scoped lang="scss">
.wave-list-box {
	width: 100%;
	position: absolute;
	left: 0;
	image {
		width: 1920upx;
		height: 60upx;
		filter: drop-shadow(16upx 16upx 0 #e2c8a5) invert(50%);
	}
}
.wave-box {
	position: relative;
	padding-bottom: 60upx;
}
.fill-box {
	position: relative;
	background: #7F7F7F;
	display: flex;
	overflow: hidden;
	justify-content: space-around;
	text-align: center;
	padding-top: 20upx;
	color: #ccc;
	image {
		width: 36upx;
		height: 36upx;
		margin-right: 10upx;
	}
	.fill-box-top {
		border: #dece98 solid 1px;
		border-radius: 50upx;
	}
	.fill-box-bottom {
		padding: 10upx 0 60upx;
		display: flex;
		align-items: center;
	}
}
.y-content-header {
	background: #dece98;
}
.header-setting {
	display: flex;
	justify-content: flex-end;
	padding: 20upx;
}
.header-profile {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20upx;
	color: #788589;
	.profile-avatar {
		display: flex;
		align-items: center;
		image {
			width: 150upx;
			height: 150upx;
			border-radius: 50%;
			margin-right: 30upx;
			border: 1px solid $uni-router-color;
		}
	}
}
.text-black {
	color: #444;
}
.y-uni-list {
	overflow: hidden;
	border-radius: 18upx;
}
.y-list {
	position: relative;
	padding: 20upx 20upx 100upx;
	margin-top: -60upx;
	.y-list-box {
		display: flex;
		text-align: center;
		background: $uni-box-color;
		border-radius: 18upx;
		margin-bottom: 20upx;
		.y-list-box-item {
			flex: 1;
			padding: 20upx 0;
		}
	}
}
</style>
