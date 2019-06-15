<template>
	<view class="y-content">
		<template>
			<video :src="src" class="video" autoplay></video>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: '',
				title: ''
			}
		},
		onLoad (e) {
			this.src = e.src
			uni.setNavigationBarTitle({
				title: e.title
			})
		}
	}
</script>

<style scoped lang="scss">
	.video {
		width: 100%;
	}
</style>
