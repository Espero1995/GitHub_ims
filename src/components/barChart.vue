<template>
	<div class="barChart indexCard">
		<div class="slotTitle">
			<slot :style="{ color: fontColor }"></slot>
		</div>
		<!-- <div class="slotMore">
			查看更多
		</div> -->
		<div class="slotMain">
			<div ref="chart" style="width: 80%; height: 100%; left: 50%; transform: translate(-50%);"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'barChart',
	props: {
		color: {
			type: Array,
			default: () => {
				return ['#4366f6'];
			},
		},
		fontColor: {
			type: String,
			default: '#000',
		},
		column: {
			type: Array,
			defualt: () => {
				return ['param1', 'param2', 'param3', 'param4', 'param5'];
			},
		},
		value: {
			type: Array,
			default: () => {
				return [];
			},
		},
	},
	data() {
		return {};
	},
	watch: {
		value(value) {
			this.init();
		},
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			const myChart = echarts.init(this.$refs.chart);
			const option = {
				color: this.color,
				tooltip: {
					trigger: 'item',
					formatter: '{b}: {c} ({a})',
				},
				grid: {
					left: '30px',
					width: '90%',
					height: '60%',
				},
				xAxis: [
					{
						type: 'category',
						axisTick: { show: false },
						axisLabel: {
							color: this.fontColor,
						},
						axisTick: {
							show: false,
						},
						data: this.column,
					},
				],
				yAxis: [
					{
						axisLabel: {
							color: this.fontColor,
						},
						axisTick: {
							show: false,
						},
						splitLine: {
							show: false,
						},
						type: 'value',
					},
				],
			};
			const series = [];
			const template = {
				// name: 'xxx',
				type: 'bar',
				barGap: 1,
				itemStyle: {
					barBorderRadius: 5,
				},
				data: [1, 2, 3, 4, 5, 6],
			};
			for (const value of this.value) {
				const el = { ...template };
				el.name = value.name;
				el.data = value.value;
				series.push(el);
			}
			option.series = series;
			myChart.setOption(option);
		},
	},
};
</script>

<style lang="less" scoped>
.barChart {
}
.indexCard {
	height: 100%;
	width: 100%;
	box-sizing: border-box;
	padding: 5px 30px;
	.slotTitle {
		font-size: 22px;
		color: #ff7402;
		margin-top: 20px;
		text-align: center;
	}
	.subTitle {
		position: absolute;
		color: #b0b0b0;
		margin-top: 35px;
		font-size: 15px;
		width: 200px;
	}
	.slotMore {
		float: right;
		font-size: 14px;
		color: #535353;
		cursor: pointer;
	}
	.slotMain {
		height: 100%;
		width: 100%;
	}
}
</style>
