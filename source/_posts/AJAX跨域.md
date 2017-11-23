---
title: AJAX跨域
date: 2017-11-23 21:09:19
tags:
    - AJAX
    - JavaScript
    - 跨域
---
### 1. 同源政策
#### 1.1 含义
- 它的含义是指，A网页设置的 Cookie，B网页不能打开，除非这两个网页"同源"
- 同源指的是三个相同
    - 协议相同
    - 域名相同
    - 端口相同
```
http://www.example.com/dir/page.html
```
- 这个地址
    - 协议是http://
    - 域名是www.example.com
    - 端口是80（默认端口可以省略）
<!--more-->

#### 1.2 目的和限制范围
- 同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据。
- 限制：
    - Cookie、LocalStorage 和 IndexDB 无法读取。
    - DOM 无法获得。
    - AJAX 请求不能发送。

### 2 如何规避、限制
##### 一级域名和二级域名
- 顶级域名就是一级域名，也称裸域名，如example .com
- 二级域名就是在顶级（一级）域名前加一级，如sec.example .com

#### 2.1 Cookie，document.domain
两个网页一级域名相同，只是二级域名不同，浏览器允许通过设置相同的```document.domain```共享 Cookie。
```
document.domain = 'example.com';
```

> 注意，这种方法只适用于 Cookie 和 iframe 窗口，LocalStorage 和 IndexDB 无法通过这种方法

#### 2.2 iframe
- 如果两个网页不同源，就无法拿到对方的DOM。典型的例子是iframe窗口和window.open方法打开的窗口，它们与父窗口无法通信。
- 如果两个窗口一级域名相同，只是二级域名不同，那么设置上一节介绍的document.domain属性，就可以规避同源政策，拿到DOM。
- 对于完全不同源的网站，目前有三种方法，可以解决跨域窗口的通信问题。
    - 片段识别符（fragment identifier）
    - window.name
    - 跨文档通信API（Cross-document messaging）

##### 2.2.1 片段识别符
段标识符（fragment identifier）指的是，URL的#号后面的部分，比如http://example.com/x.html#fragment的#fragment。如果只是改变片段标识符，页面不会重新刷新。
- 父窗口可以把信息，写入子窗口的片段标识符
    ```
    var src = originURL + "#" +data;
    document.getElementById('myIFrame').src=src;
    ```
- 子窗口通过监听hashchange事件得到通知
    ```
    window.onhashchange=checkMessage;
    
    function checkMessage(){
        var message = window.location.hash;
    }
    ```
- 同样的，子窗口也可以改变父窗口的片段标识符
```
parent.location.href=target+'#'+hash;
```
##### 2.2.2 window.name
浏览器的window.name属性，这个属性的最大特点是，无论是否同源，只要在同一个窗口里，前一个网页设置了这个属性，后一个网页可以读取它。
- 父窗口先打开一个子窗口，载入一个不同源的网页，该网页将信息写入window.name属性
    ```
    window.name=data;
    ```
- 接着，子窗口跳回一个与主窗口同域的网址
    ```
    location='http://parent.url.com/xxx.html';
    ```
- 然后，主窗口就可以读取子窗口的window.name了
    ```
    var data = document.getElementById('myFrame').contentWindow.name;
    ```
- 优点：window.name容量很大，可以放置非常长的字符串；
- 缺点：必须监听子窗口window.name属性的变化，影响网页性能。

##### 2.2.3 window.postMessage(XDM)
- 以上方法都是破解方法
- HTML5为了解决这个问题，引入了一个全新的API：跨文档通信 API（Cross-document messaging）。
- 这个API为window对象新增了一个window.postMessage方法，允许跨窗口通信，不论这两个窗口是否同源。
- 举例: 父窗口http://aaa.com向子窗口http://bbb.com发消息，调用postMessage方法就可以了。
    ```
    var popup = window.open('http://bbb.com','title');
    popup.postMessage('Hello','http://bbb.com');
    ```
- postMessage(message,targetOrigin):第一个参数类型只能为字符串；第二个参数是接受消息的源(orgin)，即“协议+域名+端口”，也可以设置为*，表示不限制域名，向所有窗口发送。
- 子窗口向父窗口发送消息的写法类似
    ```
    window.opener.postMessage('Nice','http://aaa.com');
    //window.opener:创建的窗口可以引用创建它的窗口所定义的属性和函数
    ```
- 父窗口和子窗口都可以通过message事件，监听对方的消息
    ```
    window.addEventListener('message',function(e){
        console.log(e.data);
    },false);
    ```
- message事件的事件对象event，提供以下三个属性
    ```
    event.source:发送消息的窗口
    event.origin:消息发向的网址
    event.data:消息内容
    ```
- 下面的例子是，子窗口通过event.source属性引用父窗口，然后发送消息
    ```
    window.addEventListener('message', receiveMessage);
    function receiveMessage(event) {
      event.source.postMessage('Nice to see you!', '*');
    }
    ```
- event.origin属性可以过滤不是发给本窗口的消息
    ```
    window.addEventListener('message', receiveMessage);
    function receiveMessage(event) {
      if (event.origin !== 'http://aaa.com') return;
      if (event.data === 'Hello World') {
          event.source.postMessage('Hello', event.origin);
      } else {
        console.log(event.data);
      }
    }
    ```
##### 2.2.4 LocalStorage
通过window.postMessage，读写其他窗口的 LocalStorage 也成为了可能。
- 主窗口写入iframe子窗口的localStorage，子窗口将父窗口发来的信息，写入自己的LocalStorage
    ```
    window.onmessage=function(e){
        if(e.origin!=='http://bbb.com'){
            return;
        }
        var payload = JSON.parse(e.data);
        localStorage.setItem(payload.key, JSON.stringify(payload.data));
    };
    ```
- 父窗口发送消息的代码如下。
    ```
    var win = document.getElementsByTagName('iframe')[0].contentWindow;
    var obj = { name: 'Jack' };
    win.postMessage(JSON.stringify({key: 'storage', data: obj}), 'http://bbb.com');
    ```
- 加强版的子窗口接收消息的代码如下。
    ```
    window.onmessage = function(e) {
      if (e.origin !== 'http://bbb.com') return;
      var payload = JSON.parse(e.data);
      switch (payload.method) {
        case 'set':
          localStorage.setItem(payload.key, JSON.stringify(payload.data));
          break;
        case 'get':
          var parent = window.parent;
          var data = localStorage.getItem(payload.key);
          parent.postMessage(data, 'http://aaa.com');
          break;
        case 'remove':
          localStorage.removeItem(payload.key);
          break;
      }
    };
    ```
- 加强版的父窗口发送消息代码如下。
    ```
    var win = document.getElementsByTagName('iframe')[0].contentWindow;
    var obj = { name: 'Jack' };
    // 存入对象
    win.postMessage(JSON.stringify({key: 'storage', method: 'set', data: obj}), 'http://bbb.com');
    // 读取对象
    win.postMessage(JSON.stringify({key: 'storage', method: "get"}), "*");
    window.onmessage = function(e) {
      if (e.origin != 'http://aaa.com') return;
      // "Jack"
      console.log(JSON.parse(e.data).name);
    };
    ```
#### 2.3 AJAX
- 同源政策规定，AJAX请求只能发给同源的网址，否则就报错。
- 除了架设服务器代理（浏览器请求同源服务器，再由后者请求外部服务），有三种方法规避这个限制。
    - JSONP
    - WebSocket
    - CORS

##### 2.3.1 JSONP
- JSONP是服务器与客户端跨源通信的常用方法
- 特点：简单适用，老式浏览器全部支持，服务器改造非常小。
- 原理：在页面上引入不同域上的js脚本是可以的。这个js文件载入成功后会执行我们在url参数中指定的函数，并且会把我们需要的json数据作为参数传入。
- 基本思想: 网页通过添加一个script元素，向服务器请求JSON数据，这种做法不受同源政策限制；服务器收到请求后，将数据放在一个指定名字的回调函数里传回来。
- 在jQuery中可以用$.getJSON方法
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
      //该请求的查询字符串有一个callback参数，用来指定回调函数的名字，这对于JSONP是必需的。
    }
    
    function foo(data) {
      console.log('Your public IP address is: ' + data.ip);
    };
    ```
    - 服务器收到这个请求以后，会将数据放在回调函数的参数位置返回。
- 由于script元素请求的脚本，直接作为代码运行。这时，只要浏览器定义了foo函数，该函数就会立即调用。作为参数的JSON数据被视为JavaScript对象，而不是字符串，因此避免了使用JSON.parse的步骤。

##### 2.3.2 WebSocket
ebSocket是一种通信协议，使用ws://（非加密）和wss://（加密）作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信。
- 有了Origin这个字段，所以WebSocket才没有实行同源政策。

#### 2.4 CORS

### 3 CORS详解
#### 3.1 简介
- CORS是跨源资源分享（Cross-Origin Resource Sharing）的缩写。它是W3C标准，是跨源AJAX请求的根本解决方法。相比JSONP只能发GET请求，CORS允许任何类型的请求。
- 所有浏览器都支持该功能，IE浏览器不能低于IE10。
- CORS的代码与同源的AJAX通信没差别，关键是服务器
- 思想：使用自定义的HTTP头部让浏览器与服务器进行沟通。

#### 3.2 两种请求
- 浏览器将CORS请求分为两类：简单请求（simple request）和非简单请求（not-so-simple request）
- 简单请求：满足下面两个条件
    - 请求方法是以下三种方法之一：
        - HEAD
        - GET
        - POST
    - HTTP的头信息不超过以下几种字段
        - Accept
        - Accept-Language
        - Content-Language
        - Last-Event-ID
        - Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain
- 非简单请求：不满足上面两个条件

#### 3.3 简单请求
##### 3.3.1 基本流程
- 对于简单请求，浏览器直接发出CORS请求。具体来说，就是在头信息之中，增加一个Origin字段。
- Origin字段用来说明，本次请求来自哪个源（协议 + 域名 + 端口）。服务器根据这个值，决定是否同意这次请求。
- 如果Origin指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。(都以Access-Control-开头)
    - Access-Control-Allow-Origin
        - 该字段是必须的。它的值要么是请求时Origin字段的值，要么是一个*，表示接受任意域名的请求。
    - Access-Control-Allow-Credentials
        - 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可。
    - Access-Control-Expose-Headers
        - 该字段可选。CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。上面的例子指定，getResponseHeader('FooBar')可以返回FooBar字段的值。

##### 3.3.2 withCredentials属性
CORS请求默认不发送Cookie和HTTP认证信息。如果要把Cookie发到服务器，一方面要服务器同意，指定Access-Control-Allow-Credentials字段。
```
Access-Control-Allow-Credentials: true
```
另一方面，开发者必须在AJAX请求中打开withCredentials属性。(否则，即使服务器同意发送Cookie，浏览器也不会发送。或者，服务器要求设置Cookie，浏览器也不会处理。)
```
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
```

- 需要注意的是，如果要发送Cookie，Access-Control-Allow-Origin就不能设为星号，必须指定明确的、与请求网页一致的域名。
- 同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的document.cookie也无法读取服务器域名下的Cookie。

#### 3.4 非简单请求
##### 3.4.1 预检请求
- 非简单请求是那种对服务器有特殊要求的请求，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json。
- 非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight）。
- 浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求，否则就报错。
- "预检"请求用的请求方法是OPTIONS，表示这个请求是用来询问的。头信息里面，关键字段是Origin，表示请求来自哪个源。
- 除了Origin字段，"预检"请求的头信息包括两个特殊字段。
    - Access-Control-Request-Method
        - 该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，上例是PUT。
    - Access-Control-Request-Headers
        - 该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段，上例是X-Custom-Header。

##### 3.4.2 预检请求的回应
- 关键的是Access-Control-Allow-Origin字段，表示http://api.bob.com可以请求数据。该字段也可以设为星号，表示同意任意跨源请求。
- 如果浏览器否定了"预检"请求，会返回一个正常的HTTP回应，但是没有任何CORS相关的头信息字段.
- 服务器回应的其他CORS相关字段如下
    - Access-Control-Allow-Methods
        - 该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。
    - Access-Control-Allow-Headers
        - 如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。
    - Access-Control-Allow-Credentials
        - 该字段与简单请求时的含义相同。
    - Access-Control-Max-Age
        - 该字段可选，用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是20天（1728000秒），即允许缓存该条回应1728000秒（即20天），在此期间，不用发出另一条预检请求。

##### 3.4.3 浏览器的正常请求和回应
一旦服务器通过了"预检"请求，以后每次浏览器正常的CORS请求，就都跟简单请求一样，会有一个Origin头信息字段。服务器的回应，也都会有一个Access-Control-Allow-Origin头信息字段。

#### 3.5 与JSONP的比较
- CORS与JSONP的使用目的相同，但是比JSONP更强大。
- JSONP只支持GET请求，CORS支持所有类型的HTTP请求。
- JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。



[参考链接：](https://www.cnblogs.com/2050/p/3191744.html)
