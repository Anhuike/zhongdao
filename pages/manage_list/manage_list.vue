<template>
	<view class="box">
		<view class="content" style=" background: #fff;">
			<view class="status_bar">
			</view>
			<!-- 头部栏 -->
			<view class="flex_between wrpo_center title_s" style="background:#fff">
				<view class="middle_text back-left"  @tap="back()">
					
				</view>
				<view class="middle_text title_hen">
	{{title}}
				</view>
				<view class="middle_text more-right">
					
				</view>
			</view>
		</view>
			<seo_tab  v-model="tabIndex" :tabs="tabs" :active_btn="active_btn" :fixed="false"></seo_tab>
	
		<view class="swiper-area">
			<swiper :current="tabIndex" @change="swiperChange" :style="{height: height}">
				<swiper-item>
					<index_conter :i="0" :prj_id="prj_id"  :index="tabIndex" :tabs="tabs" @emitFn="trigger" @handleItem="handleItem"></index_conter>
				</swiper-item>
				<swiper-item>
					<index_conter :i="1" :prj_id="prj_id" :index="tabIndex" :tabs="tabs" @emitFn="trigger" @handleItem="handleItem"></index_conter>
				</swiper-item>
				<swiper-item>
					<index_conter :i="2" :prj_id="prj_id" :index="tabIndex" :tabs="tabs" @emitFn="trigger" @handleItem="handleItem"></index_conter>
				</swiper-item>
				<swiper-item>
					<collect :i="3" :prj_id="prj_id" :index="tabIndex" :tabs="tabs" @emitFn="trigger" @handleItem="handleItem"></collect>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import index_conter from '../manage_list/generalize.vue';
	import collect from '../manage_list/collect.vue';
	import seo_tab from "../manage_list/seo_tab.vue";
	import api from '../../api/api.js';
	import "../../style/com_icon.css";
	export default {
		components: {
			index_conter,
			seo_tab,
			collect
		},
		data() {
			return {
				title:'',
				prj_id:'',
				active_btn: require('../../static/imgs/icoImg/active_btn.png'),
				height: "400px", // 需要固定swiper的高度
				tabs: ['关注', '收藏', '浏览', '成交'],
				tabIndex: 0, // 当前tab的下标
				//////////////////////////////
				scrollViewHeight: '',
				// isShowSticky: false // 是否悬浮
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
				// if (e.type == 'pay') {
				// 	var url ='https://www.zhongdaogy.com/trade/payment/order-'+e.id+'?reback...id/paid?order_id='+e.id
				// // #ifdef H5
				// window.location.href = url;
				// // #endif
				// // #ifdef MP-WEIXIN
				// wx.navigateTo({
				// 	url: '../outline/outline?url=' + url,
				// })
				// // #endif
				// } else if (e.type == 'cancel') {
				// 	api.cancel({
				// 		order_id: e.id,
				// 	}, function(res) {
				// 		console.log(res)
				// 		return false
				// 		if (res.error == '0') {
				// 		}
				// 	})
				// }

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
		onLoad(op) {
			this.title=op.name
			this.prj_id=op.prj_id
			// 需要固定swiper的高度
			this.height = (uni.getSystemInfoSync().windowHeight - 73) + 'px'
			// console.log(this.height, 553)
			console.log(this.prj_id,'piii' ,op)
		},
		back() {
		
			uni.navigateBack({
				delta: 1
			})
		},

	}
</script>

<style>
	
	
	.title_hen{
		max-width:15em;/*要显示文字的宽度*/
		text-overflow :ellipsis; /*让截断的文字显示为点点。还有一个值是clip意截断不显示点点*/
		white-space :nowrap; /*让文字不换行*/
		overflow : hidden; /*超出要隐藏*/
	}
	/* .box {
		height: 100vh;
		display: flex;
		flex-direction: column;
	} */

	.swiper-area {
		flex: 1;
	/* height: auto; */
		width: 100%;
		background-color: #f0f0f0;

	}

	/*  */
	.title_s {
		background-color: #fff;
		height: 44px;
		width: 100vw;
		/* position: fixed;
		top: 0; */
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

