webpack是什么？

​	打包工具

​	JavaScript模块法宝之后就可以运行在浏览器

能做什么？

​	JavaScript资源打包

​	css打包

​	图片 打包

​	less

​	sass

​	babel EcmaScript 6 转 EcmaScript5

​	开发工具：http 服务器

​	代码改变，自动刷新浏览器

​	代码压缩

## 安装：

```
//全局安装
npm install -g webpack
//安装到你的项目目录（推荐）
npm install --save-dev webpack
```

安装在全局的webpack打包的时候使用的是你自己电脑上的webpack，如果到了另一个人的计算机是哪个，它可能安装的是老版本的webpack。那么就可能这几兼容性的问题

而且如果对方没有在全局安装webpack则就无法打包

所以，为了解决以上的问题，我们更推荐吧webpack安装到本地项目在本地项目中。这样的话项目到哪里，webpack就跟着到了哪里。（打包工具随着项目走）

安装的时候吧webpack安装到开发依赖（--save-dev）中，因为webpack只是一个打包工具，项目如果需要上线，上线的是打包的结果，而不是这个工具，所以我们未来区分核心包依赖和开发工具依赖，这里--save和--save-dev来区分

对于安装到项目中的webpack需要配置npm script来使用

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
// 该文件旗帜最终是要在Node环境下执行的
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

## webpack配置流程

1.新建demo

2.npm init -y

3.npm i -D webpack

4.创建 webpack.config.js

5.配置 webpack.config.js

```
var path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname,'./dist/'), // 这里必须是绝对路径
        filename: 'bundle.js'
    }
};
```

6.配置 npm scripts

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

npm run build