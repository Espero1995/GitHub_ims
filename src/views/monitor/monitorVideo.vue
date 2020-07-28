<template>
	<div id="monitorVideo">
		<div id="videoTop" class="clearfix" style="position: relative; height: 420px;">
			<div class="col-xs-6" style="height: 100%; background-color: white;">
				<div class="panel-bootstrap" style="height: 100%; border: 0; position: relative;">
					<div class="videoTopDataSelect"><el-date-picker v-model="videoTopSelectDate" type="date" placeholder="选择日期"> </el-date-picker></div>
					<div class="col-md-12 echarts">
						<pieChart
							:column="VideoQualityData.column"
							:value="VideoQualityData.value"
							:color="VideoQualityData.color"
							:orientation="VideoQualityData.orientation"
							@echartClick="videoQualityAnalysis"
							subTitle="监控实时视频质量，分析其中的原因，及时解决问题"
							>视频质量分析</pieChart
						>
					</div>
				</div>
			</div>

			<div class="col-xs-6" style="height: 100%; background-color: white;">
				<div class="panel-line" style="height: 100%;">
					<div class="panel-left" style="height: 100%;">
						<div class="title">视频质量{{ qualityReportTitle }}</div>
						<el-select v-model="qualityReportDate">
							<el-option
								v-for="item in reportDateList"
								:key="item.index"
								:label="item.label"
								:value="item.index"
								@click.native="qualityReportClick(item)"
							>
							</el-option>
						</el-select>
						<el-divider direction="horizontal"></el-divider>
						<div class="line_content">
							<barChart
								:color="qualityReportData.color"
								:fontColor="qualityReportData.fontColor"
								:column="qualityReportData.column"
								:value="qualityReportData.value"
								>{{ qualityReportTitle }}</barChart
							>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="tabBottom webs">
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
				<div class="buttons">
					<el-button icon="el-icon-search" type="primary" @click="query">查询</el-button>
					<el-button icon="el-icon-refresh-right" @click="resetsearch">重置</el-button>
				</div>
			</div>
			<div class="slotMain">
				<div class="slotTables">
					<el-table border :data="tableData" style="width: 100%;">
						<el-table-column align="center" prop="depName" label="行政区域" v-if="getDepid === '0'"> </el-table-column>
						<el-table-column align="center" prop="depName" label="行政区域" v-else-if="getDepid === '-1'"> </el-table-column>
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
						:current-page="pageNav.pageNumber"
						:page-sizes="[13, 50, 100, 200]"
						:page-size="pageNav.maxPage"
						layout="sizes, prev, pager, next,total, jumper"
						:total="pageNav.total"
					>
					</el-pagination>
				</div>
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
import pieChart from '_c/pieChart';
import barChart from '_c/barChart';
//Table
import jwimage from '_c/image.vue';
import pictureIcon from '_a/icon/picture.png';
import filmIcon from '_a/icon/film.png';
import mixinPages from '@/mixin/pages';
import { dataConvTime, getUser } from '@/utils/utils';
import videoCard from '_c/videoCard';
export default {
	name: 'monitorVideo',
	components: {
		pieChart,
		barChart,
		videoCard,
		jwimage,
	},
	mixins: [mixinPages],
	props: {
		depid: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			qualityReportDate: '0',
			qualityReportTitle: '日报表',
			videoReportTitle: '日报表',
			qualityReportData: {},
			videoReportData: {},
			videoTopSelectDate: '', //视频质量分析日期诊断
			reportDateList: [
				{
					index: '0',
					label: '日报表',
				},
				{
					index: '1',
					label: '月报表',
				},
			],
			VideoQualityData: {
				column: ['正常:0', '视频丢失:0 ', '离线:0', '异常:0'],
				value: [0, 0, 0, 0],
				color: ['#22bd9e', '#ee9701', '#909399', '#f44d3e'],
				orientation: { left: 'center', top: 'bottom', orient: 'horizontal' },
			},
			reportMonthDate: {
				column: ['12月', '1月', '2月', '3月', '4月', '5月'],
				color: ['#22bd9e'],
				fontColor: '#333333',

				value: [
					{
						name: '月正常数',
						value: [15, 32, 23, 54, 85, 16],
					},
				],
			},
			reportDayData: {
				column: ['2020-05-19', '2020-05-20', '2020-05-21', '2020-05-22', '2020-05-23', '2020-05-24', '2020-05-25'],
				color: ['#22bd9e'],
				fontColor: '#333333',
				value: [
					{
						name: '日正常数',
						value: [32, 15, 32, 23, 54, 85, 16],
					},
				],
			},

			//table
			pictureIcon,
			filmIcon,
			dateTime: '',
			search: {
				beginTime: '',
				endTime: '',
				channelName: '',
				status: -1,
			},
			statusList: this.$v.statusList,
			tableData: [],
			pageNav: {
				page: 1,
				pageSize: 13,
				total: 0,
			},
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
	computed: {
		getDepid() {
			return this.depid || this.$route.query.depid || '';
		},
	},
	watch: {
		getDepid(value) {
			this.init();
		},
		videoTopSelectDate(value) {
			this.getDayOkRate();
		},
	},
	mounted() {},
	methods: {
		init() {
			this.getDayOkRate();
			this.qualityReportClick(this.reportDateList[parseInt(this.qualityReportDate)]);
			this.query();
			this.getUserWidthSubmitRight();
		},
		videoQualityAnalysis(item) {
			let status;
			if (item.name === this.VideoQualityData.column[0]) {
				status = 2;
			} else if (item.name === this.VideoQualityData.column[1]) {
				status = 10;
			} else if (item.name === this.VideoQualityData.column[2]) {
				status = 11;
			} else {
				status = 0;
			}

			const depId = this.depid;
			let date = '';
			if (this.videoTopSelectDate) {
				date = this.$day(this.videoTopSelectDate).valueOf();
				//table
				this.dateTime = new Date(date);
			}
			this.search.status = status;
			// this.$router.push({ name: 'monitorRate', query: { date, status, depId } }); //方案一,会报错(引导到了已存在的页面)
			// this.$router.push(`../monitorRate?date=${date}&status=${status}&depId=${depId}`);
			this.query();
		},
		//视频质量分析获取接口
		getDayOkRate() {
			const time = dataConvTime(this.videoTopSelectDate);
			const startDate = time.startDate;
			const endDate = time.endDate;
			let params = {};
			if (this.getDepid === '-1') {
				params = { startDate, endDate };
			} else {
				params = {
					depId: this.getDepid,
					startDate,
					endDate,
				};
			}
			this.axios.getDayOkRate(params).then((res) => {
				const data = res.data.content;
				const normalCount = data.normalCount;
				const videolostCount = data.videolostCount;
				const faultCount = data.faultCount;
				const offlineCount = data.offlineCount;
				this.VideoQualityData.column = [`正常:${normalCount}`, `视频丢失:${videolostCount}`, `离线:${offlineCount}`, `异常:${faultCount}`];
				this.VideoQualityData.value = [normalCount, videolostCount, offlineCount, faultCount];
			});
		},
		//日报表获取接口
		qualityReportClick(item) {
			console.log('报表：', item);
			if (item.index === '0') {
				this.qualityReportTitle = '日报表';
				const time = this.$day().format('YYYY-MM-DD HH:mm:ss');

				let params = {};
				if (this.getDepid === '-1') {
					params = {
						time,
						dayNum: -7,
					};
				} else {
					params = {
						depId: this.getDepid,
						time,
						dayNum: -7,
					};
				}

				this.axios.getWeekReport(params).then((res) => {
					const data = res.data.content.reverse();
					const column = [];
					const value = [];

					data.forEach((el) => {
						column.push(el.date);
						value.push(parseFloat(el.okRate.replace('%', '')));
					});
					this.reportDayData.column = column;
					this.reportDayData.value = [{ name: '日正常数', value }];
					this.qualityReportData = this.reportDayData;
				});
			} else {
				this.qualityReportTitle = '月报表';

				let params = {};
				if (this.getDepid === '-1') {
					params = {
						year: this.$day().year(),
					};
				} else {
					params = {
						depId: this.getDepid,
						year: this.$day().year(),
					};
				}

				this.axios.getMonthReport(params).then((res) => {
					const column = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
					const sums = { jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 };
					const data = res.data.rows;
					data.forEach((arr) => {
						column.forEach((col) => {
							sums[col] += parseFloat(arr[col] ? arr[col] : 0);
						});
					});
					const value = [];
					column.forEach((col) => {
						value.push(sums[col] / data.length);
					});
					this.reportMonthDate.column = column.map((el) => this.$v.month[el]);
					this.reportMonthDate.value = [
						{
							name: '月正常数',
							value,
						},
					];
					this.qualityReportData = this.reportMonthDate;
				});
			}
		},
		videoReportClick(item) {
			if (item.index === '0') {
				this.videoReportTitle = '日报表';
				this.videoReportData = this.reportDayData;
			} else {
				this.videoReportTitle = '月报表';
				this.videoReportData = this.reportMonthDate;
			}
		},

		//table
		query() {
			const time = dataConvTime(this.dateTime);
			this.search.beginTime = time.startDate;
			this.search.endTime = time.endDate;
			const params = { ...this.search };
			params.page = this.pageNav.page;
			params.pageSize = this.pageNav.pageSize;

			if (this.getDepid != '-1') {
				params.depId = this.getDepid;
			}

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
		detail(index, row) {
			//操作详情点击事件
			this.detailDialog.show = true;
			this.detailDialog.el = row;
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
		getUserWidthSubmitRight() {
			const submitRight = 1;
			this.axios.getUserWidthSubmitRight(submitRight).then((res) => {
				this.auditors = res.data.content;
			});
		},
		fileUpload(files) {
			this.repairDialog.form.files = files.file;
			if (files.file.type.includes('image')) {
				this.repairDialog.imageUrl = URL.createObjectURL(files.file);
			}
		},
		resetsearch() {
			//重置
			this.search.status = -1;
			this.search.channelName = '';
			this.dateTime = '';
			this.$message({
				message: '已重置',
			});
			this.query();
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
#monitorVideo {
	background-color: #f2f2f2;
	width: 100%;
	height: 100%;
	#videoTop {
		position: relative;
		.videoTopDataSelect {
			position: absolute;
			right: 10px;
			top: 10px;
			z-index: 10;
		}
	}
	.col-xs-6 {
		width: 50%;
		float: left;
		position: relative;
		min-height: 1px;
	}
	.panel-bootstrap {
		height: 100%;
		border: 0;
		position: relative;
		margin-bottom: 20px;
		border-radius: 4px;
		.col-md-12 {
			padding-top: 10px;
			height: 96%;
		}
	}

	.panel-line {
		width: 100%;
		display: flex;
		justify-content: space-between;

		.panel-left {
			background-color: white;
			width: 100%;
			position: relative;
		}
		.panel-right {
			background-color: white;
			width: 49.5%;
			position: relative;
		}
		.title {
			color: #616880;
			font-size: 18px;
			margin-left: 25px;
			margin-top: 13px;
		}
		.el-select {
			right: 20px;
			position: absolute;
			top: 10px;
		}
		.el-select .el-input .el-select__caret {
			line-height: 28px;
		}
		.el-input {
			width: 90px;
			height: 28px;
		}
		.el-input__inner {
			height: 28px;
			line-height: 28px;
		}
		.el-divider--horizontal {
			display: block;
			height: 1px;
			width: 100%;
			margin: 10px 0;
		}
		.line_content {
			width: 100%;
			height: 380px;
		}
	}
	.tabBottom {
		width: 100%;
		height: 650px;
		position: relative;
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
}
</style>
