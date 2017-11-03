---
title: Vue、React和Angular的区别
date: 2017-11-03 08:50:29
tags:
	- 前端框架
---

### MVX框架模式：MVC+MVP+MVVM
1. MVC：Model(模型)+View(视图)+controller(控制器)，主要是基于分层的目的，让彼此的职责分开。
2. MVP：是从MVC模式演变而来的，都是通过Controller/Presenter负责逻辑的处理+Model提供数据+View负责显示。
3. MVVM：MVVM是把MVC里的Controller和MVP里的Presenter改成了ViewModel。Model+View+ViewModel。
    1. View的变化会自动更新到ViewModel,ViewModel的变化也会自动同步到View上显这种自动同步是因为ViewModel中的属性实现了Observer，当属性变更时都能触发对应的操作。示。
    2. 这种自动同步是因为ViewModel中的属性实现了Observer，当属性变更时都能触发对应的操作。

### Vue.js
1. 是一个构建数据驱动的Web界面的库。Vue.js通过简单的API（应用程序编程接口）提供高效的数据绑定和灵活的组件系统.
2. Vue.js的特性如下：
    1. 轻量级的框架
    2. 双向数据绑定
    3. 指令
    4. 插件化

#### Vue.js与AngularJS的区别
1. 相同点：
    1. 都支持指令：内置指令和自定义指令。
    2. 都支持过滤器：内置过滤器和自定义过滤器。
    3. 都支持双向数据绑定。
    4. 都不支持低端浏览器。
2. 不同点：
    1. AngularJS的学习成本高，比如增加了Dependency Injection特性，而Vue.js本身提供的API都比较简单、直观。
    2. 在性能上，AngularJS依赖对数据做脏检查，所以Watcher越多越慢。  
3. Vue.js使用基于依赖追踪的观察并且使用异步队列更新。所有的数据都是独立触发的。

#### Vue.js与React的区别
1. 相同点：
    1. React采用特殊的JSX语法，Vue.js在组件开发中也推崇编写.vue特殊文件格式，对文件内容都有一些约定，两者都需要编译后使用。
    2. 中心思想相同：一切都是组件，组件实例之间可以嵌套。
    3. 都提供合理的钩子函数，可以让开发者定制化地去处理需求。
    4. 都不内置列数AJAX，Route等功能到核心包，而是以插件的方式加载。
    5. 在组件开发中都支持mixins的特性。
2. 不同点
    1. React依赖Virtual DOM,而Vue.js使用的是DOM模板。React采用的Virtual DOM会对渲染出来的结果做脏检查。（有疑问）
    2. Vue.js在模板中提供了指令，过滤器等，可以非常方便，快捷地操作DOM。
    3. Vue的性能高于React，Vue 每秒最高处理 10 帧，而 React 每秒最高处理不到 1 帧。这是由于 React 有大量的检查机制，这会让它提供许多有用的警告和错误提示信息。
    4. React 的生态系统相比 Vue 更加繁荣