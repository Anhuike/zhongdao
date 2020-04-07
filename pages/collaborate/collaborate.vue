<template>
	<view>
		<!-- 头部栏 -->
		<view class="flex_between wrpo_center title_s" style="">
			<view class="back-left flex_center " @click="back()">
			</view>
			<view class="middle_text">
				<!-- {{}} -->
				{{header.title}}
			</view>
			<view class="flex_center  more-right">
				<!-- more-right -->
			</view>
		</view>

		<view class=" " style="height:144px;background:#f92727;padding-top:44px;box-sizing: border-box;">
			<view class="padding-top padding-left padding-right" >
				<!-- <uni-swiper-dot :info="header.thumb" :current="current" :mode="mode" :dots-styles="dotsStyles" field="content">

					<swiper class="swiper-box" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="(item, index) in header.thumb" :key="index">
							<view class="">
								<image class="image " :src="header.thumb" mode="aspectFill" style="height:150px ;width:100%; ;" />
							</view>
						</swiper-item>
					</swiper>
				</uni-swiper-dot> -->
				<image class="image " :src="header.thumb" mode="aspectFill" style="height:150px ;width:100%; ;" />
				<view class="">
					{{header.content}}
				</view>
			</view>
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
			<!-- <view class="" style="z-index: 9;">

				<view class="tiny_text flex_between padding" style="width:100%;position:relative;z-index: 9;box-sizing: border-box;">
					<view class=" two_color  bold">
						筛选
					</view>
					<view class="wrpo_center padding-right-20" style="width:30% ;background:#F0F0F0;text-align: right;justify-content: flex-end;">
						<view class="xuanze" style="width:100%" @tap.stop='filtrate()'>
							全选
						</view>
					</view>
					<view style="position:fixed;top:0;left:0;height:100vh;width: 100vw;background: #666;opacity: 0.5;"
					 @touchmove.prevent="" v-show="show_filtrate">

					</view>
					<view class=" padding-left padding-right" style="position:absolute;top:100upx;left:0;width: 100vw;z-index: 9;background:#fff;box-sizing: border-box;"
					 @touchmove.prevent="" v-show="show_filtrate">

						<view class="flex_between tiny_text two_color padding-20" style="border-bottom: 1upx solid #F0F0F0;" v-for="item in 8 "
						 :key="item" @tap.stop="handle_item(item)">
							<view>全选</view>
							<view :class=" [item==filtrate_id?'icon-dui1':''] " style="font-family: iconfont;color: #f92727;padding:0 30upx;">

							</view>
						</view>

					</view>
				</view>
			</view> -->

			<view class="padding-left padding-right">
				<view class="white" v-for="i in active_content.list" :key='i.id'>
					<view class="padding-bottom" style="display: flex;align-items: flex-end;">
						<view class="middle_text two_color ">
							{{i.title}}

						</view>
						<view class="x_text vice-color" style="margin-left:15px;">
							{{i.cate_name}}
						</view>
					</view>
					<meeting :wuil_list='i.list' :type_data='i.id'></meeting>
					<view class="" v-show="show_info" style="">
						<Info_Submit></Info_Submit>
					</view>
				</view>
			</view>

		</view>
		<!-- <view class="padding-right padding-left wrpo_center" style="background:#fff;width: 100%;height: 100upx;border-top:1px solid #eee;position: fixed;bottom: 0;left: 0;box-sizing: border-box;">

			<view class="flex_center " style="width: 50%;align-items: center;" @tap="info_miting(1)">
				<view class="wrpo_center">
					<image :src="me" mode="" style="height: 30upx;width: 30upx;"></image>
					<view class="tiny_text two_color padding-left-10">
						我的会议
					</view>
				</view>
			</view>
	
			<view class="flex_center " style="width: 50%; align-items: center;border-left:1px solid #eee;" @tap="info_miting(2)">
				<view class="wrpo_center">
					<image :src="fabu" mode="" style="height: 30upx;width: 30upx;"></image>

					<view class="tiny_text two_color padding-left-10">
						发布会议
					</view>
				</view>


			</view>

		</view> -->
		<!--  -->
	</view>
</template>

<script>
	import Info_Submit from '../../component/meeting/Info_Submit.vue' //预约信息
	import meeting from '../../component/meeting/meeting.vue'
	import uniSection from '../../components/uni-section/uni-section.vue'
	import uniSwiperDot from ' ../../components/uni-swiper-dot/uni-swiper-dot.vue'
	import "../../style/com_icon.css";
	import api from '../../api/api.js';
	export default {
		components: {
			uniSection,
			uniSwiperDot,
			meeting,
			// wuli,
			Info_Submit
		},
		data() {
			return {
				me: require('../../static/imgs/icoImg/wode.png'),
				fabu: require('../../static/imgs/icoImg/fabu.png'),
				// active_btn: require('../../static/imgs/icoImg/active_btn.png'),
				jieduImg: [{
					src: require('../../static/imgs/icoImg/active_btn.png'),
				}, {
					src: require('../../static/imgs/Graph/zhengshang.png')
				}, {
					src: require('../../static/imgs/icoImg/active_btn.png'),
				}, ],
				autoplay: true,
				interval: 2000,
				duration: 500,
				// 默认轮播图
				current: 0,
				// 	
				mode: 'default',
				dotsStyles: {
					backgroundColor: 'rgba(0, 0, 0, .3)',
					border: '1px rgba(0, 0, 0, .3) solid',
					color: '#fff',
					selectedBackgroundColor: 'rgba(0, 0, 0, .9)',
					selectedBorder: '1px rgba(0, 0, 0, .9) solid'
				},
				//筛选：
				show_filtrate: false,
				filtrate_id: 1,
				// 
				header: '',
				ceonts: '',
				active_content: '',
				show_info: false,
			}
		},
		onLoad() {
			var that = this
			api.meeting_home({}, function(res) {
				console.log(res)
				if (res.error == '0') {
					// that.activity_id = res.data.active_id
					// that.post_id = res.data.post_id
					that.header = res.data.header
					that.ceonts = res.data.nav
					that.active_content = res.data.nav[0]
				}
			})
		},
		methods: {

			filtrate() {
				console.log('3256')
				this.show_filtrate = true
			},
			// 选中
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
			subscribe() {

				this.show_info = !this.show_info
			},

			handle_item(id) {
				this.filtrate_id = id
				this.show_filtrate = false
			},
			// 
			info_miting() {
				uni.navigateTo({
					url: '/pages/minting_record/minting_record',
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style>
	uni-radio .uni-radio-input {
		border: none;
	}





	/*  */
	.swiper-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #999;
		color: #fff;

	}

	.swiper-box {
		border-radius: 20upx;
		overflow: hidden;
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

	/* &#xe639; */
	.xuanze {
		position: relative;
		padding-right: 20upx;
	}

	.xuanze::before {
		position: absolute;
		right: 0;
		content: '\e639';
		font-family: 'iconfont';
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
		top: 36upx;

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
		top: 50upx;
		width: 36upx;
		border-top: 1px solid rgb(51, 51, 51);
	}
</style>
