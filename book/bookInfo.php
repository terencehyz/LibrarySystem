<?php
	include_once('../mysql/lib/mysql-fun.php');
	require_once('../mysql/connect.php');

	$query=mysql_query('select * from book');
	$array['TotalNum']=0;
	$array['LendNum']=0;
	$array['FreeNum']=0;
	while ($assoc=mysql_fetch_assoc($query)) {
		$array['TotalNum']=$array['TotalNum']+(int)$assoc['TotalNum'];
		$array['LendNum']=$array['LendNum']+(int)$assoc['LendNum'];
		$array['FreeNum']=$array['FreeNum']+(int)$assoc['FreeNum'];
	}
	echo json_encode($array);
?>