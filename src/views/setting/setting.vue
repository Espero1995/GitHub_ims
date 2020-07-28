<template>
	<div id="setting">
		<div class="left">
			<div class="menuTitle"><img src="@/assets/icon/list.png" /> 系统设置</div>
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
	name: 'setting',
	components: {},
	data() {
		return {
			menuList: [
				{
					title: '视频运维',
					img: require('@/assets/setting/videoQualityAnalysis_icon.png'),
					children: [
						{
							title: '场景管理',
							route: 'sceneManage',
						},
						// {
						// 	title: '服务管理',
						// 	route: 'servicemanager',
						// },
						{
							title: '检查项管理',
							route: 'checkManage',
						},
						{
							title: '任务管理',
							route: 'taskManage',
						},
						{
							title: '任务查询',
							route: 'taskFind',
						},
					],
				},
				{
					title: '资产管理员',
					img: require('@/assets/setting/userManage_icon.png'),
					children: [
						{
							title: '权限管理',
							route: 'rightManage',
						},
					],
				},
				{
					title: '资产配置',
					img: require('@/assets/setting/assetAllocation_icon.png'),
					children: [
						// {
						// 	title: '资产类型',
						// 	route: 'assetClass',
						// },
						{
							title: '资产管理',
							route: 'assetAddition',
						},
					],
				},
				{
					title: '告警配置',
					img: require('@/assets/setting/alarmConfig_icon.png'),
					children: [
						{
							title: '告警管理',
							route: 'alarmManage',
						},
					],
				},
			],
		};
	},
	computed: {},
	methods: {
		menuClick(el) {
			if (el.route) {
				// this.$router.push({ name: el.route });
				this.$router.push(`${el.route}`);
			}
		},
	},
};
</script>

<style lang="less" scoped>
#setting {
	width: 100%;
	height: 100%;
	display: flex;
}
</style>
