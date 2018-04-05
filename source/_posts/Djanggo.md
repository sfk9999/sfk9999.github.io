---
title: Djanggo
date: 2018-03-25 09:37:44
toc: true
tags:
    - python
---

#### 一、特点
1. 强大的数据库功能：拥有强大的数据库操作接口（QuerySet API），如需要也能执行原生SQL。
2. 自带强大后台： 几行简单的代码就让你的网站拥有一个强大的后台，轻松管理内容！
3. 优雅的网址： 用正则匹配网址，传递到对应函数，随意定义，如你所想！
4. 模板系统： 强大，易扩展的模板系统，设计简易，代码，样式分开设计，更容易管理。

注：前后端分离时，也可以用Django开发API，完全不用模板系统。

5. 缓存系统： 与Memcached, Redis等缓存系统联用，更出色的表现，更快的加载速度。
6. 国际化： 完全支持多语言应用，允许你定义翻译的字符，轻松翻译成不同国家的语言。

<!--more-->

#### 二、 简介
- urls.py：网址入口，关联到对应的views.py中的一个函数（或者generic类），访问网址就对应一个函数。
- views.py：处理用户发出的请求，从urls.py中对应过来, 通过渲染templates中的网页可以将显示内容，比如登陆后的用户名，用户请求的数据，输出到网页。
- models.py：与数据库操作相关，存入或读取数据时用到这个，当然用不到数据库的时候 你可以不使用。
- forms.py：表单，用户在浏览器上输入数据提交，对数据的验证工作以及输入框的生成等工作，当然你也可以不使用。
- templates 文件夹：views.py 中的函数渲染templates中的Html模板，得到动态内容的网页，当然可以用缓存来提高速度。
- admin.py：后台，可以用很少量的代码就拥有一个强大的后台。
- settings.py：Django 的设置，配置文件，比如 DEBUG 的开关，静态文件的位置等。

#### 三、基本命令
1. 新建一个 django project

```
django-admin.py startproject project_name
```
2. 新建 app
要先进入项目目录下，```cd project_name``` 然后执行下面的命令（下同，已经在项目目录下则不需要 cd project_name）
```
python manage.py startapp app_name
```
3. 创建数据库表 或 更改数据库表或字段

Django 1.7.1及以上 用以下命令
```
# 1. 创建更改的文件
python manage.py makemigrations
# 2. 将生成的py文件应用到数据库
python manage.py migrate
```
 
```
旧版本的Django 1.6及以下用
python manage.py syncdb
```

4. 使用开发服务器

开发使用，不要用在生产环境
```
python manage.py runserver
 
# 当提示端口被占用的时候，可以用其它端口：
python manage.py runserver 8001
python manage.py runserver 9999
（当然也可以kill掉占用端口的进程，具体后面有讲，此处想知道的同学可查下 lsof 命令用法）
 
# 监听机器所有可用 ip （电脑可能有多个内网ip或多个外网ip）
python manage.py runserver 0.0.0.0:8000
# 如果是外网或者局域网电脑上可以用其它电脑查看开发服务器
# 访问对应的 ip加端口，比如 http://172.16.20.2:8000
```

#### 四、 settings.py
要将新创建的app加到INSTALLED_APPS中
```
INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
 
    //新加的app
    'appinfo',
)
```

- file变量：可以获取到当前文件的路径
    - os.path.dirname(__file__) 得到文件所在目录，再来一个os.path.dirname()就是目录的上一级，BASE_DIR 即为 项目 所在目录。
- DEBUG＝True 时，如果出现 bug 便于我们看见问题所在，但是部署时最好不要让用户看见bug的详情
- ALLOWED_HOSTS 允许你设置哪些域名可以访问，即使在 Apache 或 Nginx 等中绑定了，这里不允许的话，也是不能访问的。
    - DEBUG=False 时，这个为必填项，如果不想输入，可以用 ALLOW_HOSTS = ['*'] 来允许所有的。
- BACKEND：缓存


#### 五、
##### 5.1 views:
```
//定义一个函数
def functionName():
```
- objects.get()：返回对象，关键表的数据，只能获取一个多余2条都会报错，用来获取Models对象
- objects.filter()：返回对象列表，用来获取Models对象
- objects.all()：返回的是QuerySet对象

筛选
```
data = StatsAPI.objects.filter(is_del = 0)  //select * from StatsAPI where is_del=0
```
筛选时加上或条件
```
data=data.filter(Q()|Q())
```
values()返回的是ValuesQuerySet，它是QuerySet的子类

###### 5.1.1 request.GET()
- 可以看成一个字典，用GET方法传递的值都会保存到其中
- 网页的值传到服务器是通过``` <input> ```或 ```<textarea>```标签中的 name 属性来传递的
- 可以用 request.GET.get('key', '{}')来取值，没有时不报错。


##### 5.2 urls.py:
```
url(正则表达式,);

url(r'^add/$', calc_views.add, name='add'),
//可以起一个name
```
可以在html页面中使用动态地址
```
```
##### 5.3 models.py
修改了models后，可以在manage.py的文件夹下，输入一下面命令来创建数据库
```
//为新加的类创建相应的表
# Django 1.6.x 及以下
python manage.py syncdb
 
# Django 1.7 及以上的版本需要用以下命令
python manage.py makemigrations
python manage.py migrate
```
修改models.py的字段：要用south(第三方库)
```
pip install South
```
[link](https://code.ziqiangxuetang.com/django/django-schema-migration.html)





##### Field types
- AutoField
- BgiAutoField
- BigIntegerField：-9223372036854775808 to 9223372036854775807
- BinaryField：btyes
- BooleanField
- CharField
- TextField：大量的文字
- DateField:额外参数
    - auto_now:
    - auto_now_add:
- DateTimeField
- DecimalField：
    - max_digits:数字中允许的最大位数
    - decimal_places:最小位数
- DurationField:时间段
- EmailField
- FileField
    - upload_to：
    - storage
- FilePathField
- FloatField
- ImageField
- IntegerField
- TextField:对应着textarea
- TimeField
- URLField
