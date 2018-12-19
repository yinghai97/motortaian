var Checkin = document.getElementById('checkin');
var Station = document.getElementById('station');
var retry = document.getElementById('retry');
var queryString = location.search;
var urlParams = new URLSearchParams(location.search);
console.log(urlParams.has('stationID'));
if(urlParams.has('stationID')){
    Station.value=urlParams.get('stationID'); 
    Station.disabled=true;
    retry.innerHTML="确认后请按确定";
}
var d = new Date();
var datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + '.' + '';

var ourResqust = new XMLHttpRequest();
ourResqust.open('GET', '/login/public/back_end/Autologin.php');
ourResqust.onload = function () {
    var ourData = JSON.parse(ourResqust.responseText);
    if (("name" in ourData) == 0) {
        window.open("/login/public/index.html","_self");
    }
}
ourResqust.send();

Checkin.onclick = function () {
    var StationID=[Station.value,datetime]
    console.log(Station.value);

    ajaxCall(StationID);


}
function ajaxCall(sendtoPHP) {

    // alert(sendtoPHP);
    $.ajax
        ({
            type: "POST",
            url: "/login/public/back_end/StationCheckin.php",
            data: { sendtoPHP: sendtoPHP },
            success: function (response) {
                console.log(response);
                response = JSON.parse(response);
                // if (!("response" in response) == 0) { hint.innerHTML = response.response; }
                if (!("success" in response) == 0) {
    
                    window.open("/login/public/index.html","_self");
                }
                if (!("error" in response) == 0) {
    
                    retry.innerHTML=response.error;
                }
                if (!("response" in response) == 0) {
    
                    retry.innerHTML=response.response;
                }
            }
        }
        );
};

