<template>
	<view>
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>

		<view class="flex_between wrpo_center title_s" style="">
			<view class="back-left flex_center" @click="back()">
			</view>
			<view class="middle_text">
				{{top_data.title}}
			</view>
			<view class="more-right flex_center">

			</view>
		</view>
		<view class="white">
			<!-- <swiper class="swiper" style="height: 240px;" :indicator-dots="indicatorDots" indicator-color="rgb(90,88,88,.4)"
			 indicator-active-color="#fff" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="item in jieduImg" :key="item.src"> -->
			<view class="swiper-item " style="height:240px ;width:100vw">
				<image :src="top_data.thumb" mode="" style="height:240px ;width:100vw"></image>
			</view>
			<!-- 	</swiper-item>
			</swiper> -->

			<view class="padding tiny_text two_color" style="border-bottom:15upx solid #F8F8F8">
				简介：{{top_data.content}}
			</view>
			<!-- 	<view class="padding-left padding-top padding-right"> -->
			<!-- 			<view class="flex_between ">
					<view class="flex_between padding-bottom" style="width: 70%; display: flex;">
						<view class="tiny_text two_color wrpo_center  rltive margin-right" v-for="item in ceonts" :key="item.list_id"
						 @tap="active_item(item.list_id)" :style="item.list_id==active_id?'font-size:36upx;font-weight: bold;':''">
							<text>{{item.title}}</text>
							<image :src="active_btn" class="active_st" mode="" v-show="item.list_id==active_id"></image>
						</view>
					</view>
					<view class="" tyle="flex:1;display: flex;justify-content: flex-end;">
						<view class="icon-Menu flex_center">
						</view>
					</view> -->

			<!-- </view> -->
			<view class="padding ">
				<view class="flex_between " style="flex-wrap: wrap;">
					<view class="flex_center margin-top" :style="ceonts.length==8?'flex:1 1 25%':'flex:1 1 33%'" v-for="i in ceonts"
					 :key="i.cate_id" @tap="active_item(i.cate_id)">
						<image :src="i.icon" mode="" style="height: 100upx;width: 100upx;border-radius:50% ;"></image>
						<view class="tiny_text padding-top-10" style="text-align: center;">
							{{i.title}}
						</view>
					</view>
				</view>
			</view>
			<!-- 第一块 -->
			<view class="padding">
				<!-- <view class="white" v-show="active_id==ceonts[0].cate_id">
					<view class="middle_text">
						{{ceonts[0].title}}
					</view>
					<recommend :article='ceonts[0].list'></recommend>
				</view> -->
				<!-- 第二块 -->
				<!-- 	<view class="white" v-show="active_id==ceonts[1].cate_id">
					<view class="middle_text">
						{{ceonts[1].title}}
					</view>
					<The_article :article='ceonts[1].list'></The_article>
				</view> -->
				<!-- 第三块 -->
				<!-- <view class="white " v-show="active_id==ceonts[2].cate_id">
					<view class="middle_text">
						{{ceonts[2].title}}
					</view>
					<video_list :video_list='ceonts[2].list'></video_list>
				</view> -->
				<!-- 会议 -->
				<view class="" type_data="meeting">
					<view class="white" v-show="'meeting'==active_content.cate" v-for="i in active_content.list" :key='i.id'>
						<!-- 第四块 -->
						<view class="middle_text two_color padding-bottom">
							{{i.title}}
						</view>
						<meeting :wuil_list='i.list' :type_data='i.id'></meeting>
						<view class="" v-show="show_info">
							<Info_Submit></Info_Submit>
						</view>

					</view>
				</view>

				<!-- hudong -->
				<view class="white" v-show="'life'==active_content.cate">
					<!-- 第四块 -->
					<view class="middle_text">
						{{active_content.title}}
					</view>
					<interaction :post_list="active_content.list" type="hudong" :outline='outline'></interaction>
				</view>

				<!-- 第五块 -->
				<view class="white" v-show="'community'==active_content.cate">
					<view class="middle_text">
						{{active_content.title}}
					</view>
					<activity :article='active_content.list' :outline="outline"></activity>
				</view>
				<!-- 其他几块 -->
				<view class="white" v-show="'news'==active_content.cate">
					<view class="middle_text">
						{{active_content.title}}
					</view>
					<ziyuan :highp="active_content.list"></ziyuan>
				</view>
			</view>
		</view>
	</view>
	<!--  -->
	</view>
</template>

<script>
	import Info_Submit from '../../component/meeting/Info_Submit.vue' //预约信息
	import meeting from '../../component/meeting/meeting.vue'
	import "../../style/com_icon.css";
	import activity from '../../component/post/activity.vue'
	import The_article from '../../component/post/The_article.vue'
	import interaction from '../../component/post/interaction.vue'
	// import recommend from '../../component/post/recommend.vue'
	// import video_list from '../../component/post/video_list.vue'
	import api from '../../api/api.js';
	import ziyuan from '../../component/wuli_article/zuyuan.vue';
	export default {
		components: {
			The_article,
			activity,
			interaction,
			// recommend,
			// video_list,
			ziyuan,
			meeting,
			Info_Submit,

		},
		data() {
			return {
				activity_id: '',
				post_id: '',
				name: '',
				top_data: '',
				post_: [1, 2, 3, 4],
				article: [1, 2, 3, 4, 5, 6, ],
				tab_huodong: require('../../static/imgs/icoImg/tab_huodong.png'),
				// tab_hudong:require('../../static/imgs/icoImg/tab_hudong.png'),
				// 互动
				// exe: require('../../static/imgs/icoImg/hd_exe.png'),
				// xin: require('../../static/imgs/icoImg/hd_xin.png'),
				// pl: require('../../static/imgs/icoImg/hd_pl.png'),
				// 
				// 
				active_btn: require('../../static/imgs/icoImg/active_btn.png'),
				jieduImg: [{
					src: require('../../static/imgs/Graph/zhongdao.png')
				}, {
					src: require('../../static/imgs/Graph/zhuanjia.png')
				}, {
					src: require('../../static/imgs/Graph/zhengshang.png')
				}],

				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				// 
				title_name: '军民婚恋',

				candan: '\xe606',
				ceonts: [{
					title: "推荐",
					id: 0
				}, {
					title: "文章",
					id: 1
				}, {
					title: "视频",
					id: 2
				}, {
					title: "互动",
					id: 3
				}, {
					title: "活动",
					id: 4
				}, ],
				// active_id: 5, //选中的分类
				outline: '',
				//内容
				active_content: '',
				// 
				zan: require('../../static/imgs/icoImg/shallow_zan.png'),
				zan1: require('../../static/imgs/zan.png'),
				pinlun: require('../../static/imgs/icoImg/shallow_pinglun.png'),
				show_info: false,
			}
		},
		onNavigationBarButtonTap() {
			console.log("点击了自定义按钮");
		},
		onLoad(options) {
			var that = this

			this.id = options.id
			// list_id列表分类id，全部显示0、文章1、视频2、互动3、合作交流4
			api.xm_centre({
				'page': 1,
				'list_id': 0,
				'center_id': options.id,
			}, function(res) {
				console.log(res)
				if (res.error == '0') {
					that.outline = res.data.outline
					that.post_id = res.data.post_id
					that.top_data = res.data.header
					that.ceonts = res.data.nav
					that.active_content = res.data.nav[0]
				}
			})
		},
		methods: {
			//预约
			subscribe() {
				this.show_info =!this.show_info
			},
			// 标题
			active_item(vle) {
				console.log(vle)
				this.active_id = vle
				for (let i = 0; i < this.ceonts.length; i++) {
					if (vle == this.ceonts[i].cate_id) {
						this.active_content = this.ceonts[i]
						console.log(this.ceonts)
					}
				}


				console.log(this.active_content)
			},
			// 头部图标
			right_icon() {
				console.log('right')
			},

			tab(news_id) {

				wx.navigateTo({
					url: '/pages/postdetails/postdetails?news_id=' + news_id,
				})
				// var url = 'https://www.zhongdaogy.com/zdgyindex/index.php#/pages/postdetails/postdetails?news_id='+ news_id;
				// // #ifdef H5
				// window.location.href = url;
				// // #endif

				// // #ifdef MP-WEIXIN
				// wx.navigateTo({
				// 	url: '../outline/outline?url=' + url,
				// })
				// // #endif
			},
			// 互动
			hudongs(item) {
				var url = 'https://www.zhongdaogy.com/life/lifes/pages/postdetails/postdetails?life_id=' + item.life_id
				// #ifdef H5
				window.location.href = url;
				// #endif

				// #ifdef MP-WEIXIN
				wx.navigateTo({
					url: '../outline/outline?url=' + url,
				})
				// #endif;
				// #ifdef H5
				window.location.href = url;
				// #endif

				// #ifdef MP-WEIXIN
				wx.navigateTo({
					url: '../outline/outline?url=' + url,
				})
				// #endif
				// wx.navigateTo({
				// 	url: '/pages/postdetails/postdetails?life_id=' + item.life_id,
				// })
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

	/* 
	.more-right::before {
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

	/* 分类右边 */
	/* .icon-Menu::before {

		content: '\e60c';
		font-family: 'iconfont';
		text-align: center;
	} */

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
