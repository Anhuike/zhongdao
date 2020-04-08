<template>
	<view class="">
		<titleBar bgColor="" bgImage="" :isBack="true" @rightcli='rightcli'>
			<!-- <block slot="backText">左边</block> -->
			<block slot="content">高端资源</block>
			<block slot="right"><text class="sousuo margin-right"></text> <text class="more-right"></text></block>
		</titleBar>

		<view class="margin-bottom padding-right padding-left padding-bottom">
			<view class="flex">
				<image class="images" src="../../assets/images/loading3.gif" mode=""></image>
				<view class="Not_Done">
					<view class="Not_Done">
						1
					</view>
					<view class="Not_Done">
						2
					</view>
				</view>
				<view class="Not_Done">
					<view class="Not_Done">
						1
					</view>
					<view class="Not_Done">
						2
					</view>
				</view>
				<view class="Not_Done">
					<view class="Not_Done">
						1
					</view>
					<view class="Not_Done">
						2
					</view>
				</view>
				<view class="Not_Done">
					<view class="Not_Done">
						1
					</view>
					<view class="Not_Done">
						2
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	// import MescrollItem from "./item_order.vue";
	// import AppTabs from "./order_tab.vue";
	import titleBar from "../../components/titleBar/new_title_bar.vue";

	import api from '../../api/api.js';
	export default {
		components: {
			titleBar
			// MescrollItem,
			// AppTabs
		},
		data() {
			return {

				title: 'Hello',
				// 
				// active_btn: require('../../static/imgs/icoImg/active_btn.png'),
				// height: "400px", // 需要固定swiper的高度
				tabs: ['全部订单', '待付款', '已完成', '已取消'],
				tabIndex: 0, // 当前tab的下标
				//////////////////////////////
				scrollViewHeight: ''
			}
		},
		created() {
			this.$on('emitFn', (arg) => {
				console.log('on监听参数====', arg) //['string',false,{name:'vue'}]
			})
		},
		mounted() { // 组件挂载后设置 scrollview 高
			var that = this


		},
		methods: {

			rightcli() {
				console.log('right');
			}
			// 	// 点击当前这个
			// 	handleItem(id){
			// 		uni.navigateTo({
			// 			url:'/pages/paid/paid?order_id='+id
			// 		})
			// 	},
			// 	// 付款-取消订单
			// 	trigger(e) {

			// 		if (e.type == 'pay') {
			// 			var url ='https://www.zhongdaogy.com/trade/payment/order-'+e.id+'?reback...id/paid?order_id='+e.id

			// 		// #ifdef H5
			// 		window.location.href = url;
			// 		// #endif
			// 		// #ifdef MP-WEIXIN
			// 		wx.navigateTo({
			// 			url: '../outline/outline?url=' + url,
			// 		})
			// 		// #endif
			// 		} else if (e.type == 'cancel') {


			// 			api.cancel({
			// 				order_id: e.id,

			// 			}, function(res) {
			// 				console.log(res)
			// 				return false
			// 				if (res.error == '0') {

			// 				}
			// 			})
			// 		}

			// 	},
			// 	// 轮播菜单
			// 	swiperChange(e) {
			// 		this.tabIndex = e.detail.current
			// 	},
			// 	$offset(selector) { // 获取组件内元素的 offset 信息
			// 		return new Promise(resolve => uni.createSelectorQuery().in(this).select(selector).boundingClientRect(data =>
			// 			resolve(data)).exec())
			// 	},
			// },
			// onLoad() {
			// 	// 需要固定swiper的高度
			// 	this.height = (uni.getSystemInfoSync().windowHeight - 84) + 'px'
			// 	console.log(this.height, 553)

		},
		back() {

			uni.navigateBack({
				delta: 1
			})
		},

	}
</script>

<style>
	.more-right::before {
		content: '\e60c';
		font-family: 'iconfont';
		font-size: 18px;
	}

	.sousuo::before {
		content: '\e62f';
		font-family: 'iconfont';
		font-size: 18px;
	}

	/*  */
	.images {
		height: 120rpx;
		width: 120rpx;
	}
</style>
