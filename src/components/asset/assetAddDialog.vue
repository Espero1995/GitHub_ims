<template>
	<div id="assetAddDialog" class="dialogMask">
		<div class="main">
			<div class="header">
				<span>修改资产信息</span>
				<img src="@/assets/alarm/close.png" @click="closeDialog()" />
			</div>
			<div class="content">
				<el-form ref="form" :model="form" :rules="formRules" label-width="100px">
					<el-form-item label="设备名称：" prop="fdName">
						<el-input v-model="form.fdName" placeholder="请填写设备名称"></el-input>
					</el-form-item>
					<el-form-item label="资产类型：" prop="typeId">
						<el-select v-model="form.typeId" placeholder="请选择资产类型" style="width: 200px;">
							<el-option
								v-for="item in assetTypeLists"
								:key="item.typeId"
								:label="item.typeName"
								:value="item.typeId"
								@click.native="assetTypeSelect(item)"
							>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="行政区域：" prop="depId">
						<el-select v-model="form.depId" placeholder="请选择行政区域" style="width: 200px;">
							<el-option
								v-for="item in depTreeLists"
								:key="item.depId"
								:label="item.depname"
								:value="item.depId"
								@click.native="depTreeSelect(item)"
							>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="责任人：" prop="userId">
						<el-select v-model="form.userId" placeholder="请选择责任人" style="width: 200px;">
							<el-option
								v-for="item in auditorLists"
								:key="item.userId"
								:label="item.userName"
								:value="item.userId"
								@click.native="auditorSelect(item)"
							>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="序列号：" prop="serialNo">
						<el-input v-model="form.serialNo" placeholder="请填写设备序列号" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="采购时间：" prop="buyDate">
						<el-date-picker v-model="form.buyDate" type="date" placeholder="选择采购日期" style="width: 200px;"> </el-date-picker>
					</el-form-item>
					<el-form-item label="质保时间：" prop="qualityDate">
						<el-date-picker v-model="form.qualityDate" type="date" placeholder="选择质保日期" style="width: 200px;"> </el-date-picker>
					</el-form-item>
					<el-form-item label="安装时间：" prop="installDate">
						<el-date-picker v-model="form.installDate" type="date" placeholder="选择安装时间" style="width: 200px;"> </el-date-picker>
					</el-form-item>
					<el-form-item label="设备型号：" prop="model">
						<el-input v-model="form.model" placeholder="请填写设备型号"></el-input>
					</el-form-item>
					<el-form-item label="设备厂商：" prop="factoryName">
						<el-input v-model="form.factoryName" placeholder="请填写设备厂商"></el-input>
					</el-form-item>
					<el-form-item label="经度：" prop="longitude">
						<el-input v-model="form.longitude" placeholder="请填写经度"></el-input>
					</el-form-item>
					<el-form-item label="纬度：" prop="latitude">
						<el-input v-model="form.latitude" placeholder="请填写纬度"></el-input>
					</el-form-item>
					<el-form-item label="工程商：" prop="engineer">
						<el-input v-model="form.engineer" placeholder="请填写工程商"></el-input>
					</el-form-item>
					<el-form-item label="使用寿命(年)：" prop="life" label-width="120px">
						<el-input v-model="form.life" placeholder="请填写使用寿命" style="width: 200px;"></el-input>
					</el-form-item>
					<div></div>
					<el-form-item label="备注：" prop="remark" label-width="110px">
						<el-input type="textarea" v-model="form.remark" placeholder="请填写备注" style="width: 500px;"></el-input>
					</el-form-item>
					<el-divider></el-divider>
					<el-form-item label="ip地址：" prop="ipAddress">
						<el-input v-model="form.ipAddress" placeholder="请填写IP地址"></el-input>
					</el-form-item>
					<el-form-item label="端口号：" prop="ipPort">
						<el-input v-model="form.ipPort" placeholder="请填写端口号"></el-input>
					</el-form-item>
					<el-form-item label="账号：" prop="account">
						<el-input v-model="form.account" placeholder="请填写账号"></el-input>
					</el-form-item>
					<el-form-item label="密码：" prop="pwd">
						<el-input v-model="form.pwd" placeholder="请填写密码" show-password></el-input>
					</el-form-item>
					<el-form-item label="设备编码：" prop="fdId">
						<el-input v-model="form.fdId" placeholder="请填写设备编码" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="视频通道数：" prop="videoInNum">
						<el-input v-model="form.videoInNum" placeholder="视频通道数" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="设备类型：" prop="fdType">
						<el-select v-model="form.fdType" placeholder="请选择资产类型" style="width: 200px;">
							<el-option v-for="item in deviceType" :key="item.value" :label="item.title" :value="item.value" @click.native="fdTypeSelect(item)">
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
	</div>
</template>
<script>
import { formatDate } from '@/utils/utils';
export default {
	name: 'assetAddDialog',
	components: {},
	props: {
		assetItem: {
			type: Object,
			default: () => {
				return {};
			},
		},
	},
	data() {
		return {
			form: {
				fdName: '', //设备名
				typeId: '', //资产ID
				typeName: '', //资产名
				type: 1, //资产类型
				depId: '', //行政区域号
				depname: '', //行政区域名
				userId: '', //userId
				serialNo: '', //序列号 disabled
				buyDate: '', //采购时间
				qualityDate: '', //质保时间
				installDate: '', //安装时间
				model: '', //设备型号 disabled
				factoryName: '', //设备厂商
				engineer: '', //工程商
				longitude: '', //经度
				latitude: '', //纬度
				life: '', //使用寿命
				remark: '', //备注
				ipAddress: '', //IP地址
				ipPort: '', //端口号
				account: '', //账号
				pwd: '', //密码
				fdId: '', //设备编码 disabled
				videoInNum: '', // 视频通道数 disabled
				fdType: '', //设备类型
			},
			formRules: {
				fdName: [{ required: true, message: '请填写设备名称', trigger: 'blur' }],
				depId: [{ required: true, message: '请选择行政区域', trigger: 'blur' }],
				installDate: [{ required: true, message: '请选择安装时间', trigger: 'blur' }],
				life: [{ required: true, message: '请填写使用寿命', trigger: 'blur' }],
				ipAddress: [{ required: true, message: '请填写IP地址', trigger: 'blur' }],
				ipPort: [{ required: true, message: '请填写端口号', trigger: 'blur' }],
				account: [{ required: true, message: '请填写账号', trigger: 'blur' }],
				pwd: [{ required: true, message: '请填写密码', trigger: 'blur' }],
			},
			assetTypeLists: [
				{
					typeId: 0,
					typeName: '',
					type: 0,
				},
			],
			depTreeLists: [
				{
					depId: '',
					depname: '',
				},
			],
			auditorLists: [
				{
					userId: '',
					userName: '',
				},
			],
			deviceType: this.$v.deviceType,
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.assignAssetItems();
			this.getAssetsType();
			this.getMonitorDepTree();
			this.getAuditor();
		},
		assignAssetItems() {
			this.form.fdName = this.assetItem.fdName ? this.assetItem.fdName : '';
			this.form.typeId = this.assetItem.typeId ? this.assetItem.typeId : '';
			this.form.typeName = this.assetItem.typeName ? this.assetItem.typeName : '';
			this.form.type = this.assetItem.type ? this.assetItem.type : 1;
			this.form.depId = this.assetItem.depId ? this.assetItem.depId : '';
			this.form.depname = this.assetItem.depName ? this.assetItem.depName : '';
			this.form.userId = this.assetItem.userId ? this.assetItem.userId : '';
			this.form.serialNo = this.assetItem.serialNo ? this.assetItem.serialNo : '';
			if (this.assetItem.buyDate) {
				this.form.buyDate = new Date(this.assetItem.buyDate);
			}
			if (this.assetItem.qualityDate) {
				this.form.qualityDate = new Date(this.assetItem.qualityDate);
			}
			if (this.assetItem.installDate) {
				this.form.installDate = new Date(this.assetItem.installDate);
			}
			this.form.model = this.assetItem.model ? this.assetItem.model : '';
			this.form.factoryName = this.assetItem.factoryName ? this.assetItem.factoryName : '';
			this.form.engineer = this.assetItem.engineer ? this.assetItem.engineer : '';
			this.form.longitude = this.assetItem.longitude ? this.assetItem.longitude : '';
			this.form.latitude = this.assetItem.latitude ? this.assetItem.latitude : '';
			this.form.life = this.assetItem.life ? this.assetItem.life : '';
			this.form.remark = this.assetItem.remark ? this.assetItem.remark : '';
			this.form.ipAddress = this.assetItem.ipAddress ? this.assetItem.ipAddress : '';
			this.form.ipPort = this.assetItem.ipPort ? this.assetItem.ipPort : '';
			this.form.account = this.assetItem.account ? this.assetItem.account : '';
			this.form.pwd = this.assetItem.pwd ? this.assetItem.pwd : '';
			this.form.fdId = this.assetItem.fdId ? this.assetItem.fdId : '';
			this.form.videoInNum = this.assetItem.videoInNum ? this.assetItem.videoInNum : '';
			this.form.fdType = this.assetItem.fdType ? this.assetItem.fdType : '';
		},
		//资产类型
		getAssetsType() {
			this.axios.getAssetsType().then((res) => {
				this.assetTypeLists = [];
				let lists = res.data.content;
				for (let i = 0; i < lists.length; i++) {
					let el = { typeId: 0, typeName: '' };
					el.typeId = lists[i].id;
					el.typeName = lists[i].name;
					el.type = lists[i].type;
					this.assetTypeLists.push(el);
				}
			});
		},
		//行政区域
		getMonitorDepTree() {
			this.axios.getMonitorDepTree().then((res) => {
				const lists = res.data.content;
				this.depTreeLists = [];
				for (let i = 0; i < lists.length; i++) {
					const el = lists[i];
					el.depname = lists[i].depname;
					el.depId = lists[i].depid;
					this.depTreeLists.push(el);
				}
			});
		},
		//获取责任人
		getAuditor() {
			const params = {
				submitRight: 1,
			};
			this.axios.getUserWithSubmitRight(params).then((res) => {
				const lists = res.data.content;
				this.auditorLists = [];
				for (let i = 0; i < lists.length; i++) {
					const el = lists[i];
					el.userId = lists[i].userId;
					el.userName = lists[i].userName;
					this.auditorLists.push(el);
				}
			});
		},
		handleSubmit() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					if (this.form.qualityDate) {
						this.form.qualityDate = formatDate(this.form.qualityDate, 'yyyy-MM-dd');
					}
					if (this.form.buyDate) {
						this.form.buyDate = formatDate(this.form.buyDate, 'yyyy-MM-dd');
					}
					if (this.form.installDate) {
						this.form.installDate = formatDate(this.form.installDate, 'yyyy-MM-dd');
					}
					this.$emit('updateAssets', this.form);
					this.$emit('closeDialog');
				}
			});
		},
		closeDialog() {
			this.$emit('closeDialog');
		},
		//资产类型选择
		assetTypeSelect(item) {
			this.form.type = item.type;
			this.form.typeId = item.typeId;
			this.form.typeName = item.typeName;
		},
		//行政区域选择
		depTreeSelect(item) {
			this.form.depId = item.depId;
			this.form.depname = item.depname;
		},
		//责任人选择
		auditorSelect(item) {
			this.form.userId = item.userId;
			this.form.userName = item.userName;
		},
		//设备类型
		fdTypeSelect(item) {
			this.form.fdType = item.value;
		},
	},
};
</script>
<style lang="less">
#assetAddDialog {
	.main {
		width: 720px;
		height: 870px;
		.content {
			padding: 0 50px;
			box-sizing: border-box;
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
				.el-divider--horizontal {
					margin: 0 0 15px 0;
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
