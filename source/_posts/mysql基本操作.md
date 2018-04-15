---
title: mysql基本操作
date: 2018-04-15 10:57:13
toc: true
tags:
    - true
---
#### 一、启动mysql
```
mysqld_safe &  //启动mysql

mysqladmin -u root -p shutdown //关闭mysql

ps -e | grep mysql //查看mysql进程
```

<!--more-->

#### 二、进入mysql
```
mysql -uroot -pPWord
mysql -h hostName -uroot -p  //用不同的Host来登陆
```
```
可能是修改密码
mysqladmin -uroot -新密码 password "PWord"

修改密码方法2：
mysql> use mysql;

mysql> UPDATE user SET Password = PASSWORD('PWord') WHERE user = 'root';
```

#### 三、mysql命令
```
show databases;
use mysql //用这个数据库
show tables; //查看这个数据库的表
select * from user;  
\G  //查询末尾加\G，格式化输出
\q  //退出数据库
```
其他命令
```
create database db_name //创建新数据库
```
##### 3.1 常用命令
```
select * from 表
where   //特定条件  select * from employees where age>20 && age<30
//select * from employees1 where age like '2%' 以2开头的
order by lastname (asc/decs)    //排序
limit   //只显示数据行的一个子集
```
##### 3.2 查看操作
```
show databases; //列出数据库
show tables;    //显示指定数据库的所有表，要先use
show columns from 数据表; //显示表的属性，属性类型，主键，是否为Nul，默认值等
show index from 数据表; //显示数据表的详细索引信息
```
##### 3.3 创建数据库
```
mysqladmin -uroot -p creat 数据库名

create database appspider default character set utf8;   //创建数据库appspider
```
##### 3.4 where
MySQL 的 WHERE 子句的字符串比较是不区分大小写的。 你可以使用 BINARY 关键字来设定 WHERE 子句的字符串比较是区分大小写的。
```
SELECT * from runoob_tbl WHERE BINARY runoob_author='runoob.com';
```

##### insert插入操作
```
insert into tableName [(字段)] values (值1,值2);
```

##### 3.5 update
```
update table-name set name=new-value [where id=n];
```
##### 3.6 delete
```
delete from table_name [where clause]   //没有where则删除整个表
```
如果想删除数据后Id重新从1开始用truncate
```
truncate table table_name
```

##### 3.7 like
- like通常与%同时使用；
- 可以用AND或者OR指定一个或多个条件
```
select * from table_name where author like '%COM'   //含有COM的内容
```

##### 3.8 union
用于连接两个以上的 SELECT 语句的结果组合到一个结果集合中。多个 SELECT 语句会删除重复的数据。
```
select expression1,expression2 from tables [where conditions] union [all|distinct] select expression1,expression2 from tables [where conditions]
//DISTINCT: 可选，删除结果集中重复的数据。默认
//ALL：可选，返回所有结果集，包含重复数据。
```
##### 3.9 order by
```
asc|desc //升序|降序
```
##### 3.10 group by
sum,avg,count
```
select * from table_name where name=value group by column_name; //按照name进行分组

select name,COUNT(*) from table_name group by name; //统计该name出现的数量
```
with rollup：可以实现在分组统计数据基础上再进行相同的统计
```
select nam,sum(字段) as 新字段 from table_name group by name with rollup;   //统计每个name的'字段'的数据之和；并且NULL表示总和
```
coalesce来设置一个取代NULL的名称
```
select coalesce(a,b,c);//如果a==null,则选择b；如果b==null,则选择c；如果a!=null,则选择a；如果a b c 都为null ，则返回为null（没意义）
```
```
select coalesce(name,'总和'),sum(字段) as 新字段 from table_name group by name with rollup;
```
##### 3.11 join

##### 3.12 NULL
关于 NULL 的条件比较运算是比较特殊的。你不能使用 = NULL 或 != NULL 在列中查找 NULL 值 。在 MySQL 中，NULL 值与任何其它值的比较（即使是 NULL）永远返回 false，即 NULL = NULL 返回false 。
```
IS NULL //当列的值是 NULL,此运算符返回 true。
IS NOT NULL //当列的值不为 NULL, 运算符返回 true。
<=> //比较操作符（不同于=运算符），当比较的的两个值为 NULL 时返回 true。
```
例子
```
SELECT * FROM runoob_test_tbl WHERE runoob_count IS NULL;
```

##### 3.13 正则 REGEXP
```
SELECT name FROM person_tbl WHERE name REGEXP '^st';
```
##### 3.14 ALTER命令
删除字段，只剩一个无法删除
```
ALTER TABLE testalter_tbl  DROP i;  //删除testalter_tbl表中的i字段

ALTER TABLE testalter_tbl ALTER i DROP DEFAULT;  //删除字段的默认值
```
添加字段
```
ALTER TABLE testalter_tbl ADD i INT;
```
如果要指定新增字段的位置，可以用FIRST(设定位第一列)，AFTER(设定位于某个字段之后)
```
ALTER TABLE testalter_tbl ADD i INT FIRST;
ALTER TABLE testalter_tbl ADD i INT AFTER c;
```
修改： MODIFY 或 CHANGE
```
ALTER TABLE testalter_tbl MODIFY c CHAR(10);    //修改表testalter_tbl中c字段的类型

ALTER TABLE testalter_tbl CHANGE j j INT;   //在 CHANGE 关键字之后，紧跟着的是你要修改的字段名，然后指定新字段名及类型。

ALTER TABLE testalter_tbl MODIFY j BIGINT NOT NULL DEFAULT 100;//指定字段 j 为 NOT NULL 且默认值为100，否则默认为NLL
```
修改表名
```
ALTER TABLE testalter_tbl RENAME TO alter_tbl;
```
修改表的类型
```
ALTER TABLE testalter_tbl ENGINE = MYISAM;
```
##### 3.15 索引
- 索引分单列索引和组合索引
    - 单列索引：即一个索引只包含单个列，一个表可以有多个单列索引
    - 组合索引：即一个索引包含多个列。
- 索引大大提高了查询速度，同时却会降低更新表的速度
    - 如对表进行INSERT、UPDATE和DELETE；因为更新表时，MySQL不仅要保存数据，还要保存一下索引文件。



```
sudo service mysql star
```

