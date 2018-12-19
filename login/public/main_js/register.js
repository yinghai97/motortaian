var ID = document.getElementById('name');
var Email = document.getElementById('email');
var Password = document.getElementById('password');
var Repassword = document.getElementById('repassword');
var submit = document.getElementById('submit');
var login = document.getElementById('login');
var hint = document.getElementById('hint');

submit.onclick = function () {
    if (Password.value == Repassword.value) {

        var IDandPassword = [ID.value, Password.value, Email.value];
        console.log(ID.value);
        console.log(Password.value);
        console.log(Email.value);
        ajaxCall(IDandPassword);


    }else(hint.innerHTML="请输入相同的密码")
}

function ajaxCall(sendtoPHP) {

    // alert(sendtoPHP);
    $.ajax
        ({
            type: "POST",
            url: "/login/public/back_end/Registeryh.php",
            data: { sendtoPHP: sendtoPHP },
            success: function (response) {
                // console.log(response);
                response = JSON.parse(response);
                if (!("response" in response) == 0) {
                hint.innerHTML = response.response;
                    // console.log(response);
                }
                if (!("success" in response) == 0) {
                    hint.innerHTML = response.success;
                    window.open("index.html","_self")
                    }

            }
        }
        );
};
