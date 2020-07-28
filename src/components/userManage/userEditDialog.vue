<template>
	<div id="userEditDialog" class="dialogMask">
		<div class="main">
			<div class="header">
				<span>修改用户信息</span>
				<img src="@/assets/alarm/close.png" @click="closeDialog()" />
			</div>
			<div class="content">
				<el-form ref="form" :model="form" :rules="formRules" label-width="90px">
					<el-form-item label="用户名：" prop="userName" style="width: 350px;">
						<el-input v-model="form.userName" placeholder="请输入用户名" size="small"></el-input>
					</el-form-item>
					<el-form-item label="权限选择" style="width: 350px;">
						<el-checkbox-group v-model="checkList">
							<el-checkbox label="submitRight">上报</el-checkbox>
							<el-checkbox label="auditRight">审核</el-checkbox>
							<el-checkbox label="dealRight">维修</el-checkbox>
						</el-checkbox-group>
					</el-form-item>
				</el-form>
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
	name: 'userEditDialog',
	components: {},
	props: {
		user: {
			//用户
			type: Object,
			default: () => {
				return {};
			},
		},
	},
	data() {
		return {
			form: {
				userName: '', //用户名
				submitRight: 0, //上报
				auditRight: 0, //审核
				dealRight: 0, //维修
				userId: '',
			},
			formRules: {
				userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
			},
			checkList: [],
		};
	},

	mounted() {
		this.assignUser(this.user);
	},
	methods: {
		assignUser(user) {
			this.checkList = [];
			this.form = { ...this.user };
			if (parseInt(this.form.submitRight) === 1) {
				this.checkList.push('submitRight');
			}
			if (parseInt(this.form.auditRight) === 1) {
				this.checkList.push('auditRight');
			}
			if (parseInt(this.form.dealRight) === 1) {
				this.checkList.push('dealRight');
			}
		},
		handleSubmit() {
			if (this.checkList.indexOf('submitRight') != -1) {
				this.form.submitRight = 1;
			} else {
				this.form.submitRight = 0;
			}
			if (this.checkList.indexOf('auditRight') != -1) {
				this.form.auditRight = 1;
			} else {
				this.form.auditRight = 0;
			}
			if (this.checkList.indexOf('dealRight') != -1) {
				this.form.dealRight = 1;
			} else {
				this.form.dealRight = 0;
			}
			this.$refs.form.validate((valid) => {
				if (valid) {
					this.$emit('updateMaintainUserRight', this.form);
					this.closeDialog();
				}
			});
		},
		closeDialog() {
			this.$emit('closeDialog');
		},
	},
};
</script>
<style lang="less">
#userEditDialog {
	.main {
		width: 550px;
		height: 250px;

		.content {
			padding: 0 60px;
			margin-top: 35px;
			.el-form-item__label {
				font-weight: bold;
			}
			.el-form-item {
				margin-top: -5px;
				.el-checkbox-group {
					padding: 0px 0px;
					height: 40px;
					box-sizing: border-box;
				}
			}
			.last_form_item {
				margin-top: -20px;
			}
		}
	}
}
</style>
