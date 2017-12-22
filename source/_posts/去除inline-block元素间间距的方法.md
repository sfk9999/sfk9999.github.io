---
title: 去除inline-block元素间间距的方法
date: 2017-10-13 09:18:35
toc: true
tags:
    - CSS
---

#### 一、现象描述
- 真正意义上的inline-block水平呈现的元素间，**换行显示或空格分隔**的情况下会有间距
- 我们使用CSS更改非inline-block水平元素为inline-block水平，也会有该问题

#### 二、解决办法
<!--more-->

1. 移除标签间的空格
    - 元素间留白间距出现的原因就是标签段之间的空格
    - 因此，去掉HTML中的空格，自然间距就没有了
2. 使用margin负值
    - 但是不适合大规模使用
    - 对于12像素大小的上下文，Arial字体的margin负值为-3像素，Tahoma和Verdana就是-4像素，而Geneva为-6像素
3. 取消标签闭合（为了兼容IE6/IE7，最后一个标签需要闭合。）
    ```
    //在html5中
    <div class="space">
        <a href="##">惆怅
        <a href="##">淡定
        <a href="##">热血
    </div>
    ```
4. 使用font-size:0
    ```
    //在父元素中
    .space {
        font-size: 0;
        -webkit-text-size-adjust:none;
    }
    ```
5. 使用letter-spacing字符间距(搞定基本上所有浏览器)
    ```
    .space {
        letter-spacing: -3px;
    }
    .space a {
        letter-spacing: 0;
    }
    ```
6. 使用word-spacing单词间距
    ```
    .space {
        word-spacing: -6px;
        display: inline-table;//添加inline-table或者table，可以让chrome无间距
    }
    .space a {
        word-spacing: 0;
    }
    ```
