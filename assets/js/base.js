export default {
	formatDate (num) {
		if (!Number(num)) {
			return "";
		}
		
		num = Number(num) * 1000;
		let result = {};
		
		let year = new Date(num).getFullYear();
		let month = new Date(num).getMonth() + 1 >= 10 ? new Date(num).getMonth() + 1 : "0" + (new Date(num).getMonth() + 1);
		let date = new Date(num).getDate() >= 10 ? new Date(num).getDate() : "0" + new Date(num).getDate();
		
		let hour = new Date(num).getHours() >= 10 ? new Date(num).getHours() : "0" + new Date(num).getHours();
		let minute = new Date(num).getMinutes() >= 10 ? new Date(num).getMinutes() : "0" + new Date(num).getMinutes();
		let second = new Date(num).getSeconds() >= 10 ? new Date(num).getSeconds() : "0" + new Date(num).getSeconds();
		result.year = year;
		result.month = month;
		result.date = date;
		result.hour = hour;
		result.minute = minute;
		result.second = second;
		
		return result;
	}
}
