---
title: ES6之变量的解构复制
date: 2017-9-12 19:28:45
toc: true
tags:
    - JavaScript
    - ES6
---

#### 变量的解构复制
解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。

<!--more-->
##### 1 数组的解构复制
###### 1.1 基本用法
- 解构：从数组和对象中提取值，对变量进行赋值
    ```
    let a = 1;
    let b = 2;
    let c = 3;
    
    //ES6允许
    let [a, b, c] = [1, 2, 3];
    ```
- 不完全解构：等号左边的模式，只匹配一部分的等号右边的数组
    ```
    let [x, y] = [1, 2, 3];
    x // 1
    y // 2
    ```
- 如果等号的右边不是数组,那么将会报错。

###### 1.2 默认值
- 解构赋值允许指定默认值
    ```
    let [x, y = 'b'] = ['a']; // x='a', y='b'
    ```
> 注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。

- 如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。

##### 2 对象的解构赋值
- 解构不仅可以用于数组，还可以用于对象
    ```
    let { foo, bar } = { foo: "aaa", bar: "bbb" };
    foo // "aaa"
    bar // "bbb"
    ```
- 对象的解构与数组有一个重要的不同: 对象的属性没有次序，变量必须与属性同名，才能取到正确的值
- 对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者
    ```
    let { foo: baz } = { foo: "aaa", bar: "bbb" };
    baz // "aaa"
    foo // error: foo is not defined
    //上面代码中，foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo。
    ```
##### 3 字符串的解构赋值
字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。
```
const [a, b] = 'he';
a // "h"
b // "e"
```
##### 4 数值和布尔值的解构赋值
等号右边是数值和布尔值，则会先转为对象

##### 5 函数参数的解构赋值
函数的参数也可以使用解构赋值。

##### 6 圆括号问题
###### 6.1 不能使用圆括号的情况
1. 变量声明语句
    ```
    // 报错
    let [(a)]=[1];
    ```
2. 函数参数
    ```
    // 报错
    function f([(z)]) { return z; }
    ```
3. 赋值语句的模式
    ```
    // 报错
    ([a]) = [5];
    ```
###### 6.2 可以使用圆括号的情况
赋值语句的非模式部分
```
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确
```

##### 7 用途
1. 交换变量的值
    ```
    let x = 1;
    let y = 2;
    
    [x, y] = [y, x];
    ```
2. 从函数返回多个值
    ```
    // 返回一个数组
    function example() {
      return [1, 2, 3];
    }
    let [a, b, c] = example();
    
    // 返回一个对象
        function example() {
      return {
        foo: 1,
        bar: 2
      };
    }
    let { foo, bar } = example();
    ```
3. 函数参数的定义:解构赋值可以方便地将一组参数与变量名对应起来
    ```
    // 参数是一组有次序的值
    function f([x, y, z]) { ... }
    f([1, 2, 3]);
    
    // 参数是一组无次序的值
    function f({x, y, z}) { ... }
    f({z: 3, y: 2, x: 1});
    ```
4. 提取JSON数据
    ```
    let jsonData = {
      id: 42,
      status: "OK",
      data: [867, 5309]
    };
    
    let { id, status, data: number } = jsonData;
    
    console.log(id, status, number);
    // 42, "OK", [867, 5309]
    ```
5. 函数参数的默认值
    ```
    jQuery.ajax = function (url, {
      async = true,
      beforeSend = function () {},
      cache = true,
      complete = function () {},
      crossDomain = false,
      global = true,
      // ... more config
    }) {
      // ... do stuff
    };
    
    //就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句。
    ```
6. 遍历Map结构
    ```
    const map = new Map();
    map.set('first', 'hello');
    map.set('second', 'world');
    
    for (let [key, value] of map) {
      console.log(key + " is " + value);
    }
    ```