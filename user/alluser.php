<?php
	include_once('../mysql/lib/mysql-fun.php');
	require_once('../mysql/connect.php');

	$query=mysql_query('select * from user');
	$alluser=array();
	while ($assoc=mysql_fetch_assoc($query)) {
		if ($assoc['IsAdmin']!="true") {
			$alluser[]=$assoc;
		}
	}
	$json=json_encode($alluser);
	echo $json;
?>