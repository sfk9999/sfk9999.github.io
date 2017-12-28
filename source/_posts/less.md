---
title: less
date: 2017-12-28 14:07:21
toc: true
tags:
    - css
---
Less 是一门 CSS 预处理语言，它扩充了 CSS 语言，增加了诸如变量、混合（mixin）、函数等功能，让 CSS 更易维护、方便制作主题、扩充。
<!--more-->

#### 特点
1. 变量
2. 混合（Mixins）
3. 嵌套规则
4. 运算
5. 函数
6. 命名空间
7. 作用域
8. 注释
9. 导入（Import）

#### 原理
本质上，less 包含一套自定义的语法及一个解析器，用户根据这些语法定义自己的样式规则，这些规则最终会通过解析器，less 把这些样式规则编译成浏览器可以识别的 css 样式。less 并没有裁剪 css 原有的特性，更不是用来取代 css 的，而是在现有 css 语法的基础上，为 css 加入程序式语言的特性。less 最终需要编译成 css 文件才能起到样式的效果，我们可以称 less 为 css 样式生成工具。

#### 生命周期
beforecreated：el 和 data 并未初始化 
created:完成了 data 数据的初始化，el没有
beforeMount：完成了 el 和 data 初始化 ，此时el是{{message}}，用的虚拟DOM，先把坑占住
mounted(安装) ：完成挂载，将el填上


#### 一、入门
扩充了 CSS 语言：增加了诸如变量、混合（mixin）、函数等功能，让 CSS 更易维护、方便制作主题、扩充。

#### 二、使用Less
##### 2.1 安装
```
npm install -g less
```
##### 2.2 命令行用法
- 将less文件编译为css
    ```
    lessc style.less > style.css
    ```
- 若要输出压缩过的css，则添加-x选项。
    ```
    lessc style.less > style.css -n
    ```
- 可以通过 --clean-css 选项启用 Clean CSS 进行压缩(需要安装)

#### 二、概览
###### 2.1.1 变量
- 基本用法
    ```
    @nice-blue:#5B83AD;
    #header{
        color:@niec-blue;
    }
    ```
- URLS
    ```
    @images:"../img";
    body{
        background:url("@{images}/123.png");
    }
    ```
    ```
    // Variables
    @themes: "../../src/themes";
    
    // Usage
    @import "@{themes}/tidal-wave.less";
    ```
- 


###### 2.1.2 混合(Mixin)
混合可以将一个定义好的class A轻松的引入到另一个class B中，从而简单实现class B继承class A中的所有属性。
```
.rounded-corners (@radius: 5px) {
    border-radius: @radius;
}

#header {
    .rounded-corners;
}
#footer {
    .rounded-corners(10px);
}
```

###### 2.1.3 嵌套
可以在一个选择器中嵌套另一个选择器来实现继承
```
#header {
    h1 {
        font-size: 26px;
        font-weight: bold;
    }
}
//编译为
#header h1 {
    font-size: 26px;
    font-weight: bold;
}
```

###### 2.1.4 运算
- 运算提供了加，减，乘，除操作,我们可以做属性值和颜色的运算

###### 2.1.5 函数
Less内置了多种函数用于转换颜色、处理字符串、算术运算等。

###### 2.1.6 导入
```
@import "library";  //library.less
@import "typo.css";
```
