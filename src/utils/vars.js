// 服务器处理状态
export const serverState = {
	0: '停用',
	1: '启用',
};

export const recordStatic = {
	0: '不录象',
	1: '录像',
};
export const signalStatic = {
	0: '正常',
	1: '信号丢失',
};

export const equipmentBig = {
	0: '收费系统设备',
	1: '监控系统设备',
	2: '通信系统设备',
};
export const priority = {
	1: '低',
	2: '中',
	3: '高',
	5: '最高',
};
export const statusList = [
	{ title: '全部', value: -1 },
	{ title: '异常', value: 0 },
	{ title: '视频丢失', value: 10 },
	{ title: '离线', value: 11 },
	{ title: '正常', value: 2 },
];
export const deviceType = [
	{ title: 'DVR', value: '1' },
	{ title: 'DVS', value: '2' },
	{ title: 'IP-摄像机', value: '3' },
	{ title: '解码器', value: '4' },
	{ title: 'NVR', value: '111' },
	{ title: '控制主机', value: '5' },
	{ title: '数采仪', value: '8' },
	{ title: '环保手工采集点', value: '9' },
	{ title: '矩阵代理', value: '10' },
	{ title: '门架式情报板', value: '15' },
	{ title: '悬臂式情报板', value: '16' },
	{ title: '立柱式情报板', value: '17' },
	{ title: '隧道内情报板', value: '18' },
];
// 设备大小类
export const PropertyType1 = ['收费系统设备', '监控系统设备', '通信系统设备'];
export const PropertyType2 = [
	['车道控制器', '高速栏杆机', '亭内摄像机'],
	['摄像头', '可变信息显示屏', '车流量监测器', '气象监测器'],
	['主干环网', '管道', '数字传输设备'],
];

// 资产类型
export const mapProperty1 = ['收费系统设施1', '监控系统设施1', '通信系统设施1', '其他1'];
export const mapProperty2 = [
	['MTC车道设施1', 'ETC车道设施1', '广场设备1', '站房设施1', '信息中心/监控分中心设施1'],
	['外场设施1', '信息中心/监控分中心设施1'],
	['站房设施1', '信息中心/监控分中心设施1', '通信光缆、管道1'],
	['隧道机电系统设施1', '配电系统设施1', '照明系统设施1'],
];
export const mapProperty3 = [
	//1
	[
		[
			'车道控制器1',
			'自动栏杆机1',
			'车道软件1',
			'显示器1',
			'收费键盘1',
			'读写器1',
			'车牌识别系统1',
			'车道摄像机1',
			'票据打印机1',
			'条码扫描机1',
			'字符叠加机1',
			'交通信号灯1',
			'费额显示器1',
			'手动栏杆1',
			'亭内摄像机1',
			'监听报警控制器1',
			'亭内基础设施1',
		],
		[
			'车道控制器1',
			'高速栏杆机1',
			'电子标签读写器1',
			'车道软件1',
			'车辆检测器1',
			'地感线圈1',
			'车别识别系统1',
			'匝道摄像机1',
			'字符叠加器1',
			'交通信号灯1',
			'费额显示器1',
			'监听报警控制器1',
			'亭内基础设施1',
		],
		['广场摄像机1'],
		['计算机网络设备1'],
		['核心数据库服务器1', '核心数据存储设备1', '核心交换机1', '存储设备1', '收费软件1', '各应用工作站1', '其他应用服务器1'],
	],
	//2
	[
		['道路摄像机1', '可变信息显示屏1', '气象监测器1', '车流量监测器1'],
		['监控服务器1', '存储设备1', '监控软件1', '图像监视器1', '电视墙1', '监控工作站1'],
	],
	//3
	[['节点传输设备1'], ['程控交换机1', '数字传输设备1', '通信电源1'], ['主干环网1', '管道1', '直线缆1']],
	//4
	[
		['通风1', '消防灭火1', '火灾报警1', '交通信号灯1', '交通控制系统1', '图像监控设备1'],
		['主干线缆1', 'UPS主机1', 'UPS电池1', '配电箱1', '配电柜1', '分支电缆1'],
		['天棚照明1', '广场照明1', '隧道照明1'],
	],
];
//处理状态
export const processState = {
	'': '全部',
	1: '待审核',
	2: '待修改',
	3: '已挂起',
	4: '待维修',
	5: '待延期',
	6: '待确认',
	7: '已关闭',
	8: '已结束',
};

//报修来源
export const sourceWarranty = function (num) {
	switch (num) {
		case 1:
			return '填报报修界面';
		case 2:
			return '报警界面';
		case 3:
			return '实时视频界面';
		case 4:
			return '视频质量界面';
		case 5:
			return '录像检查结果界面';
		case 6:
			return '服务状态界面';
		default:
			return '未知';
	}
};
//延期审批结果
export const postponeAuditResult = function (num) {
	switch (num) {
		case 1:
			return '通过';
		case 0:
			return '驳回';
		default:
			return '未知';
	}
};
//判断设备类型
export const topoEquipType = function (num) {
	switch (num) {
		case 1:
			return '普通硬盘录像机';
		case 2:
			return '高清硬盘录像机';
		case 3:
			return '视频服务器';
		case 4:
			return '普通监控相机';
		case 5:
			return '智能交通IPC';
		case 6:
			return '编码器';
		case 7:
			return '解码器';
		case 8:
			return '高清SDI复合码流光纤摄像机';
		case 9:
			return '高清网络相机';
		case 10:
			return '嵌入式智能终端';
		case 11:
			return '告警器';
		case 12:
			return '视频网络安全设备';
		case 13:
			return '视频综合管理平台';
		case 14:
			return '工业以太网交换机';
		case 15:
			return '万能解码器';
		default:
			return '未知类型';
	}
};
//判断节点类型
export const judegeisRoot = function (num) {
	switch (num) {
		case 0:
			return '普通节点';
		case 1:
			return '根节点';
		case 2:
			return '核心节点';
	}
};

export const alarmType = {
	'': '全部',
	1: '已处理',
	0: '未处理',
};
// 判断等待检测否在质量下降
export const resultStatus = (resultStatus) => {
	switch (resultStatus) {
		case 1:
			return '是';
		case 0:
			return '否';
		default:
			return '未知';
	}
};
// 判断是否在线
export const isOnline = (isOnline) => {
	switch (isOnline) {
		case 1:
			return '在线';
		case 0:
			return '离线';
		default:
			return '未知';
	}
};
// 判断播放是否失败
export const isPlayFailure = (isPlayFailure) => {
	switch (isPlayFailure) {
		case 1:
			return '成功';
		case 0:
			return '失败';
		default:
			return '未知';
	}
};
// 判断视频质量状态
export const videoState = (state) => {
	switch (state) {
		case 0:
			return '异常';
		case 2:
			return '正常';
		case 10:
			return '视频丢失';
		case 11:
			return '离线';
		default:
			return '未知';
	}
};
export const operationStatus = (operationStatus) => {
	switch (operationStatus) {
		case 1:
			return '报修';
		case 2:
			return '处理中';
		case 4:
			return '误报';
		default:
			return '已报修';
	}
};
//判断任务状态
export const taskType = (taskType) => {
	switch (taskType) {
		case 1:
			return '周期';
		case 3:
			return '循环';
		default:
			return '未知';
	}
};
//判断任务状态
export const taskStatus = (status) => {
	switch (status) {
		case 1:
			return '等待检测';
		case 2:
			return '正在检测';
		case 4:
			return '已完成';
		default:
			return '未知';
	}
};
//优先级
export const taskPriority = (priority) => {
	switch (priority) {
		case 1:
			return '低';
		case 2:
			return '中';
		case 3:
			return '高';
		case 5:
			return '最高';
		default:
			return '未知';
	}
};
//检查方式
export const checkWay = (checkWay) => {
	switch (checkWay) {
		case 1:
			return 'PTZ检查';
		case 0:
			return '视频质量检查';
		case 2:
			return '场景变换检测';
		default:
			return '未知';
	}
};
// 月份进行输出
export const month = {
	jan: '1月',
	feb: '2月',
	mar: '3月',
	apr: '4月',
	may: '5月',
	jun: '6月',
	jul: '7月',
	aug: '8月',
	sep: '9月',
	oct: '10月',
	nov: '11月',
	dec: '12月',
};
