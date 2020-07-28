<template>
	<div id="monitorRate" class="webs">
		<div class="slotHeader"><span style="cursor: pointer;" @click="backClick">监控管理</span> / 视频质量</div>
		<div class="slotOptions">
			<div class="inputs">
				<span>检测日期: </span>
				<el-date-picker v-model="dateTime" type="date" placeholder="请输入日期"> </el-date-picker>
			</div>
			<div class="inputs">
				<span>通道名称: </span>
				<el-input v-model="search.channelName" placeholder="请输入通道名称"></el-input>
			</div>
			<div class="inputs">
				<span>视频质量: </span>
				<el-select v-model="search.status">
					<el-option v-for="status in statusList" :key="status.title" :label="status.title" :value="status.value"> </el-option>
				</el-select>
			</div>
			<div class="inputs">
				<span>行政区域: </span>
				<el-select v-model="search.depId">
					<el-option v-for="dep in depList" :key="dep.depname" :label="dep.depname" :value="dep.depid"> </el-option>
				</el-select>
			</div>
			<div class="buttons">
				<el-button icon="el-icon-upload" type="success" @click="exportAllData">导出</el-button>
				<el-button icon="el-icon-search" type="primary" @click="query">查询</el-button>
				<el-button icon="el-icon-refresh-right" @click="resetsearch">重置</el-button>
			</div>
		</div>
		<div class="slotMain">
			<div class="slotTables">
				<el-table border :data="tableData" style="width: 100%;">
					<el-table-column align="center" prop="depName" label="行政区域"> </el-table-column>
					<el-table-column align="center" prop="channelName" label="通道名称"> </el-table-column>
					<el-table-column align="center" prop="isOnline" label="是否在线">
						<template slot-scope="scope">
							<div>
								{{ $v.isOnline(scope.row.isOnline) }}
							</div>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="isPlayFailure" label="是否播放失败">
						<template slot-scope="scope">
							<div>
								{{ $v.isPlayFailure(scope.row.isPlayFailure) }}
							</div>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="state" label="视频质量">
						<template slot-scope="scope">
							<div :class="videoStateCalss(scope.row.state)">
								{{ $v.videoState(scope.row.state) }}
							</div>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="createDate" label="检测时间">
						<template slot-scope="scope">
							<div>
								{{ $day(scope.row.createDate).format('YYYY-MM-DD HH:mm:ss') }}
							</div>
						</template>
					</el-table-column>
					<el-table-column align="center" label="图片">
						<template slot-scope="scope">
							<div>
								<img style="cursor: pointer;" :src="pictureIcon" @click="clickImage(scope.row)" />
							</div>
						</template>
					</el-table-column>
					<el-table-column align="center" label="视频">
						<template slot-scope="scope">
							<div>
								<img style="cursor: pointer;" :src="filmIcon" @click="clickfil(scope.row)" />
							</div>
						</template>
					</el-table-column>
					<el-table-column align="center" label="操作">
						<template slot-scope="scope">
							<div style="display: flex; justify-content: center; align-items: center; font-size: 12px; line-height: 18px;">
								<el-button v-if="scope.row.maintainStatus == 1" type="text" @click="repair(scope.$index, scope.row)">报修</el-button>
								<div v-else style="margin-right: 12px;">{{ $v.operationStatus(scope.row.maintainStatus) }}</div>
								<el-button type="text" @click="detail(scope.$index, scope.row)">详情</el-button>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="slotPagination">
				<el-pagination
					background
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="pageNav.page"
					:page-sizes="[25, 50, 100, 200]"
					:page-size="pageNav.pageSize"
					layout="sizes, prev, pager, next,total, jumper"
					:total="pageNav.total"
				>
				</el-pagination>
			</div>
		</div>
		<el-dialog title="视频质量" class="detailDialog dialog" :visible.sync="detailDialog.show" :modal-append-to-body="false" width="30%" center>
			<videoCard :item="detailDialog.el" />
			<span slot="footer" class="dialog-footer">
				<el-button class="focusButton" @click="detailDialog.show = false">关闭</el-button>
			</span>
		</el-dialog>
		<el-dialog
			title="添加报修信息"
			:destroy-on-close="true"
			class="repairDialog dialog"
			:visible.sync="repairDialog.show"
			:modal-append-to-body="false"
			width="30%"
			center
		>
			<el-form ref="form" :model="repairDialog.form" label-width="80px">
				<el-form-item label="工单名称">
					<el-input v-model="repairDialog.form.workOrderName"></el-input>
				</el-form-item>
				<el-form-item label="审核人">
					<el-select v-model="repairDialog.form.auditor" placeholder="请选择活动区域">
						<el-option v-for="auditor of auditors" :key="auditor.userId" :label="auditor.userName" :value="auditor.userId"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="上传图片">
					<el-upload class="avatar-uploader" action="none" :show-file-list="false" :http-request="fileUpload">
						<img v-if="repairDialog.imageUrl" :src="repairDialog.imageUrl" class="avatar" />
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="说明"
					><el-input type="textarea" placeholder="请输入内容" v-model="repairDialog.form.description"> </el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button class="focusButton" @click="handelRepair">提交</el-button>
				<el-button @click="repairDialog.show = false">关闭</el-button>
			</span>
		</el-dialog>
		<el-dialog title="图片查看" class="dialog" :visible.sync="showImage.show" :modal-append-to-body="false" width="30%" center>
			<jwimage v-if="showImage.el" :viewer="true" :src="showImage.url" />
			<div v-else>暂无图片</div>
			<span slot="footer" class="dialog-footer">
				<el-button class="focusButton" @click="showImage.show = false">关闭</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import jwimage from '_c/image.vue';
import pictureIcon from '_a/icon/picture.png';
import filmIcon from '_a/icon/film.png';
import mixinPages from '@/mixin/pages';
import { dataConvTime, getUser } from '@/utils/utils';
import videoCard from '_c/videoCard';
export default {
	name: 'monitorRate',
	components: { videoCard, jwimage },
	mixins: [mixinPages],
	data() {
		return {
			pictureIcon,
			filmIcon,
			dateTime: '',
			search: {
				beginTime: '',
				endTime: '',
				channelName: '',
				status: -1,
				depId: '',
			},
			statusList: this.$v.statusList,
			tableData: [],
			depList: [],
			detailDialog: {
				show: false,
				el: {},
			},
			repairDialog: {
				show: false,
				el: {},
				form: {
					files: null,
					description: '',
					workOrderName: '',
					auditor: '',
					auditor_text: '',
					auditorName: '',
					channelId: '',
					fdId: '',
					sourceFrom: '',
					submitPerson: '',
					submitPersonName: '',
					stateId: '',
				},
				imageUrl: '',
			},
			showImage: {
				show: false,
				el: '',
				url: '',
			},

			auditors: [],
		};
	},
	mounted() {
		this.init();
	},
	watch: {
		'$route.query': {
			handler: function (value) {
				this.init();
			},
		},
	},
	methods: {
		init() {
			this.checkRouteQuery();
			this.getData();
			this.getMonitorDepTree();
			this.getUserWidthSubmitRight();
		},
		checkRouteQuery() {
			if (this.$route.query) {
				const data = this.$route.query;
				if (data.date) {
					this.dateTime = new Date(parseInt(this.$route.query.date));
				} else {
					this.dateTime = '';
				}
				if (data.status) {
					this.search.status = parseInt(data.status);
				} else {
					this.search.status = 0;
				}
				if (data.depId) {
					this.search.depId = data.depId;
				} else {
					this.search.depId = '';
				}
			} else {
			}
		},
		getData() {
			this.query();
		},
		getMonitorDepTree() {
			this.axios.getMonitorDepTree().then((res) => {
				const lists = res.data.content;
				this.depList = lists;
			});
		},
		getUserWidthSubmitRight() {
			const submitRight = 1;
			this.axios.getUserWidthSubmitRight(submitRight).then((res) => {
				this.auditors = res.data.content;
			});
		},
		videoStateCalss(state) {
			switch (state) {
				case 0:
					return 'state-error';
				case 10:
					return 'state-info';
				case 2:
					return 'state-success';
				default:
					return 'state-unknown';
			}
		},
		fileUpload(files) {
			this.repairDialog.form.files = files.file;
			if (files.file.type.includes('image')) {
				this.repairDialog.imageUrl = URL.createObjectURL(files.file);
			}
		},
		query() {
			const time = dataConvTime(this.dateTime);
			this.search.beginTime = time.startDate;
			this.search.endTime = time.endDate;
			const params = { ...this.search };
			params.page = this.pageNav.page;
			params.pageSize = this.pageNav.pageSize;
			this.axios.getNewsVideoList(params).then((res) => {
				this.pageNav.total = res.data.total;
				this.tableData = res.data.rows;
			});
		},
		clickImage(item) {
			this.showImage.show = true;
			this.showImage.el = item.url;
			this.showImage.url = window.location.origin + '/ims/pc/DailyCheck/getPicture?url=' + item.url;
		},
		initAndLoginOCX: function () {
			if (window.ActiveXObject || 'ActiveXObject' in window) {
				this.axios.getConfig().then((res) => {
					if (res.retCode == 399) {
						window.location.href = '';
					}
					const data = res.content;
					const loginVal = ocx.Login(data.uasIp, data.port, data.username, data.pwd);
					if (loginVal !== 0) {
						alert('ocx登陆失败');
					}
				});
				this.initPage();
			}
		},
		clickfil(item) {
			if (!!window.ActiveXObject || 'ActiveXObject' in window) {
				this.initAndLoginOCX();
				try {
					const rs = ocx.StartMonitor(item.fdId, item.channelId);
					if (rs == -1) {
						alert('关联视频失败！');
					}
				} catch (e) {
					alert('请检查IE设置或者ocx控件控件是否安装');
				}
			} else {
				alert('该功能需要使用IE浏览器');
			}
		},
		repair(index, row) {
			this.repairDialog.el = row;
			// this.repairDialog.form = { ...this.$options.data().repairDialog.form };
			this.repairDialog.imageUrl = null;
			this.repairDialog.form.workOrderName = `${row.channelName} 视频质量异常`;
			this.repairDialog.form.channelId = row.channelId;
			this.repairDialog.form.fdId = row.fdId;
			this.repairDialog.form.stateId = row.stateId;
			this.repairDialog.show = true;
		},
		handelRepair() {
			const params = this.repairDialog.form;
			const el = this.repairDialog.el;
			const user = getUser();
			const auditor = this.auditors.find((el) => el.userId == params.auditor);
			params.channelId = el.channelId;
			params.fdId = el.fdId;
			params.sourceFrom = 2;
			params.submitPerson = user.userId;
			params.submitPersonName = user.userName;
			params.stateId = el.stateId;
			params.auditorName = auditor.userName;
			params.auditor_text = auditor.userName;
			this.axios.repair(params).then((res) => {
				this.$message.success('报修成功');
				this.repairDialog.show = false;
				this.query();
			});
		},
		detail(index, row) {
			//操作详情点击事件
			this.detailDialog.show = true;
			this.detailDialog.el = row;
		},
		exportAllData() {
			//导出所有
		},
		resetsearch() {
			//重置
			this.search = { ...this.$options.data().search };
			this.dateTime = '';
			this.$message({
				message: '已重置',
			});
			this.query();
		},
		backClick() {
			// this.$router.replace({ name: 'monitorVideo' });
			this.$router.replace(`monitor/monitorVideo`);
		},
		handleSizeChange(val) {
			this.pageNav.pageSize = val;
			this.query();
		},
		handleCurrentChange(value) {
			//page换页操作
			this.pageNav.page = value;
			this.query();
		},
	},
};
</script>
<style lang="less">
#monitorRate {
	width: 100%;
	height: 100%;
	position: relative;
	background-color: white;
	.state-error {
		color: #ff320a;
	}
	.state-info {
		color: #f4b201;
	}
	.state-success {
		color: #0ec709;
	}
	.state-unknown {
		color: #bbbbbb;
	}
}
.avatar-uploader {
	.el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	.el-upload:hover {
		border-color: #409eff;
	}
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
}

.detailDialog {
}
.repairDialog {
}
</style>
