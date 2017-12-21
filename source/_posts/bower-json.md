---
title: bower.json
date: 2017-11-19 15:13:32
toc: true
tags:
    - node
    - bower
---

### bower的作用
- 它会为你节省寻找客户端的依赖关系的时间
- 每次我需要安装jQuery的时候，我都需要去jQuery网站下载包或使用CDN版本。但是有了Bower，你只需要输入一个命令，jquery就会安装在本地计算机上，你不需要去记版本号之类的东西，你也可以通过Bower的info命令去查看任意库的信息。
- 可以很容易地展现客户端的依赖关系。你可以创建一个名为bower.json的文件，在这个文件里你可以指定所有客户端的依赖关系，任何时候你需要弄清楚你正在使用哪些库，你可以参考这个文件。

<!--more-->
### 提前准备
1. 装好node.js
2. 装好npm
3. 装好git
### 安装Bower
```
//cmd中
npm install -g bower
```

### bower.json文件的使用
```
//创建bower.json
//在项目中打开命令窗口
bower init
```
### 包的安装
Bower是一个软件包管理器，所以你可以在应用程序中用它来安装新的软件包。举例来看一下来如何使用Bower安装JQuery，在你项目的文件夹下，键入如下命令：
```
bower install jquery --save-dev
```
--save-dev： 自动把模块和版本号添加到devdependencies部分
```
bower install <package>
```
> 把 bower install packages 建立在bower_components里面,
一个package可以是一个url，一个github shorthand ，一个git endpoint等。