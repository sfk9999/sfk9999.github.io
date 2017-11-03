---
title: Hexo搭建
date: 2017-11-02 21:07:30
tags:
	- Hexo
---

### 一、搭建

1. 安装hexo（Node和Git都装好后）

	```
	npm install -g hexo
	```

2. 初始化  
创建一个文件夹，在文件夹里执行

	```
	hexo init
	//cd到目标目录
	```

3. 生成静态页面

	```
	hexo g  //==generate
	```

4. 启动本地服务

	```
	hexo s   
	hexo d  //生成加部署d==deploy
	```

5. 关联github
	- 在vim _config.yml文件中设置
	
		```
		deploy:
		  type: git
		  repository: https://github.com/leopardpan/leopardpan.github.io.git
		  branch: master
		```

	- 再执行以下命令

		```
		npm install hexo-deployer-git --save
		hexo deploy
		```


### 二、部署

每次部署的三步：

```
hexo clean  //有时候配置没有立即生效需要删除cache
hexo g       //generate生成静态页面至public目录
hexo d      //hexo deploy，将.deploy目录部署到GitHub
```

可简写为：

```
hexo clean 
hexo g -d
```


### 目录介绍

- deploy：执行hexo deploy命令后准备发布的内容
- node_modules：执行npm install安装的组件
- public：执行 hexo g命令后，输出的静态html内容
- scaffolds：脚手架，layout模板文件目录
- scripts：扩展脚本目录，可以自定义javascript脚本
- source：文章的源码目录，该目录下的markdown和html均会被hexo处理；404文件、CNAME文件都应该放在这里
    - drafts：草稿
    - posts：要发布的文章
- themes：主题
- _config.yml：全局配置文件，大多数设置都在这里
- package.json：配置文件，说明nodejs依赖

### 创建新文章

```
hexo new "postName"  //新建文章
hexo new page "about"  // 新建页面
```

#### 添加统计
hexo默认使用Google Analytics，但是ga经常被墙从而会导致一些没有翻墙工具的用户加载速度过慢，转而使用百度统计。添加统计配置很简单，编辑theme目录下的_config.yml文件，增加配置项：

```
baidu_tongji: true
```

然后新建文件 theme/jackman/layout/_partial/baidu_tongji.ejs , 内容如下：

```
<% if (theme.baidu_tongji){ %>
<script type="text/javascript">
#你的百度统计代码,可以从百度统计官网注册获得
</script>
<% } %>
```

最后，编辑文件 hexo/themes/jackman/_partial/footer.ejs,在最后添加一行代码：

```
<%- partial('baidu_tongji') %>
```
