<template>
	<view class="" >
		<!-- v-if="show_info" -->
		<view class="appoint " @touchmove.prevent="" style="z-index: 888;">
			<view class="backgr">
			</view>
			<view class="flex_center two_point">
				<view class="" style="width:90vw;height:80vh; position: relative;">
					<image :src="bg_img" class="conten" style="width:100%;height:100%;" mode=""></image>
					<view class="" style="position: absolute;top:-30upx; width:100%;display: flex;justify-content: center;">
						<view class="middle_text flex_center padding-bottom-10" :style="'background-image:url('+ title_img +');height:100upx;width: 80%;background-size: 100% 100%;box-sizing:border-box;color:#fff'">
							预约信息
						</view>
					</view>
					<view class="padding" style="position: absolute;top:100upx;">
						<view class="middle_text hiden_text">
							中道共赢第93起高端交流会中道共赢第93起高端交流会
						</view>
					</view>
					<view class="padding" style="position: absolute;top:280upx;width:100%;box-sizing: border-box;">
						<form @submit="formSubmit" @reset="formReset">
							<view class="">
								<view class="tiny_text two_color padding" style="border-bottom: 1px solid #eee;display: flex;align-items: center;"
								 v-for="i in form_data" :key="i.type">
									<view class="" style="width: 30%;line-height: 1.8;">
										{{i.title}}
									</view>
									<input type="i.input_type" class="two_color tiny_text" :placeholder="i.placeholder" :name="i.type" :maxlength="i.maxlength"
									 v-model="i.value" placeholder-style="color:#999" confirm-type="i.confirm_type" />

								</view>
							</view>
							<view class="flex_center padding">
								<button form-type="submit" type="primary" style="width: 60%;border-radius: 50px; background-color: #f92727;">提交信息</button>
								<view class="x_text padding-10" style="color: #17AB5C;">
									签到激活10个积分
								</view>
							</view>
						</form>
					</view>
					<view class="flex_center" style="height:100upx;">
						<!-- <image :src="title_img" mode="" ></image> -->
						<view class="show_ifro " style="height:50upx;width: 50upx;border-radius: 50%;" @tap="show_info()">

						</view>
					</view>
				</view>
			</view>
			<!-- </view> -->
		</view>
	</view>
	</view>
</template>
<script>
	import api from '../../api/api.js';
	export default {
		props: {

		},
		data() {
			return {
			
				// title_img: require('../../static/imgs/info/title.png'),
				title_img: require('../../static/info/title.png'),
				bg_img: require('../../static/info/bg_img.png'),
				form_data: [{
					title: '姓名',
					placeholder: '张三',
					type: 'name',
					value: '',
					maxlength: 5,
					input_type: 'text',
					confirm_type: 'next',
				}, {
					title: '手机号',
					placeholder: '请输入手机号',
					type: 'mobile',
					value: '',
					maxlength: 11,

					input_type: 'Number',
					confirm_type: 'next',
				}, {
					title: '公司名称',
					placeholder: '请输入您的公司',
					type: 'companyName',
					value: '',
					maxlength: 20,
					input_type: 'text',
					confirm_type: 'next',
				}, {
					title: '你的职位',
					placeholder: '请输入你的职位',
					type: 'job',
					value: '',
					maxlength: 10,
					input_type: 'text',
					confirm_type: 'next',
				}, {
					title: '推荐人',
					placeholder: "请填写推荐人姓名",
					type: 'pname',
					value: '',
					maxlength: 5,
					input_type: 'text',
					confirm_type: 'done',
				}]
			}
		},
		methods: {
			show_info() {
				console.log(1)
				this.$root.subscribe()
			},
			formSubmit(e) {
				var reg=/^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/
				console.log(e.detail.value)
				for (let i = 0; i < this.form_data.length; i++) {
					if (this.form_data[i].value != '') {
						if (i == this.form_data.length - 1) {
							
							if (!reg.test(e.detail.value.mobile)) {
								uni.showToast({
									title: '手机号格式有误',
									duration: 2000,
									icon: 'none',
								});

							} else {
								api.meeting(e.detail.value, function(res) {
									console.log(res)
									if (res.error == 0) {
										this.$root.subscribe()
										uni.showToast({
											title: res.message,
											duration: 2000,
										
										});
									}
								})

							}
						}


					} else {
						uni.showToast({
							title: '请输入' + this.form_data[i].title,
							duration: 2000,
							icon: 'none',
						});
						return false
					}
				}
			},

			formReset(e) {
				console.log(e, "清空")
			},
		}
	}
</script>

<style>
	.appoint {
		position: fixed;
		top: 0;
		left: 0;

		/* position: relative; */
	}

	.backgr {
		height: 100vh;
		width: 100vw;
		overflow: hidden;
		background-color: #000000;
		opacity: .5;
	}

	.two_point {
		box-sizing: border-box;
		padding: 0 30upx;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}

	.title_img {

		width: 70%;
		height: 12%;
		margin-top: -6%;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-position: 0 0;
		z-index: 3;
	}

	.conten {
		display: flex;


		width: 100%;
		height: 80%;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-position: 0 0;
	}

	.show_ifro {}

	.show_ifro::before {
		content: '\e657';
		font-family: 'iconfont';
		font-size: 80upx;
		color: #fff;
	}

	.hiden_text {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
</style>
