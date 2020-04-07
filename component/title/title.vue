<template>
	<view>
		<!-- 头部栏 -->
		<view class="flex_between wrpo_center title_s" style="background:#f92727">
			<view class="back-left flex_center " @click="back()">
		完成
			</view>
			<view class="middle_text">
				{{title}}
			</view>
		
			<view class="flex_center  more-right">
				<!-- more-right -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			back() {
				uni.navigateBack({
						delta: 1,
						success: function(e) {
							console.log(e)
						},
						fail: function() {
			
						}
					},
			
				)
			},
		}
	}
</script>

<style>
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
		min-width: 2em;height: 1.5em;
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
		content: '\e606';
		font-family: 'iconfont';
		text-align: center;
	}

</style>
