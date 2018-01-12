---
title: glup自动化构建项目实例
date: 2017-10-26 11:01:56
toc: true
tags:
    - glup
---
这是一个用glup自动化构建项目的配置，生成了html,css文件，以及为生成的html文件配置对应的css文件的引用
<!--more-->
```
var gulp = require('gulp');
var argv = require('yargs').argv;
var fs = require('fs');
var cheerio = require('cheerio');

gulp.task('create', function() {
    var root = process.cwd();//当前文件路径
    var demoName=argv.n;//新建demo名称
    var htmlPath = root+'/pagesDemo/'+demoName+'.html';//新建demo的html文件
    var tempHtml = root+'/pagesDemo/temp.html';//模板html文件
    var cssPath = root+'/pagesDemo/css/'+demoName+'.css';//新建demo的css文件
    var tempCss = root+'/pagesDemo/css/temp.css';//模板css文件
    //生成html文件
    console.log('creating demo html :'+htmlPath);
    if(fs.existsSync(htmlPath)){
        console.log(demoName+'.html is already existed!!');
        process.exit(1);
    }
    var tempHtmlContent = fs.readFileSync(tempHtml);
    fs.writeFileSync(htmlPath,tempHtmlContent);
    console.log(htmlPath+' is created!!');

    //生成css文件
    console.log('creating demo css :'+cssPath);
    if(fs.existsSync(cssPath)){
        console.log(demoName+'.css is already existed!!');
        process.exit(1);
    }
    var tempCssContent = fs.readFileSync(tempCss);
    fs.writeFileSync(cssPath,tempCssContent);
    console.log(cssPath+' is created!!');

    //将html中css的引用地址和css文件生成的地址对应起来
    var content = fs.readFileSync(htmlPath);
    $ = cheerio.load(content);
    $('title').append(demoName);
    $('head').append('    <link rel="stylesheet" href="css/'+demoName+'.css">');

    fs.writeFile(htmlPath, $.html(),function(err){
        if(err) throw err;
        console.log("html link changed");
    });
});

gulp.task('new',['create']);
//运行 gulp new --n=demoName
```