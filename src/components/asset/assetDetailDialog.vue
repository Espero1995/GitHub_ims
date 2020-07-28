<template>
	<div id="assetDetailDialog" class="dialogMask">
		<div class="main">
			<div class="header">
				<span>资产详细信息</span>
				<img src="@/assets/alarm/close.png" @click="closeDialog" />
			</div>
			<div class="content">
				<el-form ref="form" :model="form" label-width="100px">
					<el-form-item label="设备名称：" prop="fdName">
						<el-input v-model="form.fdName" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="资产类型：" prop="typeName">
						<el-input v-model="form.typeName" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="行政区域：" prop="depName">
						<el-input v-model="form.depName" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="责任人：" prop="userName">
						<el-input v-model="form.userName" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="序列号：" prop="serialNo">
						<el-input v-model="form.serialNo" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="采购时间：" prop="buyDate">
						<el-input v-model="form.buyDate" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="质保时间：" prop="qualityDate">
						<el-input v-model="form.qualityDate" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="安装时间：" prop="installDate">
						<el-input v-model="form.installDate" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="设备型号：" prop="model">
						<el-input v-model="form.model" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="设备厂商：" prop="factoryName">
						<el-input v-model="form.factoryName" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="工程商：" prop="engineer">
						<el-input v-model="form.engineer" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="使用寿命(年)：" prop="life" label-width="120px">
						<el-input v-model="form.life" :disabled="true" style="width: 200px;"></el-input>
					</el-form-item>
					<div></div>
					<el-form-item label="ip地址：" prop="ipAddress">
						<el-input v-model="form.ipAddress" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="端口号：" prop="ipPort">
						<el-input v-model="form.ipPort" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="视频通道数：" prop="videoInNum">
						<el-input v-model="form.videoInNum" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="设备类型：" prop="fdTypeName">
						<el-input v-model="form.fdTypeName" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="资产图：" prop="imgUrl" label-width="110px">
						<img :src="form.imgUrl" v-if="isimgUrl" style="width: 150px; height: 150px;" />
						<span v-else>暂无图片</span>
					</el-form-item>
					<el-form-item label="" label-width="110px"> </el-form-item>
					<el-form-item label="备注：" prop="remark" label-width="110px">
						<el-input type="textarea" v-model="form.remark" :disabled="true" style="width: 500px;"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div class="bottom">
				<el-button size="small" @click="closeDialog">关闭</el-button>
			</div>
		</div>
	</div>
</template>
<script>
import { formatDate } from '@/utils/utils';
export default {
	name: 'assetDetailDialog',
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
				typeName: '', //资产名
				depName: '', //行政区域名
				userName: '', //责任人
				serialNo: '', //序列号
				buyDate: '', //采购时间
				qualityDate: '', //质保时间
				installDate: '', //安装时间
				model: '', //设备型号
				factoryName: '', //设备厂商
				engineer: '', //工程商
				life: '', //使用寿命
				ipAddress: '', //IP地址
				ipPort: '', //端口号
				videoInNum: '', // 视频通道数 disabled
				fdType: '', //设备类型
				fdTypeName: '', //设备类型
				remark: '', //备注
				imgUrl: '', //图片url
			},
			isimgUrl: false, //默认不存在
			imgUrl: '',
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.assignAssetItems();
		},
		assignAssetItems() {
			console.log('this.form:', this.form);
			this.form = this.assetItem;
			let deviceItem = this.$v.deviceType.find((el) => el.value == this.assetItem.fdType);
			this.form.fdTypeName = deviceItem.title;
			this.form.buyDate = this.formatDate(this.assetItem.buyDate);
			this.form.qualityDate = this.formatDate(this.assetItem.qualityDate);
			this.form.installDate = this.formatDate(this.assetItem.installDate);
			this.imgUrl = this.assetItem.imgUrl;
			console.log('window.location.origin:', window.location.origin);
			if (this.imgUrl != '') {
				this.isimgUrl = true;
				this.form.imgUrl = `${window.location.origin}/ims/pc/DailyCheck/getPicture?url=${this.imgUrl}`;
			} else {
				this.isimgUrl = false;
			}
			console.log('form.imgUrl?:', this.form.imgUrl);
		},
		closeDialog() {
			this.$emit('closeDialog');
		},
		formatDate(time) {
			if (time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd');
			}
		},
	},
};
</script>
<style lang="less">
#assetDetailDialog {
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
