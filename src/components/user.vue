<template>
	<div id="user">
		<div class="userimg">
			<img src="static/img/user.png" />
		</div>
		<div class="userinfo">
			<div class="username">超级管理员</div>
			<div class="user">admin</div>
		</div>
		<div class="handle">
			<div class="reset" @click="dialogFormVisible = true"><span class="iconfont icon-mima"></span>修改密码</div>
			<div class="logOut" @click="showlogoutDialog()"><span class="iconfont icon-tuichu"></span>退出登录</div>
		</div>
		<div class="dialogDemo">
			<el-dialog
				@close="close"
				title="修改密码"
				:visible.sync="dialogFormVisible"
				width="30%"
				:modal="false"
				:modal-append-to-body="false"
				:close-on-click-modal="false"
			>
				<el-form :model="pwdForm" :rules="updatePwdDialogRules" ref="pwdForm" style="height: 150px;">
					<el-form-item prop="oldPassword" label="旧密码" :label-width="formLabelWidth">
						<el-input
							v-model="pwdForm.oldPassword"
							autocomplete="off"
							type="password"
							placeholder="请输入旧密码"
							show-password
							clearable
						></el-input>
					</el-form-item>
					<el-form-item prop="newPassword" label="新密码" :label-width="formLabelWidth">
						<el-input
							v-model="pwdForm.newPassword"
							autocomplete="off"
							type="password"
							placeholder="请输入新密码"
							show-password
							clearable
						></el-input>
					</el-form-item>
					<el-form-item prop="repeatPassword" label="确认密码" :label-width="formLabelWidth">
						<el-input
							v-model="pwdForm.repeatPassword"
							autocomplete="off"
							type="password"
							placeholder="请确认新密码"
							show-password
							clearable
						></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button class="cancelBtn" type="danger" @click="dialogFormVisible = false">取 消</el-button>
					<el-button class="submitBtn" type="primary" @click="updatePwdClick">确 定</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
export default {
	name: 'user',
	data() {
		const validateRepeatPassword = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('再次输入必填！'));
			} else if (value.length < 5) {
				callback(new Error('再次输入最少6位！'));
			} else if (value !== this.pwdForm.newPassword) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};

		return {
			dialogFormVisible: false,
			pwdForm: {
				oldPassword: '',
				newPassword: '',
				repeatPassword: '',
			},
			updatePwdDialogRules: {
				oldPassword: [{ required: true, message: '旧密码必填！', trigger: 'blur' }],
				newPassword: [
					{ required: true, message: '新密码必填！', trigger: 'blur' },
					{ min: 6, message: '新密码最少6位！', trigger: 'blur' },
				],
				repeatPassword: [{ validator: validateRepeatPassword, trigger: 'blur' }],
			},

			formLabelWidth: '80px',
		};
	},
	methods: {
		close() {
			const pwdForm = {
				oldPassword: '',
				newPassword: '',
				repeatPassword: '',
			};
			this.pwdForm = pwdForm;
			this.$refs.pwdForm.resetFields();
		},
		//退出点击事件
		showlogoutDialog() {
			this.$confirm('确认退出吗?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					this.loginOut();
				})
				.catch(() => {
					console.log('取消退出！');
				});
		},
		loginOut() {
			// this.axios.LogOut();
			// this.$store.dispatch('LogInOut');
			console.log('logout');
			this.$router.push({ name: 'Login' });
		},
		//修改密码点击事件
		updatePwdClick() {
			const params = {
				oldPassword: this.pwdForm.oldPassword,
				newPassword: this.pwdForm.newPassword,
			};

			this.$refs.pwdForm.validate((valid) => {
				if (valid) {
					if (this.pwdForm.oldPassword === this.pwdForm.newPassword) {
						return this.$message.warning('新旧密码不能相同！');
					}
					this.axios
						.ResetPassword(params)
						.then((res) => {
							if (res.data.code == 0) {
								this.$message.success('修改成功。即将跳转到登录页重新登录！');
								this.loginOut();
							}
						})
						.catch((err) => {
							console.error(err);
						});
				} else {
					return false;
				}
			});
		},
	},
};
</script>

<style lang="less" scoped>
#user {
	position: relative;
	width: 218px;
	.userimg {
		position: absolute;
		margin-top: 15px;
		margin-left: 10px;
	}
	.userinfo {
		height: 85px;
		border-bottom: 1px solid #ededed;
		margin: 0 -12px;
		.username {
			position: absolute;
			left: 80px;
			top: 20px;
			font-weight: bold;
			font-size: 16px;
		}
		.user {
			position: absolute;
			left: 80px;
			top: 45px;
			font-size: 16px;
			color: #959595;
		}
	}
	.handle {
		display: flex;
		align-items: center;
		margin-top: 12px;
		.iconfont {
			font-size: 14px;
		}
		.icon-tuichu {
			font-size: 20px;
		}
		div {
			cursor: pointer;
			width: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		div:hover {
			color: #4a7aba;
		}

		.reset {
			border-right: 1px solid #ededed;
		}
	}
}
</style>
