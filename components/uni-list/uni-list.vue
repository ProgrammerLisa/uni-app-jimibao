<template>
	<view class="uni-list">
		<slot />
	</view>
</template>
<script>
	export default {
		name: 'UniList'
	}
</script>
<style lang="scss">
	@charset "UTF-8";

	.uni-list {
		background-color:$uni-box-color;
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
		border-radius: 18upx;
	}
	.uni-list:after {
		position: absolute;
		z-index: 10;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: $uni-box-line;
	}

	.uni-list:before {
		position: absolute;
		z-index: 10;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: $uni-box-line;
	}
</style>