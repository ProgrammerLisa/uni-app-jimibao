<template>
	<view class="y-modal-container" v-if="show" :style="'z-index:'+zIndex" catchtouchmove="nomove">
		<view class="y-modal" @click.stop="!notHide?showBefore=false:''" :class="showBefore?`fade-in`:`fade-out`"></view>
		<view class="y-modal-content" :class="showBefore?`slow-up`:`slow-down`">
			<view class="y-confirm">
				<view class="title">{{title}}</view>
				<view class="tips">{{tips}}</view>
				<view class="input">
					<input class="input-style" :type="type" :maxlength="maxlength" v-model="value" />
				</view>
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
			tips: String,
			type: {
				type: String,
				default: 'text'
			},
			notHide: {
				type: Boolean,
				default: false
			},
			zIndex: Number,
			maxlength: {
				type: Number,
				default: 20
			}
		},
		data () {
			return {
				showBefore: false,
				value: ''
			}
		},
		watch: {
			show (val) {
				if (val) {
					this.value = ''
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
				this.$emit('confirm', this.value)
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
			left: 10%;
			width: 80%;
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
			top: 200upx;
		}
		.slow-down {
			top: -100%;
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
			border-radius: $uni-spacing-row-base;
			overflow: hidden;
			.footer-button {
				flex: 1;
				text-align: center;
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
	.tips {
		text-align: center;
		color: $uni-text-color-grey;
	}
	.input {
		text-align: center;
		.input-style {
			width: 80%;
			margin: auto;
			font-size: $uni-font-size-lg;
			outline: none;
			padding: 20upx;
			border: solid 1px $uni-input-border-color;
			border-radius: 6upx;
			text-align: center;
			color: $uni-text-color;
		}
	}
</style>
