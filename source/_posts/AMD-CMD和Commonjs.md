---
title: 'AMD,CMD和Commonjs'
date: 2018-04-22 21:04:05
toc: true
tags:
    - JavaScript
---

AMD | CMD | CommonJS
---|---|---
提前执行 | 延迟执行 | - 
依赖前置 | 依赖就近 | -  
浏览器端加载 | 浏览器端加载 | 服务器端加载
异步 | 异步 | 同步

<!--more-->

#### 一、Commonjs
- 有一个全局性方法require()，用于加载模块
- require是同步的。
```
var math = require('math');
math.add(2,3);
// 但是这个方法在浏览器中运行，第二行代码必须要等math.js加载完成。如果时间长了就有问题。
```
- require：模块引用
- exports：模块定义
- module：模块标识

##### 2.1 原理
只要能够提供module,exports,require,global四个变量，浏览器就能加载CommonJS模块。

#### 二、AMD（异步模块定义）
为了解决Commonjs中require同步加载的问题。

require()语句加载模块，要求两个参数
```
require([module],callback);

require(['math'],function(math){
    math.add(2,3);
})
```
- [module]：是一个数组，里面的成员就是要加载的模块。
- callback：加载后的回调函数。

目前主要有两个JS库实现了AMD规范：requre.js和curl.js

##### 2.1 语法
模块必须采用define()函数中定义，如果一个模块不依赖其他模块，可以直接定义在define()函数之中。

```
//math.js
define(function(){
    var add = function(x,y){
        return x+y;
    };
    return {
        add: add
    }
});
```
如果这个模块还要加载其他模块，则define()函数的第一个参数必须是一个数组，指明该模块的依赖性。
```
define(['myLib'],function(){});
```

##### 2.2 加载非规范的模块
如果加载非规范的模块，必须在require()加载之前，用require.config()方法定义它们的一些特性。

#### 三、CMD
这个规范更偏向于commonjs的规范。

应用：seaJS


#### 四、CMD和AMD的区别

AMD | CMD | CommonJS
---|---|---
提前执行 | 延迟执行 | - 
依赖前置 | 依赖就近 | -  
浏览器端加载 | 浏览器端加载 | 服务器端加载
异步 | 异步 | 同步

##### 4.2 依赖前置和依赖就近
AMD依赖前置
```
define(['./a','./b'],function(a,b){
    a.doSomething()
})
```

CMD依赖就近
```
define(function(require,exports,module){
    var a = require('./a')
    a.doSomething()
    
    var b = requre('./b')
}
```


