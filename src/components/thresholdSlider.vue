<template>
	<div id="thresholdSlider">
		<div class="el-slider__bar slider-start slider" :style="{ width: startWidth + '%' }"></div>
		<div class="el-slider__bar slider-end slider" :style="{ left: endWidth + '%', width: 100 - endWidth + '%' }"></div>
		<el-slider v-model="sliderValue" range :max="100" @change="changeSlider"> </el-slider>
	</div>
</template>
<script>
export default {
	name: 'thresholdSlider',
	components: {},
	props: {
		value: {
			type: Array,
			default: () => {
				return [0, 0, 0, 0];
			},
		},
	},
	watch: {
		value() {
			this.init();
		},
	},
	computed: {
		startWidth() {
			return Math.min(...this.sliderValue);
		},
		endWidth() {
			return Math.max(...this.sliderValue);
		},
	},
	created() {
		this.init();
	},
	data() {
		return {
			sliderValue: [0, 0],
		};
	},
	methods: {
		init() {
			const value = [...this.value].sort((a, b) => a - b);
			const slider = [value[1], value[2]];
			this.$nextTick(() => {
				this.sliderValue = slider;
			});
		},
		changeSlider(value) {
			this.$emit('change', this.sliderValue);
		},
	},
};
</script>
<style lang="less">
#thresholdSlider {
	position: relative;
	width: 400px;
	.slider {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 1;
	}
	.slider-start {
		background-color: red;
	}
	.slider-end {
		background-color: green;
	}
}
</style>
