---
title: ES6之Promise对象
date: 2018-01-11 16:51:23
toc: true
tags:
    - JavaScript
    - ES6
---
Promise是用来传递异步操作的消息对象，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。

#### 1. Promise含义
- Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。
- 所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
- 从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。

##### 1.1 特点
1. 对象的状态不受外界影响：
    - 有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。
    - 只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果
    - Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected

- 缺点：
    - 无法取消Promise，一旦新建它就会立即执行，无法中途取消。
    - 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部
    - 当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

<!--more-->

#### 2. 基本用法
Promise对象是一个构造函数，用来生成Promise实例。
```
const promise = new Promise(function(resolve,reject){
    if(/*异步操作成功*/){
        resolve(value);
    }else{
        reject(error);
    }
});
```
- resolve和reject两个函数，由 JavaScript 引擎提供，不用自己部署。
    - resolve函数：状态从“未完成”变为“成功”，在异步操作成功时调用，并将异步操作的结果，作为参数传递出去
    - reject函数：状态从“未完成”变为“失败”，在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

#### 3. Promise.prototype.then()
then()方法：Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。
```
promise.then(function(value){
    //success
},function(error){
    //failure
});
```
- 参数：then方法可以接受两个回调函数作为参数。
    - 第一个回调函数是Promise对象的状态变为resolved时调用，
    - 第二个回调函数是Promise对象的状态变为rejected时调用。
    - 其中，第二个函数是可选的，不一定要提供。
- 返回值：then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）

> then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行

链式调用then()：第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。
```
getJSON("/posts.json").then(function(json) {
  return json.post;
}).then(function(post) {
  // ...
});
```
#### 4. Promise.prototype.catch()
Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。
```
const promise = new Promise(function(resolve, reject) {
  throw new Error('test');
});
promise.catch(function(error) {
  console.log(error);
});

//等同
promise.then(null,function(error){
    console.log(error);
})
```

##### 4.1 实例
一般总是建议，Promise 对象后面要跟catch方法，这样可以处理 Promise 内部发生的错误。catch方法返回的还是一个 Promise 对象，因此后面还可以接着调用then方法。
```
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing()
.catch(function(error) {
  console.log('oh no', error);
})
.then(function() {
  console.log('carry on');
});
//如果没有报错，则会跳过catch方法。
```

#### 5. Promise.all()
Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
```
const p = Promise.all([p1, p2, p3]);
```

- p的状态由p1、p2、p3决定，分成两种情况。
    - 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
    - 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

#### 6. Promise.race()
Promise.race方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。
```
const p = Promise.race([p1, p2, p3]);
```
只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

#### 7. Promise.resolve()
起到将现有对象转为 Promise 对象的作用
- 参数的四种情况
    - 1：一个Promise实例：不做任何修改
    - 2：一个thenable对象：指的是具有then方法的对象：转为 Promise 对象，然后就立即执行thenable对象的then方法。
    - 3：不是具有then方法的对象，或根本就不是对象：返回一个新的 Promise 对象，状态为resolved。
    - 4：不带有任何参数：直接返回一个resolved状态的 Promise 对象。

#### 8. Promise.reject()
Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。

#### 9. 附加方法
done()和finally()

#### 10. 应用
加载图片
```
const preloadImage = function (path) {
  return new Promise(function (resolve, reject) {
    const image = new Image();
    image.onload  = resolve;
    image.onerror = reject;
    image.src = path;
  });
};
```



