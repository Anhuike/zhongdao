<template>
	<view class="content">
		<mescroll-uni ref="mescrollRef" @init="mescrollInit" top="0" :down="downOption" @down="downCallback" :up="upOption"
		 @up="upCallback" @emptyclick="emptyClick">
			<view class="up_piece  padding-left padding-right" style="background:#fff;">
				<!-- <view class="top_view " style="background:#F8F8F8">
			这里是状态栏
		</view> -->
				<view class="">
					<view class="flex_between padding-bottom-10" style="align-items: flex-end;">
						<!-- <view class="title " style="align-items: flex-end;"> -->
						<view class="titles title bold">
							<text>中道共赢</text>
						</view>
						<!-- <view class="subhead">
							<text>结缘中道，相伴共赢</text>
						</view> -->
						<!-- </view> -->
						<view class="title " style="width:70% ;">
							<uni-notice-bar speed="8" :scrollable="true" :single="true" :text="'中道快讯：'+announce" backgroundColor="#FFF"
							 color="#333" style=";margin-bottom:0;" />
						</view>

						<view class="title" @tap.stop="scancode()">
							<image :src="sao" style="height:48upx;width:48upx;" mode=""></image>
						</view>
					</view>

					<view class="cents">
						<view class="c_left" style="position: relative;">
							<swiper class="" circular='true' style="width: 100%;height: 500upx;position: relative;" @change="change_index"
							 :autoplay="true" :interval="2000" :duration="500">
								<swiper-item v-for="item in bnr" :key="item.src" style="height: 220upx; width: 100%;">
									<view class="c_left" :style="'background:url('+item.src +');'+'background-size:100% 500upx;'">

									</view>
								</swiper-item>
							</swiper>
							<scroll-view class="conter_btm" style="padding-top: 10upx;color:#fff; line-height: 45upx;" @tap="oneself">
								<view class="bold" style="display: flex;justify-content: space-around; ">
									<view class="tiny_text" style="letter-spacing:.3em">
										结缘中道
									</view>
									<image :src="conpany_logo" mode="" style="height: 30upx;width:60upx;"></image>
								</view>
								<view class="bold" style="display: flex;justify-content: space-around;">
									<view class="tiny_text" style="letter-spacing:.3em;text-indent: 3em;">
										相伴共赢
									</view>
									<image :src="btn_icon" mode="" style="height: 30upx;width:30upx;margin-top:10upx ;margin-left:-30upx;"></image>
								</view>
							</scroll-view>
						</view>
						<!-- <view class="c_left" :style="'background:url('+ bnr +');'+'background-size:100% 500upx;'">
						<view class="conter_btm" style="padding-top: 10upx;color:#fff; line-height: 45upx;" @tap="oneself">
							<view class="bold" style="display: flex;justify-content: space-around; ">
								<view class="tiny_text" style="letter-spacing:.3em">
									结缘中道
								</view>
								<image :src="conpany_logo" mode="" style="height: 30upx;width:60upx;"></image>
							</view>
							<view class="bold" style="display: flex;justify-content: space-around;">
								<view class="tiny_text" style="letter-spacing:.3em;text-indent: 3em;">
									相伴共赢
								</view>
								<image :src="btn_icon" mode="" style="height: 30upx;width:30upx;margin-top:10upx ;margin-left:-30upx ;"></image>
							</view>
						</view>
					</view> -->
						<view class="c_right" :style="'background:url(' + bg_img1 +');background-size:100% 500upx;'">
							<view class="consot title_color title_item" @click="feature(item)" v-for="item in involve" :key="item.title">
								<view class="small_text title_color bold " style="">
									{{item.title}}
								</view>
								<view class="flex_center" style="margin: 0 auto;">
									<view class="tiny_text bold golden_color">
										{{item.belief}}
									</view>
									<img :src="item.src" style="height: 40upx;width:40upx;">
								</view>
							</view>
						</view>
					</view>

				</view>
			</view>
			<view class="up_piece margin-top-10">
				<view class=" shadows" style=";">

					<view class="flex_between  ">
						<view class="flex_center" style="flex: 1;" @click="video_del(1)">
							<image :src="tuiguang" mode="" style="height:100upx;width: 100upx;"></image>
							<view class="text-center tiny_text two_color bold" style="margin-top:10upx">
								视频宣传
							</view>
						</view>
						<view class="flex_center" style="flex: 1;" @click="video_del(2)">
							<image :src="peixun" mode="" style="height:100upx;width: 100upx;"></image>
							<view class="text-center tiny_text two_color bold" style="margin-top:10upx">
								视频培训
							</view>
						</view>
						<view class=" flex_center" style="flex: 1;" @click="video_del(3)">
							<image :src="zhibo" mode="" style="height:100upx;width: 100upx;"></image>
							<view class="text-center tiny_text two_color bold" style="margin-top:10upx">
								视频直播
							</view>
						</view>
					</view>
				</view>
				<view class=" shadows" style="">

					<view class="flex_between ">
						<view class="flex_center" style="flex: 1;" @click="centers(i)" v-for="i  in  xiamgmu" :key="i.src">
							<image :src="i.src" mode="" :style="i.name?'height:100upx;width: 100upx;':'height:160upx;width: 160upx;'"></image>
							<view class="text-center tiny_text two_color bold" style="margin-top:10upx" v-if="i.name">
								{{i.name}}
							</view>
						</view>
					</view>
				</view>
				<view class="shadows" style="">

					<view class="flex_between ">
						<view class="flex_center" style="flex: 1;" @click="collaborate()">
							<image :src="hezuo" mode="" style="height:100upx;width:100upx;"></image>
							<view class="text-center tiny_text two_color bold" style="margin-top:10upx">
								合作交流
							</view>
						</view>
						<view class="flex_center" style="flex: 1;" @click="jumpPartner()">
							<image :src="jiamen" mode="" style="height:100upx;width:100upx;"></image>
							<view class="text-center tiny_text two_color bold" style="margin-top:10upx">
								合作加盟
							</view>
						</view>
						<view class="flex_center" style="flex: 1;" @click="PartnerLinks()">
							<image :src="lianjie" mode="" style="height:100upx;width:100upx;"></image>
							<view class="text-center tiny_text two_color bold" style="margin-top:10upx">
								合作链接
							</view>
						</view>
					</view>
				</view>

				<view class="padding shadows">
					<view class="flex_between margin-bottom " style="align-items: flex-end;">
						<view v-for="(item,index) in jiedu" :key="item.name" :class="[ 'max_text', index==current?'bold title_color':'vice-color']"
						 @tap="unscramble(item)">
							{{item.name}}
						</view>

					</view>
					<swiper class="" circular='true' style="width: 100%;height: 220upx;" @change="change_index" :autoplay="true"
					 :interval="2000" :duration="500">
						<swiper-item v-for="item in jiedu" :key="item.id" style="height: 220upx; width: 100%;">
							<image lazy-load="true" :src="item.src" mode="" class="swiper-image" style="height: 220upx; width: 100%;" @tap="unscramble(item)"></image>
						</swiper-item>
					</swiper>

				</view>
				<!-- 轮播 -->
				<view class="padding shadows">
					<view class="flex_between" style="align-items: flex-end;">


						<view class="" style="display: flex;">
							<view class="bold max_text title_color">
								项目中心
							</view>
							<view class="x_text vice-color" style="margin-left:15px;padding-top:20upx">
								中道共赢直属项目中心
							</view>
						</view>
						<!-- 列表页 -->
						<view class="rite  x_text vice-color padding-right" @tap="navigateTo()">
							更多

						</view>
					</view>
					<swiper class="" circular='true' previous-margin='100px' next-margin="100px" style="width: 100%;height: 260upx;"
					 @change="change_index" :autoplay="true" :interval="2000" :duration="500">
						<swiper-item v-for="item in xingmu" :key="item.title" class="">
							<view class=" padding-10" @tap="handleProject(item)">
								<view class=" flex_center radius " style="height:180upx;width: 100%;">
									<image :src="item.thumb" mode="" style="height:100%;width: 100%;display: block;"></image>
								</view>
								<view class="text-center tiny_text two_color bold" style="margin-top:10upx">
									{{item.title}}
								</view>
							</view>
						</swiper-item>
					</swiper>
					<!-- @scroll="scroll" -->
					<!-- <scroll-view class="scroll-view_H" scroll-x="true" style="height: 215upx;" scroll-left="0">
					<view class="flex_between margin-top" style="">
						<view class="boxs" style="width: 220upx;" v-for="item in xingmu" :key="item.title" @tap="handleProject(item)">
							<view class=" flex_center radius" style="height:140upx;">
								<image :src="item.thumb" mode="" style="height:100%;width: 220upx"></image>
							</view>
							<view class="text-center tiny_text two_color bold" style="margin-top:10upx">
								{{item.title}}
							</view>
						</view>
					</view>
				</scroll-view> -->
				</view>
				<view class="padding-top ">
					<view class=" padding-left padding-right">
						<view class="flex_between" style="align-items: flex-end;">
							<view class="bold max_text title_color">
								重点项目
							</view>
							<view class="rite  x_text vice-color padding-right" @tap="video_del('ulitem')">
								更多
							</view>
						</view>
						<!-- @scroll="scroll" -->
						<scroll-view class="scroll-view_H" style="height:58px;width:100%;" scroll-x="true" scroll-left="0" show-scrollbar="false">
							<view id='items' class="padding-top padding-bottom" style="display: flex;">
								<view v-for="item in project" :key="item.title" :class="['flex_center','colorsa','solid',item.cate_id==cate_id?'active':'']"
								 style="padding:6upx 10px; border-radius: 50px;font-size: 12px;margin-right:10px ;white-space:nowrap ;" @tap="focus(item.cate_id)">
									{{item.title}}
								</view>
							</view>
						</scroll-view>
					</view>

					<view class="">
						<entry_block :focusData="focusData" @share="share"></entry_block>
					</view>

					<!-- <view class=" margin-bottom borders padding-left padding-right" v-for="item in focusData" :key="item.prj_name">
					<view class="" @tap="projectDetails(item.prj_id)">
						<image :src="item.thumb1" mode="" style="height: 200px;width:100%;"></image>
					</view>
					<view class="  " style="padding-left:10upx ;padding-right:10upx ;" @tap="projectDetails(item.prj_id)">
						<view class="" style="display: flex; align-items: flex-end;">
							<view class="tiny_text bold text_hidden" style="margin:15upx 0;">
								{{item.prj_name}}
							</view>
							<span class="title_color x_text " style="margin:15upx 0;text-align: right;" @tap.stop="handleDetails()">
								查看详情
							</span>
						</view>
						<view class=" x_text vice-color  flex_between text_hidden" style="line-height: 36upx;">
							{{item.prj_abbre}}
						</view>
						<view class="flex_between wrpo_center" style="padding:15upx 0 30upx ;">
							<view class="x_text vice-color ">
								{{item.zans?item.zans+'人对这个项目感兴趣':''}}
							</view>
							<view class="flex_between wrpo_center" style="width:45%; ">
								<image :src="item.is_collect==0?shoucang1:shoucang" style="height: 40upx;width: 40upx;" mode="" @tap.stop="collect(item.is_collect,item.prj_id)"></image>
								<image :src="item.is_zan==0?zan1:zan" style="height: 40upx;width:40upx;" mode="" @tap.stop="is_zan(item.is_zan,item.prj_id)"></image>
								<image :src="fenx" style="height: 40upx;width: 40upx;" mode="" @tap.stop="fenxiang(item)"></image>
								<view class="text-center x_text active solid" style="padding:0 16upx;border-radius: 50upx;line-height: 40upx;"
								 @tap.stop="is_call(item)">
									想合作
								</view>
							</view>
						</view>
					</view>
				</view> -->

				</view>
				<!-- <view class="margin-bottom" style="border-bottom:1upx solid #EEEEEE;">
				<view class="flex_between margin-bottom">
					<view class="bold max_text title_color" style="display: flex;">
						推荐好物
						<view class="x_text vice-color" style="margin-left:15px;padding-top:20upx">
							我是辅助性标题
						</view>
					</view>
					<view class="  x_text title_color " style="padding:10upx 20upx;border-radius:50upx;background: rgb(255,242,242);">
						换一换
					</view>
				</view>
				<view class="x_text  margin-bottom" style="height:200upx;display:flex;flex-wrap: wrap;justify-content: space-between;align-content: space-around;">
					<view class="bg-radius vice-color flex_center" style="height: 26upx;;text-align: center;" v-for="(item,index) in haowu"
					 :key="index">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="padding-top padding-bottom">
				<view class="" style="display: flex;">
					<view class="bold max_text title_color">
						大家都在看
					</view>
					<view class="x_text vice-color" style="margin-left:15px;padding-top:20upx">
						我是辅助性标题
					</view>
				</view>
				<view class="" style="display: flex;">
					<view class="">

					</view>
					<view class="">

					</view>
				</view>

			</view> -->

				<!--  -->
			</view>
			<userSare :shaflag="shaflag" :shareTitle="data_list.prj_name" :shareContent="data_list.prj_abbre" :shareLink="data_list.link"
			 :shareThumb="data_list.thumb1" :isShowBottom="isShowBottom" @closeShaflag="closeShaflag"></userSare>

			<!--  -->
			<tab-bar v-show="!shaflag"></tab-bar>
			<!--  -->
		</mescroll-uni>
	</view>

</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/components/mescroll-uni/mixins/mescroll-more-item.js";
	// 
	import "../../style/com_icon.css";
	import api from '../../api/api.js';
	import tabBar from '../../components/tabBar.vue';
	import entry_block from '../../component/wuli_article/entry_block.vue';
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue' //公告
	import userSare from '../../components/share/share.vue';

	export default {
		mixins: [MescrollMixin, MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
		components: {
			userSare,
			tabBar,
			entry_block,
			uniNoticeBar,
		},
		data() {
			return {
				sao: require('../../static/imgs/icon_erweima@2x.png'),
				// 顶部
				involve: [{
					title: '新型政商学院',
					belief: '引领',
					src: require('../../static/imgs/icon_xueyuan.png'),
					id: 9
				}, {
					title: '健康实体加盟',
					belief: '支撑',
					src: require('../../static/imgs/yinling.png'),
					id: 10
				}, {
					title: '金融综合服务',
					belief: '保障',
					src: require('../../static/imgs/icon_jinrong.png'),
					id: 11
				}, {
					title: '线上网络平台',
					belief: '融合',
					src: require('../../static/imgs/icon_pingtai.png'),
					id: 26
				}, {
					title: '高端资源整合',
					belief: '共赢',
					src: require('../../static/imgs/icon_ziyuan.png'),
					id: 12
				}],
				cate_id: 100, //默认第一个
				conpany_logo: require('../../static/imgs/conpany_logo.png'),
				btn_icon: require('../../static/imgs/btn_icon.png'),
				bg_img1: require('../../static/imgs/bg_img1.png'),
				// jian:,
				erweima: require('../../static/imgs/icon_erweima@2x.png'),
				// 
				// /
				lianjie: require('../../static/imgs/icon_lianjie@2x.png'),
				jiamen: require('../../static/imgs/icon_jiameng@2x.png'),
				hezuo: require('../../static/imgs/icon_jiaoliu@2x.png'),
				// /
				tuiguang: require('../../static/imgs/icon_tuiguang@2x.png'),
				peixun: require('../../static/imgs/icon_peixun@2x.png'),
				zhibo: require('../../static/imgs/icon_zhibo@2x.png'),
				xiamgmu: [{
					name: '重点项目',
					src: require('../../static/imgs/icon_zhongdian@2x.png'),
					id: 3
				}, {
					name: '',
					src: require('../../static/imgs/icon_logo@2x.png'),
					id: 4
				}, {
					name: '中道同城',
					src: require('../../static/imgs/icon_yigou@2x.png'),
					id: 5
				}],
				// 
				fenx: require('../../static/imgs/icon_fenxiang@2x.png'),
				zan1: require('../../static/imgs/zan1.png'),
				shoucang1: require('../../static/imgs/shoucang1.png'),
				zan: require('../../static/imgs/zan.png'),
				shoucang: require('../../static/imgs/shoucang.png'),
				// falv: ,
				// 人物滚动图
				bnr: [{
						src: require('../../static/imgs/influential/1.png')
					},
					{
						src: require('../../static/imgs/influential/2.png')
					},
					{
						src: require('../../static/imgs/influential/3.png')
					},
					{
						src: require('../../static/imgs/influential/4.png')
					},
					{
						src: require('../../static/imgs/influential/5.png')
					},
				],


				// 中道解读
				jiedu: [{
					name: '中道解读',
					id: 8,
					// src: require('')
					src: '../../static/imgs/Graph/zhongdao.png',

				}, {
					name: '专家解读',
					id: 31,
					src: '../../static/imgs/Graph/zhuanjia.png'
				}, {
					name: '政商解读',
					id: 29,
					src: '../../static/imgs/Graph/zhengshang.png'
				}],
				current: 0, //轮播图下标 
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				xingmu: [],
				project: [],
				focusData: [],
				haowu: [

				],
				announce: '', //公告

				// 分享用到的
				shaflag: false,
				isIOS: 0,
				is_weixin: 0,
				isShowBottom: true,
				isBackHome: 0,
				// 
				data_list: '',
				// 上拉下拉
				//
				 
				downOption: {
					 use: false // 不配置上拉
					// auto: true // 不自动加载 (mixin已处理第一个tab触发downCallback)
				},
				upOption: {
					auto: false, // 不自动加载
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						// size: 4 // 每页数据的数量
					},
					noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						tip: '~ 暂无订单 ~', // 提示
						// btnText: '去看看'
					}
				},
			}
		},
		onLoad() {
			var that = this
			api.listcate({}, function(res) {
				// console.log(res.data);
				if (res.error == '0') {
					that.project = res.data.cate
					that.xingmu = res.data.center
					that.announce = res.data.announce
				}
			})
			that.focus(100)
		},

		methods: {
			// <!--navigateTo pages/ulitem/ulitem -->
			navigateTo() {
				uni.navigateTo({
					url: '/pages/ulitem/ulitem'
				})
			},
			// 解读
			unscramble(item) {
				console.log(item)
				wx.navigateTo({
					url: '/pages/Readings/Readings?id=' + item.id + '&&name=' + item.name,
				})
			},

			// z中间log行
			centers(i) {
				// https://www.zhongdaogy.com/life/pages/index/index
				console.log(i.id)
				if (i.id == 5) {
					var url = 'https://www.zhongdaogy.com/life/pages/index/index';
					// #ifdef H5
					window.location.href = url;
					// #endif
					// #ifdef MP-WEIXIN
					wx.navigateTo({
						url: '../outline/outline?url=' + url,
					})
					// #endif
				} else if (i.id == 3) {
					this.video_del('ulitem')
					// var url = ' https://www.zhongdaogy.com/life/pages/index/index';
					// // #ifdef H5
					// window.location.href = url;
					// // #endif
					// // #ifdef MP-WEIXIN
					// wx.navigateTo({
					// 	url: '../outline/outline?url=' + url,
					// })
					// // #endif
				} else if (i.id == 4) {
					this.oneself()
				}
			},
			// 中道共赢
			oneself() {
				uni.navigateTo({
					url: '/pages/postils/postils?id=' + 113
				})
			},
			// 合作链接
			PartnerLinks() {
				uni.navigateTo({
					url: '/pages/postils/postils?id=' + 17 + '&type=hezuolianjie'
				})
			},
			//跳转
			//头部
			jumpoutline() {
				var url = 'https://www.zhongdaogy.com/life/pages/index/allchannel?id=164&from=plat';
				// #ifdef H5
				window.location.href = url;
				// #endif

				// #ifdef MP-WEIXIN
				wx.navigateTo({
					url: '../outline/outline?url=' + url,
				})
				// #endif
			},

			jumpPartner() {
				var url = 'https://www.zhongdaogy.com/waimai/partner/index.html';
				// #ifdef H5
				window.location.href = url;
				// #endif

				// #ifdef MP-WEIXIN
				wx.navigateTo({
					url: '../outline/outline?url=' + url,
				})
				// #endif
			},

			jumpCity() {
				var url = 'https://www.zhongdaogy.com/life/pages/index/index';
				// #ifdef H5
				window.location.href = url;
				// #endif

				// #ifdef MP-WEIXIN
				wx.navigateTo({
					url: '../outline/outline?url=' + url,
				})
				// #endif
			},
			// 扫码
			scancode() {
				// 允许从相机和相册扫码
				uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);

					},
					fail: function(res) {
						console.log(res)
					}
				});

				// console.log('扫码')
				// uni.scanCode({
				//     scanType: 'barCode',
				//     success: function (res) {
				//         console.log('条码类型：' + res.scanType);
				//         console.log('条码内容：' + res.result);
				//     }
				// });
			},

			// 合作交流
			collaborate() {
				wx.navigateTo({
					url: '/pages/collaborate/collaborate',
				})
			},

			// 查看详情
			handleDetails() {
				console.log("查看详情")
			},


			// 解读图片index
			change_index(e) {


				if (e.detail.current < 3) {
					this.current = e.detail.current
				}

			},

			// 项目中心
			handleProject(data) {
				console.log(data)
				// if(id==6){
				uni.navigateTo({
					url: "/pages/dating/dating?id=" + data.id
				});
				// }

			},

			// 五大模块
			feature(item) {
				console.log(item)
				// switch (item.id) {
				// 	case 0:
				// 		console.log(0)
				// 		uni.navigateTo({
				// 			url: '/pages/postils/postils?id=9'
				// 		})
				// 		break;
				// 	case 1:
				// 		console.log(1)
				// 		uni.navigateTo({
				// 			url: '/pages/postils/postils?id=10'
				// 		})
				// 		break;
				// 	case 2:

				// 		wx.navigateTo({
				// 			url: '/pages/dating/dating?id=61',
				// 		})

				// 		break;
				// 	case 3:
				// 		console.log(3)
				// 		uni.navigateTo({
				// 			url: '/pages/online_platform/online_platform'
				// 		})
				// 		break;
				// 	case 4:
				// 		console.log(4)
				// 		uni.navigateTo({
				// 			url: '/pages/HighPoint/HighPoint'
				// 		})
				// 		break;
				// 	default:
				// 默认代码块
				// }
				uni.navigateTo({
					url: '/pages/postils/postils?id=' + item.id
				})

			},
			// x项目中心
			//视频中心 
			video_del(i) {
				var url = 'https://wx77c712085a88e335.wx.wakkaa.com/appMTAwNjg3?appId=wx77c712085a88e335'


				if (i == 3) {
					// #ifdef H5
					uni.navigateTo({
						url: '/pages/Video_promotion/Video_promotion?ty=' + i
					})
					// #endif

					// #ifdef MP-WEIXIN
					wx.navigateTo({
						url: '../outline/outline?url=' + url,
					})
					// #endif
				} else {
					uni.navigateTo({
						url: '/pages/Video_promotion/Video_promotion?ty=' + i
					})

				}
			},

			// 项目详情
			projectDetails(conpany_id) {
				uni.navigateTo({
					url: "/pages/project_details/project_details?id=" + conpany_id,
				});
			},
			// 重点项目
			focus(id) {
				// console.log(id)
				var that = this
				that.cate_id = id

				var params = {
					'cate_id': that.cate_id
				};
				api.listprojects(params, function(res) {
					console.log(res, 'focsData')
					if (res.error == '0') {
						that.focusData = res.data
					} else {
						uni.showToast({
							icon: 'none',
							title: res.message
						})
					}
				})
			},
			share(e) {
				console.log(e)
				this.data_list = e
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
			// 上拉下拉
			/*下拉刷新的回调 */
			downCallback() {
				// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
				// loadSwiper();
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				// this.mescroll.resetUpScroll()
				this.mescroll.endDownScroll()
				// 结束下拉状态
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
			
				//联网加载数据
				// var keyword = this.tabs[this.i]
				// // console.log(page.size, this.i, keyword, page.num)
				// var that = this
				// // if(res=){
				// var dataList = []
				// api.orderList({
				// 	status: keyword,
				// 	page: page.num,
				// 	size: 4,
				// }, function(res) {
				// 	console.log(res, 222)
				// 	if (res.error == '0') {
				// 		dataList = res.data
				// 		console.log(dataList)
				// 		for (let i = 0; i < dataList.length; i++) {
				// 			// console.log(i)
				// 			dataList[i].dateline = that.getLocalTime(Number(dataList[i].dateline) * 1000)
				// 		}
				// 		setTimeout(() => {
				// 			if (page.num == 1) that.goods = []; //如果是第一页需手动制空列表
				// 			that.goods = that.goods.concat(dataList)
				// 			
				// 		}, 1000)
				// 	} else {
				// 		that.mescroll.endErr();
				// 	}
				// })


			},
			//点击空布局按钮的回调
			emptyClick() {
				uni.showToast({
					title: '点击了按钮,具体逻辑自行实现'
				})
			},
		}
	}
</script>

<style>
	page,
	body {
		background: #F5F5F5;
	}

	.shadows {
		background: #fff;
		padding-top: 10upx;
		padding-bottom: 10upx;
		/* padding-left: 30upx; */
		/* padding-right: 30upx; */
		/* margin-top: 20upx; */
		/* margin-bottom: 20upx; */
		border-bottom: 10upx solid #F5F5F5;
		/* border-radius: 20rpx; */
		/* box-shadow: 0 0 10upx 5upx rgb(204,201,201); */
	}

	.colorsa {
		color: #999999;
	}

	.borders {
		background: #fff;
		padding-bottom: 20upx;
		/* border-bottom: 6upx solid rgb(204, 201, 201); */
		box-shadow: 0 15upx 5upx rgb(233, 233, 233, .5);

	}

	.boxs {
		margin-left: 30upx;
	}

	.title_item {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 20upx;
		margin-right: 20upx;
		margin-bottom: 10upx;
	}

	.boxs:nth-child(1) {
		margin-left: 0;
	}

	.bg-radius {
		width: 17%;

		padding: 10upx 0;

		background: rgb(240, 240, 240);
		white-space: nowrap;
		border-radius: 50upx;

	}

	.text_hidden {
		width: calc(100% - 4em);
		/* height: 2em; */
		word-break: break-all;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;

	}

	.active {
		color: #fff;
		background: rgb(252, 54, 43);
		border: none;
	}

	/*  */
	.scroll-view_H {
		width: 100%;
	}

	.up_piece {
		box-sizing: border-box;
		/* padding: 0 30upx; */
		background: #fff;
	}

	.top_view {
		height: 64upx;
	}

	.title {
		display: flex;
		/* height: 50upx; */
		padding: 15upx 0;
		/* margin-bottom: 30upx; */
	}

	.titles {
		font-size: 36upx;
		/* line-height: 50upx; */
		color: #3F3F3F;
	}

	.subhead {
		margin-left: 30upx;
		font-size: 24upx;
		color: #999999;

		/* padding-top: 20upx; */
	}

	.cents {
		display: flex;
		height: 500upx;
		padding-bottom: 20upx;
	}

	.c_left {
		height: 100%;
		width: 100%;
		border-radius: 20upx;
		overflow: hidden;
		background-repeat: no-repeat;
	}

	.conter_btm {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 100upx;
		background: rgb(255, 0, 0, .5);
		border-radius: 0 0 20upx 20upx;
	}

	.c_right {
		border-radius: 20upx;
		margin: 0 0 0 3%;
		height: 100%;
		width: 100%;
		background-repeat: no-repeat;

	}

	.c_btn {

		font-size: 24upx;
	}

	.m_subhead {
		font-size: 24upx;
		color: rgb(252, 54, 43);
	}

	.rifont {
		margin-left: 30upx;
		font-size: 24upx;
		color: rgb(102, 102, 102);
	}

	.consot {
		position: relative;
	}

	.consot::before {
		position: absolute;
		right: 0;
		content: '\e61c';
		font-family: 'iconfont';
	}

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

	/deep/.uni-scroll-view::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		display: none
	}

	/*  */
</style>
