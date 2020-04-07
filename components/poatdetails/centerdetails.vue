<template>
	<view>
		<!-- 顶部 -->
		<view class="header" id="header_zX" v-if="isIOS == 0 && is_weixin == 0">
			<image @click="back" class="header_back" src="../../static/header/btn_nav_back@3x.png" mode=""></image>
			详情
		</view>
		<!-- 顶部 end -->
		<!-- <view>
			<states :top="'88rpx'" :marT="'50rpx'" :Fix='true' :label="'测试'" :reason="'哈哈'" @statesHeight="statesHeight"></states>
		</view> -->
		
		<!-- 详情内容 -->
		<view>
			<scroll-view class="videoScroll" :style="isIOS == 0 && is_weixin == 0 ? '' : 'top: 0;'" scroll-y scroll-with-animation="true" :scroll-into-view='toView' @scroll="turnScroll" @scrolltolower="scrolltoGetlowerComment" >
				<!-- 状态栏距离 -->
				<!-- <view :style="{'width': '100%', 'height': statesH + 'px'}"></view> -->
				<!-- 状态栏距离 -->
				<view class="zixun_title">{{detail.title}}</view>
				<view class="zx_form">
					<view>
						<text style="margin-right: 24upx;">来源：{{detail.from}}</text>
						<text>{{detail.views}}阅读</text>
					</view>
					<view>{{detail.update_time}}</view>
				</view>
				<view class="zx_content" v-html="content"></view>
				
				<!-- 评论 -->
					<view class="comment_title" id="comment">评论</view>
					<!-- 评论 end -->
						
					<!-- 空评论 -->
					<block v-if="commentsList.length == 0">
						<emptyComments></emptyComments>
						<view style="height: 60rpx;"></view>
					</block>
							
					<!-- 评论内容 -->
					<block v-if="commentsList.length != 0">
						<view class="comment" v-for="(item,indexcom) in commentsList" :key="indexcom">
							<view class="comment_top">
								<image class="top_pic" :src="item.face" @click="jumpuh(item.uid)"></image>
								<view class="top_name">{{item.nickname}}</view>
							</view>
							<view class="comment_con">
								<view class="ccon"  @click="openReply(item.comment_id)">{{item.content}}</view>
								<view class="notice">
									<text class="notice1">{{item.dateline}}</text>
									<text class="notice2" @click="openReply(item.comment_id)">{{item.reply_count}}回复</text>
									<text class="notice3" v-if="item.is_me == 1" @click="dropComments(item.comment_id)">删除</text>
								</view>
							</view>
						</view>
					</block>
					<view class="comment_bot" :style="judiflag ? 'height: 186rpx;' : 'height: 160rpx;'" v-if="commentsList.length != 0">{{replaynotice}}</view>
					<!-- 评论内容 end -->
			</scroll-view>
		</view>
		
		<!-- 底部评论 -->
		<view class="bottom" :style="judiflag ? 'height: 116rpx;' : 'height: 90rpx;'">
			<view class="bottom_box">
				<!-- <input type="text" placeholder="写评价…" @confirm="onKeyComment" v-model="keyComment" confirm-type="send" class="bottom_input" placeholder-style="font-size: 28upx;color: #999999;" /> -->
				<!-- #ifdef H5 -->
				<input type="text" placeholder="写评价…" @confirm="onKeyComment" v-model="keyComment" confirm-type="send" class="bottom_input"
				 placeholder-style="font-size: 28upx;color: #999999;" @blur="backViewTop"/>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<input disabled="true" type="text" placeholder="写评价…" v-model="keyComment" class="bottom_input"
				 placeholder-style="font-size: 28upx;color: #999999;" @click="showChatBox(0)" />
				<!-- #endif -->
				<view class="bottom_icon" @click="returnComment">
					<image class="bottom_img" src="../../static/mine_img/btn_bottom_like@2x.png" mode=""></image>
					<view class="bottom_icon_pinglun" v-if="commentsList.length != 0">{{totalComments}}</view>
				</view>
				<view class="bottom_icon">
					<image class="bottom_img" @tap="chZan" :src="is_zan == 1 ? '../../static/mine_img/btn_bottom_share_pre@2x.png' : '../../static/mine_img/btn_bottom_share@2x.png'"></image>
				</view>
				<view class="bottom_icon">
					<image class="bottom_img" @tap="moreShare" src="../../static/postdetails/btn_nav_share@2x.png"></image>
				</view>
			</view>
		</view>
		<!-- 底部评论 end -->
		
		<!-- 分享返回主页按钮 -->
		<view class="back_share">
			<view class="back_home" @click="backToHome" v-if="isBackHome == 1">
				<image class="back_home_img" src="../../static/postdetails/post_home.png" mode=""></image>
			</view>
		</view>
		
		<!-- 回复列表弹窗 -->
		<view>
			<transition name="fade">
				<view v-if="shadowFn" class="shadow_box" @click="closePop"></view>
			</transition>
			<view class="replayV" :style="replayFn ? 'transform: translateY(0%);-webkit-transform: translateY(0%);' : 'transform: translateY(100%);-webkit-transform: translateY(100%);'">
				<view class="replayV_title">
					<image @click="closePop" class="replayV_title_close" src="../../static/fabu_img/icon_pay_close@2x.png" mode=""></image>
					{{replayComments.reply_count}}条回复
				</view>
				<view>
					<scroll-view class="replay_scroll" scroll-y @scrolltolower="scrolltoGetlower">
						<view class="ti">
							<view class="ti_left">
								<image class="ti_pic" :src="replayComments.face"  @click="jumpuh(replayComments.uid)"></image>
								<view class="ti_name">{{replayComments.nickname}}</view>
								<view class="ti_author" v-if="replayComments.uid == detail.uid">作者</view>
							</view>
							<view class="ti_right">{{replayComments.dateline}}</view>
						</view>
						<view class="ti_con" @click="replayLz">
							<view >{{replayComments.content}}</view>
						</view>
						<view class="divider"></view>
						<view class="replay_title_notice">相关回复</view>
						<block v-for="(replyitem, index) in replyItems" :key="index">
							<view class="ti">
								<view class="ti_left">
									<image class="ti_pic" :src="replyitem.face" @click="jumpuh(replyitem.uid)"></image>
									<view class="ti_name">{{replyitem.nickname}}</view>
									<view class="ti_author"  v-if="replyitem.uid == detail.uid">作者</view>
								</view>
								<view class="ti_right">{{replyitem.dateline}}</view>
							</view>
							<view class="ti_con" >
								<view style="flex: 1;" @click="transmit(replyitem.reply_id, replyitem.nickname, replyitem.is_me)"><text style="color: #3399FF;margin-right: 10upx;" v-if="replyitem.to_uid !=0">@{{replyitem.to_nickname}}</text>{{replyitem.content}}</view>
								<view style="font-size: 24upx;color: #1A9BFF;" v-if="replyitem.is_me == 1" @click="dropReplays(replyitem.reply_id)">删除</view>
							</view>
							<view class="divider2"></view>
						</block>
						<view class="replayV_bot" :style="judiflag ? 'height: 206rpx;' : 'height: 180rpx;'" v-if="replyItems.length>0">{{replaynotice}}</view>
					</scroll-view>
				</view>
				<view class="replay_input" :style="judiflag ? 'height: 116rpx;' : 'height: 90rpx;'">
					<!-- #ifndef APP-PLUS -->
					<input @input='onKeyReplyWord' @confirm="onKeyReply" v-model="replayContent" :focus="replayFocus" confirm-type="send" 
					 class="replay_input_in" type="text" value="" :placeholder="replayPlace" placeholder-style="font-size: 28upx; color: #999999; " @blur="backViewTop" />
					<!-- #endif -->
					<!-- #ifdef APP-PLUS -->
					<input v-model="replayContent" @click="showChatBox(1)" disabled="true"
					 class="replay_input_in" type="text" value="" :placeholder="replayPlace" placeholder-style="font-size: 28upx; color: #999999; " />
					<!-- #endif -->
				</view>
			</view>
		</view>
		<!-- 回复列表弹窗 end -->
		
		<userSare :shaflag="shaflag" :shareTitle="detail.title" :shareContent="detail.text" :shareLink="detail.link" :shareThumb="detail.thumb" :isShowBottom="isShowBottom" @closeShaflag="closeShaflag"></userSare>
		
		<!-- 聊天框 -->
		<!-- #ifdef APP-PLUS -->
		<!-- <chatbox :title="title" :show="showPOP" type="postFn" @cancelFn="cancelFn" @sendFn="sendFn"></chatbox> -->
		<view>
			<view class="chat_box" :style="showPOP == 1 ? 'transform: translateY(0%);' : ''">
				<!-- 顶部 -->
				<view class="chat_head">
					<view class="chat_cancel" @click="cancelFn">取消</view>
					<view class="chat_tit">{{chattitle}}</view>
					<view class="chat_send" @click="sendFn">发送</view>
				</view>
				<!-- 顶部 end -->
				<!-- 输入 -->
				<view class="chat_con">
					<textarea v-model="chatContent" :placeholder="comreNotice" maxlength="-1" auto-height class="chat_con_text" placeholder-style="font-size: 28rpx;color: #999999;" />
				</view>
				<!-- 输入 end -->
			</view>
		</view>
		<!-- #endif -->
		<!-- 聊天框 end -->
	</view>
</template>

<script>
	import '../../static/common/share.css'
	import states from '../../components/poatdetails/states.vue'
	import api from '../../api/api.js'
	import userSare from '../../components/share/share.vue'
	import emptyComments from '../../components/poatdetails/emptycomments.vue'
	export default {
		props: ["judiflag","detail","comments"],
		components: {
			states, userSare, emptyComments
		},
		watch: {
			commentScroll(newV, oldV) {
				if (newV != oldV) {
					this.toView = ''
				}
			}
		},
		created() {
			console.log(window)
			// #ifdef H5
			if(window.__CFG.IN_APP_CLIENT == "IOS"){
				this.isIOS = 1
			}
			if(api.checkIsWeixin()){
				this.is_weixin = 1
			}
			// #endif
		},
		mounted() {
			let curPage = this.getCurPage()
			let curParam = curPage.options || curPage.$route.query;
			// console.log(curParam)
			if(curParam.isBackHome == 1){
				this.isBackHome = 1
			}
			this.content = this.detail.content.replace(/\<img/gi, '<img style="width:100%;height:auto;margin: 8px 0;"')
			this.content = this.content.replace(/\n/g,"<br/>")
			this.commentsList = this.comments;
			this.is_zan = this.detail.is_zan
			// 与IOS交互
			// #ifdef H5
			if(api.checkIsWeixin()){
				this.isShowBottom = false;
			}
			// #endif
		},
		data() {
			return {
				isIOS: 0,
				is_weixin: 0,
				statesH: '',
				toView: '',
				keyComment: '',
				is_collect: 1,
				is_zan: 1,
				commentScroll: 0,
				content: '',
				shadowFn: false,
				replayFn: false,
				replayComments: {}, // 回复评论详情
				replyItems: [], // 回复评论详情列表
				replayPlace: '写回复...', // 灰色评论placeholder
				replayContent: '', // 评论回复内容
				replayId: 0, // 回复用户id
				replayFocus: false, // 评论回复按钮焦点判断
				commentFocus: false, // 
				replayPage: 1, // 回复页码
				commentPage: 1, // 评论页码
				commentLoad: true, // 评论触底
				replayLoad: true, // 回复触底
				replaynotice: '评论已经加载完了', // 回复底部提示
				totalComments:this.detail.comments,
				commentsList:[],
				ifDianZan: true, // 点赞 取消赞加锁
				// 分享用到的
				shaflag: false,
				isShowBottom: true,
				isBackHome: 0,
				
				showPOP: 0,
				chattitle: '',
				chatContent: '',
				comreNotice: '',
			}
		},
		// onLoad(options){
		// 	//如果url中存在uid,则此链接为分享链接，需留记录
		// 	      if(options.uid){
		// 	        api.clickshare({
		// 	          'type' : 'center',
		// 	          'news_id' :  options.news_id,
		// 	          'uid' : options.uid
		// 	        }, function(res) {
		// 	          console.log(res)
		// 	        })
		// 	      }
		// },
		methods: {
			showChatBox(e) {
				this.showPOP = 1
				if(e == 0){
					this.chattitle = '评论'
					this.comreNotice = '请输入...'
				}else {
					this.chattitle = '回复'
					this.comreNotice = '请输入...'
				}
			},
			cancelFn() {
				this.showPOP = 0
			},
			sendFn() {
				this.showPOP = 0
				if(this.chattitle == '评论'){
					this.keyComment = this.chatContent
					setTimeout(() => {
						this.chatContent = ''
					}, 100);
					this.onKeyComment()
				}else {
					this.replayContent = this.chatContent
					setTimeout(() => {
						this.chatContent = ''
					}, 100);
					this.onKeyReply()
				}
				
			},
			// 分享落地页返回首页
			backToHome() {
				// #ifdef H5
				var url = window.__CFG.apilink + 'life/pages/index/index';
				location.href = url;
				// #endif
				// #ifndef H5
				uni.navigateTo({
					url: '/pages/index/index',
				});
				// #endif
			},
			// 失去焦点，页面归位
			backViewTop() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				})
			},
			// 组件获取页面路由参数
			getCurPage() {
				let pages = getCurrentPages();
				let curPage = pages[pages.length-1];
				return curPage
			},
			// 接收子组件传来的高度
			statesHeight(e) {
				this.statesH = e
			},
			returnComment() {
				this.toView = 'comment'
			},
			turnScroll(e) {
				this.commentScroll = e.detail.scrollTop
			},
			openReply(id) {
				this.isShowComment = false
				this.replayPlace = '写回复...'
				this.replayCommentId = id
				let page = this.replayPage = 1
				var commentsList = this.commentsList;
				api.tcinfcentercommentdetail({
					'comment_id': this.replayCommentId,
					'page': page
				}, res => {
					if(res.error == 0){
						for (var k = 0; k < commentsList.length; k++) {
							if(commentsList[k].comment_id == id){
								commentsList[k].reply_count = res.data.comment.reply_count;
							}
						}
						this.commentsList = commentsList;
						if(res.data.items.length > 0){
							this.isReply = true
							this.replayComments = res.data.comment
							this.replyItems = res.data.items
							this.replayLoad = true
							this.scrolltoGetlower()
						}else{
							this.replayComments = res.data.comment
							this.replyItems = []
							this.replayLoad = false
							this.replaynotice = '评论已经加载完了~'
						}
					}
				})
				this.shadowFn = true
				this.replayFn = true
			},
			closePop() {
				this.shadowFn = false
				this.replayFn = false
			},
			// 分享
			moreShare() {
				if(this.isIOS == 0){
					this.shaflag = true
					// #ifdef H5
					this.init();
					// #endif
				}else {
					// #ifdef H5
					if(window.__CFG.IN_APP_CLIENT){
						var params = {
							sharetitle: this.detail.title,
							sharelink: this.detail.link,
							shareimg: this.detail.thumb
						}
						if(window.__CFG.IN_APP_CLIENT == "IOS"){
							window.webkit.messageHandlers.AppNativeMethod.postMessage({"function_name": "appNativeShareInfo", "params": JSON.stringify(params)})
						}
					}
					// #endif
				}
			},
			closeShaflag(e) {
				this.shaflag = e
			},
			// #ifdef H5
				init: function () {
					let url = 'https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.16/js/social-share.min.js?v=' +Math.random()
					let script = document.createElement('script')
					script.setAttribute('src', url)
					// setTimeout(function(){
						document.getElementsByTagName('head')[0].appendChild(script)
					// },1000)
				},
			// #endif
			// 删除自己的评论
			dropComments(id) {
				uni.showModal({
					content: "是否确认删除该评论",
					success: (e) => {
						if (e.confirm) {
							api.tcinfcentercommentdelete({
								'type': 1,
								'comment_id': id
							}, res => {
								if(res.error == 0){
									uni.showToast({
										icon: 'none',
										title: '删除成功',
										duration: 1500
									})
									setTimeout(() => {
										if(this.commentsList.length == 1){
											this.commentsList = []
											this.getPostComment()
										}else{
											this.getPostComment()
										}
									}, 1200);
								}else {
									uni.showToast({
										icon: 'none',
										title: res.message
									})
								}
							})
						}
					}
				});
			},
			// 删除自己的回复
			dropReplays(id) {
				uni.showModal({
					content: "是否确认删除该回复",
					success: (e) => {
						if (e.confirm) {
							api.tcinfcentercommentdelete({
								'type': 2,
								'reply_id': id
							}, res => {
								if(res.error == 0){
									uni.showToast({
										icon: 'none',
										title: '删除成功',
										duration: 1500
									})
									setTimeout(() => {
										if (this.replyItems.length == 1) {
											this.openReply(this.replayCommentId)
											this.replyItems = []
											this.getPostComment()
										} else if (this.replyItems.length > 1) {
											this.openReply(this.replayCommentId)
										}
									}, 1200)
								}else {
									uni.showToast({
										icon: 'none',
										title: res.message
									})
								}
							})
						}
					}
				});
			},
			// 帖子底部评论
			onKeyComment() {
				if(this.keyComment != ''){
					api.tcinfcentercomment({
						'news_id': this.detail.news_id,
						'content': this.keyComment
					}, res => {
						if(res.error == 0){
							uni.showToast({
								icon: 'none',
								title: '评论成功'
							})
							this.getPostComment()
							this.keyComment = ''
							// this.commentFocus = true
							setTimeout(() => {
								this.commentFocus = false
							}, 1)
						}else {
							uni.showToast({
								icon: 'none',
								title: res.message
							})
							// this.commentFocus = true
							setTimeout(() => {
								this.commentFocus = false
							}, 1)
						}
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '评论内容不能为空'
					})
				}
			},
			// 获取帖子内评论详情
			getPostComment() {
				let page = this.commentPage = 1
				api.tcinfcentercommentitems({
					'news_id': this.detail.news_id,
					'page': page
				}, res => {
					if(res.error == 0){
						this.totalComments = res.data.comments
						if(res.data.items.length == 0){
							this.commentLoad = false
						}else{
							this.commentLoad = true
							this.commentsList = res.data.items
						}
					}
				})
			},
			// 评论触底
			scrolltoGetlowerComment() {
				// if(this.postDetails.closed == 0 && this.postDetails.audit == 1){
					if(this.commentLoad == true){
						let page = this.commentPage
						page++
						api.tcinfcentercommentitems({
							'news_id': this.detail.news_id,
							'page': page
						}, res => {
							if(res.error == 0){
								this.totalComments = res.data.comments
								if(res.data.items.length == 0){
									this.commentLoad = false
								}else{
									this.commentLoad = true
									this.commentPage = page
									this.commentsList = this.commentsList.concat(res.data.items)
								}
							}
						})
					}
				// }
			},
			// 回复触底加载
			scrolltoGetlower() {
				if(this.replayLoad == true){
					let page = this.replayPage
					page++
					api.tcinfcentercommentdetail( {
						'comment_id': this.replayCommentId,
						'page': page
					}, res => {
						// console.log(res)
						if(res.error == 0){
							if(res.data.items.length > 0){
								this.isReply = true
								this.replayComments = res.data.comment
								this.replayLoad = true
								this.replyItems = this.replyItems.concat(res.data.items)
								this.replayPage = page
							}else{
								this.replayLoad = false
								this.replaynotice = '评论已经加载完了~'
							}
						}
					})
				}
			},
			// 点击用户评论回复楼主
			replayLz() {
				this.replayFocus = false
				this.replayId = 0
				this.replayPlace = '回复楼主'
				setTimeout(() => {
					this.replayFocus = true
				}, 1)
			},
			onKeyReplyWord(e) {
				this.replayContent = e.detail.value
			},
			onKeyCommentWord(e) {
				this.keyComment = e.detail.value
			},
			// 灰色评论区弹出层回复评论
			onKeyReply(){
				var that = this;
				// 判断是回复楼主还是回复其他人 0 回复楼主 其他 回复对应人员
				if(this.replayId == 0){
					api.tcinfcentercommentreply({
						'comment_id': this.replayComments.comment_id,
						'content': this.replayContent
					}, res => {
						if(res.error == 0){
							uni.showToast({
								icon: 'none',
								title: '回复评论成功',
								duration: 1500
							})
							this.openReply(this.replayComments.comment_id)
							this.replayContent = ''
							this.replayId = 0
							this.replayPlace = '写回复...'
							this.replayFocus = false
						}else{
							uni.showToast({
								icon: 'none',
								title: res.message
							})
						}
					})
				}else{
					api.tcinfcentercommentreply({
						'comment_id': this.replayComments.comment_id,
						'content': this.replayContent,
						'to_reply_id': this.replayId
					}, res => {
						if(res.error == 0){
							uni.showToast({
								icon: 'none',
								title: '回复评论成功',
								duration: 1500
							})
							this.openReply(this.replayComments.comment_id)
							this.replayContent = ''
							this.replayId = 0
							this.replayPlace = '写回复...'
							this.replayFocus = false
						}else{
							uni.showToast({
								icon: 'none',
								title: res.message
							})
						}
					})
				}
			},
			// 点击灰色评论区用户评论触发
			transmit(id, name, me) {
				if (this.detail.closed == 0) {
					if (me == 0) {
						// 用户触发的不是自己的回复
						// #ifndef APP-PLUS
						this.replayFocus = false
						this.replayId = id
						this.replayPlace = '回复 ' + name
						setTimeout(() => {
							this.replayFocus = true
						}, 1)
						// #endif
						// #ifdef APP-PLUS
						this.showPOP = 1
						this.chattitle = '回复'
						this.replayId = id
						this.comreNotice = '回复 ' + name
						// setTimeout(() => {
						// 	this.replayFocus = true
						// }, 1)
						// #endif
					} else {
						uni.showToast({
							title: '不可以回复自己的回复',
							icon: 'none'
						});
					}
				}
			},
			// 用户点赞
			chZan() {
				if (this.is_zan == 0 && this.ifDianZan == true) {
					api.tcinfcenterdianzan({
						'news_id': this.detail.news_id,
						'status': 1
					}, res => {
						this.ifDianZan = false
						if (res.error == 0) {
							uni.showToast({
								icon: 'none',
								title: '点赞成功',
								duration: 1500
							})
							setTimeout(() => {
								this.ifDianZan = true
							}, 1500)
							this.is_zan = 1
						} else {
							uni.showToast({
								icon: 'none',
								title: res.message,
								duration: 1500
							})
							setTimeout(() => {
								this.ifDianZan = true
							}, 1500)
						}
					})
				} else if(this.is_zan == 1 && this.ifDianZan == true) {
					api.tcinfcenterdianzan({
						'news_id': this.detail.news_id,
						'status': 0
					}, res => {
						this.ifDianZan = false
						if (res.error == 0) {
							uni.showToast({
								icon: 'none',
								title: '取消点赞成功',
								duration: 1500
							})
							setTimeout(() => {
								this.ifDianZan = true
							}, 1500)
							this.is_zan = 0
						} else {
							uni.showToast({
								icon: 'none',
								title: res.message,
								duration: 1500
							})
							setTimeout(() => {
								this.ifDianZan = true
							}, 1500)
						}
					})
				}
			},
			back() {
				// #ifdef H5
				history.back()
				// #endif
				// #ifndef H5
				uni.navigateBack({
					delta: 1
				})
				// #endif
			},
		}
	}
</script>

<style scoped>
	.header{height: 88upx;line-height: 88upx;text-align: center;font-size: 34upx;color: #333333;position: fixed;top: 0;left: 0;right: 0; z-index: 3;background: #FFFFFF;padding-top: var(--status-bar-height);background: #FFFFFF;}
	.header .header_back{width: 88upx;height: 88upx;position: fixed;left: 0;z-index: 3;top: var(--status-bar-height);}
	.header_share{width: 88upx;height: 88upx;position: fixed;right: 0;z-index: 3;top: var(--status-bar-height);}
	
	.videoScroll{position: absolute;top: 88upx;left: 0;right: 0;bottom: 0;z-index: 1;background: #FFFFFF;padding-top: var(--status-bar-height);background: #F6F6F6;}
	
	.zixun_title{font-size: 36upx;color: #333333;font-weight: bold;padding: 24upx;background: #FFFFFF;}
	.zx_form{padding: 0 24upx;display: flex;align-items: center;justify-content: space-between;font-size: 24upx;color: #999999;background: #FFFFFF;padding-bottom: 24upx;}
	.zx_content{padding: 24upx;font-size: 32upx;color: #666666;background: #FFFFFF;}
	
	.comment_title{font-size: 36upx;color: #333333;height: 80upx;padding: 0 24upx;line-height: 96upx;margin-top: 16upx;background: #FFFFFF;}
	.comment{background: #FFFFFF;margin-bottom: 2upx;}
	.comment .comment_top{display: flex;align-items: center;padding: 30upx 24upx 16upx;}
	.comment .comment_top .top_pic{width: 64upx;height: 64upx;border-radius: 50%;margin-right: 24upx;}
	.comment .comment_top .top_name{font-size: 24upx;color: #999999;margin-right: 24upx;}
	.comment .comment_top .top_author{font-size: 20upx;color: #FFFFFF;background: #FD7F00;padding: 0 8upx;border-radius: 4upx;}
	.comment .comment_con{padding: 0 24upx 24upx 112upx;}
	.comment .comment_con .ccon{font-size: 32upx;color: #333333;}
	.comment .comment_con .notice{display: flex;align-items: center;margin-top: 16upx;}
	.comment .comment_con .notice text{display: inline-block;}
	.comment .comment_con .notice .notice1{font-size: 24upx;color: #999999;margin-right: 16upx;}
	.comment .comment_con .notice .notice2{font-size: 24upx;color: #999999;padding: 0 12upx;border: 2upx solid #999999;border-radius: 20upx;}
	.comment .comment_con .notice .notice3{flex: 1;text-align: right;font-size: 24upx;color: #1A9BFF;padding-right: 16upx;}
	.comment_bot{background: #F5F5F5;width: 100%;line-height: 43px;font-size: 12px;text-align: center;color: #999999;}
	
	.bottom{width: 100%;position: fixed;bottom: 0;left: 0;right: 0; background: #FFFFFF;z-index: 2;}
	.bottom .bottom_box{display: flex;width: 100%;height: 90upx;align-items: center;}
	.bottom .bottom_input{width: 410upx;height: 72upx;margin-left: 24upx;font-size: 28upx;color: #333333;padding-left: 32upx;background: #F9F9F9;border-radius: 36upx;margin-right: 34upx;}
	.bottom .bottom_icon{height: 90upx;line-height: 90upx; width: 80upx;text-align: center;position: relative;}
	.bottom .bottom_icon_pinglun{position: absolute;z-index: 2; top: 4upx;right: -4upx; width: 40upx;height: 40upx;line-height: 40upx;text-align: center;font-size: 24upx;color: #FFFFFF;background: #FF4E4F;border-radius: 50%;}
	.bottom .bottom_icon .bottom_img{width: 80upx;height: 80upx;vertical-align: middle;}
	
	.shadow_box{position: fixed;top: 0;left: 0;bottom: 0;right: 0;z-index: 3;background: rgba(0,0,0,0.4);}
	
	.replayV{background: #FFFFFF;position: fixed;z-index: 4;top: 450upx;bottom: 0;left: 0;right: 0;border-top-left-radius: 30upx;border-top-right-radius: 30upx;transition: all linear .3s;-webkit-transition: all linear .3s;}
	.replayV .replayV_title{height: 96upx;line-height: 96upx;text-align: center;font-size: 36upx;color: #333333;position: relative;border-bottom: 2upx solid #F5F5F5;}
	.replayV .replayV_title .replayV_title_close{width: 96upx;height: 96upx;position: absolute;left: 0;top: 0;}
	.replayV .replay_scroll{position: absolute;top: 102upx;left: 0;bottom: 0;right: 0;z-index: 3;background: #F5F5F5;}
	.replayV .replay_scroll .ti{display: flex;align-items: center;justify-content: space-between;padding: 24upx;background: #FFFFFF;}
	.replayV .replay_scroll .ti .ti_left{display: flex;align-items: center;}
	.replayV .replay_scroll .ti .ti_left .ti_pic{width: 64upx;height: 64upx;border-radius: 50%;margin-right: 24upx;}
	.replayV .replay_scroll .ti .ti_left .ti_name{font-size: 24upx;color: #999999;margin-right: 24upx;}
	.replayV .replay_scroll .ti .ti_left .ti_author{font-size: 20upx;color: #FFFFFF;background: #FD7F00;padding: 0 8upx;border-radius: 4upx;}
	.replayV .replay_scroll .ti .ti_right{font-size: 24upx;color: #999999;}
	.replayV .replay_scroll .ti_con{padding: 0 24upx 24upx 112upx;font-size: 32upx;color: #333333;background: #FFFFFF;display: flex;align-items: flex-end;}
	.replayV .replayV_bot{width: 100%;background: #F5F5F5;line-height: 86upx;font-size: 24upx;text-align: center;color: #999999;}
	.replay_input{position: fixed;left: 0;right: 0;bottom: 0;background: #FFFFFF;z-index: 5;padding: 0 24upx;}
	.replay_input .replay_input_in{width: 638upx;padding: 0 32upx;background: #F9F9F9;border-radius: 36upx;height: 72upx;margin-top: 8upx;font-size: 28upx; color: #333333;}
	
	.replay_title_notice{font-size: 32upx;color: #333333;height: 80upx;padding: 0 24upx;line-height: 96upx;background: #FFFFFF;}
	
	.back_share{position: fixed;right: 24rpx;bottom: 126rpx;text-align: center;z-index: 2;}
	.back_share .back_home{display: block;position: relative;background: #008fe0;border-radius: 100%;width: 72rpx;height: 72rpx;box-shadow: 0 0 4rpx #008fe0;text-align: center; margin-bottom: 10rpx;margin-left: 6rpx;}
	.back_share .back_home_img{width: 56rpx;height: 56rpx;border-radius: 100%;border-radius: 100%;margin-top: 6rpx;}
	
	
	.chat_box{position: fixed;top: var(--status-bar-height);left: 0;right: 0;bottom: 0;background: #FAFAFA;z-index: 100;transition: all linear .3s;transform: translateY(100%);}
	.chat_head{display: flex;align-items: center;justify-content: space-between;height: 88rpx;padding: 0 24rpx;background: #FFFFFF;}
	.chat_cancel{width: 118rpx;text-align: left;font-size: 28rpx;color: #333333;}
	.chat_send{width: 118rpx;height: 50rpx;line-height: 50rpx; text-align: center;background: #FF9900;font-size: 30rpx;color: #FFFFFF;border-radius: 8rpx;}
	.chat_tit{color: #333333;font-size: 36rpx;}
	.chat_con{padding: 24rpx;}
	.chat_con_text{font-size: 28rpx;color: #333333;width: 100%;min-height: 300rpx;}
</style>
