<template>
	<view class="y-content-hasTab">
		<view class="y-content-header">
			<view>
				<view class="header-setting">
					<uni-icon type="gear" :color="'#8f8f94'" size="36" @click="goSetting()" />
				</view>
				<view class="header-profile" @click="goSetInfo">
					<view class="profile-avatar">
						<image :src="profile.avatar?profile.avatar:defaultAvatar"></image>
						<view class="profile-info">
							<view class="text-black">{{profile.phone}}</view>
							<view>ID: {{profile.id}}</view>
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
				<view>
					<view class="fill-box-top">Lv1</view>
					<view class="fill-box-bottom"><image :src="diamond"></image><text>会员等级</text></view>
				</view>
				<view>
					<view class="fill-box-top">1</view>
					<view class="fill-box-bottom"><image :src="hot"></image><text>活跃值</text></view>
				</view>
				<view>
					<view class="fill-box-top">0</view>
					<view class="fill-box-bottom"><image :src="gift"></image><text>贡献值</text></view>
				</view>
			</view>
		</view>
		<view class="y-list">
			<view class="y-list-box">
				<view class="y-list-box-item" v-for="(i, index) in topList" :key="index">
					<uni-icon :type="i.icon" color="#fedba3"></uni-icon>
					<view>{{i.title}}</view>
				</view>
			</view>
			<view class="y-uni-list">
				<uni-list>
					<uni-list-item v-for="(i, index) in list" :key="'list'+index" :show-arrow="i.showArrow" :title="i.title" :show-extra-icon="i.showExtraIcon" :extra-icon="i.extraIcon" :show-badge="i.showBadge" :badge-text="i.badgeText" />
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
				profile: {},
				extraIcon1: {
					color: '#007aff',
					size: '22',
					type: 'info-filled'
				},
				topList: [
					{ title: '抽奖', icon: 'spinner', url: '' },
					{ title: '订单', icon: 'compose', url: '' },
					{ title: '团队', icon: 'contact', url: '' },
					{ title: '鼓励金', icon: 'circle-filled', url: '' }
				],
				list: [
					{ title: '米库总量', showArrow: true, showExtraIcon: true, extraIcon: { color: '#a1adc1', size: '22', type: 'star-filled' }, showBadge: true, badgeText: null },
					{ title: '实名认证', showArrow: true, showExtraIcon: true, extraIcon: { color: '#a1adc1', size: '22', type: 'personadd-filled' }, showBadge: true, badgeText: null },
					{ title: '收货地址', showArrow: true, showExtraIcon: true, extraIcon: { color: '#a1adc1', size: '22', type: 'location-filled' }, showBadge: false, badgeText: null },
					{ title: '问题反馈', showArrow: true, showExtraIcon: true, extraIcon: { color: '#a1adc1', size: '22', type: 'help-filled' }, showBadge: false, badgeText: null },
					{ title: '检测版本', showArrow: true, showExtraIcon: true, extraIcon: { color: '#a1adc1', size: '22', type: 'info-filled' }, showBadge: true, badgeText: null },
					{ title: '客服微信', showArrow: false, showExtraIcon: true, extraIcon: { color: '#a1adc1', size: '22', type: 'weixin' }, showBadge: true, badgeText: null },
					{ title: '客服热线', showArrow: false, showExtraIcon: true, extraIcon: { color: '#a1adc1', size: '22', type: 'phone-filled' }, showBadge: true, badgeText: null }
				]
			}
		},
		onLoad() {
			
		},
		onReady () {
			
		},
		mounted () {
			
		},
		methods: {
			goSetting () {
				
			},
			goSetInfo () {
				uni.navigateTo({
					url: '/pages/template/personal_info/personal_info'
				})
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
	background: #7F7F7F;
	display: flex;
	overflow: hidden;
	justify-content: space-around;
	text-align: center;
	padding-top: 20upx;
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
