<template>
	<view class="">
		<view class="" style="padding-top: 44px;">

		</view>
		<view class="flex_between wrpo_center title_s">
			<view class=" back-left" @tap="back()">
				<!-- 完成 -->
			</view>
			<view class="middle_text">
				<!-- {{order.orderTitle}} -->
				我的推广
			</view>
			<view class="middle_text">
			</view>
		</view>
		<!--  -->
		<mescroll-uni ref="mescrollRef" @init="mescrollInit" top="44px" :down="downOption" @down="downCallback" :up="upOption"
		 @up="upCallback" @emptyclick="emptyClick">
			<view class="margin-top-20" v-for="item in dataList" :key="item.prj_id" @tap="item_tap(item)">
				<view class="padding" style="background: #fff;">
					<view class="">
						{{item.prj_name}}
					</view>
					<view class="padding-top padding-bottom flex_between" style="border-bottom:2px solid #F6F6F6">
						<view class="padding-right-10 hidden_ tiny_text " style="flex:1">
							{{item.prj_abbre}}
						</view>
						<image :src="item.thumb1" mode="" style="width: 120px;height: 112px"></image>
					</view>
					<view class="padding-top " style="display: flex;justify-content: flex-start;">
						<!-- v-for="item in 4" :key="item" -->
						<view class="margin-right x_color x_text" style="display: flex;">
							<view class="two_color x_text padding-right-10">{{item.attentions}}</view> 关注
						</view>
						<view class="margin-right x_color x_text" style="display: flex;">
								<view class="two_color x_text padding-right-10">{{item.collect}}</view>  收藏
						</view>
						<view class="margin-right  x_color x_text" style="display: flex;">
							<view class="two_color x_text padding-right-10">{{item.views}}</view> 浏览
						</view>
						<view class="margin-right x_color x_text" style="display: flex;">
							<view class="two_color x_text padding-right-10">{{item.deal}}</view> 成交
						</view>

					</view>
				</view>
			</view>

		</mescroll-uni>


	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/components/mescroll-uni/mixins/mescroll-more-item.js";
	import "../../style/com_icon.css";
	import api from '../../api/api.js';
	export default {
		mixins: [MescrollMixin, MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
		data() {
			return {
				xiaolian: require('../../static/imgs/icoImg/xiaolian.png'),
				list: [],
				// 下拉刷新的配置
				downOption: {
					use: true, // 是否启用下拉刷新; 默认true
					auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
					native: false // 启用系统自带的下拉组件,默认false;仅mescroll-body生效,mescroll-uni无效
				},
				// 上拉加载的常用配置
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
					auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 5 // 每页数据的数量,默认10
					},
					noMoreSize: 1, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据'
					}
				},
				// 列表数据
				dataList: []
			}
		},
		created() {
			
		},

		methods: {
			item_tap(item) {
				uni.navigateTo({
					url: '/pages/manage_list/manage_list?prj_id='+item.prj_id+'&name='+item.prj_name
				})
			},

			downCallback() {
				var that = this
				this.mescroll.resetUpScroll()
			},
			/*上拉加载的回调*/
			upCallback(page) {
				var that = this
				let List = []
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条

				api.generalize({
					page: page.num,
					size: 5,
				}, function(res) {
					console.log(res.data)
					if (res.error == 0) {
						List = res.data
						setTimeout(() => {
							if (page.num == 1) {
								that.dataList = [];
							} //如果是第一页需手动制空列表
							that.dataList = that.dataList.concat(List)
							that.mescroll.endSuccess(List);
						}, 1000)
						// that.mescroll.endSuccess()
					} else {
						// console.log('请求失败,隐藏加载状态')
						// 请求失败,隐藏加载状态
						that.mescroll.endErr()
					}
				})
			},
			
			back() {
			
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style>
	page {
		background: rgb(240, 240, 240);
	}


	.item_list {
		display: flex;
		justify-content: space-between;
		font-size: 16px;
	}

	.text_center {
		display: flex;
		align-items: center;

	}

	/*  */
	.title_s {
		background-color: #fff;
		height: 44px;
		width: 100vw;
		position: fixed;
		top: 0;
		z-index: 99999;
		/* color: #fff; */
		padding: 0px 10px 3px;

		box-sizing: border-box;
	}

	.status_bar {
		/* height: var(--status-bar-height); */
		width: 100%;
		height: var(--status-bar-height);
	}

	/*  */
	.middle_text {
		/* min-width: 2em; */
		height: 1.5em;
		font-size: 16px;
		/* font-weight: 600; */
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		align-items: center;
	}

	.back-left {
		/* width: 20px;
		height: 20px; */
		font-size: 20px;
		font-family: 'iconfont';
		text-decoration: none;
		text-align: center;
		vertical-align: top;
	}

	.back-left::before {
		content: '\e611';
		font-family: 'iconfont';
		text-align: center;
	}

	.more-right {
		/* width: 20px;
		height: 20px; */
		font-size: 20px;
		font-family: 'iconfont';
		text-decoration: none;
		text-align: center;
	}

	.more-right::before {
		content: '\e61c';
		font-family: 'iconfont';
		text-align: center;
	}
	
	.hidden_{
		
		overflow: hidden;
		    text-overflow: ellipsis;
		    display: -webkit-box;
		    -webkit-box-orient: vertical;
		    -webkit-line-clamp: 5;
	}
</style>
