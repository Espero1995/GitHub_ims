<template>
	<div id="alarm">
		<div class="left">
			<div class="menuTitle"><img src="@/assets/icon/list.png" /> 告警管理</div>
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
	name: 'alarm',
	data() {
		return {
			activeIndex: -1,
			menuList: [
				{
					title: '视频告警',
					index: 0,
					route: 'videoAlarm',
				},
				// {
				// 	title: '网络告警',
				// 	index: 1,
				// 	route: 'netAlarm',
				// },
				// {
				// 	title: '应用告警',
				// 	index: 2,
				// 	route: 'serverAlarm',
				// },
			],
		};
	},
	computed: {
		// isActiveIndex() {
		// 	return this.activeIndex;
		// },
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.activeIndex = -1;
			this.menuClick(this.menuList[0]);
		},
		menuClick(el) {
			if (this.activeIndex != el.index) {
				this.activeIndex = el.index;
				this.$router.replace(`${el.route}`);
			}

			/*
			const type = this.$route.query.type;
			console.log('el', el.title, '导航栏中的type:', type);
			if (parseInt(type) === el.index) {
				//
			} else if (this.activeIndex != el.index) {
				this.activeIndex = el.index;
				this.$router.replace({
					name: el.route,
					query: { type: el.index },
				});
			}
			*/
		},
	},
};
</script>

<style lang="less" scoped>
#alarm {
	width: 100%;
	height: 100%;
	display: flex;
}
</style>
