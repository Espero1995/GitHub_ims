<template>
	<div id="channelTables" class="webs">
		<div class="slotOptions">
			<div class="inputs">
				<span>通道名称: </span>
				<el-input v-model="search.channelName" placeholder="请输入通道名称"></el-input>
				<span>行政区域: </span>
				<el-select v-model="search.depId">
					<el-option v-for="dep in depList" :key="dep.depname" :label="dep.depname" :value="dep.depid"> </el-option>
				</el-select>
			</div>
			<div class="buttons">
				<el-button icon="el-icon-search" type="primary" @click="getData">查询</el-button>
			</div>
		</div>
		<div class="slotTables">
			<el-table border ref="tableData" :data="tableData">
				<el-table-column type="selection" width="55" align="center"> </el-table-column>
				<el-table-column align="center" prop="depName" label="行政区域"> </el-table-column>
				<el-table-column align="center" prop="fdId" label="设备编号"> </el-table-column>
				<el-table-column align="center" prop="channelId" label="通道ID"> </el-table-column>
				<el-table-column align="center" prop="channelName" label="通道名称"> </el-table-column>
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
</template>
<script>
import mixinPages from '@/mixin/pages';
export default {
	name: 'channelTables',
	components: {},
	mixins: [mixinPages],
	data() {
		return {
			search: { channelName: '', depId: '' },
			depList: [],
			tableData: [],
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.getData();
			this.getMonitorDepTree();
		},
		getData() {
			const params = { ...this.search };
			params.page = this.pageNav.page;
			params.pageSize = this.pageNav.pageSize;
			this.axios.getVQTaskUnlinkVideoInChList(params).then((res) => {
				const data = res.data.rows;
				this.tableData = data;
				this.pageNav.total = res.data.total;
			});
		},
		getMonitorDepTree() {
			this.axios.getMonitorDepTree().then((res) => {
				const lists = res.data.content;
				this.depList = lists;
			});
		},
		getSelection() {
			const selection = this.$refs.tableData.selection;
			return selection;
		},
	},
};
</script>
<style lang="less">
#channelTables {
}
</style>
