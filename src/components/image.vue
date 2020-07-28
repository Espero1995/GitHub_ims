<template>
	<div class="image">
		<img ref="img" :src="img" :onerror="errorImg" />
	</div>
</template>

<script>
import 'viewerjs/dist/viewer.css';
import Viewer from 'viewerjs';
import { resolutionImg } from '@/utils/utils';
export default {
	name: 'jwimage',
	props: {
		viewer: {
			type: Boolean,
			default: false,
		},
		defaultImg: {
			type: String,
			default: '',
		},
		type: {
			type: String,
			default: 'person',
		},
		src: String,
		viewerOption: {
			type: Object,
			default: () => {
				return {
					toolbar: {
						zoomIn: 4,
						zoomOut: 4,
						oneToOne: 4,
						reset: 4,
						prev: 0,
						play: 0,
						next: 0,
						rotateLeft: 4,
						rotateRight: 4,
						flipHorizontal: 4,
						flipVertical: 4,
					},
					navbar: 0,
				};
			},
		},
	},
	data() {
		return {
			img: this.defaultImg || '',
			errorImg: `this.src="${this.defaultImg}"`,
		};
	},
	watch: {
		src: {
			immediate: true,
			handler(url) {
				if (url) {
					this.getImg(url);
				}
			},
		},
	},
	mounted() {
		this.init();
	},
	methods: {
		reImgs(url) {
			return resolutionImg(url);
		},
		getImg(url) {
			this.img = url;
		},
		init() {
			if (this.viewer) {
				this.initViewer();
			}
		},
		initViewer() {
			new Viewer(this.$refs.img, this.viewerOption);
		},
	},
};
</script>

<style lang="less">
.image {
	height: 100%;
	width: 100%;
	img {
		height: 100%;
		width: 100%;
	}
}
.viewBigScreen {
	img {
		height: 54% !important;
		width: auto !important;
		left: 50%;
		top: 46%;
		transform: translate(-50%, -50%) !important;
		margin-left: 0 !important;
		margin-top: 0 !important;
	}
}
</style>
