<?php
require "Connect.php";
$q = $_POST['receivefromjs'];
if(isset($q))
{
	session_start();
	// 启用session 	
$success="";
$error="";
if(empty($q[0]) || empty($q[1]))
{
	$error="Please enter all the details first";
	echo json_encode(array("response"=>$error));
}
else{
$email=$q[0];
$password=$q[1];	
$email=mysqli_escape_string($conn,filter_var(strip_tags($email),FILTER_SANITIZE_STRIPPED));
$password=mysqli_escape_string($conn,filter_var(strip_tags($password),FILTER_SANITIZE_STRIPPED));

$hash_password = hash('sha256', $password);

$sql="SELECT * FROM users WHERE Email='$email' AND Password='$hash_password'";

$result=mysqli_query($conn,$sql) or die("Your query is not right");

$row=mysqli_fetch_array($result);

$count=mysqli_num_rows($result);

if($count==1)
{
	if($row['Active']==0)
	{
		$error = "Please activate your Account first";
		echo json_encode(array("response"=>$error));
	}
	else{
		$_SESSION['email']=$email;
		$_SESSION['password']=$hash_password;
		include('profile.php');


	}
}
if($count==0)
{
	$error = "请你输入正确的账号与密码";
	echo json_encode(array("response"=>$error));
	
}
}
}
?>



