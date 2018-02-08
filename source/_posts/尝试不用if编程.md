---
title: 尝试不用if编程
date: 2018-02-08 14:33:47
toc: true
tags:
    - JavaScript
---

当if-else的判断条件较多时，将条件做集中处理(用object存储其对应关系--条件做key，处理做value)。好处是增删某个条件变得容易，代码更加可读，提倡使用key-value对应来取代一部分的if-else的条件判断。
<!--more-->

#### 1. 统计数值数组中共有多少个奇数
用if
```
const arrayOfIntegers = [1, 4, 5, 9, 0, -1, 5];
let counter=0;
arrayOfIntegers.forEach((integer)=>{
	let remain = Math.abs(integer%2);
	if(remain==1){
		counter++;
	}
});
console.log(counter);
```
不用if：
```
const arrayOfIntegers = [1, 4, 5, 9, 0, -1, 5];
let counter=0;
arrayOfIntegers.forEach((integer)=>{
	let remain = Math.abs(integer%2);
	counter+=remain;
});
console.log(counter);
```

#### 2. 判断一个日期是周末还是工作日
用if
```
let week=(inputDay)=>{
	let day = inputDay.getDay();
	if(day==0||day==6){
		return 'weekend';
	}else{
		return 'weekday';
	}
};
console.log(week(new Date()));
```
不用if：使用一个对象或者map来存储对应关系
```
var weekOr=function(){};
weekOr.labels={
	0:'weekend',
	6:'weekend',
	default:'weekday'
};
let week=(inputDay)=>{
	let day=inputDay.getDay();
	return weekOr.labels[day] || weekOr.labels['default'];
};

console.log(week(new Date()));
```

