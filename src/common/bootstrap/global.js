/**
 * this file will be loaded before server started
 * you can define global functions used in controllers, models, templates
 */


/**
 * [APIService 接口请求封装]
 * 调用方式：
 * POST ：APIService().POSTService()
 * GET ：APIService().GETService()
 * @return {[type]} [description]
 */
global.APIService = () => {
	let HttpsService = think.service("api");
	let httpsInstance = new HttpsService();
	return httpsInstance;
}

/**
 * [获取数据]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
global.getHttpAPIData = (options) => {
	let stime = new Date().valueOf();
	console.log("==============================", new Date(), "===================================");
	console.log("[" + new Date() + "]", "API服务器请求开始时间: ", stime);
	return new Promise(function(resolve, reject) {
		APIService().ServiceHandler(options.url, options.data)
			.then(respones => {
				let etime = new Date().valueOf();
				console.log("[" + new Date() + "]", "API服务器请求结束时间: ", etime);
				if (parseInt(respones.statusCode) !== 200) {
					//服务器错误
					let error = {
						code: respones.statusCode,
						msg: respones.statusMessage
					}
					console.log("[" + new Date() + "]", "服务器异常：", respones.statusCode + "||" + respones.statusMessage);
					console.log("===================================================================================")
					return reject(error);
				} else {
					let data = JSON.parse(respones.body);
					console.log("[" + new Date() + "]", "服务器正常：", respones.statusCode);
					console.log("[" + new Date() + "]", "服务器返回数据: ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ ");
					console.log(data);
					console.log("[" + new Date() + "]", "↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ ");
					console.log("===========================================================================================")
					resolve(data);
				}
			});
	});
}


/**
 * [获取用户平台]
 * @param  {[type]} ua [description]
 * @return {[type]}    [description]
 */
global.getPlatForm = (ua) => {
	let _userAgent = ua.toLowerCase();
	if ((/mobile/i.test(_userAgent)) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(_userAgent))) {
		if (/iphone/i.test(_userAgent)) {
			return 2;
		} else if (/android/i.test(_userAgent)) {
			return 1;
		} else {
			return 5;
		}
	} else {
		return 3
	}

}