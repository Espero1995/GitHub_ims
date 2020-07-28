//声明 ims 对象
window.ims = {};
//存放参数
ims.global = {};
/** 存放键的数组(遍历用到) */
ims.keys = [];
/** 存放数据 */
ims.data = new Object();
ims.ocxLoginMes = {};
ims.menulist = [];
ims.views = {};
ims.models = {};
ims.vqsearchTime = '';
ims.vcSearchTime = '';
//
ims.user = {};
ims.depId = 7007;
//  ims.userinfo ={};
// ims.userPassword = {};
ims.loginObject = { status: 'ok' };

//公共的url
ims.urls = 'http://' + window.location.host + '/ims_m/';

// ims.urls = "http://10.100.23.106:8080/ims_m/";
// ims.urls = "http://10.151.2.158:8080/ims_m/";
// ims.urls = "http://10.151.0.67:8080/ims_m/";
// ims.urls ="http://"+'10.100.23.186:8080/ims_m/';
(ims.countUnit = function (num) {
	const laterNum = num / 1024;
	const laterNum1 = Math.abs(laterNum);
	if (laterNum1 / 1024 / 1024 >= 1) {
		return (laterNum / 1024 / 1024).toFixed(2) + 'GB/s';
	}
	if (1024 > laterNum1 / 1024 >= 1) {
		// console.log(typeof(laterNum))
		return (laterNum / 1024).toFixed(0) + 'MB/s';
	}
	if (1024 > laterNum1 >= 1) {
		// console.log(typeof(laterNum))
		return laterNum.toFixed(0) + 'KB/s';
	}
	if (1 > laterNum1 >= 0) {
		// console.log(typeof(num))
		return num + 'byte/s';
	}
}),
	(ims.hddCount = function (num) {
		const laterNum = num / 1024;
		if (laterNum >= 1024) {
			// console.log(typeof(laterNum))
			return (laterNum / 1024).toFixed(0) + 'T';
		}
		if (1024 > laterNum >= 1) {
			// console.log(typeof(laterNum))
			return laterNum.toFixed(0) + 'GB';
		}
		if (1024 > num >= 0) {
			// console.log(typeof(laterNum))
			return num + 'MB';
		}
	}),
	(ims.hardDiskStatic = function (num) {
		switch (num) {
			case 0:
				return '&nbsp;&nbsp;<span class="status" style="border-radius: 4px;height: 28px;line-height: 28px;background: #2dd6e7;color: #fff;padding: 3px;font-size: 16px">活跃</span>';
				break;
			case 1:
				return '&nbsp;&nbsp;<span class="status" style="border-radius: 4px;height: 28px;line-height: 28px;background: #e7c362;color: #fff;padding: 3px;font-size: 16px">休眠</span>';
				break;
			case 2:
				return '&nbsp;&nbsp;<span class="status" style="border-radius: 4px;height: 28px;line-height: 28px;background: #ef815b;color: #fff;padding: 3px;font-size: 16px">不正常</span>';
				break;
			case 3:
				return '&nbsp;&nbsp;<span class="status" style="border-radius: 4px;height: 28px;line-height: 28px;background: #ef815b;color: #fff;padding: 3px;font-size: 16px">休眠硬盘出错</span>';
				break;
			case 4:
				return '&nbsp;&nbsp;<span class="status" style="border-radius: 4px;height: 28px;line-height: 28px;background: #8592af;color: #fff;padding: 3px;font-size: 16px">未格式化</span>';
				break;
			case 5:
				return '&nbsp;&nbsp;<span class="status" style="border-radius: 4px;height: 28px;line-height: 28px;background: #8592af;color: #fff;padding: 3px;font-size: 16px">未链接状态(网络硬盘)</span>';
				break;
			case 6:
				return '&nbsp;&nbsp;<span class="status" style="border-radius: 4px;height: 28px;line-height: 28px;background: #3db828;color: #fff;padding: 3px;font-size: 16px">硬盘正在格式化</span>';
				break;
		}
	});
(ims.hddName = function (num) {
	if (num == null) {
		return '<span>无</span>';
	} else {
		return num;
	}
}),
	(ims.hardwareStatic = function (num) {
		switch (num) {
			case 0:
				return '&nbsp;&nbsp;<span class="status" style="border-radius: 4px;height: 28px;line-height: 28px;background: #3db828;color: #fff;padding: 3px;font-size: 16px">正常</span>';
				break;
			case 1:
				return '&nbsp;&nbsp;<span class="status" style="border-radius: 4px;height: 28px;line-height: 28px;background: #ef815b;color: #fff;padding: 3px;font-size: 16px">异常</span>';
				break;
		}
	});
//图片上传配置方法
ims.uploadimgFun = function () {
	$(' .fileinput').change(function () {
		const file = this.files[0];
		readFile(file, $(this).parent().siblings('.on'));
	});
	$('.on').mouseover(function () {
		$(this).children('.xian').show();
		$(this).children('.chahao').show();
	});
	$('.on').mouseleave(function () {
		$(this).children('.xian').hide();
		$(this).children('.chahao').hide();
	});
	$('.chahao').click(function () {
		$(this).next().remove();
		$('.xian').hide();
		$('.chahao').hide();
		$(this).parent().hide();
		$(this).parent().siblings('.addhao').show();
		$(this).parent().siblings('.addhao').children().val('');
		$('.on').find('img').remove();
	});
	var on = document.querySelector('.on');
	//    需要把阅读的文件传进来file element是把读取到的内容放入的容器
	function readFile(file, element) {
		//        新建阅读器
		const reader = new FileReader();
		//        根据文件类型选择阅读方式
		switch (file.type) {
			case 'image/jpg':
			case 'image/png':
			case 'image/jpeg':
			case 'image/gif':
				reader.readAsDataURL(file);
				break;
		}
		//        当文件阅读结束后执行的方法
		reader.addEventListener('load', function () {
			//         如果说让读取的文件显示的话 还是需要通过文件的类型创建不同的标签
			switch (file.type) {
				case 'image/jpg':
				case 'image/png':
				case 'image/jpeg':
				case 'image/gif':
					var img = document.createElement('img');
					img.src = reader.result;
					element.append(img);
					element.siblings('.addhao').hide();
					element.show();
					break;
			}
		});
	}

	var on = $('.on');
	$('.next').click(function () {
		for (let i = 0; i < 10; i++) {
			if (on[i].childNodes.length == 6) {
				//这个判断就是说明里面有多少个孩子，孩子不够数，不会生成相册
			} else {
				alert('上传照片不足3张');
				$('.next').attr('href', 'javascript:void(0)');
				return;
			}
			$('.next').attr('href', '生成相册.html');
		}
	});
};
//清除图片方法
(ims.removeImg = function () {
	$('.chahao').next().remove();
	$('.xian').hide();
	$('.chahao').hide();
	$('.chahao').parent().hide();
	$('.chahao').parent().siblings('.addhao').show();
	$('.chahao').parent().siblings('.addhao').children().val('');
	$('.on').find('img').remove();
}),
	//操作状态
	(ims.operationStatus = function (num) {
		switch (num) {
			case 1:
				return '<a href="javascript:;" class="videocheckRepair">报修</a>';
				break;
			case 2:
				return '<p class="" style="margin:0;display:inline-block;">处理中</p>';
				break;
			default:
				return '<p class="" style="margin:0;display:inline-block;">维修中</p>';
		}
	});

//检查项管理状态管理
(ims.checkStatus = function (num) {
	switch (num) {
		case 0:
			return '<input type="checkbox" >';
			break;
		case 1:
			return '<input type="checkbox" checked="checked">';
			break;
		default:
			return '未知';
	}
}),
	//延期审批结果
	(ims.getLocalTime = function (nS) {
		if (nS == null) {
			return;
		}
		const timestamp4 = new Date(nS);
		let dataMonth = timestamp4.getMonth() + 1;
		let dataData = timestamp4.getDate();
		if (dataMonth < 10) {
			dataMonth = '0' + dataMonth;
		}
		if (dataData < 10) {
			dataData = '0' + dataData;
		}
		return timestamp4.getFullYear() + '-' + dataMonth + '-' + dataData + ' ' + timestamp4.toTimeString().substr(0, 8);
	});
ims.getLocalDate = function (nS) {
	const timestamp4 = new Date(nS);
	return timestamp4.toLocaleDateString().replace(/\//g, '-');
};
ims.setMenuList = function (list) {
	ims.menulist = list;
};

ims.getMenuList = function () {
	return ims.menulist;
};
//时间戳转为时间
ims.getMyDate = function (str) {
	if (str == null) {
		return '';
	} else {
		const oDate = new Date(str),
			oYear = oDate.getFullYear(),
			oMonth = oDate.getMonth() + 1,
			oDay = oDate.getDate(),
			oHour = oDate.getHours(),
			oMin = oDate.getMinutes(),
			oSen = oDate.getSeconds(),
			oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay) + ' ' + getzf(oHour) + ':' + getzf(oMin) + ':' + getzf(oSen); //最后拼接时间
		return oTime;
	}
};
//   //补0操作
function getzf(num) {
	if (parseInt(num) < 10) {
		num = '0' + num;
	}
	return num;
}


//判断是否在线
ims.isOnline = function (num) {
	switch (num) {
		case 1:
			return '<span>在线</span>';
			break;
		case 0:
			return '<span>离线</span>';
			break;
		default:
			return '未知';
	}
};
/*解决ie8下new Data()无效问题*/
ims.parseDate = function (dateStr) {
	const isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/; //正则
	const date = new Date(NaN);
	const parts = isoExp.exec(dateStr); //正则验证
	if (parts) {
		const month = Number(parts[2]);
		//设置时间
		date.setFullYear(parts[1], month - 1, parts[3]);
		//判断是否正确
		if (month != date.getMonth() + 1) {
			date.setTime(NaN);
		}
	}
	return date;
};

/* 默认时间*/
ims.getBeginTime = function (day) {
	const today = new Date();
	let dataMonth = today.getMonth() + 1;
	let dataData = today.getDate();
	if (dataMonth < 10) {
		dataMonth = '0' + dataMonth;
	}
	if (dataData < 10) {
		dataData = '0' + dataData;
	}
	const beginTime = today.getFullYear() + '-' + dataMonth + '-' + dataData + ' 00:00:00';
	return beginTime;
};
//获取前一天
ims.getExTime = function (day) {
	const today = new Date();
	let dataMonth = today.getMonth() + 1;
	let dataData = today.getDate() - 1;

	if (dataMonth < 10) {
		dataMonth = '0' + dataMonth;
	}
	if (dataData < 10) {
		dataData = '0' + dataData;
	}
	const beginTime = today.getFullYear() + '-' + dataMonth + '-' + dataData + ' 00:00:00';
	return beginTime;
};
ims.getEndTime = function () {
	const today = new Date();
	let dataMonth = today.getMonth() + 1;
	let dataData = today.getDate();
	if (dataMonth < 10) {
		dataMonth = '0' + dataMonth;
	}
	if (dataData < 10) {
		dataData = '0' + dataData;
	}
	const endTime = today.getFullYear() + '-' + dataMonth + '-' + dataData + ' 23:59:59';
	return endTime;
};
//获取当前时间的前一天
ims.yesterdaybeginTime = function () {
	const d = new Date();
	d.setTime(d.getTime() - 24 * 60 * 60 * 1000);
	const s = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + '  00:00:00';
	return s;
};
ims.yesterdayendTime = function () {
	const d = new Date();
	d.setTime(d.getTime() - 24 * 60 * 60 * 1000);
	const s = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + '  23:59:59';
	return s;
};

ims.sessionOutHandle = function (response) {
	if (response.retCode == 399) {
		// alert(response.descInfo);
		window.location.href = '';
	}
};

//模糊匹配，号牌号码模糊匹配规则:“?”模糊匹配一个任意字符，“*”模糊匹配一个或多个任意字符，输入“未识别”匹配未识别的号牌记录
(ims.plateNoChange = function (val) {
	const brandId = $('#' + val).val();
	if (brandId.length != 0) {
		if (brandId.search(/^[^A-Za-z0-9\*\?]/) == 0) {
			if (brandId.search(/\*/) < 0 && brandId.length < 7) {
				$('#' + val).val(brandId + '*');
			}
		} else {
			// 非汉字开头
			const starPos = brandId.search(/[\*]/);
			if (starPos < 0 && brandId.length < 6) {
				$('#' + val).val('*' + brandId + '*');
			} else if (starPos != 0) {
				$('#' + val).val('*' + brandId);
			}
		}
	}
}),
	//base64编码
	(ims.Base64 = function () {
		// private property
		const _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

		// public method for encoding
		this.encode = function (input) {
			let output = '';
			let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			let i = 0;
			input = _utf8_encode(input);
			while (i < input.length) {
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}
				output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
			}
			return output;
		};

		// public method for decoding
		this.decode = function (input) {
			let output = '';
			let chr1, chr2, chr3;
			let enc1, enc2, enc3, enc4;
			let i = 0;
			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
			while (i < input.length) {
				enc1 = _keyStr.indexOf(input.charAt(i++));
				enc2 = _keyStr.indexOf(input.charAt(i++));
				enc3 = _keyStr.indexOf(input.charAt(i++));
				enc4 = _keyStr.indexOf(input.charAt(i++));
				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;
				output = output + String.fromCharCode(chr1);
				if (enc3 != 64) {
					output = output + String.fromCharCode(chr2);
				}
				if (enc4 != 64) {
					output = output + String.fromCharCode(chr3);
				}
			}
			output = _utf8_decode(output);
			return output;
		};

		// private method for UTF-8 encoding
		var _utf8_encode = function (string) {
			string = string.replace(/\r\n/g, '\n');
			let utftext = '';
			for (let n = 0; n < string.length; n++) {
				const c = string.charCodeAt(n);
				if (c < 128) {
					utftext += String.fromCharCode(c);
				} else if (c > 127 && c < 2048) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				} else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
			}
			return utftext;
		};

		// private method for UTF-8 decoding
		var _utf8_decode = function (utftext) {
			let string = '';
			let i = 0;
			let c = 0;
			const c1 = 0;
			let c2 = 0;
			let c3;
			while (i < utftext.length) {
				c = utftext.charCodeAt(i);
				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				} else if (c > 191 && c < 224) {
					c2 = utftext.charCodeAt(i + 1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				} else {
					c2 = utftext.charCodeAt(i + 1);
					c3 = utftext.charCodeAt(i + 2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
			return string;
		};
	});

/**
 * 放入一个键值对
 * @param {String} key
 * @param {Object} value
 */
ims.putToMap = function (key, value) {
	if (ims.data[key] == null) {
		ims.keys.push(key);
	}
	ims.data[key] = value;
};

/**
 * 获取某键对应的值
 * @param {String} key
 * @return {Object} value
 */
ims.getValueFromMap = function (key) {
	for (let i = 0; i < ims.keys.length; i++) {
		if (key == ims.keys[i]) {
			return ims.data[key];
		}
	}
	return null;
};

/**
 * 删除一个键值对
 * @param {String} key
 */
ims.remove = function (key) {
	let isDel = false;
	for (let i = 0; i < ims.keys.length; i++) {
		if (key == ims.keys[i]) {
			ims.keys[i] = null;
			ims.data[key] = null;
			isDel = true;
		}
		if (isDel) {
			ims.keys[i] = ims.keys[i + 1];
		}
	}

	if (isDel) {
		ims.keys.pop();
	}
};

//easyui插件部分
/*首次加载不验证input*/
ims.verify = function () {
	//    	 $('input.easyui-validatebox').validatebox('disableValidation')//////////
	//         .focus(function () { $(this).validatebox('enableValidation');})
	//         .blur(function () { $(this).validatebox('validate'); });
};

export default ims;
