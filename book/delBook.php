<?php
	include_once('../mysql/lib/mysql-fun.php');
	require_once('../mysql/connect.php');
	$book['BookId']=$_GET['bookId'];
	$del="delete from book where BookId = '".$book['BookId']."';";
	if($query=mysql_query($del)){
		$data['judge']=1;
	}else{
		$data['judge']=0;
	}
	echo json_encode($data);
?>