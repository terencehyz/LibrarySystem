<?php
	require_once('../mysql/connect.php');
	include_once('../mysql/lib/mysql-fun.php');
	$data['BookId']=$_GET['BookId'];
	$data['BookAuthor']=$_GET['BookAuthor'];
	$data['Press']=$_GET['Press'];
	$data['Price']=$_GET['Price'];
	$data['TotalNum']=$_GET['TotalNum'];
	$data['FreeNum']=$_GET['FreeNum'];
	$data['BookCategory']=$_GET['BookCategory'];
	$updatesql="update book set BookAuthor='$data[BookAuthor]',Press='$data[Press]',Price='$data[Price]' ,TotalNum='$data[TotalNum]',FreeNum='$data[FreeNum]',BookCategory='$data[BookCategory]'where BookId = '$data[BookId]';";
	if (mysql_query($updatesql)) {
		$result['judge']=1;
		$json=json_encode($result);
		echo $json;
	} else {
		$result['judge']=0;
		$json=json_encode($result);
		echo $json;
	}
?>