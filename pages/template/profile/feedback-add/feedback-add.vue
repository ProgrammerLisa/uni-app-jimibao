<template>
	<view class="y-content">
		<form @submit="formSubmit">
			<view class="uni-form-item uni-column">
		        <view class="title">姓名</view>
		        <input class="uni-input" :value="form.addressee" placeholder="最少2个字,最多15个字" name="addressee" />
		    </view>
			<view class="uni-form-item uni-column">
			    <view class="title">手机号</view>
			    <input class="uni-input" :value="form.phone" placeholder="请输入11位手机号码" type="number" name="phone" />
			</view>
			<view class="uni-form-item uni-column">
			    <view class="title">身份证</view>
			    <input class="uni-input" :value="form.address" placeholder="请输入真实身份证号码" name="address" />
			</view>
			<view class="uni-form-item uni-column">
			    <view class="title">问题类型</view>
			    <view @click="showMulLinkageThreePicker"><input class="uni-input" :value="form.location" placeholder="点击选择问题类型" name="location" disabled /></view>
			</view>
			<view class="uni-item-flex">
				<view class="uni-item-image">
					+
				</view>
				<textarea class="uni-item-text" auto-height placeholder="请用文字描述您在使用集米宝APP中遇到的问题, 我们一定以最效率的方式修复, 祝您生活愉快" />	
			</view>
			<view class="uni-btn-v">
			    <button formType="submit" class="y-button">确定</button>
			</view>
			<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
			 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
		</form>
	</view>
</template>

<script>
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	export default {
		components: {
			mpvueCityPicker
		},
		data () {
			return {
				form: {},
				themeColor: '#007AFF',
				cityPickerValueDefault: [0, 0, 1]
			}
		}
	}
</script>

<style scoped lang="scss">
	.mpvue-picker-view {
		background: #000;
	}
	.y-content {
		padding: 0;
		background: $uni-box-color;
		margin-top: 20upx;
		padding: 0 20upx;
		input {
			background: $uni-input-bg-color;
			border: solid 1upx $uni-input-border-color;
			border-radius: 10upx;
			margin: 0 20upx;
		}
		.forget-box {
			display: flex;
			justify-content: space-between;
			padding: 20upx;
			.uni-icon {
				color: #555;
			}
			.uni-active {
				color: #f7f7f7;
			}
			.forgetPwd {
				color: $uni-router-color;
			}
		}
		.y-button {
			margin: 120upx 20upx 20upx;
		}
		.set-default {
			padding: 20upx;
		}
		.uni-item-flex {
			display: flex;
			align-items: center;
			margin-top: 20upx;
			.uni-item-image {
				flex: 1;
				width: 150upx;
				height: 160upx;
				line-height: 150upx;
				overflow: hidden;
				border: 1px dashed $uni-text-color;
				text-align: center;
				margin-right: 10upx;
			}
			.uni-item-text {
				flex: 2;
				border: 1px solid #63646B;
				min-height: 120upx;
				padding: 20upx;
			}
		}
	}
</style>
