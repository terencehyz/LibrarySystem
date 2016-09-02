<?php
	include_once('../mysql/lib/mysql-fun.php');
	require_once('../mysql/connect.php');

	$data['BookId']=$_GET['BookId'];
	$data['UserId']=$_GET['UserId'];
	$data['LendId']=$_GET['LendId'];

	$user=fetch_assoc('user','Id',"$data[UserId]");
	$book=fetch_assoc('book','BookId',"$data[BookId]");

	$user['BookNum']=$user['BookNum']-1;
	$book['LendNum']=$book['LendNum']-1;
	$book['FreeNum']=$book['FreeNum']+1;

	$del="delete from lend where LendId='".$data['LendId']."';";

	if($query=mysql_query($del)){
		$sql="update user set BookNum='$user[BookNum]' where Id='$data[UserId]';";
		mysql_query($sql);
		$sql2="update book set LendNum='$book[LendNum]',FreeNum='$book[FreeNum]' where BookId='$data[BookId]';";
		mysql_query($sql2);
		$result['judge']=1;
	}else{
		$result['judge']=0;
	}
	echo json_encode($result);

?>