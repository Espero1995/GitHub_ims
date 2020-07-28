<template>
	<div id="monitorPtz" class="webs">
		<!-- <div class="slotHeader">告警管理</div> -->
		<div class="slotOptions">
			<div class="inputs">
				<span>检测日期: </span>
				<el-date-picker v-model="search.beginTime" type="date" placeholder="选择日期"> </el-date-picker>
				<span>通道名称: </span>
				<el-input v-model="search.channelName" placeholder="请输入内容"></el-input>
				<span>云台检测状态: </span>
				<el-select v-model="search.isPtz" placeholder="请选择">
					<el-option v-for="key in Object.keys($v.alarmType)" :key="key" :label="$v.alarmType[key]" :value="key"> </el-option>
				</el-select>
				<span>设备IP地址: </span>
				<el-input v-model="search.ipAddress" placeholder="设备IP地址"></el-input>
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
					<el-table-column align="center" prop="depName" label="行政区域"> </el-table-column>
					<el-table-column align="center" prop="channelName" label="通道名称"> </el-table-column>
					<el-table-column align="center" prop="isOnline" label="是否在线"> </el-table-column>
					<el-table-column align="center" prop="depName" label="所属区域"> </el-table-column>
					<el-table-column align="center" prop="isPlayFailure" label="是否播放失败"> </el-table-column>
					<el-table-column align="center" prop="ipAddress" label="设备IP地址"> </el-table-column>
					<el-table-column align="center" prop="isPtz" label="云台检测状态"> </el-table-column>
					<el-table-column align="center" prop="createDate" label="检测时间"> </el-table-column>
					<el-table-column align="center" prop="imgUrl" label="图片"> </el-table-column>
					<el-table-column align="center" prop="shipin" label="视频"> </el-table-column>
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
	name: 'monitorPtz',
	components: {},
	mixins: [mixinPages],
	data() {
		return {
			search: {
				beginTime: '',
				endTime: '',
				ipAddress: '',
				channelName: '',
				isPtz: '',
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
};
</script>
<style lang="less">
#monitorPtz {
}
</style>
