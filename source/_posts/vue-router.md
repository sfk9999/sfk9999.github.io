---
title: '''vue-router'''
date: 2017-12-21 12:55:35
toc: true
tags:
    - vue
    
---
本文介绍vue-router如何搭建和使用
<!--more-->

### vue 路由
#### 一、安装
```
npm install vue-router --save
```
如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能：
```
//在main.js中
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
```

#### 二、基础
##### 2.1 开始
将组件(components)映射到路由(routes)，然后告诉 vue-router 在哪里渲染它们。
```
//*.vue文件中
<router-link to="/first">第一个路由</router-link>
//使用 router-link 组件来导航
//通过传入 `to` 属性指定链接.
//<router-link> 默认会被渲染成一个 `<a>` 标签
```
多层级的入口
```
<router-link to="/mine" tag="li">       //tag指定标签名
    <i class="icon-nav icon-nav5"></i><span>我的</span>
</router-link>

<!-- 渲染结果 -->
<li>
    <i class="icon-nav icon-nav5"></i>
    <span>我的</span>
</li>
```
路由出口
```
<!-- 路由匹配到的组件将渲染在这里 -->
 <router-view></router-view>
```
main.js中
```
//1.定义路由
import first from '@/components/first'

const routes={
    path:'/first',
    component:first
}

//2.创建router实例，传"routes"配置
import routers from './router'

const router =new VueRouter({
    routes  //缩写，相当于 routes:routes
})

//3. 创建和挂载根实例
// 记得要通过 router 配置参数注入路由，从而让整个应用都有路由功能
const app = new Vue({
    router
}).$mount('#app')
```
要注意，当 router-link 对应的路由匹配成功，将自动设置 class 属性值 .router-link-active。

##### 2.2 动态路由匹配

```
const router = new VurRouter({
    routes:[
        <!--动态路径参数 以冒号开头-->
        {
            path:'user/:id',
            component:user
        }
    ]
})
```
此时像/user/foo和/user/bar都能映射到路由里

- $route.params
```
const User={
    temp;ate:'<div>{{$route.params.id}}</div>'
}
```
存放着在路由中设置的动态路径参数

#### 三、router.js
如果组件较多，可以单独把路由拿出来写一个router.js文件
```
// 0. 如果使用模块化机制编程，进入Vue和VueRouter，要调用 Vue.use(VueRouter)  
import Vue from 'vue'  
import VueRouter from 'vue-router'  
Vue.use(VueRouter)  
  
// 1. 定义（路由）组件。  
// 可以从其他文件 import 进来，我们一般都是建好了组件再来写路由的  
// 所以就会有好多这样的语句。  
import home from "./components/home"  
import login from "./components/login"  
  
// 2. 定义路由  
  routes: [ //这里跟1.x有挺大区别，有接触的自己看清楚哦  
    {  
      path: '/',    //浏览器网路请求走通之后默认就会去找域名下的根目录，  
      name: 'home', //所以我们就把这个组件作为默认首页  
      component: home  
    },  
    {  
      path: '/login',  
      name: 'login',  //添加name属性，可以在router-link中直接写name
      component: login  
    }  
   ]  
  
// 3. 创建 router 实例，然后传 `routes` 配置  
const router = new VueRouter({        
  routes,  //（缩写）相当于 routes: routes  
  mode: 'history', //history: 依赖 HTML5 History API 和服务器配置。URL 就像正常的 url
  base: __dirname,
})  
  
// 4. 创建和挂载根实例。  
// 记得要通过 router 配置参数注入路由，  
// 从而让整个应用都有路由功能  
const app = new Vue({  
  router  
}).$mount('#app')  
// 现在，应用已经启动了！  
```
新建好的router.js文件要在main.js中import进来
```
//main.js
import "./routers.js"

//如果你在options里声明了挂载的el，就不用再手动mount了
var app = new Vue({
    el: '#app',  //不需要
    router,
    render: h => h(App) //新添加的函数操作
}).$mount('#app');
```

#### 四、懒加载
1. 解决样式冲突问题 
2. 解决页面资源加载问题 
3. 路由被访问时才加载对应组件，提高应用加载效率

- 做法
```
//将
import home form "./components/home"
//改为异步组件
const home = resolve => require(['./home.vue'], resolve)
```

#### 五、当前路由添加激活状态
vue-router提供了当前路由激活时，自动添加类名，默认 router-link-active。我们也可以在创建vue-router实例的时候给他设置全局配置，修改默认添加类名。
```
linkActiveClass:'link-active'
```

#### 六、路由跳转时添加过渡动效
在app.vue中
```
<div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
</div>
```
css
```
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
```

#### 七、路由传参
拿到路由传来的参数：this.$route
```
<li>
    <router-link 
        :to="{
            name:'dataInput',
            params:{
                value:mine.trueName,
                proName:'trueName',
                title:'修改名字'
            }
        }">
        <span>名字</span>
        <div class="enter-btn"><img src="../assets/img/enter-btng@3x.png"></div>
        <span class="hint">{{mine.trueName}}</span>
    </router-link>
</li>
```
script中
```
data(){
    return{
        choose: this.$route.params.value,
        title: this.$route.params.title
    }
}
```

#### 八、编程式导航
修改属性后，又回到原来的路由。参数是一个整数，意思是在 history 记录中向前或者后退多少步
```
this.$router.go(-1);
```
导航到不同的url
```
router.push(location)
//这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。 
```
router.replace(location)：和push的区别是不会向history添加记录









