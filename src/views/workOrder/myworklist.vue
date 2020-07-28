<template>
	<div id="myworklist" class="webs">
		<div class="slotHeader">我参与的工单</div>
		<div class="slotOptions">
			<div class="inputs">
				<span>工单名称: </span>
				<el-input v-model="serach.workOrderName" placeholder="请输入内容"></el-input>
			</div>
			<div class="buttons">
				<el-button icon="el-icon-search" type="primary">查询</el-button>
				<!-- <el-button   icon="el-icon-delete" type="danger">删除</el-button> -->
				<el-button icon="el-icon-upload" type="success">导出数据</el-button>
			</div>
		</div>
		<div class="slotMain">
			<div class="slotTables">
				<el-table border :data="tableData" style="width: 100%;">
					<el-table-column align="center" prop="workOrderName" label="工单名称"> </el-table-column>
					<el-table-column align="center" prop="fdName" label="资产名称"> </el-table-column>
					<el-table-column align="center" prop="depName" label="行政区域"> </el-table-column>
					<el-table-column align="center" prop="submitPersonName" label="报修人"> </el-table-column>
					<el-table-column align="center" prop="submitDate" label="报修日期"> </el-table-column>
					<el-table-column align="center" prop="dealStatus" label="处理状态">
						<template slot-scope="scope">
							<div>
								{{ $v.processState[scope.row.dealStatus] || '未知' }}
							</div>
						</template>
					</el-table-column>
					<el-table-column align="center" label="操作">
						<template slot-scope="scope">
							<div>
								<el-button type="text">详情</el-button>
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
	</div>
</template>
<script>
import mixinPages from '@/mixin/pages';
export default {
	name: 'myworklist',
	components: {},
	mixins: [mixinPages],
	data() {
		return {
			serach: {
				workOrderName: '',
			},
			tableData: [
				{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄',
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄',
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄',
				},
			],
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.getData();
		},
		getData() {
			//请在刺出获取数据
		},
	},
};
</script>
<style lang="less">
#myworklist {
}
</style>
