<template>
	<view class="">

		<!-- 第一块 -->
		<!-- <view class="padding-top-20 padding-bottom-20">
			<view class="bold padding-top-10 padding-bottom-10 tiny_text two_color" style="line-height: 50upx;">
				寻找100为新娘，看看他们作为军人的女人有什么幸福感？
			</view>
			
			<view class=" x_color x_text padding-top-10 padding-bottom-10 wrpo_center flex_between padding-right">
				<view class="padding-left padding-right  " style="padding-bottom:6upx;padding-top:6upx;border:1upx solid #e6e6e6; border-radius: 0 50upx 50upx ;">
					幸福的秘密
				</view>
				<view class="wrpo_center ">
					<image :src="pinlun" mode="true" style="height:40upx ;width:40upx;margin-right:10upx;"></image>134
				</view>
				<view class="padding-right wrpo_center">
					<image :src="zan" mode="true" style="height:40upx ;width:40upx;margin-right:10upx;"></image>63
				</view>
			</view>
		</view>
 -->
		<!-- <view class="padding-top-20 padding-bottom-20">
			<view class="bold padding-top-10 padding-bottom-10 tiny_text two_color" style="line-height: 50upx;">
				寻找100为新娘，看看他们作为军人的女人有什么幸福感？
			</view>
			<view class="flex_between wrpo_center">

				<view class="" v-for="item in 3" :key="item" style="">
					<image :src="img_s" mode="" style="height: 200upx;width:200upx"></image>
				</view>
			</view>
			<view class=" x_color x_text padding-top-10 padding-bottom-10 wrpo_center flex_between padding-right">
				<view class="padding-left padding-right  " style="padding-bottom:6upx;padding-top:6upx;border:1upx solid #e6e6e6; border-radius: 0 50upx 50upx ;">
					幸福的秘密
				</view>
				<view class="wrpo_center ">
					<image :src="pinlun" mode="true" style="height:40upx ;width:40upx;margin-right:10upx;"></image>134
				</view>
				<view class="padding-right wrpo_center">
					<image :src="zan" mode="true" style="height:40upx ;width:40upx;margin-right:10upx;"></image>63
				</view>
			</view>
		</view>
 -->
		<view class=" padding-top-20 padding-bottom-20 " v-for="item in article" :key='item.news_id' @tap.stop="tuijian(item)">
			<view class=" flex_between">


				<view class="bold padding-top-10 padding-bottom-10 tiny_text two_color text_hidden" style="line-height: 50upx;">
					{{item.title}}
				</view>

				<image :src="item.thumb" mode="" class="margin-left" style="height: 200upx;width:200upx;"></image>

				<!-- <view class="flex_between wrpo_center">
				<view class="" v-for="item in jieduImg" :key="item.src" style="">
					<image :src="item.src" mode="" style="height: 200upx;width:200upx"></image>
				</view>
			</view> -->
			</view>
			<view class=" x_color x_text padding-top-10 padding-bottom-10 wrpo_center flex_between padding-right">
				<view class="padding-left padding-right  " style="padding-bottom:6upx;padding-top:6upx;border:1upx solid #e6e6e6; border-radius: 0 50upx 50upx ;">
					{{item.cate_name}}
				</view>
				<view class="wrpo_center ">
					<image :src="pinlun" mode="true" style="height:40upx ;width:40upx;margin-right:10upx;"></image>{{item.comments}}
				</view>
				<!-- <view class="padding-right wrpo_center">
					<image :src="zan" mode="true" style="height:40upx ;width:40upx;margin-right:10upx;"></image>{{item.zans}}
				</view> -->
			</view>
		</view>

		<!-- <view class="padding-top-20 padding-bottom-20">
			<view class="bold padding-top-10 padding-bottom-10 tiny_text two_color" style="line-height: 50upx;">
				寻找100为新娘，看看他们作为军人的女人有什么幸福感？
			</view>
			
			<view class=" x_color x_text padding-top-10 padding-bottom-10 wrpo_center flex_between padding-right">
				<view class="padding-left padding-right  " style="padding-bottom:6upx;padding-top:6upx;border:1upx solid #e6e6e6; border-radius: 0 50upx 50upx ;">
					幸福的秘密
				</view>
				<view class="wrpo_center ">
					<image :src="pinlun" mode="true" style="height:40upx ;width:40upx;margin-right:10upx;"></image>134
				</view>
				<view class="padding-right wrpo_center">
					<image :src="zan" mode="true" style="height:40upx ;width:40upx;margin-right:10upx;"></image>63
				</view>
			</view>
		</view> -->
	</view>
</template>


<script>
	export default {
		props: {
			article: {
				// type:Number
			},
			index_s: {

			}
		},
		data() {
			return {
				jieduImg: [{
					src: require('../../static/imgs/Graph/zhongdao.png')
				}, {
					src: require('../../static/imgs/Graph/zhuanjia.png')
				}, {
					src: require('../../static/imgs/Graph/zhengshang.png')
				}],
				img_s: require('../../static/imgs/Graph/zhuanjia.png'),
				zan: require('../../static/imgs/icoImg/shallow_zan.png'),
				zan1: require('../../static/imgs/zan.png'),
				pinlun: require('../../static/imgs/icoImg/shallow_pinglun.png'),
				active_btn: require('../../static/imgs/icoImg/active_btn.png'),
				// 互动
				// exe: require('../../static/imgs/icoImg/hd_exe.png'),
				// xin: require('../../static/imgs/icoImg/hd_xin.png'),
				// pl: require('../../static/imgs/icoImg/hd_pl.png'),
				// tab_hudong: require('../../static/imgs/icoImg/tab_hudong.png'),

			}
		},
		onLoad() {
			// if (uni.getStorageSync('ulitem')) {
			// 	this.checkedList = uni.getStorageSync('ulitem')
			// 	console.log('有缓存')
			// }
		},
		methods: {
			tuijian(item) {
				console.log('点击......',this.$root)
				this.$root.tab(item.news_id)
				// wx.navigateTo({
				// 	url: '../postdetails/postdetails?news_id=' + item.news_id,
				// })

			}
		}
	}
</script>

<style>
	.text_hidden {
		height: 100%;
		flex: 1;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
	}
</style>
