<template>
	<view class="y-modal-container" v-if="show">
		<view class="y-modal" @click="showBefore=false" :class="showBefore?`fade-in`:`fade-out`"></view>
		<view class="y-modal-content" :class="showBefore?`slow-up`:`slow-down`">
			<slot></slot>
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
		z-index: 11;
		.y-modal {
			height: 100%;
			width: 100%;
			background: rgba(0, 0, 0, .4);
			transition: .2s;
		}
		.y-modal-content {
			position: fixed;
			bottom: $uni-spacing-row-base;
			width: 100%;
			border-radius: $uni-spacing-row-base $uni-spacing-row-base 0 0;
			transition: .2s;
		}
		.fade-in {
			opacity: 1
		}
		.fade-out {
			opacity: 0
		}
		.slow-up {
			bottom: 0;
		}
		.slow-down {
			bottom: -100%;
		}
	}
	
</style>
