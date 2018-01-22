---
title: js性能优化
date: 2018-01-20 10:19:48
toc: true
tags:
    - JavaScript
---

本文将对前端优化的方法即场景进行总结，不间断更新
<!--more-->

#### 前端性能优化
##### 一. ajax的应用场景：
1. 用Ajax进行数据验证：整个过程不需要弹出新窗口，也不需要将整个页面提交到服务器，快速而又不加重服务器负担。
2. 按需取数据：
    1. 页面会根据用户的操作向服务器请求它所需要的数据，这样就不会存在数据的冗余，减少了数据下载总量。
    2. 同时，更新页面时不需要重载所有内容，只更新需要更新的那部分内容即可
3. 自动更新局部页面

##### 二. data缓存：
1. cookie
2. localStorage
3. sessionStorage

##### 三. CDN托管：
1. 能提供本地的数据中心；
2. 分配负载，节省带宽；
3. 可以通过不同的域名来加载文件。分布式存储

##### 四. 减少DOM操作：
1. 缓存DOM对象：比如我们获得了一个很多元素的数组data[]，需要将其每个值生成一个li元素插入到一个id为container的ul元素中。每一次循环都会去查找id为container的元素，效率自然非常低，所以我们需要将元素在循环前查询完毕，在循环中仅仅是引用就行了。
```
var ulNode = document.getElementById("container");//把查找提取出来
var liNode, i, m;
for (i = 0, m = data.length; i < m; i++) {
    liNode = document.createElement("li");
    liNode.innerText = data[i];
    ulNode.appendChild(liNode);
}
```
2. 在内存中操作元素：由于DOM操作会造成样式计算和节点重绘，方法就是加入元素时不要修改页面上已经存在的元素，而是在内存中的节点进行大量的操作，最后再一并将修改运用到页面上。
```
var ulNode = document.getElementById("container");
var liNode, i, m;
var fragment = document.createDocumentFragment();//储存页面节点片段
for (i = 0, m = data.length; i < m; i++) {
    liNode = document.createElement("li");
    liNode.innerText = data[i];
    fragment.appendChild(liNode);
}
ulNode.appendChild(fragment);
```
3. 一次性DOM节点生成：可以通过innerHTML属性来一次性生成节点，具体的思路就是使用字符串拼接的方式，先生成相应的HTML字符串，最后一次性写入到ul的innerHTML中
```
var ulNode = document.getElementById("container");
var fragmentHtml = "", i, m;
for (i = 0, m = data.length; i < m; i++) {
    fragmentHtml += "<li>" + data[i] + "</li>";
}
ulNode.innerHTML = fragmentHtml;
```
##### 五. 用className代替style：
每次修改style属性后都会触发元素的重绘，如果修改了的属性涉及大小和位置

