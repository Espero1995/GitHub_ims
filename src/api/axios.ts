import axios from '@/libs/HttpRequest';
const md5 = require('md5');

//全局调用
//？？？- 【接口已通，未实现】
export const onlyEthernetSwitch = () => axios.post(`/pc/ethernetSwitch/onlyEthernetSwitch`);
//未处理告警数 - 【接口已通，未实现】
export const unDealCount = () => axios.post(`/pc/alarm/unDealCount`);

//login（登录页）
export const LogInAPI = (params: any) => {
	//登录
	if (params.username || params.password) {
		const userinfo = {
			loginName: params.username,
			userPW: md5(params.password + '12ab'),
		};
		return axios.post(`/pc/userServices/checkUser`, userinfo);
	} else return false;
};
//获取版本号
export const getVersion = () => axios.post(`/pc/config/getVersion`);

//homepage（首页）

//monitor（监控管理）
//行政区域结点获取
export const getMonitorDepTree = () => axios.get(`/pc/dep/getDepTree`);

//VideoAlarm（告警管理）
//获取告警类型 1.视频告警；2.网络告警；3.应用告警;12.告警管理【添加告警获取告警类型时使用】
export const getAlarmCode = (params) => axios.post(`/pc/alarm/getAlarmCode`, params);
//获取告警消息列表
export const getAlarmLogList = (params) => axios.post(`/pc/alarm/getAlarmLogList`, params);
//删除报警
export const deleteAlarmLog = (params) => axios.post(`/pc/alarm/deleteAlarmLog`, params);
//导出数据
export const exportExcelAlarmLog = (params) =>
	axios.post(`/pc/alarm/exportExcelAlarmLog`, params, {
		responseType: 'arraybuffer',
	});
//获取审核人
export const getUserWithSubmitRight = (params) => axios.post(`/pc/userServices/getUserWithSubmitRight`, params);
//误报
export const misReport = (params) => axios.post(`/pc/alarm/misOperate`, params);
//提交报修
export const repairAlarm = (params) => axios.post(`/pc/alarm/repair`, params);

//资产管理
//资产完好率
export const assetOkRate = (params) => axios.post(`/pc/assets/okRate`, params);
//维修超过5次
export const repairRate = (params) => axios.post(`/pc/assets/repairRate`, params);
//超过使用寿命
export const overLife = (params) => axios.post(`/pc/assets/overLife`, params);
//资产完好率数据导出
export const exportOkRateAssets = (params) =>
	axios.post(`/pc/assets/exportOkRateAssets`, params, {
		responseType: 'arraybuffer',
	});
//维修超过5次查询
export const getFrqRepairAssetsList = (params) => axios.post(`/pc/assets/getFrqRepairAssetsList`, params);
//维修超过5次的导出
export const exportFrqRepairAssets = (params) =>
	axios.post(`/pc/assets/exportFrqRepairAssets`, params, {
		responseType: 'arraybuffer',
	});
//超过使用寿命导出
export const exportOverLeftAssets = (params) =>
	axios.post(`/pc/assets/exportOverLeftAssets`, params, {
		responseType: 'arraybuffer',
	});

//视频管理
interface exportExcelPtzc {
	beginTime: String;
	endTime: String;
	depId: String;
	ipAddress?: String;
	channelName?: String;
	isPtz?: String;
	pageSize: String;
	page: String;
}

export const exportExcelPtzc = (params: exportExcelPtzc) => axios.get(`/pc/video/exportExcelPtzc/`, { params }); //导出,暂留

interface getDayOkRate {
	depId: String;
	startDate: String;
	endDate: String;
}
/**
 * 
 * @param params 
 * 	okrate: String;//质量分析阈值,百分比
	normalCount: Number; //正常
	alarmCount: Number; //警告
	faultCount: Number; //异常
 */
export const getDayOkRate = (params: getDayOkRate) => axios.post('/pc/video/getDayOkRate', params); //获取视频质量分析

interface getWeekReport {
	depId: String;
	time: String;
	dayNum: String;
}
export const getWeekReport = (params: getWeekReport) => axios.post('/pc/video/getWeekReport', params); //获取日报表

interface getMonthReport {
	depId: String;
	year: Number;
}
export const getMonthReport = (params) => axios.post('/pc/video/getMonthReport', params); //获取月报表
export const getNewsVideoList = (params) => axios.post('/pc/video/getNewsVideoList', params);

export const repair = (params) => axios.post('/pc/video/repair', params); //报修

export const getUserWidthSubmitRight = (submitRight) => axios.post(`/pc/userServices/getUserWithSubmitRight`, { submitRight });

//设置
// 用户管理
// 获取用户信息
export const getMaintainUserRight = (params) => axios.post(`/pc/userServices/getMaintainUserRight`, params);
//删除用户信息
export const deleteMaintainUserRight = (params) => axios.post(`/pc/userServices/deleteMaintainUserRight`, params);
//添加用户
export const insertAppUser = (params) => axios.post(`/pc/userServices/insertAppUser`, params);
//判断用户名是否使用过
export const isUserRepeat = (params) => axios.post(`/pc/userServices/isUserRepeat`, params);
//修改用户信息
export const updateMaintainUserRight = (params) => axios.post(`/pc/userServices/updateMaintainUserRight`, params);

//告警管理
//查询告警管理
export const getAlarmConfig = (params) => axios.post(`/pc/AlarmConfig/getAlarmConfig`, params);
//删除告警
export const deleteAlarmConfig = (params) => axios.post(`/pc/AlarmConfig/deleteAlarmConfig`, params);
//启用 / 停用 告警
export const changeIneffect = (params) => axios.post(`/pc/AlarmConfig/changeIneffect`, params);
//告警联动设置
export const updateNotifyConfig = (params) => axios.post(`/pc/AlarmConfig/updateNotifyConfig`, params);
//添加告警
export const insertAlarmConfig = (params) => axios.post(`/pc/AlarmConfig/insertAlarmConfig`, params);
//修改告警
export const updateAlarmConfig = (params) => axios.post(`/pc/AlarmConfig/updateAlarmConfig`, params);
//选择设备通道
export const getAssets = (params) => axios.post(`/pc/assets/getAssets`, params);
export const getConfig = () => axios.get(`/pc/config/getConfig`);

//设置-质量分析-场景管理
export const getVQSceneList = (params) => axios.post(`/pc/VQScene/getVQSceneList`, params);

export const insertVQScene = (params) => axios.post(`/pc/VQScene/insertVQScene`, params); //添加场景
export const deleteVQScene = (params) => axios.post(`/pc/VQScene/deleteVQScene`, params); //删除场景
export const updateVQScene = (params) => axios.post(`/pc/VQScene/updateVQScene`, params); //更新场景
export const queryTimePoint = (params) => axios.post(`/pc/VQScene/queryTimePoint`, params); //获取一个场景的时间段,返回时间为小时,so不支持精细设定
interface getVQSceneValueTable {
	sceneId: string;
	timeBuckets: string; //时间段,例:00:00,19:00
}
export const getVQSceneValueTable = (params: getVQSceneValueTable) => axios.post(`/pc/VQScene/getVQSceneValueTable`, params); //获取时间段下的详细配置

interface insertTime {
	begin: string;
	end: string;
	middle: string;
	sceneId: string;
}
export const insertTime = (params: insertTime) => axios.post(`/pc/VQScene/insertTime`, params);
interface mergeTime {
	key: string;
	point: string;
	sceneId: string;
}
export const mergeTime = (params: mergeTime) => axios.post(`/pc/VQScene/mergeTime`, params);
export const insertVQSceneValueTable = (params) => axios.post(`/pc/VQScene/insertVQSceneValueTable`, params);

//质量分析-服务管理
export const getVQServerList = (params) => axios.post(`/pc/VQServer/getVQServerList`, params);
export const insertVQServer = (params) => axios.post(`/pc/VQServer/insertVQServer`, params);
export const updateVQServer = (params) => axios.post(`/pc/VQServer/updateVQServer`, params);
export const deleteVQServer = (params) => axios.post(`/pc/VQServer/deleteVQServer`, params);
export const updateIsUse = (params) => axios.post(`/pc/VQServer/updateIsUse`, params);

//资产配置-资产类型

//资产配置-添加资产
//资产查询
export const getAssetsList = (params) => axios.post(`/pc/assets/getAssetsList`, params);
//删除资产
export const deleteAssets = (params) => axios.post(`/pc/assets/deleteAssets`, params);
//下载模板
export const exportExcelModel = (params) =>
	axios.post(`/pc/assets/exportExcelModel`, params, {
		responseType: 'arraybuffer',
	});
//导出资产
export const exportExcelAssets = (params) =>
	axios.post(`/pc/assets/exportExcelAssets`, params, {
		responseType: 'arraybuffer',
	});
//查询资产类型
export const getAssetsType = () => axios.post(`/pc/assetsType/all`);
//修改资产信息
export const updateAssets = (params) => axios.post(`/pc/assets/updateAssets`, params);

export const getVQServerSelect = () => axios.post(`/pc/VQTaskManage/getVQServerSelect`); //查询空闲服务器

//质量分析-检查项管理
export const getVQCheckItemsList = (params) => axios.post(`/pc/VQCheckItems/getVQCheckItemsList`, params);
export const updateVQCheckItems = (params) => axios.post(`/pc/VQCheckItems/updateVQCheckItems`, params);
export const insertVQCheckItems = (params) => axios.post(`/pc/VQCheckItems/insertVQCheckItems`, params);
export const deleteVQCheckItems = (params) => axios.post(`/pc/VQCheckItems/deleteVQCheckItems`, params);

//质量分析-任务查询
export const getVQTaskExePlanDetailList = (params) => axios.post(`/pc/VQTaskExePlanDetail/getVQTaskExePlanDetailList`, params);

//质量分析-任务管理
export const getVQDetectionTaskList = (params) => axios.post(`/pc/VQTaskManage/getVQDetectionTaskList`, params);
export const deleteVQDetectionTask = (params) => axios.post(`/pc/VQTaskManage/deleteVQDetectionTask`, params);
export const insertVQDetectionTask = (params) => axios.post(`/pc/VQTaskManage/insertVQDetectionTask`, params);
export const updateVQDetectionTask = (params) => axios.post(`/pc/VQTaskManage/updateVQDetectionTask`, params);
// 查询关联通道
export const getVQTaskPlanList = (params) => axios.post(`/pc/VQTaskManage/getVQTaskPlanList`, params); //查询通道
export const getVQTaskLinkVideoInChList = (params) => axios.post(`/pc/VQTaskManage/getVQTaskLinkVideoInChList`, params); //查询计划设置
export const insertVQTaskPlan = (params) => axios.post(`/pc/VQTaskManage/insertVQTaskPlan`, params);
export const queryBeginExeTimeBy = (params) => axios.post(`/pc/VQTaskManage/queryBeginExeTimeBy`, params);
export const deleteVQTaskPlan = (params) => axios.post(`/pc/VQTaskManage/deleteVQTaskPlan`, params);
export const deleteVQTaskLinkVideoInCh = (params) => axios.post(`/pc/VQTaskManage/deleteVQTaskLinkVideoInCh`, params);
export const getVQTaskUnlinkVideoInChList = (params) => axios.post(`/pc/VQTaskManage/getVQTaskUnlinkVideoInChList`, params);
export const insertVQTaskLinkVideoInCh = (params) => axios.post(`/pc/VQTaskManage/insertVQTaskLinkVideoInCh`, params);
export const updateVideoInChCheckState = (params) => axios.post(`/pc/VQTaskManage/updateVideoInChCheckState`, params);
