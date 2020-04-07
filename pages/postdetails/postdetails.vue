<template>
	<view>
		<!-- 项目中心图文详情 -->
		<centerpic v-if="postdetails.type_label == 'center' && postdetails.type == 0" :detail="postdetails" :comments="comments"
		 :judiflag="judiflag"></centerpic>
		<!-- 项目中心图文详情 end -->
		
		<!-- 项目中心视频详情 -->
		<centervideo v-if="postdetails.type_label == 'center' && postdetails.type == 1" :detail="postdetails" :comments="comments"
		 :judiflag="judiflag"></centervideo>
		<!-- 项目中心视频详情 end -->
	</view>
</template>

<script>
	var plugins = require('../../static/common/plugin.js');
	
	import centerpic from '../../components/poatdetails/centerdetails.vue'
	import centervideo from '../../components/poatdetails/centervideo.vue'
	
	import api from '../../api/api.js'
	export default {
		created() {
			var that = this;
			console.log(that.$eventHub)
			that.$eventHub.$on('is_redbao', (e) => {
				if (e == true) {
					that.shadowFn = true
					that.redBaoFn = true
				}
			})
			// console.log(that.$eventHub.$on('is_redbao'))
		},
		onLoad(e) {
			//alert(88888)

			var that = this;
			this.news_id = e.news_id
			// #ifdef APP-PLUS
			if(e.loadZheZao){
				that.loadZhaze = true
			}else {
				uni.showLoading({
					title: '加载中...'
				})
			}
			// #endif
			//alert(this.life_id)
			// #ifndef H5
			if (uni.getSystemInfoSync().screenHeight >= 812) {
				that.judiflag = true;
			} else {
				that.judiflag = false;
			}
			// #endif
			
			
			//如果url中存在uid,则此链接为分享链接，需留记录
			      if(e.uid){
			          api.clickshare({
			              'type' : 'center',
			              'news_id' :  e.news_id,
			              'uid' : e.uid
			          }, function(res) {
			              console.log(res)
			          })
			      }
		},
		components: {
			centerpic,
			centervideo
		},
		onShow() {
			var that = this
			if(that.news_id > 0) {
				that.getPostDetails()
			}
			that.UxLocation = api.__CFG.UxLocation
			// #ifdef H5
			document.title = that.wxtitle;
			// #endif
		},
		data() {
			return {
				type: 0,
				shadowFn: false,
				redBaoFn: false,
				judiflag: false,
				postdetails: {},
				stickTiem: '', // 置顶剩余时间
				mediaPic: [],
				comments: [],
				endTime: '', // 报名剩余时间
				UxLocation: api.__CFG.UxLocation,
				wxtitle: '详情',
				loadZhaze: false,
				plugins: plugins,
			}
		},
		methods: {
			colosePoP() {
				this.shadowFn = false
				this.redBaoFn = false
			},
			getPostDetails() {
				if (this.news_id > 0) {
					api.tcinfcenterdetail({
						'news_id': this.news_id
					}, res => {
						if (res.error == 0) {
							this.postdetails = res.data.detail
							this.comments = res.data.items
						} else {
							uni.showToast({
								icon: 'none',
								title: res.message,
								duration: 1500
							})
							// #ifdef H5
							setTimeout(() => {
								history.back()
							}, 1500)
							// #endif
							// #ifndef H5
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1500)
							// #endif
						}
					})
				}

			},
		}
	}
</script>

<style scoped="scoped">
	.shadow_box{position: fixed;top: 0;left: 0;bottom: 0;right: 0;z-index: 3;background: rgba(0,0,0,0.4);}
	.suc_pop{width: 642upx;height: 634upx;background: #FFFFFF;border-radius: 16upx;position: fixed;top: 50%;left: 50%;margin-top: -317upx;margin-left: -321upx;z-index: 5;text-align: center;}
	.suc_pop .close_pop{position: absolute;width: 88upx;height: 88upx;top: 0;right: 0;border-top-right-radius: 16upx;}
	.suc_pop .ti{font-size: 32upx;color: #333333;margin-top: 80upx;}
	.suc_pop .suc_pop_img{display: inline-block;width: 280upx;height: 165upx;margin-top: 36upx;}
	.suc_pop .suc_notice{padding: 37upx 104upx 24upx;font-size: 28upx;color: #666666;}
	.suc_pop .suc_btn{display: inline-block;font-size: 32upx;color: #FFFFFF;background: #FD7F00;border-radius: 8upx;width: 546upx;height: 88upx;line-height: 88upx;}
	
	.load_ze_zao{position: fixed;top: 0;left: 0;right: 0;bottom: 0;background: #FFFFFF;z-index: 100;display: flex;align-items: center;justify-content: space-around;}
	.load_ze_icon{width: 640rpx;height: 480rpx;}
</style>

