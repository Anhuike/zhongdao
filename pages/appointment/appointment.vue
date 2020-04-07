<template>
	<view class="" style="padding-bottom:150upx ;">
		<view class="flex_between wrpo_center title_s" style="">
			<view class="back-left flex_center " @click="back()">
			</view>
			<view class="middle_text">
				{{detail.title}}
				<!-- {{header.title}} -->
			</view>
			<view class="flex_center  more-right">

			</view>
		</view>
		<!--  -->
		<view class="" style=";">
			<image :src="detail.images" mode="" style="haight:400upx;width:100%"></image>
		</view>
		<view class="padding" style="border-bottom:1upx solid #F6F6F6;position: relative;">
			<view class="out_icon">

			</view>
			<view class="small_text two_color bold title_hiden " style="">
				{{detail.title}}
			</view>
			<view class="flex_between padding-top-10 ">
				<view class="flex_between " style="flex: 4;">
					<view class="x_text vice-color">
						{{detail.dateline}}
					</view>
					<view class="x_text vice-color">
						已有<span style="color: #f92727;">{{detail.peopleNum}}</span>人预约
					</view>
				</view>
				<view class="" style="flex:2;display: flex;justify-content: flex-end;">
					<view class="x_color icon-fenxiang fenxiang " style="line-height: 50upxpx;font-family: 'iconfont';font-size:32upx">
					</view>
				</view>
			</view>
			<view class="flex_between  padding-top-10">
				<view class="flex_between" style="flex: 8;line-height: 40upx;">
					<view class="x_text x_color">
						扫码签到：{{detail.sore}}积分
					</view>
					<view class="x_text x_color">
						邀请积分：邀请1人获得{{detail.shareSore}}积分
					</view>
				</view>
				<view class="x_color x_text" style="flex: 1; display: flex;justify-content: flex-end;">
				</view>
			</view>
			<view class="padding-top-20">
				<view class="dingwei tiny_text vice-color">
					<text>{{detail.address}}</text>
				</view>
				<view class="flex_between padding-top-20 ">
					<view class="x_text vice-color">
						友情提示
					</view>
					<view :class="[show_text?'pack':'unfold' ]" @tap="show_text=!show_text">
					</view>
				</view>
				<view class="x_color x_text" v-show="show_text">
					<text>{{detail.specific_address}}</text>
				</view>
			</view>
		</view>
		<view class="flex_center">
			<view class=" two_color tiny_text padding flex_center">
				距离会议开始还剩
			</view>
			<count_down selectType="2" :endTime="nowtime"></count_down>
		</view>
		<view class="padding">
			<view class="flex_between">
				<image :src="i.face" mode="" v-for="i in users" :key="i.name" style="width:80upx;height:80upx;border-radius: 50upx;"></image>
			</view>
			<view class=" x_color x_text padding" style="display: flex;disflex-direction:column ;justify-content: center;padding-bottom:0;">
				<view class="" v-if="users.length==0">
					0人已经预约
				</view>
				<view class="" style="display: flex;" v-if="users.length!=0">
					<view class="" v-for="(item,index) in users" :key="index" v-if="index< 2">
						{{item.name}}{{index==1?'...':'、'}}
					</view>
					<view class="">
						等人已经预约
					</view>
				</view>
			</view>
		</view>
		<!--  -->
		<view class="flex_between small_text two_color padding-top padding">
			<view :class="['flex_center','small_text',type_nxs=='agenda'?'action_ren':'mo_ren']" style="" @tap.stop="handleTitle('agenda')">
				会议议程
				<view :class="['flex_center',type_nxs=='agenda'?'active_border':'mo_border' ]">
				</view>
			</view>
			<view :class="['flex_center','small_text',type_nxs=='activity'?'action_ren':'mo_ren' ]" @tap.stop="handleTitle('activity')">
				会议详情
				<view :class="['flex_center',type_nxs=='activity'?'active_border':'mo_border' ] ">
				</view>
			</view>
			<view :class="['flex_center','small_text',type_nxs=='correlation'?'action_ren':'mo_ren']" style="" @tap.stop="handleTitle('correlation')">
				相关文章
				<view :class="['flex_center',type_nxs=='correlation'?'active_border':'mo_border' ]">
				</view>
			</view>
		</view>

		<view class="padding" v-show="type_nxs=='agenda'">
			<!-- 时间轴 -->
			<!-- <view class="flex_between" style='height: 100%;' v-for="item in 3" :key="item">
				<view class="padding-left padding-right">
					<view class="" style="border-left:2upx dashed #999;height:100% ;width: 0;">
					</view>
				</view>
				<view class="" style="flex: 1;position: relative;">
					<view class="x_text time">
					</view>
					<view class="across">
					</view>
					<view class="padding x_color x_text " style="padding-top: 0;margin-bottom:50upx ;">
						80：30
						<view class="tiny_text two_color ">
							样式是 double。它定义为两条线的宽度再加上这两条线之间的空间等于 border-width 值。不过，CSS 规范并没有说其中一条线是否比另一条粗或者两条线是否应该是
						</view>
					</view>
				</view>
			</view> -->
			<view class="" v-html="detail.flow">
			</view>
		</view>
		<!--  -->
		<view class="padding" v-show="type_nxs=='activity'">
			<view class="">
				<!-- <image :src="ings" mode="" style="width: 100%;height: 300upx;"></image> -->
				<view class="tiny_text two_color padding-top padding-bottom">
					会议简介
				</view>
				<view class=" x_color x_text">
					{{detail.content}}
				</view>
				<view class="tiny_text two_color padding-top padding-bottom">
					会议二维码群
				</view>
				<view class="flex_center">
					<image :src="detail.group_code" mode="" style="width: 400upx;height: 500upx;"></image>
				</view>
			</view>
		</view>
		<!--  -->
		<view class="padding-left padding-right" v-show="type_nxs=='correlation'">
			<view class="padding-top padding-bottom flex_between" style="border-bottom:1upx solid #eee" v-for="item in  navs"
			 :key="item">
				<view class="flex_between  " style="flex: 1;flex-direction: column;">
					<view class="two_color tiny_text hidden_text">
						线的宽度再加上这两条线之间的空间等于 border-width 值。不过，CSS
					</view>
					<view class="flex_between x_text x_color">
						<view class="" style="width:50%;">
							2666人浏览
						</view>
						<view class="" style="flex: 1;">
							255点赞
						</view>
					</view>
				</view>
				<image :src="ings" mode="" style="height: 200upx;width:300upx ;"></image>
			</view>
		</view>
		<!--  -->
		<view class=" wrpo_center" style="background:#fff;width: 100%;height: 100upx;border-top:1px solid #eee;position: fixed;bottom: 0;left: 0;box-sizing: border-box;">
			<view class="flex_center " style="width: 20%;align-items: center;" @tap="call_phone">
				<view class="kefu"></view>
				<view class="x_text two_color">
					客服
				</view>
			</view>
			<view class="flex_center " style="width: 40%;height: 100%;align-items: center;border-left:1px solid #eee;">
				<view class="wrpo_center">
					<image :src="sao" mode="" style="height: 30upx;width: 30upx;"></image>
					<view :class="['small_text','padding-left-10',detail.meeting_state==1?'two_color':'x_color']">
						扫码签到
					</view>
				</view>
			</view>
			<view class="flex_center btn_yuyue" style="" @tap="show_info = true" v-if="detail.meeting_state == 1">
				<view class="wrpo_center">
					<view class="small_text  padding-left-10" style="color:#fff">
						{{detail.btn}}

					</view>
				</view>
			</view>
			<view class="flex_center btn_jieshu" style="" v-if="detail.meeting_state==0">
				<view class="wrpo_center">
					<view class="small_text  padding-left-10" style="color:#fff">
						{{detail.btn}}

					</view>
				</view>
			</view>

		</view>
		<view class="" v-show="show_info" style="">
			<Info_Submit></Info_Submit>
		</view>
		<!--  -->
	</view>
</template>

<script>
	import Info_Submit from '../../component/meeting/Info_Submit.vue' //预约信息
	import api from '../../api/api.js';
	import meeting from '../../component/meeting/meeting.vue'
	import uniSection from ' ../../components/uni-section/uni-section.vue'
	import uniSwiperDot from ' ../../components/uni-swiper-dot/uni-swiper-dot.vue'
	import "../../style/com_icon.css";
	import count_down from ' ../../components/count_down.vue' //倒计时
	export default {
		components: {
			uniSection,
			uniSwiperDot,
			meeting,
			count_down,
			Info_Submit
			// wuli,
		},
		data() {
			return {
				show_text: false,
				// 
				numHeight: 42,
				rollingNumber: 1,
				total: 10,
				nowtime: '',
				// new Date().toLocaleString(),//当前时间戳
				type_nxs: 'agenda',
				// ings: require('../../static/imgs/icoImg/da.png'),
				// tu: require('../../static/imgs/icoImg/xiaolian.png'),
				// 
				ings: require('../../static/imgs/icoImg/da.png'),
				tu: require('../../static/imgs/icoImg/xiaolian.png'),
				sao: require('../../static/imgs/icon_erweima@2x.png'),
				detail: [],
				users: [],
				show_info: false,
				navs: [],
			}
		},
		onLoad(options) {
			var that = this
			console.log(options, 'meeting_id')
			// meeting_details
			api.meeting_details({
				'meeting_id': options.id
			}, function(res) {
				console.log(res)
				if (res.error) {

					that.detail = res.data.detail
					that.nowtime = res.data.detail.starttime
					that.users = res.data.users
					that.navs = res.data.navs
				}
			})
		},
		methods: {
			handleTitle(type) {
				this.type_nxs = type
				console.log(type)
			},
			//kefu
			call_phone() {
				uni.makePhoneCall({
					phoneNumber: this.detail.serviceTel,
				});
			},
			// 隐藏信息框
			subscribe() {
				this.show_info = !this.show_info
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style scoped>
	.title_hiden {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.content>>>.xdsoft_flipcountdown>.xdsoft_digit {
		width: 30px;
		height: 41px;
		/* background-image: url(~@/static/flipcountdown-uni/img.png); */
		transition-property: background-position;
		transition-duration: 0.1s;
	}

	.content>>>.xdsoft_flipcountdown>.xdsoft_digit.xdsoft_dot {
		width: 15px;
	}

	.content>>>.xdsoft_flipcountdown>.xdsoft_digit.xdsoft_space {
		/* width: 15px; */
		background-position: 0 -463px;
	}

	/*  */
	.hidden_text {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2; //控制行数
		overflow: hidden;
	}

	.mo_ren {
		line-height: 50upx;
		flex: 1;
		color: rgb(51, 51, 51)
	}

	.action_ren {

		line-height: 50upx;
		flex: 1;
		color: #f92727
	}

	.mo_border {
		width: 1em;
		border-bottom: 4upx solid #fff;
	}

	.active_border {
		width: 1em;
		border-bottom: 4upx solid #f92727;
	}

	.time {
		position: absolute;
		left: calc(-35upx - 0.5em);
		top: 0upx;

	}

	.time::before {
		content: '\e603';
		font-family: 'iconfont';
		font-size: 30upx;
		background: #fff;
	}

	.across {
		position: absolute;
		left: -15upx;
		top: 15upx;
		width: 36upx;
		border-top: 1px solid rgb(51, 51, 51);
	}

	.kufu {}

	.kefu::before {
		content: '\e646';
		font-family: 'iconfont';
		font-size: 50upx;
	}

	.over::before {
		content: '\e600';
		font-family: 'iconfont';
		font-size: 50upx;
	}

	.dingwei::before {
		content: '\e61e';
		font-family: 'iconfont';
		color: #07c376;
	}

	.btn_yuyue {
		width: 40%;
		height: 100%;
		align-items: center;
		border-left: 1px solid #eee;
		background: linear-gradient(to right, #c10202, #f92727)
	}

	.btn_jieshu {
		width: 40%;
		height: 100%;
		align-items: center;
		border-left: 1px solid #eee;
		background-image: linear-gradient(to right, #bababa, #d5d5d5)
	}

	.out_icon {
		position: absolute;
		top: 150upx;
		left: 400upx;
	}

	.out_icon:before {
		color: #F92727;
		content: '\e600';
		font-size: 150upx;
		font-family: 'iconfont';
	}

	.unfold:after {
		/* &#xe624; */
		position: absolute;
		right: 100upx;
		content: '\e624';
		font-family: 'iconfont';
	}

	.pack:before {
		content: '\e607';
		font-family: 'iconfont';
	}

	.fengxian::before {
		content: '\E630';
	}

	/* 变灰色号 background-image: linear-gradient(to right, #bababa ,#d5d5d5);*/
	/* ;bg */
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
