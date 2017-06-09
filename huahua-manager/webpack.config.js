import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
module.exports = {
	entry: {
		index: path.resolve(__dirname,'public/javascripts/index.js'),
		banner: path.resolve(__dirname,'public/javascripts/banner.js'),
		pic: path.resolve(__dirname,'public/javascripts/pic.js'),
		blog: path.resolve(__dirname,'public/javascripts/blog.js'),
		common: path.resolve(__dirname,'public/javascripts/common.js'),
		login: path.resolve(__dirname,'public/javascripts/login.js')
	},
	output: {
		path: path.resolve(__dirname,'./dist'),
		publicPath: '/dist/',
		filename: 'js/[name].js'
	},
	module:{
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: [
					{
						loader: 'babel-loader'
					},
					{
						loader: 'jsx-loader'
					}
				],
				include: [path.resolve(__dirname, './public')],
				exclude: /node_modules/
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
				test: /\.(png|jpg|gif)$/,
				use: 'url-loader?limit=8192&name=./imgs/[hash].[ext]'
			},
			{
				test: /\.(woff|woff2|svg|eot|ttf|svg)\??.*$/,
				use: 'file-loader?name=[name].[ext]'
			}
		]
	},
	plugins: [
		new ExtractTextPlugin("css/[name].css")
	]

};