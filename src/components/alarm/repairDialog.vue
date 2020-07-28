<template>
	<div id="repairDialog" class="dialogMask">
		<div class="main">
			<div class="header">
				<span>添加报修信息</span>
				<img src="@/assets/alarm/close.png" @click="closeDialog()" />
			</div>
			<div class="content">
				<el-form ref="form" :model="form" :rules="formRules" label-width="80px">
					<el-form-item label="工单名称" style="width: 300px;">
						<el-input v-model="form.workOrderName" placeholder="请输入工单名称"></el-input>
					</el-form-item>
					<el-form-item label="审核人" prop="auditorName">
						<el-select v-model="form.auditorName" placeholder="请选择审核人">
							<el-option
								v-for="auditorItem in auditorLists"
								:key="auditorItem.userId"
								:label="auditorItem.userName"
								:value="auditorItem.userId"
								@click.native="selectAuditorClick(auditorItem)"
							></el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="上传图片" label-width="80px">
						<el-upload
							ref="upload"
							action="fakeaction"
							accept="image/png,image/gif,image/jpg,image/jpeg"
							:http-request="fileUpload"
							list-type="picture-card"
							:limit="1"
							:on-exceed="handleExceed"
							:on-remove="handleRemove"
						>
							<i class="el-icon-plus"></i>
						</el-upload>
					</el-form-item>
					<el-form-item label="说明" style="width: 450px; height: 300px;">
						<el-input type="textarea" v-model="form.description" placeholder="请填写上报维修说明"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div class="bottom">
				<el-button type="primary" size="small" @click="handleSubmit">提交</el-button>
				<el-button size="small" @click="misReport">误报</el-button>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'repairDialog',
	components: {},
	data() {
		return {
			form: {
				workOrderName: '', //工单名(设备名+告警名)
				auditor_text: '', //审核人
				auditor: '', //审核人Id
				auditorName: '', //审核人
				channelId: '', //通道Id
				fdId: '', //设备Id
				sourceFrom: 2, //先填2
				submitPerson: '', //提交人Id
				submitPersonName: '', //审核人
				alarmId: '', //告警Id
				description: '', //描述
				files: null, //文件
			},
			formRules: {
				auditorName: [{ required: true, message: '请选择审核人', trigger: 'blur' }],
			},
			auditorLists: [
				{
					userId: '',
					userName: '',
				},
			],
		};
	},
	props: {
		alarmItem: {
			type: Object,
			default: () => {
				return {};
			},
		},
	},

	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.form.workOrderName = this.alarmItem.fdName + this.alarmItem.alarmName;
			this.form.channelId = this.alarmItem.channelId;
			this.form.fdId = this.alarmItem.fdId;
			this.form.alarmId = this.alarmItem.alarmId;
			this.getAuditor();
		},
		//获取审核人
		getAuditor() {
			const params = {
				submitRight: 1,
			};
			this.axios.getUserWithSubmitRight(params).then((res) => {
				this.auditorLists = res.data.content;
			});
		},
		//选择审核人
		selectAuditorClick(auditor) {
			this.form.auditor_text = auditor.userName;
			this.form.auditor = auditor.userId;
			this.form.auditorName = auditor.userName;
			this.form.submitPerson = auditor.userId;
			this.form.submitPersonName = auditor.userName;
		},
		clearExceptAlarm() {
			this.form.auditor_text = '';
			this.form.auditor = '';
			this.form.auditorName = '';
			this.form.submitPerson = '';
			this.form.submitPersonName = '';
			this.form.description = '';
			if (this.form.files) {
				this.$refs.upload.clearFiles();
				this.form.files = null;
			}
		},
		//误报
		misReport() {
			this.$emit('misReport', this.alarmItem.alarmId);
			this.closeDialog();
		},
		//提交上报
		handleSubmit() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					this.$emit('handleSubmit', this.form);
					this.closeDialog();
				}
			});
		},

		//关闭视图
		closeDialog() {
			this.clearExceptAlarm();
			this.$emit('closeDialog');
		},

		fileUpload(f) {
			// console.log('file:',URL.createObjectURL(f.file));
			const file = f.file,
				fileType = file.type,
				isLt = file.size / 1024 / 1024 < 2;
			const typeLists = ['image/png', 'image/gif', 'image/jpg', 'image/jpeg'];

			if (!isLt) {
				f.onError();
				return this.$message({
					message: '图片大小请小于2M',
					type: 'error',
				});
			} else if (!typeLists.includes(fileType)) {
				f.onError();
				return this.$message({
					message: '请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片',
					type: 'error',
				});
			} else {
				// console.log('图片的url：', URL.createObjectURL(f.file));
				this.form.files = f.file;
			}
		},

		// 文件超出个数限制时的钩子
		handleExceed(files, fileList) {
			// console.log('上传中...', files, fileList);
		},
		// 文件列表移除文件时的钩子
		handleRemove(file, fileList) {
			// console.log(file, fileList);
		},
	},
};
</script>
<style lang="less">
#repairDialog {
	.main {
		width: 620px;
		height: 530px;
		.content {
			padding: 0 60px;
			margin-top: 40px;
			.el-form-item__label {
				font-weight: bold;
			}
		}
	}
}
</style>
