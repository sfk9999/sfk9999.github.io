---
title: python基础
date: 2018-03-24 09:36:56
toc: true
tags:
    - python
---


#### 一、hello world
2.7
```
print "hello world";
```
3.0
```
print ("hello world");
```

<!--more-->

#### 二、 基础语法
##### 2.1 标识符
- 以单下划线开头 _foo 的代表不能直接访问的类属性，需通过类提供的接口进行访问，不能用 from xxx import * 而导入
- 以双下划线开头的 __foo 代表类的私有成员
- 以双下划线开头和结尾的 __foo__ 代表 Python 里特殊方法专用的标识，如 __init__() 代表类的构造函数

##### 2.2 行和缩进
python 最具特色的就是用缩进来写模块。所有代码块语句必须包含相同的缩进空白数量，这个必须严格执行

##### 2.3 多行语句
使用斜杠（ \）将一行的语句分为多行显示

##### 2.4 注释
- 多行注释使用三个单引号(''')或三个双引号(""")
- 单行注释使用#

##### 2.5 等待用户输入
```
raw_input("按下 enter 键退出，其他任意键显示...\n")
```

#### 三、 变量类型
##### 3.1 五种变量类型
- Numbers（数字）
- String（字符串）
- List（列表）：[头下标:尾下标]
    ```
    list = [ 'runoob', 786 , 2.23, 'john', 70.2 ]
    print (list[1:3])
    ```
- Tuple（元组）：元组不能二次赋值，相当于只读列表
    ```
    tuple = ( 'runoob', 786 , 2.23, 'john', 70.2 )
    ```
- Dictionary（字典）：键值对的无序的对象集合
    ```
    tinydict = {'name': 'john','code':6734, 'dept': 'sales'}
    print tinydict 
    print tinydict.keys()
    print tinydict.values()
    ```
##### 3.2 数据类型转换

函数 | 描述
---|---
int(x [,base]) | 将x转换为一个整数
long(x [,base] ) | 将x转换为一个长整数
float(x) | 将x转换到一个浮点数
complex(real [,imag]) | 创建一个复数
str(x) | 将对象 x 转换为字符串
repr(x) | 将对象 x 转换为表达式字符串
eval(str) | 用来计算在字符串中的有效Python表达式,并返回一个对象
tuple(s) | 将序列 s 转换为一个元组
list(s) | 将序列 s 转换为一个列表
set(s) | 转换为可变集合
dict(d) | 创建一个字典。d 必须是一个序列 (key,value)元组。
frozenset(s) | 转换为不可变集合
chr(x) | 将一个整数转换为一个字符
unichr(x) | 将一个整数转换为Unicode字符
ord(x) | 将一个字符转换为它的整数值
hex(x) | 将一个整数转换为一个十六进制字符串
oct(x) | 将一个整数转换为一个八进制字符串

#### 四、 运算符
##### 4.1 算数运算符
运算符 | 描述
---|---
** | 幂 - 返回x的y次幂 x**y
// | 取整除 - 返回商的整数部分

##### 4.2 逻辑运算符

运算符 | 描述
---|---
and | 且
or | 或
not | 非

##### 4.3 成员运算符

运算符	 | 描述
---|---
in | 找到返回true
not in | 没找到返回true

##### 4.4 身份运算符

运算符	 | 描述
---|---
is | 判断两个标识符是不是引用自一个对象
is not | 判断两个标识符是不是引用自不同对象


##### del
删除的是变量不是数据
```
del(变量)
```
#### 五、字典Dictionary
##### 5.1 has_key()
用于判断键是否存在于字典中，如果键在字典dict里返回true，否则返回false
```
dict.has_key(key)
```
##### 5.2 items()
以列表返回可遍历的(键，值)数组
```
dict.items()
```
##### 5.3 __dict__
```__dict__ ```是用来存储对象属性的一个字典，其键为属性名，值为属性的值
```
for item in 名
    data[item] =对象__dict__[item]
```
##### 5.4 keys()
返回所有的键
##### 5.5 values()
返回所有的值

##### 5.6 update()
把字典dict2的键/值对更新到dict里
```
dict.update(dict2)
```

- dict.clear()：删除字典内所有元素
- dict.copy(): 返回浅复制
- dict.get(key,default=None): 返回指定键的值，如果没有返回default值
- dict.setdefault(key, default=None):与get类似，如果没有则添加键并设置为default
- pop(key,[,default]):删除字典给定键 key 所对应的值，返回值为被删除的值。key值必须给出。 否则，返回default值


#### 六、List
##### 6.1 append()方法
在列表尾部添加新对象
```
list.append(obj)
```

##### 6.2 len()
返回列表元素个数
```
len(list)
```

##### 6.3 list()
将元组转换为列表
```
list(seq)
```

- list.extend(seq):在列表末尾一次性追加另一个序列中的多个值
- list.index(obj):从列表中找出某个值第一个匹配项的索引位置
- list.insert(index, obj):将对象插入列表
- list.pop(obj=list[-1]):移除列表中的一个元素（默认最后一个元素），并且返回该元素的值
- list.remove(obj):移除列表中某个值的第一个匹配项
- list.reverse():反向列表中元素
- list.sort([func]):对原列表进行排序


#### 七、OS方法
##### 7.1 popen()
用于打开一个管道
```
os.popen(command[,mode,[bufsize]])
```
- command:使用的命令
- mode:权限模式可以是'r'默认，'w'
- bufsize：文件需要的缓冲大小

##### 7.2 chdir()
用于改变当前工作目录
```
os.chdir(path)
```

#### 八、File(文件)方法
##### 8.1 readlines()
用于读取所有行并返回list，列表可以用for...in...结构进行处理
```
fileObject.readlines()
```
##### 8.2 readline()
读取一行：以字符串的形式返回结果

##### 8.3 read()
读取整个文件：以字符串的形式返回结果

##### 8.4 close()
关闭一个已打开的文件。

#### 九、json模块
##### 9.1 json.loads()
将str格式的数据转化为Python中的dict时使用
```
data = json.loads(data_json)
```
##### 9.2 json.dumps()
将dict类型的数据转成str
```
data = json.dumps(data)
```
##### 9.3 json.dump()
将str转成dict格式
```
data = json.dump(data)
```

#### 十、Str
##### str类型连接
1. +号：连接str和str
2. join()：连接str和list/元组 类型

##### join()方法
将序列中的元素以指定的字符连接成一个新的字符串
```
str.join(sequence)
```

##### eval()
将字符串str当成有效的表达式来求值并返回计算结果，相当于转成成理想的数据类型
```
eval(source[, globals[, locals]])
```
##### strip()
用于移除字符串头部指定的字符，默认为空格
```
str.strip([chars])  //chars:要移除的字符
```
##### find()
检测字符串中是否包含子字符串 str 
```
str.find(str,beg,len)
//str:指定检索的字符串
//beg:开始的索引，默认为0
//end:结束索引，默认为字符串的长度
//返回值：包含返回索引值，否则返回-1
```

#### 十一、assert断言
出现错误条件时就崩溃（返回错误）
```
assert expression
//等价于
if not expression:
    raise AssertionError
```





##### type()
返回类型:dict字典；name类的名称；bases基类的元组

##### hasattr()，getattr(),setattr()
- hasattr(object,name):判断一个对象里面是否有name属性或者name方法，返回BOOL值
- getattr(object, name[,default])
获取对象object的属性或者方法，如果存在打印出来
- setattr(object, name, values)
给对象的属性赋值，若属性不存在，先创建再赋值

#### 时间方法
##### 当前时间
```
time.time()：获取当前时间
```











