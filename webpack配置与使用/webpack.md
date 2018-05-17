## webpack初识

webpack是什么

​	打包工具

​	JavaScript模块打包之后就可以运行在浏览器

能做什么？

​	JavaScript资源打包、css打包、图片 打包、less、sass、babel EcmaScript 6 转 EcmaScript5、开发工具：http 服务器、代码改变，自动刷新浏览器、代码压缩...

# webpack使用流程

## 安装：

```
npm install -g webpack	//全局安装

npm install --save-dev webpack	//安装到你的项目目录（推荐）
```

## webpack使用

准备目录结构

打包

```js
webpack 模块化入口文件 模块化出口文件
```

最后记得把index.html文件中的脚本

应用改为打包之后的结果文件路径

划分 src 和 dist 目录

​	把源码存储到src目录中

​	把打包的结果存储到dist目录中

## 配置文件webpack.config.js

最基本的配置项：

```js
// 该文件其实最终是要在Node环境下执行的
const path = require('path')

// 导出一个具有特殊属性配置的对象
module.exports = {
    entry: './src/main.js' // 入口文件模块路径
    output: {
        path: path.json(__dirname,'./dist') , // 出口文件模块所属目录，path必须是一个绝对路径
        filename: 'bundle.js' // 打包的结果文件名称
    }
}
```

打包：

```js
# webpack 会自动读取 webpack.config.js 文件作为默认的配置文件
# 也可以通过 --cconfig 参数来手动指定配置文件
webpack
```

## 总结：webpack配置流程

1.新建demo

2.npm init -y	// 初始化demo文件

3.npm i -D webpack	// 下载webpack到项目依赖

3.1.要安装最新版本或特定版本，请运行以下命令之一：

```
npm install --save-dev webpack
npm install --save-dev webpack@<version>
```

3.2.如果使用使用的是 webpack 4+ 版本，还需要安装 CLI。

```
npm install --save-dev webpack-cli
```

4.创建 webpack.config.js	  // 创建webpack配置文件

5.配置 webpack.config.js

```
var path = require('path');

module.exports = {
  mode: 'development',
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // 这里必须是绝对路径
    filename: 'foo.bundle.js'
  }
};
```

6.在package.json文件里配置 npm scripts

```
{
  "name": "demo3",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build":"webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.8.3"
  }
}
```

7.打包

命令行输入 npm run build

# webpack资源管理

webpack 不仅可以打包 JavaScript 模块，甚至它可以把网页开发中的一切资源都可以当做模块来打包处理

但是它本身不支持，它只是一个打包平台，其他资源，例如css、less、sass、img等资源需要结合插件来实现，这些插件在webpack中被称为loader，翻译过来就是加载器的意思

## Loading css（加载css）

安装依赖

```JS
# css-loader 的作用是把 css 文件转为 JavaScript 模块
# style-loader 的作用是动态创建 style 节点插入到 head 中
安装插件指令：npm install --save-dev style-loader css-loader
```

配置：

原来的基础上添加module

```js
var path = require('path');

module.exports = {
  mode: 'development',
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // 这里必须是绝对路径
    filename: 'foo.bundle.js'
  }
};
```

module

```js
module: {
        rules:[
            {
                test:/.css$/,
                use:[ // 注意：这里的顺序很重要，不要乱了顺序，从我们的角度看，老外的思维是反的
                    'style-loader', 
                    'css-loader' 
                ]
            }
```



## 图片加载

安装依赖：

```js
npm install --save-dev file-loader
```

配置：

在module模块加对象

原模块：

```js
module: {
        rules:[
            {
                test:/.css$/,
                use:[ // 注意：这里的顺序很重要，不要乱了顺序，从我们的角度看，老外的思维是反的
                    'style-loader', 
                    'css-loader' 
                ]
            }
```

添加图片依赖对象

```js
{
                test:/.(jpg|png|svg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
```

## HtmlWebpackPligin 插件 （打包index.html，解决图片途径问题）

安装依赖：

```js
npm i -D html-webpack-plugin
```

配置：

需要引入插件模块：

```js
const htmlWebpackPlugin = require('html-webpack-plugin')
```



```js
var path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/main.js',
    output: {
        path: part.resolve(__dirname,'./dist'), // 这里是绝对路径
        filename: 'bundle.js'
    },
    // html插件
    plugins: [
        // 该插件的作用就是把 index.html 打包到你的 bundel.js 文件所在目录，也就是说 bundel 到index.html 就到哪里
       	// 同时这个也会自动在 index.html 中出入 script 引用连接
        // 而且引用的资源名称，也取决于你的 bundle 叫什么
        // 这个插件还可以配置压缩 html 的处理
        new htmlWebpackPlugin({
            template: './index.html'
        })
    ]
```

## 加载 less	（Loading Less）

安装依赖：

```js
npm i -D css-loader style-loader less less-loader
// # 如果 css-loader 安装过了就不需要安装了
```



配置：

在module里加对象

```js
{
                test:/.less$/,
                use: [
                    'style-loader', // 根据模块生成style节点插入head中
                    'css-loader', // 再把 css 转成 JavaScript 模块
                    'less-loader' // 先把 less 转成 css
                ]
}
```

## webpack-dev-server	（自动启动服务器）

安装依赖：

```js
npm i -D webpack-dev-server
```

配置：

跟module同一个层级

```js
devServer: {
    // 配置 webpack-dev-server 的 www 目录
    contentBase: './dist'
}
```

配置package.json文件里的script

```js
"script": {
    "build": "webpack",
    "watch-build": "webpack --watch",
   	"dev": "webpack-dev-server --open"
}
```

启动开发模式

在命令行输入 

```js
npm run dev
```

解释：该工具会自动帮你打包，打包完毕之后会自动开启一个服务器，默认监听 8080 端口号，同时自动打开浏览器让你访问，接下来就会自动监听代码的改变，然后自动编译，编译完毕，自动刷新浏览器 

## 以上全部配置的代码：

```js
var path = require('path'); // path是一个 Node.js 核心模块，用于操作文件路径
const  htmlWebpackPlugin = require('html-webpack-plugin'); // 处理图片的插件
module.exports = {
    mode: 'development',    // 开发模式
    entry: './src/main.js',  // 入口文件
    output: {   // 出口文件
        path: path.resolve(__dirname,'./dist'),  // path可以配置绝对路径
        filename: 'bundle.js'   // 这里是设置打包之后的文件名
    },

    plugins:[
        // 该插件的作用就是把 index.html 打包到你的 bundel.js 文件所在目录
        // 也就是说 bundel 到index.html 就到哪里
        // 同时这个也会自动在 index.html 中出入 script 引用连接
        // 而且引用的资源名称，也取决于你的 bundle 叫什么
        // 这个插件还可以配置压缩 html 的处理
        new htmlWebpackPlugin({
            template: 'index.html'
        })
    ],

    // 样式加载
    module: {
        rules:[ // rule规则
            
            // 加载css
            {
                test:/.css$/,
                use:[ // 注意：这里的顺序很重要，不要乱了顺序，从我们的角度看，老外的思维是反的
                    'style-loader', // style-loader 的作用是动态创建 style 节点插入到 head 中
                    'css-loader' // css-loader 的作用是把 css 文件转为 JavaScript 模块
                ]
            },
            
            // 加载图片
            {
                test:/.(jpg|png|svg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            
            // 加载less
            {
                test:/.less$/,
                use: [
                    'style-loader', // 根据模块生成style节点插入head中
                    'css-loader', // 再把 css 转成 JavaScript 模块
                    'less-loader' // 先把 less 转成 css
                ]
            }

        ]
    },
    // 解释：打包css也是把css文件内容转换成一个JavaScript模块，然后在运行JavaScript的时候，会动态创建一个 style 节点插入到head头部


    // 配置服务器
    devServer: {
        // 配置 webpack-dev-server 的 www 目录
        contentBase: './dist'
    }
};
```

## 总结

加载除了JavaScript以外的资源时，需要额外下载相应依赖，加载插件（Plugin）时，需要载入，通过new创建插件模块配置

