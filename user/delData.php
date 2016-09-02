<?php
	include_once('../mysql/lib/mysql-fun.php');
	require_once('../mysql/connect.php');

	$data['ReservationId']=$_GET['ReservationId'];

	$del="delete from reservation where ReservationId='".$data['ReservationId']."';";

	if($query=mysql_query($del)){
		$result['judge']=1;
	}else{
		$result['judge']=0;
	}
	echo json_encode($result);
?>