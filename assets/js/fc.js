import api from '../../api/api.js'
var wx = require('jweixin-module');
const math = require('mathjs');

export default {
	printNum (num1, num2, sym) {
		switch (sym) {
			case "add":
				return math.format(math.chain(math.bignumber(num1)).add(math.bignumber(num2)).done());
				break;
			case "subtract":
				return math.format(math.chain(math.bignumber(num1)).subtract(math.bignumber(num2)).done());
				break;
			case "multiply":
				return math.format(math.chain(math.bignumber(num1)).multiply(math.bignumber(num2)).done());
				break;
			case "divide":
				return math.format(math.chain(math.bignumber(num1)).divide(math.bignumber(num2)).done());
				break;
		}
	},
	cloneObj (obj) {
        if (obj === null) return null
        if (typeof obj !== 'object') return obj;
        if (obj.constructor===Date) return new Date(obj);
        if (obj.constructor === RegExp) return new RegExp(obj);
        let newObj = new obj.constructor();
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var val = obj[key];
                newObj[key] = typeof val === 'object' ? this.cloneObj(val) : val;
            }
        }
        return newObj;
		},
    
    formatTime (time, isComplete) {
    	time = Number(time) * 1000;
    	let obj = {};
    	let result = "";
    	let _date = new Date(time);
    	
    	obj.second = _date.getSeconds() < 10 ? "0" + _date.getSeconds() : _date.getSeconds();
        obj.minute = _date.getMinutes() < 10 ? "0" + _date.getMinutes() : _date.getMinutes();
        obj.hour = _date.getHours() < 10 ? "0" + _date.getHours() : _date.getHours();

        obj.day = _date.getDay() + 1;
        obj.date = _date.getDate() < 10 ? "0" + _date.getDate() : _date.getDate();
        obj.month = _date.getMonth() + 1  < 10 ? "0" + (_date.getMonth()+1) : (_date.getMonth()+1);
        obj.year = _date.getFullYear();
        
        if (isComplete) {
        	result = `${obj.year}-${obj.month}-${obj.date} ${obj.hour}:${obj.minute}:${obj.second}`;
        } else {
        	result = `${obj.year}-${obj.month}-${obj.date}`;
        }
        
        return result;
    },
    
    getTimeObj (time) {
    	time = Number(time) * 1000;
    	let obj = {};
    	let _date = new Date(time);
    	
    	obj.second = _date.getSeconds() < 10 ? "0" + _date.getSeconds() : _date.getSeconds();
        obj.minute = _date.getMinutes() < 10 ? "0" + _date.getMinutes() : _date.getMinutes();
        obj.hour = _date.getHours() < 10 ? "0" + _date.getHours() : _date.getHours();

        obj.day = _date.getDay() + 1;
        obj.date = _date.getDate() < 10 ? "0" + _date.getDate() : _date.getDate();
        obj.month = _date.getMonth() + 1  < 10 ? "0" + (_date.getMonth()+1) : (_date.getMonth()+1);
        obj.year = _date.getFullYear();

        return obj;
    },
	/*
	 * 浏览器端分享
	 */
	webShare () {
		let url = process.env.NODE_ENV === 'production' ? "/themes/willing/static/js/social-share.min.js" : "/static/js/social-share.min.js";
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
	wxShare (share_title, share_desc, share_url, share_img) {
		var urls = window.location.href;
		api.initJssdk(function(signData){
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
		},urls)
		
	}
}
