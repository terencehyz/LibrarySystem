<?php
	include_once('../mysql/lib/mysql-fun.php');
	require_once('../mysql/connect.php');
	$data['BookId']=$_GET['BookId'];
	$data['UserId']=$_GET['UserId'];
	$data['State']=0;
	$result['judge']=0;

	$insert="insert into reservation (UserId,BookId,State) values ('$data[UserId]','$data[BookId]','$data[State]')";
	if($query=mysql_query($insert)){
		$result['judge']=1;
	}
	echo json_encode($result);

?>