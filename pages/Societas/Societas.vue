<template>
	<view style="padding-top: 44px;">
		<view class="flex_between wrpo_center title_s two_color">
			<view class="back-left flex_center" @click="back()">
			</view>
			<view class="middle_text">
				{{title}}
			</view>
			<view class=" flex_center more-right">
				<!-- icon-right -->
			</view>
		</view>
		<view class="padding" style="height:180px;width:100%;box-sizing: border-box;">
			<image :src="header.thumb" mode="" style="height:150px;width:100%"></image>
		</view>
		<view class="padding-left padding-right">
			<view class="flex_between small_text two_color ">
				<view :class="['flex_center',type_nxs==i.id?'action_ren':'mo_ren']" style="" @tap.stop="handleTitle(i)" v-for="i in type_data"
				 :key="i.id">
					{{i.name}}
					<view :class="['flex_center',type_nxs==i.id?'active_border':'mo_border' ]">
					</view>
				</view>
			</view>
			<view class="">

			</view>
			<!-- <view class="flex_between" style="width: 70%;font-size: 36upx;">
				<view class="" v-for="i in 3" :key='i'>
					中道解读
				</view>
			</view> -->
		</view>
		<!-- <view class="">
			<view class="" v-for="i in dataList" :key="i.is_this">
				<tuwen :list='i.items' v-if="is_type=='hezuolianjie'"></tuwen>
			</view>
		</view> -->

		<!--  -->
		<!-- <ziyuan :highp="highp"></ziyuan> -->
		<!--  -->
	</view>
</template>

<script>
	import api from '../../api/api.js';
	import "../../style/com_icon.css";
	// import ziyuan from '../../component/wuli_article/zuyuan.vue';
	import tuwen from '@/component/wuli_article/tuwen.vue' //合作链接用
	export default {
		components: {
			tuwen,

		},
		data() {
			return {
				type_nxs: '',
				ings: require('../../static/imgs/icoImg/da.png'),
				type_data: [{
					name: '中道解读',
					id: 8,
				}, {
					name: '专家解读',
					id: 31,
				}, {
					name: '政商解读',
					id: 29,
				}, ],
				header: '',
				dataList: [],
				title: '',
			}
		},
		onLoad(option) {

			this.type_nxs = option.id
			console.log(option.id, this.type_data[option.id])
			for (let i = 0; i < this.type_data.length; i++) {
				console.log(option.id == this.type_data[i].id)
				if (option.id == this.type_data[i].id) {
					this.title = this.type_data[i].name
				}
			}
			var that = this
			api.Readings({

				'cate_id': option.id
			}, function(res) {
				if (res.error == 0) {
					that.header = res.data.header
					that.dataList = res.data.data

				}
				console.log(res)
			})
		},
		methods: {
			handleTitle(type) {
				this.type_nxs = type.id
				this.title = type.name
			},
			unbind(son) {
				wx.navigateTo({
					url: '/pages/postdetails/postdetails?news_id=' + son.news_id,
				})
			},
			more(son) {
				wx.navigateTo({
					url: '/pages/postdetails/postdetails?news_id=' + son.news_id,
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style>
	.mo_ren {
		/* 	line-height: 50upx; */

		flex: 1;
		color: rgb(51, 51, 51)
	}

	.action_ren {

		/* line-height: 50upx; */
		flex: 1;
		color: #f92727
	}

	.mo_border {
		padding-bottom: 5px;
		width: 1em;
		border-bottom: 4upx solid #fff;
	}

	.active_border {
		padding-bottom: 5px;
		width: 1em;
		border-bottom: 4upx solid #f92727;
	}

	.title_s {
		height: 44px;
		width: 100vw;
		position: fixed;
		top: 0;
		z-index: 99999;
		padding: 0px 10px 3px;
		box-sizing: border-box;
	}

	.status_bar {
		width: 100%;
		height: var(--status-bar-height);
	}

	.middle_text {
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

	/* 	.more-right::before {
		content: '\e606';
		font-family: 'iconfont';
		text-align: center;
	} */

	/*  */
	.rite {
		/* padding-top: 20upx; */
		position: relative;
	}

	.rite::before {
		position: absolute;
		right: 0;
		/* top:; */
		content: '\e61c';
		font-family: 'iconfont';
		font-size: 30upx;
	}
</style>
