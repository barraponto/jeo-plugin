let path = require('path');
const defaultConfig = require("./node_modules/@wordpress/scripts/config/webpack.config");

module.exports = {
	...defaultConfig,
	entry: {
		postsSidebar: './src/js/src/posts-sidebar/index.js',
		mapboxglLoader: './src/js/src/mapboxgl-loader.js',
		jeoMap: './src/js/src/jeo-map/index.js',
		JeoLayer: './src/includes/layer-types/JeoLayer.js',
	},
	output: {
		path: path.resolve(__dirname, './src/js/build/'),
		publicPath: './src/js/build/',
		filename: '[name].js'
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test:/\.css$/,
				use:['style-loader','css-loader']
			}
		]
	}
};
