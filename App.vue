<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		

					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}

	}
</script>

<style>
	@import "/common/uni.css";

	uni-view {
		line-height: 1.4em;
	}

	/* icon */
	/* icon */
@font-face {
  font-family: 'iconfont';  /* project id 1567922 */
  src: url('//at.alicdn.com/t/font_1567922_jy8udlsqbv.eot');
  src: url('//at.alicdn.com/t/font_1567922_jy8udlsqbv.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1567922_jy8udlsqbv.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1567922_jy8udlsqbv.woff') format('woff'),
  url('//at.alicdn.com/t/font_1567922_jy8udlsqbv.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1567922_jy8udlsqbv.svg#iconfont') format('svg');
}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	/* .title_s {
		background-color: #fff;
	} */

	/* .icon-youxiatianchong:before {
		content: "\e639";
		font-family: "iconfont" !important;
	}

	.icon-right:before {
		content: "\e61c";
		font-family: "iconfont" !important;
	}

	.icon-sanjiaoleft:before {
		content: "\e621";
		font-family: "iconfont" !important;
	}

	.icon-shouqi:before {
		content: "\e61f";
		font-family: "iconfont" !important;
	}

	.icon-zhankai:before {
		content: "\e625";
		font-family: "iconfont" !important;
	}

	.icon-fl-renminbi:before {
		content: "\e634";
		font-family: "iconfont" !important;
	}

	.icon-dui:before {
		content: "\e613";
		font-family: "iconfont" !important;
	}

	.icon-cuowu:before {
		content: "\e657";
		font-family: "iconfont" !important;
	}

	.icon-fenxiang:before {
		content: "\e620";
		font-family: "iconfont" !important;
	}

	.icon-dui1:before {
		content: "\e63f";
		font-family: "iconfont" !important;
	}
 */

	/* //////////////////////////////////////////////////// */
	img {
		padding: 0;
		margin: 0;
	}


	/*每个页面公共css */
	.margin-top {
		margin-top: 30upx;
	}

	.margin-left {
		margin-left: 30upx;
	}

	.margin-bottom {
		margin-bottom: 30upx;
	}

	.margin-right {
		margin-right: 30upx;
	}

	.margin {
		margin: 30upx;
	}

	.padding {
		padding: 30upx;
	}

	.padding-bottom {
		padding-bottom: 30upx;
	}

	.padding-right {
		padding-right: 30upx;
	}

	.padding-top {
		padding-top: 30upx;
	}

	.padding-left {
		padding-left: 30upx;
	}


	.margin-top-20 {
		margin-top: 20upx;
	}

	.margin-left-20 {
		margin-left: 20upx;
	}

	.margin-bottom-20 {
		margin-bottom: 20upx;
	}

	.margin-right-20 {
		margin-right: 20upx;
	}

	.margin-20 {
		margin: 20upx;
	}

	.padding-20 {
		padding: 20upx;
	}

	.padding-bottom-20 {
		padding-bottom: 20upx;
	}

	.padding-right-20 {
		padding-right: 20upx;
	}

	.padding-top-20 {
		padding-top: 20upx;
	}

	.padding-left-20 {
		padding-left: 20upx;
	}


	.margin-top-10 {
		margin-top: 10upx;
	}

	.margin-left-10 {
		margin-left: 10upx;
	}

	.margin-bottom-10 {
		margin-bottom: 10upx;
	}

	.margin-right-10 {
		margin-right: 10upx;
	}

	.margin-10 {
		margin: 10upx;
	}

	.padding-10 {
		padding: 10upx;
	}

	.padding-bottom-10 {
		padding-bottom: 10upx;
	}

	.padding-right-10 {
		padding-right: 10upx;
	}

	.padding-top-10 {
		padding-top: 10upx;
	}

	.padding-left-10 {
		padding-left: 10upx;
	}



	.max_text {
		font-size: 40upx;

	}

	.middle_text {
		font-size: 36upx;
	}

	.small_text {
		font-size: 32upx;
	}

	.tiny_text {
		font-size: 28upx;
	}

	.x_text {
		font-size: 24upx;

	}


	.text-center {
		text-align: center;
	}


	.bold {
		font-weight: bold;
	}


	.title_color {
		color: rgb(252, 54, 43);
	}

	.two_color {
		color: rgb(51, 51, 51);
		/* #333 */
	}

	.vice-color {
		color: rgb(102, 102, 102);
		/* #666666 */
	}

	.golden_color {
		color: rgb(223, 30u1, 12);
	}

	.x_color {
		color: rgb(153, 153, 153);
		/* #999; */
	}



	.white {
		background: #fff;
	}

	.bg_fa {
		background: #fafafa;
	}

	.bg_yellow {
		background: rgb(248, 188, 0);
	}

	.bg_red {
		background: rgb(252, 54, 43);
	}

	.bg_green {
		background: rgb(22, 209, 12);
	}

	.bg_blue {
		background: rgb(24, 84, 255);
	}

	.bg_purple {
		background: rgb(109, 38, 255);
	}


	.radius {
		border-radius: 20px;
	}

	.radius-50 {
		border-radius: 50px;
	}

	.solid {
		border: 1px solid #B6B6B6;
	}

.flex{
	display: flex;
}
	.flex_between {
		display: flex;
		justify-content: space-between;
	}

	.flex_center {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	.end_flex {
		display: flex;
		align-items: flex-end
	}

	.wrpo_center {
		display: flex;
		/* justify-content: center; */
		/* flex-direction: column; */
		align-items: center;
	}

	.align_between {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.text_hidden {
		white-space: nowrap;
		/*规定段落中的文本不进行换行*/
		overflow: hidden;
		/*内容会被修剪，并且其余内容是不可见的。*/
		text-overflow: ellipsis;
		/*显示省略号来代表被修剪的文本*/
	}

	.more_hideen {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}
</style>
