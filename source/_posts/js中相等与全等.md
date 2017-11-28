---
title: js中相等与全等
date: 2017-11-28 13:40:25
tags:
    - JavaScript
---

#### 相等运算符"=="
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

#### 全等运算符"==="
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
