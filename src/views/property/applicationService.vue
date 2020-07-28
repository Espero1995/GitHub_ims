<template>
	<div id="applicationService" class="webs">
		<div class="slotOptions">
			<div class="inputs">
				<span>服务名称:</span>
				<el-input v-model="search.appName" placeholder="请输入服务内容"></el-input>
			</div>
			<div class="inputs">
				<span>服务IP:</span>
				<el-input v-model="search.serviceIp" placeholder="请输入服务IP"></el-input>
			</div>
			<div class="inputs">
				<span>服务状态:</span>
				<el-select v-model="search.runState" placeholder="请选择">
					<el-option v-for="item in serviceStatus" :key="item.index" :label="item.label" :value="item.index"> </el-option>
				</el-select>
			</div>

			<div class="buttons">
				<el-button icon="el-icon-upload" type="success" @click="exportAllData">导出</el-button>
				<el-button icon="el-icon-search" type="primary" @click="queryApplicationService">查询</el-button>
				<el-button icon="el-icon-refresh-right" @click="resetsearch">重置</el-button>
			</div>
		</div>
		<div class="slotMain">
			<div class="slotTables">
				<el-table border :data="tableData" style="width: 100%;">
					<el-table-column align="center" prop="appName" label="应用服务名称" width="180"> </el-table-column>
					<el-table-column align="center" prop="serviceIp" label="服务IP" width="180"> </el-table-column>
					<el-table-column align="center" prop="runState" label="服务状态">
						<template slot-scope="scope">
							<span class="label_unrun" v-if="scope.row.runState === 1"> 未运行 </span>
							<span class="label_run" v-else> 运行中 </span>
						</template>
					</el-table-column>

					<el-table-column align="center" prop="hardDiskSize" label="硬盘大小"> </el-table-column>
					<el-table-column align="center" prop="memorySize" label="内存大小"> </el-table-column>
					<el-table-column align="center" prop="cpuUtilization" label="CPU使用率">
						<template slot-scope="scope">
							<el-progress :text-inside="true" :stroke-width="15" :percentage="scope.row.cpuUtilization" :color="statusColorMethod"></el-progress>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="memoryUtilization" label="内存使用率">
						<template slot-scope="scope">
							<el-progress
								:text-inside="true"
								:stroke-width="15"
								:percentage="scope.row.memoryUtilization"
								:color="statusColorMethod"
							></el-progress>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="hardDiskUtilization" label="硬盘使用率">
						<template slot-scope="scope">
							<el-progress
								:text-inside="true"
								:stroke-width="15"
								:percentage="scope.row.hardDiskUtilization"
								:color="statusColorMethod"
							></el-progress>
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
	name: 'applicationService',
	mixins: [mixinPages],
	data() {
		return {
			search: {
				appName: '',
				serviceIp: '',
				runState: '0',
			},
			tableData: [
				{
					appName: '通行记录接收服务',
					serviceIp: '192.168.1.72',
					runState: 1,
					hardDiskSize: '0.000GB',
					memorySize: '0.000GB',
					cpuUtilization: 30,
					memoryUtilization: 66,
					hardDiskUtilization: 90,
				},
				{
					appName: '公安业务门户',
					serviceIp: '192.168.1.72',
					runState: 2,
					hardDiskSize: '0.000GB',
					memorySize: '0.000GB',
					cpuUtilization: 23,
					memoryUtilization: 84,
					hardDiskUtilization: 10,
				},
				{
					appName: '智能运维门户',
					serviceIp: '192.168.1.72',
					runState: 2,
					hardDiskSize: '0.000GB',
					memorySize: '0.000GB',
					cpuUtilization: 10,
					memoryUtilization: 65,
					hardDiskUtilization: 20,
				},
				{
					appName: '配置管理中心服务',
					serviceIp: '192.168.1.72',
					runState: 1,
					hardDiskSize: '0.000GB',
					memorySize: '0.000GB',
					cpuUtilization: 30,
					memoryUtilization: 30,
					hardDiskUtilization: 39,
				},
			],
			serviceStatus: [
				{
					index: '0',
					label: '全部',
				},
				{
					index: '1',
					label: '未运行',
				},
				{
					index: '2',
					label: '运行中',
				},
			],
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.queryApplicationService();
		},
		queryApplicationService() {
			//查询应用服务数据 this.search
		},
		exportAllData() {
			//导出所有
		},
		resetsearch() {
			//重置
		},
		//进度条状态
		statusColorMethod(percentage) {
			if (percentage < 50) {
				return '#67c239';
			} else if (percentage < 80) {
				return '#e6a23c';
			} else {
				return '#f56c6c';
			}
		},
	},
};
</script>
<style lang="less">
#applicationService {
	.label_unrun {
		text-align: center;
		display: inline-block;
		width: 55px;
		color: red;
		background-color: #ffeae9;
		border: 1px solid red;
		border-radius: 4px;
	}
	.label_run {
		text-align: center;
		display: inline-block;
		width: 55px;
		color: #67c23a;
		background-color: #d1ffe5;
		border: 1px solid #67c23a;
		border-radius: 4px;
	}
}
</style>
