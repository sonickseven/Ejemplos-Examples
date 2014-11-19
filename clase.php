<?php

	function insertSI_DeclarationDocuments(){
		$insert='VALUES ';
		$SI_DO=SI_DOQuery::create()->orderById()->find()->toArray();
		foreach ($SI_DO as $key => $value){
			$oldFecha=self::setdate();
			$insert.="('$oldFecha', ".$value['Id']."),";
		}
		$part1=self::inserts('SI_DeclarationDocuments(Date, DOId)', $insert);
		if($part1['message']==1)
			return true;
		else
			return false;
	}

	function inserts($columns, $insert){
		$insert = trim($insert,',');
		$sql="insert into $columns $insert";
		$insert = XprDb::getXprDb()->prepare($sql);
		$state = $insert->execute();
		return array('message' => $state);
	}
