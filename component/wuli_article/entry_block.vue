<template>
	<view class="">
		<view class=" margin-bottom borders padding-left padding-right" v-for="item in focusData" :key="item.prj_name">
			<view class="" @tap="projectDetails(item.prj_id)">
				<!-- 	<video src="https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4" style="height: 200px;width:100%;" controls></video> -->
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
						<!-- is_collect -->
						<image :src="item.is_collect==1?shoucang:shoucang1" style="height: 40upx;width: 40upx;" mode="" @tap.stop="collect(item.is_collect,item.prj_id)"></image>
						<!-- is_zan -->
						<image :src="item.is_zan==1?zan:zan1" style="height: 40upx;width:40upx;" mode="" @tap.stop="is_zan(item.is_zan,item.prj_id)"></image>
						<image :src="fenx" style="height:40upx;width:40upx;" mode="" @tap.stop="fenxiang(item)"></image>
						<view class="text-center x_text active solid" style="padding:0 16upx;border-radius: 50upx;line-height: 40upx;"
						 @tap.stop="is_call(item)">
							想合作
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
		import api from '../../api/api.js';
	import "../../style/com_icon.css";
	export default {
		props: {
			focusData: {
				// type:Number
			},
			index_s: {

			},
			type: {
				type: String
			}
		},

		data() {
			return {
				// src: require('../../static/imgs/Graph/zhengshang.png'),
					fenx: require('../../static/imgs/icon_fenxiang@2x.png'),
				zan1: require('../../static/imgs/zan1.png'),
				shoucang1: require('../../static/imgs/shoucang1.png'),
				zan: require('../../static/imgs/zan.png'),
				shoucang: require('../../static/imgs/shoucang.png'),
			}
		},
		methods: {
			// 项目详情
			projectDetails(conpany_id) {
				uni.navigateTo({
					url: "/pages/project_details/project_details?id=" + conpany_id,
				});
			}, // 收藏
			collect(v, id) {
				console.log('收藏', v, id)
				// console.log(v)
				if (v == 0) {
					v = 1
				} else {
					v = 0
				}
				var that = this
				console.log(that.focusData)
				var params = {
					'status': v,
					'prj_id': id
				};
				api.collect(params, function(res) {
					console.log(res)
					if (res.error == '0') {
						for (let i = 0; i < that.focusData.length; i++) {
							if (id == that.focusData[i].prj_id) {
								console.log(that.focusData)
								console.log(v)
								that.focusData[i].is_collect = v
							}
						}
					} else {
						uni.showToast({
							icon: 'none',
							title: res.message
						})
					}
				})

			}, // 赞
			is_zan(v, id) {

				if (v == 0) {
					v = 1
				} else {
					v = 0
				}
				var that = this
				var params = {
					'status': v,
					'prj_id': id
				};
				api.zan(params, function(res) {
					console.log(res)
					if (res.error == '0') {
						for (let i = 0; i < that.focusData.length; i++) {
							if (id == that.focusData[i].prj_id) {
								that.focusData[i].is_zan = v
							}
						}
					} else {
						uni.showToast({
							icon: 'none',
							title: res.message
						})
					}
				})

			}, // 查看详情
			handleDetails() {
				console.log("查看详情")
			}, // 想合作
			is_call(item) {
				var that = this
				uni.makePhoneCall({
					phoneNumber: item.responsible_mobile, //仅为示例
				});
			},
			// 分享
			fenxiang(item) {
				// console.log(item)
				this.$emit('share',item)

			},
		}
	}
</script>

<style>
	.active {
		color: #fff;
		background: rgb(252, 54, 43);
		border: none;
	}
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
</style>
