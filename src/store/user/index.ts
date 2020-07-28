import router from '@/router/index';
import { getUser } from '@/utils/utils';

export default {
	state: {
		user: '',
	},
	getters: {
		user: (state: any) => {
			return state.user;
		},
	},
	mutations: {},
	actions: {
		SetUser: ({ commit }: any, user: string) => {
			commit('setUser', user);
		},
		getUser: ({}) => {
			const user = getUser();
			return user;
		},

		SaveUser: ({}, res: any) => {
			const user = JSON.stringify(res);
			localStorage.setItem('user', user);
		},
		LogInOut: () => {
			localStorage.clear();
			router.replace({
				name: 'login',
			});
		},
	},
	modules: {},
};
