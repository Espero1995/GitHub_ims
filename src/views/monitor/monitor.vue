<template>
	<div id="monitorManager">
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
	name: 'monitorManager',
	data() {
		return {
			menuList: [
				{
					title: '全部',
					isRoot: true,
					children: [],
				},
			],
			topMenuList: [
				{
					title: '视频录像分析',
					value: 0,
					router: 'monitorVideo',
				},
				// {
				// 	title: '场景变换',
				// 	value: 1,
				// 	router: 'monitorLocation',
				// },
				// {
				// 	title: 'ptz质量分析',
				// 	value: 2,
				// 	router: 'monitorPtz',
				// },
				// {
				// 	title: 'DVR/NVR',
				// 	value: 3,
				// 	router: 'monitorDVRorNVR',
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
					this.menuList[0].children.push(el);
				}
				this.$refs.menuListInit.init();
			});
		},

		menuClick(el) {
			if (el.isRoot) {
				this.nodeItem = {
					depid: '-1',
				};
			} else {
				this.nodeItem = el;
			}
			// console.log('nodeItem:', this.nodeItem.depid);
		},
		// this.$router.push(`${el.route}`);
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
#monitorManager {
	width: 100%;
	height: 100%;
	display: flex;
}
</style>
