
! function(root, factory) {
	if (typeof exports == 'object' && typeof module != 'undefined') {
		module.exports = factory()
	} else if (typeof define == 'function' && define.amd) {
		define(factory)
	} else {
		// 5+ 兼容
		document.addEventListener('plusready', function(){
		// 修改此处为插件命名
		var plugintest = 'plugintest';
		// 挂载在plus下
		root.plus[plugintest] = factory()
		},false);
	}
}(this, function() {
	//在此处定义自己的方法
	var _BARCODE = 'plugintest';
	var plugintest = {
		/*方法已忽略，详细方法请参考SDK中的demo*/
		BackHome: function() {
			return plus.bridge.execSync(_BARCODE, "BackHome");
		},
		AppToken: function(Argus) {
			return plus.bridge.execSync(_BARCODE, "AppToken", [Argus]);
		},
		getToken: function(Argus) {
			return plus.bridge.execSync(_BARCODE, "getToken", [Argus]);
		},
		AppShare: function(Argus, successCallback, errorCallback) {
			var success = typeof successCallback !== 'function' ? null : function(args) {
					successCallback(args);
				},
				fail = typeof errorCallback !== 'function' ? null : function(code) {
					errorCallback(code);
				};
			var callbackID = plus.bridge.callbackId(success, fail);
		
			return plus.bridge.exec(_BARCODE, "AppShare", [callbackID, Argus]);
		},
		onPayment: function(Argus, type, successCallback, errorCallback) {
			var success = typeof successCallback !== 'function' ? null : function(args) {
					successCallback(args);
				},
				fail = typeof errorCallback !== 'function' ? null : function(code) {
					errorCallback(code);
				};
			var callbackID = plus.bridge.callbackId(success, fail);
		
			return plus.bridge.exec(_BARCODE, "onPayment", [callbackID, Argus, type]);
		},
		AppLogin: function(successCallback, errorCallback) {
			var success = typeof successCallback !== 'function' ? null : function(args) {
					successCallback(args);
				},
				fail = typeof errorCallback !== 'function' ? null : function(code) {
					errorCallback(code);
				};
			var callbackID = plus.bridge.callbackId(success, fail);
		
			return plus.bridge.exec(_BARCODE, "AppLogin", [callbackID]);
		},
		Imgstroe: function(Argus,successCallback, errorCallback) {
			var success = typeof successCallback !== 'function' ? null : function(args) {
					successCallback(args);
				},
				fail = typeof errorCallback !== 'function' ? null : function(code) {
					errorCallback(code);
				};
			var callbackID = plus.bridge.callbackId(success, fail);
		
			return plus.bridge.exec(_BARCODE, "Imgstroe", [callbackID, Argus]);
		},
		
		
		// app经纬度传递
		appLnglat: function(Argus){
			return plus.bridge.execSync(_BARCODE, "appLnglat", [Argus]);
		},
		
		// 跳转app外链(匹配app页面)
		toLinkurl: function(Argus){
			return plus.bridge.execSync(_BARCODE, "toLinkurl", [Argus]);
		},
	};
	return plugintest;
});