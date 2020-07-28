<template>
	<div id="taskManage" class="webs">
		<div class="slotHeader">任务管理</div>
		<div class="slotMain">
			<div class="slotLeft">
				<div class="slotOptions">
					<div class="inputs">
						<span>任务名称: </span>
						<el-input v-model="search.taskName" placeholder="请输入任务名称"></el-input>
					</div>
					<div class="buttons">
						<el-button icon="el-icon-search" type="primary" @click="getData">查询</el-button>
					</div>
				</div>
				<div class="slotHeader">详细列表</div>
				<div class="slotOptions">
					<el-button class="button" icon="el-icon-plus" type="success" @click="add">添加</el-button>
					<el-button class="button" icon="el-icon-delete" type="danger" @click="del">删除</el-button>
				</div>
				<div class="slotMain">
					<div class="slotTables">
						<el-table border ref="tableData" :data="tableData" style="height: 100%;" :row-class-name="selectRow" @row-click="handleClickRow">
							<el-table-column type="selection" width="55" align="center"> </el-table-column>
							<el-table-column align="center" prop="taskName" label="任务名称"> </el-table-column>
							<el-table-column align="center" prop="priority" width="65" label="优先级">
								<template slot-scope="scope">
									<div>
										{{ $v.taskPriority(scope.row.priority) }}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="taskType" label="任务类型">
								<template slot-scope="scope">
									<div>
										{{ $v.taskType(scope.row.taskType) }}
									</div>
								</template>
							</el-table-column>
							<!-- <el-table-column align="center" prop="checkWay" width="95" label="检查方式">
								<template slot-scope="scope">
									<div>
										{{ $v.checkWay(scope.row.checkWay) }}
									</div>
								</template>
							</el-table-column> -->
							<el-table-column align="center" prop="sumVidiconNum" label="通道总数"> </el-table-column>
							<!-- <el-table-column align="center" prop="serverName" label="服务器"> </el-table-column> -->
							<el-table-column align="center" prop="sceneName" label="场景"> </el-table-column>
							<el-table-column align="center" prop="isUse" label="启用状态">
								<template slot-scope="scope">
									<div>
										{{ $v.serverState[scope.row.isUse] }}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="description" label="任务描述"> </el-table-column>
							<el-table-column align="center" label="操作">
								<template slot-scope="scope">
									<div>
										<el-button type="text" @click="modification(scope.row)">修改</el-button>
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
							:current-page="pageNav.pageNumber"
							:page-sizes="pageNav.pageSizes"
							:page-size="pageNav.maxPage"
							layout="sizes, prev, pager, next,total, jumper"
							:total="pageNav.total"
						>
						</el-pagination>
					</div>
				</div>
			</div>
			<div class="slotRight">
				<!-- @tab-click="handleClick" -->
				<el-tabs v-model="activeTabs" type="card">
					<el-tab-pane label="通道关联" name="first">
						<div class="slotOptions">
							<div class="inputs">
								<span>通道名称: </span>
								<el-input v-model="searchChannel.channelName" placeholder="请输入通道名称"></el-input>
							</div>
							<div class="buttons">
								<el-button icon="el-icon-search" type="primary" @click="queryChannel">查询</el-button>
							</div>
						</div>
						<div class="slotHeader">详细列表</div>
						<div class="slotOptions">
							<el-button class="button" icon="el-icon-plus" type="success" @click="addChannel">添加</el-button>
							<el-button class="button" icon="el-icon-delete" type="danger" @click="delChannel">删除</el-button>
							<el-button class="button" icon="el-icon-plus" type="success" @click="changeChannle(1)">启用检测</el-button>
							<el-button class="button" icon="el-icon-delete" type="danger" @click="changeChannle(0)">停用检测</el-button>
						</div>
						<div class="slotTables">
							<el-table border ref="tableChannelData" :data="tableChannelData" :row-class-name="selectRow">
								<el-table-column type="selection" width="55" align="center"> </el-table-column>
								<el-table-column align="center" prop="fdId" label="设备编号"> </el-table-column>
								<el-table-column align="center" prop="channelId" label="通道号"> </el-table-column>
								<el-table-column align="center" prop="channelName" label="通道名称"> </el-table-column>
								<el-table-column align="center" prop="isDetection" label="是否检测"
									><template slot-scope="scope">
										<div>
											{{ scope.row.isDetection == 1 ? '是' : '否' }}
										</div>
									</template>
								</el-table-column>
							</el-table>
						</div>
						<div class="slotPagination">
							<el-pagination
								background
								@size-change="handlePageNavChannelSizeChange"
								@current-change="handlPageNavChannelCurrentChange"
								:current-page="pageNavChannel.pageNumber"
								:page-sizes="pageNavChannel.pageSizes"
								:page-size="pageNavChannel.maxPage"
								layout="sizes, prev, pager, next,total, jumper"
								:total="pageNavChannel.total"
							>
							</el-pagination>
						</div>
					</el-tab-pane>
					<el-tab-pane label="计划设置" name="second">
						<div class="slotOptions">
							<el-button class="button" icon="el-icon-plus" type="success" @click="addPlan">添加</el-button>
							<el-button class="button" icon="el-icon-delete" type="danger" @click="delPlan">删除</el-button>
						</div>
						<div class="slotHeader">详细列表</div>
						<div class="slotTables">
							<el-table border ref="tablePlanData" :data="tablePlanData" :row-class-name="selectRow">
								<el-table-column type="selection" width="55" align="center"> </el-table-column>
								<el-table-column align="center" prop="beginExeTime" label="任务开始时间"> </el-table-column>
								<el-table-column align="center" prop="beginTime" label="最近任务开始时间"> </el-table-column>
								<el-table-column align="center" prop="endTime" label="最近任务结束时间"> </el-table-column>
								<el-table-column align="center" prop="currStatus" label="当前状态">
									<template slot-scope="scope">
										<div>
											{{ $v.taskStatus(scope.row.currStatus) }}
										</div>
									</template>
								</el-table-column>
								<el-table-column align="center" prop="opertaor" label="操作">
									<template slot-scope="scope">
										<div>
											<el-button type="text" @click="PlanModification(scope.row)">修改</el-button>
										</div>
									</template>
								</el-table-column>
							</el-table>
						</div>
						<div class="slotPagination">
							<el-pagination
								background
								@size-change="handlePageNavPlanSizeChange"
								@current-change="handlPageNavPlanCurrentChange"
								:current-page="pageNavPlan.pageNumber"
								:page-sizes="pageNavPlan.pageSizes"
								:page-size="pageNavPlan.maxPage"
								layout="sizes, prev, pager, next,total, jumper"
								:total="pageNavPlan.total"
							>
							</el-pagination>
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
		<el-dialog title="修改任务信息" class="dialog" width="750px" :visible.sync="addTaskDialog.show" :modal-append-to-body="false">
			<el-form :inline="true" ref="form" :model="form" class="form-inline">
				<el-form-item label="任务名称">
					<el-input v-model="form.taskName"></el-input>
				</el-form-item>
				<el-form-item label="优先级">
					<el-select v-model="form.priority" placeholder="请选优先级">
						<el-option
							v-for="priority of Object.keys($v.priority)"
							:key="priority"
							:label="$v.priority[priority]"
							:value="parseInt(priority)"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="任务类型">
					<el-select v-model="form.taskType" placeholder="请选优先级">
						<el-option :value="1" label="周期"></el-option>
						<el-option :value="3" label="循环"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="通道总数">
					<el-input v-model="form.sumVidiconNum" :disabled="true"></el-input>
				</el-form-item>
				<!-- <el-form-item label="服务器">
					<el-select v-model="form.serverId" placeholder="请选优先级">
						<el-option v-for="server of serverList" :key="server.serverId" :value="server.serverId" :label="server.serverName"></el-option>
					</el-select>
				</el-form-item> -->
				<!-- <el-form-item label="检查方式">
					<el-select v-model="form.checkWay" placeholder="请选优先级">
						<el-option :value="1" label="PTZ检查"></el-option>
						<el-option :value="0" label="视频质量检查"></el-option>
						<el-option :value="2" label="场景变换检测"></el-option>
					</el-select>
				</el-form-item> -->
				<el-form-item label="启用状态">
					<el-select v-model="form.isUse" placeholder="请选优先级">
						<el-option
							v-for="state of Object.keys($v.serverState)"
							:key="state"
							:label="$v.serverState[state]"
							:value="parseInt(state)"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="场景">
					<el-select v-model="form.sceneName" placeholder="请选优先级">
						<el-option v-for="scene of sceneList" :key="scene.sceneId" :value="scene.sceneId" :label="scene.sceneName"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="任务描述" class="textarea"
					><el-input type="textarea" placeholder="请输入内容" v-model="form.description"> </el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button class="focusButton" @click="handleForm">提交</el-button>
				<el-button class="" @click="addTaskDialog.show = false">关闭</el-button>
			</span>
		</el-dialog>
		<el-dialog title="计划设置" class="dialog" width="750px" :visible.sync="addPlanDialog.show" :modal-append-to-body="false">
			<el-form ref="form" :model="form" label-width="120px">
				<el-form-item label="开始执行时间">
					<el-time-picker v-model="planForm.beginExeTime" value-format="HH:mm:ss" placeholder="选择开始执行时间"> </el-time-picker>
				</el-form-item>
				<el-form-item label="检测名称" class="textarea">
					<el-select v-model="planForm.checkId" placeholder="请选择检查项">
						<el-option v-for="check of checkList" :key="check.checkId" :label="check.checkName" :value="check.checkId"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button class="focusButton" @click="handlePlanForm">提交</el-button>
				<el-button class="" @click="addPlanDialog.show = false">关闭</el-button>
			</span>
		</el-dialog>
		<el-dialog title="通道绑定" class="dialog dialogNoPadding" width="750px" :visible.sync="channelDialog.show" :modal-append-to-body="false">
			<channelTables v-if="channelDialog.show" ref="channelTables" class="channelTables" />
			<span slot="footer" class="dialog-footer">
				<el-button class="focusButton" @click="handleChannelForm">提交</el-button>
				<el-button class="" @click="channelDialog.show = false">关闭</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import mixinPages from '@/mixin/pages';
import { intConvTime } from '@/utils/utils';
import channelTables from '_c/channelTables';
export default {
	name: 'taskManage',
	components: { channelTables },
	mixins: [mixinPages],
	data() {
		return {
			search: {
				taskName: '',
			},
			searchChannel: {
				channelName: '',
			},
			tableData: [],
			tableRow: null,
			serverList: [],
			sceneList: [],
			activeTabs: 'first',
			addTaskDialog: {
				show: false,
				edit: false,
			},
			checkList: [],
			addPlanDialog: {
				show: false,
				edit: false,
			},
			channelDialog: {
				show: false,
				edit: false,
			},
			tableChannelData: [],
			tablePlanData: [],
			pageNavChannel: {
				pageSize: 25,
				page: 1,
				total: 0,
				pageSizes: [25, 50, 100, 200],
				maxPage: 25,
			},
			pageNavPlan: {
				pageSize: 25,
				page: 1,
				total: 0,
				pageSizes: [25, 50, 100, 200],
				maxPage: 25,
			},
			planForm: { checkId: '', taskId: '', beginExeTime: '' },
			form: {
				taskName: '',
				priority: '',
				taskType: '',
				checkWay: 0,
				sumVidiconNum: 0,
				// serverId: '',
				sceneName: '',
				isUse: '',
				description: '',
			},
		};
	},
	computed: {},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.getData();
			this.getServerList();
			this.getSceneList();
			this.queryCheckList();
		},
		handleClickRow(row) {
			this.tableRow = row;
			this.queryRow();
		},
		queryCheckList() {
			const params = {
				page: 1,
				pageSize: 200,
			};
			this.axios.getVQCheckItemsList(params).then((res) => {
				const data = res.data.rows;
				this.checkList = data;
			});
		},
		queryRow() {
			this.queryChannel();
			this.queryPlan();
		},
		queryChannel() {
			const taskId = this.tableRow.taskId;
			const params = {
				...this.searchChannel,
				taskId,
			};
			params.page = this.pageNavChannel.page;
			params.pageSize = this.pageNavChannel.pageSize;
			this.axios.getVQTaskLinkVideoInChList(params).then((res) => {
				const data = res.data.rows;
				this.tableChannelData = data;
				this.pageNavChannel.total = res.data.total;
			});
		},
		queryPlan() {
			const taskId = this.tableRow.taskId;
			const params = {
				taskId,
			};
			params.page = this.pageNavPlan.page;
			params.pageSize = this.pageNavPlan.pageSize;
			this.axios.getVQTaskPlanList(params).then((res) => {
				const data = res.data.rows;
				this.tablePlanData = data;
				this.pageNavPlan.total = res.data.total;
			});
		},
		getServerList() {
			const params = {};
			params.page = 1;
			params.pageSize = 200;
			this.axios.getVQServerList(params).then((res) => {
				this.serverList = res.data.rows;
			});
		},
		getSceneList() {
			const params = {};
			params.page = 1;
			params.pageSize = 200;
			this.axios.getVQSceneList(params).then((res) => {
				this.sceneList = res.data.rows;
			});
		},
		getData() {
			const params = { ...this.search };
			params.page = this.pageNav.page;
			params.pageSize = this.pageNav.pageSize;
			this.axios.getVQDetectionTaskList(params).then((res) => {
				const data = res.data.rows;
				this.tableData = data;
				this.pageNav.total = res.data.total;
				if (data.length > 0) {
					this.handleClickRow(this.tableData[0]);
				}
			});
		},
		del() {
			const selection = this.$refs.tableData.selection;
			if (selection.length > 0) {
				this.$confirm('此操作将永久删除, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					customClass: 'dialog',
					type: 'warning',
				}).then(() => {
					const taskIds = selection.map((el) => el.taskId).join(',');
					const params = { taskIds };
					this.axios.deleteVQDetectionTask(params).then((res) => {
						this.$message.success('删除成功');
						this.getData();
					});
				});
			} else {
				this.$message.info('请选择数据');
			}
		},
		add() {
			this.form = this.$options.data().form;
			this.addTaskDialog.edit = false;
			this.addTaskDialog.show = true;
		},
		changeChannle(index) {
			const selection = this.$refs.tableChannelData.selection;
			if (selection.length > 0) {
				this.$confirm('确认要修改状态吗, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					customClass: 'dialog',
					type: 'warning',
				}).then(() => {
					const linkVidiconIds = selection.map((el) => el.linkVidiconId);
					linkVidiconIds.forEach((linkVidiconId) => {
						const params = { linkVidiconId };
						params.isDetection = index;
						this.axios.updateVideoInChCheckState(params).then((res) => {
							this.$message.success('修改成功');
							this.queryChannel();
						});
					});
				});
			} else {
				this.$message.info('请选择数据');
			}
		},
		addChannel() {
			this.channelDialog.show = true;
		},
		delChannel() {
			const selection = this.$refs.tableChannelData.selection;
			if (selection.length > 0) {
				this.$confirm('此操作将永久删除, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					customClass: 'dialog',
					type: 'warning',
				}).then(() => {
					const linkVidiconId = selection.map((el) => el.linkVidiconId).join(';');
					const params = { linkVidiconId };
					this.axios.deleteVQTaskLinkVideoInCh(params).then((res) => {
						this.$message.success('删除成功');
						this.queryChannel();
					});
				});
			} else {
				this.$message.info('请选择数据');
			}
		},
		handleChannelForm() {
			const selection = this.$refs.channelTables.getSelection();
			const fdId = selection.map((el) => el.fdId).join(';');
			const channelId = selection.map((el) => el.channelId).join(';');
			const channelType = selection.map((el) => el.channelType).join(';');
			const params = {
				fdId,
				channelId,
				channelType,
			};
			params.taskId = this.tableRow.taskId;
			this.axios.insertVQTaskLinkVideoInCh(params).then((res) => {
				if (res.data.retCode == 200) {
					this.$message.success('添加成功');
				} else {
					this.$message.error('添加失败');
				}
				this.channelDialog.show = false;
				this.queryChannel();
			});
		},
		addPlan() {
			this.planForm = { ...this.$options.data().planForm };
			this.addPlanDialog.show = true;
			this.addPlanDialog.edit = false;
		},
		PlanModification(row) {
			this.planForm = { ...row };
			this.addPlanDialog.show = true;
			this.addPlanDialog.edit = true;
		},
		delPlan() {
			const selection = this.$refs.tablePlanData.selection;
			if (selection.length > 0) {
				this.$confirm('此操作将永久删除, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					customClass: 'dialog',
					type: 'warning',
				}).then(() => {
					const planIds = selection.map((el) => el.planId);
					planIds.forEach((planId) => {
						const params = { planId };
						this.axios.deleteVQTaskPlan(params).then((res) => {
							this.$message.success('删除成功');
							this.queryPlan();
						});
					});
				});
			} else {
				this.$message.info('请选择数据');
			}
		},
		handlePlanForm() {
			const params = { ...this.planForm };
			params.taskId = this.tableRow.taskId;
			this.axios.queryBeginExeTimeBy(params).then((res) => {
				if (res.data.content) {
					this.axios.insertVQTaskPlan(params).then((res) => {
						if (res.data.content) {
							this.$message.success('添加计划成功');
						} else {
							this.$message.error('添加计划失败');
						}
						this.queryPlan();
						this.addPlanDialog.show = false;
					});
				} else {
					this.$message.error('两小时以内已有任务');
				}
			});
		},
		modification(row) {
			this.form = { ...row };
			this.addTaskDialog.edit = true;
			this.addTaskDialog.show = true;
		},
		handleForm() {
			if (!this.addTaskDialog.edit) {
				const params = { ...this.form };
				this.axios.insertVQDetectionTask(params).then((res) => {
					this.$message.success('添加成功');
					this.getData();
					this.addTaskDialog.show = false;
				});
			} else {
				const params = { ...this.form };
				this.axios.updateVQDetectionTask(params).then((res) => {
					this.$message.success('修改成功');
					this.getData();
					this.addTaskDialog.show = false;
				});
			}
		},
		selectRow({ row, index }) {
			if (row === this.tableRow) {
				return 'selectRows';
			} else {
				return '';
			}
		},
		handlePageNavChannelSizeChange(val) {
			this.pageNavChannel.pageSize = val;
			this.queryChannel();
		},
		handlPageNavChannelCurrentChange(val) {
			this.pageNavChannel.page = val;
			this.queryChannel();
		},
		handlePageNavPlanSizeChange(val) {
			this.pageNavPlan.pageSize = val;
			this.queryPlan();
		},
		handlPageNavPlanCurrentChange(val) {
			this.pageNavPlan.page = val;
			this.queryPlan();
		},
	},
};
</script>
<style lang="less">
#taskManage {
	.selectRows {
		background-color: #ecf5ff;
	}
	.timeRangeActive {
		color: #409eff;
		border-color: #c6e2ff;
		background-color: #ecf5ff;
	}
	.channelTables {
		height: 560px;
		position: relative !important;
	}
	.slotMain {
		display: flex;
		flex-direction: row;
		.slotLeft {
			width: 920px;
			border-right: 1px solid #e8e8e8;
			display: flex;
			flex-direction: column;
			.slotMain {
				display: flex;
				flex-direction: column;
			}
		}
		.slotRight {
			flex: 1;
			display: flex;
			// background-color: blue;
			.slotMain {
				display: flex;
				flex-direction: column;
			}
			.el-tabs {
				flex: 1;
				display: flex;
				flex-direction: column;
				.el-tabs__content {
					flex: 1;
					.el-tab-pane {
						display: flex;
						flex-direction: column;
						height: 100%;
					}
				}
			}
		}
	}
}
</style>
