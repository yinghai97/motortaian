<?php
   define('DB_SERVER', '140.124.42.70');
   define('DB_USERNAME', 'root');
   define('DB_PASSWORD', 'fuzzy314');
   define('DB_NAME', 'yinghai');
   define('DB_PORT', '7781');
  
   $conn = new mysqli(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_NAME,DB_PORT);

   if($conn){
	
}
else{
    die("ERROR: Could not connect. " . mysqli_connect_error());
	
}
?>