<template>
	<view class="">
		<!-- 互动 -->
		<view class="white " style="padding-bottom: 130upx;">
			<!-- v-show="active_id==3" -->

			<view class="padding-top-20 padding-bottom " v-for="item in post_list" :key="item.life_id" @tap.stop="item_tap(item)">
				<view class="wrpo_center">
					<image :src="item.face" mode="" style="height:100upx;width: 100upx;border-radius: 20upx;"></image>
					<view class="margin-left" :style="['height:100upx;display: flex; justify-content:space-between ;',!item.cate_name?'flex-direction: column;':'']">
						<view class="bold two_color" style="font-size:30upx ;">
							{{item.nickname}}
						</view>
						<!-- v-for="item in 3" :key="item" -->
						<view class="" style="display: flex;width: 100%;" v-if="item.cate_name">
							<view class="two_color  " style="font-size: 20upx;background: #e7e7e7;padding: 6upx 10upx;margin-right:20upx ;">
								#{{item.cate_name}}
							</view>
						</view>
					</view>
				</view>

				<view class="bold padding-top-20 margin-bottom-20  two_color more_hideen" style="font-size:30upx ; line-height: 40upx;">
					{{item.content}}
				</view>
				<view class="" v-if="item.thumb">
					<image :src="item.thumb" mode="" style=" height: 300upx;width: 100%;"></image>
				</view>

				<view class=" x_color x_text padding-top-10 padding-bottom-20 wrpo_center  ">
					<view class="" style="flex: 1;">
						{{item.dateline}}
					</view>
					<view class="margin-left flex_between wrpo_center" style="width: 50%;">
						<view class=" wrpo_center">
							<image :src="exe" mode="" class="margin-right-10" style=" height: 25upx;width:35upx;"></image>{{item.views}}
						</view>
						<view class=" wrpo_center">
							<image :src="xin" mode="" class="margin-right-10" style=" height: 25upx;width: 30upx;"></image>{{item.is_zan}}
						</view>
						<view class=" wrpo_center">
							<image :src="pl" mode="" class="margin-right-10" style=" height: 25upx;width: 28upx;"></image>{{item.comment_num}}
						</view>
					</view>
				</view>
			</view>
			<slot name="btn"></slot>
			<view class="flex_center" style="position: fixed;left: 0;bottom:0; font-size:34upx;background: #f92727; width: 100%;height:100upx;color: #FFFFFF;"
			 @tap="life()" v-if=" type=='hudong' || type=='xianshang'">
				<view class="wrpo_center" style="align-items: flex-end;">
					<image :src="tab_hudong" mode="" class="margin-right-10" style="height:50upx;width:50upx"></image>
					<view class="padding-left-10">
						去发帖
					</view>
				</view>
			</view>
			<!-- 	<view class="flex_center" style="position: fixed;left: 0;bottom:0; font-size:34upx;background: #f92727; width: 100%;height:100upx;color: #FFFFFF;"
			 @tap="life()" v-if="type=='jiankang'">
				<view class="wrpo_center " style="align-items: flex-end;">
					<image :src="tab_hudong" mode="" class="margin-right-10" style="height:50upx;width:50upx"></image>
					<view class="padding-left-10">
						去发帖
					</view>
				</view>
			</view> -->
			<!-- <view class="flex_center" style="position: fixed;left: 0;bottom:0; font-size:34upx;background: #f92727; width: 100%;height:100upx;color: #FFFFFF;"
			 @tap="life()" v-if="type=='resource'">
				<view class="wrpo_center " style="align-items: flex-end;">
					<image :src="tab_hudong" mode="" class="margin-right-10" style="height:50upx;width:50upx"></image>
					<view class="padding-left-10">
						我的资源
					</view>
				</view>
			</view>
			<view class="flex_center" style="position: fixed;left: 0;bottom:0; font-size:34upx;background: #f92727; width: 100%;height:100upx;color: #FFFFFF;"
			 @tap="life()" v-if="type=='resource1'">
				<view class="wrpo_center " style="align-items: flex-end;">
					<image :src="tab_hudong" mode="" class="margin-right-10" style="height:50upx;width:50upx"></image>
					<view class="padding-left-10">
						寻找资源
					</view>
				</view>
			</view> -->
			<!--  -->
			<view class="flex_between" v-if=" type!='hudong'" style="position: fixed;left: 0;bottom:0; font-size:34upx;background: #f92727; width: 100%;height:100upx;color: #FFFFFF;">
				<view class="flex_center" style="flex:1" @tap="life(item.url)" v-for="item in url" :key="item.url">
					<view class="wrpo_center " style="align-items: flex-end;">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>


<script>
	export default {
		props: {
			post_list: {
				// type:Number
			},
			type: {
				type: String
			},
			// post_id: {

			// },
			url: {

			},
			outline: {

			}
		},
		data() {
			return {
				// 互动
				exe: require('../../static/imgs/icoImg/hd_exe.png'),
				xin: require('../../static/imgs/icoImg/hd_xin.png'),
				pl: require('../../static/imgs/icoImg/hd_pl.png'),
				tab_hudong: require('../../static/imgs/icoImg/tab_hudong.png'),

			}
		},
		onLoad() {

		},
		methods: {
			item_tap(item, ) {
				console.log(item)
				this.$root.hudongs(item)

			},
			life(path) {
				console.log('hkasdhaskdhlafhasd;as5555555555555555555')
					console.log(this.outline.life)
				if (path) {
					let url = path
					// #ifdef H5
					window.location.href = url;
					// #endif
					// #ifdef MP-WEIXIN
					wx.navigateTo({
						url: '../outline/outline?url=' + url,
					})
					// #endif
				} else if (this.type == 'hudong') {
					console.log(this.outline.life)
					let urls = this.outline.life;
					// var url = 'https://www.zhongdaogy.com/life/lifes/pages/posttie/index?from=life&cate_id=' + this.post_id;
					// #ifdef H5
					window.location.href = urls;
					// #endif
					// #ifdef MP-WEIXIN
					wx.navigateTo({
						url: '../outline/outline?url=' + urls,
					})
					// #endif
				}
				
			}
		}
	}
</script>

<style>
	.text_hidden {
		/* height: 5em; */
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 5;
		overflow: hidden;
	}
</style>
