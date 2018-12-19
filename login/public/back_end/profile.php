<?php
// 启用session 
$email=$_SESSION['email'];

$sql="SELECT * FROM users WHERE Email='$email'";

$result=mysqli_query($conn,$sql) or die("Your query is not correct");

$row=mysqli_fetch_array($result);
$status='ok';
echo json_encode(array("name"=>$row['Name'],"email"=>$row['Email'],"StationID"=>$row['station_ID'],"checkin"=>$row['starttime']));

?>