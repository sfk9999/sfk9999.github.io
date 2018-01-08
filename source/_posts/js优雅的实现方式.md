---
title: js优雅的实现方式
date: 2018-01-03 12:47:15
toc: true
tags:
    - JavaScript
---


本文介绍了一些常用的方法，也列出部分对应的ES6方法
<!--more-->


#### 1. 数组去重
##### 1.1 普通版
定义一个变量数组 res 保存结果，遍历需要去重的数组，如果该元素已经存在在 res 中了，则说明是重复的元素，如果没有，则放入 res 中。
```
var a=[1,2,"1","2",1];
function unique(arr){
    var res=[];
    for(let i=0;i<arr.length;i++){
        var item=arr[i];
        for(let j=0;j<res.length;j++){
            if(item=res[j]){
                break;
            }
        }
        //如果循环完毕，即可说明item在res中找不到
        if(j===res.length){
            res.push(item);
        }
    }
    return res;
}
```
缺点： 看起来比较臃肿比较繁琐，时间复杂度比较高O(n^2)

##### 1.2 ES6版
ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
```
const unique = a => [...new Set(a)]
```
缺点：兼容性问题，现代浏览器才支持，有 babel 这些都不是问题。

#### 2.数字格式化(千分位分隔符)
##### 2.1 正则版
```
function formatNumber(str){
    return str.replace(/\B(?=(\d{3})+(?!\d))/g,',');
}
```
下面简单分析下正则/\B(?=(\d{3})+(?!\d))/g：
1. /\B(?=(\d{3})+(?!\d))/g：正则匹配边界\B，边界后面必须跟着(\d{3})+(?!\d);
2. (\d{3})+：必须是1个或多个的3个连续数字;
3. (?!\d)：第2步中的3个数字不允许后面跟着数字;
4. (\d{3})+(?!\d)：所以匹配的边界后面必须跟着3*n（n>=1）的数字。
5. 最终把匹配到的所有边界换成,即可达成目标。

##### 2.2 ES6版
1. toLocaleString()方法
```
(123456789).toLocaleString('en-US')  // 1,234,567,890
```
2. Intl对象：
```
new Intl.NumberFormat().format(1234567890) // 1,234,567,890
```
Intl 对象是 ECMAScript 国际化 API 的一个命名空间，它提供了精确的字符串对比，数字格式化，日期和时间格式化。Collator，NumberFormat 和 DateTimeFormat 对象的构造函数是 Intl 对象的属性。

#### 3. 将arguments对象转换成数组
##### 3.1 普通版
```
var arr = Array.prototype.slice.call(arguments);
```
##### 3.2 ES6版
使用 Array.from, 值需要对象有 length 属性, 就可以转换成数组
```
var arr = Array.from(arguments);
```
扩展运算符
```
var args = [...arguments];
```

#### 4. 数组求和
##### 4.1 普通版
```
let arr=[1,2,3,4];
function sum(arr){
    let x=0;
    for(let i=0;i<arr.length;i++){
        x+= arr[i];
    }
    return x;
}
```
##### 4.2 优雅版
```
let arr=[1,2,3,4];
function sum(arr){
    return arr.reduce((a,b)=>a+b);
}
```



