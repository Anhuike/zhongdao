<template>
	<view class="">
		<view class="" style="padding-top: 44px;">

		</view>
		<view class="flex_between wrpo_center title_s">
			<view class=" back-left" @tap="back()">
				<!-- 完成 -->
			</view>
			<view class="middle_text">
				<!-- {{order.orderTitle}} -->
				项目管理
			</view>
			<view class="middle_text">
			</view>
		</view>
		<!--  -->

		<view class="margin-top-10  padding-left padding-right" style="background: #fff;">
			<view class="padding-top padding-bottom item_list" :style="list.length!=index?'border-bottom:1px solid #F0F0F0;':''"
			 v-for="(item,index) in list" :key="index" @tap="item_tap(item)">
				<view class="text_center">
					<image :src="item.icon" mode="" class="margin-right" style="width: 20px;height: 20px;"></image> {{item.title}}
				</view>
				<!-- <view class="">
				</view> -->
				<view class="more-right">

				</view>

			</view>
		</view>

	</view>
</template>

<script>
	import "../../style/com_icon.css";
	import api from '../../api/api.js';
	export default {
		data() {
			return {
				xiaolian: require('../../static/imgs/icoImg/xiaolian.png'),
				list: []
			}
		},
		onLoad() {
			var that = this
			api.manage({}, function(res) {
				if (res.error == 0) {
					that.list = res.data.data
					console.log(that.list)
				}
				// that.list=res.data
			})

		},
		methods: {

			item_tap(item) {

				var url = item.url;

				// #ifdef H5
				window.location.href = url;
				// #endif

				// #ifdef MP-WEIXIN
				wx.navigateTo({
					url: '../outline/outline?url=' + url,
				})
				// #endif
			},

			back() {

				uni.navigateBack({
					delta: 1
				})
			},
		}

	}
</script>
<!-- 项目管理的导航列表：
接口路径：https://www.zhongdaogy.com/api.php?API=projects/order/list_nav
参数: 无
返回：data1（上半部分导航）, data2（下半部分导航）【title标题，icon图标，url路径】
说明：url到时候再对，现在传的是空值 -->
<style>
	page {
		background: rgb(240, 240, 240);
	}


	.item_list {
		display: flex;
		justify-content: space-between;
		font-size: 16px;
	}

	.text_center {
		display: flex;
		align-items: center;

	}

	/*  */
	.title_s {
		background-color: #fff;
		height: 44px;
		width: 100vw;
		position: fixed;
		top: 0;
		z-index: 99999;
		/* color: #fff; */
		padding: 0px 10px 3px;

		box-sizing: border-box;
	}

	.status_bar {
		/* height: var(--status-bar-height); */
		width: 100%;
		height: var(--status-bar-height);
	}

	/*  */
	.middle_text {
		/* min-width: 2em; */
		height: 1.5em;
		font-size: 16px;
		/* font-weight: 600; */
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		align-items: center;
	}

	.back-left {
		/* width: 20px;
		height: 20px; */
		font-size: 20px;
		font-family: 'iconfont';
		text-decoration: none;
		text-align: center;
		vertical-align: top;
	}

	.back-left::before {
		content: '\e611';
		font-family: 'iconfont';
		text-align: center;
	}

	.more-right {
		/* width: 20px;
		height: 20px; */
		font-size: 20px;
		font-family: 'iconfont';
		text-decoration: none;
		text-align: center;
	}

	.more-right::before {
		content: '\e61c';
		font-family: 'iconfont';
		text-align: center;
	}
</style>
