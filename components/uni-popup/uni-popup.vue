<template>
	<view class="y-modal-container" v-if="show">
		<view class="y-modal" @click="showBefore=false" :class="showBefore?`fade-in`:`fade-out`"></view>
		<view class="y-modal-content" :class="showBefore?`slow-up`:`slow-down`">
			<view>
				<view v-for="(i, index) in list" :key="index" @click="sendItem(index)" class="y-modal-item">
					<uni-icon v-if="i.icon" :type="i.icon"></uni-icon>{{i.title}}
				</view>
				<view class="y-modal-item" @click="showBefore=false">取消</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default {
		components: {
			uniIcon
		},
		props: {
			list: Array,
			show: Boolean
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
