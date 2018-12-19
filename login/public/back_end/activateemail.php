<?php
if(!isset($_SESSION)) 
{ 
  session_start(); 
} 
require 'PHPMailerAutoload.php';

$mail = new PHPMailer;

//$mail->SMTPDebug = 3;                               // Enable verbose debug output
// 记得到https://myaccount.google.com/lesssecureapps 开启
$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'xxx@gmail.com';                 // SMTP username
$mail->Password = 'xxxbook12345';                           // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 587;                                    // TCP port to connect to
$to=$_SESSION['email'];     //设置密码
$mail->setFrom('xxxa@gmail.com', "=?UTF-8?B?".base64_encode('Ntut实验室')."?="); //"=?UTF-8?B?".base64_encode($subject)."?="
$mail->addAddress($to);     // Add a recipient
$mail->isHTML(true);                                  // Set email format to HTML
$mail->Charset='UTF-8';
$mail->Subject = 'Account Confirmation Message';
$mail->Body = "

欢迎加入我们，您的账户已被成功创建,请您点击以下的网址进行电邮验证.
<br>
<a href='http://140.124.42.70:7780/login/public/back_end/verify.php?email=".$_SESSION['email']."&activation_code=".$_SESSION['activation_code']." ' target='_blank'>点击我哦，对哦就是点击我</a>
<br>
<br>
下面是您的资料
------------------------
<br>
用户名:" .$_SESSION['email']."<br>
密码:" .$_SESSION['password']."<br><br><br><br>
------------------------
 "; // Our message above including the link



if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
}

?>




