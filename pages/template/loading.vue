<template>
	<div class="loading">
		<div class="loading_bg">
			<img :src="loading">
			<p>加载中...</p>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data () {
		    return {
		        loading: require("../../assets/images/loading3.gif")
			}
		},
	}
</script>
<style type="text/css">
	.loading{display: block;position: fixed;z-index: 599;width: 100%;height: 100%;top: 0;left: 0;background: transparent;overflow: hidden;}
	.loading_bg{position: relative;width: 150px;height: 100px;overflow: hidden;background: rgba(0, 0, 0, 0.4);margin: -50px 0 0 -75px;top: 50%;left: 50%;border-radius: 10px;}
	.loading img{display: block;width: 100px;height: 100px;margin-left: 25px;margin-top: -5px;}
	.loading p{font-size: 16px;text-align: center;color: #ffffff;margin-top: -31px;}
	/*@keyframes rotate{
		0%{
			transform: rotateZ(0deg);
		}
		100%{
			transform: rotateZ(360deg);
		}
	}*/
</style>