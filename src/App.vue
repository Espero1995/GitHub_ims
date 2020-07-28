<template>
	<div id="app">
		<router-view />
	</div>
</template>
<script>
export default {
	name: 'App',
	mounted() {
		this.removeLoading();
	},
	methods: {
		removeLoading() {
			const loading = document.querySelector('.loading-out');
			loading.style.display = 'none';
		},
	},
};
</script>
<style lang="less">
@import './App.less';
</style>
