<template>
	<div id="devChooseDialog">
		<div class="sub_main">
			<div class="header">
				<span>选择设备通道</span>
				<img src="@/assets/alarm/close.png" @click="closeDialog()" />
			</div>
			<div class="content">
				<div class="slotOptions">
					<div class="inputs">
						<span>设备名称:</span>
						<el-input placeholder="请输入设备名称" v-model="search.fdName"></el-input>
					</div>
					<div class="inputs">
						<span>设备ID:</span>
						<el-input placeholder="请输入设备ID" v-model="search.fdId"></el-input>
					</div>
					<el-button icon="el-icon-search" type="primary" @click="getAssets">查询</el-button>
					<el-button icon="el-icon-refresh-right" @click="resetsearch">重置</el-button>
				</div>
				<div class="slotMain">
					<div class="slotTables">
						<el-table
							border
							:data="tableData"
							style="width: 100%;"
							ref="multipleTable"
							:height="394"
							@selection-change="handleSelectionChange"
							@current-change="currentChange"
						>
							<el-table-column align="center" type="selection" width="55"> </el-table-column>
							<el-table-column align="center" prop="fdName" label="设备名称"> </el-table-column>
							<el-table-column align="center" prop="fdId" label="设备ID"> </el-table-column>
							<el-table-column align="center" prop="channelId" label="通道号"> </el-table-column>
						</el-table>
					</div>
					<div class="slotPagination">
						<el-pagination
							background
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page="pageNav.page"
							:page-sizes="[10, 20, 50, 100]"
							:page-size="pageNav.pageSize"
							layout="sizes, prev, pager, next,total, jumper"
							:total="pageNav.total"
						>
						</el-pagination>
					</div>
				</div>
			</div>
			<div class="bottom">
				<el-button type="primary" size="small" @click="handleSubmit">保存</el-button>
				<el-button size="small" @click="closeDialog">取消</el-button>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'devChooseDialog',
	components: {},
	data() {
		return {
			search: {
				fdId: '',
				fdName: '',
			},
			pageNav: {
				page: 1,
				pageSize: 10,
				total: 0,
			},
			tableData: [],
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.getAssets();
		},
		getAssets() {
			const params = Object.assign({}, this.pageNav, this.search, {
				type: 1, //不知道type是什么意思？？？
			});
			this.axios.getAssets(params).then((res) => {
				this.tableData = res.data.rows;
				this.pageNav.total = res.data.total;
			});
		},
		closeDialog() {
			this.$emit('closeDialog');
		},
		handleSubmit() {
			const selectList = this.$refs.multipleTable.selection;
			if (selectList.length === 1) {
				let el = selectList[0];
				this.$emit('selectDevClick', el);
			} else {
				this.$message({
					type: 'warning',
					message: '请选择一个设备',
				});
			}
		},
		//table实现单选
		handleSelectionChange(val) {
			if (val.length > 1) {
				this.$refs.multipleTable.clearSelection();
				this.$refs.multipleTable.toggleRowSelection(val[val.length - 1]);
			}
		},
		currentChange(val) {
			this.$refs.multipleTable.toggleRowSelection(val);
		},
		//重置
		resetsearch() {
			this.search = Object.assign({}, this.$options.data().search);
			this.$message({
				message: '已重置',
			});
			this.getAssets();
		},
		handleSizeChange(val) {
			this.pageNav.pageSize = val;
			this.getAssets();
		},
		handleCurrentChange(value) {
			this.pageNav.page = value;
			this.getAssets();
		},
	},
};
</script>
<style lang="less">
#devChooseDialog {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(0, 0, 0, 0.5);
	z-index: 105;
	.sub_main {
		width: 950px;
		height: 580px;
		background-color: #fff;
		border-radius: 5px;
		position: relative;
		.header {
			width: 100%;
			height: 42px;
			color: white;
			font-size: 15px;
			background-color: #158cf2;
			display: flex;
			align-items: center;
			position: relative;
			span {
				margin-left: 20px;
			}
			img {
				width: 22px;
				height: 22px;
				right: 20px;
				position: absolute;
				cursor: pointer;
				transition: all 0.4s;
				&:hover {
					transform: rotate(180deg);
				}
			}
		}
		.content {
			display: flex;
			justify-content: center;
			flex-direction: column;
			width: 100%;
			height: 480px;
			thead {
				.el-table-column--selection {
					.cell {
						display: none;
					}
				}
			}
		}
		.bottom {
			position: absolute;
			float: right;
			right: 20px;
			bottom: 20px;
			.el-button {
				margin-right: 10px;
			}
		}
	}
}
</style>
