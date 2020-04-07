<template>
	<view class="">

		<!-- 第二块 -->
		<view class="padding-top-20 " v-for="item in article" :key="item.news_id" style="border-bottom: 1px solid #e6e6e6;" @tap="item_tap(item)">
			<view class="bold tiny_text two_color" style="overflow: hidden;white-space: nowrap;text-overflow:ellipsis;">
				{{item.title}}
			</view>
			<view class=" x_color x_text padding-top-10 padding-bottom-20 wrpo_center  padding-right">
				<view class="padding-right">
					{{item.views}}万热度
				</view>
				<view class="padding-left">
					{{item.dateline}}
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
			// if (uni.getStorageSync('ulitem')) {
			// 	this.checkedList = uni.getStorageSync('ulitem')
			// 	console.log('有缓存')
			// }
		},
		methods: {
			item_tap(item) {
				// console.log('点击......')
				// console.log(this.$root)
					this.$root.tab(item.news_id)
			}
		}
	}
</script>

<style>
</style>
