const webpack = require('webpack');

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: [
		'webpack-hot-middleware/client'
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/,
				query: {
					presets: ['es2015'],
					plugins: ['transform-runtime']
				}
			},
			{
				test: /\.jsx$/,
				loaders: ['babel-loader'],
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
}