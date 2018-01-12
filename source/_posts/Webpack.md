---
title: Webpack
date: 2017-8-23 11:35:03
toc: true
tags:
    - node
---

#### 一、什么是Webpack
- webpack 是一个现代 JavaScript 应用程序的模块打包器(module bundler)
- 当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成少量的 bundle - 通常只有一个，由浏览器加载。
- 它做的事情是，分析你的项目结构，找到 JavaScript 模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript 等），并将其转换和打包为合适的格式供浏览器使用.
<!--more-->

#### 二、核心概念
##### 2.1 入口（Entry）
- 入口起点认为是根上下文(contextual root) 或 app 第一个启动文件。
- 使用```entry```属性

##### 2.2 出口(Output)
- 描述了如何处理归拢在一起的代码
- 使用```output```属性
    - ```output.filename```和```output.path```属性，告诉名称和生成到哪里。

##### 2.3 Loader
- 在文件被添加到依赖图中时，其转换为模块
- 目标：
    - 识别出(identify)应该被对应的 loader 进行转换(transform)的那些文件。(```test``` 属性)
    - 转换这些文件，从而使其能够被添加到依赖图中（并且最终添加到 bundle 中）(```use``` 属性)

##### 2.4 插件(Plugins)
想要使用一个插件，你只需要```require()```它，然后把它添加到 ```plugins```数组中。

#### 三、入口起点(Entry Points)
##### 3.1 单个入口（简写）语法
用法：
```
entry: string|Array<string>
```
##### 3.2 对象语法
- 用法
    ```
    entry: {[entryChunkName: string]: string|Array<string>}
    ```
- webpack.config.js
    ```
    const config = {
      entry: {
        app: './src/app.js',
        vendors: './src/vendors.js'
      }
    };
    ```
#### 四、输出(Output)
配置 output 选项可以控制 webpack 如何向硬盘写入编译文件。注意，即使可以存在多个入口起点，但只指定一个输出配置。
##### 4.1 用法
- 在 webpack 中配置 output 属性的最低要求是，将它的值设置为一个对象，包括以下两点
    - filename 用于输出文件的文件名。
    - 目标输出目录 path 的绝对路径。

##### 4.2 多个入口起点
- 如果配置创建了多个单独的 "chunk"，则应该使用**占位符**(substitutions)来确保每个文件具有唯一的名称。
    ```
    {
      entry: {
        app: './src/app.js',
        search: './src/search.js'
      },
      output: {
        filename: '[name].js',
        path: __dirname + '/dist'
      }
    }
    
    // 写入到硬盘：./dist/app.js, ./dist/search.js
    ```
#### 五、Loader
- loader 用于对模块的源代码进行转换。比如说将scss转换为css
- loader 可以使你在 import 或"加载"模块时预处理文件。
- loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data UR。

##### 5.1 示例
- 你可以使用 loader 告诉 webpack 加载 CSS 文件，或者将 TypeScript 转为 JavaScript。为此，首先安装相对应的 loader：
    ```
    npm install --save-dev css-loader
    npm install --save-dev ts-loader
    ```
- 然后指示 webpack 对每个 .css 使用 css-loader，以及对所有 .ts 文件使用 ts-loader：
    ```
    module: {
		rules: [
			{
				test: /*匹配文件后缀名的正则*/,
				use: [
					loader: /*loader名字*/,
					query: /*额外配置*/
				]
			}
		]
	}
    ```
正则表达式来标识我们要修改的文件
    ```
    module.exports = {
      module: {
        rules: [
          { test: /\.css$/, use: 'css-loader' },
          { test: /\.ts$/, use: 'ts-loader' }
        ]
      }
    };
    ```

##### 5.2 使用Loader
- 有三种使用 loader 的方式：
    - 配置（推荐）：在 webpack.config.js 文件中指定 loader。
    - 内联：在每个 import 语句中显式指定 loader。
    - CLI：在 shell 命令中指定它们。

###### 5.2.1 配置[Configuration]
module.rules 允许你在 webpack 配置中指定多个 loader
```
module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }
```

##### 5.3 Loader特性
- loader 支持链式传递
- 可以是同步的，也可以是异步的。
- 运行在 Node.js 中，并且能够执行任何可能的操作。
- 接收查询参数。用于对 loader 传递配置。
- 能够使用 options 对象进行配置。
- 除了使用 package.json 常见的 main 属性，还可以将普通的 npm 模块导出为 loader，做法是在 package.json 里定义一个 loader 字段。
- 插件(plugin)可以为 loader 带来更多特性。
- loader 能够产生额外的任意文件。

##### 5.4 解析less的文件的webpack.config.js配置
- babel-loader： 让下一代的js文件转换成现代浏览器能够支持的JS文件。
- css-loader,style-loader:两个建议配合使用，用来解析css文件，能够解释@import,url()如果需要解析less就在后面加一个less-loader
- file-loader: 生成的文件名就是文件内容的MD5哈希值并会保留所引用资源的原始扩展名
- url-loader: 功能类似 file-loader,但是文件大小低于指定的限制时，可以返回一个DataURL事实上，在使用less,scss,stylus这些的时候，npm会提示你差什么插件，差什么，你就安上就行了
```
var baseConfig = {
	entry: {
		main: './src/index.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve('./build')
	},
	devServer: {
		contentBase: './src',// 本地服务器所加载的页面所在的目录
		historyApiFallBack: true,// 不跳转
		inline: true// 实时刷新
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
					{loader: 'style-loader'},
					{loader: 'css-loader'},
					{loader: 'less-loader'}
				],
				exclude: /node_modules/
			}
		]
	}
}
```
#### 六、插件(Plugins)
插件是 wepback 的支柱功能
##### 6.1 剖析
webpack 插件是一个具有 apply 属性的 JavaScript 对象
##### 6.2 用法
由于插件可以携带参数/选项，你必须在 webpack 配置中，向 plugins 属性传入 ```new``` 实例。

##### plugins和loader的区别
- loaders负责的是处理源文件的如css、jsx，一次处理一个文件
- plugins并不是直接操作单个文件，它直接对整个构建过程起作用

#### 七、模块
##### 7.1 什么是Webpack模块
- 对比 Node.js 模块，webpack 模块能够以各种方式表达它们的依赖关系，几个例子如下：
    - ES2015 import 语句
    - CommonJS require() 语句
    - AMD define 和 require 语句
    - css/sass/less 文件中的 @import 语句。
    - 样式(url(...))或 HTML 文件(<img src=...>)中的图片链接(image url)

