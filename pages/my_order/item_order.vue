<template>
	<!-- 
	swiper中的transfrom会使fixed失效,此时用height="100%"固定高度; 
	swiper中无法触发mescroll-mixins.js的onPageScroll和onReachBottom方法,只能用mescroll-uni,不能用mescroll-body
	-->
	<!-- height="100%" -->
	<mescroll-uni ref="mescrollRef" @init="mescrollInit" top="0" :down="downOption" @down="downCallback" :up="upOption"
	 @up="upCallback" @emptyclick="emptyClick">
		<!-- 数据列表 -->
		<!-- <view class="padding-top"> -->
		<view class="padding-top">

		</view>
		<view class=" padding-left padding-right padding-bottom" v-for="(it,Index)  in goods" :key="Index" @tap="handleItem(it.order_id)">
			<view class="padding" style="background: #FFF;">
				<view class="conten ">
					<view class="x_text" style="text-align:right;color:#61C352;">
						{{it.status_label}}
					</view>
					<view class="padding-bottom" style="display: flex;border-bottom: 2upx solid #f0f0f0;">
						<view class="padding-right" style="height: 200upx;width: 300upx;">
							<image :src="it.prj_logo" mode="" style="height: 200upx;width: 300upx;"></image>
						</view>
						<view class="align_between vice-color">
							<view class="tiny_text 	bold">
								{{it.prj_name}}
							</view>
							<view class="x_text">
								{{it.dateline}}
							</view>
							<view class="x_text">
								订单编号：{{it.order_id}}
							</view>
						</view>
					</view>
					<view class="padding-top tiny_text ">
						<view v-if="it.status_label=='支付成功'" class="vice-color padding-top-20" style="text-align: right;">
							付款金额：{{it.need_pay}}元
						</view>
						<view v-else class="vice-color padding-top-20" style="text-align: right;">
							当前应付：{{it.need_pay}}元
						</view>
						<view v-if="it.button.pay==1||it.button.cancel==1" class="padding-top " style="width:100% ;box-sizing: border-box;">
							<view class="flex_between" style="width: 100%;padding-left: 30%;box-sizing: border-box;">
								<button v-if="it.button[item.type]==1" class=" tiny_text btns_ vice-color" v-for="(item,i) in btns" @tap.stop="skip(it.order_id,item.type)"
								 :key='item.type' :style="i==0?'background:#fff;margin-left:0;':'background:#F92727;color:#fff;margin-right:0;'">
									{{item.name}}
								</button>
							</view>
						</view>
					</view>
					<!-- </view> -->
				</view>

			</view>
		</view>

	</mescroll-uni>

</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/components/mescroll-uni/mixins/mescroll-more-item.js";
	// import GoodList from "@/components/other/good-list.vue";
	// import {
	// 	apiSearch
	// } from "./apilist.js"
	import "../../style/com_icon.css";
	import api from '../../api/api.js';

	export default {
		mixins: [MescrollMixin, MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
		components: {
			// GoodList
		},
		data() {
			return {
				// 
				active_btn: require('../../static/imgs/icoImg/active_btn.png'),
				navList: ['全部订单', '待付款', '已完成', '已取消'],
				dataList: '',
				// 
				downOption: {
					auto: false // 不自动加载 (mixin已处理第一个tab触发downCallback)
				},
				upOption: {
					auto: false, // 不自动加载
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						// size: 4 // 每页数据的数量
					},
					noMoreSize: 1, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						tip: '~ 暂无订单 ~', // 提示
						// btnText: '去看看'
					}
				},
				goods: [], //列表数据
				btns: [{
					name: '取消订单',
					type: 'cancel'
				}, {
					name: '付款',
					type: 'pay'
				}, ],
			}
		},
		props: {
			tabs: Array // tab菜单,此处用于取关键词
		},
		methods: {
			/*下拉刷新的回调 */
			downCallback() {
				// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
				// loadSwiper();
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				this.mescroll.resetUpScroll()
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				//联网加载数据
				var keyword = this.tabs[this.i]
				// console.log(page.size, this.i, keyword, page.num)
				var that = this
				// if(res=){
				var dataList = []
				api.orderList({
					status: keyword,
					page: page.num,
					size: 4,
				}, function(res) {
					console.log(res, 222)
					if (res.error == '0') {
						dataList = res.data
						// console.log(dataList)
						for (let i = 0; i < dataList.length; i++) {
							// console.log(i)
							dataList[i].dateline = that.getLocalTime(Number(dataList[i].dateline) * 1000)
						}
						setTimeout(() => {
							if (page.num == 1) that.goods = []; //如果是第一页需手动制空列表
							that.goods = that.goods.concat(dataList)
							that.mescroll.endSuccess(res.data.length);
						}, 1000)
					} else {
						that.mescroll.endErr();
					}
				})
			},
			//点击空布局按钮的回调
			emptyClick() {
				uni.showToast({
					title: '点击了按钮,具体逻辑自行实现'
				})
			},
			getLocalTime(nS) {
				// return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
				//shijianchuo是整数，否则要parseInt转换
				var time = new Date(nS);
				console.log(time)
				var y = time.getFullYear();
				var m = time.getMonth() + 1;
				var d = time.getDate();
				var h = time.getHours();
				var mm = time.getMinutes();
				var s = time.getSeconds();
				return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
			},

			add0(m) {
				return m < 10 ? '0' + m : m
			},

			skip(id, type) {
				var data = {
					id: id,
					type: type
				}

				this.$emit('emitFn', data)
			},
			handleItem(id) {

				this.$emit('handleItem', id)
			}

		}
	}
</script>
<style>
	.btns_ {
		/* border-radius: 5px; */
		border: 1px solid #fff;

		height: 36px;
		width: 86px;
		/* background: #f92727; */
		/* margin-left:25px ; */
	}
</style>
