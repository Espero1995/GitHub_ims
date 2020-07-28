import '@babel/polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import dayjs from 'dayjs';
import lodash from 'lodash';
import * as axios from '@/api/axios';
import echarts from 'echarts';
import md5 from 'md5';
import * as vars from '@/utils/vars';
import * as utils from '@/utils/utils';

/**自定义样式 */
import './main.less';
/**自定义组件 */
import menuList from '_c/menuList/index';
/**自定义方法 */
import ims from '@/utils/ims.js';

//声明文件
declare global {
	namespace NodeJS {
		interface Global {
			ims: any;
			echarts: any;
		}
	}
}

global.ims = ims;
global.echarts = echarts;

/**引入 */
Vue.use(ElementUI);
Vue.component('menu-list', menuList);
Vue.config.productionTip = false;

Vue.prototype._ = lodash;
Vue.prototype.axios = axios;
Vue.prototype.md5 = md5;
Vue.prototype.$e = echarts;
Vue.prototype.$day = dayjs;
Vue.prototype.$v = vars;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
