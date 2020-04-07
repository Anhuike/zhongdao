<template>
	<view class="box">
		<view class="content" style=" background: #f0f0f0;">
			<view class="status_bar">
			</view>
			<!-- 头部栏 -->
			<view class="flex_between wrpo_center title_s" style="background:#f92727">
				<view class="middle_text back-left" @tap="back">
				<!-- 	完成 -->
				</view>
				<view class="middle_text">

					我的订单
				</view>
				<view class="middle_text">
				</view>
			</view>
		</view>
		<view class="" style="height: 40px;">

			<app-tabs v-model="tabIndex" :tabs="tabs" :active_btn="active_btn" :fixed="false"></app-tabs>
		</view>
		<view class="swiper-area">

			<swiper :current="tabIndex" @change="swiperChange" :style="{height: height}">
				<!--全部 -->
				<swiper-item>
					<mescroll-item :i="0" :index="tabIndex" :tabs="tabs" @emitFn="trigger" @handleItem="handleItem"></mescroll-item>
				</swiper-item>

				<!-- 奶粉 -->
				<swiper-item>
					<mescroll-item :i="1" :index="tabIndex" :tabs="tabs" @emitFn="trigger"  @handleItem="handleItem"></mescroll-item>
				</swiper-item>

				<!-- 面膜 -->
				<swiper-item>
					<mescroll-item :i="2" :index="tabIndex" :tabs="tabs" @emitFn="trigger"  @handleItem="handleItem"></mescroll-item>
				</swiper-item>

				<!-- 图书 -->
				<swiper-item>
					<mescroll-item :i="3" :index="tabIndex" :tabs="tabs" @emitFn="trigger"  @handleItem="handleItem"></mescroll-item>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import MescrollItem from "./item_order.vue";
	import AppTabs from "./order_tab.vue";
	import api from '../../api/api.js';
	export default {
		components: {
			MescrollItem,
			AppTabs
		},
		data() {
			return {
				active_btn: require('../../static/imgs/icoImg/active_btn.png'),
				height: "400px", // 需要固定swiper的高度
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
			// 点击当前这个
			handleItem(id){
				uni.navigateTo({
					url:'/pages/paid/paid?order_id='+id
				})
			},
			// 付款-取消订单
			trigger(e) {
				
				if (e.type == 'pay') {
					var url ='https://www.zhongdaogy.com/trade/payment/order-'+e.id+'?reback...id/paid?order_id='+e.id
				
				// #ifdef H5
				window.location.href = url;
				// #endif
				// #ifdef MP-WEIXIN
				wx.navigateTo({
					url: '../outline/outline?url=' + url,
				})
				// #endif
				} else if (e.type == 'cancel') {


					api.cancel({
						order_id: e.id,
						
					}, function(res) {
						console.log(res)
						return false
						if (res.error == '0') {
						
						}
					})
				}

			},
			// 轮播菜单
			swiperChange(e) {
				this.tabIndex = e.detail.current
			},
			$offset(selector) { // 获取组件内元素的 offset 信息
				return new Promise(resolve => uni.createSelectorQuery().in(this).select(selector).boundingClientRect(data =>
					resolve(data)).exec())
			},
		},
		onLoad() {
			// 需要固定swiper的高度
			this.height = (uni.getSystemInfoSync().windowHeight - 84) + 'px'
			console.log(this.height, 553)

		},
		back() {
		
			uni.navigateBack({
				delta: 1
			})
		},

	}
</script>

<style>
	.box {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.swiper-area {
		flex: 1;
		width: 100%;
		background-color: #f0f0f0;

	}

	.title_s {
		height: 44px;
		width: 100vw;
		/* position: fixed; */
		/* top: 0; */
		z-index: 99999;
		color: #fff;
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
		height: 1.5em;
		font-size: 16px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		align-items: center;
	}
	
	.back-left {
		min-width: 20px;
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
		min-width: 20px;
		font-size: 20px;
		font-family: 'iconfont';
		text-decoration: none;
		text-align: center;
	}
	
	.more-right::before {
		content: ' ';
		font-family: 'iconfont';
		text-align: center;
	}

	/deep/.uni-scroll-view::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		display: none
	}
</style>
