<template>
	<div id="netAlarm" class="webs">
		<div class="slotHeader">网络告警</div>
		<div class="slotOptions">
			<div class="inputs">
				<span>告警日期: </span>
				<el-date-picker v-model="search.beginTime" type="date" placeholder="选择日期"> </el-date-picker>
				<span>处理状态: </span>
				<el-select v-model="search.maintainStatus" placeholder="请选择">
					<el-option v-for="key in Object.keys($v.alarmType)" :key="key" :label="$v.alarmType[key]" :value="key"> </el-option>
				</el-select>
				<span>告警名称: </span>
				<el-select v-model="search.alarmCode" placeholder="请选择">
					<el-option v-for="key in Object.keys($v.alarmType)" :key="key" :label="$v.alarmType[key]" :value="key"> </el-option>
				</el-select>
			</div>
			<div class="buttons">
				<el-button icon="el-icon-search" type="primary">查询</el-button>
				<el-button icon="el-icon-delete" type="danger">删除</el-button>
				<el-button icon="el-icon-upload" type="success">导出数据</el-button>
			</div>
		</div>
		<div class="slotMain">
			<div class="slotTables">
				<el-table border :data="tableData" style="width: 100%;">
					<el-table-column align="center" type="selection" width="55"> </el-table-column>
					<el-table-column align="center" prop="alarmName" label="告警名称"> </el-table-column>
					<el-table-column align="center" prop="fdName" label="MAC地址"> </el-table-column>
					<el-table-column align="center" prop="channelId" label="设备端口"> </el-table-column>
					<el-table-column align="center" prop="alarmTime" label="告警触发时间"> </el-table-column>
					<el-table-column align="center" label="操作">
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
	name: 'netAlarm',
	components: {},
	mixins: [mixinPages],
	data() {
		return {
			search: {
				beginTime: '',
				endTime: '',
				maintainStatus: '',
				alarmCode: '',
			},
			tableData: [],
		};
	},
	mounted() {
		this.init();
		// console.log(Object.keys(this.$v.alarmType));
	},
	methods: {
		init() {
			this.getData();
		},
		getData() {
			//请在刺出获取数据
			console.log('网络告警类型：', this.$route.query);
		},
	},
};
</script>
<style lang="less">
#netAlarm {
}
</style>
