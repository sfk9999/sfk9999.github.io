---
title: ES6之数组的扩展
date: 2017-10-08 19:46:30
toc: true
tags:
    - JavaScript
    - ES6
---

ES6 扩展了数组
<!--more-->

#### 数组的扩展
##### 1 扩展运算符
###### 1.1 含义
- 扩展运算符（spread）是三个点（```...```），将一个数组转为用逗号分隔的参数序列
    ```
    console.log(...[1, 2, 3])
    // 1 2 3
    ```
- 该运算符主要用于函数调用，将一个数组，变为参数序列

###### 1.2 替代数组的apply方法
由于扩展运算符可以展开数组，所以不再需要apply方法，将数组转为函数的参数了。
```
function f(x, y, z) {
  // ...
}

// ES5 的写法
var args = [0, 1, 2];
f.apply(null, args);

// ES6的写法
let args = [0, 1, 2];
f(...args);
```
###### 1.3 扩展运算符的应用
1. 复制数组
```
//es5
const a2 = a1.concat();

//es6
// 写法一
const a2 = [...a1];
// 写法二
const [...a2] = a1;
```
2. 合并数组
```
// ES5
arr1.concat(arr2, arr3);

// ES6
[...arr1, ...arr2, ...arr3]
```
3. 与解构赋值组合
    - 扩展运算符可以与解构赋值结合起来，用于生成数组
4. 字符串
    - 扩展运算符还可以将字符串转为真正的数组
    ```
    [...'hello']
    // [ "h", "e", "l", "l", "o" ]
    ```
5. 实现了Iterator接口的对象（任何 Iterator 接口的对象，都可以用扩展运算符转为真正的数组。如：nodeList对象）
6. Map和Set结构，Generator函数

##### 2 Array.form()
- ```Array.from()```方法用于将：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）转为真正的数组。
    ```
    // ES5的写法
    var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
    
    // ES6的写法
    let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
    ```
- 实际应用中，常见的类似数组的对象是DOM操作返回的NodeList集合，以及函数内部的arguments对象

##### 3 Array.of()
- ```Array.of()```方法用于将一组值，转换为数组。
- 这个方法的主要目的，是弥补数组构造函数Array()的不足。只有当参数个数不少于2个时，Array()才会返回由参数组成的新数组。
- Array.of基本上可以用来替代Array()或new Array()，并且不存在由于参数不同而导致的重载。

##### 4 数组实例的copyWithin()
- 在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。(使用这个方法，会修改当前数组。)
    ```
    //可以接受3个参数，这三个参数都应该是数值，如果不是，会自动转为数值。
    target  //（必需）：从该位置开始替换数据。
    start   //（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。
    end     //（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。
    ```
- 例子
    ```
    [1, 2, 3, 4, 5].copyWithin(0, 3)
    // [4, 5, 3, 4, 5]
    ```
##### 5 数组实例的find()和findIndex()
- ```find()```：用于找出第一个符合条件的数组成员。
- 它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。
- ```findIndex()```： 返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
- 这两个方法都可以发现NaN

##### 6 数组实例的fill()
该方法使用给定值，填充一个数组。还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
```
['a', 'b', 'c'].fill(7)
// [7, 7, 7]

new Array(3).fill(7)
// [7, 7, 7]
```
##### 7 数组实例的entries(),key()和values()
- 用于遍历数组。都返回一个遍历器对象，可以用for...of循环进行遍历
- keys()是对键名的遍历
- values()是对键值的遍历
- entries()是对键值对的遍历。

##### 8 数组实例的includes()
Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似

##### 9 数组的空位
- 数组的空位指，数组的某一个位置没有任何值。
- ES5大多数情况下会忽略空位
- ES6则是明确将空位转换为undefined
