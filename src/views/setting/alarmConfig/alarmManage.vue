<template>
	<div id="alarmManage" class="webs">
		<div class="slotHeader">告警管理</div>
		<div class="slotOptions">
			<div class="inputs">
				<span>告警名称: </span>
				<el-input placeholder="请输入告警名称" v-model="search.alarmConfigName"></el-input>
			</div>
			<el-button icon="el-icon-search" type="primary" @click="getAlarmConfig">查询</el-button>
			<el-button icon="el-icon-refresh-right" @click="resetsearch">重置</el-button>

			<div class="otherButtons">
				<el-button type="success" @click="addClick">增加</el-button>
				<el-button type="danger" @click="showDeleteDialog">删除</el-button>
				<el-button style="background-color: #1971dc; color: #fff;" @click="startupClick">启用</el-button>
				<el-button type="danger" @click="deactivateClick">停用</el-button>
				<el-button style="background-color: #1971dc; color: #fff;" @click="alarmLinkClick">告警联动设置</el-button>
			</div>
		</div>
		<div class="slotMain">
			<div class="slotTables">
				<el-table border :data="tableData" style="width: 100%;" ref="multipleTable">
					<el-table-column align="center" type="selection" width="55"> </el-table-column>
					<el-table-column align="center" prop="alarmConfigName" label="告警名称"> </el-table-column>
					<el-table-column align="center" prop="fdId" label="设备ID"> </el-table-column>
					<el-table-column align="center" prop="channelId" label="通道ID"> </el-table-column>
					<el-table-column align="center" prop="alarmName" label="报警类型"> </el-table-column>
					<el-table-column align="center" prop="ineffect" label="是否启用">
						<template slot-scope="scope">
							<span v-if="parseInt(scope.row.ineffect) === 1" style="color: #67c23a;">启用</span>
							<span v-else style="color: #f56c6c;">停用</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="操作">
						<template slot-scope="scope">
							<el-button type="text" @click="editClick(scope.row)">修改</el-button>
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
		<alarmLinkDialog
			v-if="isAlarmLinkDialogShow"
			@closeDialog="closeAlarmLinkDialog"
			:alarmItem="alarmItem"
			:isResetView="isResetView"
			@updateNotifyConfig="updateNotifyConfig"
		></alarmLinkDialog>
		<alarmAddDialog
			v-if="isAlarmAddDialogShow"
			@closeDialog="closeAlarmAddDialog"
			@insertAlarmConfig="insertAlarmConfig"
			@updateAlarmConfig="updateAlarmConfig"
			:alarmConfigItem="alarmConfigItem"
		></alarmAddDialog>
	</div>
</template>
<script>
import alarmLinkDialog from '_c/alarmConfig/alarmLinkDialog.vue';
import alarmAddDialog from '_c/alarmConfig/alarmAddDialog.vue';
export default {
	name: 'alarmManage',
	components: {
		alarmLinkDialog,
		alarmAddDialog,
	},
	data() {
		return {
			search: {
				alarmConfigName: '',
			},
			pageNav: {
				page: 1,
				pageSize: 25,
				total: 0,
			},
			tableData: [],
			isAlarmLinkDialogShow: false,
			alarmItem: {},
			isResetView: false,

			isAlarmAddDialogShow: false,
			alarmConfigItem: {}, //编辑时传过去的告警对象
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.getAlarmConfig();
		},
		//查询告警消息
		getAlarmConfig() {
			const params = Object.assign({}, this.pageNav, this.search);
			this.axios.getAlarmConfig(params).then((res) => {
				this.tableData = res.data.rows;
				this.pageNav.total = res.data.total;
			});
		},
		//删除
		showDeleteDialog() {
			const selectList = this.$refs.multipleTable.selection;
			if (selectList.length != 0) {
				this.$confirm('确认删除?', '提示', {
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(() => {
					this.deleteAlarmConfig();
				});
			} else {
				this.$message({
					message: '请选择要删除的告警',
					type: 'warning',
				});
			}
		},
		deleteAlarmConfig() {
			const selectList = this.$refs.multipleTable.selection;
			const arr = [];
			for (let i = 0; i < selectList.length; i++) {
				const el = selectList[i];
				arr.push(el.alarmConfigId);
			}
			const alarmConfigIds = arr.join(';');
			const params = Object.assign({
				alarmConfigId: alarmConfigIds,
			});
			this.axios.deleteAlarmConfig(params).then((res) => {
				this.getAlarmConfig();
				this.$message({
					message: '删除成功',
					type: 'success',
				});
			});
		},
		//启用
		startupClick() {
			const alarmConfigIds = this.getSelectedAlarmIds('请选择要启用的告警');
			if (alarmConfigIds) {
				const params = Object.assign({
					alarmConfigId: alarmConfigIds,
					ineffect: 1,
				});
				this.axios.changeIneffect(params).then((res) => {
					this.getAlarmConfig();
					this.$message({
						message: '启用成功',
						type: 'success',
					});
				});
			}
		},
		//停用
		deactivateClick() {
			const alarmConfigIds = this.getSelectedAlarmIds('请选择要停用的告警');
			if (alarmConfigIds) {
				const params = Object.assign({
					alarmConfigId: alarmConfigIds,
					ineffect: 0,
				});
				this.axios.changeIneffect(params).then((res) => {
					this.getAlarmConfig();
					this.$message({
						message: '停用成功',
						type: 'success',
					});
				});
			}
		},
		//告警联动设置
		alarmLinkClick() {
			const selectList = this.$refs.multipleTable.selection;
			console.log('我没选择嘛？', selectList);
			if (selectList.length === 1) {
				this.isResetView = true;
				this.isAlarmLinkDialogShow = true;
				this.alarmItem = selectList[0];
			} else {
				this.$message({
					message: '请选择一条告警进行联动设置',
					type: 'warning',
				});
			}
		},
		//联动更新
		updateNotifyConfig(form) {
			this.axios.updateNotifyConfig(form).then((res) => {
				this.closeAlarmLinkDialog();
				this.getAlarmConfig();
				this.$message({
					message: '设置成功',
					type: 'success',
				});
			});
		},
		closeAlarmLinkDialog() {
			this.isResetView = false;
			this.$refs.multipleTable.clearSelection(); //清空table表单选择项
			this.isAlarmLinkDialogShow = false;
		},

		//获取选择的alarmId
		getSelectedAlarmIds(message) {
			const selectList = this.$refs.multipleTable.selection;
			if (selectList.length != 0) {
				const arr = [];
				for (let i = 0; i < selectList.length; i++) {
					const el = selectList[i];
					arr.push(el.alarmConfigId);
				}
				return arr.join(';');
			} else {
				this.$message({
					message: message,
					type: 'warning',
				});
				return 0;
			}
		},

		//添加
		addClick() {
			this.isAlarmAddDialogShow = true;
			this.alarmConfigItem = null;
		},
		//添加
		insertAlarmConfig(form) {
			this.axios.insertAlarmConfig(form).then((res) => {
				this.closeAlarmAddDialog();
				this.getAlarmConfig();
				this.$message({
					message: '添加成功',
					type: 'success',
				});
			});
		},
		//修改
		updateAlarmConfig(form, alarmConfigId) {
			form.alarmConfigId = alarmConfigId;
			this.axios.updateAlarmConfig(form).then((res) => {
				this.closeAlarmAddDialog();
				this.getAlarmConfig();
				this.$message({
					message: '修改成功',
					type: 'success',
				});
			});
		},
		closeAlarmAddDialog() {
			this.isAlarmAddDialogShow = false;
		},
		editClick(el) {
			this.isAlarmAddDialogShow = true;
			this.alarmConfigItem = el;
		},
		//重置
		resetsearch() {
			this.search = Object.assign({}, this.$options.data().search);
			this.$message({
				message: '已重置',
			});
			this.getAlarmConfig();
		},
		handleSizeChange(val) {
			this.pageNav.pageSize = val;
			this.getAlarmConfig();
		},
		handleCurrentChange(value) {
			this.pageNav.page = value;
			this.getAlarmConfig();
		},
	},
};
</script>
<style lang="less">
#alarmManage {
	.el-button {
		box-sizing: border-box;
		height: 28px;
		padding: 3px 12px;
	}
	.otherButtons {
		margin-left: 100px;
	}
}
</style>
