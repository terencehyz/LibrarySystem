<?php
	include_once('../mysql/lib/mysql-fun.php');
	require_once('../mysql/connect.php');
	$item['ReleaseDate']=$_GET['ReleaseDate'];
	$query=mysql_query('select * from book');
	$data=array();
	while ($assoc=mysql_fetch_assoc($query)) {
		if ($assoc['ReleaseDate']==$item['ReleaseDate']) {
			if ((int)$assoc['FreeNum']>0) {
			$assoc['toLend']=false;
			$assoc['toRes']=true;
		} else {
			$assoc['toLend']=true;
			$assoc['toRes']=false;
		}
			$data[]=$assoc;
		}
	}
	$json=json_encode($data);
	echo $json;
?>