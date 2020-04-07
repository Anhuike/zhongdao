<template>
	<view class="">
		<view class="margin-bottom" style="display: flex;" v-for="item in wuil_list" :key="item.news_id" @tap="item_tap(item)">
			<view class="" style=" width: 40%;height: 180upx;">
			
				<image :src="item.thumb" mode="" style="height: 180upx;width:100%;border-radius: 20upx;"></image>
			</view>
			<view class="margin-left-20 cont_right" style="height: 180upx;flex: 1;">
				<view class="tiny_text two_color bold content_text video_title">
					{{item.title}}
				</view>
				<view class="x_text x_color flex_between">
					<view class="">
						{{item.starttime}}
					</view>
					<view class="">
						{{item.week}}
					</view>
					<view class="">
						{{item.peopleNum}}人参加
					</view>
				</view>
				<view class="flex_between end_flex">

					<!-- Not_Done underway -->

					<!-- 未直播  预约 -->

					<!-- v-if="index_s==3" -->
					<view v-if="item.state== '0'" class="tiny_text underway padding-left padding-right  radius-50" style="padding-top:8upx; padding-bottom:8upx"
					 @tap.stop="appoint(item)">
						{{item.btn}}
						<!-- 1已签到 2已预约 0预约 3看回放 -->
					</view>
					<view v-if="item.state== '2'" class="tiny_text Not_Done padding-left padding-right  radius-50" style="padding-top:8upx; padding-bottom:8upx"
					 @tap.stop="appoint(item)">
						{{item.btn}}
					</view>
					<view v-if="item.state== '3'" class="tiny_text Playback padding-left padding-right  radius-50" style="padding-top:8upx; padding-bottom:8upx"
					 @tap.stop="appoint(item)">
						{{item.btn}}
					</view>
					<view v-if="item.state== '1'" class=" tiny_text Not_Done padding-left padding-right  radius-50" style="padding-top:8upx; padding-bottom:8upx"
					 @tap.stop="appoint(item)">
						{{item.btn}}
						<!-- 已签到 -->
					</view>
					<view class="x_color icon-fenxiang fenxiang " style="line-height: 50upxpx;font-family: 'iconfont';font-size:32upx">

					</view>
				</view>

			</view>
		</view>

	</view>
</template>


<script>
	import "../../style/com_icon.css";

	export default {
		components: {

		},
		props: {
			wuil_list: {
				// type:Number
			},
			index_s: {

			},
			type_data: {

			}
		},
		data() {
			return {
				show_info: false,
				// 互动
				stop: require('../../static/imgs/icoImg/stop.png'),
				exe: require('../../static/imgs/icoImg/hd_exe.png'),

				pl: require('../../static/imgs/icoImg/hd_pl.png'),
				tab_hudong: require('../../static/imgs/icoImg/tab_hudong.png'),

			}
		},

		methods: {
			// 
			// 
			item_tap(item) {
				console.log(item, this.type_data)
				uni.navigateTo({
					url: '/pages/appointment/appointment?id=' + item.id,
				})
			
			},

			// 预约
			appoint(item) {
				console.log(item)

				if (item.state == 0) {
					this.$root.subscribe()
				}else if(item.state==1){
					this.item_tap(item)
				} if(item.state==3){
					this.item_tap(item)
				}else if(item.state==3){
					this.item_tap(item)
				}
				// <!--0预约  1已签到 2取消预约  3看回放 -->
				// switch (cate) {
				// 	case 0:
				// 		break;
				// 	case 1:
				// 		break;
				// 	case 2:
				// 		break;
				// 	case 3:
				// 		break;
				// 	default:
				// 		break;
				// }
				// uni.navigateTo({
				// 	url: '/pages/appointment/appointment',
				// })
			},
			// 取消预约
			cancel(item){
				api.meeting(item.id, function(res) {
					console.log(res)
					if (res.error == 0) {
						this.$root.subscribe()
						uni.showToast({
							title: res.message,
							duration: 2000,
						});
					}
				})
			}
		}
	}
</script>

<style>
	.fenxiang {}

	.fengxian::before {
		content: '\E630';
	}

	.cente_img {
		height: 160upx;
		width: 40%;
		position: absolute;
		top: 0;
		background-color: rgb(65, 63, 63, .2);
		z-index: 88;
	}

	.cont_right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.content_text {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2; //控制行数
		overflow: hidden;
	}


	.underway {
		background-color: #f92727;
		color: #fff;
	}

	.Not_Done {
		background-color: rgb(230, 230, 230, .5);
		color: rgb(51, 51, 51);
	}

	.Playback {
		background-color: #FFF;
		box-sizing: border-box;
		border: 1upx solid #f92727;
		color: #f92727;
		border-radius: 50upx;
	}
</style>
