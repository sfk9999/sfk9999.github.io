---
title: vue实战笔记
date: 2017-12-22 14:24:32
toc: true
tags:
    - vue
---

本文主要记录了在实战vue.js时碰到的问题
<!--more-->
#### 一、安装
命令行工具(cli方法)
```
//安装webpack
npm install webpack -g

// 全局安装 vue-cli(建议使用淘宝镜像:安装cnpm)
$ npm install --global vue-cli
```
创建项目
```
// 创建一个基于 webpack 模板的新项目
$ vue init webpack my-project

// 安装依赖
$ cd my-project

$ npm install (安装依赖)
```
安装 vue 路由模块vue-router和网络请求模块vue-resource
```
$ npm install vue-router vue-resource --save
```

运行
```
$ npm run dev (运行)
//这一行命令代表着它会去找到package.json的scripts对象，执行node bulid/dev-server.js。
```
#### 二、坑
template 写 html，script写 js，style写样式
##### 2.1 
一个组件下只能由一个并列的div
```
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
    <div id="app-in">
      some
    </div>
  </div>
</template>
```
而不能这样写
```
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
  <div id="app-in">
    some
  </div>
</template>
```
##### 2.2 
data要用return返回
```
<script>
export default{
     data:function(){
        return{
            msg:"hello"
        }
    }
}
</script>
```

##### 2.3props
在组件中，props是专门用来暴露组件的属性接口的，这里给了一个默认值‘下载’，后面我们要使用的话，只需要```<btn msg="确认"></btn>``` 就可以修改按钮的默认文案了。
```
<script>
  export default {
    props: {
      msg: {
        default: '下载'
      }
    }
  }
</script>
```

#### 三、在页面中引用组件
```
<template>
  <div id="pageQuiButton">
    <!--使用-->
    <qui-btn msg="确定" class="small"></qui-btn>
  </div>
</template>
<script>
  import quiBtn from '../components/quiButton.vue' /*引用*/
  export default {
    name: 'pageQuiButton',
    components: {
      'qui-btn': quiBtn /*注册自定义标签*/
    }
  }
</script>
```
#### 四、export default和new Vue
创建一个Vue的实例 就是相当于创建一个根组件
```
vm = new Vue({}) 
```
export default是ES6的module的语法


#### 五、私有样式
```
<style scoped>
    //表明样式是私有的，在组件上就不会冲突
</style>
```

#### 六、 .$mount('#app')
假如需要延迟挂载，可以在之后手动调用vm.$mount()方法来挂载

####  七、 render: x => x(App)
render函数是渲染一个视图，然后提供给el挂载，如果没有render那页面什么都不会出来

#### 八、更改配置
##### 8.1 修改config/index.js
```
assetsPublicPath: './', //这样打包后引入的js和css文件就能找到
```
##### 8.2 更改端口
项目/config/index.js的port变量

##### 8.3 webpack.base.conf
webpack.base.conf文件，这是核心文件，必须执行的文件，这里可以看到entry和output，这就是入口和输出路径，在入口处看到了./src/main.js，这就找到了界面的入口处了。

#### 九、打包
```
npm run build
```
打包完成后会提示
![image](http://upload-images.jianshu.io/upload_images/1997956-332338c7d8a01d57.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 打开index.html文件://不工作
此时就要把config\index.js中的build对象的assetsPublicPath中的"/"改为"./"

#### 十、文件
main.js
```
/*引入Vue框架*/
import Vue from 'vue'
/*引入资源请求插件*/
import VueResource from 'vue-resource'
/*重置样式*/
import "assets/css/base.css"
/*基本JS*/
import "assets/js/common.js"
/*引入路由设置*/
import "./routers.js"
/*使用VueResource插件*/
Vue.use(VueResource)
```

#### 十一、钩子
组件加载完毕后自动运行的钩子
```
mounted(){
    this.FnName();
}
```
#### 十二、引入外部文件
##### 12.1.引入jQuery
```
npm install jquery --save
```
修改配置：build文件夹下的webpack.base.conf.js文件。
```
//加入webpack对象：
var webpack = require("webpack");
```
在module.exports对象里加入
```
plugins: [// 3. 配置全局使用 jquery
     new webpack.ProvidePlugin({
     $: "jquery",
     jQuery: "jquery",
     jquery: "jquery",
     "window.jQuery": "jquery"
})],
```
将jq文件放到src/assets或者最外层的static文件夹中。就可以引入了
```
<script>
import '../static/jquery.js'
</script>
```

##### 12.2.引入css
```
<style lang="css">  
@import './index.css'  
</style>  

//或者  
<style lang="css" src="./index.css"></style>  
```

##### 12.3.引入less
安装less模块
```
npm install less --save-dev  
npm install less-loader --save-dev  
```
写法
```
<style lang="less" scoped>//在这个部分添加lang="less"  
//less样式  
</style> 

//引用
<style lang="less" src="./index.less"></style>
```
##### 12.4.引入Element
```
npm i element-ui -S
```
src/main.js
```
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
```
就可以在.vue中直接使用了
