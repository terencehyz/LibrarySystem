<?php
	include_once('../mysql/lib/mysql-fun.php');
	require_once('../mysql/connect.php');

	$query=mysql_query('select * from book');
	$allbook=array();
	while ($assoc=mysql_fetch_assoc($query)){
		if ((int)$assoc['FreeNum']>0) {
			$assoc['toLend']=false;
			$assoc['toRes']=true;
		} else {
			$assoc['toLend']=true;
			$assoc['toRes']=false;
		}
		
		$allbook[]=$assoc;
	}
	$json=json_encode($allbook);
	echo $json;
?>