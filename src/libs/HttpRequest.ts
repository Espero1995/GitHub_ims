import store from '@/store/index';
import router from '@/router/index';
import { Message } from 'element-ui';
import Qs from 'qs';
import { getUser } from '@/utils/utils';
import HttpRequest from 'axios';
let Urls = '';
if (!window.location.origin) {
	//兼容IE
	Urls = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
} else {
	Urls = window.location.origin;
}
const logInfoErrCode = { '-1': '错误', '1000': 'TOKEN已过期', '1001': '无权访问', '1002': '您的帐号在另一地点登录，您被迫下线' };
const axios = HttpRequest.create({
	baseURL: `${Urls}/ims`,
	timeout: 30000,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
	},
	paramsSerializer: function (params) {
		//JSON转URL序列化
		return Qs.stringify(params, { arrayFormat: 'brackets' });
	},
	transformRequest: function (data) {
		//JSON转formData
		if (data != undefined) {
			const formData = new FormData();
			Object.keys(data).forEach((key) => {
				formData.append(key, data[key]);
			});
			return formData;
		}
	},
});
// 添加发送拦截器
axios.interceptors.request.use(
	async function (config) {
		// 在发送请求之前做些什么
		const user = getUser();
		let userId = '';
		let isDeleteUserId = false; //不需要userId字段时，在参数中添加 设置为true；否则无需传值
		if (config.data) {
			userId = config.data.userId ? config.data.userId : user.userId;
			isDeleteUserId = config.data.isDeleteUserId;
		} else {
			userId = user.userId;
		}

		if (user) {
			if (config.method === 'get') {
				//get 时才带userId鉴权
				config.params = {
					userId: userId,
					timescape: +(+new Date()), //针对IE缓存问题 添加时间戳
					...config.params,
				};
			} else {
				config.params = {
					timescape: +(+new Date()), //针对IE缓存问题 添加时间戳
					...config.params,
				};
			}

			config.data = {
				userId: userId,
				...config.data,
			};
			if (isDeleteUserId) {
				delete config.params.userId;
				delete config.data.userId;
			}
			config.headers.Authorization = user.accessToken;
		}
		return config;
	},
	function (error) {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

// 添加响应拦截器;
axios.interceptors.response.use(
	function (response) {
		// 对响应数据做点什么
		const data = response.data;
		if (data.retCode === 200 || response.status === 200) {
			return response;
		} else if (response.request.responseURL.includes('login') || response.request.responseType == 'arraybuffer') {
			//登录,导出跳过
			return response;
		} else if (Object.keys(logInfoErrCode).includes(String(data.code))) {
			//未登录判断
			Message({
				showClose: true,
				message: data.msg,
				type: 'error',
			});
			setTimeout(() => {
				localStorage.clear();
				router.replace({
					name: 'login',
				});
			}, 500);
			return Promise.reject(data.msg);
		} else {
			//错误返回
			Message({
				showClose: true,
				message: data.msg,
				type: 'error',
			});
			return Promise.reject(response);
		}
	},
	function (error) {
		Message({
			showClose: true,
			message: '服务器连接异常',
			type: 'error',
		});
		// 对响应错误做点什么
		return Promise.reject(error);
	}
);

export default axios;
