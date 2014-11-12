<?php
	class AG_FrontendAjaxHandler extends AFrontendAjaxHandler{
		public static function insertClientCompany(){
			$nit=getRequest('nit');
			$name=getRequest('name');
			$email=getRequest('email');
			$address=getRequest('address');
			$tel=getRequest('tel');
			
			$client=new SI_ClientCompany();
			$client->setNit($nit);
			$client->setName($name);
			$client->setEmail($email);
			$client->setAddress($address);
			$client->setTel($tel);
			$state = $client->save();
			return array('message' => $state);
		}
	}
