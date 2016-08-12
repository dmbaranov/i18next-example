const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const prodConfig = require('./prod.webpack.config');
const devConfig = require('./dev.webpack.config');

const PATHS = {
  app: path.join(__dirname, '../src'),
  build: path.join(__dirname, '../dist'),
};

const common = {
	entry: [
		'./src/index.jsx'
	],
	output: {
		path: path.join(__dirname, '../dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	resolve: {
		extensions: ['', '.jsx', '.js'],
		modulesDirectories: ['node_modules', PATHS.app],
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/,
				query: {
					presets: ['es2015']
				}
			},
			{
				test: /\.jsx$/,
				loader: 'babel',
				exclude: /node_modules/,
				query: {
					presets: ['react']
				}
			},
	        {
	            test: /\.css$/,
	            loader: 'style!css'
	        },
            {
                test: /\.scss$/,
                loader: 'style!css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!autoprefixer-loader?browsers=last 15 versions!sass'
            },
			{
				test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&mimetype=application/font-woff'
			},
			{
				test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&mimetype=application/font-woff2'
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&mimetype=application/octet-stream'
			},
			{
				test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&mimetype=application/font-otf'
			}, 
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file'
			}, 
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&mimetype=image/svg+xml'
			},
			{
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
			}
		]
	},
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin()
	]
}

var config;

switch (process.env.NODE_ENV) {
	case 'production': 
		console.log("production");
		config = merge(common, prodConfig);
		break;
	case 'devel':
		console.log('development');
		config = merge(common, devConfig);
		break;
	default:
		console.log('default');
		config = merge(common, {});
}

module.exports = validate(config);