<?php
session_start();
require "Connect.php";
$q = $_POST['sendtoPHP'];
$error="";
if(empty($q[0]) || empty($q[1]) || empty($q[2]))
{
	$error="Please enter all the details first";
}
$name=mysqli_escape_string($conn,filter_var(strip_tags($q[0]),FILTER_SANITIZE_STRIPPED));
$password=mysqli_escape_string($conn,filter_var(strip_tags($q[1]),FILTER_SANITIZE_STRIPPED));
$email=mysqli_escape_string($conn,filter_var(strip_tags($q[2]),FILTER_VALIDATE_EMAIL));

$hash_password = hash('sha256', $password);

$activation_code = hash('sha256',rand(0,1000));
// 到mysql 查询是否已有该用户
    // $sqlusername="SELECT UserName FROM users WHERE UserName='$username'";
	// $usernameresult=mysqli_query($conn,$sqlusername);
$sqlemail="SELECT Email FROM users WHERE Email='$email'";
$emailresult=mysqli_query($conn,$sqlemail);
    if(mysqli_num_rows($emailresult)>0)
	{
		$error="此邮件已被注册";
		echo json_encode(array("response"=>$error));
	}

// 查询$error是否纯在值，如果是空值的话开始到mysql 存入该用户资料
    if(empty($error))
	{
	$sql="INSERT INTO users (Name,Email,Activation_Code,Password) VALUES('$name','$email','$activation_code','$hash_password')";
	$result=mysqli_query($conn,$sql);
	
	
	if($result)
	{
	$_SESSION['email']=$email;	
	$_SESSION['password']=$password;
	$_SESSION['hash_password']=$hash_password;
	$_SESSION['activation_code']=$activation_code;
	include('activateemail.php');
	echo json_encode(array("success"=>"注册完成！请查看电邮 "));
	$_SESSION['email']="";	
	$_SESSION['password']="";
	}
	
	}
	//
mysqli_close($conn);

?>
