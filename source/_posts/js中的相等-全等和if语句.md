---
title: 'js中的相等,全等和if语句'
date: 2017-10-03 19:15:38
toc: true
tags:
    - JavaScript
---
本文介绍了js中==，===和if的转换方式以及判断流程
<!--more-->


#### 比较运算符==
对于x==y比较，Type()为变量的类型。
1. 若Type(x)与Type(y)相同，则
    1. 若 Type(x,y) 为 Undefined， 返回 true。
    2. 若 Type(x,y) 为 Null， 返回 true。
    3. 若 Type(x,y) 为 Number， 则
        1. 若 x 为 NaN， 返回 false。
        2. 若 y 为 NaN， 返回 false。
        3. 若 x 与 y 为相等数值， 返回 true。
        4. 若 x 为 +0 且 y 为 −0， 返回 true。
        5. 若 x 为 −0 且 y 为 +0， 返回 true。
        6. 返回 false。
    4. 若 Type(x,y) 为 String, 则当 x 和 y 为完全相同的字符序列（长度相等且相同字符在相同位置）时返回 true。 否则， 返回 false。
    5. 若 Type(x,y) 为 Boolean, 当 x 和 y 为同为 true 或者同为 false 时返回 true。 否则， 返回 false。
    6. 当 x 和 y 为引用同一对象时返回 true。否则，返回 false。
2. 若 x 为 null 且 y 为 undefined， 返回 true。
3. 若 x 为 undefined 且 y 为 null， 返回 true。
4. 若 Type(x) 为 Number 且 Type(y) 为 String，返回比较 x == ToNumber(y) 的结果。
5. 若 Type(x) 为 String 且 Type(y) 为 Number，返回比较 ToNumber(x) == y 的结果。
6. 若 Type(x) 为 Boolean， 返回比较 ToNumber(x) == y 的结果。
7. 若 Type(y) 为 Boolean， 返回比较 x == ToNumber(y) 的结果。
8. 若 Type(x) 为 String 或 Number，且 Type(y) 为 Object，返回比较 x == ToPrimitive(y) 的结果。
9. 若 Type(x) 为 Object 且 Type(y) 为 String 或 Number， 返回比较 ToPrimitive(x) == y 的结果。
10. 返回 false。

注意：
1. 要比较相等性之前，不能将null和undefined转换成其他任何值。
2. NaN不等于NaN

判断流程：
1. 若类型不同，则按===规则判断
2. 类型不同，则启用隐式类型转换
    1. 有NAN，一律返回false
    2. 有布尔类型，布尔类型转换成数字比较
    3. 有string类型，两种情况： 1. 对象，对象用toString方法转换成string相比。2.数字，string类型转换成数字进行比较
    4. null和undefined不会相互转换，相等
    5. 有数字类型，和对象相比，对象用valueof转换成原始值进行比较
    6. 其他情况，一律返回false

#### 全等运算符===
对于x===y比较，Type()为变量的类型
1. 如果 Type(x) 与 Type(y) 的结果不一致，返回 false，否则
2. 如果 Type(x,y) 结果为 Undefined，返回 true
3. 如果 Type(x,y) 结果为 Null，返回 true
4. 如果 Type(x,y) 结果为 Number，则
    1. 如果 x 为 NaN，返回 false
    2. 如果 y 为 NaN，返回 false
    3. 如果 x 与 y 为同一个数字，返回 true
    4. 如果 x 为 +0，y 为 -0，返回 true
    5. 如果 x 为 -0，y 为 +0，返回 true
    6. 返回 false
5. 如果 Type(x,y) 结果为 String，如果 x 与 y 为完全相同的字符序列（相同的长度和相同的字符对应相同的位置），返回 true，否则，返回 false
6. 如果 Type(x,y) 结果为 Boolean，如果 x 与 y 都为 true 或 false，则返回 true，否则，返回 false
7. 如果 x 和 y 引用到同一个 Object 对象，返回 true，否则，返回 false

判断流程
1. 类型不同，不等
2. null，undefined，boolean，number这四个类型的只要值(数值)相等，就相等，-0 === 0 //true
3. 只要其中有一个为NAN，则不等
4. string类型，长度/内容/编码不同，都是不等，相同位置包含相同的16位，相等
5. 指向相同的对象，数组，函数，则相等，若指向不同对象，不等

#### if()
- if()会对条件进行Boolean转换
- 对于String类型的值，任何非空字符串返回true，空字符串返回false
- 对于Number类型的值，任何非零数字值(包括无穷大)，返回true；0和NaN返回false
- 对于Object类型的值，任何对象返回true，null返回false
- 对于Undefined类型，返回false(
- 对于null类型，返回false