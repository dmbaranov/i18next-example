const webpack = require('webpack');

module.exports = {
	devtool: 'source-map',
	entry: [
		'babel-polyfill'
	],
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
			},
		}),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    })
	]
};
