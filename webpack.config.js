// var webpack = require('webpack');
var uf = require('uglifyjs-webpack-plugin');
// var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin');


const path = require('path');
const webpack = require('webpack');

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: {
		app: './app.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js',
		publicPath: '/dist'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [/node_modules/, /maquette/],
				loader: 'babel-loader',

				options: {
					presets: ['env']
				}
			},
			{
				test: /\.styl$/,
				loader: 'style-loader!css-loader!stylus-loader' 

			}
		],
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'src'),    // New
	},
	devtool: 'eval',
	plugins: [
		new uf(),
		new OpenBrowserPlugin({
			url: 'http://localhost:8080'
		}),
		new CleanTerminalPlugin()
	]
};