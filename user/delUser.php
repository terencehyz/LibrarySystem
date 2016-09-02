<?php
	include_once('../mysql/lib/mysql-fun.php');
	require_once('../mysql/connect.php');
	$user['Id']=$_GET['userId'];
	$del="delete from user where Id = '".$user['Id']."';";
	if($query=mysql_query($del)){
		$data['judge']=1;
	}else{
		$data['judge']=0;
	}
	echo json_encode($data);
?>