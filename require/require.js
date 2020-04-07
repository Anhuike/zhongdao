function callRequire(path, re_data) {
	let path_ip = 'https://www.zhongdaogy.com/api.php?'
	console.log(path)
	return new Promise(function(resolve, reject) {
		uni.request({
			url: path_ip + path,
			dataType: 'JSON',
			data: {
				re_data
			},
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}
module.exports = {
	callRequire: callRequire
}
