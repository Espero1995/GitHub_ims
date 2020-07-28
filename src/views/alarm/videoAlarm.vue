<template>
	<div id="videoAlarm" class="webs">
		<div class="slotHeader">视频告警</div>
		<div class="slotOptions">
			<div class="inputs">
				<span>告警日期: </span>
				<el-date-picker
					v-model="timeDate"
					type="daterange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					value-format="yyyy-MM-dd HH:mm:ss"
					format="yyyy-MM-dd"
					:default-time="['00:00:00', '23:59:59']"
					size="small"
				>
				</el-date-picker>
				<span>处理状态: </span>
				<el-select v-model="search.maintainStatus" placeholder="请选择">
					<el-option v-for="dealItem in dealStatus" :key="dealItem.maintainStatus" :label="dealItem.title" :value="dealItem.maintainStatus">
					</el-option>
				</el-select>
				<span>告警名称: </span>
				<el-select v-model="search.alarmCode" placeholder="请选择">
					<el-option v-for="alarmItem in alarmCodeLists" :key="alarmItem.alarmCode" :label="alarmItem.alarmName" :value="alarmItem.alarmCode">
					</el-option>
				</el-select>
			</div>
			<div class="buttons">
				<el-button icon="el-icon-search" type="primary" @click="getAlarmLogList()">查询</el-button>
				<el-button icon="el-icon-refresh-right" @click="resetsearch">重置</el-button>
				<el-button icon="el-icon-delete" type="danger" @click="showDeleteAlertDialog">删除</el-button>
				<el-button icon="el-icon-upload" type="success" @click="downloadAlarmLog">导出</el-button>
			</div>
		</div>
		<div class="slotMain">
			<div class="slotTables">
				<el-table border :data="tableData" style="width: 100%;" ref="multipleTable">
					<el-table-column align="center" type="selection" width="55"> </el-table-column>
					<el-table-column align="center" prop="alarmName" label="告警名称"> </el-table-column>
					<el-table-column align="center" prop="ipAddress" label="告警IP地址"> </el-table-column>
					<el-table-column align="center" prop="fdName" label="设备名称"> </el-table-column>
					<el-table-column align="center" prop="depName" label="所属区域"> </el-table-column>
					<el-table-column align="center" prop="alarmTime" label="告警触发时间"> </el-table-column>
					<el-table-column align="center" label="操作">
						<template slot-scope="scope">
							<div v-if="scope.row.maintainStatus === 1">
								<el-button type="text" @click="repairClick(scope.row)">报修</el-button>
							</div>
							<div v-else>
								<span v-if="scope.row.maintainStatus === 2" style="color: #e6a23c;">维修中</span>
								<span v-else-if="scope.row.maintainStatus === 3" style="color: #67c23a;">已报修</span>
								<span v-else style="color: #909399;"> 误报 </span>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="slotPagination">
				<el-pagination
					background
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="pageNav.page"
					:page-sizes="[25, 50, 100, 200]"
					:page-size="pageNav.pageSize"
					layout="sizes, prev, pager, next,total, jumper"
					:total="pageNav.total"
				>
				</el-pagination>
			</div>
		</div>
		<repairDialog
			v-if="isRepairDialog"
			@closeDialog="closeDialog"
			@misReport="misReport"
			@handleSubmit="handleSubmit"
			@getAlarmLogList="getAlarmLogList"
			:alarmItem="alarmItem"
		></repairDialog>
	</div>
</template>
<script>
import mixinPages from '@/mixin/pages';
import { download } from '../../utils/utils';
import repairDialog from '_c/alarm/repairDialog.vue';
export default {
	name: 'videoAlarm',
	components: { repairDialog },
	mixins: [mixinPages],
	data() {
		return {
			search: {
				beginTime: '',
				endTime: '',
				maintainStatus: '',
				alarmCode: '',
			},
			pageNav: {
				page: 1,
				pageSize: 25,
				total: 0,
			},
			alarmCodeLists: [
				{
					alarmCode: 0,
					alarmName: '',
				},
			],
			dealStatus: [
				{
					maintainStatus: 0,
					title: '未处理',
				},
				{
					maintainStatus: 1,
					title: '已处理',
				},
			],
			tableData: [],
			timeDate: [],
			alarmType: 1, //告警类型
			isRepairDialog: false,
			alarmItem: {},
		};
	},
	watch: {
		timeDate(value) {
			if (value) {
				if (value.length > 0) {
					this.search.beginTime = value[0];
					this.search.endTime = value[1];
				} else {
					this.search.beginTime = '';
					this.search.endTime = '';
				}
			} else {
				this.search.beginTime = '';
				this.search.endTime = '';
			}
		},
	},
	mounted() {
		this.init();
	},
	activated() {
		// console.log('update');
	},
	methods: {
		init() {
			this.getData();
		},
		getData() {
			//请在此处获取数据
			this.getAlarmCode();
			this.getAlarmLogList();
		},
		//获取告警编码
		getAlarmCode() {
			const params = {
				type: this.alarmType,
			};
			this.axios.getAlarmCode(params).then((res) => {
				this.alarmCodeLists = res.data.content;
			});
		},
		//获取告警列表
		getAlarmLogList() {
			const params = Object.assign({}, this.pageNav, this.search, {
				type: this.alarmType,
			});

			this.axios.getAlarmLogList(params).then((res) => {
				this.tableData = res.data.rows;
				this.pageNav.total = res.data.total;
			});
		},
		//删除告警消息
		deleteAlarm() {
			const selectList = this.$refs.multipleTable.selection;
			console.log('selectList:', selectList);
			const arr = [];
			for (let i = 0; i < selectList.length; i++) {
				const el = selectList[i];
				arr.push(el.alarmId);
			}
			const alarmId = arr.join(';');
			const params = Object.assign({
				alarmId: alarmId,
			});
			this.axios.deleteAlarmLog(params).then((res) => {
				this.getAlarmLogList();
				this.$message({
					message: '删除成功',
					type: 'success',
				});
			});
		},
		showDeleteAlertDialog() {
			const selectList = this.$refs.multipleTable.selection;
			if (selectList.length != 0) {
				this.$confirm('确认要删除吗?', '提示', {
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(() => {
					this.deleteAlarm();
				});
			} else {
				this.$message({
					message: '请选择要删除的告警',
					type: 'warning',
				});
			}
		},
		//导出告警消息成xlsx
		downloadAlarmLog() {
			if (this.tableData.length != 0) {
				const params = Object.assign({}, this.pageNav, this.search, {
					type: this.alarmType,
				});
				this.axios.exportExcelAlarmLog(params).then((res) => {
					const blob = new Blob([res.data]);
					download(blob, '告警记录.xls');
					this.$message({
						message: '下载成功',
						type: 'success',
					});
				});
			} else {
				this.$message({
					message: '暂无可下载数据',
					type: 'error',
				});
			}
		},
		//报修
		repairClick(alarmItem) {
			this.isRepairDialog = true;
			this.alarmItem = alarmItem;
		},

		//误报
		misReport(alarmId) {
			const params = {
				alarmId: alarmId,
			};
			this.axios.misReport(params).then((res) => {
				this.getAlarmLogList();
				this.$message({
					message: '操作成功',
					type: 'success',
				});
			});
		},
		//提交报修
		handleSubmit(form) {
			this.axios.repairAlarm(form).then((res) => {
				this.$message({
					message: '上报成功',
					type: 'success',
				});
				this.getAlarmLogList();
			});
		},
		//关闭视图
		closeDialog() {
			this.isRepairDialog = false;
		},
		//重置
		resetsearch() {
			//重置搜索框
			this.timeDate = [];
			this.search = Object.assign({}, this.$options.data().search);
			this.$message({
				message: '已重置',
			});
			this.getAlarmLogList();
		},
		handleSizeChange(val) {
			this.pageNav.pageSize = val;
			this.getAlarmLogList();
		},
		handleCurrentChange(value) {
			//page换页操作
			this.pageNav.page = value;
			this.getAlarmLogList();
		},
	},
};
</script>
<style lang="less">
#videoAlarm {
}
</style>
