<template>
	<view class="modal-cantainer y-content-hasNav" v-if="show">
		<view class="modal-bg" @click="showBefore=false" :class="showBefore?`fade-in`:`fade-out`"></view>
		<view class="modal-box" :class="showBefore?`modal-box-show`:`modal-box-hide`">
			<view class="box-title" v-if="type.title">{{type.title}}</view>
			<!-- <view class="box-content">
				<view v-if="type.contentType.includes('input')">
					<input class="content-input" v-model="confirmInput" :type="type.inputType" focus placeholder="请输入兑换个数" />
				</view>
				<view class="box-content-text" v-html="type.content" v-if="type.content"></view>
			</view> -->
			<view class="box-footer">
				<button class="y-button" @click="$emit('success', confirmInput)">{{type.confirmText}}</button>
				<button class="y-button y-button-cancel" @click="showBefore=false" v-show="type.showCancel">{{type.cancelText}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			show: false,
			type: {
				title: String,
				content: String,
				showCancel: true,
				contentType: [],
				confirmText: '确定',
				cancelText: '取消',
				inputType: 'text'
			}
		},
		data () {
			return {
				showBrfore: false,
				confirmInput: ''
			}
		},
		watch: {
			show (val) {
				if (val) {
					this.showBrfore = val
				}
			},
			showBefore (val) {
				if (!val) {
					setTimeout(() => {
						this.$emit('fail')
					}, 200)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.modal-cantainer {
		color: $uni-text-color-light;
		width: 100%;
		height: 100vh;
		overflow: hidden;
		position: fixed;
		top: 0;
		left: 0;
		background: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.modal-bg {
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 1;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.6);
	}
	.modal-box {
		width: 80%;
		max-width: 600upx;
		position: relative;
		z-index: 2;
		background: $uni-box-color;
		border: solid 1upx $uni-router-color;
		border-radius: 20upx;
		transition: .2s;
		.box-title {
			text-align: center;
			font-size: $uni-font-size-lg;
			border-bottom: 1px solid $uni-input-border-color;
			padding: 20upx;
		}
		.box-content-text {
			padding: 20upx;
			border-top: 1upx solid $uni-input-border-color;
		}
		.content-input {
			background: transparent;
			width: 100%;
			font-size: $uni-font-size-lg;
			border: 0;
			outline: none;
			color: $uni-font-color;
			text-align: center;
			padding: 20upx 0;
		}
		.box-footer {
			display: flex;
			border-top: 1px solid $uni-input-border-color;
			button {
				flex: 1;
				border-top:none;
				border-left:none;
				border-bottom:none;
				border-right: 1upx solid $uni-input-border-color;
				border-radius: 0;
			}
			button:last-child {
				border-right: none;
			}
			.y-button-cancel {
				color: $uni-font-color;
			}
		}
	}
	.modal-box-hide {
		opacity: 0.3;
		transform: scale(0.5);
	}
	.modal-box-show {
		opacity: 1;
		transform: scale(1);
	}
</style>
