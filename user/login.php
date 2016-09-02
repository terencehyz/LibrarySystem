<?php
	require_once('../mysql/connect.php');
	include_once('../mysql/lib/mysql-fun.php');
	$array['Id']=$_GET['Id'];
	$array['Password']=$_GET['Password'];
	

	$user_array=fetch_assoc("user","Id",$array['Id']);
	if ($user_array['Password']==$array['Password']) {
		$user_message=query('user',"Id",$array['Id']);
		$user_message['judge']=1;
		$json=json_encode($user_message);
		echo $json;
	} else {
		$return['judge']=0;
		$json=json_encode($return);
		echo $json;
	}
?>