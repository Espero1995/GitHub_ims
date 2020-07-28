<template>
	<div id="Main">
		<div class="header">
			<top-header></top-header>
		</div>
		<div class="main" v-loading="loading">
			<transition>
				<!-- include 指包含的需要缓存；exclude 指除这些以外的需要缓存 -->
				<!-- <keep-alive include="">
					<router-view></router-view>
				</keep-alive> -->
				<router-view></router-view>
			</transition>
		</div>
	</div>
</template>

<script>
import TopHeader from '@/views/TopHeader';
export default {
	name: 'Main',
	components: {
		TopHeader,
	},
	data() {
		return {};
	},
	computed: {
		loading() {
			return this.$store.getters.loading;
		},
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			return;
		},
	},
};
</script>

<style lang="less" scoped>
#Main {
	position: fixed;
	display: flex;
	flex-direction: column;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	padding: 0;
	margin: 0;
	background: #f2f2f2;
	color: #333;
	.header {
		display: inline;
	}
	.main {
		flex: 1;
		box-sizing: border-box;
		padding: 18px 18px 0px 18px;
		width: 100%;
		// background: #fff;
		border: 1px sloid #e8e8e8;
		overflow: auto;
	}
}
</style>
