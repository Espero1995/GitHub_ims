export default {
	data() {
		return {
			pageNav: {
				pageSize: 25,
				page: 1,
				total: 0,
				pageSizes: [25, 50, 100, 200],
				maxPage: 25,
			},
		};
	},
	methods: {
		handleSizeChange(val) {
			this.pageNav.pageSize = val;
			this.getData();
		},
		handleCurrentChange(val) {
			this.pageNav.page = val;
			this.getData();
		},
	},
};
