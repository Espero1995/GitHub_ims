<template>
	<div id="propertyManagement">
		<div id="videoTop" class="clearfix" style="position: relative; height: 420px;">
			<div class="col-xs-6" style="height: 100%; background-color: white;">
				<div class="panel-bootstrap" style="height: 100%; border: 0; position: relative;">
					<div class="col-md-12 echarts">
						<pieChart
							:column="Assets.column"
							:value="Assets.value"
							:color="Assets.color"
							:orientation="Assets.orientation"
							@echartClick="assetIntegrityRateClick"
							>资产完好率</pieChart
						>
					</div>
				</div>
			</div>

			<div class="col-xs-6" style="height: 100%; background-color: white;">
				<div class="panel-bootstrap" style="height: 100%; border: 0; position: relative;">
					<div class="col-md-12 echarts">
						<pieChart
							:column="ServiceOverFive.column"
							:value="ServiceOverFive.value"
							:color="ServiceOverFive.color"
							:orientation="ServiceOverFive.orientation"
							@echartClick="serviceOverFiveClick"
							>维修超过5次</pieChart
						>
					</div>
				</div>
			</div>
			<div style="width: 1%; height: 94%; border-right: 1px solid #efefef; position: absolute; left: 49%; margin-left: 0px; top: 20px;" id="border"></div>
		</div>
		<!-- 超过使用寿命 -->
		<div id="videoBottom" style="margin: 20px 0 0 0; height: 440px;" class="clearfix">
			<div class="col-xs-6 no-padding-right" style="height: 100%; background-color: white;">
				<div class="panel-bootstrap" style="height: 100%;">
					<div class="col-md-12">
						<pieChart
							:column="ServiceLife.column"
							:value="ServiceLife.value"
							:color="ServiceLife.color"
							:orientation="ServiceLife.orientation"
							@echartClick="serviceLifeClick"
							>超过使用寿命(年)</pieChart
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import pieChart from '_c/pieChart';
export default {
	name: 'propertyManagement',
	components: {
		pieChart,
	},
	props: {
		depid: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			Assets: {
				column: ['正常:0', '维修中:0 '],
				value: [0, 0],
				color: ['#22bd9e', '#f44d3e'],
				orientation: { left: 'center', top: 'bottom', orient: 'horizontal' },
			},
			ServiceOverFive: {
				column: ['正常:0', '超过:0'],
				value: [0, 0],
				color: ['#22bd9e', '#f44d3e'],
				orientation: { left: 'center', top: 'bottom', orient: 'horizontal' },
			},
			ServiceLife: {
				column: ['正常:0', '超过:0'],
				value: [0, 0],
				color: ['#22bd9e', '#f44d3e'],
				orientation: { left: 'center', top: 'bottom', orient: 'horizontal' },
			},
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
	},
	mounted() {
		// this.init();
	},
	methods: {
		init() {
			this.assetOkRate();
			this.repairRate();
			this.overLife();
		},

		//资产完好率
		assetOkRate() {
			const params = {
				depId: this.getDepid,
			};
			this.axios.assetOkRate(params).then((res) => {
				let content = res.data.content;
				let okCount = content.okCount;
				let brokenCount = content.brokenCount;
				this.Assets.column = [`正常:${okCount}`, `维修中:${brokenCount}`];
				this.Assets.value = [okCount, brokenCount];
			});
		},
		//维修超过5次
		repairRate() {
			const params = {
				depId: this.depid,
				year: this.$day().year(),
			};
			this.axios.repairRate(params).then((res) => {
				let content = res.data.content;
				let okCount = content.okCount;
				let brokenCount = content.brokenCount;
				this.ServiceOverFive.column = [`正常:${okCount}`, `超过:${brokenCount}`];
				this.ServiceOverFive.value = [okCount, brokenCount];
			});
		},
		//超过使用寿命（年）
		overLife() {
			const params = {
				depId: this.depid,
			};
			this.axios.overLife(params).then((res) => {
				let content = res.data.content;
				let okCount = content.okCount;
				let brokenCount = content.brokenCount;
				this.ServiceLife.column = [`正常:${okCount}`, `超过:${brokenCount}`];
				this.ServiceLife.value = [okCount, brokenCount];
			});
		},
		assetIntegrityRateClick(params) {
			let maintainStatus;
			if (params.name.indexOf('正常') != -1) {
				maintainStatus = 1;
			} else {
				maintainStatus = 2;
			}

			let depId = this.getDepid;
			// this.$router.push({ name: 'assetIntegrityRate', query: { maintainStatus, depId } });
			this.$router.push(`../assetIntegrityRate?maintainStatus=${maintainStatus}&depId=${depId}`);
		},
		serviceOverFiveClick(params) {
			let isFrqRepair;
			if (params.name.indexOf('正常') != -1) {
				isFrqRepair = 0;
			} else {
				isFrqRepair = 1;
			}

			let depId = this.getDepid;
			// this.$router.push({ name: 'serviceOverFive', query: { isFrqRepair, depId } });
			this.$router.push(`../serviceOverFive?isFrqRepair=${isFrqRepair}&depId=${depId}`);
		},
		serviceLifeClick(params) {
			let overLife;
			if (params.name.indexOf('正常') != -1) {
				overLife = 0;
			} else {
				overLife = 1;
			}
			let depId = this.getDepid;
			// this.$router.push({ name: 'serviceLife', query: { overLife, depId } });
			this.$router.push(`../serviceLife?overLife=${overLife}&depId=${depId}`);
		},
	},
};
</script>
<style lang="less">
#propertyManagement {
	background-color: #f2f2f2;
	width: 100%;
	height: 100%;
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
}
</style>
