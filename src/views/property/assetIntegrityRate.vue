<template>
	<div id="assetIntegrityRate" class="webs">
		<div class="slotHeader"><span style="cursor: pointer;" @click="backClick">资产管理</span> / 资产完好率</div>
		<div class="slotOptions">
			<div class="inputs">
				<span>设备名称: </span>
				<el-input v-model="search.fdName" placeholder="请输入设备名称"></el-input>
			</div>
			<div class="inputs">
				<span>序列号: </span>
				<el-input v-model="search.serialNo" placeholder="请输入序列号"></el-input>
			</div>
			<div class="buttons">
				<el-button icon="el-icon-upload" type="success" @click="exportAllData">导出</el-button>
				<el-button icon="el-icon-search" type="primary" @click="queryAssertIntergrityRate">查询</el-button>
				<el-button icon="el-icon-refresh-right" @click="resetsearch">重置</el-button>
			</div>
		</div>
		<div class="slotMain">
			<div class="slotTables">
				<el-table border :data="tableData" style="width: 100%;">
					<el-table-column align="center" prop="fdName" label="设备名称"> </el-table-column>
					<el-table-column align="center" prop="typeName" label="资产类型"> </el-table-column>
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
					<!-- <el-table-column align="center" label="维修记录">
						<template slot-scope="scope">
							<div>
								<el-button type="text" class="color_success" @click="repair(scope.$index, scope.row)">报修</el-button>
								<el-divider direction="vertical"></el-divider>
								<el-button type="text" @click="repairView(scope.$index, scope.row)">查看</el-button>
							</div>
						</template>
					</el-table-column>
					<el-table-column align="center" label="巡检记录">
						<template slot-scope="scope">
							<div>
								<el-button type="text" class="color_success" @click="inspectionAdd(scope.$index, scope.row)">新增</el-button>
								<el-divider direction="vertical"></el-divider>
								<el-button type="text" @click="inspectionView(scope.$index, scope.row)">查看</el-button>
							</div>
						</template>
					</el-table-column> -->
					<el-table-column align="center" label="操作">
						<template slot-scope="scope">
							<div>
								<el-button type="text" @click="detail(scope.$index, scope.row)">详情</el-button>
							</div>
						</template>
					</el-table-column>
					<!-- <el-table-column align="center" label="资产图片">
						<template slot-scope="scope">
							<div>
								<el-button type="text" @click="assertImgview(scope.$index, scope.row)">查看</el-button>
							</div>
						</template>
					</el-table-column> -->
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
		<assetDetailDialog v-if="isAssetDetailDialogShow" @closeDialog="closeDialog" :assetItem="assetItem"></assetDetailDialog>
	</div>
</template>
<script>
import mixinPages from '@/mixin/pages';
import { formatDate, download } from '@/utils/utils';
import assetDetailDialog from '_c/asset/assetDetailDialog.vue';
export default {
	name: 'assetIntegrityRate',
	components: {
		assetDetailDialog,
	},
	filters: {
		formatDate(time) {
			if (time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd');
			}
		},
	},
	mixins: [mixinPages],
	data() {
		return {
			search: {
				fdName: '',
				serialNo: '',
			},
			tableData: [],
			maintainStatus: 1, //1：正常；2：异常
			depId: '',
			isAssetDetailDialogShow: false,
			assetItem: {},
		};
	},
	watch: {
		'$route.query': {
			handler: function (value) {
				this.init();
			},
		},
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			if (this.$route.query && this.$route.query.maintainStatus) {
				this.maintainStatus = this.$route.query.maintainStatus;
			}
			if (this.$route.query && this.$route.query.depId) {
				this.depId = this.$route.query.depId;
			}
			this.queryAssertIntergrityRate();
		},
		queryAssertIntergrityRate() {
			//资产完好率
			const params = Object.assign({}, this.pageNav, this.search, {
				maintainStatus: this.maintainStatus,
				depId: this.depId,
			});
			this.axios.getAssetsList(params).then((res) => {
				this.tableData = res.data.rows;
				this.pageNav.total = res.data.total;
			});
		},
		repair(index, row) {
			//报修点击事件
		},
		repairView(index, row) {
			//维修的查看点击事件
		},
		inspectionAdd(index, row) {
			//巡检新增点击事件
		},
		inspectionView(index, row) {
			//巡检查看点击事件
		},
		detail(index, row) {
			//操作详情点击事件
			this.assetItem = row;
			this.isAssetDetailDialogShow = true;
		},
		closeDialog() {
			this.isAssetDetailDialogShow = false;
		},
		assertImgview(index, row) {
			//资产图片查看点击事件
		},
		exportAllData() {
			//导出所有
			if (this.tableData.length != 0) {
				const params = Object.assign({}, this.pageNav, this.search, {
					maintainStatus: this.maintainStatus,
					depId: this.depId,
				});
				this.axios.exportOkRateAssets(params).then((res) => {
					const blob = new Blob([res.data]);
					download(blob, '资产完好率.xls');
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
		resetsearch() {
			//重置
			this.search = Object.assign({}, this.$options.data().search);
			this.$message({
				message: '已重置',
			});
			this.queryAssertIntergrityRate();
		},
		backClick() {
			// this.$router.replace({ name: 'propertyManagement' });
			this.$router.replace(`property/propertyManagement`);
		},
		handleSizeChange(val) {
			this.pageNav.pageSize = val;
			this.queryAssertIntergrityRate();
		},
		handleCurrentChange(value) {
			this.pageNav.page = value;
			this.queryAssertIntergrityRate();
		},
	},
};
</script>
<style lang="less">
#assetIntegrityRate {
	width: 100%;
	height: 100%;
	position: relative;
	background-color: white;
}
</style>
