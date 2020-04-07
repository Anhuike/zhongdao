<template>
	<view class="">
		<view class="" v-for="son in list" :key="son.news_id">
			<view class="padding-top padding-bottom" style="border-bottom:1px solid #eee ;" @tap="unbind(son)">
				<view class="" style="height:150px;width:100%">
					<image :src="son.thumb" style="height:150px;width:100%" mode=""></image>
				</view>
				<view class="">
					<view class="tiny_text bold padding-top-10 padding-bottom-10  text_hidden">
						{{son.title}}
					</view>
					<view class="x_text vice-color" style="">
						{{son.content}}
						<!-- <view class="" style="white-space: nowrap;display: inline-block;color: #5073BD;" @tap.stop="more(son)">
								查看详情
							</view> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
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
				src: require('../../static/imgs/Graph/zhengshang.png'),
			}
		},
		methods: {
			unbind(son) {
				var url = son.url
				// #ifdef H5
				window.location.href = url;
				// #endif

				// #ifdef MP-WEIXIN
				wx.navigateTo({
					url: '../outline/outline?url=' + url,
				})
				// #endif;
				// #ifdef H5
				window.location.href = url;
				// #endif

				// #ifdef MP-WEIXIN
				wx.navigateTo({
					url: '../outline/outline?url=' + url,
				})
				// #endif
			}
			// item_tap(item) {
			// 	console.log(item)
			// 	this.$root.tab(item.news_id)

			// },
		}
	}
</script>

<style>
</style>
