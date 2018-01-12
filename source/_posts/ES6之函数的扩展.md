---
title: ES6之函数的扩展
date: 2017-10-05 19:41:56
toc: true
tags:
    - JavaScript
    - ES6
---

ES6 扩展了函数，也就是传说中的函数参数的默认值和箭头函数
<!--more-->


#### 函数的扩展
##### 1 函数参数的默认值
###### 1.1 基本用法
- ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。
- 参数变量是默认声明的，所以不能用let或const再次声明。
- 使用参数默认值时，函数不能有同名参数。
- 参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。
```
function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
```
###### 1.2 与解构赋值默认值结合使用
```
function foo({x, y = 5}) {
  console.log(x, y);
}

foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
```
###### 1.3 参数默认值的位置
通常情况下，定义了默认值的参数，应该是函数的尾参数。
###### 1.4 函数的length属性
length属性的返回值，等于函数的参数个数减去指定了默认值的参数个数。
###### 1.5 作用域
一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。
###### 1.6 应用
利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误。
```
function throwIfMissing() {
  throw new Error('Missing parameter');
}

function foo(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}

foo()
// Error: Missing parameter
```
##### 2 rest参数
- rest 参数（形式为```...变量名```），用于获取函数的多余参数，这样就不需要使用arguments对象了。
- rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
- rest 参数之后不能再有其他参数（即只能是最后一个参数）
- 函数的length属性，不包括 rest 参数。

##### 3 严格模式
只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。

##### 4 name属性
- 函数的name属性，返回该函数的函数名。
- 如果将一个匿名函数赋值给一个变量. ES6 的name属性会返回实际的函数名。
- Function构造函数返回的函数实例，name属性的值为anonymous。
- bind返回的函数，name属性值会加上bound前缀。
```
function foo() {}
foo.name // "foo"

//匿名函数
var f = function () {};
f.name // "f"
```

##### 5 箭头函数
```
() => { … }     // 零个参数用 () 表示； 
x => { … }      // 一个参数可以省略 ()； 
(x, y) => { … } // 多参数不能省略 ()；
```
###### 5.1 基本用法
- “箭头”（=>）定义函数。
    ```
    var f = v => v;
    
    //等价于
    var f = function(v) {
      return v;
    };
    ```
- 如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。
    ```
    var f = () => 5;
    // 等同于
    var f = function () { return 5 };
    
    var sum = (num1, num2) => num1 + num2;
    // 等同于
    var sum = function(num1, num2) {
      return num1 + num2;
    };
    ```
- 如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。
    ```
    var sum = (num1, num2) => { return num1 + num2; }
    ```
- 由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。
    ```
    let getTempItem = id => ({ id: id, name: "Temp" });
    ```
- 如果箭头函数只有一行语句，且不需要返回值，可以采用下面的写法，就不用写大括号了
    ```
    let fn = () => void doesNotReturn();
    ```
- 箭头函数可以与变量解构结合使用。
    ```
    const full = ({ first, last }) => first + ' ' + last;

    // 等同于
    function full(person) {
      return person.first + ' ' + person.last;
    }
    ```
- 不一定非要接return之后的语句
    ```
    $("btn").click(event=>{
        palyTrumpet();
        fireConfettiCannon();
    });
    ```

###### 5.2 使用注意点
1. 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。（意味着在箭头函数中，this是固定的,引用的外层的this）
2. 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误
3. 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替
4. 不可以使用yield命令，因此箭头函数不能用作 Generator 函数
5. 没有constructor方法
6. 没有prototype
7. 在箭头函数中call()和apply()无效