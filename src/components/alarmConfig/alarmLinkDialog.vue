<template>
	<div id="alarmLinkDialog" class="dialogMask">
		<div class="main">
			<div class="header">
				<span>告警联动设置</span>
				<img src="@/assets/alarm/close.png" @click="closeDialog()" />
			</div>
			<div class="content">
				<el-tabs type="card" v-model="activeName">
					<el-tab-pane label="告警弹窗" name="configWall">
						<div class="alarmAlert">
							<el-switch
								style="display: block;"
								v-model="isConfigWall"
								active-color="#13ce66"
								inactive-color="#ff4949"
								active-text="开启"
								inactive-text="关闭"
								@change="changeWall"
							>
							</el-switch>
						</div>
					</el-tab-pane>
					<el-tab-pane label="邮件联动" name="configEmail">
						<el-form ref="form" :model="form" :rules="formRules" label-width="100px">
							<el-form-item class="switch">
								<el-switch
									style="display: block;"
									v-model="isConfigEmail"
									active-color="#13ce66"
									inactive-color="#ff4949"
									active-text="开启"
									inactive-text="关闭"
									@change="changeEmail"
								>
								</el-switch>
							</el-form-item>
							<el-form-item label="收件人：" prop="destEmail" style="width: 95%;">
								<el-input v-model="form.destEmail" placeholder="请填写收件人邮箱账号" :disabled="!isConfigEmail"></el-input>
							</el-form-item>
							<el-form-item label="主题：" prop="subject" style="width: 95%;">
								<el-input v-model="form.subject" placeholder="请填写邮件主题" :disabled="!isConfigEmail"></el-input>
							</el-form-item>
							<el-form-item label="邮件内容：" prop="content" style="width: 95%;">
								<el-input type="textarea" v-model="form.content" placeholder="请填写邮件内容" :disabled="!isConfigEmail"></el-input>
							</el-form-item>
						</el-form>
					</el-tab-pane>
				</el-tabs>
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
	name: 'alarmLinkDialog',
	components: {},
	props: {
		alarmItem: {
			type: Object,
			default: () => {
				return {};
			},
		},
		isResetView: {
			type: Boolean,
			default: () => {
				return false;
			},
		},
	},
	watch: {
		isResetView(value) {
			this.form.configWall = this.alarmItem.configWall;
			this.form.configEmail = this.alarmItem.configEmail;
			this.form.destEmail = this.alarmItem.destEmail;
			this.form.subject = this.alarmItem.subject;
			this.form.content = this.alarmItem.content;
			this.form.alarmConfigId = this.alarmItem.alarmConfigId;
			if (this.alarmItem.configWall === 1) {
				this.isConfigWall = true;
			} else {
				this.isConfigWall = false;
			}
			if (this.alarmItem.configEmail === 1) {
				this.isConfigEmail = true;
			} else {
				this.isConfigEmail = false;
			}
		},
	},
	data() {
		return {
			activeName: 'configWall',
			isConfigWall: false,
			isConfigEmail: false,
			form: {
				destEmail: '',
				subject: '',
				content: '',
				configWall: 0,
				configEmail: 0,
				alarmConfigId: '',
			},
			formRules: {
				destEmail: [{ required: true, message: '请填写收件人邮箱账号', trigger: 'blur' }],
				subject: [{ required: true, message: '请填写邮件主题', trigger: 'blur' }],
				content: [{ required: true, message: '请填写邮件内容', trigger: 'blur' }],
			},
		};
	},
	methods: {
		changeWall(value) {
			if (value) {
				this.form.configWall = 1;
			} else {
				this.form.configWall = 0;
			}
		},
		changeEmail(value) {
			if (value) {
				this.form.configEmail = 1;
			} else {
				this.form.configEmail = 0;
				this.form.subject = '';
				this.form.destEmail = '';
				this.form.content = '';
			}
		},

		closeDialog() {
			this.$emit('closeDialog');
		},
		handleSubmit() {
			if (this.isConfigEmail) {
				this.$refs.form.validate((valid) => {
					if (valid) {
						this.$emit('updateNotifyConfig', this.form);
					}
				});
			} else {
				this.$emit('updateNotifyConfig', this.form);
			}
		},
	},
};
</script>
<style lang="less">
#alarmLinkDialog {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	.main {
		width: 900px;
		height: 430px;
		.content {
			margin-top: 15px;
			padding: 0 40px;
			.el-tabs {
				width: 100%;
				background-color: white;
				.alarmAlert {
					padding: 20px 20px;
					box-sizing: border-box;
				}
				.switch {
					margin-left: -70px;
				}
				.el-form-item__label {
					font-weight: bold;
				}
				.el-form-item {
					margin-top: 5px;
					.el-checkbox-group {
						padding: 0px 0px;
						height: 40px;
						box-sizing: border-box;
					}
				}
				.el-textarea__inner {
					height: 80px;
				}
			}
		}
	}
}
</style>
