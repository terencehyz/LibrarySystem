<?php
	include_once('../mysql/lib/mysql-fun.php');
	require_once('../mysql/connect.php');
	$data['UserId']=$_GET['UserId'];
	$result['judge']=0;
	$array=array();
	$query=mysql_query('select * from reservation');
	while ($assoc=mysql_fetch_assoc($query)) {
		if($assoc['UserId']==$data['UserId']){
			$sql="select * from book where BookId = '$assoc[BookId]';";
			$book=mysql_query($sql);
			$mybook=mysql_fetch_assoc($book);
			if ((int)$mybook['FreeNum']>0) {
				$result['judge']=1;
				$updatesql="update reservation set State=1 where ReservationId='$assoc[ReservationId]';";
				mysql_query($updatesql);
			}
		}
	}
	echo json_encode($result);

?>