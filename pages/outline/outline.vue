<template>
	<!-- #ifdef MP-WEIXIN -->
	<web-view :src="url"></web-view>
	<!-- #endif -->
</template>

<script>
	import "../../style/com_icon.css";
	export default {
		data() {
			return {
				url:''
			};
		},
		onLoad(option) {
			console.log(option,'微信报错')
			var that = this;
			that.url = option.url;
		},
		methods: {

		}
	};
</script>

<style>
	
</style>
