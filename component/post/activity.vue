<template>
	<view class="">
		<!-- 活动 -->
		<view class="white " style="padding-bottom:130upx;">
			<view class="padding-top-20 padding-bottom " v-for="item in article" :key="item.news_id" @tap="item_tap(item)">
				<view class="wrpo_center">
					<image :src="item.face" mode="" style="height:100upx;width: 100upx;border-radius: 20upx;"></image>
					<view class="margin-left  wrpo_center " style=" height:100upx;width: calc(100% - 130upx);">
						<view class=" flex_between" style="width:100%;align-items: center">
							<view class="bold two_color" style="font-size:30upx ;">{{item.nickname}}</view>
							<view class="x_color x_text">
								{{item.dateline}}
							</view>
						</view>
					</view>
				</view>

				<view class="margin-top">
					<image :src="item.thumb" mode="" class="" style=" height:300upx;width: 100%;margin:0 ;"></image>
				</view>
				<view class="bold padding-top-20 padding-bottom-20  two_color" style="font-size:30upx ; line-height: 40upx;">

					{{item.title}}
				</view>
				<view class=" x_color x_text padding-top-10 padding-bottom-20 wrpo_center  ">

					<view class="" style="display: flex;width: 100%;">
						<!-- v-for="item in 3" :key="item" -->
						<view class="two_color  x_text" style="border-radius:10upx ; padding: 6upx 10upx;margin-right:20upx ;border: 1upx solid #E6E6E6;color:#fc362b">
							#{{item.cate_name}}
						</view>
					</view>
				</view>
			</view>
			<view class="flex_center" style="position: fixed;left: 0;bottom:0; font-size:34upx;background: #f92727; width: 100%;height:100upx;color: #FFFFFF;"
			 @tap="community()">
				<view class="wrpo_center" style="align-items: flex-end;">
					<image :src="tab_huodong" mode="" class="margin-right-10" style="height:50upx;width:50upx;"></image>
					<view class="padding-left-10">
						发活动
					</view>
				</view>
			</view>
		</view>
	</view>
</template>


<script>
	export default {
		props: {
			article: {
				// type:Number
			},
			activity_id:{
				
			},
			outline:{
				
			}
		},
		data() {
			return {
				// 互动
				exe: require('../../static/imgs/icoImg/hd_exe.png'),
				xin: require('../../static/imgs/icoImg/hd_xin.png'),
				pl: require('../../static/imgs/icoImg/hd_pl.png'),
				tab_hudong: require('../../static/imgs/icoImg/tab_hudong.png'),
				tab_huodong: require('../../static/imgs/icoImg/tab_huodong.png'),
			}
		},
		onLoad() {

			// if (uni.getStorageSync('ulitem')) {
			// 	this.checkedList = uni.getStorageSync('ulitem')
			// 	console.log('有缓存')
			// }
		},
		methods: {
			item_tap(item) {

				console.log('665465435')
				if (item.status == 1) {
					// 预约
					uni.navigateTo({
						url: '/pages/appointment/appointment?news_id=' + item.news_id
					})
				} else {
					uni.navigateTo({
						url: '/pages/playback/playback?news_id=' + item.news_id
					})
				}

			},
			community() {
				var url = this.outline.community;
				// #ifdef H5
				window.location.href = url;
				// #endif

				// #ifdef MP-WEIXIN
				wx.navigateTo({
					url: '../outline/outline?url=' + url,
				})
				// #endif
			}
		}
	}
</script>

<style>
</style>
