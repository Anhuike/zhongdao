<template>
	<view>

		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>

		<view class="flex_between wrpo_center title_s" style="background: #F92727;">
			<view class="back-left flex_center" @click="back()">
			</view>
			<view class="middle_text">
				去互动
			</view>
			<view class="more-right flex_center">

			</view>
		</view>

		<view class="" style="box-sizing: border-box;width: 100vw;height: 100%;margin-top:44px ;">
			<view class="flex_between padding" style="border-bottom:1upx solid #eee ;padding-bottom:0;">
				<view class="tiny_text title_color " v-for="item in first" :key="item.id" style="line-height: 40upx; border-bottom:4upx solid #f92727 ;margin-bottom: -1upx;">
					{{item.title}}
				</view>
			</view>
			<view class="padding">
				<view class="">
					<view class="">
						水果蔬菜
					</view>
				</view>
				<view class="">
					<textarea value="" placeholder="" />
					</view>
				<view class="">
					<view class="">
						增添照片
					</view>
				</view>
				<view class="">
					<view class="">
						选择标签
					</view>
					<view class="">
						公益产品
					</view>
				</view>
				<view class="">
					帖子置顶
					<span class="">
						（置顶后帖子会优先展示在前面）
					</span>
				</view>
				
				
				<view class="padding-bottom-20">
					<view class="flex_between padding-bottom-20 padding-top-20" @tap="select_cost(0)" style="line-height: 48upx;border-bottom:1upx solid #EEEEEE ">
						<view class=" x_color tiny_text">
							不置顶
						</view>
						<view class="">
							   <label class="radio"><radio  :checked="checked_id == 0" /></label>
						</view>
					</view>
					<view class="flex_between x_color tiny_text padding-bottom-20 padding-top-20" style="line-height: 48upx;border-bottom:1upx solid #EEEEEE ;" v-for="item in Stic" :key="item.id" @tap="select_cost(item.id)"> 
						<view class="">
							时间<span style="color:red">{{item.time}}天</span>
						</view>
						<view class="">
							费用<span style="color: #F7AA16">{{item.cost}}金币</span>
						</view>
						<view class="">
							   <label class="radio"><radio  :checked="checked_id==item.id" /></label>
						</view>
					</view>
				</view>
				
				
				<!--  -->
			</view>
			
			
			<!--  -->
		</view>

<!--  -->
	</view>
</template>

<script>
	import "../../style/com_icon.css";
	import api from '../../api/api.js';

	export default {
		components: {


		},
		data() {
			return {
				checked_id:0,
				first: [{
						title: '农夫产品',
						id: 0,
					},
					{
						title: '电子设备',
						id: 1
					}, {
							title: '衣服包包',
						id: 2
					},
				],
				// active_btn: require('../../static/imgs/icoImg/active_btn.png'),
				Stic:[
					
					{
						time:2,
						cost:2,
						id:1,
					},
					{
						time:3,
						cost:3,
						id:2,
					},
					{
						time:4,
						cost:4,
						id:3,
					},],

			}
		},

		onLoad(options) {

		},
		methods: {

			select_cost(id){
				console.log(id)
				this.checked_id=id
				// uni.redirectTo({
				// 	url: 'https://www.zhongdaogy.com/life/lifes/pages/posttie/index?from=life&cate_id=97'
				// });
				// 去互动详情页
				var url = 'https://www.zhongdaogy.com/life/lifes/pages/posttie/index?from=life&cate_id=97';
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

<style>
	
	.title_s {
			height: 44px;
			width: 100vw;
			position: fixed;
			top: 0;
			z-index: 99999;
			color:  #fff;
			padding: 0px 10px 3px;
	
			box-sizing: border-box;
		}
	
		.status_bar {
			/* height: var(--status-bar-height); */
			width: 100%;
			height: var(--status-bar-height);
		}
	
		.middle_text {
			font-size: 16px;
			font-weight: 600;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			align-items: center;
		}
	
		.back-left {
			width: 20px;
			height: 20px;
			font-size: 20px;
			font-family: 'iconfont';
			text-decoration: none;
			text-align: center;
		}
	
		.back-left::before {
			content: '\e611';
			font-family: 'iconfont';
			text-align: center;
		}
	
		.more-right {
			width: 20px;
			height: 20px;
			font-size: 20px;
			font-family: 'iconfont';
			text-decoration: none;
			text-align: center;
		}
	/* .more-right::before {
		content: '\e606';
		font-family: 'iconfont';
		text-align: center;
	}
 */
	.icon-Menu {
		width: 40upx;
		height: 40px;
		font-size: 18px;
		font-family: 'iconfont';
		/* text-decoration: none;
		text-align: center; */
	}

	.icon-Menu::before {

		content: '\e60c';
		font-family: 'iconfont';
		text-align: center;
	}

	.rltive {
		position: relative;
		height: 50upx;
		align-items: flex-end;
	}

	.active_st {
		height: 10upx;
		width: 100%;
		background: #red;
		position: absolute;
		bottom: -20upx;
	}
</style>
