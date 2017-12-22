---
title: npm搭建
date: 2017-10-03 16:18:06
toc: true
tags:
    - npm
    - 搭建
---
### NPM使用介绍
NPM（Node Package Manager）是随同NodeJS一起安装的包管理工具，能解决NodeJS代码部署上的很多问题，常见的使用场景有以下几种：
- 允许用户从NPM服务器下载别人编写的第三方包到本地使用。
- 允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。
- 允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用。

npm就是node.js的包管理工具
<!--more-->
### 1.安装
```
npm install express      # 本地安装
npm install express -g   # 全局安装

```
###### 本地安装
1. 将安装包放在 ./node_modules下（运行 npm 命令时所在的目录），如果没有node_modules目录，会在当前执行npm 命令的目录下生成node_modules目录。
2. 可以通过 require() 来引入本地安装的包。

##### 全局安装(我使用的)
1. 安装
```
npm install express -g
```
2. 查看所有全局安装的模块
```
$ npm list -g

├─┬ cnpm@4.3.2
│ ├── auto-correct@1.0.0
│ ├── bagpipe@0.3.5
│ ├── colors@1.1.2
│ ├─┬ commander@2.9.0
│ │ └── graceful-readlink@1.0.1
│ ├─┬ cross-spawn@0.2.9
│ │ └── lru-cache@2.7.3
……
```
### 2.淘宝镜像
```
1.得到原本的镜像地址

npm get registry 

> https://registry.npmjs.org/

设成淘宝的

npm config set registry http://registry.npm.taobao.org/

 

2.换成原来的

npm config set registry https://registry.npmjs.org/


```

