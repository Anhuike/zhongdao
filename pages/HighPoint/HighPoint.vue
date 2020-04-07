<template>
	<view style="padding-top:44px;min-height: calc( 100vh - 44px );">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>

		<view class="flex_between wrpo_center title_s" style="">
			<view class="back-left flex_center" @click="back()">
			</view>
			<view class="middle_text">
				{{header.title}}
			</view>
			<view class="more-right flex_center">
			</view>
		</view>
		<!--  -->
		<view class="padding-left padding-right">
			<view class="padding-bottom-10" style="border-radius: 0 0 20upx 20upx;box-shadow: 0 10upx 0 rgb(238,238,238,0.4);">
				<view class="" style="width: 100%;height:260upx;border-radius: 20upx 20upx 0 0 ;">
					<image :src="header.thumb" mode="" style="width: 100%;height:260upx"></image>
				</view>
				<view class="tiny_text two_color padding" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
				{{header.content}}
				</view>
			</view>
			<view class="margin-top">
				<view class="padding-top  flex_between padding-bottom-20" style=" border-bottom: solid 1upx #eee;">
					<view :class="['small_text',i.news_id==item_news_id?'active':'two_color']" style="position: relative;" v-for="i in data_new"
					 :key="i.news_id" @tap="item_news(i.news_id)">
						{{i.title}}
						<view class="baf_botm" v-show="i.news_id == item_news_id">
						</view>
					</view>
				</view>
				<view class="">
					<ziyuan :highp="highp"  v-show="item_news_id==1"></ziyuan>
					<!--  -->
					<interaction :post_list="adsum" type ="resource" v-show="item_news_id==2"></interaction>
					<!--  -->
					<!-- :post_list="" -->
					<interaction :post_list="seek" type="resource1" v-show="item_news_id==3"></interaction>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../api/api.js';
	import "../../style/com_icon.css";
	// import ziyuan "'../../components/tabBar.vue'"
	import ziyuan from '../../component/wuli_article/zuyuan.vue';
	import interaction from '../../component/post/interaction.vue'
	export default {
		components: {
			ziyuan,
			interaction,
		},
		data() {
			return {
				
				header: "",
				alldata: '',
				highp: "",
				adsum: "",
				seek: '',
				data_new: [{
					title: '高端资源',
					news_id: 1
				}, {
					title: '我有资源',
					news_id: 2
				}, {
					title: '寻找资源',
					news_id: 3
				}],
				img_s: require('../../static/imgs/img_chuanwu@2x.png'),
				item_news_id: 1,
			}
		},
		onLoad() {
			var that = this
			api.HighPoint({
				'page': 1,
				'list_id': 1
			}, function(res) {
				if (res.error == 0) {
					that.header = res.data.header
					that.alldata = res.data.alldata
					that.highp = res.data.alldata[0].data
					that.adsum = res.data.alldata[1].data
					that.seek = res.data.alldata[2].data
				}
				console.log(res)
			})
		},
		methods: {
			item_news(id) {
				this.item_news_id = id
			},

			tab(news_id,type) {

				wx.navigateTo({
					url: '/pages/postdetails/postdetails?news_id=' + news_id,
				})
				// if(type=='resource'){
					
				
				// // https://www.zhongdaogy.com/life/lifes/pages/posttie/index?from=life&cate_id=52
				// var path = 'https://www.zhongdaogy.com/life/lifes/pages/posttie/index?from=life&cate_id=52';
				// // #ifdef H5
				// window.location.href = path;
				// // #endif
				
				// // #ifdef MP-WEIXIN
				// wx.navigateTo({
				// 	url: '../outline/outline?url=' + path,
				// })
				// // #endif
				// }else{
				// var url = 'https://www.zhongdaogy.com/life/lifes/pages/posttie/index?from=life&cate_id=53';
				// // #ifdef H5
				// window.location.href = url;
				// // #endif

				// // #ifdef MP-WEIXIN
				// wx.navigateTo({
				// 	url: '../outline/outline?url=' + url,
				// })
				// // #endif
				// }
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
	.hidden_text {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}

	.active {
		color: #f92727;
	}

	.baf_botm {
		position: absolute;
		bottom: -20upx;
		width: 100%;
		height: 100upx;
		border-bottom: 4upx solid red;
	}

	/*   */
	.title_s {
		height: 44px;
		width: 100vw;
		position: fixed;
		top: 0;
		z-index: 99999;
		color: #333;
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
	} */
</style>
