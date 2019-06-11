<template>
	<view>
		<view v-if="update">
			<view class="edition-box">
				<view>已有新版本： {{info.versionname}}</view>
				<view v-if="doUpdate">
					<view><progress :percent="speed" activeColor="#4cd964" show-info stroke-width="3" /></view>
					<view>{{updateLength}}M / {{allLength}}M</view>
				</view>
				<view><button class="y-button" :disabled="doUpdate" @click="sendUpdate">立即更新</button></view>
			</view>
			<view class="edition-box edition-content-box">
				<view class="edition-content-title">{{info.versionname}}主要更新</view>
				<view v-html="info.content">{{content}}</view>
			</view>
		</view>
		<view v-else class="edition-box">
			<view>
				<image :src="logo" class="logo"></image>
			</view>
			<view>已是最新版本</view>
		</view>
	</view>
	
</template>

<script>
	import logo from '@/static/image/logo.png'
	import api from '@/utils/api/tabBar/index.js'
	export default {
		data () {
			return {
				logo,
				description: '',
				update: false,
				content: '',
				info: {},
				doUpdate: false,
				speed: 0,
				updateLength: 0,
				allLength: 0
			}
		},
		onLoad () {
			const _this = this
			uni.getSystemInfo({
				success (res) {
					_this.description = res.platform
					_this.getData()
				},
				fail (res) {
					uni.showToast({
						title: '无法获取设备信息'
					})
				}
			})
		},
		methods: {
			async getData () {
				const res = await api.version({ description: this.description, versionname: this.$version })
				if (res.success) {
					res.data.update ? this.update = true : this.update = false
					if (res.data.update) {
						this.info = res.data.versions[0]
					}
				}
			},
			sendUpdate () {
				const _this = this
				if (this.description === 'ios') {
					plus.runtime.openURL(_this.info.downloadurl)
				} else if (this.description === 'android') {
					this.AndroidCheckUpdate()
				}
			},
			AndroidCheckUpdate () {
                var _this = this
				const downloadTask = uni.downloadFile({
					url: _this.info.downloadurl,
					success (res) {
						if (res.statusCode === 200) {
							plus.runtime.install(res.tempFilePath,{},function(){
							},function(error){
								uni.showToast({
									title: '安装失败',
									mask: false,
									duration: 1500
								})
							})
						}
					},
					fail () {
						uni.showToast({
							title: '下载失败',
							icon: 'none'
						})
						_this.doUpdate = false
					}
				})
				downloadTask.onProgressUpdate((res) => {
					_this.doUpdate = true
					_this.speed = res.progress,
					_this.updateLength = (res.totalBytesWritten/1024/1024).toFixed(2)
					_this.allLength = (res.totalBytesExpectedToWrite/1024/1024).toFixed(2)
					if (res.progress === 100) {
						_this.doUpdate = false
					}
				})
            }
		}
	}
</script>

<style lang="scss" scoped>
	.logo {
		width: 200upx;
		height: 200upx;
		border-radius: 100%;
		margin-bottom: 20upx;
		border: solid 1px #7A7B81;
	}
	.edition-box {
		background: $uni-box-color;
		border: solid 1px #7A7B81;
		padding: 50upx 50upx;
		margin-bottom: 50upx;
		text-align: center;
		.y-button {
			margin-top: 30upx;
		}
	}
	.edition-content-box {
		text-align: left;
	}
	.edition-content-title {
		font-weight: bold;
		color: $uni-router-color;
	}
	.edition-content {
		display: flex;
		flex-direction: column;
	}
</style>
