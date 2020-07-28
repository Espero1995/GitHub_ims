import dayjs from 'dayjs';
export const getUser = () => {
	if (localStorage.getItem('user')) {
		const tmp = localStorage.getItem('user');
		if (tmp != null) {
			const Obj: any = JSON.parse(tmp);
			return Obj;
		}
	} else {
		return false;
	}
};

export const saveUser = (user: string) => {
	localStorage.setItem('user', user);
};

export const download = (blob: Blob, filename: string) => {
	const blobURL = window.URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = blobURL;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
	window.URL.revokeObjectURL(blobURL);
};

export const saveCookie = (key: string, value: any) => {
	if (typeof value == 'string') {
		window.sessionStorage.setItem(key, value);
	} else if (typeof value == 'object' || value.isArray()) {
		window.sessionStorage.setItem(key, JSON.stringify(value));
	} else {
		window.sessionStorage.setItem(key, value.toString());
	}
};
export const clearCookie = (key: string) => {
	window.sessionStorage.removeItem(key);
};
export const getCookie = (key: string) => {
	const value = window.sessionStorage.getItem(key);
	return value || null;
};
export const saveStore = (key: string, value: any) => {
	if (typeof value == 'string') {
		window.localStorage.setItem(key, value);
	} else if (typeof value == 'object' || value.isArray()) {
		window.localStorage.setItem(key, JSON.stringify(value));
	} else {
		window.localStorage.setItem(key, value.toString());
	}
};
export const clearStore = (key: string) => {
	window.localStorage.removeItem(key);
};
export const getStore = (key: string) => {
	const value = window.localStorage.getItem(key);
	return value || null;
};

export const fileToBase64 = (file: File) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function (e) {
			if (this.result !== null && typeof this.result == 'string') {
				const res = this.result.split(',');
				resolve(res);
			} else {
				resolve(this.result);
			}
		};
	});
};

export const dataConvTime = (data) => {
	let startDate = '';
	let endDate = '';
	if (data && data !== '') {
		const date = dayjs(data).format('YYYY-MM-DD');
		startDate = `${date} 00:00:00`;
		endDate = `${date} 23:59:59`;
	} else {
		const date = dayjs().format('YYYY-MM-DD');
		startDate = `${date} 00:00:00`;
		endDate = `${date} 23:59:59`;
	}
	return { startDate, endDate };
};

export const formatDate = (date, fmt) => {
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds(),
	};
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
		}
	}
	return fmt;
};

function padLeftZero(str) {
	return ('00' + str).substr(str.length);
}

export const intConvTime = (number) => {
	return ('0' + number).slice(-2) + ':00';
};
