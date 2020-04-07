<template>
	<view style="padding-top: 44px;">

		<view class="flex_between wrpo_center title_s two_color">
			<view class="back-left flex_center" @click="back()">
			</view>
			<view class="middle_text">
				{{title}}
			</view>
			<view class="flex_center more-right">
			</view>
		</view>
		<view class="" v-if="is_type == ''">

			<view class="padding-left padding-right">
				<view class="padding-bottom-10" style="border-radius: 0 0 20upx 20upx;box-shadow: 0 10upx 0 rgb(238,238,238,0.4);">
					<view class="" style="width: 100%;height:260upx;border-radius: 20upx 20upx 0 0 ;">
						<image :src="header.thumb" mode="" style="width: 100%;height:260upx"></image>
					</view>
					<view class="tiny_text two_color padding " style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
						{{header.content}}
					</view>
				</view>
			</view>

			<view class="padding">
				<view class="padding-top " v-if="is_forums==0">
					<view class="flex_between" style="align-items: flex-end;">
						<view class="bold max_text two_color">
							{{header.title}}
						</view>
						<!-- <view class="rite  x_text vice-color padding-right" @tap="more_tab(i.cate_id)">
						更多
					</view> -->
					</view>
					<ziyuan :highp="news" :shipin='video'></ziyuan>
				</view>
				<view class="" v-if="is_forums==1">
					<interaction :post_list="news" :url='is_url'>
					
					</interaction>
				</view>
			</view>
		</view>
		<view class=" padding" v-if=" is_type == 'hezuolianjie'">
			<tuwen :list='news'  ></tuwen>
		</view>
	</view>
</template>

<script>
	import api from '../../api/api.js';
	import "../../style/com_icon.css";
	import userSare from '../../components/share/share.vue'
	import ziyuan from '../../component/wuli_article/zuyuan.vue';
	import interaction from '../../component/post/interaction.vue'
	import tuwen from '@/component/wuli_article/tuwen.vue' //合作链接用
	export default {
		components: {
			ziyuan,
			userSare,
			interaction,
			tuwen,
		},
		data() {
			return {
				is_forums: '',
				// 分享用到的
				shaflag: true,
				isShowBottom: true,
				isBackHome: 0,
				img_s: require('../../static/imgs/img_chuanwu@2x.png'),
				header: "",
				news: [],
				is_url: '',
				title: '',
				is_type: '',
				video:'',//判断视频模块
			}
		},
		onLoad(options) {
			var that = this
			console.log(options)
			that.video =options.video
			that.is_forums = options.is_forums
			if (options.is_link == 1) {
				// 合作链接
				this.is_type = "hezuolianjie"
				api.link_list({
					'page': 1,
					'cate_id': options.id
				}, function(res) {
					console.log(res)
					if (res.error == 0) {
						that.title = res.data.title
						that.news = res.data.news
					}
				})
			}else {
				if (options.is_forums == 1) {
					api.listForums({
						'page': 1,
						'cate_id': options.id
					}, function(res) {
						console.log(res)
						if (res.error == 0) {
							that.title = res.data.header.title
							that.header = res.data.header
							that.news = res.data.data
							that.is_url = res.data.url
						}
					})
				} else if (options.is_forums == 0) {
					// listForums
					api.postils_list({
						'page': 1,
						'cate_id': options.id
					}, function(res) {
						console.log(res)
						if (res.error == 0) {
							that.title = res.data.header.title
							that.header = res.data.header
							that.news = res.data.news
						}
					})
				}
			}


		},
		methods: {
			closeShaflag(e) {
				this.shaflag = e
			},
			tab(news_id) {
				if(1){}
				
				wx.navigateTo({
					url: '/pages/postdetails/postdetails?news_id=' + news_id,
				})
			},
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
	.notice {}

	.notice::before {
		/* position: absolute;
		right: 0; */
		/* top:; */
		content: '\e608';
		font-family: 'iconfont';
		color: #11C476;
		font-size: 40upx;
	}

	.hidden_text {
		white-space: nowrap;
		/*规定段落中的文本不进行换行*/
		overflow: hidden;
		/*内容会被修剪，并且其余内容是不可见的。*/
		text-overflow: ellipsis;
	}

	.title_s {
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

	/* 	.more-right::before {
		content: '\e606';
		font-family: 'iconfont';
		text-align: center;
	} */

	/*  */
	.rite {
		/* padding-top: 20upx; */
		position: relative;
	}

	.rite::before {
		position: absolute;
		right: 0;
		/* top:; */
		content: '\e61c';
		font-family: 'iconfont';
		font-size: 30upx;
	}
</style>
