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
				let obj = {}
				obj[this.info.type] = this.content
				this.sendForm(obj)
			} else {
				uni.showToast({
					title: '请输入' + this.info.title,
					icon: 'none'
				})
			}
		},
		methods: {
			goBack () {
				uni.navigateBack()
			},
			async sendForm (obj) {
				const res = await api.updateInfo(obj)
				if (res.success) {
					uni.showToast({
						title: '修改成功'
					})
					setTimeout(() => {
						this.goBack()
					}, 500)
				}
			}
		}
	}
</script>
	
<style lang="scss" scoped>
	.y-content-hasNav {
		color: #555;
	}
	input {
		font-size: 15px;
		padding: 20upx;
		border-bottom: 1px solid #555;
		color: $uni-text-color;
	}
</style>
