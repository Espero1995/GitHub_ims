// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const path = require('path');
const resolve = (dir) => {
	return path.join(__dirname, dir);
};
const publicPath = process.env.NODE_ENV === 'production' ? './' : '/';

module.exports = {
	lintOnSave: false,
	productionSourceMap: false,
	configureWebpack: {
		//打包分析
		// plugins: [new BundleAnalyzerPlugin()]
	},
	publicPath: publicPath,
	assetsDir: 'static',
	devServer: {
		port: 9088,
		open: true,
		host: '0.0.0.0',
		proxy: {
			'/ims': {
				// target: 'http://10.100.23.230:9088',
				// target: 'http://10.100.23.178:8080', //方毅
				target: 'http://192.168.3.6:8080', //韩振波
				changeOrigin: true,
				pathRewrite: {
					'^/ims': '/ims',
				},
			},
		},
	},
	chainWebpack: (config) => {
		config.resolve.alias.set('@', resolve('src')).set('_c', resolve('src/components')).set('_a', resolve('src/assets')).set('_s', resolve('src/static'));
	},
};
