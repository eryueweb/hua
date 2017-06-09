'use strict';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

let webpackConfig = {
	entry: {
		index: path.resolve(__dirname,'public/main.js')
	},
	output: {
		path: path.resolve(__dirname,'./dist'),
		publicPath: "/dist/",
		filename: 'js/[name].js'
	},
	resolve: {
		// enforceExtension: true,
		modules: [path.resolve(__dirname, 'node_modules')],
	    alias: {
	      'vue$': 'vue/dist/vue.common.js',
	      'components': path.resolve(__dirname, 'public/components')
	    }
	},
	module: {
		rules: [
			{
				test: /\.(png|jpg|gif)$/,
				use: 'url-loader?limit=8192&name=./imgs/[hash].[ext]'
			},
			{
				test: /\.(woff|woff2|svg|eot|ttf|svg)\??.*$/,
				use: 'file-loader?name=[name].[ext]'
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
         			use: [
         				{
         					loader:"css-loader",
         					options: {
         						minimize: true
         					}
         				}
         			]
				})
			},
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader'
					}
				],
				include: [path.resolve(__dirname, './public')],
				exclude: /node_modules/
			},
			{
				test: /\.vue$/,
				use: [
					{
						loader: 'vue-loader',
						options: {
							postcss: [require('postcss-cssnext')()]
						}
					}
				]
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('css/[name].css')
	]
};
module.exports = webpackConfig;

