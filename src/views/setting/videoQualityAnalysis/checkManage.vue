<template>
	<div id="checkManage" class="webs">
		<div class="slotHeader">检查项管理</div>
		<div class="slotOptions">
			<div class="inputs">
				<span>检测名称: </span>
				<el-input v-model="search.checkName" placeholder="请输入检测名称"></el-input>
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
				<el-table ref="tableData" border :data="tableData" style="width: 100%;">
					<el-table-column type="selection" width="55" align="center"> </el-table-column>
					<el-table-column align="center" prop="checkName" label="检测名称"> </el-table-column>
					<el-table-column align="center" prop="checkSignal" label="信号缺失">
						<template slot-scope="scope">
							<div :class="switchClass(scope.row.checkSignal)">
								{{ switchInfo(scope.row.checkSignal) }}
							</div>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="checkColor" label="画面偏色">
						<template slot-scope="scope">
							<div :class="switchClass(scope.row.checkColor)">
								{{ switchInfo(scope.row.checkColor) }}
							</div>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="checkClarity" label="清晰度(对比度)">
						<template slot-scope="scope">
							<div :class="switchClass(scope.row.checkClarity)">
								{{ switchInfo(scope.row.checkClarity) }}
							</div>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="checkFreeze" label="画面冻结">
						<template slot-scope="scope">
							<div :class="switchClass(scope.row.checkFreeze)">
								{{ switchInfo(scope.row.checkFreeze) }}
							</div>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="checkBrightness" label="亮度">
						<template slot-scope="scope">
							<div :class="switchClass(scope.row.checkBrightness)">
								{{ switchInfo(scope.row.checkBrightness) }}
							</div>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="checkJitter" label="画面抖动">
						<template slot-scope="scope">
							<div :class="switchClass(scope.row.checkJitter)">
								{{ switchInfo(scope.row.checkJitter) }}
							</div>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="memo" label="描述"> </el-table-column>
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
					:current-page="pageNav.page"
					:page-sizes="pageNav.pageSizes"
					:page-size="pageNav.maxPage"
					layout="sizes, prev, pager, next,total, jumper"
					:total="pageNav.total"
				>
				</el-pagination>
			</div>
		</div>
		<el-dialog title="服务器信息" class="dialog" :visible.sync="checkDialog.show" :modal-append-to-body="false" width="30%">
			<el-form ref="form" :model="form" label-width="120px">
				<el-form-item label="服务器名称">
					<el-input v-model="form.checkName"></el-input>
				</el-form-item>
				<el-form-item label="检测项">
					<el-checkbox v-model="form.checkSignal" :true-label="1" :false-label="0">信号缺失</el-checkbox>
					<el-checkbox v-model="form.checkColor" :true-label="1" :false-label="0">画面偏色</el-checkbox>
					<el-checkbox v-model="form.checkClarity" :true-label="1" :false-label="0">清晰度(对比度)</el-checkbox>
					<el-checkbox v-model="form.checkFreeze" :true-label="1" :false-label="0">画面冻结</el-checkbox>
					<el-checkbox v-model="form.checkBrightness" :true-label="1" :false-label="0">亮度</el-checkbox>
					<el-checkbox v-model="form.checkJitter" :true-label="1" :false-label="0">画面抖动</el-checkbox>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" v-model="form.memo"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button class="focusButton" @click="handleForm">提交</el-button>
				<el-button class="" @click="checkDialog.show = false">关闭</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import { getUser } from '@/utils/utils';
import mixinPages from '@/mixin/pages';
export default {
	name: 'checkManage',
	components: {},
	mixins: [mixinPages],
	data() {
		return {
			search: {
				checkName: '',
			},
			tableData: [],
			checkDialog: {
				show: false,
				edit: false,
			},
			form: {
				checkName: '',
				checkSignal: 0,
				checkColor: 0,
				checkClarity: 0,
				checkFreeze: 0,
				checkBrightness: 0,
				checkJitter: 0,
				memo: '',
				modifier: '',
				creator: '',
			},
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.getData();
		},
		switchInfo(index) {
			return index ? '开启' : '关闭';
		},
		switchClass(index) {
			return index ? 'open' : 'close';
		},
		getData() {
			const params = { ...this.search };
			params.page = this.pageNav.page;
			params.pageSize = this.pageNav.pageSize;
			this.axios.getVQCheckItemsList(params).then((res) => {
				this.tableData = res.data.rows;
				this.pageNav.total = res.data.total;
			});
		},
		add() {
			this.form = { ...this.$options.data().form };
			this.checkDialog.edit = false;
			this.checkDialog.show = true;
		},
		modification(row) {
			this.form = { ...row };
			this.checkDialog.edit = true;
			this.checkDialog.show = true;
		},
		handleForm() {
			if (!this.checkDialog.edit) {
				const params = { ...this.form };
				params.modifier = getUser().userName;
				params.creator = getUser().userName;
				this.axios.insertVQCheckItems(params).then((res) => {
					if (res.data.retCode == '200') {
						this.$message.success('新建成功');
						this.getData();
						this.checkDialog.show = false;
					}
				});
			} else {
				const params = { ...this.form };
				params.modifier = getUser().userName;
				this.axios.updateVQCheckItems(params).then((res) => {
					if (res.data.retCode == '200') {
						this.$message.success('新建成功');
						this.getData();
						this.checkDialog.show = false;
					}
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
					const checkIds = selection.map((el) => el.checkId).join(',');
					const params = { checkIds };
					this.axios.deleteVQCheckItems(params).then((res) => {
						this.$message.success('删除成功');
						this.getData();
					});
				});
			} else {
				this.$message.info('请选择数据');
			}
		},
	},
};
</script>
<style lang="less">
#checkManage {
	.open {
		color: green;
	}
	.close {
		color: red;
	}
}
</style>
