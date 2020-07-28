<template>
	<div id="assetAddition" class="webs">
		<div class="slotHeader">添加资产</div>
		<div class="slotOptions">
			<div class="otherButtons">
				<!-- <el-button icon="el-icon-plus" type="success" @click="addClick">增加</el-button> -->
				<!-- <el-button icon="el-icon-delete" type="danger" @click="showDeleteDialog">删除</el-button> -->
				<!-- <el-button style="background-color: #2fa0ff; color: #fff;" @click="downloadTemplate">下载Excel模板</el-button> -->
				<el-button type="success" @click="exportAssets">导出资产</el-button>
				<el-button icon="el-icon-refresh-right" style="background-color: #2fa0ff; color: #fff;" @click="getAssetsList">刷新</el-button>
			</div>
		</div>
		<div class="slotMain">
			<div class="slotTables">
				<el-table border :data="tableData" style="width: 100%;" ref="multipleTable">
					<el-table-column align="center" type="selection" width="55"> </el-table-column>
					<el-table-column align="center" prop="fdName" label="设备名称"> </el-table-column>
					<el-table-column align="center" prop="depName" label="行政区域"> </el-table-column>
					<el-table-column align="center" prop="serialNo" label="序列号"> </el-table-column>
					<el-table-column align="center" prop="buyDate" label="采购时间">
						<template slot-scope="scope">
							<span>{{ scope.row.buyDate | formatDate }}</span>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="qualityDate" label="质保时间">
						<template slot-scope="scope">
							<span>{{ scope.row.qualityDate | formatDate }}</span>
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
		<assetAddDialog v-if="isAssetAddDialogShow" @closeDialog="closeDialog" :assetItem="assetItem" @updateAssets="updateAssets"></assetAddDialog>
	</div>
</template>
<script>
import { formatDate, download } from '@/utils/utils';
import assetAddDialog from '_c/asset/assetAddDialog.vue';
export default {
	name: 'assetAddition',
	components: { assetAddDialog },
	filters: {
		formatDate(time) {
			if (time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd');
			}
		},
	},
	data() {
		return {
			pageNav: {
				page: 1,
				pageSize: 25,
				total: 0,
			},
			tableData: [],
			isAssetAddDialogShow: false,
			assetItem: {},
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.getAssetsList();
		},
		//获取资产列表
		getAssetsList() {
			const params = Object.assign({}, this.pageNav);
			this.axios.getAssetsList(params).then((res) => {
				this.tableData = res.data.rows;
				this.pageNav.total = res.data.total;
			});
		},
		//删除
		showDeleteDialog() {
			const selectList = this.$refs.multipleTable.selection;
			if (selectList.length != 0) {
				this.$confirm('确认移除该资产嘛?', '提示', {
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(() => {
					this.deleteAssets();
				});
			} else {
				this.$message({
					message: '请选择要删除的资产',
					type: 'warning',
				});
			}
		},
		deleteAssets() {
			const selectList = this.$refs.multipleTable.selection;
			const arr = [];
			for (let i = 0; i < selectList.length; i++) {
				const el = selectList[i];
				arr.push(el.fdId);
			}
			const fdIds = arr.join(',');
			const params = Object.assign({
				fdIds: fdIds,
			});
			this.axios.deleteAssets(params).then((res) => {
				this.getAssetsList();
				this.$message({
					message: '删除成功',
					type: 'success',
				});
			});
		},
		//下载模板
		downloadTemplate() {
			let params = {};
			this.axios.exportExcelModel(params).then((res) => {
				const blob = new Blob([res.data]);
				download(blob, '资产模板.xls');
				this.$message({
					message: '下载成功',
					type: 'success',
				});
			});
		},
		//导出资产
		exportAssets() {
			let params = Object.assign({}, this.pageNav);
			this.axios.exportExcelAssets(params).then((res) => {
				const blob = new Blob([res.data]);
				download(blob, '资产数据.xls');
				this.$message({
					message: '下载成功',
					type: 'success',
				});
			});
		},
		//增加
		// addClick() {
		// 	this.isAssetAddDialogShow = true;
		// },
		//修改
		editClick(el) {
			this.isAssetAddDialogShow = true;
			this.assetItem = el;
		},
		updateAssets(form) {
			this.axios.updateAssets(form).then((res) => {
				this.$message({
					message: '修改成功',
					type: 'success',
				});
				this.getAssetsList();
			});
		},
		closeDialog() {
			this.isAssetAddDialogShow = false;
		},
		handleSizeChange(val) {
			this.pageNav.pageSize = val;
			this.getAssetsList();
		},
		handleCurrentChange(value) {
			this.pageNav.page = value;
			this.getAssetsList();
		},
	},
};
</script>
<style lang="less">
#assetAddition {
	.el-button {
		box-sizing: border-box;
		height: 28px;
		padding: 3px 12px;
	}
	.otherButtons {
		margin-left: 30px;
	}
}
</style>
