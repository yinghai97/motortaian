var checkout = document.getElementById('checkout');
var Check = document.getElementById('check');
var d = new Date();
var datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

var ourResqust = new XMLHttpRequest();
ourResqust.open('GET', '/login/public/back_end/Autologin.php');
ourResqust.onload = function () {
    var ourData = JSON.parse(ourResqust.responseText);
    if (("name" in ourData) == 0) {
        window.open("/login/public/index.html","_self");
    }
}
ourResqust.send();

checkout.onclick = function () {
    var a=[datetime];

    ajaxCall(a);


}
function ajaxCall(sendtoPHP) {

    // alert(sendtoPHP);
    $.ajax
        ({
            type: "POST",
            url: "/login/public/back_end/StationCheckout.php",
            data: { sendtoPHP: sendtoPHP },
            success: function (response) {
                console.log(response);
                response = JSON.parse(response);
                // if (!("response" in response) == 0) { hint.innerHTML = response.response; }
                if (!("success" in response) == 0) {
    
                    window.open("/login/public/index.html","_self");
                }
                if (!("error" in response) == 0) {
    
                    Check.innerHTML=response.error;
                }
                if (!("response" in response) == 0) {
    
                    Check.innerHTML=response.response;
                }
            }
        }
        );
};

