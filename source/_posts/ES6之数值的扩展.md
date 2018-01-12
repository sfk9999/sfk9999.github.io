---
title: ES6之数值的扩展
date: 2017-9-25 19:40:06
toc: true
tags:
    - JavaScript
    - ES6
---

ES6 扩展了数值
<!--more-->

#### 数值的扩展
##### 1 二进制和八进制表示法
ES6 提供了二进制和八进制数值的新的写法，分别用前缀0b（或0B）和0o（或0O）表示。
##### 2 Number.isFinite(),Number.isNaN()
- ```Number.isFinite()```用来检查一个数值是否为有限的（finite）。
- ```Number.isNaN()```用来检查一个值是否为NaN。
- 它们与传统的全局方法isFinite()和isNaN()的**区别在于**，传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效。
- Number.isFinite()对于非数值一律返回false, Number.isNaN()只有对于NaN才返回true，非NaN一律返回false。

##### 3 Number.parseInt()和Number.parseFloat()
ES6 将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。
##### 4 Number.isInteger()
用来判断一个值是否为整数(需要注意的是，在 JavaScript 内部，整数和浮点数是同样的储存方法，所以3和3.0被视为同一个值)
##### 5 Number.EPSILON
- Number.EPSILON： 极小的常量。实际上是 JavaScript 能够表示的最小精度。误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了。
- Number.EPSILON可以用来设置“能够接受的误差范围”。即如果两个浮点数的差小于这个值，我们就认为这两个浮点数相等。
```
function withinErrorMargin (left, right) {
  return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}

0.1 + 0.2 === 0.3 // false
withinErrorMargin(0.1 + 0.2, 0.3) // true

1.1 + 1.3 === 2.4 // false
withinErrorMargin(1.1 + 1.3, 2.4) // true
```
##### 6 安全整数和Number,isSafeInteger()
- JavaScript 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值。
- ```Number.MAX_SAFE_INTEGER```和```Number.MIN_SAFE_INTEGER```这两个常量，用来表示这个范围的上下限。
- ```Number.isSafeInteger()```则是用来判断一个整数是否落在这个范围之内。

##### 7 Math对象的扩展
```
Math.trunc()  //去除一个数的小数部分，返回整数部分
Math.sign()   //判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。
Math.cbrt()   //用于计算一个数的立方根
Math.clz32()  //返回一个数的32位无符号整数形式有多少个前导0
Math.imul()   //返回两个数以32位带符号整数形式相乘的结果，返回的也是一个32位的带符号整数。
Math.fround() //返回一个数的单精度浮点数形式。
Math.hypot()  //返回所有参数的平方和的平方根
```
- 对数方法
```
Math.expm1(x)   //返回ex - 1，即Math.exp(x) - 1
Math.log1p(x)   //返回1 + x的自然对数，即Math.log(1 + x)。如果x小于-1，返回NaN。
Math.log10(x)   //返回以10为底的x的对数。如果x小于0，则返回NaN。
Math.log2(x)    //返回以2为底的x的对数。如果x小于0，则返回NaN。
```
- 双曲函数方法
```
Math.sinh(x)    //返回x的双曲正弦（hyperbolic sine）
Math.cosh(x)    //返回x的双曲余弦（hyperbolic cosine）
Math.tanh(x)    //返回x的双曲正切（hyperbolic tangent）
Math.asinh(x)   //返回x的反双曲正弦（inverse hyperbolic sine）
Math.acosh(x)   //返回x的反双曲余弦（inverse hyperbolic cosine）
Math.atanh(x)   //返回x的反双曲正切（inverse hyperbolic tangent）
```
##### 8 指数运算符
指数运算符（**）
```
2 ** 3 // 8
```