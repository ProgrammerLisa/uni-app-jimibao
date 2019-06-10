<template>
	<view class="y-modal-container" v-if="show">
		<view class="y-modal" @click="showBefore=false" :class="showBefore?`fade-in`:`fade-out`"></view>
		<view class="y-modal-content" :class="showBefore?`slow-up`:`slow-down`">
			<view class="y-confirm">
				<view class="title">{{title}}</view>
				<view class="footer">
					<view class="footer-button footer-sure" @click="sendConfirm">确定</view>
					<view class="footer-button" @click="showBefore=false">取消</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: Array,
			show: Boolean,
			title: String,
			content: String
		},
		data () {
			return {
				showBefore: false
			}
		},
		watch: {
			show (val) {
				if (val) {
					this.showBefore = val
				}
			},
			showBefore (val) {
				if (!val) {
					setTimeout(() => {
						this.$emit('hideModal')
					}, 200)
				}
			}
		},
		methods: {
			sendConfirm () {
				this.$emit('confirm')
			}
		}
	}
</script>

<style scoped lang="scss">
	.y-modal-container {
		height: 100vh;
		width: 100%;
		overflow: hidden;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
		.y-modal {
			height: 100%;
			width: 100%;
			background: rgba(0, 0, 0, .4);
			transition: .2s;
		}
		.y-modal-content {
			position: fixed;
			bottom: $uni-spacing-row-base;
			left: 5%;
			width: 90%;
			border-radius: $uni-spacing-row-base;
			overflow: hidden;
			transition: .2s;
		}
		.fade-in {
			opacity: 1
		}
		.fade-out {
			opacity: 0
		}
		.slow-up {
			bottom: 20upx;
		}
		.slow-down {
			bottom: -100%;
		}
	}
	.y-confirm {
		background: #fff;
		.title {
			text-align: center;
			color: #333;
			font-size: 32upx;
			padding: 20upx;
			border-bottom: 1px solid #eee;
		}
		.footer {
			display: flex;
			align-items: center;
			.footer-button {
				flex: 1;
				text-align: center;
				border-radius: none;
				border: none;
				font-size: 32upx;
				color: #777;
				padding: 20upx 0;
			}
			.footer-sure {
				color: #007aff;
				border-right: 1px solid #eee;
			}
		}
	}
</style>
