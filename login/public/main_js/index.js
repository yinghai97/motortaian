var Email = document.getElementById('email');
var Password = document.getElementById('password');
var submit = document.getElementById('submit');
var hint = document.getElementById('hint');
var rememberme = document.getElementById('remember');
var logout = document.getElementById('logout');
var index = document.getElementById('index');
var scanner = document.getElementById('scanner');
var login = document.getElementById('login');
var logined = document.getElementById('logined');
var name01 = document.getElementById('name01');
var checkstatus = document.getElementById('status');
var btn = document.createElement("BUTTON");
var link =  document.createElement("a");
var stationnumber = document.getElementById('stationnumber');
var checkintime = document.getElementById('checkintime');
logined.appendChild(btn);
btn.appendChild(link);
Email.value = getCookie('email');
Password.value = getCookie('pw');
// var d = new Date();
// var datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + '.' + '000000';


var ourResqust = new XMLHttpRequest();
ourResqust.open('GET', '/login/public/back_end/Autologin.php');
ourResqust.onload = function () {
    var ourData = JSON.parse(ourResqust.responseText);
console.log(ourData);
    if (!("name" in ourData) == 0) {
        console.log(ourData);
        signined(ourData);
    }
}
ourResqust.send();

submit.onclick = function () {

    var IDandPassword = [Email.value, Password.value];
    //  console.log(datetime);
    console.log(Email.value);
    console.log(Password.value);
    if (rememberme.checked) {
        setCookie('email', Email.value, 365);
        setCookie('pw', Password.value, 365);

    }

    ajaxCall(IDandPassword);


}
function ajaxCall(sendtoPHP) {

    // alert(sendtoPHP);
    $.ajax
        ({
            type: "POST",
            url: "/login/public/back_end/Loginyh.php",
            data: { receivefromjs: sendtoPHP},
            success: function (response) {

                response = JSON.parse(response);
                console.log(response);
                if (!("response" in response) == 0) { hint.innerHTML = response.response; }
                if (!("name" in response) == 0) {
                    hint.innerHTML = "欢迎" + response.name + "登陆";
                    signined(response);

                }
            }
        }
        );
};
function setCookie(c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}
function signined(response) {
    logout.style.display = "block";
    index.style.display = "block";
    scanner.style.display = "block";
    logined.style.display = "flex";
    login.style.display = "none";
    name01.innerHTML = response.name;
    checkStation(response);

}
function checkStation(response) {

    if (response.StationID == null) {
        checkstatus.innerHTML = "需要停车是请点击check in";
        stationnumber.innerHTML = "您目前并没有登入任何车位";
        link.setAttribute("href", "StationCheckin.html");
        link.innerHTML = "check in";

    }

    else {

        checkstatus.innerHTML = "离开时请点击check out";
        link.setAttribute("href", "StationCheckout.html");
        link.innerHTML = "check out";
        stationnumber.innerHTML = "您的车位是"+response.StationID+"号";
        checkintime.innerHTML = "车位登入时间为"+response.checkin;

    }



}

