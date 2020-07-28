<template>
	<div id="property">
		<div class="left">
			<div class="menuTitle"><img src="@/assets/icon/list.png" /> 行政区域</div>
			<menu-list ref="menuListInit" :menu="menuList" @click="menuClick" :defaultIndex="0"></menu-list>
		</div>
		<div class="right">
			<ul class="topMenu">
				<li
					v-for="(menu, index) in topMenuList"
					class="item"
					:key="menu.title"
					:class="{ active: menu.router == $route.name }"
					@click="clickTopMenu(index)"
				>
					{{ menu.title }}
				</li>
			</ul>
			<div class="mainRouter">
				<router-view :depid="this.nodeItem.depid"></router-view>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'property',
	data() {
		return {
			menuList: [
				// {
				// 	childNum: 0,
				// 	customid: '',
				// 	dbcode: '',
				// 	depid: '0',
				// 	depname: '未分组',
				// 	fullpath: '',
				// 	memo: '',
				// 	nodeorder: '',
				// 	parentid: '',
				// },
			],
			topMenuList: [
				{
					title: '资产管理',
					value: 0,
					router: 'propertyManagement',
				},
				// {
				// 	title: '应用服务',
				// 	value: 1,
				// 	router: 'applicationService',
				// },
			],
			nodeItem: {},
		};
	},
	computed: {},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.getMonitorDepTree();
		},
		getMonitorDepTree() {
			this.axios.getMonitorDepTree().then((res) => {
				const menuLists = res.data.content;
				for (let i = 0; i < menuLists.length; i++) {
					const el = menuLists[i];
					el.title = menuLists[i].depname;
					el.key = menuLists[i].depid;
					this.menuList.push(el);
				}
				this.$refs.menuListInit.init();
			});
		},
		menuClick(el) {
			this.nodeItem = el;
		},
		clickTopMenu(index) {
			// this.$router.replace({
			// 	name: this.topMenuList[index].router,
			// 	query: { depid: this.nodeItem.depid },
			// });
		},
	},
};
</script>

<style lang="less" scoped>
#property {
	width: 100%;
	height: 100%;
	display: flex;

	.mainRouter {
		background-color: white;
	}
}
</style>
