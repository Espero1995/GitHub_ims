import main from '@/views/main.vue';
import setting from './routes/setting';
const routes = [
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/login.vue'),
	},
	{
		path: '/',
		name: 'Main',
		redirect: '/homepage',
		component: () => import('@/views/main.vue'),
		children: [
			{
				path: 'homepage',
				name: 'homepage',
				component: () => import('@/views/homepage.vue'),
			},
			{
				path: 'monitor',
				name: 'monitor',
				redirect: '/monitor/monitorVideo',
				component: () => import('@/views/monitor/monitor.vue'),
				children: [
					{
						path: 'monitorVideo',
						name: 'monitorVideo',
						component: () => import(`@/views/monitor/monitorVideo.vue`),
					},
					{
						path: 'monitorLocation',
						name: 'monitorLocation',
						component: () => import(`@/views/monitor/monitorLocation.vue`),
					},
					{
						path: 'monitorPtz',
						name: 'monitorPtz',
						component: () => import(`@/views/monitor/monitorPtz.vue`),
					},
					{
						path: 'monitorDVRorNVR',
						name: 'monitorDVRorNVR',
						component: () => import(`@/views/monitor/monitorDVRorNVR.vue`),
					},
				],
			},
			{
				path: 'workOrder',
				name: 'workOrder',
				redirect: '/workOrder/waitingList',
				component: () => import('@/views/workOrder/workOrder.vue'),
				children: [
					{
						path: 'waitingList',
						name: 'waitingList',
						component: () => import('@/views/workOrder/waitingList.vue'),
					},
					{
						path: 'myworklist',
						name: 'myworklist',
						component: () => import('@/views/workOrder/myworklist.vue'),
					},
					{
						path: 'allworkorder',
						name: 'allworkorder',
						component: () => import('@/views/workOrder/allworkorder.vue'),
					},
				],
			},
			{
				path: 'alarm',
				name: 'alarm',
				redirect: '/alarm/videoAlarm',
				component: () => import('@/views/alarm/alarm.vue'),
				children: [
					{
						path: 'videoAlarm',
						name: 'videoAlarm',
						component: () => import('@/views/alarm/videoAlarm.vue'),
					},
					{
						path: 'netAlarm',
						name: 'netAlarm',
						component: () => import('@/views/alarm/netAlarm.vue'),
					},
					{
						path: 'serverAlarm',
						name: 'serverAlarm',
						component: () => import('@/views/alarm/serverAlarm.vue'),
					},
				],
			},
			{
				path: 'property',
				name: 'property',
				redirect: '/property/propertyManagement',
				component: () => import('@/views/property/property.vue'),
				children: [
					{
						path: 'propertyManagement',
						name: 'propertyManagement',
						component: () => import(`@/views/property/propertyManagement.vue`),
						children: [],
					},
					{
						path: 'applicationService',
						name: 'applicationService',
						component: () => import(`@/views/property/applicationService.vue`),
					},
				],
			},
			{
				path: 'setting',
				name: 'setting',
				redirect: '/setting/sceneManage',
				component: () => import(`@/views/setting/setting.vue`),
				children: [...setting],
			},
			{
				path: 'monitorRate',
				name: 'monitorRate',
				component: () => import(`@/views/monitor/monitorRate.vue`),
			},
			{
				path: 'assetIntegrityRate',
				name: 'assetIntegrityRate',
				component: () => import(`@/views/property/assetIntegrityRate.vue`),
			},
			{
				path: 'serviceOverFive',
				name: 'serviceOverFive',
				component: () => import(`@/views/property/serviceOverFive.vue`),
			},
			{
				path: 'serviceLife',
				name: 'serviceLife',
				component: () => import(`@/views/property/serviceLife.vue`),
			},
		],
	},
	{
		path: '/wlink',
		name: 'wlink',
		component: () => import('@/views/wlink.vue'),
		children: [
			{
				path: 'monitor',
				name: 'monitor',
				redirect: '/wlink/monitor/monitorVideo',
				component: () => import(`@/views/monitor/monitor.vue`),
				children: [
					{
						path: 'monitorVideo',
						name: 'monitorVideo',
						component: () => import(`@/views/monitor/monitorVideo.vue`),
					},
				],
			},
			{
				path: 'monitorRate',
				name: 'monitorRate',
				component: () => import(`@/views/monitor/monitorRate.vue`),
			},
			{
				path: 'alarm',
				name: 'alarm',
				redirect: '/wlink/alarm/videoAlarm',
				component: () => import(`@/views/alarm/alarm.vue`),
				children: [
					{
						path: 'videoAlarm',
						name: 'videoAlarm',
						component: () => import('@/views/alarm/videoAlarm.vue'),
					},
				],
			},
			{
				path: 'property',
				name: 'property',
				redirect: '/wlink/property/propertyManagement',
				component: () => import(`@/views/property/property.vue`),
				children: [
					{
						path: 'propertyManagement',
						name: 'propertyManagement',
						component: () => import(`@/views/property/propertyManagement.vue`),
					},
				],
			},
			{
				path: 'assetIntegrityRate',
				name: 'assetIntegrityRate',
				component: () => import(`@/views/property/assetIntegrityRate.vue`),
			},
			{
				path: 'serviceOverFive',
				name: 'serviceOverFive',
				component: () => import(`@/views/property/serviceOverFive.vue`),
			},
			{
				path: 'serviceLife',
				name: 'serviceLife',
				component: () => import(`@/views/property/serviceLife.vue`),
			},
			{
				path: 'setting',
				name: 'setting',
				redirect: '/wlink/setting/sceneManage',
				component: () => import(`@/views/setting/setting.vue`),
				children: [...setting],
			},
		],
	},
];
export default routes;
