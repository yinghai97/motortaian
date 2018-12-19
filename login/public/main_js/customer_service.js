var ourResqust = new XMLHttpRequest();
var logout = document.getElementById('logout');

var scanner = document.getElementById('scanner');
ourResqust.open('GET', '/login/public/back_end/Autologin.php');
ourResqust.onload = function () {
    var ourData = JSON.parse(ourResqust.responseText);
    console.log(ourData);
    if (("name" in ourData) == 0) {
        logout.style.display= "none";
        scanner.style.display= "none";
    }
}
ourResqust.send();