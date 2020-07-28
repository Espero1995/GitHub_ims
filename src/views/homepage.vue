<template>
	<div class="about">
		<div class="slot-header"><span class="iconfont">应用管理</span></div>
		<el-card class="box-card">
			<el-row :gutter="0">
				<el-col :span="8">
					<div class="grid-content" @click="goto('monitor')">
						<img :src="monitorMgr" class="grid-pic-first" />
						<p class="grid_title">监控管理</p>
						<p class="grid_subtitle">监控实时数据，及时发现问题</p>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content" @click="goto('workOrder')">
						<el-divider direction="vertical" class="verticalLine"></el-divider>
						<img :src="workOrderMgr" class="grid-pic-other" />
						<p class="grid_title">工单管理</p>
						<p class="grid_subtitle">工单统一管理，提高效率</p>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content" @click="goto('alarm')">
						<el-divider direction="vertical" class="verticalLine"></el-divider>
						<img :src="alarmMgr" class="grid-pic-other" />
						<p class="grid_title">告警管理</p>
						<p class="grid_subtitle">告警管理，提醒用户存在异常</p>
					</div>
				</el-col>
			</el-row>
			<div class="horizontalLine"></div>
			<el-row :gutter="0">
				<el-col :span="8">
					<div class="grid-content" @click="goto('property')">
						<img :src="propertyMgr" class="grid-pic-first" />
						<p class="grid_title">资产管理</p>
						<p class="grid_subtitle">资产进行合理的管理，合理的分配</p>
					</div>
				</el-col>
				<el-col :span="16">
					<div class="grid-content-space">
						<el-divider direction="vertical" class="verticalLine"></el-divider>
					</div>
				</el-col>
			</el-row>
		</el-card>
		<div class="slot-header" style="margin-top: 30px;"><span class="iconfont">资产管理员</span></div>
		<el-card class="box-card">
			<el-row :gutter="0">
				<el-col :span="8">
					<div class="grid-content" @click="goto('setting')">
						<img :src="functionCofig" class="grid-pic-first" />
						<p class="grid_title">系统设置</p>
						<p class="grid_subtitle">系统设置,快速对系统进行配置</p>
					</div>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>

<script>
import functionCofig from '@/assets/homepage/functionCofig.png';
import monitorMgr from '@/assets/homepage/monitorMgr.png';
import propertyMgr from '@/assets/homepage/propertyMgr.png';
import workOrderMgr from '@/assets/homepage/workOrderMgr.png';
import alarmMgr from '@/assets/homepage/alarmMgr.png';

export default {
	name: 'TopHeader',
	components: {},
	data() {
		return {
			monitorMgr,
			workOrderMgr,
			alarmMgr,
			propertyMgr,
			functionCofig,
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		goto(path) {
			this.$router.push({
				name: path,
			});
		},
		init() {
			this.getUnDealCount();
		},
		//未处理告警数
		getUnDealCount() {
			this.axios.unDealCount().then((res) => {
				// console.log(res);
			});
		},
	},
};
</script>

<style lang="less">
//阴影
.el-card.is-always-shadow,
.el-card.is-hover-shadow:focus,
.el-card.is-hover-shadow:hover {
	box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.1);
}

.box-card {
	width: 100%;
	background-color: white;

	.el-card__body {
		padding: 0px 30px;
	}
	.el-row {
		margin-bottom: 0px;
	}

	.grid-content-space {
		min-height: 140px;
		display: flex;
		align-items: center;
	}

	.grid-content {
		cursor: pointer;
		min-height: 140px;
		display: flex;
		align-items: center;

		.grid-pic-first {
			margin-left: 20px;
		}

		.grid-pic-other {
			margin-left: 60px;
		}

		.grid_title {
			display: block;
			margin-left: 20px;
			color: #242424;
			font-weight: 400;
			font-size: 22px;
			margin-top: -20px;
		}

		.grid_subtitle {
			display: block;
			color: #949494;
			font-size: 16px;
			margin-bottom: -10px;
			margin-left: -87px;
		}
	}

	.horizontalLine {
		background-color: #f6f6f8;
		height: 2px;
		width: 100%;
	}

	.verticalLine {
		background-color: #f6f6f8;
		width: 2px;
		height: 70px;
		margin-top: 0px;
		margin-left: -5px;
	}
}
</style>
