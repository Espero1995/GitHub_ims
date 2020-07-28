<template>
	<div id="taskFind" class="webs">
		<div class="slotHeader">任务查询</div>
		<div class="slotOptions">
			<div class="inputs">
				<span>服务名称: </span>
				<el-input v-model="search.serverName" placeholder="请输入服务名称"></el-input>
				<span>任务名称: </span>
				<el-input v-model="search.taskName" placeholder="请输入任务名称"></el-input>
				<span>时间段: </span>
				<el-date-picker
					v-model="search.timeRange"
					@change="timeChange"
					size="mini"
					type="datetimerange"
					range-separator="--"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
				>
				</el-date-picker>
			</div>
			<div class="buttons">
				<el-button icon="el-icon-search" type="primary" @click="getData">查询</el-button>
			</div>
		</div>
		<div class="slotHeader">详细列表</div>
		<div class="slotMain">
			<div class="slotTables">
				<el-table border :data="tableData" style="width: 100%;">
					<el-table-column align="center" prop="serverName" label="服务名称"> </el-table-column>
					<el-table-column align="center" prop="taskName" label="任务名称"> </el-table-column>
					<el-table-column align="center" prop="taskType" label="任务类型">
						<template slot-scope="scope">
							<div>
								{{ $v.taskType(scope.row.taskType) }}
							</div>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="beginTime" label="开始时间">
						<template slot-scope="scope">
							<span>{{ scope.row.beginTime | formatDate }}</span>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="endTime" label="结束时间">
						<template slot-scope="scope">
							<span>{{ scope.row.endTime | formatDate }}</span>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="status" label="执行状态">
						<template slot-scope="scope">
							<div>
								{{ $v.taskStatus(scope.row.status) }}
							</div>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="checkVidiconNum" label="已检测通道数"> </el-table-column>
					<el-table-column align="center" prop="sumVidiconNum" label="总通道数"> </el-table-column>
					<el-table-column align="center" prop="progress" label="执行进度">
						<template slot-scope="scope">
							<div>
								<el-progress :text-inside="true" :stroke-width="24" :percentage="scope.row.progress" :color="customColorMethod"></el-progress>
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
import { formatDate } from '@/utils/utils';
export default {
	name: 'taskFind',
	components: {},
	filters: {
		formatDate(time) {
			if (time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
			}
		},
	},
	mixins: [mixinPages],
	data() {
		return {
			search: {
				timeRange: null,
				serverName: '',
				beginTime: '',
				endTime: '',
				taskName: '',
			},
			tableData: [],
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.getData();
		},
		timeChange(value) {
			if (value) {
				this.search.beginTime = this.$day(value[0]).format('YYYY-MM-DD HH:mm:ss');
				this.search.endTime = this.$day(value[1]).format('YYYY-MM-DD HH:mm:ss');
			} else {
				this.search.beginTime = '';
				this.search.endTime = '';
			}
		},
		getData() {
			//请在刺出获取数据
			const params = { ...this.search };
			params.page = this.pageNav.page;
			params.pageSize = this.pageNav.pageSize;
			this.axios.getVQTaskExePlanDetailList(params).then((res) => {
				const data = res.data.rows;
				this.tableData = data;
				this.pageNav.total = res.data.total;
			});
		},
		customColorMethod(percentage) {
			if (percentage < 30) {
				return '#909399';
			} else if (percentage < 70) {
				return '#e6a23c';
			} else {
				return '#67c23a';
			}
		},
	},
};
</script>
<style lang="less">
#taskFind {
}
</style>
