import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import Store from '@/store';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'hash',
	routes,
});

router.beforeEach((to, from, next) => {
	// ...
	next();
});
router.afterEach((to, from) => {
	// ...
});

export default router;
