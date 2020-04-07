<template>
	<view class="">
		<view class="padding-top-20 padding-bottom-20" v-for="i in highp" :key="i.news_id" @tap="item_tap(i)">
			<view class="flex_between ">
				<view class="" style="height: 200upx;width:300upx;position: relative;">
					<view class="flex_center cente_img" style="height: 100%;width:100%;" v-if="shipin=='video'&&i.type==1">
						<image :src="stop" style="height: 80upx;width:80upx;"></image>
					</view>
					<image :src="i.thumb" mode="" style="height: 200upx;width:300upx"></image>
				</view>
				<view class="margin-left align_between" style="flex: 1;">
					<view class="bold padding-top-10 padding-bottom-10 tiny_text two_color hidden_text">
						{{i.title}}
					</view>
					<view class="wrpo_center x_color x_text">
						<view class="" style="flex: 2;">
							{{i.comments}}人跟帖
						</view>
						<view class="" style="flex: 3;">
							{{i.views}}人阅读
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			highp: {
				// type:Number
			},
			index_s: {

			},
			type:{
				type:String
			},
			shipin:{
				
			}
		},

		data() {
			return {
				stop: require('../../static/imgs/icoImg/stop.png'),
				src: require('../../static/imgs/Graph/zhengshang.png'),
			}
		},
		methods: {
			item_tap(item) {
				console.log(item)
				this.$root.tab(item.news_id)

			},
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
</style>
