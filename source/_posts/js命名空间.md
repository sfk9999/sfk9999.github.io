---
title: js命名空间
date: 2017-12-28 10:02:34
toc: true
tags:
    - JavaScript
---
前言：在JavaScript中全局变量经常会引起命名冲突，甚至有时侯重写变量也不是按照你想像中的顺序来的，因此使用JS自己的变通方式建立命名空间很重要。
<!--more-->
##### 1.使用对象字面量来打包
```
var MYNAMESPACE = {
    PEOPLE: {
        person: function(name) {
            this.name = name;
            this.getName = function() {
                return this.name;
            }
        }
    },
    PET: {
        dog: function(petName) {
            this.petName = petName;
            this.getPetName = function() {
                return this.petName;
            }
        }
    }
};

```
person对象被完整包含到MYNAMESPACE这个命名空间中了
```
var p = new MYNAMESPACE.person("ifcode");
```

##### 2.通过JSON对象创建Object
```
var NameSpace = window.NameSpace || {};
NameSpace.Hello = {
    name: 'world',
    sayHello: function(_name) {
        return 'Hello ' + (_name || this.name);
  }
};
```
调用
```
NameSpace.Hello.sayHello('JS');
```

##### 3.通过闭包实现
通过一个JSON Object返回公有接口
```
var NameSpace = window.NameSpace || {};
NameSpace.Hello = (function() {
  //待返回的公有对象
  var self = {};
  //私有变量或方法
  var name = 'world';
  //公有方法或变量
  self.sayHello = function(_name) {
    return 'Hello ' + (_name || name);
  };
  //返回的公有对象
  return self;
}());
```
也可以
```
var NameSpace = window.NameSpace || {};
NameSpace.Hello = (function() {
  var name = 'world';
  var sayHello = function(_name) {
    return 'Hello ' + (_name || name);
  };
  return {
    sayHello: sayHello
  };
}());
```

