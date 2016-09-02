<?php
	include_once('../mysql/lib/mysql-fun.php');
	require_once('../mysql/connect.php');

	$data['Date1']=date("Y-m-d",time());
	$time=time()+30*24*3600;
	$data['Date2']=date("Y-m-d",$time);
	$data['BookId']=$_GET['BookId'];
	$data['UserId']=$_GET['UserId'];

	$user=fetch_assoc('user','Id',"$data[UserId]");
	$book=fetch_assoc('book','BookId',"$data[BookId]");
	if((int)$user['BookNum']<(int)$user['MaxBookNum']){
		$insert="insert into lend (UserId,BookId,StartTime,EndTime) values ('$data[UserId]','$data[BookId]','$data[Date1]','$data[Date2]')";
		if (mysql_query($insert)) {
			$user['BookNum']=$user['BookNum']+1;
			$book['LendNum']=$book['LendNum']+1;
			$book['FreeNum']=$book['FreeNum']-1;
			$sql="update user set BookNum='$user[BookNum]' where Id='$data[UserId]';";
			mysql_query($sql);
			$sql2="update book set LendNum='$book[LendNum]',FreeNum='$book[FreeNum]' where BookId='$data[BookId]';";
			mysql_query($sql2);
			$return['judge']=1;
			$json=json_encode($return);
			echo $json;
		} else {
			$return['judge']=0;
			$json=json_encode($return);
			echo $json;
		}
	}else{
		$result['judge']=0;
		echo json_encode($result);
	}
?>