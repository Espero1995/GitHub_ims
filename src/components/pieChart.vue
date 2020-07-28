<template>
	<div class="pieChart indexCard">
		<div class="slotTitle">
			<slot :style="{ color: fontColor }"></slot>
		</div>
		<!-- <div class="slotMore">
			查看更多
		</div> -->
		<div class="subTitle">{{ subTitle }}</div>
		<div class="slotMain">
			<div ref="chart" style="width: 100%; height: 100%;"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'pieChart',
	props: {
		color: {
			type: Array,
			default: () => {
				return ['#4366f6', '#ff116f', '#23e8d4'];
			},
		},
		fontColor: {
			type: String,
			default: '#333333',
		},
		column: {
			type: Array,
			defualt: () => {
				return ['属性1', '属性2'];
			},
		},
		value: {
			type: Array,
			default: () => {
				return [];
			},
		},
		pieRadius: {
			type: Array,
			default: () => {
				return ['47%', '65%'];
			},
		},
		//方向
		orientation: {
			type: Object,
			default: () => {
				return { left: 'center', top: 'bottom', orient: 'vertical' };
			},
		},
		subTitle: String,
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
					formatter: '{b}: {c} ({d}%)',
				},
				legend: {
					top: this.orientation.top, //'bottom',
					left: this.orientation.left, //'center',
					orient: this.orientation.orient,
					textStyle: {
						color: this.fontColor,
						fontSize: 18,
					},
					itemGap: 80, //图例的间距
					data: this.column,
				},
				//圆环中间添加文字
				// graphic: [
				// 	{
				// 		type: 'text',
				// 		left: 'center',
				// 		top: '47%',
				// 		style: {
				// 			text: this.column[0],
				// 			textAlign: 'center',
				// 			fill: this.color[0], //文字的颜色
				// 			width: 30,
				// 			height: 30,
				// 			fontSize: 25,
				// 		},
				// 	},
				// ],
				grid: {
					width: '100%',
					height: '100%',
				},
				series: [
					{
						name: '访问来源',
						type: 'pie',
						radius: this.pieRadius,
						avoidLabelOverlap: true,
						label: {
							normal: {
								formatter: (params) => {
									return Math.floor(params.percent) + '%';
								},
								fontSize: '25',
							},
						},
						emphasis: {
							label: {
								show: true,
								fontSize: '30',
							},
						},
						labelLine: {
							normal: {
								length: 20,
								length2: 0,
								show: false,
							},
						},
					},
				],
			};
			const arr = [];
			for (const key in this.value) {
				arr.push({
					value: this.value[key],
					name: this.column[key],
					color: this.color[key],
					orientation: this.orientation,
				});
			}
			option.series[0].data = arr;
			myChart.setOption(option);
			myChart.on('click', (params) => {
				this._.debounce(this.echartClick(params), 1000);
			});
		},
		echartClick(params) {
			this.$emit('echartClick', params);
		},
	},
};
</script>

<style lang="less" scoped>
.pieChart {
}
.indexCard {
	height: 100%;
	width: 100%;
	box-sizing: border-box;
	padding: 5px 30px;
	.slotTitle {
		font-size: 22px;
		font-weight: bold;
		float: left;
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
