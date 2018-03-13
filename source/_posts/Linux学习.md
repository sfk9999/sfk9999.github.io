---
title: Linux学习
date: 2018-03-13 22:28:35
toc: true
tags:
    - Linux
---

全新的开始：好久没有写博客了，刚到百度来实习，学习新的技术，导致没有抽出时间来总结所学的知识，现在重写捡起来

以下是Linux的基本命令

<!--more-->

#### 一、文件和目录操作命令
- ctrl+c：强制关闭
- ctrl+d：关闭
- ctrl+z：把当前的程序挂起。
    - fg：将后台中的命令调至前台运行，多个任务要加编号
    - bg：将一个在后台暂停的命令，变成继续执行
    - jobs：查看当前有多少在后台运行的命令

##### 1.1 ls命令：显示一般文件

1. ls -a： 显示一般+隐藏文件
2. ls -l： 查看更详细的文件资料 //感觉就是ll
3. ls -F： 再列出的文件名称后加一符号，例如可执行文件加”*”, 目录则加 “/”。
4. ll:显示所有文件

##### 1.2 cd命令
- 后面不加任何东西回到Home目录
- 返回上级目录： cd ..

##### 1.3 mkdir rmdir
1. 来建立新的目录mkdir
```
mkdir work
// 将在当前目录下新建一个 work 目录
```
2. 删除目录
```
rmdir work
//将删除已存在的空目录work
```

##### 1.4 cp：复制命令
```
cp -r 源文件(source) 目的文件(target)
//参数 r 是指连同源文件中的子目录一同拷贝。
```
- 参数
    - -a:保留链接、文件属性，并递归地拷贝目录
    - -r:若给出的源文件是一目录文件，此时cp将递归复制该目录下所有的子目录和文件
    - -f:删除已经存在的目标文件
```
cp dir/* .   //复制一个目录下的所有文件到当前目录
```

###### 1.4.1 scp
不同Linux之间可以用scp来复制文件
```
scp -r work@cp01 :home/work/app/client/bower_components/ng-table ./
```


##### 1.5 rm：删除文件
1. rm -i test： 删除名为test的文件
2. rm -r 目录名：删除目录下面的子目录
3. rm -f 文件名： 不经确认强制删除文件
4. rm -rf 删除文件夹和里面的文件
5. rm -R 删除所有

##### 清空文件里的内容
1. echo方法
```
echo "" > 文件名
```
2. >
```
> 文件名
```

##### 1.6 mv： 移动目录或文件
1. 移动
```
mv /tmp/xxx.tar /root
//将/tmp 目录下的xxx.tar 文件移动到/root 目录下
```
2. 引申的功能是给目录或文件重命名
```
mv aaa.tar bbb.tar
//将当前目录下的文件 aaa.tar 更名为bbb.tar
```

#### 1.7 查看文件
##### 1.7.1 cat 查看文件
显示或连结一般的ascii 文本文件
```
cat text    //该命令显示text 这个文件的内容。
cat file1 file2 //依顺序显示file1,file2 的内容
cat file1 file2>file3   //把file1,file2 的内容结合起来再重定向>到file3 文件中
```
也可以创建文件
```
cat>>filename
```

##### 1.7.2 more 查看文件
显示一般文本文件的指令。如果一个文本文件太长了超过一个屏幕的画面，用cat 来看实在是不理想，就可以试试more 
```
more file1
```
##### 1.7.3 less：与more相似，但是可以搜索字符和翻页

##### 1.8 pwd：显示用户当前的工作路径

##### 1.9 curl命令
curl命令是一个利用URL规则在命令行下工作的文件传输工具。它支持文件的上传和下载。一般用于下载
```
curl(选项)(url)
```

选项 | 描述
---|---
-d | HTTP POST方式发送数据
-H | 自定义头信息发送给服务器





#### 二、rpm
##### 2.1 查看已安装的软件
1. 列出已经安装的全部软件包 
```
rpm -qa
```
2. 指定软件包的名称（或者部分名称）
```
rpm -qa | grep 'tomcat'
```
3. 删除已安装的软件
```
rpm -e packagename
```
#### 三、查看进程
```
ps -e | grep 'name'
//-e 显示所有进程
//grep 查找

ps -aux | grep 'name'
/-aux:用BSD的格式来显示
```

#### 四、 修改密码
```
passwd
passwd 用户名
```
退出登陆
```
exit
```
#### 五、 切换用户
```
su  //切换了root身份，但Shell环境仍然是普通用户的Shell
su - //切换了root身份和环境
```

#### 六、 文件压缩tar命令
- 参数：以下3个参数不可重复
    - -c:建立一个压缩文件的参数指令
    - -x:解开衣蛾压缩文件的参数指令
    - -t:查看tarfile里的文件
    - -u:更新原压缩包里的文件
- 参数:
    - -z:用gzip压缩
    - -j:bzip2压缩
    - -v:压缩的过程中显示文件
    - -f:生成档案的名字：要用f需要把它放在最后
    - -p:使用源文件的原来属性
    - -P:使用绝对路径来压缩
    - -N:比后面接的日期(yyyy/mm/dd)还要新的才会压缩进去
```
tar -czf 名.tar.gz 文件夹/
tar -cf jpg.tar *.jpg   //将目录里所有的jpg文件压缩
```
#### 七、 发送，上传文件
上传
```
sz filename //发送文件到本地
```
发送
```
rz filename //上传文件到服务器
```
#### 八、 比较diff
比较目录时，比较两个目录下名字相同的文件
```
diff [参数] [1] [2]
```
vimdiff
```
vim diff file_left file_right
```


#### 杂项
查看主机域名
```
hostname 
```
重启ssh
```
service sshd restart
```
ping
```
ping 'ip'
```
查看ip
```
ipconfig
```
查看端口被什么占用
```
lsof -i:端口号
netstat -tunlp | grep 端口号
```
删除npm镜像
```
npm config delete registry
npm config delete disturl
```


