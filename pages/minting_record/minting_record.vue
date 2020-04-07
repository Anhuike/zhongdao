<template>
	<view>
		<view class="flex_between wrpo_center title_s" style=" background-color:#fff">
			<view class="back-left flex_center" @click="back()">
			</view>
			<view class="middle_text" style="display: flex;justify-content: space-around;color:#f92727;">
				<view class="small_text">
					我的会议
				</view>
				<view class="small_text">
					参加会议
				</view>
			</view>
			<view class=" flex_center more-right">
				<!-- icon-right -->
			</view>
		</view>
	</view>
</template>

<script>
	import "../../style/com_icon.css";
	import api from '../../api/api.js';
	export default {
		data() {
			return {
			}
		},
			
		onLoad(){
		api.mymeeting({},(res)=>{
			console.log(res)
		})
		},
		methods: {
			back() {
				console.log('Signed')
				uni.navigateBack({
					delta: 1
				})
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
		/* color:  #fff; */
		padding: 0px 10px 3px;

		box-sizing: border-box;
	}

	.status_bar {
		/* height: var(--status-bar-height); */
		width: 100%;
		height: var(--status-bar-height);
	}

	.middle_text {
		width: 70%;
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
