<?php
	require_once('../mysql/connect.php');
	include_once('../mysql/lib/mysql-fun.php');
	$data['UserId']=$_GET['UserId'];
	$data['TrueName']=$_GET['TrueName'];
	$data['MaxBookNum']=$_GET['MaxBookNum'];
	$data['Password']=$_GET['Password'];
	$updatesql="update user set TrueName='$data[TrueName]',MaxBookNum='$data[MaxBookNum]',Password='$data[Password]' where UserId = '$data[UserId]';";
	if (mysql_query($updatesql)) {
		$result['judge']=1;
	} else {
		$result['judge']=0;
	}
	echo json_encode($result);
	
?>