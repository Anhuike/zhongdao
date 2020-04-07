<template>
	<view class="zdTabBar">
		<view class="ul">
			<view :class="['li',current == index?'cur' :'']" v-for="(item,index) in taBbarList" :key="index" @tap="navigatorTo(item.url)" >
				<view class="img" v-if="item.type == 0">
					<image :src="current == index ? item.selectIcon : item.icon" mode="widthFix"></image>
				</view>
				<view class="ic" v-if="item.type == 1"><image :src="current == index ? item.selectIcon : item.icon" mode="widthFix"></image></view>
				<view class="p">{{item.name}}</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props: {
			current: {
				type: Number,
	
				default: 0
			}
		},
		data() {
			return {
				// tabBarBg:require('/static/tabBar_bg.png'),
				taBbarList: [{
						type: 0,
						icon: require('../static/tabBar/home.png'),
						selectIcon:require('../static/tabBar/home1.png'),
						// selectIcon: '../../static/tabBar/home1.png',
						name: '首页',
						url: 'https://www.zhongdaogy.com'
					},
					{
						type: 0,
						// icon: '/static/tabBar/tongcheng.png',
						// selectIcon: '/static/tabBar/tongcheng1.png',
						icon: require('../static/tabBar/tongcheng.png'),
						selectIcon:require('../static/tabBar/tongcheng1.png'),
						name: '同城',
						url: 'https://www.zhongdaogy.com/life/pages/index/index'
					},
					{
						type: 1,
						// icon: '/static/tabBar/fabu.png',
						// selectIcon: '/static/tabBar/fabu1.png',
						icon: require('../static/tabBar/fabu.png'),
						selectIcon:require('../static/tabBar/fabu.png'),
						name: '发布',
						url: 'https://www.zhongdaogy.com/life/lifes/pages/posttie/xuantype?from=life'
					},
					{
						type: 0,
						// icon: '/static/tabBar/renmai.png',
						// selectIcon: '/static/tabBar/renmai1.png',
						icon: require('../static/tabBar/renmai.png'),
						selectIcon:require('../static/tabBar/renmai1.png'),
						name: '社群',
						url: 'https://www.zhongdaogy.com/life/lifes/pages/index/index?id=community'
					},
					{
						type: 0,
						// icon: '/static/tabBar/my.png',
						// selectIcon: '/static/tabBar/my1.png',
						icon: require('../static/tabBar/my.png'),
						selectIcon:require('../static/tabBar/my1.png'),
						name: '我的',
						url: 'https://www.zhongdaogy.com/willing/mine'
					}
				]
			}
		},
		methods: {
			navigatorTo(e) {
				// #ifdef H5
				window.location.href = e
				console.log('h5' + e);
				// window.open(e);
				// #endif
				
				// #ifdef MP-WEIXIN
				console.log('weixin' + e);
				wx.redirectTo()({
				    url:'../pages/outline/outline?url=' + e, 
				})
				// #endif
			}
		}
	}
</script>
<style lang="less">
	
	// 公用样式
	@mainc: #00B7B8; //主色
	@textc: #464646; //字体颜色
	@textca: #909090; //字体颜色1
	@borderc: #eeeeee; //边框颜色
	@redc: #ec3851; //红色字体
	image {
		display: block;
		width: 100%;
		height: 100%;
	}
	
	.df {
		display: flex;
	}
	
	
	page {
		font-size: 24upx;
		color: @textc;
		line-height: 35upx;
		padding-bottom: 80px;
		background: #f7f7f7;
		font-family:'微软雅黑', sans-serif, serif;
	}
	
	.bgja {
		background-image: linear-gradient(right, #00CEC1, #00B7B8);
		background-image: -webkit-linear-gradient(right, #00CEC1, #00B7B8);
	}
	
	.zdTabBar{
		position: fixed;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 20;
		background: url(../static/tabBar/tabBar_bg.png);
		background-size:100% 100% ;
		padding-top:30px ;
		
	
		.ul{
			.df;
			.li{
				flex: 1;
				padding: 5px 0;
				position: relative;
				.img{
					width: 25px;
					height: 25px;
					overflow: hidden;
					margin: 0 auto;
				}
				.ic{
					width: 40px;
					height: 40px;
					.bgja;
					border-radius: 50%;
					text-align: center;
					font-size: 20px;
					line-height: 40px;
					font-weight: bold;
					color: #ffffff;
					margin: -20px auto 5px;
				}
				.p{
					margin-top: 2px;
					text-align: center;
					font-size: 10px;
					line-height: 18px;
				}
				&.cur{
					.p{
						color: @redc;
					}
				}
			}	
		}
	}
</style>