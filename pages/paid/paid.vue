<template>
	<view>
		<!-- 头部栏 -->
		<view class="flex_between wrpo_center title_s" style="background:#f92727">
			<view class=" back-left" @tap="back()">
				<!-- 完成 -->
			</view>
			<view class="middle_text">
				{{order.orderTitle}}
			</view>
			<view class="middle_text">
			</view>
		</view>
		<view class="conten-box">

			<view class=" padding-top hint padding-left padding-right" style="display: flex;">
				<image :src="order.icon" mode="" class="" style="width: 100upx;height: 100upx;margin-left: 100upx;"></image>
				<view class="">

					<view class="padding-left " style="color: #fff;">
						<view class="hint_word tiny_text">
							<!-- 等待付款：¥40,000 -->
							<!-- 已取消 -->
							<!-- 已完成 -->
							{{order.order_label}}<span v-if="buttons.cancel == '1'">¥<span class="need_pay">{{price.need_pay}}</span></span>
						</view>
						<view class=" padding-top tiny_text padding-bottom-20">
							<!-- 剩余时间: 14:00:00 -->
							<!-- 订单已关闭 -->
							<!-- 请耐心等待项目秘书与您联系 -->
							{{order.order_remark}}<span v-if="order.pay_end_time != '0' && buttons.pay == '1'">{{order.dao_time}}</span>
						</view>
						<button class=" tiny_text   margin-top" style="border-radius: 3px; border: 1px solid #fff;display: inline-block;color: #fff;height: 36px;width: 96px;background: #f92727;"
						 @tap="call()">
							马上联系
							<!-- projects.responsible_mobile -->
						</button>
					</view>

				</view>

			</view>
			<view class="project padding-left padding-right" style="display: flex; column-count: count;">

				<view class="conten padding">
					<view class="padding-bottom" style="display: flex;border-bottom: 2upx solid #f0f0f0;">
						<view class="padding-right" style="height: 200upx;width: 300upx;">
							<image :src="projects.prj_photo" mode="" style="height: 200upx;width: 300upx;"></image>
						</view>
						<view class="align_between vice-color">
							<view class="tiny_text 	bold">
								{{projects.prj_name}}

							</view>
							<view class="x_text">
								{{order_time}}

							</view>
							<view class="x_text">
								订单编号：{{order.order_id}}
							</view>
						</view>
					</view>



					<view class="padding-top tiny_text ">
						<view class="flex_between padding-top">
							<view class="vice-color">
								优惠合计
							</view>
							<view class=" red_color">
								{{price.hongbao}}元
							</view>
						</view>
						<view class="flex_between padding-top">
							<view class="vice-color">
								签约预付款
							</view>
							<view class=" red_color">
								{{price.need_pay}}元
							</view>
						</view>
					</view>
					<view class=" " style="position: absolute;bottom: 60upx;width:calc(100% - 60upx) ;box-sizing: border-box;">
						<view class="" style="display: flex;flex-direction: row-reverse;justify-content:space-between;width: 100%;box-sizing: border-box; padding-left:30%">
							<!-- 
							<button class=" tiny_text btns_ vice-color" v-for="(item,i) in  buttons" @tap="skip(item)" :key='item.url' :style="i==0?'background:#fff;;margin-left:0;':'color:#fff'">
								{{item.title}}
							</button> -->
							<!-- 			<div v-if="buttons.show_comment == '1'" class=" tiny_text btns_ vice-color" @click="myevalFn(order.order_id)">查看评价</div> -->
							<!-- 							<div v-if="buttons.comment == '1'" class=" tiny_text btns_ vice-color" @click="evalFn">评价</div> -->
							<!-- <button v-if="buttons.refund == '1'" class=" tiny_text btns_ vice-color" @click="tuiFn">申请退款</button>
							<button v-if="buttons.refund_rate == '1'" class=" tiny_text btns_ vice-color" @click="tuijinFn">退款进度</button>
							<b utton v-if="buttons.confirm == '1'" class=" tiny_text btns_ vice-color" @click="confirm">确认收货</button>-->
							<button v-if="buttons.cancel == '1'" class=" tiny_text btns_ vice-color" @click="cancel" style="background:#fff;color: rgb(102, 102, 102);">取消订单</button>
							<button v-if="buttons.del == '1'" class=" tiny_text btns_ vice-color" @click="del">删除</button>
							<button v-if="buttons.pay == '1'" class=" tiny_text btns_ vice-color" @click="payFn">去付款</button>
							<button v-if="buttons.index == '1'" class=" tiny_text btns_ vice-color" @click="rebackindex">返回首页</button>
							<button v-if="buttons.projects == '1'" class=" tiny_text btns_ vice-color" @click="rebackprj">返回项目</button>
						</view>
					</view>
				</view>


			</view>
		</view>
	</view>
</template>

<script>
	import "../../style/com_icon.css";
	import api from '../../api/api.js';
	//lff
	function formatTimes(time) {
		var day = Math.floor(time / 60 / 60 / 24);
		var h = Math.floor(time / 60 / 60 % 24);
		var min = Math.floor(time / 60 % 60);
		var sec = Math.floor(time % 60);
		// console.log(sec)
		if (min == 0 && sec == 0 && h == 0) {
			return 0
		} else {
			if (day == 0) {
				var lastTime = formatNumber(h) + "小时" + formatNumber(min) + "分" + formatNumber(sec) + "秒";
			} else {
				var h = h + (day * 24);
				var lastTime = formatNumber(h) + "小时" + formatNumber(min) + "分" + formatNumber(sec) + "秒";
			}
			return lastTime;
		};
	}

	function formatNumber(n) {
		n = n.toString();
		return n[1] ? n : "0" + n;
	}
	//lffend
	export default {
		data() {
			return {
				paidData: '',
				order: '',
				projects: '',
				price: '',
				buttons: '',
				order_time: '',
			}
		},
		onLoad(options) {
			var that = this
			api.order({
				order_id: options.order_id,
				// id: 2
			}, function(res) {
				// console.log(res, 'focsData')
				if (res.error == '0') {
					//lff
					res.data.order.dao_time = 0;
					//lffend
					that.paidData = res.data
					that.order = res.data.order
					that.projects = res.data.projects
					that.price = res.data.price
					that.buttons = res.data.button
					that.order_time = that.getLocalTime(Number(that.paidData.order_create_time) * 1000)
					//lff
					if (that.buttons.pay == '1') {
						// console.log('去支付');
						if (parseInt(that.order.pay_end_time) == 0) { //如果已经超过了支付时间则 去支付 的按钮消失
							that.buttons.pay = 0;
							that.order.order_remark = '超过支付时间取消订单';
							that.order.orderTitle = '取消订单';
						} else {
							that.payTime(parseInt(that.order.pay_end_time), 1);
						}
					}
					//lffend

				}
				//  else {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: res.message
				// 	})
				// }
			})
		},
		computed: {
			// 计算属性的 getter
			// order_time: function() {

			// 		return this.getLocalTime(Number(this.paidData.order_create_time))

			// }
		},
		methods: {
			//lff
			payTime: function(e, t) {
				var that = this;
				var time = e; //结束时间
				console.log(e, t)
				clearInterval(timer);
				var nowTime = new Date().getTime();
				var order = that.order;
				var buttons = that.buttons;
				var timer = setInterval(function() {
					var newTime = new Date().getTime();
					var dTime = (newTime - nowTime) / 1000;
					dTime = parseInt(dTime);
					e = (time - dTime) ? (time - dTime) : 0;
					// e--;
					if (formatTimes(e) != 0 && t == '1') {
						order.dao_time = formatTimes(e);
						that.order = order;
					} else {
						clearInterval(timer);
						that.getvalFn();
					}
				}, 1000)
			},
			//取消订单
			cancel: function() {
				var that = this;
				var order_id = that.order.order_id;
				uni.showModal({
					title: '提示',
					content: '您不在考虑考虑，确认要取消订单么？',
					success: function(res) {
						if (res.confirm) {
							api.cancel({
								'order_id': order_id
							}, function(res) {
								// api.tipload(that,res.message);
								uni.showToast({
									icon: 'none',
									title: res.message
								})
								if (res.error == '0') {
									location.reload();
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			//删除订单
			del: function() {
				var that = this;
				var order_id = that.order.order_id;
				// console.log(order_id);
				api.orderdel({
					'order_id': order_id
				}, function(res) {
					// api.tipload(that,res.message);
					uni.showToast({
						icon: 'none',
						title: res.message
					})
					if (res.error == '0') {
						// 与app交互 本地会报错，测试删除是成功的
						if (window.__CFG.IN_APP_CLIENT) {
							setTimeout(function() {
								if (window.__CFG.IN_APP_CLIENT == 'IOS') {
									window.webkit.messageHandlers.AppNativeMethod.postMessage({
										"function_name": "appNativeGoBackToNativePage",
										"params": JSON.stringify('')
									});
								} else {
									let p = {
										"function_name": "appNativeGoBackToNativePage",
										"params": JSON.stringify('')
									}
									window.JHAPP.appNativeMethod(JSON.stringify(p));
									// window.JHAPP.appNativeMethod({"function_name":"appNativeGoBackToNativePage","params":JSON.stringify('')});
								}
							}, 1200)
						} else {
							setTimeout(function() {
								that.$router.go(-1);
							}, 1200)
						}
					}
				})
			},
			//去付款 跳转至https://www.zhongdaogy.com/trade/payment/order-192?rebackurl=https://www.zhongdaogy.com/zdgyindex/pages/paid/paid?order_id=192
			payFn: function() {
				var that = this;
				var order_id = that.order.order_id;
				var url = 'https://www.zhongdaogy.com/trade/payment/order-' + order_id +
					'?rebackurl=https://www.zhongdaogy.com/zdgyindex/pages/paid/paid?order_id=' + order_id;

				// #ifdef H5
				window.location.href = url;
				// #endif
				// #ifdef MP-WEIXIN
				wx.navigateTo({
					url: '../outline/outline?url=' + url,
				})
				// #endif

			},
			//返回首页
			rebackindex: function() {
				var that = this;
				var indexUrl = that.projects.indexUrl;

				// #ifdef H5
				window.location.href = indexUrl;
				// #endif
				// #ifdef MP-WEIXIN
				wx.navigateTo({
					url: '../outline/outline?url=' + indexUrl,
				})
				// #endif
			},
			//返回项目
			rebackprj: function() {
				var that = this;
				var prjUrl = that.projects.prjUrl;

				// #ifdef H5
				window.location.href = prjUrl;
				// #endif
				// #ifdef MP-WEIXIN
				wx.navigateTo({
					url: '../outline/outline?url=' + prjUrl,
				})
				// #endif
			},
			//申请退款
			// tuiFn:function(){

			// },
			//退款进度
			//确认收货
			//lffend
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
			call() {
				uni.makePhoneCall({
					phoneNumber: paidData.responsible_mobile //仅为示例
				});
			},
			skip(item) {
				var url = item.url;
				// #ifdef H5
				window.location.href = url;
				// #endif
				// #ifdef MP-WEIXIN
				wx.navigateTo({
					url: '../outline/outline?url=' + url,
				})
				// #endif
			},
			back() {
				uni.navigateTo({
					url: '/pages/my_order/my_order'
				})
			}
		},

	}
</script>

<style>
	button {
		margin-right: 0;
		margin-left: 0;
	}

	.conten-box {
		box-sizing: border-box;
		padding: 44px 0 0;

		height: calc(100vh - 44px);
	}

	.hint {
		box-sizing: border-box;
		background: #f92727;
		height: calc((100vh - 44px)*0.3);
	}

	.project {
		height: calc((100vh - 44px)*0.7);
		background: #f0f0f0;
		box-sizing: border-box;
		width: 100%;
	}

	.conten {
		position: relative;
		background: #fff;
		height: 100%;
		width: 100%;
		box-sizing: border-box;
		margin-top: -30px;



	}

	.hint_word {
		/* min-width: 2em; */
		/* height: 1.5em; */
		font-size: 16px;
		/* font-weight: 600; */
		color: #fff;
		/* overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		align-items: center */
	}

	.red_color {
		color: #FF4040;
	}

	.btns_ {
		border-radius: 5px;
		border: 1px solid #fff;
		color: #fff;
		height: 36px;
		width: 90px;
		background: #f92727;
		margin-left: 5px;
	}

	/*  */
	.title_s {
		height: 44px;
		width: 100vw;
		position: fixed;
		top: 0;
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
		content: '\e606';
		font-family: 'iconfont';
		text-align: center;
	}

	.need_pay {
		font-size: 25px;
		margin-left: 10rpx;
	}
</style>
