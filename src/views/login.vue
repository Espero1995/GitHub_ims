<template>
	<div class="loginPage">
		<div class="loginMiddle">
			<img class="loginHeader" src="../assets/head.png" />
			<div class="loginBg">
				<img class="imgBg" src="../assets/background.png" />
			</div>

			<div class="warp">
				<div class="formBox">
					<h1 class="loginTitle">用户登录</h1>
					<p class="loginSub">请使用账号密码登录</p>

					<el-form class="loginForm" :model="loginFor" status-icon ref="loginFor" :rules="rules" @keyup.enter.native="submitForm('loginFor')">
						<el-form-item prop="username">
							<el-input type="text" v-model="loginFor.username" autocomplete="off" placeholder="请输入用户名"></el-input>
						</el-form-item>

						<el-form-item prop="password">
							<el-input type="password" v-model="loginFor.password" autocomplete="off" show-password="" placeholder="请输入密码"></el-input>
						</el-form-item>

						<el-checkbox v-model="checked">记住密码</el-checkbox>

						<el-form-item>
							<el-button type="primary" class="loginBtn" @click="submitForm('loginFor')" :loading="loading">
								登录
							</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>

			<div class="loginFooter">
				<div>系统版本：{{ version.sys }}，控件版本：{{ version.controls }}</div>
				<div class="loginCopyright">版权所有&nbsp;杭州中威电子股份有限公司&nbsp;保留一切权利。</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Login',
	data() {
		const validateUsername = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入用户名'));
			} else if (value.length < 5) {
				callback(new Error('用户名长度至少5位'));
			} else {
				callback();
			}
		};

		const validatePassword = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			} else {
				callback();
			}
		};

		return {
			checked: false,
			loading: false,
			loginFor: {
				username: '',
				password: '',
			},
			rules: {
				username: [{ validator: validateUsername, trigger: 'blur' }],
				password: [{ validator: validatePassword, trigger: 'blur' }],
			},
			version: {
				sys: '1.0.0',
				controls: '1.0.0',
			},
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.getPassword();
			this.getVersion();
		},
		getPassword() {
			this.loginFor.username = localStorage.getItem('username') || '';
			this.loginFor.password = localStorage.getItem('password') || '';

			if (this.loginFor.username !== '' && this.loginFor.password !== '') {
				this.checked = true;
			} else {
				this.checked = false;
			}
		},

		submitForm(formName) {
			const params = {
				username: this.loginFor.username,
				password: this.loginFor.password,
			};
			if (this.checked) {
				localStorage.setItem('username', params.username);
				localStorage.setItem('password', params.password);
			} else {
				localStorage.setItem('username', '');
				localStorage.setItem('password', '');
			}

			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.loading = true;
					this.axios
						.LogInAPI(params)
						.then(async (res) => {
							const data = res.data.content;
							await this.$store.dispatch('SaveUser', data);
							setTimeout(() => {
								this.$router.push({ name: 'homepage' });
								this.loading = false;
								return this.$message.success('登录成功!');
							}, 300);
						})
						.catch((err) => {
							this.$message.error('服务器连接失败');
							this.loading = false;
						});
				} else {
					return this.$message.error('请填写用户名、密码');
				}
			});
		},
		//获取版本号
		getVersion() {
			this.axios.getVersion().then((res) => {
				const versionArr = res.data.content.split(';');
				this.version.sys = versionArr[0];
				this.version.controls = versionArr[1];
			});
		},
	},
};
</script>

<style lang="less" scoped>
.loginPage {
	padding: 0;
	margin: 0;
	width: 100vw;
	height: 100vh;
}

.loginMiddle {
	position: relative;
	width: 100%;
	top: 15%;
	overflow: hidden;

	.loginHeader {
		margin-left: 20%;
		margin-bottom: 15px;
		height: 35px;
	}

	.loginBg {
		width: 100%;
		background-color: #2d435e;
		text-align: center;

		.imgBg {
			margin: 0 auto;
		}
	}

	.warp {
		position: absolute;
		top: 25%;
		right: 22%;
		align-items: center;
		min-width: 320px;

		.formBox {
			width: 320px;
			padding: 10px;
			border: 1px solid #ccc;
			background-color: #fff;
			border-radius: 5px;

			.loginTitle {
				font-size: 18px;
				color: #333333;
				margin: 18px 0 10px 18px;
			}

			.loginSub {
				margin: 0 0 15px 18px;
				color: #6a7075;
				font-size: 14px;
				letter-spacing: 1px;
			}

			.loginForm {
				margin-left: 18px;
				margin-right: 20px;
			}

			.loginBtn {
				width: 100%;
				margin-top: 20px;
				letter-spacing: 1px;
				background-color: #1971db;
			}
		}
	}

	@media screen and (max-width: 480px) {
		.warp {
			left: 50%;
			transform: translateX(-50%);
		}
	}
}

.loginFooter {
	width: 100%;
	margin-top: 15px;
	font-size: 12px;
	color: #707070;
	text-align: center;

	.loginCopyright {
		margin-top: 8px;
	}
}
</style>
