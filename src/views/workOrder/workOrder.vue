<template>
	<div id="workOrder">
		<div class="left">
			<div class="menuTitle"><img src="@/assets/icon/list.png" /> 工单处理</div>
			<menu-list :defaultIndex="0" :menu="menuList" @click="menuClick"></menu-list>
		</div>
		<div class="right">
			<div class="mainRouter">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'workOrder',
	data() {
		return {
			activeIndex: 0,
			topActiveIndex: 0,
			menuList: [
				{
					title: '待处理工单',
					route: 'waitingList',
				},
				{
					title: '我参与的工单',
					route: 'myworklist',
				},
				{
					title: '所有工单',
					route: 'allworkorder',
				},
			],
		};
	},
	computed: {},
	methods: {
		menuClick(el) {
			this.$router.push({ name: el.route });
		},
	},
};
</script>

<style lang="less" scoped>
#workOrder {
	width: 100%;
	height: 100%;
	display: flex;
}
</style>
