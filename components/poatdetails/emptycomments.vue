<template>
	<view>
		<!-- 当前没有评论 -->
		<view class="pd_box">
			<view class="pd_no_comment">
				<image class="pd_no_comment_img" src="../../static/home_img/icon_none_empty@2x.png" mode=""></image>
				<view class="pd_no_comment_word">还没有评论哦~</view>
			</view>
		</view>
		<!-- 当前没有评论 end -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		}
	}
</script>

<style scoped>
	.pd_box{padding: 0 24upx;position: relative;z-index: 0;background: #FFFFFF;}
	.pd_box .pd_no_comment{padding: 80upx 0; text-align: center;}
	.pd_box .pd_no_comment .pd_no_comment_img{width: 160upx;height: 160upx;}
	.pd_box .pd_no_comment .pd_no_comment_word{font-size: 28upx;color: #999999;margin-top: 48upx;padding-bottom: 10px;}
</style>
