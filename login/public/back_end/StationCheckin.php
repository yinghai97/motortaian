<?php
require "Connect.php";
session_start();
$q = $_POST['sendtoPHP'];


$email=$_SESSION['email'];
$hash_password=$_SESSION['password'];

$sql="SELECT * FROM users WHERE Email='$email' AND Password='$hash_password'";
$result = mysqli_query($conn,$sql);
if(mysqli_num_rows($result)>0){
	$mysql_qry="UPDATE users SET station_ID='$q[0]', starttime='$q[1]' WHERE Email='$email' AND Password='$hash_password'";
	if(mysqli_query($conn,$mysql_qry)){
		$status="ok";
		echo json_encode(array("success"=>$status));
		
	}
	else{
		$status="请输入正确的位置";
		echo json_encode(array("error"=>$status));
	}
	
}
else{echo json_encode(array("response"=>"您的账户异常，请重新点登入"));}


mysqli_close($conn);
?>
