function chekFoucus(aInput){
    //获取所有提示的tr标签
    var aTip = document.getElementsByClassName("tip");
    var len = aInput.length;
    for(var i=0;i<len;i++) {="" if(ainput[i].value="=null)" ainput[i].index="i;" ainput[i].onfocus="function" ()="" this.style.bordercolor="blue" ;="" 把this改成ainput[i]会有问题。="" atip[this.index].style.color="#9c9c9c" switch(this.id){="" case="" "nameinput":="" atip[this.index].innerhtml="必填，长度为4-16个字符" break;="" "pwinput":="" "pwcinput":="" "emailinput":="" "telinput":="" }="" 验证名称是否是4-16字符="" function="" checknameblur()="" var="" aname="document.getElementById(" nameinput");"="" atip="document.getElementById(" name-tip");"="" len="getStelen(aName.value);" if(len<1)="" atip.innertext="不能为空" atip.style.color="red" aname.style.bordercolor="red" return="" false;="" else="" if(len<4="" ||len="">16)
    {
        aTip.innerText="格式错误";
        aName.style.borderColor="red";
        aTip.style.color="red";
        return false;
    }
    else {
        aTip.innerText="格式正确";
        aTip.style.color="green";
        aName.style.borderColor="green";
        return true;
    }
}

//验证密码
function  checkPassWord() {
    var aPw = document.getElementById("pwInput");
    var apwTip = document.getElementById("pw-tip");
    var len = getStelen(aPw.value);
    if(len<1) {="" apwtip.innertext="不能为空" ;="" apwtip.style.color="red" apw.style.bordercolor="red" return="" false;="" }="" else="" if(len<6="" ||len="">10)
    {
        apwTip.innerText="密码为6到10位";
        apwTip.style.color="red";
        aPw.style.borderColor="red";
        return false;
    }
    else {
        apwTip.innerText="格式正确";
        apwTip.style.color="green";
        aPw.style.borderColor="green";
        return true;
    }
}

//验证重复密码
function  checkPassWordC() {
    var aPwc = document.getElementById("pwcInput");
    var apwcTip = document.getElementById("pwc-tip");
    var len = getStelen(aPwc.value);

    //获取之前密码
    var aPw = document.getElementById("pwInput");

    if(len</1)></len;i++)>