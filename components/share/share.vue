<template>
	<view class="share_all">
		<transition name="fade">
			<view v-if="shaflag" class="shadow" @click="shaFn"></view>
		</transition>

		<!-- #ifdef MP-WEIXIN -->
		<image v-if="shaflag" :src="invitionimg" class="share_bottom9"></image>
		<!-- #endif -->

		<!-- #ifdef APP-PLUS -->
		<view :class="shaflag && isShowBottom ? 'share_bottom share_bottom8' : 'share_bottom'">

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
		<view v-if="is_weixin == 1 && isShowBottom" :class="shaflag ? 'share_bottom share_bottom8' : 'share_bottom'">

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

		<view v-else :class="shaflag && isShowBottom ? 'share_web share_web2' : 'share_web'">
			<view v-if="shaflag" class="social-share" data-sites="qq, qzone, wechat, weibo" :data-title="shareTitle" :data-description="shareContent" :data-image="shareThumb" :data-url="shareLink">
				<!-- <view v-if="homeflag != true" class="share_bottom3 share_bottomh5" @click="totieFn">
						<image :src="changimg" class="share_bottom5"></image>
					</view> -->
			</view>
			<view class="share_bottom7" @click="shaFn">取消</view>
		</view>
		<!-- #endif -->

		<transition name="fade">
			<view v-if="shaflag && is_weixin == 1" @click="shaFn" style="position: fixed;top: 0;left: 0;bottom: 0;right: 0;z-index: 5;background: rgba(0,0,0,0.4);">
				<image :src="invitionimg" class="share_bottom9"></image>
			</view>
		</transition>

	</view>
</template>

<script>
	var plugins = require('../../common/testplugin.js');
	import '../../static/common/share.css';
	import api from '../../api/api.js'
	export default {
		props: [
			"shaflag",       // 是否显示
			"shareTitle",    // 分享标题
			"shareContent",  // 分享内容
			"shareLink",     // 分享链接
			"shareThumb",    // 分享图片
			"isShowBottom",  // 是否展示弹出底部
		],
		data() {
			return {
				plugins: plugins,
				changimg: require('../../static/share/btn_img_share@2x.png'),
				qqshareimg: require('../../static/share/btn_qq_share@2x.png'),
				qzoneshareimg: require('../../static/share/btn_qqs_share@2x.png'),
				wchatshareimg: require('../../static/share/btn_wechat_share@2x.png'),
				wchatsshareimg: require('../../static/share/btn_wechats_share@2x.png'),
				invitionimg: require('../../static/share/invition.png'),
				is_weixin: 0,
			}
		},
		onLoad() {
			var that = this;
		},
		mounted() {
			var that = this;
			// #ifdef H5
			if (api.checkIsWeixin()) {
				that.is_weixin = 1;
				setTimeout(() => {
					that.wxshareFn()
				}, 300)
			}
			// #endif
		},
		methods: {
			reshare(){
				api.recordshare({
					'type':'',
					'news_id':''
				},function(res){
					conso.log(res)
				})
			},
			wxshareFn: function() {
				var that = this;
				// alert('222')
				var sharetit = that.shareTitle;
				var sharedesc = that.shareContent;
				var erweiurl = that.shareLink;
				var shareimg = that.shareThumb;
				that.$wchat.share({
					title: sharetit,
					desc: sharedesc,
					img: shareimg
				}, erweiurl);
			},
			shaFn() {
				this.$emit('closeShaflag', false)
				// #ifdef H5
				// that.removejscssfile('https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.16/js/social-share.min.js','js')
				// #endif
			},
			closeshaFn() {
				// #ifdef H5
				that.removejscssfile('https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.16/js/social-share.min.js', 'js')
				// #endif
			},
			removejscssfile(filename, filetype) {
				var targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none"
				var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none"
				var allsuspects = document.getElementsByTagName(targetelement)
				for (var i = allsuspects.length; i >= 0; i--) {
					if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(
							filename) != -1)
						allsuspects[i].parentNode.removeChild(allsuspects[i])
				}
			},
			removescr(e, t) {
				console.log(111)
				var targetelement = (t == "js") ? "script" : (t == "css") ? "link" : "none"
				var targetattr = (t == "js") ? "src" : (t == "css") ? "href" : "none"
				var allsuspects = document.getElementsByTagName(targetelement);
				console.log(allsuspects)
				for (var i = allsuspects.length; i >= 0; i--) {
					console.log(allsuspects)
					if (allsuspects[i].src == e) {
						console.log(i, 852)
					}
					if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(
							e) != -1)
						allsuspects[i].parentNode.removeChild(allsuspects[i])
				}
			},
			getvalFn() {
				uni.getProvider({
					service: 'share',
					success: function(res) {
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
			wechatFn() {
				this.closeshaFn();
				this.shaFn()
				this.plugins.AppShare([this.shareContent, this.shareLink, this.shareTitle, this.shareThumb, 'WXSceneSession'],
					function(result) {
						uni.showToast({
							title: JSON.stringify(result),
							icon: 'none'
						});
					},
					function(result) {
						uni.showToast({
							title: result
						});
					});
			},
			wechatsFn() {
				this.closeshaFn();
				this.shaFn()
				this.plugins.AppShare([this.shareContent, this.shareLink, this.shareTitle, this.shareThumb, 'WXSenceTimeline'],
					function(result) {
						uni.showToast({
							title: JSON.stringify(result),
							icon: 'none'
						});
					},
					function(result) {
						uni.showToast({
							title: result
						});
					});
			},
			qqFn() {
				this.closeshaFn();
				this.shaFn()
				this.plugins.AppShare([this.shareContent, this.shareLink, this.shareTitle, this.shareThumb, 'qq'],
					function(result) {
						uni.showToast({
							title: JSON.stringify(result),
							icon: 'none'
						});
					},
					function(result) {
						uni.showToast({
							title: result
						});
					});
			},
			qzoneFn() {
				this.closeshaFn();
				this.shaFn()
				this.plugins.AppShare([this.shareContent, this.shareLink, this.shareTitle, this.shareThumb, 'qZone'],
					function(result) {
						uni.showToast({
							title: JSON.stringify(result),
							icon: 'none'
						});
					},
					function(result) {
						uni.showToast({
							title: result
						});
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
