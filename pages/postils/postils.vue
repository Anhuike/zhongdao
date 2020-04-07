<template>
	<view style="padding-top: 44px; ">
		<view class="flex_between two_color wrpo_center title_s" style="">
			<view class="back-left flex_center " @click="back()">
			</view>
			<view class="middle_text ">
				{{header.title}}
			</view>
			<view class="flex_center  more-right">
				<!-- more-right -->
			</view>
		</view>
		<!-- style="padding-top: 44px;" -->
		<view class="padding-left padding-right margin-bottom">
			<view class="padding-bottom-10" style="border-radius: 0 0 20upx 20upx;box-shadow: 0 10upx 0 rgb(238,238,238,0.4);">
				<view class="" style="width: 100%;height:260upx;border-radius: 20upx 20upx 0 0 ;">
					<image :src="header.thumb" mode="" style="width: 100%;height:260upx"></image>
				</view>
				<!-- <view class="tiny_text two_color padding " style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
					{{header.content}}
				</view> -->

				<view class="notice" style="display: flex;justify-content: flex-start;align-items: center;">
					<uni-notice-bar speed="10" :scrollable="true" :single="true" backgroundColor="#FFF" color="#333" :text="announce" />
				</view>
			</view>
		</view>
		<view class="padding ">
			<view class="flex_between " style="flex-wrap: wrap;">
				<view class="flex_center margin-top" :style="nav.length==8?'flex:1 1 25%':'flex:1 1 33%'" v-for="i in nav" :key="i.cate_id"
				 @tap="inside(i)">
					<image :src="i.icon" mode="" style="height: 100upx;width: 100upx;border-radius:50% ;"></image>
					<view class="tiny_text padding-top-10" style="text-align: center;">
						{{i.title}}
					</view>
				</view>
			</view>
		</view>

		<view class="padding">
			<view class="padding-top " v-for="i in datas" :key='i.cate_id'>
				<view class="flex_between" style="align-items: flex-end;">
					<view class="bold max_text two_color">
						{{i.title}}
					</view>
					<view class="rite  x_text vice-color padding-right" @tap="inside(i)">
						更多
					</view>
				</view>
				<!-- 合作链接 -->
				<tuwen :list='i.items' v-if="is_type=='hezuolianjie'"></tuwen>
				<ziyuan :highp="i.items" v-if="is_type!='hezuolianjie'"></ziyuan>
			</view>
		</view>
		<!--  -->
		<view class="padding-bottom">

		</view>
		<!--  -->
	</view>
</template>

<script>
	import api from '../../api/api.js';
	import "../../style/com_icon.css";
	import meeting from '../../component/meeting/meeting.vue'
	import ziyuan from '../../component/wuli_article/zuyuan.vue';
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue' //公告
	import tuwen from '@/component/wuli_article/tuwen.vue' //合作链接用

	export default {
		components: {
			ziyuan,
			uniNoticeBar,
			tuwen,
			meeting,
		},
		data() {
			return {
				index_id: '',

				// 
				header: "",
				alldata: '',
				announce: '',
				datas: [],
				nav: "",
				// adsum: "",
				// seek: '',
				is_type: '',

			}
		},
		onLoad(options) {
			var that = this
			console.log(options)
			this.is_type = options.type
			this.index_id = options.id

			api.postils({
				cate_id: this.index_id
			}, function(res) {
				if (res.error == 0) {
					that.header = res.data.header
					that.alldata = res.data.alldata
					that.announce = res.data.announce
					that.nav = res.data.nav
					that.datas = res.data.data

				}
				console.log(res)
			})
		},
		methods: {

			// 详情
			inside(item) {
				console.log(item, '45455')
				if (this.header.outline == 1||item.is_down==1) {
						uni.navigateTo({
							url: '/pages/zs_inside/zs_inside?id=' + item.cate_id + '&is_forums=' + item.is_forums + '&is_link=' + 1
						})
				} else {
					if (item.is_meeting == '1') {
						wx.navigateTo({
							url: '/pages/collaborate/collaborate',
						})
					} else {
						uni.navigateTo({
							url: '/pages/zs_inside/zs_inside?id=' + item.cate_id + '&is_forums=' + item.is_forums
						})
					}
				}
			},
			tab(news_id) {
				wx.navigateTo({
					url: '/pages/postdetails/postdetails?news_id=' + news_id,
				})
			},
			// 更多
			// more_tab(cate_id) {
			// 	uni.navigateTo({
			// 		// url: '/pages/zs_inside/zs_inside?id='+cate_id
			// 	})
			// },

			back() {
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style>
	.notice {
		padding: 20upx 0 0;
		overflow: hidden;
	}

	.notice::before {
		margin-top: -20upx;
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

	/* .more-right::before {
		content: '\e606';
		font-family: 'iconfont';
		text-align: center;
	}
 */
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
