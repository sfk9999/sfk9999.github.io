---
title: ES6之Class
date: 2018-01-23 16:12:33
toc: true
tags:
    - JavaScript
    - ES6
---

本文介绍了ES6的Class，已经如何用它实现继承

#### 1. 简介
- 类不存在变量提升
- 允许继承原生构造函数定义子类

<!--more-->

```
class Bar(){
    doStuff(){
        
    }
}
var b = new Bar();
b.doStuff();
```
等同于
```
Bar.prototype={
    doStuff(){}
};
```
类的内部所有的定义的方法，都是不可枚举的。

#### 2. constructor方法
constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。

#### 3. class表达式
```
const MyClass = class Me{
    getClassName(){
        return Me.name;
    }
};
//这个类的名字是MyClass
//Me只是在Class的内部代码可用，指代当前类
```
可以省略
```
const MyClass = class {};
```

#### 4. class继承
可以通过extends关键字实现继承
```
class Point {
    
}
class ColorPoint extends Point{
    constructor(x,y,color){
        super(x,y);//调用父类的constructor(x,y)
        this.color=color;
    }    
    toString(){
        return this.color+''+super.toStrng();//调用父类的toStrng()
    }
}
```
super关键字，表示父类的构造函数，用来新建父类的this对象

子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。


##### 4.1 super关键字
既可以当函数使用，也可以当对象使用。

###### 4.1.1 当函数调用
super()当函数调用，代表父类的构造函数。并且只能用在子类的构造函数constructor()中。
```
class A {
  constructor() {
    console.log(new.target.name);
  }
}
class B extends A {
  constructor() {
    super();
  }
}
new A() // A
new B() // B
```

> 注意，super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B，因此super()在这里相当于A.prototype.constructor.call(this)。

意味着通过super的this指向子类

###### 4.1.2 作为对象时
- super作为对象时
    - 在普通方法中，指向父类的原型对象：由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。
    - 在静态方法中，指向父类

1. 在普通方法中
```
class A {}
A.prototype.x = 2;

class B extends A {
  constructor() {
    super();
    console.log(super.x) // 2
  }
}

let b = new B();
```
this的指向问题
```
class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
    super.x=3;
    console.log(super.x);//undefined
    console.log(this.x);//3
  }
  m() {
    super.print();
  }
}

let b = new B();
b.m() // 2

//super.print()虽然调用的是A.prototype.print()，但是A.prototype.print()内部的this指向子类B，导致输出的是2，而不是1。也就是说，实际上执行的是super.print.call(this)。

//由于this指向子类，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。
```

> ES6 规定，通过super调用父类的方法时，方法内部的this指向子类。

2. 在静态方法中super将指向父类
```
class Parent{
    static myMethod(msg){
        
    }
}
```
静态方法：如果在一个方法前， 加上static关键字， 就表示该方法不会被实例继承， 而是直接通过类来调用
```
class Foo {  
    static classMethod() {  
        return 'hello';  
    }  
}  
Foo.classMethod() // 'hello'  
var foo = new Foo();  
foo.classMethod()  // TypeError: foo.classMethod is not a function 
```
