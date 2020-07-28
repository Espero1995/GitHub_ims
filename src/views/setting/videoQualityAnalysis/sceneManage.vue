<template>
	<div id="sceneManage" class="webs">
		<div class="slotHeader">场景管理</div>
		<div class="slotMain">
			<div class="slotLeft">
				<div class="slotOptions">
					<div class="inputs">
						<span>场景名称: </span>
						<el-input v-model="search.sceneName" placeholder="请输入场景名称"></el-input>
					</div>
					<div class="buttons">
						<el-button icon="el-icon-search" type="primary" @click="query">查询</el-button>
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
							<el-table-column align="center" prop="sceneName" label="场景名称"> </el-table-column>
							<el-table-column align="center" prop="description" label="任务描述"> </el-table-column>
							<el-table-column align="center" label="操作">
								<template slot-scope="scope">
									<div>
										<el-button type="text" @click="modification(scope.$index, scope.row)">修改</el-button>
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
				<div class="slotOptions">场景阈值设置:{{ tableRow.sceneName }}</div>
				<div class="slotOptions">
					<el-button class="button" @click="save">保存配置</el-button>
					<el-button class="button" type="success" @click="addTime">添加时间</el-button>
					<el-button class="button" type="danger" @click="delTime">合并时间</el-button>
				</div>
				<div class="slotOptions">
					<el-button
						class="button"
						v-for="time of sceneTimeRanges"
						:class="{ timeRangeActive: time === selectTimeRange }"
						:key="time[0]"
						@click="changeTime(time)"
						:autofocus="true"
						>{{ time[0] }}-{{ time[1] }}</el-button
					>
				</div>
				<div class="slotMain">
					<div class="thresholdList" v-for="list of lists" :key="list.title">
						<div class="title">{{ list.title }}</div>
						<div class="threshold"><thresholdSlider @change="changeThreshold($event, list)" :value="list.value"></thresholdSlider></div>
					</div>
				</div>
			</div>
		</div>
		<el-dialog title="场景名称" class="dialog" :visible.sync="addSceneDialog.show" :modal-append-to-body="false" width="30%">
			<el-form ref="form" :model="addSceneForm" label-width="80px">
				<el-form-item label="场景说明">
					<el-input v-model="addSceneForm.sceneName"></el-input>
				</el-form-item>
				<el-form-item label="任务描述"
					><el-input type="textarea" placeholder="请输入内容" v-model="addSceneForm.description"> </el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button class="focusButton" @click="handleAddSceneForm">提交</el-button>
				<el-button class="" @click="addSceneDialog.show = false">关闭</el-button>
			</span>
		</el-dialog>
		<el-dialog title="添加时间" class="dialog" :visible.sync="addSceneTime.show" :modal-append-to-body="false" width="30%">
			<el-form ref="form" :model="addSceneTimeForm" label-width="80px">
				<el-form-item label="添加时间">
					<el-select v-model="addSceneTimeForm.middle" placeholder="请选择">
						<el-option v-for="time in sceneTimeOtherRanges" :key="time" :label="time" :value="time"> </el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button class="focusButton" @click="handleAddSceneTimeForm">提交</el-button>
				<el-button class="" @click="addSceneTime.show = false">关闭</el-button>
			</span>
		</el-dialog>
		<el-dialog title="合并时间" class="dialog" :visible.sync="mergeSceneTime.show" :modal-append-to-body="false" width="30%">
			<el-form ref="form" :model="mergeSceneTimeForm" label-width="80px">
				<el-form-item label="合并时间">
					<el-select v-model="mergeSceneTimeForm.key" placeholder="请选择">
						<el-option v-for="time in sceneTimeInRanges" :key="time" :label="time" :value="time"> </el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button class="focusButton" @click="handleMergeSceneTimeForm">提交</el-button>
				<el-button class="" @click="mergeSceneTime.show = false">关闭</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import thresholdSlider from '_c/thresholdSlider';
import mixinPages from '@/mixin/pages';
function intConvTime(number) {
	return ('0' + number).slice(-2) + ':00';
}
export default {
	name: 'sceneManage',
	components: { thresholdSlider },
	mixins: [mixinPages],
	data() {
		return {
			search: {
				sceneName: '',
			},
			tableData: [],
			tableRow: {},
			sceneTimeList: [],
			selectTimeRange: [],
			lists: {
				noSignalV: {
					title: '视频信号',
					value: [0, 50, 70, 100],
				},
				fuzzyDegreeV: {
					title: '图像清晰',
					value: [0, 30, 70, 100],
				},
				contrastLevelV: {
					title: '图像对比度',
					value: [0, 30, 70, 100],
				},
				unusualDgreeColorV: {
					title: '图像色偏',
					value: [0, 30, 70, 100],
				},
				brightV: {
					title: '过亮异常程度',
					value: [0, 30, 70, 100],
				},
				unusualDgreeBlackV: {
					title: '过暗异常程度',
					value: [0, 30, 70, 100],
				},
				videoFreezeV: {
					title: '视频冻结',
					value: [0, 30, 70, 100],
				},
				lensAbnormalJitterV: {
					title: '画面抖动',
					value: [0, 30, 70, 100],
				},
			},
			addSceneForm: { sceneName: '', description: '' },
			addSceneDialog: {
				show: false,
				edit: false,
			},
			addSceneTimeForm: {
				middle: '',
				begin: '',
				end: '',
				sceneId: '',
			},
			addSceneTime: {
				show: false,
			},
			mergeSceneTimeForm: {
				key: '',
				point: '',
				sceneId: '',
			},
			mergeSceneTime: {
				show: false,
			},
		};
	},
	computed: {
		sceneTimeRanges() {
			const data = this.sceneTimeList;
			//排除首位
			if (data.length > 0) {
				let start = data[0];
				const ranges = [];
				for (let i = 1; i < data.length; i++) {
					const end = data[i];
					const startTime = intConvTime(start);
					const endTime = intConvTime(end);
					ranges.push([startTime, endTime]);
					start = end;
				}
				return ranges;
			} else {
				return [['00:00', '24:00']];
			}
		},
		sceneTimeOtherRanges() {
			const ranges = [];
			const data = this.sceneTimeList;
			for (let i = 1; i < 24; i++) {
				if (!data.includes(i)) {
					ranges.push(intConvTime(i));
				}
			}
			return ranges;
		},
		sceneTimeInRanges() {
			const data = this.sceneTimeList;
			const ranges = [];
			for (let i = 1; i < data.length - 1; i++) {
				ranges.push(intConvTime(data[i]));
			}
			return ranges;
		},
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.getData();
		},
		getData() {
			this.query();
		},
		add() {
			this.addSceneForm = this.$options.data().addSceneForm;
			this.addSceneDialog.edit = false;
			this.addSceneDialog.show = true;
		},
		modification(index, row) {
			this.addSceneDialog.edit = true;
			this.addSceneDialog.show = true;
			this.addSceneForm = { ...row };
		},
		//表格点击行触发
		handleClickRow(row) {
			this.tableRow = row;
			this.queryRow(row);
		},
		handleAddSceneForm() {
			if (!this.addSceneDialog.edit) {
				const params = { ...this.addSceneForm };
				this.axios.insertVQScene(params).then((res) => {
					this.$message.success('添加成功');
					this.addSceneDialog.show = false;
					this.addSceneForm = this.$options.data().addSceneForm;
					this.query();
				});
			} else {
				const params = { ...this.addSceneForm };
				this.axios.updateVQScene(params).then((res) => {
					this.$message.success('修改成功');
					this.addSceneDialog.show = false;
					this.addSceneForm = this.$options.data().addSceneForm;
					this.query();
				});
			}
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
					const sceneIds = selection.map((el) => el.sceneId).join(',');
					const params = { sceneIds };
					this.axios.deleteVQScene(params).then((res) => {
						this.$message.success('删除成功');
						this.query();
					});
				});
			} else {
				this.$message.info('请选择数据');
			}
		},
		handleMergeSceneTimeForm() {
			const params = { ...this.mergeSceneTimeForm };
			params.point = [...this.sceneTimeList].map((el) => ('0' + el).slice(-2));
			params.sceneId = this.tableRow.sceneId;
			this.axios.mergeTime(params).then((res) => {
				this.$message.success('合并时间成功');
				this.queryRow(this.tableRow);
				this.mergeSceneTime.show = false;
				this.mergeSceneTimeForm = this.$options.data().mergeSceneTimeForm;
			});
		},
		handleAddSceneTimeForm() {
			const timelist = [...this.sceneTimeList].sort((a, b) => a - b);
			const value = parseInt(this.addSceneTimeForm.middle.slice(0, 2));
			const max = timelist.find((el) => value < el);
			const min = timelist.reverse().find((el) => value > el);
			const params = { ...this.addSceneTimeForm };
			params.begin = intConvTime(min);
			params.end = intConvTime(max);
			params.sceneId = this.tableRow.sceneId;
			this.axios.insertTime(params).then((res) => {
				this.$message.success('添加时间成功');
				this.queryRow(this.tableRow);
				this.addSceneTime.show = false;
				this.addSceneTimeForm = this.$options.data().addSceneTimeForm;
			});
		},
		save() {
			// console.log(this.selectTimeRange);
			const params = {
				sceneId: this.tableRow.sceneId,
				timeBuckets: `${this.selectTimeRange[0]}-${this.selectTimeRange[1]}`,
			};
			Object.keys(this.lists).forEach((el) => {
				const value = this.lists[el].value;
				params[el] = [value[1], value[2]].join(',');
			});
			this.axios.insertVQSceneValueTable(params).then((res) => {
				this.$message.success('保存成功');
			});
		},
		changeTime(time) {
			this.selectTimeRange = time;
			this.queryRowData(this.tableRow, time);
		},
		changeThreshold(value, list) {
			list.value[1] = value[0].toString();
			list.value[2] = value[1].toString();
		},
		addTime() {
			this.addSceneTime.show = true;
		},
		delTime() {
			this.mergeSceneTime.show = true;
		},
		query() {
			const params = { ...this.search };
			params.page = this.pageNav.page;
			params.pageSize = this.pageNav.pageSize;
			this.axios.getVQSceneList(params).then((res) => {
				const data = res.data.rows;
				this.tableData = data;
				this.pageNav.total = res.data.total;
				if (data.length > 0) {
					this.handleClickRow(this.tableData[0]);
				}
			});
		},
		queryRow(row) {
			const params = { sceneId: row.sceneId };
			this.axios.queryTimePoint(params).then((res) => {
				const data = res.data.content;
				this.sceneTimeList = data;
				if (data.length > 0) {
					this.changeTime(this.sceneTimeRanges[0]);
				}
			});
		},
		queryRowData(row, time) {
			const params = { sceneId: row.sceneId, timeBuckets: time.join(',') };
			this.axios.getVQSceneValueTable(params).then((res) => {
				const data = res.data.rows[0];
				Object.keys(this.lists).forEach((key) => {
					this.lists[key].value = data[key].split(',');
				});
			});
		},
		selectRow({ row, index }) {
			if (row === this.tableRow) {
				return 'selectRows';
			} else {
				return '';
			}
		},
	},
};
</script>
<style lang="less">
#sceneManage {
	.selectRows {
		background-color: #ecf5ff;
	}
	.timeRangeActive {
		color: #409eff;
		border-color: #c6e2ff;
		background-color: #ecf5ff;
	}
	.slotMain {
		display: flex;
		flex-direction: row;
		.slotLeft {
			width: 760px;
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
			// background-color: blue;
			.slotMain {
				display: flex;
				flex-direction: column;
			}
		}
		.thresholdList {
			width: 100%;
			display: flex;
			align-items: center;
			padding-left: 30px;
			.title {
				width: 180px;
				font-size: 16px;
				line-height: 18px;
				height: 18px;
			}
		}
	}
}
</style>
