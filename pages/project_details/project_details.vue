<template>
	<view class="box" @tap="hidde_hint">
		<view class="flex_between wrpo_center title_s " style="">
			<view class="back-left flex_center" @click="back()">
			</view>
			<view class="middle_text">
				{{data_list.prj_shortname}}
			</view>
			<view class=" flex_center more-right">
				<!-- icon-right -->
			</view>
		</view>
		<view class="" style="position: fixed;top: 0;z-index: 9999;color:#ffffff; background-color:rgb(252, 54, 43)">


		</view>

		<view class="white" style="border-bottom:15upx  solid #F0F0F0; ">
			<view class="" v-if="media.length!=0">
				<video id="myVideo" style="width: 100vw;margin:0;height: 200px;" :src="video_src.media" @error="videoErrorCallback"
				 objectFit="cover" :poster="video_src.thumb"></video>
			</view>
			<image v-else :src="without" mode="" style="width: 100vw;margin:0;height: 200px;display: block;"></image>
			<!-- :danmu-list="danmuList" -->
			<!-- controls -->
			<!-- danmu-btn  -->
			<!-- enable-danmu -->
			<!-- <view class=""> -->
			<view class="padding-left white padding-right padding-top-10">
				<view class="padding-bottom-10" style="display: flex;border-bottom:1px solid #F0F0F0;justify-content: space-between;">
					<image :src="data_list.responsible_face" style="border-radius: 60%;height: 60upx;width: 60upx;" mode=""></image>
					<view class="margin-left " style="flex:1">
						<view class="tiny_text bold two_color">
							{{data_list.responsible_name}}
						</view>
						<view class="x_text x_color">
							{{data_list.company_name}}
						</view>
					</view>
					<view v-if="data_list.is_attention==0" class="two_color" style="display: flex;align-items: center;" @tap="attention()">
						关注
					</view>
					<view @tap="cancel_attention()" v-else class="x_color" style="display: flex;align-items: center;">
						已关注
					</view>
				</view>
			</view>
			<view class="padding">
				<view class="small_text two_color padding-bottom-20 bold">
					{{data_list.prj_name}}
				</view>
				<view class="" style="display: flex;">
					<view class="x_text title_color">
						{{data_list.zans}}人
					</view>
					<view class=" x_text two_color">
						对这个项目感性趣
					</view>
				</view>
				<view class="x_text two_color" style="padding:10upx 0 0">
					{{data_list.one_word}}
				</view>
				<view class="x_text x_color" style="padding:10upx 0 0;">
					{{data_list.create_time}}/<text v-for="item in data_list.prj_local" :key="item">{{item}}/</text>{{data_list.cate_name}}
				</view>
			</view>
		</view>
		<view class="padding white" style="border-bottom:15upx  solid #F0F0F0;">
			<view class="small_text two_color bold padding-bottom-20" v-if="media.length !=0">
				相关视频
			</view>
			<view class="small_text two_color bold " v-else>
				暂无相关视频
			</view>
			<scroll-view v-if="media.length!=0" class="scroll-view_H" scroll-x="true" style="height: 215upx;" scroll-left="0">
				<view class="flex_between margin-top" style="">
					<view style="width: 220upx;" v-for="(item,index) in media" :key="item.title" :class="[index==0?'':'margin-left']"
					 @tap="handleProject(item.media_id)">
						<view class=" flex_center " style="height:140upx;position: relative;">
							<view class="flex_center cente_img" style="height: 100%;width:100%;">
								<image :src="stop" style="height: 80upx;width:80upx;"></image>
							</view>
							<!-- radius -->
							<!-- @tap时 替换上面video的地址 -->
							<image :src="item.thumb" mode="" style="height:100%;width: 220upx"></image>
						</view>
						<view class="text-center x_text two_color " style="margin-top:10upx">
							{{item.content}}
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="padding white" style="border-bottom:15upx solid #F0F0F0;">
			<view class="small_text two_color bold padding-bottom-20">
				行业领域
			</view>
			<scroll-view class="scroll-view_H" style="min-width: 100%;" scroll-x="true" scroll-left="0" show-scrollbar="false">

				<view id='items' class="" style="display: flex;">
					<view class="domain two_color" v-for="item in data_list.industry" :key="item">
						{{item}}
					</view>
				</view>
			</scroll-view>
		</view>

		<view class="padding white" style="border-bottom:15upx  solid #F0F0F0;">
			<view class="small_text two_color  padding-bottom-20 flex_between" style="">
				<view class="bold">基本信息</view>
				<view v-if='data_list.basic_info.length>80' :class="['x_text',zhank?'zhank':'shouq']" @tap="zhank = !zhank">
					{{zhank?'展开':'收起'}}
				</view>
			</view>
			<view :class="['two_color', 'x_text',zhank?'hidden_text':'']">
				<text>
					{{data_list.basic_info}}
				</text>
			</view>
		</view>

		<!-- {{content}} -->
		<view class="white " style="">
			<view class="" v-html="content">
			</view>
		</view>
		<!-- 	<view class="padding white" style="border-bottom:15upx  solid #F0F0F0;">
			<view class="small_text two_color bold padding-bottom-20">
				相关咨讯
			</view>
			<view class=" two_color x_text">
				<text>
					目前仅支持手机运行，vue的页面后期会更新。其他页面有时间都会更新，下载示例版有时间都会更新，下载示例版是完整且最新的
					目前仅支持手机运行，vue的页面后期会更新。其他页面有时间都会更他页面有时间都会更新，下载示例版是完整且最新的目前仅支
					目前仅支持手机运行，vue的页面后期会更新。其他页面有时间都会
				</text>

			</view>
		</view> -->
		<!-- <view class="padding white" style="border-bottom:15upx  solid #F0F0F0;">

			<view class="small_text two_color  padding-bottom-20 flex_between" style="align-items: flex-end;">
				<view class="bold">Q&A</view>
				<view class="particulars two_color x_text">
					查看详情
				</view>
			</view>
			<view class="margin-left-20 margin-right-20 box-shadow padding-20">
				<view class="" style="display: flex;">
					<image :src="wen" mode="true" class="icon_img"></image>
					<view class="tiny_text bold two_color margin-left-20">
						北京高端要老院有哪些？
					</view>
				</view>
				<view class="margin-top-20" style="display: flex;">
					<image :src="da" mode="true" class="icon_img"></image>
					<view class="x_text two_color margin-left-20">
						<text>
							1.目前仅支持手机运行，vue的页面后期会更新。其他页面有时间,
							2.目前仅支持手机运行，vue的页面后期会更新。其他页面有时间
						</text>
					</view>
				</view>
			</view>
		</view> -->
		<!--  -->
		<view class="padding white " style="">
			<view class="bold small_text two_color padding-bottom-20">{{comment.comments==0?'暂无评论':comment.comments+'条评论'}}</view>
			<view class="" style="display: flex;border-bottom:1upx solid #eee" v-for="item in comment.items" :key="item.comment_id">
				<img :src="da" alt="" style="height: 50upx;width: 50upx;border-radius:50% ;" />
				<view class="margin-left-20  padding-bottom" style="width:calc(100% - 70upx )">
					<view class="flex_between padding-bottom-20" style="height:50upx;align-items: center;">
						<view class="x_text two_color bold">
							{{item.nickname}}
						</view>
						<view class="x_text x_color">
							{{item.dateline}}
						</view>
					</view>
					<view class="x_text vice-color padding-bottom-10 ">
						<!-- 回复<span class="title_color" style="white-space: nowrap;">王校长</span>：感谢您的关注，我校进一步了解，可以点击详情我喊兴趣，您的专属秘书会联系您哦 -->
						{{item.content}}
					</view>
					<!-- <view class="padding-top " @tap="answer(1)">
						<view class="x_text vice-color" style="display:flex;justify-content: flex-end;" @tap="write_back()">
							<image :src="huifu" mode="true" style="height:30upx ;width:30upx;margin-right:10upx;"></image>回复
						</view>
					</view> -->
				</view>
			</view>
		</view>
		<!--  -->
		<userSare :shaflag="shaflag" :shareTitle="data_list.prj_name" :shareContent="data_list.prj_abbre" :shareLink="data_list.link"
		 :shareThumb="data_list.thumb1" :isShowBottom="isShowBottom" @closeShaflag="closeShaflag"></userSare>

		<view class="pos_bottom white">
			<view class="flex_left">
				<view class="item_btns" @tap.stop="btm_action(0)">
					<image class="btm_imgs" :src="pinlun" mode=""></image>
					<view class="x_text vice-color">
						评论
					</view>
				</view>
				<view class="item_btns" @tap="btm_action(1)">
					<image class="btm_imgs" :src="data_list.is_collect==1?shoucang1:shoucang" mode=""></image>
					<view class="x_text vice-color">
						收藏
					</view>
				</view>
				<view class="item_btns" @tap="btm_action(2)">
					<image class="btm_imgs" :src="data_list.is_zan==1?zan1:zan" mode=""></image>
					<view class="x_text vice-color">
						点赞
					</view>
				</view>
				<view class="item_btns" @tap="btm_action(3)">
					<image class="btm_imgs" :src="fenxiang" mode=""></image>
					<view class="x_text vice-color">
						分享
					</view>
				</view>
			</view>
			<view class="flex_right small_text">
				<view class="bg_hong flex_center" style=" background-image: linear-gradient(to right,#f69c1b,#fbce1a);" @tap="callPhone()">
					想合作
				</view>
				<view class="bg_hong flex_center" style="background-image: linear-gradient(to right,#e80d0d,#fe3636);" @tap="Seize()">
					去抢占
				</view>
			</view>
		</view>
		<!-- 回复 -->
		<view class="">
		</view>
		<!-- 评论 -->
		<view class="padding white" style=" z-index: 999;display: flex; position: fixed;bottom: 0;width: 100vw;box-sizing: border-box;"
		 v-show="show_comment" @tap.stop="">
			<form @submit="comment" @reset="formReset" style="width: 100%; display: flex;">
				<!-- 	<input @confirm="textareaVl($event)" class="uni-input padding-10" style="width: 100%;border: 1upx solid #eee;box-sizing: border-box;"
				 name="pinlun" type="text" confirm-type="send" placeholder="" maxlength="80" :show-confirm-bar="textarea_attribute"
				 :adjust-position="textarea_attribute" /> -->
				<!-- #ifdef H5 -->
				<input type="text" :placeholder="holder?holder:'写评价…'" @confirm="onKeyComment" v-model="keyComment" confirm-type="send"
				 class="bottom_input" placeholder-style="font-size: 28upx;color: #999999;" @blur="hidde_hint" />
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<input disabled="true" type="text" placeholder="写评价…" v-model="keyComment" class="bottom_input" placeholder-style="font-size: 28upx;color: #999999;"
				 @click="showChatBox(0)" />
				<!-- #endif -->
				<!-- <button form-type="submit" style="">确定</button> -->
			</form>
		</view>
		<!-- 敬请期待 -->
		<view class="flex_center" v-show="shwo_hint" style="position: fixed;top:0;height: 100vh;width:100vw;z-index: 999;background: rgb(102,102,102,.3);">
			<view class="flex_center" style="height: 750upx;width:630upx;padding-top:100upx">
				<view class="white " style="height: 700upx;width:510upx; padding:0 60upx">
					<view class="" style=" display: flex;justify-content: center;">
						<image :src="xiaolian" mode="" style="height:200upx;width:200upx;margin-top:-100upx;"></image>
					</view>
					<view class="title_color" style="font-size: 60upx;text-align: center;margin-top:60upx ;">
						敬请期待
					</view>
					<view class="small_text two_color" style="margin-top:30upx ;text-align: center;">
						您所在地区暂未开通
					</view>
					<button class="bg_red" style="margin-top:50px ; border-radius: 50upx;color:#fff" @tap="hint()">
						<!-- <view class="" style="font-size:34upx ;"> -->
						确定
						<!-- </view> -->
					</button>
				</view>
			</view>
		</view>


		<!--  -->

	</view>
</template>

<script>
	import "../../style/com_icon.css";
	import api from '../../api/api.js';
	import userSare from '../../components/share/share.vue';
	export default {
		components: {
			userSare
			// uniIcons,
			// uniNavBar,
			// uniSection,
			// uniStatusBar
		},
		watch: {
			commentScroll(newV, oldV) {
				if (newV != oldV) {
					this.toView = ''
				}
			}
		},
		created() {
			console.log(window)
			// #ifdef H5
			if (window.__CFG.IN_APP_CLIENT == "IOS") {
				this.isIOS = 1
			}
			if (api.checkIsWeixin()) {
				this.is_weixin = 1
			}
			// #endif
		},
		mounted() {
			let curPage = this.getCurPage()
			let curParam = curPage.options || curPage.$route.query;
			// console.log(curParam)
			if (curParam.isBackHome == 1) {
				this.isBackHome = 1
			}
			// 与IOS交互
			// #ifdef H5
			if (api.checkIsWeixin()) {
				this.isShowBottom = false;
			}
			// #endif
		},
		data() {
			return {
				stop: require('../../static/imgs/icoImg/stop.png'), //视频暂停图标
				textarea_attribute: true,
				shwo_hint: false,
				xiaolian: require('../../static/imgs/icoImg/xiaolian.png'),
				pinlun: require('../../static/imgs/icoImg/pinglun.png'),



				shoucang: require('../../static/imgs/icoImg/shoucang.png'),
				shoucang1: require('../../static/imgs/shoucang.png'),


				zan: require('../../static/imgs/icoImg/dianzan.png'),
				zan1: require('../../static/imgs/zan.png'),



				fenxiang: require('../../static/imgs/icoImg/fenxiang.png'),


				data_list: '',
				media: [],
				video_src: '',
				content: '',
				show_comment: false,
				bg_hong: require('../../static/imgs/icoImg/bg_hong.png'),
				bg_huang: require('../../static/imgs/icoImg/bg_huang.png'),
				wen: require('../../static/imgs/icoImg/wen.png'),
				da: require('../../static/imgs/icoImg/da.png'),
				huifu: require('../../static/imgs/icoImg/huifu.png'),
				zhank: true,
				domain: [

				],
				correlation: [

				],
				keyComment: '', //评论的值
				src: '',

				danmuValue: '',
				// showVideo: false
				id: '',
				holder: '',

				// 分享用到的
				shaflag: false,
				isIOS: 0,
				is_weixin: 0,
				isShowBottom: true,
				isBackHome: 0,
				// 暂未开通
				have_product: '',
				// 评论数据
				comment: '',
				// 暂无视频
				without: require('../../static/imgs/without.png'),
			}

		},

		onLoad(options) {
			var that = this
			that.id = options.id
			//如果url中存在uid,则此链接为分享链接，需留记录
			if (options.uid) {
				api.clickshare({
					'type': 'project',
					'news_id': options.id,
					'uid': options.uid
				}, function(res) {
					console.log(res)
				})
			}



			api.project_details({
				'prj_id': options.id
			}, function(res) {
				console.log(res)
				if (res.error == '0') {
					that.data_list = res.data.detail
					that.content = res.data.detail.content
					that.have_product = res.data.have_product
					that.media = res.data.media
					that.video_src = res.data.media[0]
					console.log(res.data, 'shipin');
				}
			})


			api.getProjects({
				'prj_id': options.id,
				'page': 10,
			}, function(res) {
				console.log(res)
			})
			console.log(that.data_list)
			api.getComments({
				'prj_id': options.id,
				'page': 1,
			}, function(res) {
				if (res.error == '0') {
					that.comment = res.data
					console.log(res, '评论数据')
				}
			})
		},
		onReady: function(res) {
			// #ifndef MP-ALIPAY || MP-TOUTIAO
			this.videoContext = uni.createVideoContext('myVideo')
			// #endif
			// #ifdef APP-PLUS || MP-BAIDU
			setTimeout(() => {
				this.showVideo = true
			}, 350)
			// #endif
			// #ifndef APP-PLUS || MP-BAIDU
			this.showVideo = true
			// #endif
		},
		methods: {
			onKeyComment() {
				var that = this
				api.comment({
						'prj_id': that.data_list.prj_id,
						'content': this.keyComment,
					}, function(res) {
						console.log(res);
						if (res.error == '0') {
							that.show_comment = false
							that.keyComment = ''

						}
					}

				)
			},
			// 评论
			hidde_hint() {
				this.show_comment = false
			},

			// // 评论确定
			// comment(e) {
			// 	console.log(e)
			// 	var that = this
			// 	api.comment({
			// 			'prj_id': that.data_list.prj_id,
			// 			'content': e.mp.detail.value.pinlun,
			// 		}, function(res) {
			// 			console.log(res);
			// 			if (res.error == '0') {
			// 				that.show_comment = false

			// 			}
			// 		}

			// 	)

			// },


			write_back() {
				// 回复
			},
			// 提示框
			hint() {
				this.shwo_hint = false
			},


			textareaVl(e) {
				console.log(e)
			},

			// 分享

			share() {
				if (this.isIOS == 0) {
					this.shaflag = true
					// #ifdef H5
					this.init();
					// #endif
				} else {
					// #ifdef H5
					if (window.__CFG.IN_APP_CLIENT) {
						var params = {
							sharetitle: that.data_list.prj_name,
							sharelink: that.data_list.link,
							shareimg: that.data_list.thumb1
						}
						if (window.__CFG.IN_APP_CLIENT == "IOS") {
							window.webkit.messageHandlers.AppNativeMethod.postMessage({
								"function_name": "appNativeShareInfo",
								"params": JSON.stringify(params)
							})
						}
					}
					// #endif
				}
			},
			closeShaflag(e) {
				this.shaflag = e
			},
			// 组件获取页面路由参数
			getCurPage() {
				let pages = getCurrentPages();
				let curPage = pages[pages.length - 1];
				return curPage
			},
			// #ifdef H5
			init: function() {
				let url = 'https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.16/js/social-share.min.js?v=' + Math.random()
				let script = document.createElement('script')
				script.setAttribute('src', url)
				// setTimeout(function(){
				document.getElementsByTagName('head')[0].appendChild(script)
				// },1000)
			},
			// #endif

			// 评论
			showComment() {
				this.show_comment = true
				console.log(this.data_list.is_collect)
			},
			// 赞
			is_zan() {
				console.log('点赞')

				var that = this
				if (that.data_list.is_zan == 0) {
					that.data_list.is_zan = 1

				} else {
					that.data_list.is_zan = 0
				}


				// console.log(that.data_list.is_collect)
				api.zan({
					'prj_id': that.data_list.prj_id,
					'status': that.data_list.is_zan
				}, function(res) {
					// console.log(res)
					if (res.error == '0') {

					} else {
						if (that.data_list.is_zan == 0) {
							that.data_list.is_zan = 1

						} else {
							that.data_list.is_zan = 0
						}
						this.back_data('is_zan', that.data_list.is_zan)
					}
				})
			},
			cancel_attention() {
				var that = this
				uni.showModal({
					title: '提示',
					content: '您确定要取消关注' + that.data_list.responsible_name + '吗？',
					success: function(res) {
						if (res.confirm) {
							// console.log('用户点击确定');
							that.attention()
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				});
			},
			// 关注
			attention() {
				var that = this
				if (that.data_list.is_attention == 0) {
					that.data_list.is_attention = 1

				} else {
					that.data_list.is_attention = 0
				}
				api.attention({
					'status': that.data_list.is_attention,
					'prj_id': that.data_list.prj_id
				}, function(res) {
console.log(res)
					if (res.error == '0') {
						uni.showToast({
							title: res.message,
							duration: 2000
						});

					} else {
						uni.showToast({
							title: res.message,
							duration: 2000,
							icon:'none'
						});
						if (that.data_list.is_attention == 0) {
							that.data_list.is_attention = 1

						} else {
							that.data_list.is_attention = 0
						}
						// this.back_data('is_zan', that.data_list.is_zan)

					}
				})
			},
			// 同步上个页面的数据
			back_data(data_name, data_data) {
				var that = this
				// 修改上个页面的数据
				var pages = getCurrentPages(),
					prevPage = null;
				console.log(pages, '这个页面')
				if (pages.length > 1) {
					prevPage = pages[pages.length - 2];
				}
				if (prevPage) {
					// #ifdef H5
					for (let i = 0; i < prevPage.focusData.length; i++) {
						if (prevPage.focusData[i].prj_id == that.data_list.prj_id) {
							if (data_name == 'is_zan') {
								// console.log('h5')
								prevPage.focusData[i].is_zan = data_data
							} else {
								// is_collect
								prevPage.focusData[i].is_collect = data_data
							}

						}

					}


					// #endif
					// #ifdef APP-PLUS || MP-WEIXIN
					let item_list = prevPage.focusData
					for (let i = 0; i < prevPage.focusData.length; i++) {
						if (item_list[i].prj_id == that.data_list.prj_id) {
							if (data_name == 'is_zan') {
								// console.log("app")
								item_list[i].is_zan = data_data
							} else {
								is_collect
								item_list[i].is_collect = data_data
							}
							// item_list[i].data_name =data_data
							prevPage.setData({
								focusData: item_list
							})
						}

					}

					// #endif
				}
				//    uni.navigateBack();

			},
			// 收藏
			collect() {
				console.log('收藏')
				var that = this
				if (that.data_list.is_collect == 0) {
					that.data_list.is_collect = 1
				} else {
					that.data_list.is_collect = 0
				}
				console.log(that.data_list.is_zan)
				api.collect({
					'status': that.data_list.is_collect,
					'prj_id': that.data_list.prj_id
				}, function(res) {
					console.log(res)
					if (res.error == '0') {

					} else {
						if (that.data_list.is_collect == 0) {
							that.data_list.is_collect = 1

						} else {
							that.data_list.is_collect = 0
						}
						this.back_data('is_collect', that.data_list.is_zan)
					}
				})
			},
			// 抢占
			Seize() {
				// uni.removeStorageSync('ulitem')
				var that = this

				// uni.navigateTo({
				// 	url: '/pages/Seize/Seize?id=' + that.id
				// })
				console.log(this.have_product)
				if (this.have_product != '0') {
					uni.navigateTo({
						url: '/pages/Seize/Seize?id=' + that.id + '&name=' + that.data_list.prj_name
					})
				} else {
					this.shwo_hint = true
				}

			},
			// 想合作
			callPhone() {
				var that = this
				console.log(that.data_list.responsible_mobile)
				uni.makePhoneCall({
					phoneNumber: that.data_list.responsible_mobile, //仅为示例
				});
			},
			// 相关视频
			handleProject(id) {
				console.log(id)
				var that = this
				for (var i = 0; i < that.media.length; i++) {
					if (id == that.media[i].media_id) {
						that.video_src = that.media[i]
						console.log(i)
					}
				}
				console.log(that.video_src, that.media)
			},
			// 底部功能
			btm_action(type) {

				console.log(type)
				switch (type) {
					case 0:
						this.showComment()
						break;
					case 1:
						this.collect()
						console.log(1)
						break;
					case 2:
						this.is_zan()
						console.log(2)
						break;
					case 3:
						this.share()
						break;
					default:

				}
			},
			// 回复
			answer(id) {
				console.log(id)
			},
			// 领域

			// hanleDomain(id) {
			// 	console.log(id)
			// },
			// 视频
			sendDanmu: function() {
				this.videoContext.sendDanmu({
					text: this.danmuValue,
					color: this.getRandomColor()
				});
				this.danmuValue = '';
			},
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			getRandomColor: function() {
				const rgb = []
				for (let i = 0; i < 3; ++i) {
					let color = Math.floor(Math.random() * 256).toString(16)
					color = color.length == 1 ? '0' + color : color
					rgb.push(color)
				}
				return '#' + rgb.join('')
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
			// showMenu() {
			// 	uni.showToast({
			// 		title: '菜单'
			// 	})
			// },
			// clickLeft() {

			// 	uni.showToast({
			// 		title: '左侧按钮'
			// 	})
			// },
			// search() {
			// 	uni.showToast({
			// 		title: '搜索'
			// 	})
			// },
			// showCity() {

			// 	uni.showToast({
			// 		title: '选择城市'
			// 	})
			// },
			// scan() {
			// 	uni.showToast({
			// 		title: '扫码'
			// 	})
			// },
			// confirm() {
			// 	uni.showToast({
			// 		title: '搜索'
			// 	})
			// }
		},
		onPullDownRefresh() {
			console.log('onPullDownRefresh')
			setTimeout(function() {
				uni.stopPullDownRefresh()
				console.log('stopPullDownRefresh')
			}, 1000)
		}
	}
</script>

<style>
	/* 底部 */
	.pos_bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 100upx;
		width: 100%;
		display: flex;
	}

	.cente_img {
		height: 160upx;
		width: 40%;
		position: absolute;
		top: 0;
		background-color: rgb(65, 63, 63, .2);
		z-index: 88;
	}

	.btm_imgs {
		height: 40upx;
		width: 40upx;
	}

	.item_btns {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.flex_left {
		width: 50%;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.flex_right {
		width: 50%;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.bg_size {
		background-size: cover;
		background-repeat: no-repeat;
	}

	.bg_hong {
		text-align: center;
		border-radius: 50upx;
		width: 43%;
		height: 70%;
		color: #FFF;
	}

	/*  */

	.box {
		/* background: rgb(240, 240, 240); */
		padding-bottom: 150upx;
	}

	.domain {
		padding: 5px 10px;
		border-radius: 50px;
		font-size: 12px;
		margin-right: 10px;
		white-space: nowrap;
		background: #E6E6E6;
	}

	.zhank {
		position: relative;
		padding-right: 12px;
		color: rgb(252, 54, 43);
	}

	.shouq {
		position: relative;
		padding-right: 12px;
		color: rgb(252, 54, 43);
	}

	.shouq::before {
		position: absolute;
		right: 0;

		top: 4upx;
		content: '\e61f';
		color: rgb(252, 54, 43);
		font-family: 'iconfont';
		font-size: 12px;
	}

	.zhank::before {
		position: absolute;
		right: 0;
		top: 4upx;
		content: '\e625';
		color: rgb(252, 54, 43);
		font-family: 'iconfont';
		font-size: 12px;
	}

	.particulars {
		position: relative;
		padding-right: 12px;
	}

	.particulars::before {
		position: absolute;
		right: 0;
		top: 4upx;
		bottom: 0;
		content: '\e61c';
		/* color: rgb(252, 54, 43); */
		font-family: 'iconfont';
		font-size: 12px;
	}

	.hidden_text {

		overflow: hidden;

		text-overflow: ellipsis;

		display: -webkit-box;

		-webkit-box-orient: vertical;

		-webkit-line-clamp: 5;
	}

	.box-shadow {
		box-shadow: 0 0 20px rgb(233, 233, 233, .8);

	}

	.icon_img {
		/* min-height: 38upx;
		min-width: 38upx; */
		max-height: 38upx;
		max-width: 38upx;
	}

	/deep/.uni-scroll-view::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		display: none
	}


	.title_s {
		height: 44px;
		width: 100vw;
		/* position: fixed;
		top: 0; */
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

	.more-right::before {
		content: '\e606';
		font-family: 'iconfont';
		text-align: center;
	}

	/*  */
</style>
