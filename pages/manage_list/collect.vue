<template>
	<view class="">
		<mescroll-uni ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback"
		 @emptyclick="emptyClick">
			<view class="padding margin-bottom" style="background: #fff;padding-bottom: 0;" v-for="item in dataList" :key="item.prj_id">
				<view class="flex_between wrpo_center padding-bottom" style="border-bottom:1px solid #F0F0F0;">
					<image :src="xiaolian" class="img" mode=""></image>
					<view class="small_text padding-left hiden_name" style="flex: 1;">
						{{item.nickname}}
					</view>
					<button class="tiny_text  " :class="item.is_status!=0?'x_color':'button_back'" @tap="handle_statuss(item)">{{item.is_status==0?'关注':(item.is_status==1?'已关注':'互相关注')}}</button>
				</view>
				<view class=" x_color padding-bottom padding-top" style="padding-left:90rpx;">
					<view class="flex_between" style="line-height: 1.8em;">
						<view class="" style="line-height: 1.8em;">
							成交金额
						</view>
						<view class="padding-left" style="line-height: 1.8em; flex: 1;color: #F92727">
							{{item.amount}}
						</view>
						<view class=" right_" style="line-height: 1.8em;">
							RMB
						</view>
					</view>
					<view class="flex_between" style="line-height: 1.8em;">
						<view class="" style="line-height: 1.8em;">
							分润金额
						</view>
						<view class="padding-left" style="line-height: 1.8em; flex: 1;color: #F92727;">
							{{item.profit}}
						</view>
						<view class=" right_" style="line-height: 1.8em;">
							RMB
						</view>
					</view>
					<view class="flex_between" style="line-height: 1.8em;">
						<view class="" style="line-height: 1.8em;">
							成交时间
						</view>
						<view class="padding-left" style="line-height: 1.8em; flex: 1;">
							{{item.dateline}}
						</view>
						<view class=" right_" style="line-height: 1.8em;">
							北京时间
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
		props: {
			tabs: Array,
			prj_id:String
		},
		data() {
			return {
				word: '',
				xiaolian: require('../../static/imgs/icoImg/xiaolian.png'),
				list: [],
				// 下拉刷新的配置
				downOption: {
					// use: true, // 是否启用下拉刷新; 默认true
					auto: false, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
					// native: false // 启用系统自带的下拉组件,默认false;仅mescroll-body生效,mescroll-uni无效
				},
				// 上拉加载的常用配置
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
					auto: false, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 7 // 每页数据的数量,默认10
					},
					noMoreSize: 7, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据'
					}
				},
				// 列表数据
				dataList: []
			}
		},
		created() {
			// var that = this
			// api.manage({}, function(res) {
			// 	if (res.error == 0) {
			// 		that.dataList = res.data.data
			// 		console.log(that.dataList)
			// 	}
			// })
			// //
		},

		methods: {
			item_tap() {
				uni.navigateTo({
					url: ''
				})
			},
			handle_statuss(data) {
				var that = this
				console.log(data, this.word)
				var nwes_is_status
				if (data.is_status != 0) {
					nwes_is_status = 0
				} else {
					nwes_is_status = 1
				}
				if (data.is_status != 0) {
					uni.showModal({
						title: '提示',
						content: '您确定取消关注' + data.nickname + '吗？',
						success: function(res) {
							if (res.confirm) {
								// console.log('用户点击确定');
								that.tap_status(data, nwes_is_status)
							} else if (res.cancel) {
								// console.log('用户点击取消');
							}
						}
					});
				} else {
					that.tap_status(data, nwes_is_status)
				}
			},
			tap_status(data, nwes_is_status) {
				var that = this
				api._follow({
					can_id: data.uid,
					status: nwes_is_status
				}, function(res) {
					if (res.error == 0) {
						that.dataList.forEach((items, index, array) => {
							if (items.uid == data.uid) {
								items.is_status = res.data
							}
						})
					} else {

					}
				})
			},

			downCallback() {
				var that = this

				this.mescroll.resetUpScroll()
			},
			/*上拉加载的回调*/
			upCallback(page) {
				var that = this
				// var itemTitle = that.tabs[that.i]
				var keyword = this.tabs[this.i]
				that.word = keyword
				let List = []
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
			
				api.getOnelist({
					status: keyword,
					page: page.num,
					prj_id:that.prj_id
				}, function(res) {
					console.log(res, that.i, )
					if (res.error == 0) {
						List = res.data
						setTimeout(() => {
							if (page.num == 1) {
								that.dataList = [];
							} //如果是第一页需手动制空列表
							that.dataList = that.dataList.concat(List)
							that.mescroll.endSuccess(res.data.length);
						}, 1000)
				
					} else {
						// console.log('请求失败,隐藏加载状态')
						// 请求失败,隐藏加载状态
						that.mescroll.endErr()
					}
				})
			}
		}
	}
</script>

<style>
	page {
		background: rgb(240, 240, 240);
	}

	.button_back {
		background-color: #F92727;
		color: #fff;
	}

	.hiden_name {
		/* display: flex; */
		width: 340rpx;
		flex: 1;
		text-overflow: ellipsis;
		/*让截断的文字显示为点点。还有一个值是clip意截断不显示点点*/
		white-space: nowrap;
		/*让文字不换行*/
		overflow: hidden;
		/*超出要隐藏*/
	}

	/* .item_list {
		display: flex;
		justify-content: space-between;
		font-size: 16px;
	}

	.text_center {
		display: flex;
		align-items: center;

	}
 */
	.img {
		width: 60rpx;
		height: 60upx;
		display: block;
		border-radius: 50%;
	}

	button {
		height: 60upx;
		min-width: 6em;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
	}

	.right_ {
		height: 60rpx;
		min-width: 6em;
		box-sizing: border-box;
		padding-left:30upx ;
	}

	.hidden_ {

		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 5;
	}
</style>
