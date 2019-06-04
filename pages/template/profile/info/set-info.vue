<template>
	<view class="y-content-hasNav">
		<input maxlength="20" v-model="content" :placeholder="`请输入${info.title}`" />
	</view>
</template>

<script>
	import api from '@/utils/api/tabBar/index.js'
	export default {
		data () {
			return {
				content: '',
				info: {}
			}
		},
		onLoad (e) {
			this.info = e
			uni.setNavigationBarTitle({
				title: e.title
			})
		},
		onNavigationBarButtonTap (e) {
			if (this.content) {
				this.sendForm()
			} else {
				uni.showToast({
					title: '请输入' + this.info.title,
					icon: 'none'
				})
			}
		},
		methods: {
			async sendForm () {
				const res = await api.updateInfo({ '' : this.content })
			}
		}
	}
</script>
	
<style lang="scss" scoped>
	.y-content-hasNav {
		background: #fff;
		color: #555;
	}
	input {
		font-size: 15px;
		padding: 20upx;
		border-bottom: 1px solid #d7d7d7;
	}
</style>
