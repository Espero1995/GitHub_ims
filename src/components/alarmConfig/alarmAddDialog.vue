<template>
	<div id="alarmAddDialog" class="dialogMask">
		<div class="main">
			<div class="header">
				<span>添加设备告警</span>
				<img src="@/assets/alarm/close.png" @click="closeDialog()" />
			</div>
			<div class="content">
				<el-form ref="form" :model="form" :rules="formRules" label-width="100px">
					<el-form-item label="告警名称：" prop="alarmConfigName">
						<el-input v-model="form.alarmConfigName" placeholder="请填写告警名称"></el-input>
					</el-form-item>
					<el-form-item label="告警类型：" prop="alarmCode">
						<el-select v-model="form.alarmCode" placeholder="请选择告警类型" style="width: 200px;">
							<el-option v-for="alarmItem in alarmCodeLists" :key="alarmItem.alarmCode" :label="alarmItem.alarmName" :value="alarmItem.alarmCode">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="设备：" prop="fdId">
						<div class="input-button" @click="selectDevChooseDialog">
							<span>{{ form.fdId ? form.fdId : '请选择设备' }}</span>
						</div>
					</el-form-item>

					<el-form-item label="通道号：" prop="channelId">
						<el-input v-model="form.channelId" :disabled="true"></el-input>
					</el-form-item>
					<!-- effectLists -->
					<el-form-item label="是否启用：" prop="ineffect">
						<el-select v-model="form.ineffect" style="width: 200px;">
							<el-option v-for="effectItem in effectLists" :key="effectItem.ineffect" :label="effectItem.title" :value="effectItem.ineffect">
							</el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</div>
			<div class="bottom">
				<el-button type="primary" size="small" @click="handleSubmit">保存</el-button>
				<el-button size="small" @click="closeDialog">取消</el-button>
			</div>
		</div>
		<devChooseDialog v-if="isDevChooseDialogShow" @closeDialog="closeDevChooseDialog" @selectDevClick="selectDevClick"></devChooseDialog>
	</div>
</template>
<script>
import devChooseDialog from '_c/alarmConfig/devChooseDialog.vue';
export default {
	name: 'alarmAddDialog',
	components: { devChooseDialog },
	props: {
		alarmConfigItem: {
			type: Object,
			default: () => {
				return {};
			},
		},
	},
	data() {
		return {
			form: {
				alarmConfigName: '',
				alarmCode: '',
				fdId: '',
				channelId: '',
				ineffect: 1,
				configEmail: 0,
				configWall: 0,
			},
			formRules: {
				alarmConfigName: [{ required: true, message: '请填写告警名称', trigger: 'blur' }],
				alarmCode: [{ required: true, message: '请选择告警类型', trigger: 'blur' }],
			},
			alarmCodeLists: [
				{
					alarmCode: 0,
					alarmName: '',
				},
			],
			effectLists: [
				{
					title: '启用',
					ineffect: 1,
				},
				{
					title: '停用',
					ineffect: 0,
				},
			],
			isDevChooseDialogShow: false,
		};
	},
	mounted() {
		if (this.alarmConfigItem) {
			this.form.alarmConfigName = this.alarmConfigItem.alarmConfigName;
			this.form.alarmCode = this.alarmConfigItem.alarmCode;
			this.form.fdId = this.alarmConfigItem.fdId;
			this.form.channelId = this.alarmConfigItem.channelId;
			this.form.ineffect = this.alarmConfigItem.ineffect;
		}
		this.init();
	},
	methods: {
		init() {
			this.getAlarmCode();
		},
		//获取告警编码
		getAlarmCode() {
			const params = {
				type: 12,
			};
			this.axios.getAlarmCode(params).then((res) => {
				this.alarmCodeLists = res.data.content;
			});
		},

		handleSubmit() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					if (this.alarmConfigItem) {
						this.$emit('updateAlarmConfig', this.form, this.alarmConfigItem.alarmConfigId);
					} else {
						this.$emit('insertAlarmConfig', this.form);
					}
				}
			});
		},
		closeDialog() {
			this.$emit('closeDialog');
		},

		// 选择设备列表的点击事件
		selectDevChooseDialog() {
			this.isDevChooseDialogShow = true;
		},

		//选择设备列表的弹框消失
		closeDevChooseDialog() {
			this.isDevChooseDialogShow = false;
		},
		//选择设备点击事件回调
		selectDevClick(devItem) {
			this.form.channelId = devItem.channelId;
			this.form.fdId = devItem.fdId;
			this.closeDevChooseDialog();
		},
	},
};
</script>
<style lang="less">
#alarmAddDialog {
	.main {
		width: 750px;
		height: 280px;
		.content {
			padding: 0 50px;
			margin-top: 15px;
			.el-form {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.el-form-item {
					width: 300px;
				}
				.el-form-item__label {
					font-weight: bold;
				}
			}
			.input-button {
				cursor: pointer;
				background-color: #f5f7fa;
				padding: 0 15px;
				box-sizing: border-box;
				width: 200px;
				height: 40px;
				border: 1px solid #e4e7ed;
				border-radius: 5px;
				color: #c9cdd4;
				font-size: 15px;
				line-height: 40px;
			}
		}
	}
}
</style>
