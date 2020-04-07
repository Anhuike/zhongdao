<template>
	<view>
		<!--  -->
		<!-- <tuwen :wuil_list="data" index_s="1"></tuwen> -->
		<view class="padding margin-bottom">
			
	
		<view class="" v-for="son in data" :key="son.cate_id">
			<view class="padding-top padding-bottom" style="border-bottom:1px solid #eee ;" @tap="unbind(son)">
				<view class="" style="height:150px;width:100%">
					<image :src="son.thumb" style="height:150px;width:100%" mode=""></image>
				</view>
				<view class="">
					<view class="tiny_text bold padding-top-10 padding-bottom-10  text_hidden">
						{{son.title}}
					</view>
					<view class="x_text vice-color" style="">
						{{son.content}}
						<!-- <view class="" style="white-space: nowrap;display: inline-block;color: #5073BD;" @tap.stop="more(son)">
								查看详情
							</view> -->
					</view>
				</view>
		
			</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tuwen from '@/component/wuli_article/tuwen.vue'
	import "../../style/com_icon.css";
	import api from '../../api/api.js';
	export default {
		components: {
			tuwen,
		},
		data() {
			return {
				data:'',
			}
		},
		onLoad() {
			console.log(this)
			api.ulitem_list({}, (res) => {
				console.log(this)
				console.log(res,2)
				this.data = res.data
				console.log(this.data,11)
			})
			
		},
		methods: {
unbind(item){
	uni.navigateTo({
		url:'/pages/dating/dating?id='+item.cate_id	
	})
},
		}
	}
</script>

<style>

</style>
