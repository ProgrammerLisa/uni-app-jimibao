<template>
	<web-view :src="src"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				src: ''
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

<style>
</style>
