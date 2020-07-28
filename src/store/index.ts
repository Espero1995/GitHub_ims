import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';

Vue.use(Vuex);

export default new Vuex.Store({
	state: { loading: false },
	getters: {
		loading: (state: any) => {
			return state.loading;
		},
	},
	mutations: {
		loading(state: any, res: Boolean) {
			state.loading = res;
		},
	},
	actions: {
		changeLoading: ({ commit }, data: Boolean) => {
			commit('loading', data);
		},
	},
	modules: {
		user,
	},
});
