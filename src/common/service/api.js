'use strict';
import request from 'request';

export default class extends think.service.base {
	/**
	 * init
	 * @return {}         []
	 */
	init(...args) {
		super.init(...args);
	}

	/**
	 * [ServiceHandler 服务器接口调用]
	 * @param {string}    url  [接口地址]
	 * @param {object} data [参数]
	 */
	ServiceHandler(url, data) {
		console.log("[" + new Date() + "]", "************请求参数开始************");
		console.log("[" + new Date() + "]", "接口地址URL: ", url);
		console.log("[" + new Date() + "]", "接口参数数据: ", data);
		if (think.isEmpty(url)) {
			console.log("[" + new Date() + "]", "异常：URL不能为空!")
		}
		if (think.isEmpty(data)) {
			console.log("[" + new Date() + "]", "接口请求类型： ", "GET");
			console.log("[" + new Date() + "]", "*******************请求参数结束*****************");
			let fn = think.promisify(request.get);
			return fn({
				url: url
			})
		} else {
			let fn = think.promisify(request.post);
			console.log("[" + new Date() + "]", "接口请求类型： ", "POST");
			console.log("[" + new Date() + "]", "*********************请求参数结束***************");
			return fn({
				url: url,
				form: data
			})
		}
	}
}