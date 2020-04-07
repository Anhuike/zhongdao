<template>
	<view style="background-color: #fff;">
		<!-- 头部栏 -->
		<view class="flex_between wrpo_center title_s" style="background:#f92727">
			<view class="back-left flex_center " @click="back()">

			</view>
			<view class="middle_text">
				{{video_title}}
			</view>

			<view class="flex_center  more-right">
				<!-- more-right -->
			</view>
		</view>
		<view class="" style="height:144px;background:#f92727;padding-top:44px;box-sizing: border-box;">
			<view class="padding-top  padding-left padding-right" style=" ;">
				<uni-swiper-dot :info="swiper" :current="current" :mode="mode" :dots-styles="dotsStyles" field="content">
					<swiper class="swiper-box" circular='true' @change="change" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="item in swiper" :key="item.news_id">
							<view class="">
								<image class="image " :src="item.thumb" mode="aspectFill" style="height:150px ;width:100%; ;" />
							</view>
						</swiper-item>
					</swiper>
				</uni-swiper-dot>
			</view>
			<view class="padding">
				<view class="flex_between padding-bottom" style="flex-wrap: wrap;">
					<view class="flex_center margin-top" :style="cate.length==8?'flex:1 1 25%':'flex:1 1 33%'" v-for="i in cate" :key="i.cate_id"
					 @tap="inside(i)">
						<image :src="i.icon" mode="" style="height: 100upx;width: 100upx;border-radius:50% ;"></image>
						<view class="tiny_text padding-top-10" style="text-align: center;">
							{{i.title}}
						</view>
					</view>
				</view>
			</view>
			<!--  -->
			<view class="padding-left padding-right padding-bottom" v-if="ulitem!='ulitem'">
				<view class="flex_between ">
					<view class="flex_between padding-bottom" style="width: 50%; display: flex;">
						<view class="tiny_text two_color wrpo_center  rltive margin-right" v-for="item in wuil_list" :key="item.id" @tap="active_item(item.id)"
						 :style="item.id==active_id?'font-size:36upx;font-weight: bold;':''">
							<text>{{item.title}}</text>
							<image :src="active_btn" class="active_st" mode="" v-show="item.id==active_id"></image>
						</view>
					</view>
					<view class="" tyle="flex:1;display: flex;justify-content: flex-end;">
						<view class="icon-Menu flex_center">
						</view>
					</view>
				</view>
			</view>
			<!--  -->
			<view class="padding-left padding-right" v-for="i in wuil_list" :key="i.id" v-show="i.id==active_id&&ulitem!='ulitem'">
				<wuli :wuil_list="i.items" :index_s="index_s"></wuli>
			</view>
			<view class="padding-left padding-right" v-for="i in cate" :key="i.id" v-show="i.cate_id==active_id && ulitem=='ulitem'">
				<view class="middle_text two_color padding-bottom padding-left padding-right">
					{{i.title}}
				</view>
				<entry_block :focusData="i.list"></entry_block>
			</view>
			<!--  -->
		</view>



		<!--  -->
	</view>
</template>

<script>
	import entry_block from '../../component/wuli_article/entry_block.vue'; //
	import "../../style/com_icon.css";
	import api from '../../api/api.js';
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'
	import wuli from '@/component/wuli_article/wuli.vue'
	export default {
		components: {
			uniSection,
			uniSwiperDot,
			wuli,
			entry_block
		},
		data() {
			return {
				ti_tle: ['视频推广', '视频培训', '视频直播'],
				swiper: [], //轮播图
				cate: "", //换一换里的数据
				// background: ['color1', 'color2', 'color3'],
				// indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				// /
				//
				mode: 'default',
				dotsStyles: {
					backgroundColor: 'rgba(0, 0, 0, .3)',
					border: '1px rgba(0, 0, 0, .3) solid',
					color: '#fff',
					selectedBackgroundColor: 'rgba(0, 0, 0, .9)',
					selectedBorder: '1px rgba(0, 0, 0, .9) solid'
				},
				active_btn: require('../../static/imgs/icoImg/active_btn.png'),
				current: 0,
				//
				wuil_list: [],
				// 默认选中
				active_chec: 0,
				ulitem: '',

				video_title: '', //标题
				index_s: '', //视频分类id  分享 推广。。。
				getNumber: 0, //页数

				active_id: '',
			}
		},
		onLoad(options) {
			console.log(options.ty == 1, options.ty == 2, options.ty == 3)
			var that = this
			if (options.ty == 1 || options.ty == 2 || options.ty == 3) {
				this.video_title = this.ti_tle[options.ty - 1]
				this.index_s = options.ty

				api.video_generalize({
					'type': options.ty
				}, function(res) {
					console.log(res)
					if (res.error == 0) {
						that.swiper = res.data.swiper
						that.cate = res.data.cate
						that.active_chec = res.data.cate[0].cate_id
						
						that.wuil_list = res.data.news
						that.active_id = res.data.news[0].id
					}
				})
			} else if (options.ty == 'ulitem') {
				this.ulitem = options.ty
				console.log('666')
				api.getProjects({
					// 'type': options.ty
				}, function(res) {
					console.log(res)
					if (res.error == 0) {
						that.swiper = res.data.swiper
						that.cate = res.data.data
						that.active_id = res.data.data[0].cate_id
						that.video_title=res.data.header 
					}
				})
			}
		},
		methods: {
			// 
			inside(item) {
				console.log(item)
				if (this.ulitem == 'ulitem') {
					this.active_id = item.cate_id
					for (let i = 0; i < this.cate.length; i++) {
						if (item.cate_id == this.cate[i].cate_id) {
							this.active_content = this.cate[i]
							console.log(this.cate)
						}
					}
				} else {
					// 模块列表详情
					uni.navigateTo({
						url: '/pages/zs_inside/zs_inside?id=' + item.cate_id + '&is_forums=' + item.is_forums+'&video=video'
					})
				}
			},
			// 标题
			active_item(vle) {
				console.log(vle)
				this.active_id = vle
			},
			// 图片index
			change(e) {
				// console.log(e)
				this.current = e.detail.current
			},
			// 选择分类
			active_tap(id) {
				var that = this
				that.active_chec = id
				api.getNews_tap({
					'type': that.index_s,
					'cate_id': id,
					'page': that.getNumber
				}, function(res) {
					console.log(res)
					if (res.error == 0) {
						that.wuil_list = res.data
					}
				})
			},

			// switchover(item) {
			// 	var that = this
			// 	// 切换
			// 	console.log('换一换')
			// 	api.video_generalize({
			// 		'type': this.index_s,
			// 		'is_change': 1
			// 	}, function(res) {
			// 		console.log(res)
			// 		if (res.error == 0) {
			// 			that.cate = res.data.cate
			// 			that.active_chec = res.data.cate[0].cate_id
			// 			that.wuil_list = res.data.news
			// 		}
			// 	})
			// },
			tab(news_id) {
				console.log(news_id, this)

				wx.navigateTo({
					url: '../postdetails/postdetails?news_id=' + news_id,
				})
			},
			back() {
				uni.navigateBack({
						delta: 1,
						success: function(e) {
							console.log(e)
						},
						fail: function() {

						}
					},

				)
			},
		}
	}
</script>

<style>
	page {
		background-color: #fff;
	}

	.swiper-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* background-color: #999; */
		color: #fff;

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

	.swiper-box {
		border-radius: 20upx;
		overflow: hidden;
	}

	.chectext {
		text-align: center;
		line-height: 40upx;
		width: 20%;

		border: 1px solid red;
		border-radius: 50upx;
		padding: 4upx 4upx;
	}

	.hidden_text {
		width: 5em;
		/* max-width: 6em; */
		overflow: hidden;
		/*超出部分隐藏*/
		white-space: nowrap;
		/*不换行*/
		text-overflow: ellipsis;
		/*超出部分文字以...显示*/
	}

	.active_chec {
		text-align: center;
		line-height: 44upx;
		border-radius: 50upx;
		padding: 4upx 6upx;
		width: 20%;
		/* max-width: 5em; */
		background: rgb(252, 54, 43);
		color: #fff;
	}

	.out_text {
		background: rgb(252, 54, 43, .2);
		color: rgb(252, 54, 43);
	}

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
		/* width: 40upx;
		height: 20px;
	
		content: '\e606';
		font-family: 'iconfont'; */

	}
</style>
