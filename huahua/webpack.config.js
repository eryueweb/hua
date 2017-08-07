'use strict';
import webpack from 'webpack';
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
							postcss: [require('postcss-cssnext')()],
							loaders: {
								scss: 'style-loader!css-loader!sass-loader'
							}
						}
					}
				]
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('css/[name].css'),
		new webpack.optimize.UglifyJsPlugin({
			// 用紧凑的输出
			beautify: false,
			// 删除所有注释
			comments: false,
			// 在uglify删除没有用到的代码时不需要警告
			warning: true,
			// 删除所有console语句 兼容ie浏览器
			drop_console: true,
			// 内嵌定义了但是只用到一次的变量
		    collapse_vars: true,
		    // 提取出出现多次但是没有定义成变量去引用的静态值
		    reduce_vars: true
		}),
	    new webpack.LoaderOptionsPlugin({
	        minimize: true
	    })
	]
};
module.exports = webpackConfig;

