<template>
	<div id="topHeader">
		<img class="logo" src="@/assets/indexLogo.png" />
		<div class="menu">
			<span class="alarmBadge" v-show="unDealAlarmCount != 0">{{ unDealAlarmCount }}</span>
			<el-menu :default-active="activeRouter" router class="header-menu" mode="horizontal" @select="handleSelect">
				<el-menu-item index="/homepage"><span>首页</span></el-menu-item>
				<el-menu-item index="/monitor"><span>监控管理</span></el-menu-item>
				<el-menu-item index="/workOrder"><span>工单管理</span></el-menu-item>
				<el-menu-item index="/alarm"><span>告警管理</span></el-menu-item>
				<el-menu-item index="/property"><span>资产管理</span></el-menu-item>
			</el-menu>

			<div class="user">
				<el-button @click="setting"><img src="@/assets/setting.png" />设置</el-button>
				<el-button @click="dialogFormVisible = true"><img src="@/assets/pwd.png" style="margin-right: 5px;" />修改密码</el-button>
				<el-button @click="showlogoutDialog"><img src="@/assets/logout.png" style="margin-right: 5px;" />注销</el-button>
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
	</div>
</template>

<script>
export default {
	name: 'TopHeader',
	components: {},
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
			Timer: null,
			formLabelWidth: '80px',
			unDealAlarmCount: 0,
		};
	},
	computed: {
		activeRouter() {
			return this.$route.matched[1].path || this.$route.path;
		},
	},
	beforeDestroy() {
		clearInterval(this.Timer);
	},
	mounted() {
		this.unDealCount();
		this.init();
	},
	methods: {
		init() {
			this.$nextTick(() => {
				//触发定时器
				this.Timer = setInterval(() => {
					this.unDealCount();
				}, 30000);
			});
		},
		setting() {
			this.$router.push({ name: 'setting' });
		},
		handleSelect(e) {},
		//退出点击事件
		showlogoutDialog() {
			this.$confirm('确认退出吗?', '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				this.loginOut();
			});
		},
		loginOut() {
			//需调动接口TODO
			this.$store.dispatch('LogInOut');
		},

		close() {
			const pwdForm = {
				oldPassword: '',
				newPassword: '',
				repeatPassword: '',
			};
			this.pwdForm = pwdForm;
			this.$refs.pwdForm.resetFields();
		},
		//修改密码点击事件
		updatePwdClick() {
			/*后期修改密码需要传参TODO
            let params = {
                oldPassword: this.pwdForm.oldPassword,
                newPassword: this.pwdForm.newPassword
            };
            */
			this.$refs.pwdForm.validate((valid) => {
				if (valid) {
					if (this.pwdForm.oldPassword === this.pwdForm.newPassword) {
						return this.$message.warning('新旧密码不能相同！');
					}

					//需调动接口TODO
					this.$message.success('修改成功。跳转到登录页重新登录！');
					this.loginOut();
				} else {
					return false;
				}
			});
		},
		//未处理告警
		unDealCount() {
			this.axios.unDealCount().then((res) => {
				this.unDealAlarmCount = res.data.content;
			});
		},
	},
};
</script>

<style lang="less">
@import './TopHeader.less';
</style>
