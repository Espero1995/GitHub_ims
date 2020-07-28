<template>
	<div id="monitorLocation" class="webs">
		<!-- <div class="slotHeader">告警管理</div> -->
		<div class="slotOptions">
			<div class="inputs">
				<span>设备名称: </span>
				<el-input v-model="search.channelName" placeholder="请输入内容"></el-input>
				<span>设备IP: </span>
				<el-input v-model="search.ipAddress" placeholder="请输入内容"></el-input>
				<span>场景是否变换: </span>
				<el-select v-model="search.detectionState" placeholder="请选择">
					<el-option v-for="key in Object.keys($v.alarmType)" :key="key" :label="$v.alarmType[key]" :value="key"> </el-option>
				</el-select>
				<span>日期: </span>
				<el-date-picker v-model="search.beginTime" type="date" placeholder="选择日期"> </el-date-picker>
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
					<el-table-column align="center" prop="channelName" label="设备名称"> </el-table-column>
					<el-table-column align="center" prop="ipAddress" label="设备IP"> </el-table-column>
					<el-table-column align="center" prop="isOnline" label="是否在线"> </el-table-column>
					<el-table-column align="center" prop="detectionState" label="场景是否变换"> </el-table-column>
					<el-table-column align="center" prop="depName" label="行政区域"> </el-table-column>
					<el-table-column align="center" label="对比图像">
						<template slot-scope="scope">
							<div>
								<el-button type="text">对比图像</el-button>
							</div>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="sampDetectTime" label="检测时间"> </el-table-column>
					<el-table-column align="center" prop="maintainStatus" label="操作">
						<template slot-scope="scope">
							<div>
								<el-button type="text">报修</el-button>
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
	name: 'monitorLocation',
	components: {},
	mixins: [mixinPages],
	data() {
		return {
			search: {
				channelName: '',
				ipAddress: '',
				detectionState: '',
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
			console.log('场景变换的结点：', this.$route.query);
		},
	},
};
</script>
<style lang="less">
#monitorLocation {
}
</style>
