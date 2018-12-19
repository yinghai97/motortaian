<?php
session_start();
require "Connect.php";
$q = $_POST['sendtoPHP'];

$error="";
if(empty($q[0]))
{
	$error="Please enter all the details first";
}
echo json_encode($q);


$sqlemail="SELECT endpoint FROM endpoint WHERE endpoint='$q'";
// $sqlemail="DELETE FROM endpoint";
$result=mysqli_query($conn,$sqlemail);
    if(mysqli_num_rows($result)>0)
	{
		$error="error";
		echo json_encode(array("response"=>$error));
	}

// 查询$error是否纯在值，如果是空值的话开始到mysql 存入该用户资料
    if(empty($error))
	{
		$sql="INSERT INTO endpoint (endpoint,p256dh,auth) VALUES ('$q[0]','$q[1]','$q[2]') ";
	$result=mysqli_query($conn,$sql);
	
	
	if($result)
	{
		echo json_encode(array("success"=>"saved in mysql"));
	}	
	
	}
	//
mysqli_close($conn);

?>
