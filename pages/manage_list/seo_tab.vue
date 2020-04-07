
<template>
	<view v-if="tabs && tabs.length" class="app-tabs" :class="{'tabs-fixed': fixed}">
		<view class="tabs-item ">
			<view class="tab-item" v-for="(tab, i) in tabs" :class="{'active': value===i}" :key="i" @click="tabClick(i)" >
				{{getTabName(tab)}}
			</view>
		</view>
		<view class="tabs-line sty_img" :style="{left:lineLift}">
		</view>
			<!-- 	<image :src="active_btn" mode="" class="tabs-line sty_img" :style="{left:lineLift}"></image> -->
	</view>
</template>

<script>
	export default {
		props:{
			active_btn:'',
			tabs: Array,
			value: { // 当前显示的下标 (使用v-model语法糖: 1.props需为value; 2.需回调input事件)
				type: [String, Number],
				default(){
					return 0
				}
			},
			fixed: Boolean // 是否悬浮,默认false
		},
		computed: {
			lineLift() {
				return 100/this.tabs.length*(this.value + 1) - 100/(this.tabs.length*2) + '%'
			}
		},
		methods: {
			getTabName(tab){
				return tab
				// return typeof tab === "object" ? tab.name : tab
			},
			tabClick(i){
				if(this.value!=i){
					this.$emit("input",i);
					this.$emit("change",i);
				}
			}
		}
	}
</script>

<style>
		.sty_img {
			/* height: 10upx; */
			width: 4em;
			display: block;
			margin: 0 auto;
			border-bottom:2px solid #F92727;
			margin-bottom:-1px ;
		}

	.app-tabs{
		position: relative;
		/* height: 80rpx; */
		/* line-height: 60rpx; */
		
		background-color: #fff;
		/* border-bottom: 1rpx solid #eee; */
		display: flex;
		align-items: center;
		color: #A2A2A2;
		
	}
	.app-tabs .tabs-item{
		display: flex;
		text-align: center;
		flex: 1;
		border-bottom:1px solid #F4F4F4 ;
		
	}
	.app-tabs .tabs-item .tab-item{
		flex: 1;	
		margin:0 20upx;
		font-size:32rpx;
		line-height: 1.8em;
		/* margin-bottom:-2px ;
		border-bottom:2px solid #F4F4F4 ; */
	}
	.app-tabs .tabs-item .active{
		color: #F92727;
		/* border-color: #F92727; */
		
	}
	.app-tabs .tabs-line{
		position: absolute;
		bottom: 2px;
		width: 4em;
		/* height: 10; */
		transform: translateX(-50%);
		border-radius: 4rpx;
		transition: left .3s;
		/* background: red; */
	}
	
	/*悬浮*/
	.app-tabs.tabs-fixed{
		z-index: 9999;
		position: fixed;
		top: var(--window-top);
		left: 0;
		width: 100%;
	}
</style>
