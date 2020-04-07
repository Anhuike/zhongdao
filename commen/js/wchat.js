// import request from './request'; //笔者自己封装的网络请求类，也可以直接使用uni.request  
import api from '../../api/api.js'
var jweixin = require('jweixin-module');  

export default {  
        //判断是否在微信中  
    isWechat:function(){  
        var ua = window.navigator.userAgent.toLowerCase();  
        if(ua.match(/micromessenger/i) == 'micromessenger'){  
            return true;  
        }else{  
            return false;  
        }  
    },  
        //初始化sdk配置  
    initJssdk:function(callback ,url){
		callback = typeof(callback) == 'function' ? callback : function(res) {};
				// alert('111')
                //服务端进行签名 ，可使用uni.request替换。 签名算法请看文档  
		api.http('client/app/get_wechat',{url:url},function(res){
            if(res.data){
				// alert(JSON.stringify(jweixin));
				// alert(JSON.stringify(res.data));
                jweixin.config({
                     debug: false,
                     appId: res.data.wxjs_config.appId,
                     timestamp:res.data.wxjs_config.timestamp,
                     nonceStr: res.data.wxjs_config.nonceStr,
                     signature:res.data.wxjs_config.signature,
                     jsApiList: ['checkJsAPi','getLocation','onMenuShareAppMessage','onMenuShareTimeline','onMenuShareQQ','onMenuShareQZone','onMenuShareWeibo','updateAppMessageShareData','updateTimelineShareData','chooseWXPay']
                });
                //配置完成后，再执行分享等功能  
                if(callback){
                    callback(res.data.wxjs_config);
                }  
            }  

        });  
    },  
        //在需要自定义分享的页面中调用  
    share:function(data ,url){
				// alert('333')
        url =url ? url :window.location.href;
		var urls = window.location.href;
        if(!this.isWechat()){  
            return ;  
        }
                //每次都需要重新初始化配置，才可以进行分享  
        this.initJssdk(function(signData){  
            jweixin.ready(function(){    
                var shareData = {  
                     title: data&&data.title ? data.title: signData.site_name,  
                     desc: data&&data.desc ? data.desc: signData.site_description,  
                     link: url,  
                     imgUrl: data&&data.img ?data.img :signData.site_logo,  
                     success: function (res) {  
						 //用户点击分享后的回调，这里可以进行统计，例如分享送金币之类的  
                        // alert(JSON.stringify(res)) 
                     },  
                     cancel: function (res) {  
                     },
					 complete: function(rs){
						 // alert(JSON.stringify(rs)) 
					 }
                 };  
                 //分享给朋友接口(qq,微信)
                 jweixin.updateAppMessageShareData(shareData);  
                 //分享到朋友圈接口(qq,微信)  
                 jweixin.updateTimelineShareData(shareData);  
                 //分享给微博接口  
                 jweixin.onMenuShareWeibo(shareData);
            });
			jweixin.error(function(ress){
				// alert(JSON.stringify(ress))
			})
        } ,urls);  
    },
	  
	//微信公众号支付
	// wxjspay:function(jsApiParameters, callback){
	// 	callback = callback || function (status){};
	// 	var urls = window.location.href;
	//     if(!this.isWechat()){  
	//         return ;  
	//     }  
	//     this.initJssdk(function(signData){  
	//         jweixin.ready(function(){    
	//             jweixin.chooseWXPay(jsApiParameters);
	// 			jsApiParameters.success = function (){
	// 				callback('success');
	// 			};
	// 			
	// 			jsApiParameters.cancel = function (){
	// 				callback('cancel');
	// 			};
	// 			
	// 			jsApiParameters.fail = function (){
	// 				callback('fail');
	// 			};
	//         });
	// 		jweixin.error(function(ress){
	// 			// alert(JSON.stringify(ress))
	// 		})
	//     } ,urls);  
	// },
	wxjspay: function(jsApiParameters, callback) {
		callback = callback || function(status) {};
		var urls = window.location.href;
		if (!this.isWechat()) {
			return;
		}
		this.initJssdk(function(signData) {
			jweixin.ready(function() {
				/* jweixin.chooseWXPay(jsApiParameters);
				jsApiParameters.success = function (){
					callback('success');
				};
				
				jsApiParameters.cancel = function (){
					callback('cancel');
				};
				
				jsApiParameters.fail = function (){
					callback('fail');
				}; */
	
				let jsApi = JSON.parse(jsApiParameters);
				jweixin.chooseWXPay({
					timestamp: jsApi.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
					nonceStr: jsApi.nonceStr, // 支付签名随机串，不长于 32 位
					package: jsApi.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
					signType: jsApi.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
					paySign: jsApi.paySign, // 支付签名
					success: function(res) {
						// res.errMsg === 'chooseWXPay:ok'方式判断前端返回,微信团队郑重提示：
						// res.errMsg将在用户支付成功后返回ok，但并不保证它绝对可靠， 切记。
						if (res.errMsg === 'chooseWXPay:ok') {
							callback('success');
						}
					},
					// 支付取消回调函数
					cencel: function(res) {
						callback('cancel');
					},
					// 支付失败回调函数
					fail: function(res) {
						callback('fail');
					}
				});
			});
			jweixin.error(function(ress) {
				// alert(JSON.stringify(ress))
			})
		}, urls);
	},
	 
	//微信获取定位信息
	getLocation: function (callback){
		callback = callback || function (){};
		var urls = window.location.href;
		this.initJssdk(function(signData){ 
			jweixin.ready(function () {
				jweixin.getLocation({
					type: 'gcj02',
					success: function (res) {
						var lnglat = {
							"lng": res.longitude, 
							"lat": res.latitude,            
						};
						callback('success', lnglat);
					},
					fail: function (res) {
						alert('微信获取位置失败');
						callback('fail');
					},
					cancel: function (res) {
						alert('用户拒绝获取位置');
						callback('cancel');
					},
					complete: function (res){
						
					}
				});
			});
		},urls)
	}
}  