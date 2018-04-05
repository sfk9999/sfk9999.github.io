---
title: bootstrap
date: 2018-04-05 09:57:50
toc: true
tags:
    - bootstrap
---

项目中用到了bootstrap，特来学习总结一下，主要是布局其他的官网上查还是很方便的

<!--more-->

### 一、 全局CSS样式
- .container：类似于固定宽度并支持响应式布局的容器
- .container-fluid：布局容器，类似于100%宽度，占据全部视口的容器

#### 1.1 网格系统

header 1 | 超小设备手机（```<768px```) | 小型设备平板电脑（≥768px） | 中型设备台式电脑（≥992px）| 大型设备台式电脑（≥1200px）
---|---|---|---|---
网格行为 | 一直是水平的 | 以折叠开始，断点以上是水平的 | 以折叠开始，断点以上是水平的 | 以折叠开始，断点以上是水平的
最大容器宽度 | None (auto) | 750px | 970px | 1170px
```Class``` 前缀 | ```.col-xs-``` | ```.col-sm-``` | ```.col-md-``` | ```.col-lg-```

```
<div class="row">
  <div class="col-*-*"></div>
  <div class="col-*-*"></div>      
</div>
```

偏移：col-md-offset-3
```
如果占据了6列，要居中就偏移(12-6)/2=3
```

#### 1.2 表格
##### 1.2.1 基本表格
类 | 描述
---|---
.table | 基本的样式：少量的内补（padding）和水平方向的分隔线
.table-striped | 增加斑马条纹样式
.table-borderd | 为每个单元格增加边框
.table-hover | 鼠标悬停
.table-condensed | 紧缩表格，padding会减半

##### 1.2.2 状态类

Class | 描述
---|---
.active | 鼠标悬停在行或单元格上时所设置的颜色
.success | 标识成功或积极的动作
.info | 标识普通的提示信息或动作
.warning | 标识警告或需要用户注意
.danger | 标识危险或潜在的带来负面影响的动作

##### 1.2.3 响应式表格
- .table元素包裹在.table-responsive元素内。
    ```
    <div class="table-responsive">
      <table class="table">
        ...
      </table>
    </div>
    ```
- Firefox 浏览器对 fieldset 元素设置了一些影响 width 属性的样式，导致响应式表格出现问题。可以用下面的hack代码
    ```
    @-moz-document url-prefix() {
      fieldset { display: table-cell; }
    }
    ```

#### 1.3 表单

class | 应用 | 效果
---|---|---
.form-control | input,textarea,select | width:100%
.for-group | div | 将label和控件包裹起来
.form-inline | form | 左对齐，inline-block
.form-horizontal | form | 水平，要结合栅格类
.control-label | label | 保持一致的样式
.sr-only | label | 隐藏

##### 1.3.1 垂直表单（默认）
- 所有设置了 .form-control 类的 ```<input>```、```<textarea>``` 和 ```<select>``` 元素都将被默认设置宽度属性为 width: 100%;。 
- 将 label 元素和前面提到的控件包裹在 .form-group 中可以获得最好的排列。

```
<div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
</div>
```

> 不要将表单组直接和输入框组件混合使用。建议将输入框组嵌套到表单组中使用。

```
<label class="sr-only" for="exampleInputAmount">Amount (in dollars)</label>
<div class="input-group">
    <div class="input-group-addon">$</div>
        <input type="text" class="form-control" id="exampleInputAmount" placeholder="Amount">
    <div class="input-group-addon">.00</div>
</div>
```


##### 1.3.2 内联表单
- 向左对齐的，标签是并排的，请向 ```<form>``` 标签添加.form-inline
- 只适用于视口（viewport）至少在 768px 宽度时（视口宽度再小的话就会使表单折叠）。
- 一定要添加label标签；要隐藏可以用.sr-only
    ```
    <div class="checkbox">
        <label>
          <input type="checkbox"> Remember me
        </label>
    </div>
    ```
##### 1.3.3 水平表单
1. 向父 <form> 元素添加 .form-horizontal。
2. 联合栅格类一起使用
3. 把标签和控件放在一个带有.form-group 的``` <div>``` 中。
4. 向标签添加.control-label。


##### 1.3.4 控件
- textarea:rows
- checkbox(多选)和radio(单选):
    - 可以在包裹的div中加：.disabled,radio.radio-inlne,.checkbox,.checkbox-inline
    - aria-label
- select: 加.form-control
    - multiple属性:显示多选项
- p：.form-control-static
- 禁用状态：disabled属性
- 只读状态：readonly属性

##### 1.3.5 校验状态
可以放在label和input外的div中
- .has-warning
- .has-error
- .has-success

添加状态图标：
- 给外层div加.has-feedback
- 额外图标放在input上


#### 1.4 按钮
- default:白色。默认
- primary：绿色
- success：绿色
- info:浅蓝
- warning：黄色
- danger:红色

```
<button type="button" class="btn btn-default">（默认样式）Default</button>
```

#### 1.5 图片形状
- .img-rounded:圆角
- .img-circle:圆
- .img-thumbnail:边空

#### 1.6 辅助类
```
<p class="text-muted | text-primary">...</p>   //文本颜色
<p class="bg-primary">...</p>   //背景色
```
- .pull-left | .pull-right:浮动
- .center-block:让块内容居中
- .clearfix：清除浮动
- .show | .hidden：显示或隐藏内容

#### 二、 组件
##### 2.1 图标
- 如果图标纯粹作为**装饰**用途时需要加上```aria-hidden="true" ```属性
- 如果图标是为了表达**某种含义**，通过``` .sr-only``` 类让其在视觉上表现出隐藏的效果，并且能对其进行说明用意
- 如果创建的组件**不包含任何文本内容**（例如一个按钮只包含一个图标）应该加上```aria-label="描述"``` 属性

