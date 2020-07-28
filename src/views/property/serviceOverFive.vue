<template>
	<div id="serviceOverFive" class="webs">
		<div class="slotHeader"><span style="cursor: pointer;" @click="backClick">资产管理</span> / 一年维修超过5次</div>
		<div class="slotOptions">
			<div class="inputs">
				<span>设备名称: </span>
				<el-input v-model="search.fdName" placeholder="请输入设备名称"></el-input>
			</div>
			<div class="buttons">
				<el-button icon="el-icon-upload" type="success" @click="exportAllData">导出</el-button>
				<el-button icon="el-icon-search" type="primary" @click="queryServiceOverFive">查询</el-button>
				<el-button icon="el-icon-refresh-right" @click="resetsearch">重置</el-button>
			</div>
		</div>
		<div class="slotMain">
			<div class="slotTables">
				<el-table border :data="tableData" style="width: 100%;">
					<el-table-column align="center" prop="fdName" label="设备名称"> </el-table-column>
					<el-table-column align="center" prop="typeName" label="资产类型"> </el-table-column>
					<el-table-column align="center" prop="depName" label="行政区域"> </el-table-column>
					<el-table-column align="center" prop="repairCount" label="维修次数"> </el-table-column>
					<el-table-column align="center" label="维修记录">
						<template slot-scope="scope">
							<div>
								<el-button type="text" class="color_success" @click="repair(scope.$index, scope.row)">报修</el-button>
								<el-divider direction="vertical"></el-divider>
								<el-button type="text" @click="repairView(scope.$index, scope.row)">查看</el-button>
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
	</div>
</template>
<script>
import mixinPages from '@/mixin/pages';
import { download } from '@/utils/utils';
export default {
	name: 'serviceOverFive',
	components: {},
	mixins: [mixinPages],
	data() {
		return {
			search: {
				fdName: '',
			},
			tableData: [],
			isFrqRepair: 0, //0：没超过5；1：超过5
			depId: '',
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
			if (this.$route.query && this.$route.query.isFrqRepair) {
				this.isFrqRepair = this.$route.query.isFrqRepair;
			}
			if (this.$route.query && this.$route.query.depId) {
				this.depId = this.$route.query.depId;
			}
			this.queryServiceOverFive();
		},
		queryServiceOverFive() {
			//一年维修超过5次查询
			const params = Object.assign({}, this.pageNav, this.search, {
				isFrqRepair: this.isFrqRepair,
				depId: this.depId,
			});
			this.axios.getFrqRepairAssetsList(params).then((res) => {
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
		exportAllData() {
			//导出所有
			if (this.tableData.length != 0) {
				let nowDate = new Date();
				let date = {
					year: nowDate.getFullYear(),
				};
				const params = Object.assign({}, this.pageNav, this.search, {
					isFrqRepair: this.isFrqRepair,
					depId: this.depId,
					year: date.year,
				});
				this.axios.exportFrqRepairAssets(params).then((res) => {
					const blob = new Blob([res.data]);
					download(blob, '维修超过5次记录.xls');
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
			this.queryServiceOverFive();
		},
		backClick() {
			// this.$router.replace({ name: 'propertyManagement' });
			this.$router.replace(`property/propertyManagement`);
		},
		handleSizeChange(val) {
			this.pageNav.pageSize = val;
			this.queryServiceOverFive();
		},
		handleCurrentChange(value) {
			this.pageNav.page = value;
			this.queryServiceOverFive();
		},
	},
};
</script>
<style lang="less">
#serviceOverFive {
	width: 100%;
	height: 100%;
	position: relative;
	background-color: white;
}
</style>
