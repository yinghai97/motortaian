<?php
require "Connect.php";
session_start();
$q = $_POST['sendtoPHP'];
$email=$_SESSION['email'];
$hash_password=$_SESSION['password'];
$checkout_time=$q[0];
$_SESSION['checkout_time']=$checkout_time;
$_SESSION['checkin_time']="";
$_SESSION['Station_ID']="";
$sql="SELECT * FROM users WHERE Email='$email' AND Password='$hash_password'";
$result = mysqli_query($conn,$sql);
if(mysqli_num_rows($result)>0){
	$row=mysqli_fetch_array($result);
	$_SESSION['checkin_time']=$row['starttime'];
$_SESSION['Station_ID']=$row['station_ID'];
	$mysql_qry="UPDATE users SET station_ID=NULL, starttime=NULL WHERE Email='$email' AND Password='$hash_password'";
	if(mysqli_query($conn,$mysql_qry)){
		$status="退位正常";
		echo json_encode(array("success"=>$status));
		include('checkoutemail.php');
		
	}
	else{
		$status="机车登出错误";
		echo json_encode(array("error"=>$status));
	}
	
}
else{echo json_encode(array("response"=>"您的账户异常，请重新点登入"));}


mysqli_close($conn);
?>
