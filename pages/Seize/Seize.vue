<template>
	<view style="height: 100vh;overflow: hidden;">
		<!--  -->
		<view class="flex_between wrpo_center title_s" style="box-sizing: border-box; color:#ffffff; background-color:rgb(252, 54, 43) ;">
			<view class="flex_center back-left "  @click="back()">
			</view>
			<view class="middle_text">
				{{title_name}}
			</view>
			<view class=" flex_center more-right">
				
			</view>
		</view>
		<!--  -->
		<view class="white" style="height: calc(100vh - 44px);overflow: hidden; margin-top:44px;">
			<!-- 	<uni-nav-bar color="#ffffff" background-color="rgb(252, 54, 43)" :status-bar="true" font-size="36upx" left-icon="arrowleft"
			 left-text="" :title="{{title_name}}" @clickLeft="back" /> -->
			<view class="flex_center padding-right padding-left bg_fa" style="position:relative;height: 88upx;">
				<view class="province  two_color " style="font-size: 34upx;" @tap="show_stratum">
					{{one_data.province_name}}
				</view>
				<view class="padding-right tiny_text two_color" style="position: absolute; right: 0;" @tap.stop="reset()">
					清零
				</view>
			</view>
			<view class=" " v-show="show_province" @tap="show_stratum" style="box-sizing: border-box;position: fixed;top:88px;background: rgb(102,102,102,.3);z-index: 9999;height:calc(100% - 88px);width: 100%;" @touchmove.prevent="">
				<scroll-view class="scroll-view_H padding" scroll-y="true" style="height:500px;background: #fff;box-sizing: border-box;" :show-scrollbar="show_scrollbar" >
					<view class="wrpo_center tiny_text" v-for="item in data_list" :key="item.province_id" style="height: 100upx;"
					 @tap.stop="item_one(item)">
						{{item.province_name}}
					</view>
				</scroll-view>
				<!--  -->
			</view>

			<view class="" style="display:flex;width:100%;padding-right:20upx;height:calc(100% - 138px) ;z-index:888; ">
				<scroll-view class="scroll-view_H   padding-right-20" scroll-y="true" style="width: 170upx;;height:1060upx;"
				 :show-scrollbar="show_scrollbar">
					<!-- background: red; -->
					<view style="width: 150upx;" v-for="item in one_data.children" :key="item.city_id" @tap.stop="item_two(item)"
					 :class="['flex_center','two_style','bg_fa',two_data.city_id == item.city_id ?'arrows':''] ">
						<!--  -->
						<view class=" tiny_text" style="height: 104upx;max-width:5em;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;line-height: 100upx;">
							{{item.city_name}}
						</view>
					</view>
				</scroll-view>
				<scroll-view class="scroll-view_H padding-right paddingleft-20" scroll-y="true" style="flex: 1;height: 1060upx;flex:1;"
				 :show-scrollbar="show_scrollbar">




					<radio-group @tap.stop="radioChange(item)" v-for="item in two_data.children" :key="item.area_id">
						<label class="wrpo_center tiny_text flex_between" style="height: 104upx;width: 100%;">

							<view class="" style="width: 5em;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
								{{item.area_name}}
							</view>
							<view class="">
								{{item.partner_fee}}
							</view>

							<view>
								
								<radio :checked="checkedList.indexOf(item)!=-1" color="#F92727" />
							</view>

						</label>
					</radio-group>

				</scroll-view>

			</view>


			<!--  -->
			<view class=" flex_between wrpo_center padding-left padding-right" style="height: 100upx;z-index: 9998;background-color: #eee; position: fixed;left: 0;bottom: 0;width: 100%;box-sizing: border-box ;">
				<view class="" style="white-space: nowrap;display: flex; align-items: flex-end;font-size: 34upx;color:#666">
					总分用<view class="title_color">
						{{zongshu}}
					</view>元<view class=" x_color x_text">
						（ 已选{{checkedList.length}}个 ）
					</view>
				</view>
				<view class="zf padding-left padding-right padding-top-10 padding-bottom-10 small_text" @tap="pay">
					支付
				</view>
			</view>
		</view>

		<!--  -->
		<!-- 
		    <view>
		        <view class="uni-padding-wrap">
		            <view class="page-section swiper">
		                <view class="page-section-spacing">
		                    <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
		                        <swiper-item @tap="item_swiper()">
		                            <view class="swiper-item uni-bg-red">A</view>
		                        </swiper-item>
		                        <swiper-item>
		                            <view class="swiper-item uni-bg-green">B</view>
		                        </swiper-item>
		                        <swiper-item>
		                            <view class="swiper-item uni-bg-blue">C</view>
		                        </swiper-item>
		                    </swiper>
		                </view>
		            </view>
		        </view>
		        <view class="swiper-list">
		            <view class="uni-list-cell uni-list-cell-pd">
		                <view class="uni-list-cell-db">指示点</view>
		                <switch :checked="indicatorDots" @change="changeIndicatorDots" />
		            </view>
		            <view class="uni-list-cell uni-list-cell-pd">
		                <view class="uni-list-cell-db">自动播放</view>
		                <switch :checked="autoplay" @change="changeAutoplay" />
		            </view>
		        </view>
		        <view class="uni-padding-wrap">
		            <view class="uni-common-mt">
		                <text>幻灯片切换时长(ms)</text>
		                <text class="info">{{duration}}</text>
		            </view>
		            <slider @change="durationChange" :value="duration" min="500" max="2000" />
		            <view class="uni-common-mt">
		                <text>自动播放间隔时长(ms)</text>
		                <text class="info">{{interval}}</text>
		            </view>
		            <slider @change="intervalChange" :value="interval" min="2000" max="10000" />
		        </view>
		    </view> -->


	</view>
</template>

<script>
	import "../../style/com_icon.css";
	import api from '../../api/api.js';
	// import uniIcons from '../../components/uni-icons/uni-icons.vue'
	// import uniNavBar from '../../components/uni-nav-bar/uni-nav-bar.vue'
	// import uniSection from '../../components/uni-section/uni-section.vue'
	// import uniStatusBar from '../../components/uni-status-bar/uni-status-bar.vue';
	export default {
		components: {
			// uniIcons,
			// uniNavBar,
			// uniSection,
			// uniStatusBar
		},
		data() {
			return {
				title_name: '抢占支付页面',

				// 
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				vertical: true,
				interval: 2000,
				duration: 500,
				// 
				// /////////////////////
				show_scrollbar: false,
				show_province: false,
				one_data: [],
				two_data: [],
				data_list: [],
				// three_data:[],
				current: 0,
				// 选中的checked
				checkedList: [],
				// 选中数据
				amount: 0,
				prj_id:'',
				project_name:''
			}
		},
		onLoad(options) {
this.project_name=options.name
this.prj_id = options.id
			// console.log(this.checkedList, '缓存数据')
			console.log(options)
			// options.id
			var that = this
			// https://www.zhongdaogy.com/api.php?API=projects/product/getProducts
			api.Seize_data({
				'prj_id': options.id
			}, function(res) {
				console.log(res,55)
				console.log(res.error == 0)
				if (res.error == 0) {
					that.data_list = res.data
					that.one_data = res.data[0]
					// console.log(res.data[0].children, 213)
					that.two_data = res.data[0].children[0]
					// console.log(that.two_data, 431)
					for (let i = 0; i < res.data.length; i++) {}
					console.log(that.data_list)
				}
			})
		},
		onShow() {

			// console.log(uni.getStorageSync('ulitem'), '缓存')
			// if (uni.getStorageSync('ulitem')) {
			// 	this.checkedList = uni.getStorageSync('ulitem')
			// 	console.log('有缓存')
			// }
		},
		computed: {

			zongshu() {
				var amounts = 0
				for (var i = 0; i < this.checkedList.length; i++) {
					amounts += Number(this.checkedList[i].partner_fee)
				}
				return amounts
			}
		},
		methods: {
			// 重置清零
			reset() {
				// uni.removeStorageSync('ulitem')
				this.checkedList = []
				this.amount = 0
			},
			// zhifu
			pay() {
				// uni.setStorageSync('ulitem', this.checkedList)
					console.log(this.checkedList)
				if(this.checkedList.length==0){
					uni.showToast({
					    title: '请选择项目',
					    duration: 2000,
						icon:'none'
					});
				}else{
					console.log(this.checkedList)
				uni.navigateTo({
					url: '/pages/Signed/Signed?prj_id='+this.prj_id+'&ulitem='+ JSON.stringify(this.checkedList)+'&name='+this.project_name
				})	
				}
				
			},



			show_stratum() {
				this.show_province = !this.show_province
			},
			item_one(vl) {
				console.log(vl)
				// this.pitch_list=
				this.one_data = vl
				this.two_data = vl.children[0]
				this.show_province = !this.show_province
			},
			item_two(vl) {
				console.log(vl)
				this.two_data = vl
			},

			// province() {

			// },
			// item_swiper(e){
			// 	let listNode = uni.createSelectorQuery().select("swiper-item")
			// 	listNode.boundingClientRect(data => {
			// 	console.log("节点离页面顶部的距离为" + data);
			// 	}).exec();
			// 	console.log(e,1)
			// },
			//       changeIndicatorDots(e) {
			// 	console.log(e)
			//           this.indicatorDots = !this.indicatorDots
			//       },
			//       changeAutoplay(e) {
			// 		console.log(e)
			//           this.autoplay = !this.autoplay
			//       },
			//       intervalChange(e) {
			// 		console.log(e)
			//           this.interval = e.target.value
			//       },
			//       durationChange(e) {
			// 		console.log(e)
			//           this.duration = e.target.value
			//       }
			radioChange: function(vl) {

				if (this.checkedList.indexOf(vl) == -1) {
					this.checkedList.push(vl)
				} else {
					for (let i = 0; i < this.checkedList.length; i++) {
						if (this.checkedList[i].area_id == vl.area_id) {
							this.checkedList.splice(i, 1)
						}
					}

				}

				console.log(this.checkedList)
				// [{},{},{}]
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
	.province {
		position: relative;
		padding-right: 20upx;
	}

	.province::before {
		position: absolute;
		right: 0;
		bottom: 0;
	
		content: '\e639';
		font-family: 'iconfont';
		color: #CCCCCC;
	}

	.scroll-view_H {}

	/*  */
	/deep/.uni-scroll-view::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		display: none
	}

	/*  */

	.two_style {
		border-bottom: 2upx solid #eee;
	}

	.arrows {
		position: relative;
		background: rgb(252, 54, 43);
		color: #fff;
	}

	.arrows::before {
		display: flex;
		font-size:50upx ;
		align-items: center;
		position: absolute;
		right: -30upx;
		top: 30upx;
		content: '\e621';
		font-family: 'iconfont';
		color: rgb(252, 54, 43);
		z-index: 899;
	}

	.zf {
		border-radius: 50upx;
		background: rgb(252, 54, 43);
		color: #FFFFFF;

	}

	.title_s {
			height: 44px;
			width: 100vw;
			position: fixed;
			top: 0;
			z-index: 99999;
			color:  #fff;
			padding: 0px 10px 3px;
	
			box-sizing: border-box;
		}
	
		.status_bar {
			/* height: var(--status-bar-height); */
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

	.more-right::before {
		/* width: 40upx;
		height: 20px;
	
		content: '\e606';
		font-family: 'iconfont'; */

	}
</style>
