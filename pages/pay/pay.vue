<template>
    <div class="willing_page bg_f5">

        <div v-if="allData" class="willing_flex_page">
            <div class="willing_pay">
                <div class="wrap_top bg_ff">
                    <div class="wrap_price">￥{{ Number(allData.amount) }}</div>
                    <p class="wrap_surplus">（支付剩余{{ over_time.minutes }}分{{ over_time.seconds }}秒）</p>
                </div>

                <div class="wrap_methods">选择支付方式</div>

                <ul class="wrap_list bg_ff">
                    <template
                        v-for="(v, i) in allData.payment">
                        <!--支付复选框,且已经使用过余额支付-->
                        <li
                            v-if="v.payment == 'money' && check_show && is_money"
                            class="wrap_item"
                        >
                            <div class="wrap_icon">
                                <img :src="v.logo" alt="">
                            </div>
                            <div class="wrap_text">{{ v.title }}&nbsp;&nbsp;&nbsp;<span class="font_on">(已抵扣￥{{ money }})</span></div>
                            <i class="wrap_icon_block wrap_icon_block_on"></i>
                        </li>
                        <!--支付复选框,且已经使用过余额支付 end-->

                        <!--支付复选框,未使用过余额支付-->
                        <li
                            v-if="v.payment == 'money' && check_show && !is_money"
                            class="wrap_item"
                            @click="useMoney"
                        >
                            <div class="wrap_icon">
                                <img :src="v.logo" alt="">
                            </div>
                            <div class="wrap_text">{{ v.title }}<template>&nbsp;&nbsp;&nbsp;<span v-if="use_money" class="font_on">(抵扣￥{{ money }})</span></template></div>
                            <i :class="{'wrap_icon_block': true,'wrap_icon_block_on': use_money}"></i>
                        </li>
                        <!--支付复选框,未使用过余额支付 end-->

                        <!--余额支付单选框-->
                        <li
                            v-if="v.payment == 'money' && !check_show"
                            class="wrap_item"
                            @click="handleType(v.payment)"
                        >
                            <div class="wrap_icon">
                                <img :src="v.logo" alt="">
                            </div>
                            <div class="wrap_text">{{ v.title }}<template v-if="code == v.payment">&nbsp;&nbsp;&nbsp;<span>(￥{{ need_money }})</span></template></div>
                            <i :class="{'wrap_icon_circle': true,'wrap_icon_circle_on': code == v.payment}"></i>
                        </li>
                        <!--余额支付单选框 end-->

                        <!--别的支付单选框-->
                        <li
                            v-if="v.payment != 'money'"
                            class="wrap_item"
                            @click="handleType(v.payment)"
                        >
                            <div class="wrap_icon">
                                <img :src="v.logo" alt="">
                            </div>

                            <div v-if="check_show && use_money" class="wrap_text">{{ v.title }}<template v-if="code == v.payment">&nbsp;&nbsp;&nbsp;<span class="font_on">(还需支付￥{{ need_money }})</span></template></div>

                            <div v-if="!check_show" class="wrap_text">{{ v.title }}<template v-if="code == v.payment">&nbsp;&nbsp;&nbsp;<span class="font_on">(￥{{ need_money }})</span></template></div>
                            
                            <div v-if="check_show && !use_money" class="wrap_text">{{ v.title }}<template v-if="code == v.payment">&nbsp;&nbsp;&nbsp;<span class="font_on">￥{{ need_money }}</span></template></div>

                            <i :class="{'wrap_icon_circle': true,'wrap_icon_circle_on': code == v.payment}"></i>
                        </li>
                        <!--余额支付单选框 end-->
                    </template>
                </ul>
            </div>

            <div class="willing_pay_btn bg_ff">
                <button :class="{'btn_disabled': !code}" @click="pay">确认支付</button>
            </div>
        </div>
    
    	<!--loading-->
    	<loading v-show="loading"></loading>
    	<!--loading end-->
    	
    	<!--tip-->
    	<tip :isshow="tipshow" :tips="tips"></tip>
    	<!--tip end-->
		
		<!--支付宝支付弹窗-->
		<div v-if="alipay_tip" class="willing_float willing_float_show">
			<div class="wrap_bg" @click="hideAplipay"></div>
			<div class="alipay_tip"></div>
		</div>
		<!--支付宝支付弹窗 end-->
    </div>
</template>

<script>
	import loading from "../template/loading";
	import tip from "../template/tip";
	
	import api from "../../api/api";
	import base from "../../assets/js/fc";
	import { mapGetters, mapMutations } from "vuex";
	
    export default {
    	data () {
    		return {
				//  请求的数据
				order_id: "",
				code: "",
				use_money: 0,
				
    			// 渲染的数据
    			loading: false,
    			tipshow: false,
    			tips: "",
                allData: null,
                over_time: {},
                check_show: false,  // 是否显示余额支付复选框
                is_money: false,    // 是否使用过余额抵扣
                money: 0,    // 余额抵扣的钱
                need_money: 0,	// 还需支付的钱
				alipay_tip: false,
				
				is_wechat: window.__CFG.IN_WEIXIN
    		}
    	},
		beforeRouteEnter(to, from, next){
			console.log(vm,'接受')
		   	next((vm) => {
				let order_id = vm.$route.query.order_id;
				let pay = vm.pay;
				
				// 如果是从支付页面返回的
				if (from.path == "/") {
					vm.$router.push({
						path: "/willing/orderdetail?order_id=" + order_id
					});
				// 如果是商品详情或者订单列表或者订单详情返回的
				} else {
					if (pay) {
						// window.__CFG.SITEURL
						let rebackurl = window.__CFG.SITEURL + '/willing/pay?order_id=' + order_id;
						let payUrl = window.__CFG.SITEURL + '/trade/payment/order-' + order_id + "?rebackurl=" + rebackurl;
						window.location.href = payUrl;
					} else {
						if (from.path == "/willing/alllist") {
							vm.$router.push({
								path: "/willing/home?pay=1"
							});
						} else if (from.path == "/willing/home") {
							vm.$router.push({
								path: "/willing/home?pay=1"
							});
						} else {
							vm.$router.push({
								path: "/willing/alllist"
							});
						} 
						
					}
				}
		   	});
		},
		beforeRouteLeave(to, from, next){
			if (this.interval) {
			    clearInterval(this.interval);
			    this.interval = null;
			}
			if (this.pay_timer) {
			    clearTimeout(this.pay_timer);
			    this.pay_timer = null;
			}
		   	next();
		},
//     	mounted () {
//             document.title = "支付";
//     		this.apiData();
//     	},
        destroyed () {
    	    if (this.interval) {
    	        clearInterval(this.interval);
                this.interval = null;
            }
            if (this.pay_timer) {
                clearTimeout(this.pay_timer);
                this.pay_timer = null;
            }
        },
		computed: {
		    ...mapGetters([
		        "pay"
		    ])
		},
    	methods: {
    		/**
    		 * 请求数据
    		 * */
    		apiData () {
    			let that = this;
    			let params = {
    				order_id: that.order_id
    			};
    			that.loading = true;
                api.prePay(params, (res) => {
                    that.loading = false;
                    if (Number(res.error)) {
                        api.tipload(that, res.message, true);
                    } else {
                        that.allData = res.data;
                        that.setOverTime();
                        that.setMoney();
                        this.initCode();
                    }
                    that.required = true;
                });
    		},
            initCode () {
    		    this.allData.payment.forEach((v, i) => {
    		        if (this.check_show) {
    		            if (!this.code && v.payment != "money") {
    		                this.code = v.payment;
                        }
                    } else {
                        !this.code && (this.code = v.payment);
                    }
                });
            },
            /**
             * 设置余额支付复选框的显示
             * */
            setMoney () {
                // 已经使用过余额抵扣
    		    if (Number(this.allData.money)) {
    		        this.check_show = true;
    		        this.is_money = true;
    		        this.use_money = 1;
    		        this.money = Number(this.allData.money);
    		        if (this.is_money) {
    		        	this.need_money = Number(this.allData.amount);
    		        } else {
    		        	this.need_money = base.printNum(Number(this.allData.amount), this.money, "subtract");
    		        }
    		        return;
                }
                // 如果当前的支付金额大于账户余额且没有使用过余额抵扣
                if (Number(this.allData.amount) > Number(this.allData.member_money) && !Number(this.allData.money)) {
                    this.check_show = true;
                    this.need_money = base.printNum(Number(this.allData.amount), Number(this.allData.member_money), "subtract");
                    this.use_money = 1;
                    this.money = Number(this.allData.member_money);
                    return;
                }
                // 如果当前的支付金额小于账户余额且没有使用过余额抵扣
				if (Number(this.allData.amount) <= Number(this.allData.member_money) && !Number(this.allData.money)) {
				    this.need_money = Number(this.allData.amount);
				}
            },
            /**
             * 使用余额抵扣
             * */
            useMoney () {
                if (!Number(this.allData.can_mixed_money)) {
                    api.tipload(this, "暂不支持余额抵扣");
                    return;
                }

                // 使用了余额抵扣
                if (this.use_money) {
                    this.use_money = 0;
                    this.money = 0;
                    this.need_money = Number(this.allData.amount);
                // 没使用余额抵扣
                } else {
                    this.use_money = 1;
                    this.money = Number(this.allData.member_money);
                    this.need_money = base.printNum(Number(this.allData.amount), Number(this.allData.member_money), "subtract");
                }
            },
            /**
             * 点击支付方式
             * */
            handleType (value) {
                if (value == "money" && !Number(this.allData.can_use_money)) {
                    api.tipload(this, "暂不支持余额支付");
                    return;
                }
                this.code = value;
            },
            /**
             * 设置支付到期时间
             * */
            setOverTime(){
                let lTime = new Date().getTime() + Number(this.allData.pay_end_time) * 1000;
                this.interval = setInterval(() => {
                    let time = new Date().getTime();
                    let dis = lTime - time;
                    if (dis <= 0) {
                        clearInterval(this.interval);
                        this.interval = null;
                        this.$router.replace({
                            path: `/willing/orderdetail?order_id=${ this.order_id }`
                        });
                        return;
                    }
                    let seconds = Math.floor(dis / 1000 % 60);
                    let minutes = Math.floor(dis / 1000 / 60);
                    this.over_time = {
                        minutes: minutes,
                        seconds: seconds
                    };
                }, 50);
            },
            /**
             * 支付
             * */
            pay () {
                let that = this;
				if (that.code == "wxpay" && !Number(that.is_wechat)) {
					api.tipload(that, "请用微信浏览器打开此页面");
					return;
				}
				if (that.code == "alipay" && Number(that.is_wechat)) {
					that.alipay_tip = true;
					return;
				}
				
                let params = {
                    "order_id": that.order_id,
                    "code": that.code,
                    "use_money": that.use_money
                };
                that.loading = true;
                api.pay(params, (res) => {
                    that.loading = false;
                    api.tipload(that, res.message);
                    if (!Number(res.error)) {
                    	// 余额支付
                    	if (that.code == "money") {
                    		that.pay_timer = setTimeout(() => {
	                            that.$router.replace({
			      					path: `/willing/orderdetail?order_id=${ that.order_id }`
			      				});
	                        }, 1500);
                    	}
                    	// 微信支付
						if (that.code == "wxpay") {
							function onBridgeReady(){
								WeixinJSBridge.invoke('getBrandWCPayRequest', res.data.trade,
							  	function(res){
									if(res.err_msg == "get_brand_wcpay_request:ok" ){
										that.$router.replace({
											path: `/willing/orderdetail?order_id=${ that.order_id }`
										});
									} 
								}); 
							}
							if (typeof WeixinJSBridge == "undefined"){
								if( document.addEventListener ){
									document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
								}else if (document.attachEvent){
							   		document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
							   		document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
								}
							} else {
								onBridgeReady();
							}
						}
						// 支付宝支付
						if (that.code == "alipay") {
							window.location.replace(res.data.trade);
						}
                    }
                });
            },
            wxPay (trade) {
            	let that = this;
        		function onBridgeReady(){
		   			WeixinJSBridge.invoke('getBrandWCPayRequest', {
			         	"appId": trade.appid,     //公众号名称，由商户传入     
			         	"timeStamp": trade.timestamp,         //时间戳，自1970年以来的秒数     
			         	"nonceStr": trade.noncestr, //随机串     
			         	"package": trade.package,     
			         	"signType": trade.sign_string,         //微信签名方式：     
			         	"paySign": trade.sign //微信签名 
			      	},
			      	function(res){
		      			if(res.err_msg == "get_brand_wcpay_request:ok" ){
		      				that.$router.replace({
		      					path: `/willing/orderdetail?order_id=${ that.order_id }`
		      				});
		      			} 
			   		}); 
				}
				if (typeof WeixinJSBridge == "undefined"){
			   		if( document.addEventListener ){
		       			document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
	   				}else if (document.attachEvent){
			       		document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
			       		document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
			   		}
				} else {
			   		onBridgeReady();
				}
            },
			alipay (trade) {
				window.location.replace(trade.notify_url);
			},
			hideAplipay () {
				this.alipay_tip = false;
			}
    	},
		components: {
			loading,
			tip
		}
    }
</script>

<style scoped>

</style>