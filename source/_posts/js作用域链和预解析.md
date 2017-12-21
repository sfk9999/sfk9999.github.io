---
title: js作用域链和预解析
date: 2017-12-13 14:31:28
toc: true
tags:
    - JavaScript
---
本文主要介绍了作用域和预解析，并附上简单的小例子解释作用域和预解析是怎么工作的
<!--more-->


#### 一、作用域
- 作用域：
    - 就是变量和函数的可访问范围，控制着变量和函数的可见性与生命周期，在JavaScript中变量的作用域有全局作用域和局部作用域。
    - 执行环境（运行期上下文）：每个函数都有自己的执行环境，当执行流进入一个函数的时候，函数的环境会被推入一个函数栈中，而在函数执行完毕后执行环境出栈并被销毁，保存在其中的所有变量和函数定义随之销毁，控制权返回到之前的执行环境中，全局的执行环境在应用程序退出（浏览器关闭）才会被销毁。
- 作用域链：
    - 当代码在一个环境中执行时，会创建变量对象的一个作用域链，保证对执行环境有权访问的变量和函数的有序访问。
    - 在函数运行过程中标识符的解析是沿着作用域链一级一级搜索的过程，从第一个对象开始，逐级向后回溯，直到找到同名标识符为止，找到后不再继续遍历，找不到就报错。
- 闭包
    - 只要存在调用内部函数的可能，JavaScript就需要保留被引用的函数。而且JavaScript运行时需要跟踪引用这个内部函数的所有变量，直到最后一个变量废弃，JavaScript的垃圾收集器才能释放相应的内存空间。
    - 消耗内存大

#### 二、预解析
##### 2.1 什么是js预解析
##### 2.2 在什么情况下进行预解析
1. 遇到```<script></script>```标签对时
2. 遇到函数时（因为变量是有作用域的）

##### 2.3 js对什么进行预解析
1. **var**后面的变量
2. **函数**
3. 函数传参的变量

##### 2.4 给这些变量、函数赋予什么初始值
1. 凡是var 的，都会赋予一个``` undefined``` 作为初始值；
2. 凡是函数，直接赋予 函数本身 作为初始值；（所以这就是为什么我们可以把 函数调用 放到  函数声明 之前的原因）

##### 2.5 什么情况会改变预解析赋予的初始值
有赋值功能的符号：=,  +=,  -=,  *=,  /=,  ++,  --等

#### 三、例子
##### 3.1作用域链例子
###### 3.1.1.作用域链问题
```
var  name = "Aralic";

function person () {
   console.log(name);
   var name = "tom";
　　
}

person();
//输出undefined
//在函数执行前，会将变量和函数声明提升，因此就变为
function person(){
    var name;
    console.log(name);
    name=""
}
```

###### 3.1.2.作用域链问题(找全局作用域)
```
var name = 'Aralic';
function person() {
    alert(name);
}

function test() {
   var name = 'tom';
   person();
}

test();
//person和test函数地位相同
//所以输出Aralic
```
###### 3.1.3 立即执行函数的作用域链问题
```
var bo = 10;//全局变量  值为10
function foo() {
    console.log(this)//此处this一直指向window 所以this.bo一直是10
    console.log(bo);
    //bo全局变量  打印10
}
(function() {//自执行函数 此处this指代window
    var bo = 20;
    console.log(this.bo)//10
    foo();//依然打印10
})();
(function (func) {//自执行函数 此处this指代window
    var bo = 30;
    console.log(this.bo)//10
    func();//依然打印10
})(foo)
```

##### 3.2 预解析例子
###### 3.2.1 
```
alert(a);    
var a = '我是变量';
function a(){ alert('我是函数') }
alert(a);

// 输出
//function a(){ alert('我是函数') }   (因为undefined代表空，但函数不是空。)
//'我是变量'    (=可以改变初值)
```
```
alert(a);    
var a = function (){ '我是函数' }
//undefined,可以看出,凡是var,初始值都是undefined
```

###### 3.2.2 
```
alert(a);    
a++;
alert(a);   
var a = '我是变量';
function a(){ alert('我是函数') }
alert(a); 

//输出
//function a(){ alert('我是函数') }
//NaN   (++可以改变初始值)
//'我是变量'
```

###### 3.2.3 函数
```
alert(a);  
var a = 0;
alert(a);   
function fn(){
    alert(a);   
    var a = 2;
    alert(a);  
}
fn()
alert(a);

//输出
//undefined 
//0
//undefined (遇到函数，重新进行预解析)
//2
//0 (fn里面的a与全局的a不是同一作用域的)
```

###### 3.2.4 函数，函数中无var
```
alert(a);   
var a = 0;
alert(a);    
function fn(){
    alert(a);   
    a = 2;
    alert(a);    
}
fn()
alert(a); 

//输出
//undefined
//0
//0 (因为没var, 所以这里的a会被看作是全局的,往上查找，找到a=0,所以是0，如果全局也没有就会报错)
//2
//2 (fn把这全局的a修改了)
```

###### 3.2.5 函数参数
```
function fn(a){
    alert(a);    
    a = 2;
    alert(a);    
}
fn()
alert(a);    

//输出
//undefined (JS会把传参当作var一样对待,相当于在fn内部定义了一个变量--> var a;)
//2
//报错
```
###### 3.2.6 script标签
```
<script>
    alert(a);
</script>
<script>
    var a=0;
</script>

//输出：报错
```
###### 3.2.7 script标签
```
<script>
    var a=0;
</script>
<script>
    alert(a);
</script>

//输出：
//undefined (虽然这个<script>标签对没有定义a，但会往上查找)
```
###### 3.2.8 重复声明
```
function func1 ( num ) {
  console.log( num );
  var num = 456;
  console.log( num );
}
var num = 123;
func1( num );
```
1. 进行预解析,观察声明有两个,一个函数声明func1,一个是变量声明``var num```
    - func1被预解析记录,并与函数体相连
    - ```var num``` 被记录
2. 预解析结束,开始执行代码
    - 执行第一句话为:```num = 123``,对num进行赋值
    - 调用func1( num );
    - 在进入函数体前,开辟函数内存需要的内存空间,将函数的参数var num = 123进行声明
    - 进入函数体,开始执行预解析,观察到有个```var num```,重复声明,忽略
    - 执行函数体,第一个console.log( num ) => 123
    - num = 456,对num进行赋值
    - 第二个console.log( num ) => 456
    - 函数执行结束,回到外层


