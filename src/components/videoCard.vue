<template>
	<div id="videoCard">
		<div class="videoState">
			<div>
				视频质量: <span :class="videoStateCalss(item.state)">{{ $v.videoState(item.state) }}</span>
			</div>
		</div>
		<div class="videoDetail">
			<div>
				视频信号:
				<div class="dot" :class="dotStateCalss(item.noSignalS)"></div>
				<span>({{ item.noSignalV }})</span>
			</div>
			<div>
				图像清晰:
				<div class="dot" :class="dotStateCalss(item.fuzzyDegreeS)"></div>
				<span>({{ item.fuzzyDegreeV }})</span>
			</div>
			<div>
				图像对比度:
				<div class="dot" :class="dotStateCalss(item.contrastLevelS)"></div>
				<span>({{ item.contrastLevelV }})</span>
			</div>
			<div>
				图像色偏:
				<div class="dot" :class="dotStateCalss(item.unusualDgreeColorS)"></div>
				<span>({{ item.unusualDgreeColorV }})</span>
			</div>
			<div>
				图像过亮:
				<div class="dot" :class="dotStateCalss(item.brightS)"></div>
				<span>({{ item.brightV }})</span>
			</div>
			<div>
				图像过暗:
				<div class="dot" :class="dotStateCalss(item.unusualDgreeBlackS)"></div>
				<span>({{ item.unusualDgreeBlackV }})</span>
			</div>
			<div>
				视频冻结:
				<div class="dot" :class="dotStateCalss(item.videoFreezeS)"></div>
				<span>({{ item.videoFreezeV }})</span>
			</div>
			<div>
				画面抖动:
				<div class="dot" :class="dotStateCalss(item.lensAbnormalJitterS)"></div>
				<span>({{ item.lensAbnormalJitterV }})</span>
			</div>
		</div>
		<div class="videoInfo">
			<div>
				质量是否下降: <span>{{ $v.resultStatus(item.resultStatus) }}</span>
			</div>
			<div>
				是否播放失败: <span>{{ $v.isPlayFailure(item.isPlayFailure) }}</span>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'videoCard',
	components: {},
	props: {
		item: {
			type: Object,
			default: () => {
				return {};
			},
		},
	},
	data() {
		return {};
	},
	mounted() {
		console.log(this.item);
	},
	methods: {
		videoStateCalss(state) {
			switch (state) {
				case 0:
					return 'state-error';
				case 1:
					return 'state-info';
				case 2:
					return 'state-success';
				default:
					return 'state-unknown';
			}
		},
		dotStateCalss(state) {
			switch (state) {
				case 0:
					return 'state-errorBg';
				case 1:
					return 'state-infoBg';
				case 2:
					return 'state-successBg';
				default:
					return 'state-unknownBg';
			}
		},
	},
};
</script>
<style lang="less">
#videoCard {
	.videoState {
		font-size: 18px;
		line-height: 60px;
		border-bottom: 1px solid #ebebeb;
	}
	.videoDetail {
		display: flex;
		flex-wrap: wrap;
		> div {
			display: flex;
			align-items: center;
			font-size: 16px;
			line-height: 59px;
			width: 50%;
		}
	}
	.videoInfo {
		display: flex;
		flex-wrap: wrap;
		> div {
			font-size: 16px;
			line-height: 59px;
			width: 50%;
		}
	}
	.dot {
		width: 14px;
		height: 14px;
		border-radius: 50%;
		margin: 0 10px;
	}
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
	.state-errorBg {
		background-color: #ff320a;
	}
	.state-infoBg {
		background-color: #f4b201;
	}
	.state-successBg {
		background-color: #0ec709;
	}
	.state-unknownBg {
		background-color: #bbbbbb;
	}
}
</style>
