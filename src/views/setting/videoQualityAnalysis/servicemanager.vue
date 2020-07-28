<template>
	<div id="servicemanager" class="webs">
		<div class="slotHeader">任务查询</div>
		<div class="slotOptions">
			<div class="inputs">
				<span>服务名称: </span>
				<el-input v-model="search.serverName" placeholder="请输入服务名称"></el-input>
			</div>
			<div class="buttons">
				<el-button icon="el-icon-search" type="primary" @click="getData">查询</el-button>
			</div>
		</div>
		<div class="slotHeader">详细列表</div>
		<div class="slotOptions">
			<el-button class="button" icon="el-icon-plus" type="success" @click="add">添加</el-button>
			<el-button class="button" icon="el-icon-delete" type="danger" @click="del">删除</el-button>
		</div>
		<div class="slotMain">
			<div class="slotTables">
				<el-table ref="tableData" border :data="tableData" style="width: 100%;">
					<el-table-column type="selection" width="55" align="center"> </el-table-column>
					<el-table-column align="center" prop="serverName" label="服务器名称"> </el-table-column>
					<el-table-column align="center" prop="serverIp" label="服务器IP"> </el-table-column>
					<el-table-column align="center" prop="isUse" label="服务器状态">
						<template slot-scope="scope">
							<div>
								<el-button type="text" @click="change(scope.row)">{{ scope.row.isUse == '1' ? '启用' : '停止' }}</el-button>
							</div>
						</template>
					</el-table-column>

					<el-table-column align="center" prop="creator" label="创建者"> </el-table-column>
					<el-table-column align="center" prop="createDate" label="创建时间"> </el-table-column>
					<el-table-column align="center" prop="modifier" label="修改者"> </el-table-column>
					<el-table-column align="center" prop="modiDate" label="修改时间"> </el-table-column>
					<el-table-column align="center" label="操作">
						<template slot-scope="scope">
							<div>
								<el-button type="text" @click="modification(scope.row)">修改</el-button>
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
		<el-dialog title="服务器信息" class="dialog" :visible.sync="serverDialog.show" :modal-append-to-body="false" width="30%">
			<el-form ref="form" :model="form" label-width="120px">
				<el-form-item label="服务器名称">
					<el-input v-model="form.serverName"></el-input>
				</el-form-item>
				<el-form-item label="服务器IP">
					<el-input v-model="form.serverIp"></el-input>
				</el-form-item>
				<el-form-item label="是否启用">
					<el-select v-model="form.isUse" placeholder="请选择">
						<el-option label="启用" :value="1"> </el-option>
						<el-option label="停用" :value="0"> </el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button class="focusButton" @click="handleForm">提交</el-button>
				<el-button class="" @click="serverDialog.show = false">关闭</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import { getUser } from '@/utils/utils';
import mixinPages from '@/mixin/pages';
export default {
	name: 'servicemanager',
	components: {},
	mixins: [mixinPages],
	data() {
		return {
			search: {
				serverName: '',
			},
			tableData: [],
			form: { serverName: '', serverIp: '', isUse: 1 },
			serverDialog: {
				show: false,
				edit: false,
			},
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
			const params = { ...this.search };
			params.page = this.pageNav.page;
			params.pageSize = this.pageNav.pageSize;
			this.axios.getVQServerList(params).then((res) => {
				this.tableData = res.data.rows;
				this.pageNav.total = res.data.total;
			});
		},
		add() {
			this.form = this.$options.data().form;
			this.serverDialog.edit = false;
			this.serverDialog.show = true;
		},
		del() {
			const selection = this.$refs.tableData.selection;
			if (selection.length > 0) {
				this.$confirm('此操作将永久删除, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					customClass: 'dialog',
					type: 'warning',
				}).then(() => {
					const sceneIds = selection.map((el) => el.sceneId).join(',');
					const params = { sceneIds };
					this.axios.deleteVQServer(params).then((res) => {
						this.$message.success('删除成功');
						this.query();
					});
				});
			} else {
				this.$message.info('请选择数据');
			}
		},
		handleForm() {
			const user = getUser();
			if (user && !this.serverDialog.edit) {
				const params = { ...this.form };
				params.creator = user.userName;
				this.axios.insertVQServer(params).then((res) => {
					if (res.data.retCode == 200) {
						this.$message.success('创建成功');
						this.serverDialog.show = false;
						this.form = { ...this.$options.data().form };
						this.getData();
					}
				});
			} else {
				const params = { ...this.form };
				params.modifier = user.userName;
				this.axios.updateVQServer(params).then((res) => {
					if (res.data.retCode == 200) {
						this.$message.success('更新成功');
						this.serverDialog.show = false;
						this.form = { ...this.$options.data().form };
						this.getData();
					}
				});
			}
		},
		change(row) {
			const isUse = row.isUse == '1' ? '0' : '1';
			const params = {
				serverId: row.serverId,
				isUse,
			};
			this.axios.updateIsUse(params).then((res) => {
				row.isUse = isUse;
			});
		},
		modification(row) {
			this.form = { ...row };
			this.serverDialog.edit = true;
			this.serverDialog.show = true;
		},
	},
};
</script>
<style lang="less">
#servicemanager {
}
</style>
