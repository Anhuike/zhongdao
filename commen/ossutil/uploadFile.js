// const env = require('./config.js'); //配置文件，在这文件里配置你的OSS keyId和KeySecret,timeout:87600;
const base64 = require('./base64.js'); //Base64,hmac,sha1,crypto相关算法
require('./hmac.js');
require('./sha1.js');
const Crypto = require('./crypto.js');
import api from '../../api/api.js'

var config = {
	//aliyun OSS config
	uploadImageUrl: `${fileHost}`, // 默认存在根目录，可根据需求改
	AccessKeySecret: '', // AccessKeySecret 去你的阿里云上控制台上找
	OSSAccessKeyId: '', // AccessKeyId 去你的阿里云上控制台上找
	timeout: 87600 //这个是上传文件时Policy的失效时间
};


var fileHost = ''; //你的阿里云地址最后面跟上一个/   在你当前小程序的后台的uploadFile 合法域名也要配上这个域名

function getbouce(callback) {
	callback = typeof(callback) == 'function' ? callback : function(res) {};

	api.http('client/app/info', {}, res => {
		if (res.error == 0) {
			config.uploadImageUrl = 'https://' + res.data.oss.OSS_BUCKET + '.' + res.data.oss.endpoint + '/';
			config.AccessKeySecret = res.data.oss.OSS_ACCESS_KEY
			config.OSSAccessKeyId = res.data.oss.OSS_ACCESS_ID
		}
	})

	setTimeout(function() {
		callback(config)
	}, 1000)
};

// console.log(env, 123456)
/*
 *上传文件到阿里云oss
 *@param - filePath :图片的本地资源路径
 *@param - dir:表示要传到哪个目录下
 *@param - successc:成功回调
 *@param - failc:失败回调
 */
const uploadFile = function(filePath, dir, type, successc, failc) {
	getbouce(function(e) {
		//alert(filePath);
		if (!filePath) {
			uni.showModal({
				title: '上传失败',
				content: '请重试',
				showCancel: false,
			})
			return;
		}
		var days = new Date;
		var y = days.getFullYear();
		var m = days.getMonth() + 1;
		m = (m < 10 ? "0" + m : m);
		var d = days.getDate()
		d = (d < 10 ? "0" + d : d);
		var mineMoths = y.toString() + m.toString();
		var mineDate = y.toString() + m.toString() + d.toString();

		//图片名字 可以自行定义，     这里是采用当前的时间戳 + 150内的随机数来给图片命名的
		var timeStimp = hex_md5(new Date().getTime().toString() + Math.floor(Math.random() * 150).toString()).toUpperCase()
		if(type == 'photo'){
			var aliyunFileKey = dir + mineDate + '_' + timeStimp + '.png';
			var aliyunFilePath = 'photo/' + mineMoths + '/' + mineDate + '_' + timeStimp + '.png';
		}else {
			var aliyunFileKey = dir + mineDate + '_' + timeStimp + '.mp4';
			var aliyunFilePath = 'video/' + mineMoths + '/' + mineDate + '_' + timeStimp + '.mp4';
		}
		
		
		//alert(uploadFile.g);
		// const aliyunFilePath = 'video/' + mineMoths + '/' + mineDate + '_' + timeStimp + '.mp4';
		
		const aliyunServerURL = config.uploadImageUrl; //OSS地址，需要https
		const accessid = config.OSSAccessKeyId;
		const policyBase64 = getPolicyBase64();
		const signature = getSignature(policyBase64); //获取签名

		var uploadTask = uni.uploadFile({
			url: aliyunServerURL, //开发者服务器 url
			filePath: filePath, //要上传文件资源的路径
			name: 'file', //必须填file
			formData: {
				'key': aliyunFileKey,
				'policy': policyBase64,
				'OSSAccessKeyId': accessid,
				'signature': signature,
				'success_action_status': '200',
			},
			success: function(res) {
				// console.log(res);
				if (res.statusCode != 200) {
					failc(new Error('上传错误:' + JSON.stringify(res)))
					return;
				}
				successc(aliyunFilePath);
			},
			fail: function(err) {
				err.wxaddinfo = aliyunServerURL;
				failc(err);
			},
		})
		uploadTask.onProgressUpdate((res) => {
			// console.log('上传进度', res.progress + " " + new Date())
			// console.log('已经上传的数据长度', res.totalBytesSent)
			// console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
			// console.log(new Date());
			// if (res.progress != 100) {
			// 	uni.showLoading({
			// 		title: "正在上传 " + res.progress + '%'
			// 	})
			// } else if (res.progress == 100) {
			// 	// setTimeout(function() {
			// 	// 	uni.hideLoading()
			// 	// }, 500)
			// }
		})
	})

}

const getPolicyBase64 = function() {
	let date = new Date();
	date.setHours(date.getHours() + config.timeout);
	let srcT = date.toISOString();
	const policyText = {
		"expiration": srcT, //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了 
		"conditions": [
			["content-length-range", 0, 100 * 1024 * 1024] // 设置上传文件的大小限制,5mb
		]
	};

	const policyBase64 = base64.encode(JSON.stringify(policyText));
	console.log(policyBase64);
	return policyBase64;
}

const getSignature = function(policyBase64) {
	const accesskey = config.AccessKeySecret;

	const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
		asBytes: true
	});
	const signature = Crypto.util.bytesToBase64(bytes);
	console.log(signature);
	return signature;
}

module.exports = uploadFile;


/**
 * md5加密方法
 * */
var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s) {
	// console.log(s)
	return binl2hex(core_md5(str2binl(s), s.length * chrsz));
}

function b64_md5(s) {
	return binl2b64(core_md5(str2binl(s), s.length * chrsz));
}

function hex_hmac_md5(key, data) {
	return binl2hex(core_hmac_md5(key, data));
}

function b64_hmac_md5(key, data) {
	return binl2b64(core_hmac_md5(key, data));
}

/* Backwards compatibility - same as hex_md5() */
function calcMD5(s) {
	return binl2hex(core_md5(str2binl(s), s.length * chrsz));
}

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test() {
	return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len) {
	/* append padding */
	x[len >> 5] |= 0x80 << ((len) % 32);
	x[(((len + 64) >>> 9) << 4) + 14] = len;

	var a = 1732584193;
	var b = -271733879;
	var c = -1732584194;
	var d = 271733878;

	for (var i = 0; i < x.length; i += 16) {
		var olda = a;
		var oldb = b;
		var oldc = c;
		var oldd = d;

		a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
		d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
		c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
		b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
		a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
		d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
		c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
		b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
		a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
		d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
		c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
		b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
		a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
		d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
		c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
		b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

		a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
		d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
		c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
		b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
		a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
		d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
		c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
		b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
		a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
		d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
		c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
		b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
		a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
		d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
		c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
		b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

		a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
		d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
		c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
		b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
		a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
		d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
		c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
		b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
		a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
		d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
		c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
		b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
		a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
		d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
		c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
		b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

		a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
		d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
		c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
		b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
		a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
		d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
		c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
		b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
		a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
		d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
		c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
		b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
		a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
		d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
		c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
		b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

		a = safe_add(a, olda);
		b = safe_add(b, oldb);
		c = safe_add(c, oldc);
		d = safe_add(d, oldd);
	}
	return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t) {
	return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}

function md5_ff(a, b, c, d, x, s, t) {
	return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function md5_gg(a, b, c, d, x, s, t) {
	return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function md5_hh(a, b, c, d, x, s, t) {
	return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5_ii(a, b, c, d, x, s, t) {
	return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data) {
	var bkey = str2binl(key);
	if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

	var ipad = Array(16),
		opad = Array(16);
	for (var i = 0; i < 16; i++) {
		ipad[i] = bkey[i] ^ 0x36363636;
		opad[i] = bkey[i] ^ 0x5C5C5C5C;
	}

	var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
	return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y) {
	var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt) {
	return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str) {
	var bin = Array();
	var mask = (1 << chrsz) - 1;
	for (var i = 0; i < str.length * chrsz; i += chrsz)
		bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
	return bin;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray) {
	var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
	var str = "";
	for (var i = 0; i < binarray.length * 4; i++) {
		str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
			hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
	}
	return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray) {
	var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var str = "";
	for (var i = 0; i < binarray.length * 4; i += 3) {
		var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16) |
			(((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8) |
			((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
		for (var j = 0; j < 4; j++) {
			if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
			else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
		}
	}
	return str;
}
