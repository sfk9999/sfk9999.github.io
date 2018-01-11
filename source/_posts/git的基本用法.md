---
title: git的基本用法
date: 2017-9-03 15:45:39
toc: true
tags:
	- git
---

## git

### 命令

#### 基本操作
git分为三个区域：工作目录，暂存区，提交区
##### 配置git
- 配置
```
git-config
```

- 配置级别
```
--local //默认，高优先级：只影响本仓库
--global //中优先级: 影响到所有当前用户的git仓库
--system //低优先级：影响到全系统的git仓库
```

- 初始化仓库
```
git-init
```
<!--more-->
##### 状态信息
- 查看当前仓库信息
```
git status
```
- 发现以下三项的变化
    - 未跟踪<->跟踪
    - 工作目录<->暂存区
    - 暂存区<->最新提交

##### 添加文件内容到暂存区（同时文件被跟踪）
- 添加单个文件
```
git add README.md
```
- **批量添加**
```
git add .
```

- 忽略文件(github有官方仓库)
```
.gitignore  //在添加时忽略匹配的文件
//仅作用于未追踪的文件
```
##### 删除
- 删除（仅从暂存区删除）
```
git rm --cached //仅从暂存区删除
```
- 删除（从暂存区与工作目录删除）
```
git rm //从暂存区与工作目录删除
```

- 删除所有被跟踪
```
git rm $(git ls-files --deleted) //删除所有被跟踪，但是在工作目录被删除的文件
```
##### **提交**（根据暂存区内容提交到提交区）
```
git commit  //所有提交跟着HEAD走
```
- 注释 -m（放在了git log里的提示）
```
git commit -m 'initial commit'  //-m命令用来注释
```

##### 工作目录直接提交到提交区
- -a
```
git commit -a -m 'full commit'
```

##### 显示提交历史信息
```
git log
```

##### 配置别名
```
git config alias.shortname <fullcommand>
```

##### 显示不同版本差异
- 工作目录与暂存区的差异
```
gjit diff
```
- 暂存区与某次提交差异，默认为HEAD
```
git diff -cached[<reference>]
```
- 工作目录与某次提交的差异
```
git diff<reference>
```
- 查看两次提交的关系
```
git diff ID ID  //传入两次ID
```

##### 撤销本地修改
- 将文件内容从暂存区复制到工作目录
```
git checkout -- <file>
```
- 撤销暂存区内容
```
git reset HEAD <file>   //将文件内容从上次提交复制到暂存区
```

##### 撤销全部改动
- 将内容从上次提交复制到工作目录（此时工作目录应和暂存区内容一致）
```
git checkout HEAD -- <file>
```
#### 分支操作
```
git branch
```
- 创建分支
```
git branch <branchName>
```

- 删除分支
```
git branch -d <branchName>
```

- 显示所有分支信息
```
git branch -v
```

##### 通过移动HEAD检出版本，可用于分支切换
- 将指针指向目标分支
```
git checkout <branchName>
```

- 创建分支并切换
```
git checkout -b <branchName>
```

- 移动到任何引用对象上
```
git checkout <reference>
```

- 恢复到上一个分支
```
git checkout -
```

- 查看分支（列出现在所有分支）
```
git branch -v   //*开头的就是当前所属分支（HEAD所指分支）
```

##### push--将本地分支的更新，推送到远程主机
- 将本地的master分支推送到origin主机的master分支。如果master不存在，则会被新建。
```
git push origin master
```

- 如果当前分支与远程分支之间存在追踪关系，则本地分支和远程分支都可以省略。
```
git push origin
```

- 如果当前分支与多个主机存在追踪关系，则可以使用-u选项指定一个默认主机，这样后面就可以不加任何参数使用git push。
```
git push -u origin master 
```


##### 将当前分支回退到历史某个版本

```
git reset --mixed <commit>  (默认)  //将内容复制到暂存区
git reset --soft <commit>   //暂存区和工作目录不改变
git reset --hard <commit>   //将内容复制到工作目录
```

##### 回退
```
git reflog
```

##### 使用捷径（代替hash ID）
```
A^  //A上的父提交
A~n //在A之前的第n次提交

A^^ //A上的父的父提交
A~2
A^~1
next~1
```

#### stash
- 保存目前的工作目标和暂存区状态，并返回到干净的工作空间
```
git stash 
```
```
git stash save 'push to stash area'
```

- 查看stash
```
git stash list
```

- 将保存的信息恢复到工作目录
```
git stash apply stash@{0}
```

- 删除stash记录
```
git stash drop stash@{0}
```

- pop
```
stash pop = stash apply +stash drop
```

#### 合并分支
```
git merge
```

- 当前在master分支合并next分支
```
git merge next
```


#### 修剪提交历史基线(变基)--不要再共有分支使用
```
git rebase
```
#### 获取远程仓库
- 初始化仓库
```
git init
```
- 配置仓库
```
git remote
```

##### 从服务器端获取代码，并同步到当前目录
```
git pull    //pull=fetch+merge
```

#### 克隆一个远程仓库作为本地仓库
```
git clone 地址 文件名   //init+remote+pull
```



