<template>
	<view class="y-modal-container" v-show="show">
		<view class="y-modal" @click="showBefore=false" :class="showBefore?`fade-in`:`fade-out`"></view>
		<view class="y-modal-content" :class="showBefore?`slow-up`:`slow-down`">
			<view v-show="boxType === 'radio'">
				<view v-for="(i, index) in list" :key="index" @click="sendItem(index)" class="y-modal-item">
					{{i.title}}
				</view>
				<view class="y-modal-item" @click="showBefore=false">取消</view>
			</view>
			<view v-show="boxType === 'confirm'" class="y-confirm">
				<view class="title">{{confirm.title}}</view>
				<view class="content">{{confirm.content}}</view>
				<view class="footer">
					<button class="footer-button" @click="sendConfirm">确定</button>
					<button class="footer-button" @click="showBefore=false">取消</button>
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
			boxType: {
				type: String,
				default: 'radio'
			},
			confirm: {
				title: String,
				content: String
			}
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
			sendItem (index) {
				this.$emit('getItem', this.list[index])
			},
			sendConfirm () {
				this.$emit('confirm', this.confirm.content)
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
		.y-modal-item {
			background: #f7f7f7;
			color: $uni-text-color-inverse;
			text-align: center;
			border-bottom: 1upx solid #eee;
			padding: $uni-spacing-row-base;
			font-size: $uni-font-size-lg;
		}
		.y-modal-item:last-child {
			border-bottom: none;
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
		
	}
</style>
