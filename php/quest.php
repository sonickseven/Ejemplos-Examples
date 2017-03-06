public function matchPostNotification($PostId) {
        $infoPost = self::detailPostMail($PostId);
        $PostJson = json_encode($infoPost);
        $date = date('Y-m-d');
        $link = "";
        if ($infoPost[0]->TypeServiceId == 1) {
            $link = "maquinaria/?postId=" . $infoPost[0]->Id;
        } else {
            $link = "empleo/?postId=" . $infoPost[0]->Id;
        }
        $subTypeServiceId = explode('|', $infoPost[0]->PostSubType);
        $sectors = explode('|', $infoPost[0]->Sectors);
        $typeServices = "";
        foreach ($subTypeServiceId as $value) {
            $typeServices.= " COLUMN_GET(SubTypeService, 'Title' as char) = '{$value}' OR";
        }
        $sector = "";
        foreach ($sectors as $value) {
            $sector.= " COLUMN_GET(Sector, 'Title' as char) = '{$value}' OR";
        }
        $sector = trim($sector, ' OR');
        $typeServices = trim($typeServices, ' OR');
        $sql = "SELECT
                u.user_email Mail,
                CONCAT(u.user_firstname,' ',u.user_lastname) Name,
                u.user_id
                FROM users u, AG_UserPrifile up
                WHERE 
                u.user_id = up.UserId
                AND ($typeServices)
                LIMIT 25
            ";
        $select = XprDb::getXprDb()->prepare($sql);
        $select->execute();
        $result = $select->fetchAll(PDO::FETCH_OBJ);
        foreach ($result as $value) {
            $AG_mapa=new AG_MapAjaxPostHandler();
            $AG_mapa->sendEmail2($value->Mail, $value->Name, $infoPost, $link, 'Notification');

            //self::sendEmail2($value->Mail, $value->Name, $infoPost, $link, 'Notification');
            $notification = new AG_Notifications();
            $notification->setPosttitle($infoPost[0]->Title);
            $notification->setPostdescription($infoPost[0]->Title);
            $notification->setPostlink($link);
            $notification->setUsername($value->Name);
            $notification->setPostjson($PostJson);
            $notification->setPostid($PostId);
            $notification->setUserid($value->user_id);
            $notification->setDate($date);
            $notification->setState(1);
            $notification->save();
        }
    }
