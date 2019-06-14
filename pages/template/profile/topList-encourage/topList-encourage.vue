<template>
	<view>
		<view class="y-top"><text class="y-top-title">剩余数量： <text class="y-top-count">{{info.encourage}}</text> kg</text></view>
		<view class="y-input-box">
			<view class="y-label">激活数量(必须为整数)</view>
			<input v-model="count" type="number" maxlength="3" />
			<button class="y-button" @click="submit">激活</button>
		</view>
		<view class="y-docx-box">
			<view class="y-docx-title">注意事项</view>
			<view class="y-docx-content">
			  <text>1. 参与活动者必须为集米宝APP实名认证用户。</text>
			</view>
			<view class="y-docx-content">
			  <text>2. 新用户注册之后立即赠送1000kg鼓励金，但是鼓励金必须激活才可以使用。</text>
			</view>
			<view class="y-docx-content">
			  <text>3. 激活公式：（收其他会员的米粒-出给其他会员的米粒）x50%=<text style="color: #ffe0b2;">全部可激活</text>鼓励金数，每次激活鼓励金数可以选择全部或部分激活，<text style="color: #ffe0b2;">直到1000kg米粒全部激活完毕</text>。</text>
			</view>
			<view class="y-docx-content">
			    <text>4. 注意：</text>
			    <view class="y-docx-item">
					<view class="y-item">
					    <text>(1). 用户第一次激活，其收其他会员的米粒与出给其他会员的米粒均为用户<text style="color: #ffe0b2;">注册实名后</text>至激活这段时间内所有的交换数额的总值。</text>
					</view>
			    </view>
			    <view class="y-docx-item">
					<view class="y-item">
					    <text>(2). <text style="color: #ffe0b2;">当用户进行非第一次激活鼓励金操作时，激活公式计算时间节点将从上一次激活操作时间开始算起。</text> </text>
					</view>
			    </view>
			    <view class="y-docx-item">
			     	<view class="y-item">
			     	    <text>(3). 用户每次激活的奖励金数必须小于或等于平台赠送的1000kg鼓励金</text>
			     	</view>
			    </view>
			  </view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/utils/api/tabBar/index.js'
	export default {
		data () {
			return {
				info: {},
				count: ''
			}
		},
		onShow () {
			this.getData()
		},
		methods: {
			async getData () {
				const res = await api.AccountBalance()
				if (res.success) {
					const _this = this
					this.info = res.data
				}
			},
			submit () {
				if (!/^[123456789]\d{0,3}$/.test(this.count)) {
					uni.showToast({
						title: '请输入大于0的整数',
						icon: 'none'
					})
				} else {
					this.sendSubmit()
				}
			},
			async sendSubmit () {
				const res = await api.encourage({ number: this.count })
				if (res.success) {
					uni.showToast({
						title: '激活成功'
					})
					this.count = ''
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.y-top {
		text-align: center;
		padding: 50upx 0;
		.y-top-title {
			display: inline-block;
			padding: 10upx 20upx;
			border: solid 1px $uni-router-color;
			border-radius: 6upx;
		}
		.y-top-count {
			color: $uni-router-color;
		}
	}
	.y-input-box {
		text-align: center;
		padding: 0 20upx;
		input {
			margin: 20upx;
			border-bottom: 1px solid $uni-box-line-inverse;
		}
		input:focus{
			border-color: #fff;
		}
		.y-button {
			margin: 50upx 20upx;
		}
	}
	.y-docx-box {
        margin-top: 20upx;
		padding: 20upx;
		background: $uni-box-color;
		.y-docx-title {
			font-weight: bold;
			color: $uni-router-color;
		}
	}
	.y-docx-content {
        margin-top: 20upx;
		padding: 0 20upx;
        line-height: 20px;
        .y-docx-item {
          padding: 0 24upx;
          .y-item {
            margin-top: 20upx;
          }
        }
    }
</style>
