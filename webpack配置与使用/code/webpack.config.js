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

    // 加载css
    module: {
        rules:[
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