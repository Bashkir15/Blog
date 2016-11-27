const path = require("path");
const webpack = require('webpack');

module.exports = {
	entry: {
		main: './public/main.js'
	},

	output: {
		path: path.resolve(__dirname, './dist/'),
		publicPath: '/',
		filename: '[name].js'
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
			}
		]
	}
}