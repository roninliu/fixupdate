/**
 * this file will be loaded before server started
 * you can register middleware
 * https://thinkjs.org/doc/middleware.html
 */


/**
 * [检查用户是否已经登录]
 * @param  {[type]} http
 * @return {[type]}
 */
think.middleware("VerifyUser", async http => {
	let uid = await http.cookie("token");
	if (think.isEmpty(uid)) {
		if (http.url.indexOf("/check/index") < 0) {
			return think.statusAction(1001, http);
		}
	}
});

/**
 * [初始化基本参数]
 * @param  {[type]} http [description]
 * @return {[type]}      [description]
 */
think.middleware("InitCommonParams", async http => {
	let mac = await http.cookie("uin");
	let os = await getPlatForm(http.userAgent());
	let params = await http.param();
	let version = await http.config().version;
	let channel = await http.config().channel;
	let timestamp = new Date().valueOf();
	let skey = await http.config().skey;
	let token = think.md5(skey + timestamp).slice(3, 10);
	params.mac = mac;
	params.os = os;
	params.version = version;
	params.bi_channel = channel;
	params.timestamp = timestamp;
	params.access_token = token;
	http._post = params;
})



/**
 * [中间件，自动注册BI信息基础数据，保证每次请求都效验]
 * @param  {http} http [http]
 * @return {[void]}      [直接注册Cookie]
 */
think.middleware("InitCookies", async http => {
	let seq = await http.cookie("seq");
	let machineId = await http.cookie("uin");
	let seqNum = await http.cookie("seqnum");
	if (!think.isEmpty(machineId)) {
		//已经存在BI数据
		console.log("已经存在用户设备号：", machineId);
		if (!think.isEmpty(seq)) {
			console.log("已经存在用户流水序列：", seq);
			if (!think.isEmpty(seqNum)) {
				console.log("已经存在用户流水号：", seqNum);
				seqNum = parseInt(seqNum) + 1;
				http.cookie("seqnum", seqNum, {
					timeout: 365 * 24 * 3600
				})
				seqNum = http.cookie("seqnum");
				console.log("当前用户流水号：", seqNum);
			} else {
				http.cookie("seqnum", "1", {
					timeout: 365 * 24 * 3600
				})
				seqNum = http.cookie("seqnum");
				console.log("当前用户流水号：", seqNum.value);
			}
		} else {
			let keySeq = think.md5(machineId);
			http.cookie("seq", keySeq, {
				timeout: 365 * 24 * 3600
			})
			seq = http.cookie("seq")
			console.log("当前用户流水序列：", seq.value);
			http.cookie("seqnum", "1", {
				timeout: 365 * 24 * 3600
			})
			seqNum = http.cookie("seqnum");
			console.log("当前用户流水号：", seqNum.value);
		}
	} else {
		//不存在BI信息，自动生成BI数据
		let uuid = think.uuid();
		http.cookie("uin", uuid, {
			timeout: 365 * 24 * 3600
		})
		machineId = http.cookie("uin");
		console.log("当前用户设备号：", machineId.value);
		let keySeq = think.md5(uuid);
		http.cookie("seq", keySeq, {
			timeout: 365 * 24 * 3600
		})
		seq = http.cookie("seq")
		console.log("当前用户流水序列：", seq.value);
		http.cookie("seqnum", "1", {
			timeout: 365 * 24 * 3600
		})
		seqNum = http.cookie("seqnum");
		console.log("当前用户流水号：", seqNum.value);
	}
})