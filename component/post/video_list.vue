<template>
	<view class="">
		<view class="padding-top-20 " v-for="item in video_list" :key="item.news_id" style="border-bottom: 1px solid #e6e6e6;"
		 @tap="tap_item(item)">
			<view class="" style="width:100%">
				<image :src="item.thumb" style="width:100%;height:180px;" mode=""></image>
			</view>

			<!-- 	<video id="myVideo" style="width:100% ;height:180px;margin:0" src="https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4"
			 @error="videoErrorCallback" controls></video> -->
			<!-- :poster="video_src.thumb -->
			<!-- :danmu-list="danmuList" -->
			<!-- controls -->
			<!-- danmu-btn  -->
			<!-- enable-danmu -->
			<!-- <view class=""> -->
			<!-- <video id="myVideo" src="https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4"
			                    @error="videoErrorCallback" :danmu-list="danmuList" enable-danmu danmu-btn controls></video> -->
			<view class="bold padding-top-10 padding-bottom-10  two_color" style="font-size:30upx ; line-height: 40upx;overflow: hidden;white-space: nowrap;text-overflow:ellipsis;">
				{{item.title}}
			</view>
			<view class=" x_color x_text padding-top-10 padding-bottom-20 wrpo_center ">
				<view class="">
					活动时间：{{item.dateline}}
				</view>
				<!-- <view class="margin-left">
					活动时间：2019.12.11
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			video_list: {
				// type:Number
			}
		},
		data() {
			return {
				// 互动

			}
		},
		onLoad() {
			// if (uni.getStorageSync('ulitem')) {
			// 	this.checkedList = uni.getStorageSync('ulitem')
			// 	console.log('有缓存')
			// }
		},
		//  onReady: function(res) {
		//   console.log(res)
		//       // #ifndef MP-ALIPAY
		//       this.videoContext = uni.createVideoContext('myVideo')
		//       // #endif

		//   },
		methods: {
			//视频//
			// videoErrorCallback: function(e) {
			// 	uni.showModal({
			// 		content: e.target.errMsg,
			// 		showCancel: false
			// 	})
			// },
			tap_item(item) {
				console.log(item)
				this.$root.tab(item.news_id)

			}
		}
	}
</script>

<style>
</style>
