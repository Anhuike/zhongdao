<template>
	<view>
		<view class="flex_between wrpo_center title_s " style="">
			<view class="back-left flex_center" @click="back()">
			</view>
			<view class="middle_text">
				{{header.title}}
			</view>
			<view class=" flex_center more-right">
				<!-- icon-right -->
			</view>
		</view>

		<view class="white">
			<!-- <swiper class="swiper" style="height: 240px;" :indicator-dots="indicatorDots" indicator-color="rgb(90,88,88,.4)"
			 indicator-active-color="#fff" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="item in jieduImg" :key="item.src"> -->
			<view class="swiper-item uni-bg-red">
				<image :src="header.thumb" mode="" style="height: 240px ;width:100vw"></image>
			</view>
			<!-- 	</swiper-item>
			</swiper> -->

			<view class="padding tiny_text two_color" style="border-bottom:15upx solid #F8F8F8">
				简介：{{header.content}}
			</view>
		</view>
		<view class="padding-left padding-top padding-right">
			<view class="flex_between ">
				<view class="flex_between padding-bottom" style="width: 70%; display: flex;">
					<view class="tiny_text two_color wrpo_center  rltive margin-right" v-for="item in alldata" :key="item.list_id"
					 @tap="active_item(item)" :style="item.list_id==active_id?'font-size:36upx;font-weight: bold;':''">
						<text>{{item.title}}</text>
						<image :src="active_btn" class="active_st" mode="" v-show="item.list_id==active_id"></image>
					</view>
				</view>
				<view class="" tyle="flex:1;display: flex;justify-content: flex-end;">
					<view class="icon-Menu flex_center">
					</view>
				</view>
			</view>

			<view class="white" v-show="active_id==1">
				<The_article :article='data_one'></The_article>
			</view>
			<view class="padding-top-20" v-show="active_id==2">
				<wuli :wuil_list="data_two" :index_s="index_s"> </wuli>
			</view>
			<view class="white" v-show="active_id==3">
				<interaction :post_list="data_three"  type='xianshang' 		></interaction>
			</view>
			<view class="white" v-show="active_id==4">
				<The_article :article='data_four'></The_article>
			</view>
		</view>
	</view>
</template>

<script>
	import "../../style/com_icon.css";
	// import activity from '../../component/post/activity.vue'
	import The_article from '../../component/post/The_article.vue'
	import interaction from '../../component/post/interaction.vue'
	// import recommend from '../../component/post/recommend.vue'
	// import video_list from '../../component/post/video_list.vue'
	import api from '../../api/api.js';
	import wuli from ' ../../component/wuli_article/wuli.vue'

	export default {
		components: {
			The_article,
			// activity,
			interaction,
			// recommend,
			// video_list,
			wuli

		},
		data() {
			return {
			
				index_s: 1,
				wuil_list: 10,
				// 
				post_: [1, 2, 3, 4],
				article: [1, 2, 3, 4, 5, 6, ],
				// 
				active_id: 1,
				// 
				// indicatorDots: true,
				// autoplay: true,
				// interval: 2000,
				// duration: 500,
				// 
				active_btn: require('../../static/imgs/icoImg/active_btn.png'),
				//	
				jieduImg: [{
						src: require('../../static/imgs/Graph/zhongdao.png'),
					},
					{
						src: require('../../static/imgs/Graph/zhuanjia.png'),
					},
					{
						src: require('../../static/imgs/Graph/zhengshang.png'),
					},

				],
				// 
				// ceonts: [{
				// 	title: "文章",
				// 	id: 0
				// }, {
				// 	title: "视频",
				// 	id: 1
				// }, {
				// 	title: "互动",
				// 	id: 2
				// }, {
				// 	title: "帮助中心",
				// 	id: 3
				// }, ],
				// header  头部数据
				header: [],
				// 分类数据
				alldata: [],
				data_one: [],
				data_two: [],
				data_three: [],
				data_four: [],
			}
		},
		onLoad() {
			api.online_platform({
				'page': 1,
				'list_id': 0
			}, (res) => {
				console.log(res)
				if (res.error == 0)
					this.header = res.data.header
				console.log(this.header)
				
				this.alldata = res.data.alldata
				this.active_id = res.data.alldata[0].list_id
				this.data_one = res.data.alldata[0].data
				this.data_two = res.data.alldata[1].data
				this.data_three = res.data.alldata[2].data
				this.data_four = res.data.alldata[3].data

			})

		},
		onShow() {
			console.log(this)	
		},
		//跳转路径

		
		
		methods: {
			active_item(vle) {
				console.log(vle)
				this.active_id = vle.list_id
			},
			tab(news_id) {
			
				// wx.navigateTo({
				// 	url: '../postdetails/postdetails?news_id=' + news_id,
				// })
				var url = 'https://www.zhongdaogy.com/zdgyindex/index.php#/pages/postdetails/postdetails?news_id='+ news_id;
				// #ifdef H5
				window.location.href = url;
				// #endif
							
				// #ifdef MP-WEIXIN
				wx.navigateTo({
					url: '../outline/outline?url=' + url,
				})
				// #endif
				
			},
			hudongs(item) {
				var url = 'https://www.zhongdaogy.com/life/lifes/pages/postdetails/postdetails?life_id='+ item.life_id;
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
				console.log('Signed')
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
		color: #fff;
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

	.more-right::before {
		content: '\e606';
		font-family: 'iconfont';
		text-align: center;
	}

	/*  */
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
