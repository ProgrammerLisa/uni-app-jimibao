<template>
	<view class="y-content">
		<view class="y-list" @click="setInfo(i)" v-for="(i, index) in list" :key="index">
			<view class="y-list-left">{{i.title}}</view>
			<view class="y-list-right">
				<image :src="i.url?i.url:defaultAvatar" v-if="i.type==='image'"></image>
				<text v-else>{{i.value}}</text>
				<uni-icon v-if="i.canEdit" size="20" type="arrowright" color="#fff"></uni-icon>
			</view>
		</view>
	</view>
</template>

<script>
	import avatar from '@/static/image/avatar.png'
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default {
		components: {
			uniIcon
		},
		data () {
			return {
				defaultAvatar: avatar,
				list: [
					{ canEdit: true, title: '头像', type: 'image', url: '' },
					{ canEdit: false, title: 'ID', type: 'id', value: '15073719360' },
					{ canEdit: true, title: '账号', type: 'account', value: '15073719360', path: '/pages/template/personal_info/set_info' },
					{ canEdit: true, title: '昵称', type: 'nickname', value: '15073719360', path: '/pages/template/personal_info/set_info' },
					{ canEdit: true, title: '性别', type: 'sex', value: '15073719360', path: '/pages/template/personal_info/set_info' },
					{ canEdit: true, title: '实名认证', type: 'text', value: '', path: false },
				]
			}
		},
		methods: {
			setInfo (i) {
				if (i.canEdit && i.path) {
					uni.navigateTo({
						url: `${i.path}?type=${i.type}&title=${i.title}`
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.y-content {
		padding: 10upx 20upx 0;
		overflow: hidden;
		background: $uni-box-color;
	}
	.y-list {
		display: flex;
		align-items: center;
		color: #ccc;
		padding: 30upx 20upx;
		justify-content: space-between;
		border-bottom: 1px solid $uni-box-line;
		.y-list-left {
			font-size: 32upx;
		}
		.y-list-right {
			font-size: 32upx;
			display: flex;
			align-items: center;
			image {
				width: 100upx;
				height: 100upx;
				
			}
		}
	}
	.uni-icon {
		margin-left: 20upx;
	}
</style>
