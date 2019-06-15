<template>
	<view>
		<view class="banner">
			<image :src="partner" mode="widthFix" class="banner-image"></image>
		</view>
		<view class="content">
			<view class="search">
				<view class="uni-title uni-common-pl">地区选择</view>
				<view class="uni-list">
				    <view class="uni-list-cell">
				        <view class="uni-list-cell-left">
				            当前选择
				        </view>
				        <view class="uni-list-cell-db">
				            <picker @change="bindPickerChange" :value="index" :range="dataList">
				                <view class="uni-input">{{dataList[index]}}</view>
				            </picker>
				        </view>
				    </view>
				</view>
			</view>
			<view class="button">
				<button class="y-button" @click="partnerSend">我要合伙</button>
			</view>
		</view>
		<view class="tips">
			<view class="title">
				合伙人规则
				<view class="title-tips">(请仔细阅读)</view>
			</view>
			<view v-for="(i, index) in docx" :key="`docx${index}`">
			    <view class="docx-title">{{i.title}}</view>
			    <view>
					<view v-for="(item, itemIndex) in i.item" :key="itemIndex" class="docx-item">
						{{itemIndex + 1}}. <view v-html="item.content" class="content-text"></view>
					</view>
			    </view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import api from '@/utils/api/tabBar/index.js'
	import partner from '@/static/image/partnerBanner.png'
	export default {
		components: {
			uniIcon
		},
		data () {
			return {
				partner,
				optionShow: false,
				index: 0,
				sendId: '',
				valueList: [],
				dataList: [],
				docx: [
					{
					  title: '第一章 总则',
					  item: [
						{ content: '为了维护公司和合伙人利益，特制定本规则，公司股东及合伙人必须严格遵守。本规则中所涉及的集米宝用户均为实名认证用户。' },
						{ content: '合伙人需年满十八周岁，并具有完全民事权利能力和完全民事行为能力的自然人。' },
						{ content: '合伙人需遵守公司相关的规章制度，协助公司搞好市场，不得扰乱市场有序经营。' },
						{ content: '合伙人之间的竞争冲突，以公司裁定为准。' },
						{ content: '合伙人不得参与经营与本公司或其他合伙人竞争的业务。' },
						{ content: '合伙人未经公司同意而转让其服务权益，所产生的后果自行负责。' },
						{ content: '双方约定合伙期限到期的，可选择续期或者退伙。' },
						{ content: '因违反合作机制契约精神，借用公司名义进行虚假宣传以谋取不正当利益的，给公司造成重大影响的，将追究合伙人的相关责任后并进行退伙处理。' }
					  ]
					},
					{
					  title: '第二章 细则',
					  item: [
						{ content: '合伙人是根据省市县/区的层级划分来确定的，每个省市县/区有且只有一位。层级等级越高，合伙人的权益越大。' },
						{ content: '合伙人分红是根据层级划分以及合伙人所处的层级以下实名认证账户进行定义的。合伙人层级等级越高，该层级以下用户人数越多，所得分红越多。合伙人所得分红=<span style="color: #f68728;">合伙人所处层级以下的其他所有已实名会员</span>每日定时赠送米粒总数x百分比<span style="color: #f68728;">（省/直辖市/自治区合伙人为1%，地级市/直辖市的区合伙人为3%，县/地级市的区合伙人为5%）</span> (具体情况根据市场进行变更，可在系统消息中查看)' }
					  ]
					}
				]
			}
		},
		onShow () {
			this.getData()
		},
		onNavigationBarButtonTap (e) {
			uni.navigateTo({
				url: './partner-team'
			})
		},
		methods: {
			async getData () {
				const res = await api.partner()
				if (res.success) {
					this.valueList = res.data
					this.sendId = res.data[this.index].plocalnumber
					let data = res.data.map(element => {
						return `${element.partnername} - 时间${element.validtime}天 - 价格${element.partnerprice}kg`
					})
					this.dataList = data
					
				}
			},
			 bindPickerChange: function(e) {
				this.index = e.target.value
				this.sendId = this.valueList[parseInt(e.target.value)].plocalnumber
			},
			async partnerSend () {
				const res = await api.partnerAdd({ plocalnumber: this.sendId })
				if (res.success) {
					uni.showToast({
						title: '申请成功！'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.banner-image {
		width: 100vw;
	}
	.content {
		padding: 50upx 0;
		background: $uni-box-color;
	}
	.docx-item {
		display: flex;
		width: 100%;
	}
	.button {
		width: 60%;
		margin: 30upx auto;
	}
	.y-button {
		background: #f06292;
		border-radius: 40upx;
		border: none;
		color: #fff;
	}
	.tips {
		padding: 20upx 30upx;
		.title {
			text-align: center;
			font-weight: bold;
		}
		.title-tips {
			font-size: $uni-font-size-sm;
		}
		.content-text {
			font-size: $uni-font-size-base;
		}
	}
</style>
