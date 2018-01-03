window.onload=function () {
    var oDiv = document.getElementById('box');
    var oList = document.getElementsByClassName("list");
    var oCount = document.getElementsByClassName("count");
    var aListLi = oList[0].getElementsByTagName("li");
    var aCountLi = oCount[0].getElementsByTagName("li");
    var play=0;
    var lenCountLi = aCountLi.length;
    var lenListLi = aListLi.length;

    autoPlay();

    //切换按钮
    for(var i=0;i