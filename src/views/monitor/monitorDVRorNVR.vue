<template>
	<div id="monitorDVRorNVR" class="webs">
		<!-- <div class="slotHeader">告警管理</div> -->
		<div class="slotOptions">
			<div class="inputs">
				<span>设备名称: </span>
				<el-input v-model="search.deviceName" placeholder="请输入内容"></el-input>
				<span>设备类型: </span>
				<el-select v-model="search.deviceType" placeholder="请选择">
					<el-option v-for="key in Object.keys($v.processState)" :key="key" :label="$v.processState[key]" :value="key"> </el-option>
				</el-select>
				<span>是否在线: </span>
				<el-select v-model="search.isOnline" placeholder="请选择">
					<el-option v-for="key in Object.keys($v.processState)" :key="key" :label="$v.processState[key]" :value="key"> </el-option>
				</el-select>
			</div>
			<div class="buttons">
				<el-button icon="el-icon-search" type="primary">查询</el-button>
				<!-- <el-button   icon="el-icon-delete" type="danger">删除</el-button>
				<el-button icon="el-icon-upload" type="success">导出数据</el-button> -->
			</div>
		</div>
		<div class="slotMain">
			<div class="slotTables">
				<el-table border :data="tableData" style="width: 100%;">
					<el-table-column align="center" prop="deviceName" label="设备名称"> </el-table-column>
					<el-table-column align="center" prop="deviceType" label="设备类型"> </el-table-column>
					<el-table-column align="center" prop="deviceStatic" label="状态"> </el-table-column>
					<el-table-column align="center" prop="channelCount" label="通道数"> </el-table-column>
					<el-table-column align="center" prop="HDDCount" label="硬盘数"> </el-table-column>
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
	name: 'monitorDVRorNVR',
	components: {},
	mixins: [mixinPages],
	data() {
		return {
			search: {
				deviceName: '',
				deviceType: '',
				isOnline: '',
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
#monitorDVRorNVR {
}
</style>
