---
title: vue的生命周期
date: 2018-01-15 10:22:22
toc: true
tags:
    - vue
---

本文重新对vue的声明周期进行了总结

#### vue的声明周期
vue的生命周期主要分为8个阶段：

创建前后，挂载前后，更新前后，销毁前后

![img](vue的声明周期/1.png)

<!--more-->

##### el
- el：提供一个在页面上已存在的DOM元素作为Vue实例的挂载目标。表示：指Vue实例挂载的元素节点
    - 在实例挂载之后，元素可以用vm.$el访问。
- vm.$el：vue实例使用的根DOM元素

##### 2. 8个阶段的详解
- 创建前：beforeCreate：el 和 data 并未初始化 
- 创建后：created：完成了 data 数据的初始化，el没有
- 挂在前：beforeMount：完成了 el 和 data 初始化 ，虚拟DOM
- 挂载后：mounted：完成挂载，完成DOM
- 更新前：beforeUpdate：数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
- 更新后：updated：当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
    - 然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或 watcher 取而代之。
- 销毁前：beforeDestory：实例销毁之前调用。在这一步，实例仍然完全可用。
- 销毁后：destoryed：Vue 实例销毁后调用。调用后，Vue实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。


##### 3. 总结
- beforecreate : 举个栗子：可以在这加个loading事件 
- created ：在这结束loading，还做一些初始化，实现函数自执行 
- mounted ： 在这发起后端请求，拿回数据，配合路由钩子做一些事情
- beforeDestory： 你确认删除XX吗？ 
- destoryed ：当前组件已被删除，清空相关内容
