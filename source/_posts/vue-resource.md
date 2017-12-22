---
title: vue-resource
date: 2017-12-15 10:58:09
toc: true
tags:
    - vue
---

本文主要讲解vue-resource的作用及用法，该插件虽然不是vue的官方插件，但是也经常被用到获取服务器端的数据。
<!--more-->

- 这时候的页面都是静态的(数据在写程序的时候已经固定了不能修改)，而每个应用基本上都会请求外部数据以动态改变页面内容。对应有一个库叫 vue-resource 帮我们解决这个问题。
- vue-resource是一个通过XMLHttpRequrest或JSONP技术实现异步加载服务端数据的Vue插件
#### 一、安装
```
npm install vue-resource --save
```
在main.js引入并注册
```
import VueResource from 'vue-resource'
Vue.use(VueResource);
```
在second.vue来动态加载数据
```

```

#### 二、特点
1. 体积小
    - vue-resource非常小巧，在压缩以后只有大约12KB，服务端启用gzip压缩后只有4.5KB大小，这远比jQuery的体积要小得多。
2. 支持主流的浏览器
    - 和Vue.js一样，vue-resource除了不支持IE 9以下的浏览器，其他主流的浏览器都支持。
3.支持Promise API和URI Templates**
    - Promise是ES6的特性，Promise的中文含义为“先知”，Promise对象用于异步计算。URI Templates表示URI模板，有些类似于ASP.NET MVC的路由模板。
4. 支持拦截器
    - 拦截器是全局的，拦截器可以在请求发送前和发送请求后做一些处理。拦截器在一些场景下会非常有用，比如请求发送前在headers中设置access_token，或者在请求失败时，提供共通的处理方式。
5. 支持Promise API和URI Templates

#### 三、用法
引入vue-resource后，可以基于全局的Vue对象使用http，也可以基于某个Vue实例使用http。

基于全局
```
Vue.http.get('/someUrl', [options]).then(successCallback, errorCallback);
Vue.http.post('/someUrl', [body], [options]).then(successCallback, errorCallback);
```
在实例中使用
```
this.$http.get('/someUrl', [options]).then(successCallback, errorCallback);
this.$http.post('/someUrl', [body], [options]).then(successCallback, errorCallback);
```
then方法的回调函数
```
this.$http.get('/someUrl', [options]).then(function(response){
    // 响应成功回调
}, function(response){
    // 响应错误回调
});
```
Lambda写法
```
this.$http.get('/someUrl', [options]).then((response) => {
    // 响应成功回调
}, (response) => {
    // 响应错误回调
});
```

#### 四、支持的HTTP方法
1. get(url, [options])
2. head(url, [options])
3. delete(url, [options])
4. jsonp(url, [options])
5. post(url, [body], [options])
6. put(url, [body], [options])
7. patch(url, [body], [options])

##### 4.1 options对象

参数 | 类型 | 描述
---|---|---
url | string | 请求的URL
method | string | 
body | Object, FormDatastring | request body
params | Object | 请求的URL参数对象
headers | Object | 	request header
timeout | number | 单位为毫秒的请求超时时间 (0 表示无超时时间)
before | function(request) | 请求发送前的处理函数，类似于jQuery的beforeSend函数
progress | function(event) | 	ProgressEvent回调处理函数
credientials | boolean	| 表示跨域请求时是否需要使用凭证
emulateHTTP	| boolean | 发送PUT, PATCH, DELETE请求时以HTTP POST的方式发送，并设置请求头的X-HTTP-Method-Override
emulateJSON	| boolean | 将request body以application/x-www-form-urlencoded content type发送

##### 4.2 response对象

方法 | 类型 | 描述
---|---|---
text() | string | 以string形式返回response body
json() | Object | 以JSON对象形式返回response body
blob() | Blob | 以二进制形式返回response body

属性 | 类型 | 描述
---|---|---
ok | boolean | 响应的HTTP状态码在200~299之间时，该属性为true
status | number | 响应的HTTP状态码
statusText | string | 响应的状态文本
headers	| Object | 响应头

#### 五、示例
get请求
```
var demo = new Vue({
    el: '#app',
    data: {
        gridColumns: ['customerId', 'companyName', 'contactName', 'phone'],
        gridData: [],
        apiUrl: 'http://211.149.193.19:8080/api/customers'
    },
    ready: function() {
        this.getCustomers()
    },
    methods: {
        getCustomers: function() {
            this.$http.get(this.apiUrl)
                .then((response) => {
                    this.$set('gridData', response.data)    //$set()设置对象的属性
                })
                .catch(function(response) {
                    console.log(response)
                })
        }
    }
})
```
POST请求
```
var demo = new Vue({
    el: '#app',
    data: {
        show: false,
        gridColumns: [{
            name: 'customerId',
            isKey: true
        }, {
            name: 'companyName'
        }, {
            name: 'contactName'
        }, {
            name: 'phone'
        }],
        gridData: [],
        apiUrl: 'http://211.149.193.19:8080/api/customers',
        item: {}
    },
    ready: function() {
        this.getCustomers()
    },
    methods: {
        closeDialog: function() {
            this.show = false
        },
        getCustomers: function() {
            var vm = this
            vm.$http.get(vm.apiUrl)
                .then((response) => {
                    vm.$set('gridData', response.data)
                })
        },
        createCustomer: function() {
            var vm = this
            vm.$http.post(vm.apiUrl, vm.item)
                .then((response) => {
                    vm.$set('item', {})
                    vm.getCustomers()
                })
            this.show = false
        }
    }
})
```
PUT请求(更新)
```
updateCustomer: function() {
    var vm = this
    vm.$http.put(this.apiUrl + '/' + vm.item.customerId, vm.item)
        .then((response) => {
            vm.getCustomers()
        })
}
```
Delete请求
```
deleteCustomer: function(customer){
    var vm = this
    vm.$http.delete(this.apiUrl + '/' + customer.customerId)
        .then((response) => {
            vm.getCustomers()
        })
}
```
#### 六、inteceptor拦截器

     



