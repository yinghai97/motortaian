<?php
session_start();
require "Connect.php";
             
	if(isset($_GET['email']) && isset($_GET['activation_code']) ){
	$success_message="";
    $error_message1="";
    $error_message2="";	
    $email = mysqli_escape_string($conn,$_GET['email']); // Set email variable
    $activation_code = mysqli_escape_string($conn,$_GET['activation_code']); // Set hash variable
                 
    $search = mysqli_query($conn,"SELECT Email, Activation_Code, Active FROM users WHERE email='".$email."' AND Activation_Code='".$activation_code."' AND Active='0'") or die(mysql_error()); 
    $match  = mysqli_num_rows($search);
                 
    if($match > 0){
        // We have a match, activate the account
        mysqli_query($conn,"UPDATE users SET Active='1' WHERE email='".$email."' AND Activation_Code='".$activation_code."' AND Active='0'") or die(mysql_error());
        $success_message='Your account has been activated, you can now login.';
    }else{
        // No match -> invalid url or account has already been activated.
        $error_message1= 'The url is either invalid or you already have activated your account.';
    }
}                 
else{
    // Invalid approach
    $error_message2= 'Invalid approach, please use the link that has been send to your email.';
}


?>