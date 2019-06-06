<template>
	<view class="y-content">
		<button @click="setInfo()"> 哈哈 </button>
		<y-modal :show="sexModalShow" :confirm="confirm" boxType="confirm" @confirm="sexModalShow=false" @hideModal="sexModalShow=false" @getItem="getSex"></y-modal>
	</view>
</template>

<script>
	import api from '@/utils/api/tabBar/index.js'
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import yModal from '@/components/uni-popup/uni-popup.vue'

	export default {
		components: {
			uniIcon,
			yModal
		},
		data () {
			return {
				sexModalShow: false,
				sexList: [
					{ title: '男', type: 1 },
					{ title: '女', type: 2 }
				],
				confirm: {
					title: '测试标题',
					content: '测试内容'
				}
			}
		},
		onShow () {
		},
		methods: {
			setInfo () {
				this.sexModalShow = true
			},
			getSex (e) {
				this.sendSex(e.type)
			},
			async sendSex(e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.y-content {
		padding: 10upx 20upx 0;
		overflow: hidden;
		background: $uni-box-color;
	}
	.y-list {
		display: flex;
		align-items: center;
		color: #ccc;
		padding: 30upx 20upx;
		justify-content: space-between;
		border-bottom: 1px solid $uni-box-line;
		.y-list-left {
			font-size: 32upx;
		}
		.y-list-right {
			font-size: 32upx;
			display: flex;
			align-items: center;
		}
	}
	.y-headImage {
		width: 100upx;
		height: 100upx;
		border-radius: 100%;
		border: solid 1px $uni-router-color;
	}
	.uni-icon {
		margin-left: 20upx;
	}
</style>
