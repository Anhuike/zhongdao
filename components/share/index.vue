<template>
	<view class="share_all">
		<transition name="fade">
			<view v-if="shaflag" class="shadow" @click="shaFn"></view>
		</transition>
		
		<!-- #ifdef MP-WEIXIN -->
			<image v-if="shareflag" :src="invitionimg" class="share_bottom9"></image>
		<!-- #endif -->
		
		<!-- #ifdef APP-PLUS -->
			<view :class="shareflag ? 'share_bottom share_bottom8' : 'share_bottom'">
				
				<view class="share_bottom2">
					<view class="share_bottom3" @click="wechatFn">
						<image :src="wchatshareimg" class="share_bottom5"></image>
						<view class="share_bottom6">微信</view>
					</view>
					<view class="share_bottom3" @click="qqFn">
						<image :src="qqshareimg" class="share_bottom5"></image>
						<view class="share_bottom6">QQ</view>
					</view>
					<view class="share_bottom3" @click="wechatsFn">
						<image :src="wchatsshareimg" class="share_bottom5"></image>
						<view class="share_bottom6">朋友圈</view>
					</view>
					<view class="share_bottom3" @click="qzoneFn">
						<image :src="qzoneshareimg" class="share_bottom5"></image>
						<view class="share_bottom6">空间</view>
					</view>
					<!-- <view v-if="homeflag != true" class="share_bottom3" @click="totieFn">
						<image src="../../../static/share/btn_img_share@2x.png" class="share_bottom5"></image>
						<view class="share_bottom6">长图</view>
					</view> -->
				</view>
				
				<view class="share_bottom7" @click="shaFn">取消</view>
			</view>
		<!-- #endif -->
		
		<!-- #ifdef H5 -->
			<view v-if="is_weixin == 1" :class="shareflag ? 'share_bottom share_bottom8' : 'share_bottom'">
				
				<view class="share_bottom2">
					<view class="share_bottom3" @click="wxdianFn">
						<image :src="wchatshareimg" class="share_bottom5"></image>
						<view class="share_bottom6">微信</view>
					</view>
					<view class="share_bottom3" @click="wxdianFn">
						<image :src="qqshareimg" class="share_bottom5"></image>
						<view class="share_bottom6">QQ</view>
					</view>
					<view class="share_bottom3" @click="wxdianFn">
						<image :src="wchatsshareimg" class="share_bottom5"></image>
						<view class="share_bottom6">朋友圈</view>
					</view>
					<view class="share_bottom3" @click="wxdianFn">
						<image :src="qzoneshareimg" class="share_bottom5"></image>
						<view class="share_bottom6">空间</view>
					</view>
				</view>
				
				<view class="share_bottom7" @click="shaFn">取消</view>
			</view>
			
			<view v-else :class="shareflag ? 'share_web share_web2' : 'share_web'">
				<view v-if="shareflag" class="social-share" data-sites="qq, qzone, wechat, weibo" :data-title="sharetit" :data-description="sharedesc" :data-image="shareimg" :data-url="sharelink">
					<!-- <view v-if="homeflag != true" class="share_bottom3 share_bottomh5" @click="totieFn">
						<image :src="changimg" class="share_bottom5"></image>
					</view> -->
				</view>
				<view class="share_bottom7" @click="shaFn">取消</view>
			</view>
		<!-- #endif -->
		
		<transition name="fade">
			<view v-if="wxshareflag" @click="wxzheFn" style="position: fixed;top: 0;left: 0;bottom: 0;right: 0;z-index: 5;background: rgba(0,0,0,0.4);">
				<image :src="invitionimg" class="share_bottom9"></image>
			</view>
		</transition>
		
	</view>
</template>

<script>
	var plugins = require('../../common/testplugin.js');
	import '../../static/common/share.css';
	import api from '../../api/api.js'
	import {  
	    mapState,  
	    mapMutations  
	} from 'vuex';
	export default {
		props: {
		  share: {
		  	type: Array,
		  	default () {
		  		return [];
		  	}
		  }
		},
		data() {
			return {
				plugins: plugins,
				changimg: require('../../../static/share/btn_img_share@2x.png'),
				qqshareimg: require('../../../static/share/btn_qq_share@2x.png'),
				qzoneshareimg: require('../../../static/share/btn_qqs_share@2x.png'),
				wchatshareimg: require('../../../static/share/btn_wechat_share@2x.png'),
				wchatsshareimg: require('../../../static/share/btn_wechats_share@2x.png'),
				invitionimg: require('../../../static/share/invition.png'),
				is_weixin: 0,
				wxshareflag: false,
				// sharetype: 'weixin',
				// shaflag: false,
				// shareflag: false,
				// title: 'Hello'
			}
		},
		computed: {  
		    ...mapState(['shareflag','shaflag','sharetit','sharedesc','sharelink','shareimg','life_id','homeflag'])  
		},  
		components: {
			
		},
		onLoad() {
			var that = this;
			console.log(11)
			// that.sharesFn();
			// that.getvalFn();
		},
		mounted() {
			var that = this;
			// #ifdef H5
			if(api.checkIsWeixin()){
				that.is_weixin = 1;
			}
			// #endif
			
		},
		onReady() {
			console.log(222)
		},
		methods: {
			...mapMutations({
				"shasFn": "login",
				"closeshasFn": "login",
			}),
			wxshareFn: function(){
			    var that = this;
				// alert('222')
			    var sharetit = that.sharetit;
			    var sharedesc = that.sharedesc;
			    var erweiurl = that.sharelink;
				var shareimg = that.shareimg;
			    that.$wchat.share({
					title: sharetit,
					desc: sharedesc,  
					img: shareimg
				},erweiurl);  
			},
			wxzheFn(){
				var that = this;
				that.wxshareflag = false;
			},
			wxdianFn(){
				var that = this;
				that.wxshareflag = true;
				that.shaFn();
				that.wxshareFn();
			},
			sharesFn(){
				var that = this;
				if(that.share != ''){
					that.shaflag = true;
					that.shareflag = true;
				}
			},
			totieFn(){
				var that = this;
				// setTimeout(function(){
					this.shaFn();
				// },1000)
				uni.navigateTo({
					url: '../../pages/posttie/tieshare?life_id=' + that.life_id
				})
			},
			shaFn(){
				var that = this;
				var data = [
					{
						shaflag: false,
						homeflag: false,
						shareflag: false,
						sharetit: '',
						sharedesc: '',
						sharelink: '',
						shareimg: '',
						life_id: '',
					}
				];
				// #ifdef H5
				// that.removejscssfile('https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.16/js/social-share.min.js','js')
				// #endif
				that.$nextTick(function(){
					this.shasFn(data);
				})
// 				that.shaflag = false;
// 				that.shareflag = false;
			},
			shainfFn(){
				var that = this;
				var data = [
					{
						sharetit: '',
						sharedesc: '',
						sharelink: '',
						shareimg: '',
						life_id: '',
					}
				];
				// #ifdef H5
				// that.removejscssfile('https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.16/js/social-share.min.js','js')
				// #endif
				that.$nextTick(function(){
					this.shasFn(data);
				})
// 				that.shaflag = false;
// 				that.shareflag = false;
			},
			closeshaFn(){
				var that = this;
				var data = [
					{
						shaflag: false,
						homeflag: false,
						shareflag: false,
					}
				];
				// #ifdef H5
				that.removejscssfile('https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.16/js/social-share.min.js','js')
				// #endif
				that.$nextTick(function(){
					this.closeshasFn(data);
				})
// 				that.shaflag = false;
// 				that.shareflag = false;
			},
			removejscssfile(filename,filetype){
				var targetelement=(filetype=="js")? "script" :(filetype=="css")? "link" : "none"
				var targetattr=(filetype=="js")?"src" : (filetype=="css")? "href" :"none"
				var allsuspects=document.getElementsByTagName(targetelement)
				for (var i=allsuspects.length; i>=0;i--){
				if (allsuspects[i] &&allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
				 allsuspects[i].parentNode.removeChild(allsuspects[i])
				}
			},
			removescr(e,t){
				console.log(111)
				var targetelement=(t =="js")? "script" : (t == "css")? "link" : "none"
				var targetattr=(t =="js")? "src" : (t == "css")? "href" : "none"
				var allsuspects=document.getElementsByTagName(targetelement);
				console.log(allsuspects)
				for (var i=allsuspects.length; i>=0; i--){
					console.log(allsuspects)
					if(allsuspects[i].src == e){
						console.log(i,852)
					}
					if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(e)!=-1)
					   allsuspects[i].parentNode.removeChild(allsuspects[i])
					}
			},
			getvalFn(){
				uni.getProvider({
					service: 'share',
					success: function (res) {
						console.log(res)
						console.log(res.provider)
						// this.sharetype = res.provider;
						// console.log(this.sharetype)
						// 授权使用
// 						if (~res.provider.indexOf('qq')) {
// 							uni.login({
// 								provider: 'qq',
// 								success: function (loginRes) {
// 									console.log(JSON.stringify(loginRes));
// 								}
// 							});
// 						}
					}
				});
			},
			wechatFn(){
				var that = this;
				that.closeshaFn();
				setTimeout(function(){
					that.shainfFn();
				},2000)
				that.plugins.AppShare([that.sharedesc,that.sharelink,that.sharetit,that.shareimg,'WXSceneSession'],
                function(result) {
					uni.showToast({title:JSON.stringify(result),icon:'none'});
                },
                function(result) {
					uni.showToast({title:result});
                });
				
				// console.log(JSON.stringify(this.sharelink))
				// // 微信分享
				// uni.share({
				// 	provider: "weixin",
				// 	scene: "WXSceneSession",
				// 	type: 0,
				// 	href: this.sharelink,
				// 	title: this.sharetit,
				// 	summary: this.sharedesc,
				// 	imageUrl: this.shareimg,
				// 	success: function (res) {
				// 		console.log("success:" + JSON.stringify(res));
				// 	},
				// 	fail: function (err) {
				// 		// #ifdef APP-PLUS
				// 		plus.nativeUI.alert(JSON.stringify(err))
				// 		// #endif
				// 		console.log("fail:" + JSON.stringify(err));
				// 	},
				// 	complete: (msg) => {
				// 		// #ifdef APP-PLUS
				// 		plus.nativeUI.alert(JSON.stringify(msg))
				// 		// #endif
				// 		this.shaFn();
				// 	}
				// });
			},
			wechatsFn(){
				var that = this;
				that.closeshaFn();
				setTimeout(function(){
					that.shainfFn();
				},2000)
				that.plugins.AppShare([that.sharedesc,that.sharelink,that.sharetit,that.shareimg,'WXSenceTimeline'],
				function(result) {
					uni.showToast({title:JSON.stringify(result),icon:'none'});
				},
				function(result) {
					uni.showToast({title:result});
				});
				
				// 朋友圈分享
				// uni.share({
				// 	provider: "weixin",
				// 	scene: "WXSenceTimeline",
				// 	type: 0,
				// 	href: this.sharelink,
				// 	title: this.sharetit,
				// 	summary: this.sharedesc,
				// 	imageUrl: this.shareimg,
				// 	success: function (res) {
				// 		uni.showToast({
				// 			title: '已分享',
				// 			icon: 'none',
				// 			duration: 2000
				// 		});
				// 		console.log("success:" + JSON.stringify(res));
				// 	},
				// 	fail: function (err) {
				// 		// #ifdef APP-PLUS
				// 		plus.nativeUI.alert(JSON.stringify(err))
				// 		// #endif
				// 		console.log("fail:" + JSON.stringify(err));
				// 	},
				// 	complete: (msg) => {
				// 		// #ifdef APP-PLUS
				// 		plus.nativeUI.alert(JSON.stringify(msg))
				// 		// #endif
				// 		this.shaFn();
				// 	}
				// });
			},
			qqFn(){
				var that = this;
				that.closeshaFn();
				setTimeout(function(){
					that.shainfFn();
				},2000)
				that.plugins.AppShare([that.sharedesc,that.sharelink,that.sharetit,that.shareimg,'qq'],
				function(result) {
					uni.showToast({title:JSON.stringify(result),icon:'none'});
				},
				function(result) {
					uni.showToast({title:result});
				});
				
				// qq分享(支持文字，图片，音乐)
				// uni.share({
				// 	provider: "qq",
				// 	// scene: "WXSenceTimeline",(微信里必选)
				// 	type: 2,
				// 	title: this.sharetit,
				// 	href: this.sharelink,
				// 	summary: this.sharedesc,
				// 	imageUrl: this.shareimg,
				// 	success: function (res) {
				// 		// uni.showToast({
				// 		// 	title: '已分享',
				// 		// 	icon: 'none',
				// 		// 	duration: 2000
				// 		// });
				// 		console.log("success:" + JSON.stringify(res));
				// 	},
				// 	fail: function (err) {
				// 		console.log(JSON.stringify(err))
				// 		console.log("fail:" + JSON.stringify(err));
				// 	},
				// 	complete: (end) => {
				// 		this.shaFn();
				// 		console.log(JSON.stringify(end))
				// 	}
				// });
			},
			qzoneFn(){
				var that = this;
				that.closeshaFn();
				setTimeout(function(){
					that.shainfFn();
				},2000)
				that.plugins.AppShare([that.sharedesc,that.sharelink,that.sharetit,that.shareimg,'qZone'],
				function(result) {
					uni.showToast({title:JSON.stringify(result),icon:'none'});
				},
				function(result) {
					uni.showToast({title:result});
				});
				
			},
		}
	}
</script>

<style scoped>
	/* @import url("../../common/share.css"); */
	/* @import url("https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.16/css/share.min.css"); */
	.shadow{position: fixed;top: 0;left: 0;right: 0;bottom: 0;background: rgba(0,0,0,0.4);z-index: 5;}
	
	.share_bottom{position: fixed;bottom: 0;left: 0;right: 0;background: #fff;z-index: 5;transition: all linear 0.3s;transform: translateY(100%);}
	.share_bottom8{transform: translateY(0);}
	.share_bottom2{padding: 40upx 0;text-align: center;display: flex;align-items: center;}
	.share_bottom3{flex: 1;}
	.share_bottom5{max-height: 80upx;max-width: 80upx;}
	.share_bottom6{color: #666666;font-size: 28upx;padding-top: 16upx;}
	.share_bottom7{border-top: 2upx solid #F5F5F5;padding: 26upx;text-align: center;color: #666666;font-size: 32upx;}
	
	.share_bottom9{position: fixed;top: 10%;right: 20%;z-index: 5;max-width: 350upx;}
	
	.share_bottomh5{margin: 20upx;}
	
	.share_web{position: fixed;bottom: 0;left: 0;right: 0;background: #fff;z-index: 5;transition: all linear 0.3s;transform: translateY(100%);}
	.share_web2{transform: translateY(0);}
	.social-share{display: flex;align-items: center;height: 100%;width: 100%;}
</style>
