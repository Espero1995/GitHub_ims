export default [
	//视频质量分析：1.场景管理；2.服务管理；3.检查项管理；4.任务管理；5.任务查询
	{
		path: 'sceneManage',
		name: 'sceneManage',
		component: () => import('@/views/setting/videoQualityAnalysis/sceneManage.vue'),
	},
	// {
	// 	path: 'servicemanager',
	// 	name: 'servicemanager',
	// 	component: () => import('@/views/setting/videoQualityAnalysis/servicemanager.vue'),
	// },
	{
		path: 'checkManage',
		name: 'checkManage',
		component: () => import('@/views/setting/videoQualityAnalysis/checkManage.vue'),
	},
	{
		path: 'taskManage',
		name: 'taskManage',
		component: () => import('@/views/setting/videoQualityAnalysis/taskManage.vue'),
	},
	{
		path: 'taskFind',
		name: 'taskFind',
		component: () => import('@/views/setting/videoQualityAnalysis/taskFind.vue'),
	},
	//用户管理：1.权限管理
	{
		path: 'rightManage',
		name: 'rightManage',
		component: () => import('@/views/setting/userManage/rightManage.vue'),
	},
	//资产配置：1.资产类型；2.添加资产
	// {
	// 	path: 'assetClass',
	// 	name: 'assetClass',
	// 	component: () => import('@/views/setting/assetAllocation/assetClass.vue'),
	// },
	{
		path: 'assetAddition',
		name: 'assetAddition',
		component: () => import('@/views/setting/assetAllocation/assetAddition.vue'),
	},
	//告警配置：1.告警管理
	{
		path: 'alarmManage',
		name: 'alarmManage',
		component: () => import('@/views/setting/alarmConfig/alarmManage.vue'),
	},
];
