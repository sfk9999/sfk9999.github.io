---
title: 为什么JSONP只支持GET请求
date: 2018-04-19 08:25:44
toc: true
tags:
    - AJAX
    - JavaScript
---

JSONP是跨域中的老方法，和CORS相比优点是兼容老版本浏览器，缺点是只支持get请求。那么为什么JSONP只支持get请求呢？

首先我先介绍一下他的原理

<!--more-->

#### JSONP
- JSONP是服务器与客户端跨源通信的常用方法
- 特点：简单适用，老式浏览器全部支持，服务器改造非常小。
- 基本思想: 网页通过添加一个script元素，向服务器请求JSON数据，这种做法不受同源政策限制；服务器收到请求后，将数据放在一个指定名字的回调函数里传回来。
- 并且是异步的
- 步骤
    - 首先，网页动态插入script元素，由它向跨源网址发出请求
    ```
    function addScriptTag(src) {
      var script = document.createElement('script');
      script.setAttribute("type","text/javascript");
      script.src = src;
      document.body.appendChild(script);
    }
    
    window.onload = function () {
      addScriptTag('http://example.com/ip?callback=foo');
      // 该请求的查询字符串有一个callback参数，用来指定回调函数的名字，这对于JSONP是必需的。
    }
    
    function foo(data) {
      console.log('Your public IP address is: ' + data.ip);
    };
    ```
    - 服务器收到这个请求以后，会将数据放在回调函数的参数位置返回。
- 由于script元素请求的脚本，直接作为代码运行。这时，只要浏览器定义了foo函数，该函数就会立即调用。作为参数的JSON数据被视为JavaScript对象，而不是字符串，因此避免了使用JSON.parse的步骤。

#### 为什么只能用GET
其实背后的流程是：

- 触发script标签中的src属性的地址，这个请求带有回调函数。
    ```
    <script src="http://path/to/server/b?A=a&B=b&callbackFunctionName=myCallback"></script>
    ```
- 处理好了请求后，返回回调的函数myCallback()
- 完成跨域

可以看到，JSONP的最终目的是要向服务器请求数据然后回调，但是其实真真实的原因是post和xmlHttpRequest方法在使用的时候都会去检查是否跨域，而get方法会欺骗浏览器而得到所需要的数据。

- 这里所用的欺骗的意思是，
    - 代码向浏览器发送一个请求：我要一个js文件，
    - 浏览器：好的，
    - 代码就利用回调函数拿到数据。