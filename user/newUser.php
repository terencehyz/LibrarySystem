<?php
	require_once('../mysql/connect.php');
	include_once('../mysql/lib/mysql-fun.php');
	$new['Id']=$_GET['userId'];
	$new['Password']=$_GET['userPwd'];
	$new['TrueName']=$_GET['userTrueName'];
	$new['IsAdmin']="false";
	$new['BookNum']=0;
	$new['MaxBookNum']=(int)$_GET['userMaxNum'];
	$new['UserType']=$_GET['userType'];

	$judge=0;

	//如果没重复的
	if ($judge==0) {
		$sql="insert into user (Id,Password,TrueName,IsAdmin,BookNum,MaxBookNum,UserType) values ('$new[Id]','$new[Password]','$new[TrueName]','$new[IsAdmin]','$new[BookNum]','$new[MaxBookNum]','$new[UserType]')";
		//echo $sql;
		if (mysql_query($sql)) {
			$return['judge']=1;
			$json=json_encode($return);
			echo $json;
		} else {
			$return['judge']=0;
			$json=json_encode($return);
			echo $json;
		}
	//如果有重复的
	} else {
		$return['judge']=0;
		$json=json_encode($return);
		echo $json;
	}
	mysql_close($con);
	
?>