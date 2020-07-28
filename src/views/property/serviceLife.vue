<template>
	<div id="serviceLife" class="webs">
        <div class="slotHeader"><span style="cursor: pointer;" @click="backClick">资产管理</span> / 超过使用寿命(年)</div>
		<div class="slotOptions">
			<div class="inputs">
				<span>设备名称: </span>
				<el-input v-model="search.fdName" placeholder="请输入设备名称"></el-input>
			</div>
			<div class="buttons">
				<el-button icon="el-icon-upload" type="success" @click="exportAllData">导出</el-button>
				<el-button icon="el-icon-search" type="primary" @click="queryServiceLife">查询</el-button>
				<el-button icon="el-icon-refresh-right" @click="resetsearch">重置</el-button>
			</div>
		</div>
		<div class="slotMain">
			<div class="slotTables">
				<el-table border :data="tableData" style="width: 100%;">
					<el-table-column align="center" prop="fdName" label="设备名称"> </el-table-column>
					<el-table-column align="center" prop="typeName" label="资产类型"> </el-table-column>
                    <el-table-column align="center" prop="depName" label="行政区域"> </el-table-column>
                    <el-table-column align="center" prop="installDate" label="安装时间">
						<template slot-scope="scope">
							<span>{{ scope.row.installDate | formatDate }}</span>
						</template>
					</el-table-column>
                    <el-table-column align="center" prop="life" label="寿命(年)"> </el-table-column>
                    <el-table-column align="center" prop="status" label="状态">
                        <template slot-scope="scope">
                            <span class="color_danger" v-if="scope.row.status === 0"> 异常 </span>
							<span class="color_success" v-else> 正常 </span>
                        </template>
                    </el-table-column>
					<el-table-column align="center" prop="address" label="维修记录">
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
    </div>
</template>
<script>
import mixinPages from '@/mixin/pages';
import { formatDate, download } from '@/utils/utils';
export default {
	name: 'serviceLife',
	components: {},
	filters: {
		formatDate(time) {
			if (time){
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
			},
			tableData: [],
			overLife: 0, //0：正常；1：不正常
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
			if (this.$route.query && this.$route.query.overLife) {
				this.overLife = this.$route.query.overLife;
			}
			if (this.$route.query && this.$route.query.depId) {
				this.depId = this.$route.query.depId;
			}
			this.queryServiceLife();
		},
		queryServiceLife() {
			const params = Object.assign({}, this.pageNav, this.search, {
				overLife: this.overLife,
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
		exportAllData() {
			if (this.tableData.length != 0) {
				const params = Object.assign({}, this.pageNav, this.search, {
					overLife: this.overLife,
					depId: this.depId,
				});
				this.axios.exportOverLeftAssets(params).then((res) => {
					const blob = new Blob([res.data]);
					download(blob, '使用寿命.xls');
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
			this.queryServiceLife();
		},
		backClick() {
			// this.$router.replace({ name: 'propertyManagement' });
			this.$router.replace(`property/propertyManagement`);
		},
		handleSizeChange(val) {
			this.pageNav.pageSize = val;
			this.queryServiceLife();
		},
		handleCurrentChange(value) {
			this.pageNav.page = value;
			this.queryServiceLife();
		},
	},
};
</script>
<style lang="less">
#serviceLife {
	width: 100%;
	height: 100%;
	position: relative;
	background-color: white;
}
</style>
