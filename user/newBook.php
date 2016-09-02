<?php
	require_once('../mysql/connect.php');
	include_once('../mysql/lib/mysql-fun.php');
	$new['ReleaseDate']=$_GET['releaseDate'];
	$new['BookCategory']=$_GET['bookCategory'];
	$new['BookName']=$_GET['bookName'];
	$new['BookAuthor']=$_GET['bookAuthor'];
	$new['Press']=$_GET['bookPress'];
	$new['ISBN']=$_GET['bookISBN'];
	$new['Version']=$_GET['bookVersion'];
	$new['Price']=(int)$_GET['bookPrice'];
	$new['TotalNum']=(int)$_GET['bookNum'];
	$new['LendNum']=0;
	$new['FreeNum']=(int)$_GET['bookNum'];

	$judge=0;

	//如果没重复的
	if ($judge==0) {
		$sql="insert into book (BookCategory,BookName,BookAuthor,Press,ReleaseDate,ISBN,Version,Price,TotalNum,LendNum,FreeNum) values ('$new[BookCategory]','$new[BookName]','$new[BookAuthor]','$new[Press]','$new[ReleaseDate]','$new[ISBN]','$new[Version]','$new[Price]','$new[TotalNum]','$new[LendNum]','$new[FreeNum]')";
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