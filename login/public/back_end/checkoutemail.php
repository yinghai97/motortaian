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
$mail->Username = 'wooandsea@gmail.com';                 // SMTP username
$mail->Password = 'facebook12345';                           // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 587;                                    // TCP port to connect to
$to=$_SESSION['email'];     //设置密码
$mail->setFrom('wooandsea@gmail.com', "=?UTF-8?B?".base64_encode('Ntut实验室')."?="); //"=?UTF-8?B?".base64_encode($subject)."?="
$mail->addAddress($to);     // Add a recipient
$mail->isHTML(true);                                  // Set email format to HTML
$mail->Charset='UTF-8';
$mail->Subject = 'Account Confirmation Message';
$mail->Body = "

欢迎使用我们.

下面是您的收据
------------------------
<br>
车位ID:" .$_SESSION['Station_ID']."<br>
开始时间:" .$_SESSION['checkin_time']."<br>
结束时间: ".$_SESSION['checkout_time']."<br><br><br>
------------------------
 "; // Our message above including the link

// $mail->send();

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
}

?>




