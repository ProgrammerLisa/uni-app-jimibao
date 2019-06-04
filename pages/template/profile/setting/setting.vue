<template>
	<view class="y-content-hasNav">
		<uni-list>
			<uni-list-item @click="goPage(index)" v-for="(i, index) in metaList" :key="'list'+index" :show-arrow="true" :title="i.title" />
		</uni-list>
		<button class="y-button" @click="logout">退出登录</button>
	</view>
</template>

<script>
	import api from '@/utils/api/login/index.js'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniList,
			uniListItem
		},
		data () {
			return {
				metaList: [
					{ title: '交换密码', type: 'Tread' },
					{ title: '登录密码', type: 'Login' }
				]
			}
		},
		methods: {
			goPage (index) {
				uni.navigateTo({
					url: `/pages/template/profile/setting/set-password?title=${this.metaList[index].title}&type=${this.metaList[index].type}`
				})
			},
			async logout () {
				const res = await api.logout()
				if (res.success) {
					uni.removeStorage({
						key: 'user',
						success: function (res) {
							console.log('success')
							uni.reLaunch({
								url: '/pages/login/login/login'
							})
						}
					})
				}
			}
		}
	}
</script>
	
<style scoped lang="scss">
	.y-button {
		position: absolute;
		bottom: 0;
		width: 95%;
		margin: 20upx 2.5%;
	}
</style>
