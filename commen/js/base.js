export default {
	/**
	 * 禁用下拉刷新
	 * */
	disabledDownFresh () {
		const pages = getCurrentPages();  
		const page = pages[pages.length - 1];  
		const currentWebview = page.$getAppWebview();  
		currentWebview.setStyle({  
			pullToRefresh: {  
			support: false,  
			style: plus.os.name === 'Android' ? 'circle' : 'default'  
			}  
		});  
	},
	/**
	 * 开启下拉刷新
	 * */
	openDownFresh () {
		const pages = getCurrentPages();  
		const page = pages[pages.length - 1];  
		const currentWebview = page.$getAppWebview();  
		currentWebview.setStyle({  
			pullToRefresh: {  
			support: true,  
			style: plus.os.name === 'Android' ? 'circle' : 'default'  
			}  
		});  
	},
	/**
	 * H5里调用高德地图api
	 * */
	insertAmapToH5 () {
		let src = "https://webapi.amap.com/maps?v=1.4.15&key=f9b1ac7db140513a3ba6cf056c51141a";
		let head = document.getElementsByTagName("head")[0];
		let scripts = head.getElementsByTagName("script");
		let newScript = document.createElement("script");
		newScript.src = src;
		for (let i = 0;i < scripts.length;i++) {
			let _src = scripts[i].src;
			if (_src = src) {
				scripts[i].remove();
			}
		}
		head.appendChild(newScript);
	},
	/*
	 * 浏览器端分享
	 */
	H5Share () {
		// let url = process.env.NODE_ENV === 'production' ? "/themes/mall/static/js/social-share.min.js" : "/static/js/social-share.min.js";
		let url = "https://cdn.bootcss.com/social-share.js/1.0.15/js/social-share.min.js";
		let parentNode = document.getElementsByTagName('head')[0];
		let scripts = document.getElementsByTagName('head')[0].getElementsByTagName("script");
		let scriptLen = scripts.length;
		for (let i = 0;i < scriptLen;i++) {
			if (scripts[i].src == url) {
				parentNode.removeChild(scripts[i]);
			}
		}
		let script = document.createElement('script');
		script.src = url;
		document.getElementsByTagName('head')[0].appendChild(script);
	},
	/*
	 * 微信端分享
	 */
	wxH5Share (share_title, share_desc, share_url, share_img) {
		wx.ready(function () {
			wx.onMenuShareTimeline({
				title: share_title, // 分享标题
				desc: share_desc, // 分享描述
				link: share_url, // 分享链接
				imgUrl: share_img, // 分享图标
				success: function () {
					// callback();
				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
				}
			});
			wx.onMenuShareAppMessage({
				title: share_title, // 分享标题
				desc: share_desc, // 分享描述
				link: share_url, // 分享链接
				imgUrl: share_img, // 分享图标
				type: '', // 分享类型,music、video或link，不填默认为link
			
				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				success: function () {
					// callback();
				},
				cancel: function () {
				}
			});
			wx.onMenuShareQQ({
				title: share_title, // 分享标题
				desc: share_desc, // 分享描述
				link: share_url, // 分享链接
				imgUrl: share_img, // 分享图标
				success: function () {
				   // callback();
				},
				cancel: function () {
				   // 用户取消分享后执行的回调函数
				}
			});
		});
	}
}