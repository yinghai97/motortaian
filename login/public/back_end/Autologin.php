<?php
// 启用session 

session_start();
if (!isset($_SESSION['password'])&& !isset($_SESSION['email'])) {
    $error = "无法登入";
    echo json_encode(array("response"=>$error));
}

else{
require "Connect.php";
$email=$_SESSION['email'];
$hash_password=$_SESSION['password'];
$sql="SELECT * FROM users WHERE Email='$email' AND Password='$hash_password'";

$result=mysqli_query($conn,$sql);

$row=mysqli_fetch_array($result);

$count=mysqli_num_rows($result);
if($count==0)
{
$error = "请你输入正确的账号与密码";
echo json_encode(array("response"=>$error));
}
else{
echo json_encode(array("name"=>$row['Name'],"email"=>$row['Email'],"StationID"=>$row['station_ID'],"checkin"=>$row['starttime']));
}
}

?>