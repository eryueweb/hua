# 花花（[http://www.zhishangzhi.com](http://www.zhishangzhi.com)）

> 本站是基于vue2.0（前台）+express4.0（后台）的实战项目。目前仅包含加载图片及文章的功能。后面会陆续有更多更全更好的功能。
### 首先
***
>* 喜欢的请点星关注，Star，Fork，这些是我坚持下去的动力
>* 本项目地址[github地址](https://github.com/eryueweb/hua)
>* 手机扫一扫

![项目二维码地址.png](http://upload-images.jianshu.io/upload_images/7327614-93774bc641545122.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 项目技术架构
***
* vue-cli
* vue
* vue-resource
* vue-router
* express
* mysql
* webpack

### 安装
***
项目地址：（`git clone`）
```shell
git clone git@github.com:eryueweb/hua.git
```
通过`npm`安装本地服务第三方模块（需要已安装[Node.js](https://nodejs.org/)）
```
npm install //现在的npm5.0已经神速了哦，新增了package-lock.json，啦啦啦。。
```
本地启动服务
```
npm start //或npm run dev
```
发布代码
```
npm run build
```
生产环境启动服务
```
npm run startup
```
### 生产环境注意
由于本项目的前后台放在了一起，所以另外又搭建了express环境，生产环境需要pm2运行startup.js。如果只是前台的vue项目，则如下启动即可：
```
cd dist
npm install -g http-server // 该命令只需执行一次, 安装过之后, 以后就不需要重复安装了。
hs
```
### 目录结构
<pre>
├── build              // 构建服务和webpack配置
├── common             // 后台配置的一些公用方法
├── config             // 项目不同环境的配置
├── data               // 后台数据库配置
├── service            // 后台接口配置
├── dist               // 项目build打包后生成的目录
├── startup            // 启动生产环境的服务配置
├── static             // 静态资源目录
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── package-lock.json  // 项目配置文件的版本及路径的配置（node8.0必需）
├── src                // 生产目录
│   ├── assets         // 资源目录
│   ├── components     // 各种vue组件
│   ├── App.vue        // vue主页面 
│   ├── router         // vue路由配置
│   └── main.js        // Webpack预编译入口
</pre>
> 本项目启动需要搭建数据库哦，或自行改成静态的，或仅供参考，aaa

### 最后
***
* 如果喜欢一定要Star哈！！！（O(∩_∩)O谢谢）
* 如果有意见和问题，请在Issues中提出，我会在线解答。


