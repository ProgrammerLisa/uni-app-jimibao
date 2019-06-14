<template>
	<view class="y-tabs" :style="'padding-top:'+paddingTop+';z-index:'+zIndex">
		<view class="tabs-container" :style="'background:'+tabColor+';position:'+position+';top:'+top">
			<view class="tabs-box">
				<view class="tabs" @click="changeTabs(tabIndex)" :style="sub===tabIndex?'color:'+activeTextColor+';background:'+activeBgColor+'':'background:'+tabColor+';color:'+textColor" v-for="(tab, tabIndex) in list" :key="tabIndex">
					<view>{{tab.title}}</view>
				</view>
			</view>
			<view class="tabs-line" :style="'background:'+lineColor+';width:'+(1/list.length)*100+'%;left:'+(1/list.length)*100*sub+'%'"></view>
		</view>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			tabList: Array,
			tabColor: {
				type: String,
				default: '#fff'
			},
			textColor: {
				type: String,
				default: '#333'
			},
			lineColor: {
				type: String,
				default: 'red'
			},
			activeTextColor: {
				type: String,
				default: 'red'
			},
			activeBgColor: {
				type: String,
				default: '#777'
			},
			position: {
				type: String,
				default: 'relative'
			},
			top: {
				type: String,
				default: '0'
			},
			paddingTop: {
				type: String,
				default: '0'
			},
			zIndex: {
				type: Number,
				default: 99
			},
			active: Number
		},
		data () {
			return {
				sub: 0,
				list: this.tabList
			}
		},
		onLoad () {
			this.sub = this.active
		},
		watch: {
			active (val) {
				this.sub = val
			},
			tabList (val) {
				this.list = val
			}
		},
		methods: {
			changeTabs (e) {
				this.$emit('changeTabs', e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.y-tabs {
		border-top: 1px solid transparent;
		position: relative;
	}
	.tabs-container {
		position: relative;
		z-index: 999;
	}
	.tabs-box {
		width: 100vw;
		display: flex;
		.tabs {
			flex: 1;
			text-align: center;
			padding: 20upx 0;
			overflow: hidden;
			transition: .5s;
		}
	}
	.tabs-line {
		position: absolute;
		bottom: 0;
		height: 4upx;
		transition: .5s;
	}
	
</style>
