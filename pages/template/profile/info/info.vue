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
	import api from '@/utils/api/tabBar/index.js'
	export default {
		components: {
			uniIcon
		},
		data () {
			return {
				defaultAvatar: avatar,
				list: [
					{ canEdit: true, title: '头像', type: 'image', url: '' },
					{ canEdit: false, title: 'ID', type: 'id', value: '' },
					{ canEdit: false, title: '账号', type: 'account', value: '', path: '/pages/template/profile/info/set-info' },
					{ canEdit: true, title: '昵称', type: 'nickname', value: '', path: '/pages/template/profile/info/set-info' },
					{ canEdit: true, title: '性别', type: 'sex', value: '', status: '' },
					{ canEdit: true, title: '实名认证', type: 'realName', value: '', path: '/pages/template/profile/list-real-name/list-real-name' },
				]
			}
		},
		onLoad () {
			this.getData()
		},
		methods: {
			async getData () {
				const _this = this
				const res = await api.home()
				if (res.success) {
					let data = res.data.TFirmPO
					this.list.forEach(elememt => {
						switch (elememt.type) {
							case 'image':
								if (data.headimage) {
									elememt.url = _this.$imageUrl + data.headimage
								}
								break
							case 'id':
								elememt.value = data.tuijianma
								break
							case 'account':
								if (data.account) {
									elememt.value = data.account
								} else {
									elememt.canEdit = true
								}
								break
							case 'nickname':
								elememt.value = data.nickname
								break
							case 'sex':
								elememt.status = data.sex
								data.sex === 1 ? elememt.value = '男' : data.sex === 2 ? elememt.value = '女' : elememt.value = ''
								break
							case 'realName':
								data.status === 0 ? elememt.value = '未实名' : data.status === 1 ? elememt.value = '已实名' : data.status === 2 ? elememt.value = '已冻结' : elememt.value = ''
								
						}
					})
				}
			},
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
