<template>
	<div id="userAdditionDialog" class="dialogMask">
		<div class="main">
			<div class="header">
				<span>添加用户信息</span>
				<img src="@/assets/alarm/close.png" @click="closeDialog()" />
			</div>
			<div class="content">
				<el-form ref="form" :model="form" :rules="formRules" label-width="90px">
					<el-form-item label="账号：" prop="loginName" style="width: 350px;">
						<el-input v-model="form.loginName" placeholder="请输入账号（账号具有唯一性）" size="small"></el-input>
					</el-form-item>
					<el-form-item label="密码：" prop="userPW" style="width: 350px;">
						<el-input v-model="form.userPW" placeholder="请输入密码" size="small" show-password></el-input>
					</el-form-item>
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
					<el-form-item label="身份选择" style="width: 350px;" class="last_form_item">
						<el-radio v-model="form.isSuper" :label="1">管理员</el-radio>
						<el-radio v-model="form.isSuper" :label="0">操作员</el-radio>
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
const md5 = require('md5');
export default {
	name: 'userAdditionDialog',
	components: {},
	props: {},
	data() {
		let validateloginName = async (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入账号'));
			} else if (value.length < 5 || value.length > 18) {
				callback(new Error('账号须由5-18个字符组成'));
			} else if (await this.isUserRepeat(value)) {
				callback(new Error('该账号已存在'));
			} else {
				callback();
			}
		};
		return {
			form: {
				loginName: '', //账号
				userPW: '', //密码
				userName: '', //用户名
				submitRight: 1, //上报
				auditRight: 1, //审核
				dealRight: 1, //维修
				isSuper: 1, //是否是管理员
			},
			formRules: {
				loginName: [{ required: true, validator: validateloginName, trigger: 'blur' }],
				userPW: [{ required: true, message: '请输入密码', trigger: 'blur' }],
				userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
			},
			checkList: ['submitRight', 'auditRight', 'dealRight'],
		};
	},
	methods: {
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
					this.form.userPW = md5(this.form.userPW + '12ab');
					this.$emit('insertAppUser', this.form);
					this.closeDialog();
				}
			});
		},
		closeDialog() {
			this.resetFormData();
			this.$emit('closeDialog');
		},
		resetFormData() {
			this.form = Object.assign({}, this.$options.data().form);
			this.checkList = ['submitRight', 'auditRight', 'dealRight'];
		},
		isUserRepeat(loginName) {
			return new Promise((resolve, reject) => {
				let params = {
					loginName: loginName,
					isDeleteUserId: true, //不需要userId字段时，添加。
				};
				this.axios.isUserRepeat(params).then((res) => {
					if (res.data.content == false) {
						resolve(true);
					} else {
						resolve(false);
					}
				});
			});
		},
	},
};
</script>
<style lang="less">
#userAdditionDialog {
	.main {
		width: 550px;
		height: 380px;
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
