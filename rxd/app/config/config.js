//import 'whatwg-fetch';
import qwest from 'qwest';
const hostUrl = 'http://localhost:8080/';//接口地址
import './bridge';

let Config = {
	//ajax方法
	ajax: function (url, param) {
		if (url.indexOf('://') > -1) {
			url = url;
		} else {
			url = hostUrl + url;
		}
		return qwest.get(url, param)
		// .then((xhr, data) => {
		// 	return data;
		// })
		// .catch(function(e, xhr, response) {
		// 	// Process the error
		// 	console.log('system error!');
		// });
	},
	//调用原生native方法
	native: function (method, data) {
		var t = null;
		setTimeout(() => {
			window.JSBridge.requestHybrid({
				method: method,
				data: data,
				callback: function (result) {
					t && t(result)
				}
			});
		}, 0)
		return {
			then: function (f) {
				t = f;
			}
		}
	}
}
export default Config;