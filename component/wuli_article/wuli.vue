<template>
	<view class="">
		<view class="margin-bottom" style="display: flex;" v-for="item in wuil_list" :key="item.news_id" @tap="item_tap(item.news_id)">
			<view class="" style="position:relative; width: 40%;height: 180upx;">

				<view class="flex_center cente_img" style="height: 100%;width:100%;">
					<image :src="stop" style="height: 80upx;width:80upx;"></image>
				</view>
				<image :src="item.thumb" mode="" style="height: 180upx;width:100%;"></image>
			</view>
			<view class="margin-left-20 cont_right" style="height: 180upx;flex: 1;">
				<view class="tiny_text two_color bold content_text video_title" style="">
					{{item.title}}
				</view>
				<view class="flex_between end_flex">
					<view class=" x_color x_text" style="">
						{{item.views}}人评价
					</view>
					<!-- Not_Done underway -->
					<!-- 未直播  直播中 -->
					<!-- <view v-if="index_s==3" class="tiny_text underway padding-left-20 padding-right-20 radius-50" style="line-height: 50upx;">
						直播中
					</view> -->
				</view>

			</view>
		</view>

	</view>
</template>


<script>
	export default {
		props: {
			wuil_list: {
				// type:Number
			},
			index_s: {

			},
		},
		data() {
			return {
				// 互动
				stop: require('../../static/imgs/icoImg/stop.png'),
				exe: require('../../static/imgs/icoImg/hd_exe.png'),
				
				pl: require('../../static/imgs/icoImg/hd_pl.png'),
				tab_hudong: require('../../static/imgs/icoImg/tab_hudong.png'),

			}
		},
		onLoad(index_s) {
			console.log(index_s, this.index_s, '子页面接受')
			// if (uni.getStorageSync('ulitem')) {
			// 	this.checkedList = uni.getStorageSync('ulitem')
			// 	console.log('有缓存')
			// }
		},
		methods: {
			item_tap(news_id) {
				console.log(news_id)
				this.$root.tab(news_id)		  
				console.log(this.$parent,this.$root,this.wuil_list);
			
			// 	   this.$emit("child1-event",this.wuil_list);
			}
		}
	}
</script>

<style>
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
		background-color: #0CC373;
		color: #fff;
	}

	.Not_Done {
		background-color: rgb(230, 230, 230, .5);
		color: rgb(51, 51, 51);
	}
</style>
