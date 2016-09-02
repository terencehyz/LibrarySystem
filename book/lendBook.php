<?php
	include_once('../mysql/lib/mysql-fun.php');
	require_once('../mysql/connect.php');
	$user['UserId']=$_GET['UserId'];
	$query=mysql_query('select * from lend');
	$alldata=array();
	while ($assoc=mysql_fetch_assoc($query)) {
		if($user['UserId']==$assoc['UserId']){
		$query2=mysql_query('select * from book');
		while ($assoc2=mysql_fetch_assoc($query2)) {
			if($assoc2['BookId']==$assoc['BookId']){
				break;
			}
		}
		$assoc['BookName']=$assoc2['BookName'];
		$assoc['BookAuthor']=$assoc2['BookAuthor'];
		$assoc['Press']=$assoc2['Press'];
		$assoc['ISBN']=$assoc2['ISBN'];
		$assoc['Version']=$assoc2['Version'];
		$assoc['Price']=$assoc2['Price'];

		$alldata[]=$assoc;
		}
	}
	echo json_encode($alldata);
?>