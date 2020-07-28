<template>
	<div id="rightManage" class="webs">
		<div class="slotHeader">权限管理</div>
		<div class="slotOptions">
			<div class="inputs">
				<span>查询用户名: </span>
				<el-input placeholder="请输入用户名" v-model="search.userName"></el-input>
			</div>
			<div class="inputs">
				<span>查询权限: </span>
				<el-select v-model="allRight" placeholder="请选择">
					<el-option v-for="item in rightLists" :key="item.key" :label="item.title" :value="item.key" @click.native="chooseRight(item)"> </el-option>
				</el-select>
			</div>
			<div class="inputs">
				<el-checkbox-group v-model="checkList">
					<el-checkbox label="submitRight" :disabled="isRightDisabled">上报</el-checkbox>
					<el-checkbox label="auditRight" :disabled="isRightDisabled">审核</el-checkbox>
					<el-checkbox label="dealRight" :disabled="isRightDisabled">维修</el-checkbox>
				</el-checkbox-group>
			</div>

			<div class="buttons">
				<el-button icon="el-icon-search" type="primary" @click="getUserList">查询</el-button>
				<el-button icon="el-icon-refresh-right" @click="resetsearch">重置</el-button>
				<el-button icon="el-icon-plus" type="success" @click="addUser">增加</el-button>
				<el-button icon="el-icon-delete" type="danger" @click="showDeleteAlertDialog">删除</el-button>
			</div>
		</div>
		<div class="slotMain">
			<div class="slotTables">
				<el-table border :data="tableData" style="width: 100%;" ref="multipleTable">
					<el-table-column align="center" type="selection" width="55"> </el-table-column>
					<el-table-column align="center" prop="userName" label="用户名"> </el-table-column>
					<el-table-column align="center" prop="submitRight" label="上报权限">
						<template slot-scope="scope">
							<span v-if="parseInt(scope.row.submitRight) === 1">有</span>
							<span v-else>无</span>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="auditRight" label="审核权限">
						<template slot-scope="scope">
							<span v-if="parseInt(scope.row.auditRight) === 1">有</span>
							<span v-else>无</span>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="dealRight" label="维修权限">
						<template slot-scope="scope">
							<span v-if="parseInt(scope.row.dealRight) === 1">有</span>
							<span v-else>无</span>
						</template>
					</el-table-column>

					<el-table-column align="center" label="操作">
						<template slot-scope="scope">
							<el-button type="text" @click="editClick(scope.row)">修改</el-button>
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
					:page-sizes="[25, 50, 100, 200]"
					:page-size="pageNav.pageSize"
					layout="sizes, prev, pager, next,total, jumper"
					:total="pageNav.total"
				>
				</el-pagination>
			</div>
		</div>
		<userAdditionDialog v-if="isUserAdditionDialog" @closeDialog="closeAdditionDialog" @insertAppUser="insertAppUser"></userAdditionDialog>
		<userEditDialog v-if="isUserEditDialog" :user="user" @closeDialog="closeEditDialog" @updateMaintainUserRight="updateMaintainUserRight"></userEditDialog>
	</div>
</template>
<script>
import userAdditionDialog from '_c/userManage/userAdditionDialog.vue';
import userEditDialog from '_c/userManage/userEditDialog.vue';
export default {
	name: 'rightManage',
	components: {
		userAdditionDialog,
		userEditDialog,
	},
	data() {
		return {
			search: {
				userName: '',
			},
			pageNav: {
				page: 1,
				pageSize: 25,
				total: 0,
			},
			tableData: [],
			//key： 0（全部）1（精确查询）
			rightLists: [
				{
					title: '全部',
					key: 0,
				},
				{
					title: '精确查询',
					key: 1,
				},
			],
			allRight: 0,
			checkList: [],
			isRightDisabled: true, //禁用
			isUserAdditionDialog: false,
			isUserEditDialog: false,
			user: {},
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.getUserList();
		},
		chooseRight(right) {
			if (right.key === 0) {
				this.isRightDisabled = true;
				this.checkList = [];
			} else {
				this.isRightDisabled = false;
			}
		},
		//查询用户列表
		getUserList() {
			if (this.isRightDisabled) {
				//权限禁用，即处于全部状态
				this.search = {
					userName: this.search.userName,
				};
			} else {
				if (this.checkList.indexOf('submitRight') != -1) {
					this.search.submitRight = 1;
				} else {
					this.search.submitRight = 0;
				}
				if (this.checkList.indexOf('auditRight') != -1) {
					this.search.auditRight = 1;
				} else {
					this.search.auditRight = 0;
				}
				if (this.checkList.indexOf('dealRight') != -1) {
					this.search.dealRight = 1;
				} else {
					this.search.dealRight = 0;
				}
			}

			const params = Object.assign({}, this.pageNav, this.search, {
				isDeleteUserId: true, //不需要userId字段时，添加。
			});
			this.axios.getMaintainUserRight(params).then((res) => {
				this.tableData = res.data.rows;
				this.pageNav.total = res.data.total;
			});
		},
		//修改用户
		editClick(user) {
			this.isUserEditDialog = true;
			this.user = user;
		},
		//更新接口
		updateMaintainUserRight(form) {
			this.axios.updateMaintainUserRight(form).then((res) => {
				this.$message({
					message: '修改成功',
					type: 'success',
				});
				this.getUserList();
			});
		},
		//添加用户
		addUser() {
			this.isUserAdditionDialog = true;
		},
		insertAppUser(form) {
			this.axios.insertAppUser(form).then((res) => {
				this.$message({
					message: '添加成功',
					type: 'success',
				});
				this.getUserList();
			});
		},
		//关闭视图
		closeAdditionDialog() {
			this.isUserAdditionDialog = false;
		},
		closeEditDialog() {
			this.isUserEditDialog = false;
		},
		//删除用户
		deleteUser() {
			const selectList = this.$refs.multipleTable.selection;
			const arr = [];
			for (let i = 0; i < selectList.length; i++) {
				const el = selectList[i];
				arr.push(el.userId);
			}
			const userIds = arr.join(',');
			const params = Object.assign({
				userIds: userIds,
			});
			this.axios.deleteMaintainUserRight(params).then((res) => {
				this.getUserList();
				this.$message({
					message: '删除成功',
					type: 'success',
				});
			});
		},
		showDeleteAlertDialog() {
			const selectList = this.$refs.multipleTable.selection;
			if (selectList.length != 0) {
				this.$confirm('确认删除(用户及其权限)?', '提示', {
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(() => {
					this.deleteUser();
				});
			} else {
				this.$message({
					message: '请选择要删除的用户',
					type: 'warning',
				});
			}
		},
		//重置
		resetsearch() {
			this.search = Object.assign({}, this.$options.data().search);
			this.isRightDisabled = true;
			this.allRight = 0;
			this.checkList = [];
			this.$message({
				message: '已重置',
			});
			this.getUserList();
		},
		handleSizeChange(val) {
			this.pageNav.pageSize = val;
			this.getUserList();
		},
		handleCurrentChange(value) {
			//page换页操作
			this.pageNav.page = value;
			this.getUserList();
		},
	},
};
</script>
<style lang="less">
#rightManage {
	.el-checkbox-group {
		padding: 5px 0px;
		box-sizing: border-box;
	}
}
</style>
