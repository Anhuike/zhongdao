// api接口地址
var apiurl = 'https://www.zhongdaogy.com/api.php';
var apilink = 'https://www.zhongdaogy.com';
var plugins = require('../common/testplugin.js');
var __CFG = null;
var count = 1;
var amap = require('../assets/js/amap-wx.js');
var myAmapFun = new amap.AMapWX({
	key: 'fc7801e1c9e0f7eb8877161e545ce96c'
});
// #ifdef H5
// var jweixin = require('jweixin-module');
var C_DOMAIN = '.wm51.jhwaimai.com';
// #endif


// 3-KTAC5C949240C3775440046F9C64040E86
//系统参数
__CFG = __CFG || {
	"WX_OPENID": '',
	"TOKEN": "",
	'lat': '',
	'lng': '',
	'address': '',
	"UxLocation": {
		"lng": "",
		"lat": "",
		"address": ""
	},
	'wx_unionid': '',
	'wx_openid': '',
	'wx_code': '',
	'wx_info': '',
	'CLIENT_OS': 'UNIAPP',
	"apiurl": 'https://www.zhongdaogy.com/api.php',
	"apilink": 'https://www.zhongdaogy.com/api.php',
	"CITY_ID": '',
};


// #ifdef APP-PLUS
switch (uni.getSystemInfoSync().platform) {
	case 'android':
		__CFG.CLIENT_OS = "ANDROID";
		break;
	case 'ios':
		__CFG.CLIENT_OS = "IOS";
		break;
	default:
		__CFG.CLIENT_OS = "UNIAPP";
		// console.log('运行在开发者工具上')
		break;
}
// #endif
// #ifdef MP-WEIXIN
__CFG.CLIENT_OS = "WXAPP";
// #endif
// #ifdef H5
__CFG.CLIENT_OS = "UNIAPP";

let reg = /^<\{\$.*\}>$/i;
// if (!window.__CFG.IN_APP_CLIENT.match(reg)) {
// 	__CFG.IN_APP_CLIENT = window.__CFG.IN_APP_CLIENT
// }

// lff注释1
// if (checkIsWeixin()) {
// 	if (!window.__CFG.WX_OPENID.match(reg)) {
// 		__CFG.wx_openid = window.__CFG.WX_OPENID;
// 	}

// 	if (!window.__CFG.WX_UNIONID.match(reg)) {
// 		__CFG.wx_unionid = window.__CFG.WX_UNIONID;
// 	}
// }
//lff注释1 end

// #endif


// 参数： url:请求地址  param：请求参数  way：请求方式 res：回调函数
function http(api, parmas, callback, nothasloading) {

	// #ifdef H5
	apilink = 'https://www.zhongdaogy.com/api.php';
	apiurl = 'https://www.zhongdaogy.com/api.php';
	// #endif
	// #ifdef APP-PLUS
	apilink = __CFG.apilink;
	apiurl = __CFG.apiurl;
	// #endif

	// app 首页不要加载圈
	if (nothasloading == 1) {} else {
		if (uni.showLoading && !nothasloading) {
			// #ifdef APP-PLUS
			uni.showLoading({
				title: '加载中...',
			})
			// #endif
		};
	}


	parmas = parmas || {};
	callback = typeof(callback) == 'function' ? callback : function(res) {};
	Loginsure(function() {
		// getLocation(function(){
		// console.log(124)
		// if(__CFG.lat == '' && count <= 1 || __CFG.lng == '' && count <= 1){
		// 	count++;
		// 	uni.showToast({
		// 		icon: 'none',
		// 		title: '请先定位，否则部分功能无法使用',
		// 	})
		// };
		var json = {
			"TOKEN": __CFG.TOKEN || '',
			"API": api,
			"data": JSON.stringify(parmas),
			"LAT": __CFG.lat,
			"LNG": __CFG.lng,
			"CLIENT_OS": __CFG.CLIENT_OS,
			"CITY_ID": __CFG.CITY_ID
		};
		uni.request({
			url: apiurl + '?API=' + api,
			dataType: "json",
			data: json,
			method: "POST",
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: function(res) {
				// #ifdef APP-PLUS
				uni.hideLoading();
				// #endif

				if ((res.data.error == '101') || (res.error == '101')) {
					uni.showToast({
						icon: 'none',
						title: res.data.message || res.message,
						duration: 2000
					})
					// #ifdef APP-PLUS
					setTimeout(function() {
						plugins.AppLogin(
							function(result) {
								uni.setStorageSync('cuntoken', result);
								http(api, parmas, callback, nothasloading);
							},
							function(result) {
								uni.showToast({
									title: result
								});
							}
						);
						// uni.navigateTo({
						// 	url: '/pages/login/index',
						// })
						// location.href = res.data.login_url || res.login_url;
					}, 1500)
					// #endif
					// #ifdef H5
					setTimeout(function() {
						// uni.navigateBack({
						// 	delta: 1,
						// })
						// uni.navigateTo({
						// 	url: '/pages/login/index',
						// })
						location.href = res.data.login_url || res.login_url;
					}, 2000)
					// #endif
					// #ifdef MP-WEIXIN
					// uni.redirectTo({
					// 	url: '/pages/getAuthorize/getAuthorize',
					// });
					setTimeout(function() {
						uni.navigateTo({
							url: '/pages/getAuthorize/getAuthorize',
						});
					}, 2000)
					// wxlogin();
					// #endif
				} else if ((res.data.error == '110') || (res.error == '110')) {
					getLocation(function() {
						http(api, parmas, callback, nothasloading);
					})
				} else {
					callback(res.data);
				}
				// callback(res.data);
				// console.log(JSON.stringify(res))
			},
			fail: function(error) {
				uni.hideLoading();
				uni.showToast({
					icon: 'none',
					title: '网络请求错误'
				})
			}
		})
		// })
	})

};

// 获取登录token
function Loginsure(callback) {
	// #ifdef H5
	var token = get_cookie('TOKEN') || '';
	if (token) {
		__CFG.TOKEN = token;
	}
	callback();
	// #endif
	// #ifdef APP-PLUS
	var tok = plugins.getToken();
	if (tok == '') {
		uni.removeStorageSync('cuntoken');
	} else {
		uni.setStorageSync('cuntoken', tok);
	}
	var token = tok;
	// var token = uni.getStorageSync('cuntoken') || '4-KTF0831C76B1C4B6603B0ED65ADF73F221';
	__CFG.TOKEN = token || '';
	callback();
	// #endif
	// #ifdef MP-WEIXIN
	// __CFG.TOKEN = '7-KTD40C253C3D8222345305AF6A6C81E401';
	var token = uni.getStorageSync('cuntoken') || '';
	__CFG.TOKEN = token || '';
	callback();
	// #endif
};


//判断是否微信
function checkIsWeixin() {
	if (/(micromessenger)/.test(navigator.userAgent.toLowerCase())) {
		return true;
	} else {
		return false;
	}
};

//设置浏览器cookie
function set_cookie(key, value, expire, path) {
	var keys = 'KT-' + key;
	path = path || '/';
	// var C_DOMAIN = '.wm.mall.cn';
	var a = keys + "=" + value;
	if (typeof(expire) != 'undefined') {
		var date = new Date();
		expire = parseInt(expire, 10);
		date.setTime(date.getTime() + expire * 1000);
		a += "; expires=" + date.toGMTString();
	}
	a += ";path=" + path;
	// a += ";domain="+C_DOMAIN;
	document.cookie = a;
};

//删除浏览器cookie
function remove_cookie(key) {
	if (!key) {
		return false;
	} else {
		var keys = 'KT-' + key;
		document.cookie = keys + "=;expires=" + (new Date(0)).toGMTString();
	}
};

//获取浏览器cookie
function get_cookie(key) {
	// console.log(key)
	if (!key) {
		return false;
	} else {
		var keys = 'KT-' + key;
		// console.log(keys)
		var reg = new RegExp("(^| )" + keys + "=([^;]*)(;|\x24)");
		var result = reg.exec(document.cookie);
		// console.log(result,document.cookie)
		if (result) {
			return result[2] || '';
		}
		return '';
	}
};

//初始化地图对象，加载地图
// var map = new AMap.Map('container', {
//     resizeEnable: true,
// });
// 定位当前位置
function getLocation(callback, isShow) {
	callback = typeof(callback) == 'function' ? callback : function(res) {};
	// console.log(__CFG.lat,__CFG.lng)
	if (__CFG.lat == '' || __CFG.lng == '') {
		// #ifndef H5
		if (isShow != false) {
			uni.showLoading({
				title: '获取位置信息中'
			})
		}
		uni.getLocation({
			type: 'wgs84' || 'gcj02',
			geocode: 'true',
			success: function(res) {
				__CFG.lat = res.latitude;
				__CFG.lng = res.longitude;
				myAmapFun.getRegeo({
					success: function(data) {
						// #ifdef APP-PLUS
						var latlng = {
							"lat": res.latitude,
							"lng": res.longitude
						}
						plugins.appLnglat(latlng);
						// #endif
						__CFG.address = data[0].name;
						__CFG.UxLocation.address = data[0].name;
						// + data[0].desc
						uni.hideLoading();
						callback()
						//成功回调
					},
					fail: function(info) {
						//失败回调
						// console.log(info)
						uni.navigateTo({
							url: '/pages/addr/selectReceive'
						})
					}
				})
				// callback()
			},
			fail: function(error) {
				// if (count <= 1) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '定位失败'
				// 	})
				// }
				uni.navigateTo({
					url: '/pages/addr/selectReceive'
				})

				// #ifdef APP-PLUS
				// plus.nativeUI.alert(JSON.stringify(error))
				// #endif

				// callback();
			},
			complete: function(rs) {
				console.log(JSON.stringify(rs))
			}
		})
		// #endif
		// #ifdef H5
		// console.log(sessionStorage.getItem('lat'))
		var selat = sessionStorage.getItem('lat') || '';
		var selng = sessionStorage.getItem('lng') || '';
		var seaddress = sessionStorage.getItem('addr') || sessionStorage.getItem('address') || '';
		// console.log(selng)
		var UxLocation = JSON.parse(localStorage["KT-UxLocation"] || '{}') || {};
		// console.log(JSON.stringify(UxLocation) == {} ? 'true':'false')
		// console.log(UxLocation)
		// console.log(JSON.stringify(UxLocation))
		if (JSON.stringify(UxLocation) == '{}') {
			// console.log(111)
			if (checkIsWeixin()) {

				if (selat == '' || selat == 'null' || selat == null || selat == 'undefined' || selat == undefined || selng == '' ||
					selng == 'null' || selng == null || selng == 'undefined' || selng == undefined) {
					getLocal(function() {
						callback();
					});
				} else {
					__CFG.lat = selat || '';
					__CFG.lng = selng || '';
					__CFG.address = seaddress || '';
					__CFG.UxLocation.lat = selat || '';
					__CFG.UxLocation.lng = selng || '';
					__CFG.UxLocation.address = seaddress || '';
					callback();
				}
				// getLocal(function(){
				// 	callback();
				// });

			} else {
				if (selat == '' || selat == 'null' || selat == null || selat == 'undefined' || selat == undefined || selng == '' ||
					selng == 'null' || selng == null || selng == 'undefined' || selng == undefined) {
					setTimeout(function() {
						AMap.plugin('AMap.Geolocation', function() {
							var geolocation = new AMap.Geolocation({
								enableHighAccuracy: false, // 是否使用高精度定位，默认：true
								timeout: 10000, // 设置定位超时时间，默认：无穷大
								// showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
								// showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
								// panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
								// zoomToAccuracy:true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
								extensions: 'all' // 返回周边POI、道路交叉口等信息
							});
							geolocation.getCurrentPosition()
							AMap.event.addListener(geolocation, 'complete', onComplete)
							AMap.event.addListener(geolocation, 'error', onError)

							function onComplete(data) {
								console.log(data)
								// getGeocoder(data.position.lng,data.position.lat,function(pos){
								// console.log(pos)
								var uaddress = '';
								if (data.pois && data.pois.length > 0) {
									uaddress = data.pois[0].name;
								} else if (data.formattedAddress) {
									uaddress = data.formattedAddress;
								} else {
									uaddress = data.addressComponent.city + data.addressComponent.district
								}

								var uxlocation = {
									"lng": data.position.lng || '',
									"lat": data.position.lat || '',
									"addr": uaddress || '',
									"UxCityName": '',
								}
								sessionStorage.setItem('UxLocation', JSON.stringify(uxlocation) || '');
								sessionStorage.setItem('lat', data.position.lat || '');
								sessionStorage.setItem('lng', data.position.lng || '');
								sessionStorage.setItem('address', uaddress || '');
								__CFG.lat = data.position.lat || '';
								__CFG.lng = data.position.lng || '';
								__CFG.address = uaddress || '';
								__CFG.UxLocation.lat = data.position.lat || '';
								__CFG.UxLocation.lng = data.position.lng || '';
								__CFG.UxLocation.address = uaddress || '';
								callback();
								// })

							};

							function onError(data) {
								// 定位出错
								//alert('amapfails:'+JSON.stringify(data))
								//alert("获取定位失败");
								//callback();
								// window.AUTO_POSITION && (window.location.href = window.AUTO_POSITION);
								uni.navigateTo({
									url: '/pages/addr/selectReceive'
								})
							};
						})
					}, 500);

					// uni.chooseLocation({
					// 	success: function(res) {
					// 		sessionStorage.setItem('lat', res.latitude || selat || '');
					// 		sessionStorage.setItem('lng', res.longitude || selng || '');
					// 		sessionStorage.setItem('address', res.address || seaddress || '');
					// 		__CFG.lat = res.latitude || selat || '';
					// 		__CFG.lng = res.longitude || selng || '';
					// 		__CFG.address = res.address || seaddress || '';
					// 		__CFG.UxLocation.lat = res.latitude || selat || '';
					// 		__CFG.UxLocation.lng = res.longitude || selng || '';
					// 		__CFG.UxLocation.address = res.address || seaddress || '';
					// 		callback();
					// 	},
					// 	fail: function(err) {
					// 		console.log(111)
					// 		callback();
					// 	},
					// 	complete: function(rs) {
					// 		// console.log(rs)
					// 	}
					// });
				} else {
					__CFG.lat = sessionStorage.getItem('lat') || '';
					__CFG.lng = sessionStorage.getItem('lng') || '';
					__CFG.address = sessionStorage.getItem('address') || '';
					__CFG.UxLocation.lat = selat || '';
					__CFG.UxLocation.lng = selng || '';
					__CFG.UxLocation.address = seaddress || '';
					callback();
				}
			}

		} else {
			// console.log(785)
			var uxlocation = {
				"lng": UxLocation.lng || '',
				"lat": UxLocation.lat || '',
				"addr": UxLocation.addr || '',
				"UxCityName": UxLocation.UxCityName || '',
			}
			sessionStorage.setItem('UxLocation', JSON.stringify(uxlocation) || '');
			sessionStorage.setItem('lat', UxLocation.lat);
			sessionStorage.setItem('lng', UxLocation.lng);
			sessionStorage.setItem('address', UxLocation.addr);
			__CFG.lat = UxLocation.lat || '';
			__CFG.lng = UxLocation.lng || '';
			__CFG.address = UxLocation.addr || '';
			__CFG.UxLocation.lat = UxLocation.lat || '';
			__CFG.UxLocation.lng = UxLocation.lng || '';
			__CFG.UxLocation.address = UxLocation.addr || '';
			callback();
		}
		// if( JSON.stringify(UxLocation) != {} || JSON.stringify(UxLocation) != '{}' || UxLocation != ''){
		// 	
		// }else{
		// 	
		// }


		// #endif
	} else {
		callback();
	}
};

function getGeocoder(lng, lat, callback) {
	console.log(lng, lat)
	callback = typeof(callback) == 'function' ? callback : function(res) {};
	AMap.plugin('AMap.Geocoder', function() {
		var geocoder = new AMap.Geocoder({
			// city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
			city: '全国',
			extensions: 'all'
		})

		var lnglat = [lng, lat];

		geocoder.getAddress(lnglat, function(status, result) {
			console.log(status, result)
			if (status === 'complete' && result.info === 'OK') {
				// result为对应的地理位置详细信息
				console.log(result);
				let items = result.regeocode.pois;
				if (items.length > 0) {
					var pos = {};
					console.log(items)
					for (let i in items) {
						var obj = {
							"name": items[i].name,
							"addr": items[i].address,
							"lng": items[i].location.lng,
							"lat": items[i].location.lat
						};
						if (i == '0') {
							pos = obj;
						}
					}
					callback(pos);
				}
			} else {

			}
		})
	})
};

//初始化sdk配置  
function initJssdk(callback, url) {
	callback = typeof(callback) == 'function' ? callback : function(res) {};
	// alert('111')
	//服务端进行签名 ，可使用uni.request替换。 签名算法请看文档  
	http('client/app/get_wechat', {
		url: url
	}, function(res) {
		if (res.data) {
			// alert(JSON.stringify(jweixin));
			// alert(JSON.stringify(res.data));
			jweixin.config({
				debug: false,
				appId: res.data.wxjs_config.appId,
				timestamp: res.data.wxjs_config.timestamp,
				nonceStr: res.data.wxjs_config.nonceStr,
				signature: res.data.wxjs_config.signature,
				jsApiList: ['checkJsAPi', 'getLocation', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ',
					'onMenuShareQZone', 'onMenuShareWeibo', 'updateAppMessageShareData', 'updateTimelineShareData', 'chooseWXPay'
				]
			});
			//配置完成后，再执行分享等功能  
			if (callback) {
				callback(res.data.wxjs_config);
			}
		}
	}, true);
};


// 定位当前位置
function getLocal(callback) {
	callback = typeof(callback) == 'function' ? callback : function(res) {};
	var urls = window.location.href;
	initJssdk(function(signData) {
		uni.showLoading({
			title: '微信定位中...'
		})
		jweixin.ready(function() {
			jweixin.getLocation({
				type: 'gcj02',
				success: function(res) {
					// alert(232323)
					// alert(JSON.stringify(res))
					var KTUxLocation = {
						"lng": res.longitude,
						"lat": res.latitude,
						"addr": '',
						"UxCityName": ''
					};

					AMap.plugin('AMap.Geocoder', function() {
						// alert(7878)
						var geocoder = new AMap.Geocoder({
							extensions: 'all'
						});
						AMap.event.addListener(geocoder, 'error', error)
						var lnglat = [Number(res.longitude), Number(res.latitude)]
						geocoder.getAddress(lnglat, function(status, result) {
							// alert(JSON.stringify(status))
							//    alert(JSON.stringify(result))
							// alert(JSON.stringify(result.regeocode))
							// alert(JSON.stringify(result.regeocode.addressComponent))
							// alert(JSON.stringify(result.regeocode.addressComponent.street))
							// console.log(result);
							if (status === 'complete' && result.info === 'OK') {
								uni.hideLoading();
								// alert(JSON.stringify(result.regeocode))
								// alert(JSON.stringify(result.regeocode.aois))
								// alert("no problem")
								// result为对应的地理位置详细信息

								var addr = '';
								if (result.regeocode.pois && result.regeocode.pois.length > 0) {
									addr = result.regeocode.pois[0].name;
								} else if (result.regeocode.formattedAddress) {
									addr = result.regeocode.formattedAddress;
								} else {
									addr = result.regeocode.addressComponent.city + result.regeocode.addressComponent.district
								}

								var uxlocation = {
									"lng": res.longitude || '',
									"lat": res.latitude || '',
									"addr": addr || '',
									"UxCityName": '',
								}
								// var addr = result.regeocode.aois[0].name;
								sessionStorage.setItem('UxLocation', JSON.stringify(uxlocation) || '');
								sessionStorage.setItem('lat', res.latitude || '');
								sessionStorage.setItem('lng', res.longitude || '');
								sessionStorage.setItem('address', addr || '');
								__CFG.lat = res.latitude || selat || '';
								__CFG.lng = res.longitude || selng || '';
								__CFG.address = addr || '';
								__CFG.UxLocation.lat = res.latitude || '';
								__CFG.UxLocation.lng = res.longitude || '';
								__CFG.UxLocation.address = addr || '';
								callback();
							} else {
								uni.hideLoading();
								callback();
							}
							/*else{
												        var result =    getGeoLocation();
												    
												    }*/
						});


						function error(res) {
							// getGeoLocation(res.longitude,res.latitude);

						}
					});
				},
				fail: function(res) {
					uni.hideLoading();
					callback();
					alert('微信获取位置失败');
					uni.navigateTo({
						url: '/pages/addr/selectReceive'
					})
					// window.location.href = window.__CFG.SITEURL + '/waimai/position/index.html';
				},
				cancel: function(res) {
					uni.hideLoading();
					callback();
					alert('用户拒绝获取位置');
					uni.navigateTo({
						url: '/pages/addr/selectReceive'
					})
				}
			});
		});
	}, urls)
};


function wxlogin() {
	console.log(5656)
	uni.login({
		provider: 'weixin',
		success: function(res) {
			console.log(res);
			if (res.code) {
				uni.getSetting({
					success(rs) {
						console.log(rs.authSetting['scope.userInfo'])
					}
				})
			}
		}
	});
};

// 核对登录
function checklogin() {
	console.log(111)
	// 微信openid
	var openid = uni.getStorageSync('wxopenid');
	openid = openid ? parGetData(openid) : '';
	// 用户信息
	var userinfo = uni.getStorageSync('userinfo');
	userinfo = userinfo ? parGetData(userinfo) : '';
	// 登录后的token值，在请求api时传入
	var token = uni.getStorageSync('token');
	token = token ? parGetData(token) : '';

	var appusername = uni.getStorageSync('appusername');
	appusername = appusername ? parGetData(appusername) : '';
	console.log(openid, userinfo, token, appusername)

	return {
		openid,
		userinfo,
		token,
		appusername
	}
};

// 通用登录方法
function logincomm(info, self) {
	//#ifdef APP-PLUS
	uni.showModal({
		title: '请登录',
		content: '请登录后继续操作',
		confirmText: '去登录',
		success: function(res) {
			if (res.confirm) {
				uni.navigateTo({
					url: '/platforms/app-plus/login/login'
				});
				return false;
			}
		}
	});
	//#endif

	//#ifdef MP-WEIXIN
	/* 登录方法 */
	if (!info.detail || !info.detail.userInfo) {
		return false;
	}
	var userinfo = info.detail.userInfo;
	uni.showLoading({
		title: '登录中',
		icon: 'none'
	})
	if (typeof self.showlogin !== 'undefined') {
		self.showlogin = false
	}
	uni.login({
		provider: 'weixin',
		success: function(res) {
			// 根据code换取openid
			uni.request({
				url: apiurl + 'syj/index/getopenid',
				method: "POST",
				data: {
					code: res.code,
					nickname: userinfo.nickName,
					avatarurl: userinfo.avatarUrl,
					shebei: shebei
				},
				success: function(ret) {
					if (ret.statusCode == 200 && ret.data.openid) {
						var openid = ret.data.openid;
						userinfo.openid = openid;
						userinfo.avatar = userinfo.avatarUrl;
						self.openid = openid
						self.token = ret.data.token
						self.userinfo = userinfo
						// 存入缓存
						uni.setStorageSync(
							'wxopenid',
							parSetData(openid)
						);
						// 存入用户信息
						uni.setStorageSync(
							'userinfo',
							parSetData(userinfo)
						)
						// 存入token
						uni.setStorageSync(
							'token',
							parSetData(ret.data.token)
						)
						if (ret.data.username) {
							// 已绑定app帐号
							// 存入appusername
							uni.setStorageSync(
								'appusername',
								parSetData(ret.data.username)
							)
							if (typeof self.appusername !== 'undefined') {
								self.appusername = ret.data.username
							}
						}
					}
				},
				complete: function() {
					uni.hideLoading()
				},
				header: {
					auth: httpauth
				}
			});
		}
	});
	//#endif
};

//上传图片
function upload(api, filePaths, successUp, failUp, i, length, files, callback) {
	// #ifndef H5
	if (uni.getExtConfig) {
		uni.getExtConfig({
			success: function(reg) {
				filePaths = filePaths || {};
				callback = typeof callback == 'function' ? callback : function(res) {};
				//var files;
				var json = {
					"data": {
						'photo': filePaths[i]
					}
				};
				uni.showLoading({
					title: '上传中'
				})
				uni.uploadFile({
					url: apiurl + '?API=' + api,
					filePath: filePaths[i],
					header: {
						'content-type': 'multipart/from-data'
					},
					name: 'file',
					formData: json,
					success: function(resp) {
						uni.hideLoading();
						console.log(resp)
						if (resp.data != 0) {
							successUp++;
							files[i] = resp.data;
						} else {
							failUp++;
						}
					},
					fail: function(res) {
						uni.hideLoading();
						failUp++;
					},
					complete: function() {
						uni.hideLoading();
						i++;
						if (i == length) {
							console.log(files);
							uni.showToast({
								title: '总共' + successUp + '张上传成功,' + failUp + '张上传失败！',
								icon: 'none',
								duration: 2000
							});
							callback(files);
						} else { //递归调用upload函数
							upload(api, filePaths, successUp, failUp, i, length, files, callback);
						}
					}
				});
			}
		});
	};
	// #endif
	// #ifdef H5
	// return new Promise((resolve, reject) => {
	uni.showLoading({
		title: '上传中'
	})
	var json = {
		"TOKEN": __CFG.TOKEN,
		"data": {
			'photo': filePaths[i]
		}
	};
	var failfile = [];
	uni.uploadFile({
		url: apiurl + '?API=' + api, //仅为示例，非真实的接口地址
		filePath: filePaths[i],
		name: 'file',
		formData: json,
		success: function(resp) {
			uni.hideLoading();
			console.log(resp)
			if (resp.data != 0) {
				successUp++;
				files[i] = resp.data;
			} else {
				failfile = failfile.concat(filePaths[i])
				failUp++;
			}
		},
		fail: function(res) {
			uni.hideLoading();
			failfile = failfile.concat(filePaths[i])
			failUp++;
		},
		complete: function(rsp) {
			console.log(rsp, filePaths[i])
			uni.hideLoading();
			i++;
			if (i == length) {
				console.log(files);
				uni.showToast({
					title: '总共' + successUp + '张上传成功,' + failUp + '张上传失败！',
					icon: 'success',
					duration: 2000
				});
				// 						if(failUp > 0){
				// 							console.log(89)
				// 							callback(failfile,files)
				// 						}else{
				callback(files);
				// }

			} else { //递归调用upload函数
				upload(api, filePaths, successUp, failUp, i, length, files, callback);
			}
		}
	});
	// })
	// #endif

};

export default {
	apiurl,
	apilink,
	checklogin,
	logincomm,
	http,
	upload,
	__CFG,
	checkIsWeixin,
	getLocation,
	set_cookie,
	myAmapFun,


	// 接口
	// 微信小程序授权登录
	wxappendata(params, callback) {
		return http("client/wxapp/endata", params, callback);
	},
	wxapplogin(params, callback) {
		return http("client/passport/login", params, callback);
	},
	wxappwxbind(params, callback) {
		return http("client/passport/wxbind", params, callback);
	},

	pressmeeting(params, callback) {
		return http("meeting/meeting/pressmeeting", params, callback);
	},

	//首页加载显示
	listcate(params, callback) {
		return http("index/index/list_cate", params, callback);
	},

	//重点项目列表
	listprojects(params, callback) {
		return http("index/index/index", params, callback);
	},

	//点赞
	zan(params, callback) {
		return http("projects/zan/zan", params, callback);
	},

	//收藏
	collect(params, callback) {
		return http("index/index/collect", params, callback);
	},
	// 详情页数据
	project_details(params, callback) {
		return http("projects/projects/detail", params, callback);
	},
	// 评论
	comment(params, callback) {
		return http("projects/comment/comment", params, callback);
	},
	// 项目;列表...
	// 请求地址：https://www.zhongdaogy.com/api.php?API=projects/projects/getProjects
	getProjects(params, callback) {
		return http("projects/projects/getProjects", params, callback);
	},
	// 项目支付选择数据
	Seize_data(params, callback) {
		return http('projects/projects/getProducts', params, callback)
	},
	// 项目中心接
	xm_centre(params, callback) {
		return http('center/index/index', params, callback)
	},
	// 视频
	// 请求地址：https://www.zhongdaogy.com/api.php?API=media/index/index
	video_generalize(params, callback) {
		return http('media/index/index', params, callback)
	},
	// 选择分类
	// 请求地址：https://www.zhongdaogy.com/api.php?API=media/index/getNews
	getNews_tap(params, callback) {
		return http('media/index/getNews', params, callback)
	},

	// 

	//  资讯详情
	tcinfcenterdetail(params, callback) {
		return http("center/index/detail", params, callback);
	},
	//  资讯评论接口
	tcinfcentercomment(params, callback) {
		return http("center/comment/comment", params, callback);
	},
	//  资讯评论回复接口
	tcinfcentercommentreply(params, callback) {
		return http("center/comment/reply", params, callback);
	},
	//  资讯详情内评论列表接口
	tcinfcentercommentitems(params, callback) {
		return http("center/index/comment", params, callback);
	},
	//资讯评论详情接口
	tcinfcentercommentdetail(params, callback) {
		return http("center/comment/detail", params, callback);
	},
	//  资讯评论&回复删除接口
	tcinfcentercommentdelete(params, callback) {
		return http("center/comment/delete", params, callback);
	},
	//  资讯点赞接口
	tcinfcenterdianzan(params, callback) {
		return http("center/zan/zan", params, callback);
	},
	//线上网络平台 
	online_platform(params, callback) {
		return http("center/inter/index", params, callback);
	},
	//高端资源
	HighPoint(params, callback) {
		return http("center/resource/index", params, callback);
	},
	//政商学院
	postils(params, callback) {
		return http("college/index/index", params, callback);
	},
	// 列表页
	postils_list(params, callback) {
		return http("college/index/getList", params, callback);
	},
	// ：https://www.zhongdaogy.com/api.php?API=center/explian/index
	// 解读
	Readings(params, callback) {
		return http("center/explian/index", params, callback);
	},
	// http://www.zhongdaogy.com/api.php?API=college/index/listForums
	//论坛
	listForums(params, callback) {
		return http("college/index/listForums", params, callback);
	},

	// 合作链接 列表页
	link_list(params, callback) {
		return http("college/index/outlineList", params, callback);
	},

	// 项目中心会议 预约
	meeting(params, callback) {
		return http("meeting/index/appointment", params, callback);
	},

	// 合作交流
	meeting_home(params, callback) {
		return http("meeting/index/index", params, callback);
	},
	// 会议详情信息

	meeting_details(params, callback) {
		return http("meeting/index/getDetails", params, callback);
	},
	// 项目中心列表
	ulitem_list(params, callback) {
		return http("center/index/getList", params, callback);
	},
	// 我发布的

	mymeeting(params, callback) {
		return http("meeting/index/mymeeting", params, callback);
	},
	// ///////////////////////////////// 在做哦
	// 生成订单
	// https://www.zhongdaogy.com/api.php?API=projects/product/create_order
	create_order(params, callback) {
		return http('projects/product/create_order', params, callback)
	},
	// 支付完成
	order(params, callback) {
		return http('projects/order/orderInfo', params, callback)
	},
	// 订单列表
	// https://www.zhongdaogy.com/api.php?API=projects/order/orderList
	orderList(params, callback) {
		return http('projects/order/orderList', params, callback)
	},
	// // 支付预览
	// prePay(params, callback) {
	// 	return http('mall/payment/preorder', params, callback)
	// },
	// // 支付
	// pay(params, callback) {
	// 	return http('mall/payment/order', params, callback)
	// },
	// 重点项目评论
	getComments(params, callback) {
		return http('projects/projects/getComments', params, callback)
	},
	//重点项目关注
	// http://www.zhongdaogy.com/api.php?API=projects/projects/attention
	attention(params, callback) {
		return http('projects/projects/attention', params, callback)
	},
	//分享成功记录
	recordshare(params, callback) {
		return http('share/share/record_share', params, callback)
	},

	//点击分享链接记录
	clickshare(params, callback) {
		return http('share/share/click_share', params, callback)
	},
	// 列表取消订单
	// https://www.zhongdaogy.com/api.php?API=projects/order/cancel
	cancel(params, callback) {
		return http('projects/order/cancel', params, callback)
	},
	// //详情取消订单
	// ordercancel(params, callback) {
	// 	return http('projects/order/cancel', params, callback)
	// },
	//删除订单
	orderdel(params, callback) {
		return http('projects/order/delete', params, callback)
	},
	// 项目管理

	manage(params, callback) {
		return http('projects/order/list_nav', params, callback)
	},
	// 我的推广
	generalize(params, callback) {
		return http('projects/promote/list_projects', params, callback)
	},
	// 我的推广下 关注 收藏.....
	getOnelist(params, callback) {
		return http('projects/promote/getOnelist', params, callback)
	},
	// 关注取关
	_follow(params, callback) {
		return http('projects/promote/collect', params, callback)
	},
}
