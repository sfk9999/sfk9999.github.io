---
title: cookie、sessionStorage和localStorage
date: 2017-12-04 21:23:17
tags:
    - JavaScript
---
#### 1. cookie
cookie:存储在用户本地终端上的数据。有时也用cookies，指某些网站为了辨别用户身份，进行session跟踪而存储在本地终端上的数据，通常经过加密。

#### 2. HTML5的2种方法
都是仅在客户端（浏览器）中保存，不参与服务器的通信
<!--more-->

##### 2.1 localStorage
- 没有时间限制的数据存储
- 创建
    ```
    <script>
    localStorage.lastName="Simth";
    </script>
    ```
- 下面的例子针对用户访问页面的次数进行计算
```
if(localStorage.pagecount){
    localStorage.pagecount=Number(localStorage.pagecount)+1;
}
else{
    localStorage.pagecount=1;
}
```

##### 2.2 sessionStorage
- sessionStorage针对一个session的数据存储，当用户关闭浏览器窗口后，数据被删除。
- 创建
    ```
    sessionStorage.lastname="Simth";
    ```

#### 3. cookie、 sessionStorage 、localStorage之间的区别
- 共同点：都是保存在浏览器端，且是同源的
- 区别：

特性 | Cookie | localStorage | sessionStorage
---|---|---|---
数据的生命期 | 可设置失效时间，默认是关闭浏览器后失效 | 除非被清除，否则永久保存 | 	仅在当前会话下有效，关闭页面或浏览器后被清除
存放数据大小 | 4K左右 | 一般为5MB | 一般为5MB
与服务器端通信 | 每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题 | 仅在客户端（即浏览器）中保存，不参与和服务器的通信 | 仅在客户端（即浏览器）中保存，不参与和服务器的通信
易用性 | 需要程序员自己封装，源生的Cookie接口不友好 | 源生接口可以接受，亦可再次封装来对Object和Array有更好的支持 | 源生接口可以接受，亦可再次封装来对Object和Array有更好的支持

- 作用域不同，sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面；localStorage在所有同源窗口中都是共享的；cookie也是在所有同源窗口中都是共享的。Web Storage 支持事件通知机制，可以将数据更新的通知发送给监听者。Web Storage 的 api 接口使用更方便。
- Web Storage 支持事件通知机制，可以将数据更新的通知发送给监听者
- Web Storage 的 api 接口使用更方便

- 场景
    - Cookie：考虑到每个 HTTP 请求都会带着 Cookie 的信息，比较常用的一个应用场景就是判断用户是否登录。





