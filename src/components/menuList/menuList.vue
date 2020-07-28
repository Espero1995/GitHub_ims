<template>
	<ul id="menuList" class="menuItems">
		<div v-for="(n, index) of menu" :key="index">
			<div v-if="n.children">
				<div class="smenu" :class="{ active: index == activeIndex && isClick }" @click="clickMenu(index)">
					<img v-if="n.img" :src="n.img" />
					<i v-else class="el-icon-caret-right"></i>
					{{ n.title }}
				</div>
				<menuList :menuOpen="activeIndex === index" :side="isClick" :i="i + 1" @click="clickSMenu($event, index)" :menu="n.children"></menuList>
			</div>
			<li
				v-else
				class="item"
				:style="{ paddingLeft: 46 + i * 15 + 'px' }"
				:key="menu.key"
				:class="{ active: index == activeIndex && isClick, hideMenu: !menuOpen }"
				@click="clickMenu(index)"
			>
				{{ n.title }}
			</li>
		</div>
	</ul>
</template>
<script>
import menuList from './menuList';
export default {
	name: 'menuList',
	components: { menuList },
	props: {
		/** 基本用于子菜单显示,在上级判断点击了本身后才开启子菜单显示 */
		menuOpen: {
			type: Boolean,
			default: true,
		},
		/**传入的菜单值 */
		menu: {
			type: Array,
			default: () => {
				return [];
			},
		},
		/**用于判断自己属于第几层,多用于定位层级一些相关操作 */
		i: {
			type: Number,
			default: 0,
		},
		/**默认展开哪一项 */
		defaultIndex: {
			type: Number,
			default: -1,
		},
		/**用于判断点击了本身还是点击了子菜单 */
		side: {
			type: Boolean,
			default: true,
		},
	},
	watch: {
		/**在上级点击后把本菜单的点击关闭 */
		side(value) {
			if (value) {
				this.isClick = false;
			}
		},
	},
	data() {
		return {
			activeIndex: -1, //激活的选项
			isClick: false, //点击情况
		};
	},
	computed: {},
	created() {
		/**在传入了默认值后初始化用,如不想显示默认点击情况可以把isClick注释 */
		if (this.defaultIndex >= 0) {
			this.isClick = true;
			this.activeIndex = this.defaultIndex;
		}
	},
	mounted() {},
	methods: {
		init() {
			this.clickMenu(this.activeIndex);
		},
		/**点击本身菜单时触发
		 * @index 传入点击菜单的序号
		 */
		clickMenu(index) {
			this.isClick = true;
			this.activeIndex = index;
			this.$emit('click', this.menu[index]);
		},
		/**点击子菜单时触发
		 * @el 子菜单点击的对象
		 * @index 子菜单触发点击的菜单index(本级index,同activeIndex)
		 */
		clickSMenu(el) {
			this.isClick = false;
			this.$emit('click', el);
		},
	},
};
</script>
<style lang="less">
@import './menuList.less';
#menuList {
}
</style>
