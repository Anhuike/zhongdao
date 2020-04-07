<template>
	<view>
		<!-- <uni-nav-bar color="#ffffff" background-color="rgb(252, 54, 43)" :status-bar="true" font-size="36upx" left-icon="arrowleft"
		 left-text="" :title="title_name" @clickLeft="back" /> -->
		<view class="flex_between wrpo_center title_s" style="color:#ffffff; background-color:rgb(252, 54, 43)">
			<view class="back-left flex_center" @click="back()">
			</view>
			<view class="middle_text">
				{{title_name}}
			</view>
			<view class=" flex_center more-right">
				<!-- icon-right -->
			</view>
		</view>
		<view class="white" style="height:calc( 100vh - 88upx);overflow: hidden;background:#eee;margin-top:44px" v-show="false">

			<view class="margin white ">
				<view class="padding-10" style="border-bottom:1upx solid #EEEEEE;">
					<view class="padding margin-bottom-10 max_text">
						{{project_name}}
					</view>
				</view>
				<view class="padding margin-10" style="display: flex;margin-bottom: 0;">
					<input type="text" :value="partner_fee" class=" padding-right bg_pay max_text" disabled="true" style="flex: 1;border: 4upx solid #f92727;height: 120upx;padding-left:60upx ;color: #f12121;box-sizing: border-box;font-size:50upx ;" />
					<view class="ridiu flex_center padding-left padding-right x_color active" style="border: 4upx solid #f92727;margin:0;height: 120upx;box-sizing: border-box;text-align: center;border-left:none;width: 5em;">预付款</view>
				</view>
				<view class="wrpo_center padding padding-top-10">
					<label class="radio wrpo_center  margin-left-10 margin-bottom x_color" style="display: flex; " @tap="radioChange1">
						<radio style="margin-top:-5upx ;" color="#f92727" :checked="is_radio1" />
						<view class=" x_text" style="display: flex;">
							我已阅读并接受<view class="x_text" style="color: #F92727;" @tap.stop="protocol">《中道共赢平台说明》</view>
						</view>
					</label>

				</view>
				<view class="padding margin-10" style="padding-top:150upx;padding-bottom:60upx">
					<view class="flex_center" style="border-radius:50upx;background:#f92727;height: 100upx;color: #FFFFFF;font-size: 34upx;">
						生成订单
					</view>
				</view>
			</view>
		</view>
		<!--  第二种状态-->
		<view class="white padding two_box" v-show="true">
			<view class=" white ">
				<view class="padding-10" style="border-bottom:1upx solid #EEEEEE;">
					<view class="padding margin-bottom-10 max_text">
						{{project_name}}
					</view>
				</view>
				<view class="">
					<view class="padding tiny_text two_color" style="padding-bottom:0;">
						请选择支付款项
					</view>
					<view class="padding " style="display: flex;padding-bottom:10upx" @tap="pay_order(1)">
						<input type="text" :value="advance_fee" :class="['padding-right  max_text  two_input',active_pay==1?'pyin bg_pays':'nost bg_pays_c']"
						 disabled="true" />
						<view :class="[' flex_center padding-left padding-right x_color max_text two_pay_name',active_pay==1?'pyin ridiu':'nost ridius']"
						 style="">预付款</view>
					</view>
					<view class="padding " style="display: flex;" @tap="pay_order(2)">
						<input type="text" :value="partner_fee" :class="['padding-right  max_text  two_input',active_pay==2?'pyin bg_pays':'nost bg_pays_c']"
						 disabled="true" />
						<view :class="[' flex_center padding-left padding-right x_color max_text two_pay_name',active_pay==2?'pyin ridiu':'nost ridius']">全款</view>
					</view>
					<view class="wrpo_center padding padding-top-10">
						<label class="radio wrpo_center  margin-left-10  x_color" style="display: flex; " @tap="radioChange">
							<radio style="margin-top:-5upx ;" color="#f92727" :checked="is_radio" />
							<view class=" x_text" style="display: flex;">
								我已阅读并接受<view class="x_text" style="color: #F92727;" @tap.stop="protocol">《中道共赢平台说明》</view>
							</view>
						</label>
					</view>

				</view>
			</view>
			<view class=" white margin-top two_color small_text">
				<view class="padding">
					<view class="white">
						已选联营区域
					</view>

				</view>
				<view class=" padding-left padding-right padding-bottom">
					<view class="padding-left " style="">
						<view class="wrpo_center   margin-bottom" v-for="item in checkedList" :key="item.area_id" style="height: 80upx;background: #fafafa;position: relative;box-sizing: border-box;">
							{{item.province_name}}
							<view class="contes">
							</view>
							{{item.city_name}}
							<view class="contes">
							</view>
							{{item.area_name}}
							<view class="cuo" @tap="delete_item(item)">
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="">

			</view>
			<view class="flex_center bg_red oreder" style="" @tap="submit_order">
				生成订单
			</view>
		</view>
		<!-- <view class="white padding" style="background:#eee;min-height:100vh" v-show="true">
			
		</view> -->
		<!--  -->

	</view>
</template>

<script>
	import "../../style/com_icon.css";
	import api from '../../api/api.js';
	// import uniIcons from '@/components/uni-icons/uni-icons.vue'
	// import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	// import uniSection from '@/components/uni-section/uni-section.vue'
	// import uniStatusBar from '@/components/uni-status-bar/uni-status-bar.vue';
	export default {
		components: {

			// uniIcons,
			// uniNavBar,
			// uniSection,
			// uniStatusBar
		},
		data() {
			return {
				title_name: '签约确认',
				is_radio: false,
				is_radio1: false,
				checkedList: [],
				active_pay: 2,
				prj_id: '',
			project_name:""
			}
		},
		onLoad(options) {
			// console.log(options,222)
			this.project_name= options.name
			this.prj_id = options.prj_id
			if (options.ulitem) {
				this.checkedList = JSON.parse(options.ulitem)
				// console.log(this.checkedList)
			}
		},
		methods: {
			pay_order(Number) {
				this.active_pay = Number
				// console.log(this.active_pay,Number)
			},

			// 删除
			delete_item(vl) {
				for (let i = 0; i < this.checkedList.length; i++) {
					if (this.checkedList[i].area_id == vl.area_id) {
						this.checkedList.splice(i, 1)
					}

				}
				// 
				if (this.checkedList.length == 0) {
					this.back()
				}
				// uni.setStorageSync('ulitem', this.checkedList)
			},
			protocol() {
				console.log('中道协议说明')
			},
			radioChange(e) {
				// console.log(e)
				this.is_radio = !this.is_radio
			},
			radioChange1(e) {
				// console.log(e)
				this.is_radio1 = !this.is_radio1
			},
			// 提交订单
			submit_order() {
				var that = this
				if (!this.is_radio) {
					uni.showToast({
						title: '请同意中道共赢平台协议',
						duration: 2000,
						icon: 'none'
					});
				} else {
					let product_id_list = []
					for (let i = 0; i < that.checkedList.length; i++) {
						product_id_list.push(that.checkedList[i].product_id)
					}
					// params = {'prj_id': 2, product_id:[1,2,3,4], way: 1}
					console.log(product_id_list)
					api.create_order({
						'prj_id': that.prj_id,
						'product_id': product_id_list,
						'way': that.active_pay 
					}, (res) => {
						console.log(res, '5555')
						that.loading = false;
						if (Number(res.error) == 0) {
							var order_id = res.order_id;
							var rebackurl = res.link;
							var url = 'https://www.zhongdaogy.com/trade/payment/order-' + order_id + '?rebackurl=' + rebackurl;

							// #ifdef H5
							window.location.href = url;
							// #endif
							// #ifdef MP-WEIXIN
							wx.navigateTo({
								url: '../outline/outline?url=' + url,
							})
							// #endif
						}
					})

				}

			},
			back() {
				console.log('Signed')
				uni.navigateBack({
					delta: 1
				})
			},
		},
		computed: {
			// 全款
			partner_fee() {
				var amounts = 0
				console.log(this.checkedList,'6555')
				for (var i = 0; i < this.checkedList.length; i++) {
					amounts += Number(this.checkedList[i].partner_fee)
				}
				return amounts
			},
			// 预付款
			advance_fee(){
				var amounts = 0
				console.log(this.checkedList,'6555')
				for (var i = 0; i < this.checkedList.length; i++) {
					amounts += Number(this.checkedList[i].advance_fee)
				}
				return amounts
			}

		}
	}
</script>

<style>
	.two_box {
		background: #eee;
		padding-bottom: 50px;
		min-height: calc(100vh - 119px);
		margin-top: 44px;
		overflow: hidden;
	}


	.bg_pay {
		position: relative;
	}

	.bg_pay::before {
		position: absolute;
		content: '\e634';
		font-family: 'iconfont';
		left: 15upx;
		bottom: 28upx;
		color: #f12121;
	}

	.bg_pays {
		position: relative;
	}

	.bg_pays::before {
		position: absolute;
		content: '\e634';
		font-family: 'iconfont';
		left: 15upx;
		bottom: 16upx;
		color: #f12121;
	}


	.bg_pays_c {
		position: relative;
	}

	.bg_pays_c::before {
		position: absolute;
		content: '\e634';
		font-family: 'iconfont';
		left: 15upx;
		bottom: 16upx;
		color: #999;
	}

	.active {
		border: 4upx solid #f92727;
		color: #f12121;

	}

	.ridius {
		position: relative;
		color: rgb(153, 153, 153);
	}

	.ridius::before {
		position: absolute;
		top: -18upx;
		right: -18upx;
		font-size: 50upx;
		content: "\e613";
		font-family: "iconfont";
		color: #999;
	}

	.nost {
		border: 4upx solid #999;
		color: rgb(153, 153, 153);
	}

	.pyin {
		border: 4upx solid #f92727;
		color: #f12121;
	}

	.two_input {
		flex: 1;
		height: 100upx;
		padding-left: 80upx;
		box-sizing: border-box;
		font-size: 50upx;
	}

	.two_pay_name {
		margin: 0;
		height: 100upx;
		box-sizing: border-box;
		text-align: center;
		border-left: none;
		width: 30%;
	}

	.ridiu {
		position: relative;
		color: #999;
	}

	.ridiu::before {
		position: absolute;
		top: -18upx;
		right: -18upx;
		font-size: 50upx;
		content: "\e613";
		font-family: "iconfont";
		color: #f92727;
	}


	/////////////////////////////
	.contes {
		height: 15upx;
		width: 15upx;
		border-radius: 50%;
		background: #e5e5e5;
		margin: 0 20upx;
	}

	.cuo {
		/* position:relative; */
		position: absolute;
		top: -18upx;
		right: -9upx;

	}

	.cuo::before {
		content: '\e657';
		font-family: "iconfont";
		/* position:absolute;
		top:0;
		right:0; */
		color: #999;
	}

	.oreder {
		color: #fff;
		font-size: 34upx;
		height: 100upx;
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
	}


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

	.middle_text {
		font-size: 16px;
		font-weight: 600;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		align-items: center;
	}

	.back-left {
		width: 20px;
		height: 20px;
		font-size: 20px;
		font-family: 'iconfont';
		text-decoration: none;
		text-align: center;
	}

	.back-left::before {
		content: '\e611';
		font-family: 'iconfont';
		text-align: center;
	}

	.more-right {
		width: 20px;
		height: 20px;
		font-size: 20px;
		font-family: 'iconfont';
		text-decoration: none;
		text-align: center;
	}

	.more-right::before {
		/* width: 40upx;
		height: 20px;
	
		content: '\e606';
		font-family: 'iconfont'; */

	}
</style>
