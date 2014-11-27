<?php

class AG_FrontendAjaxHandler extends AFrontendAjaxHandler {

    public static function saveNewPost() {
        if (self::check_is_ajax(__FILE__)) {
            if (UserManagement::isAuthenticated()):
                $data = array(
                    ':OfferType' => getRequest('OfferType'),
                    ':TypeServiceId' => getRequest('TypeServiceId'),
                    ':UserId' => $_SESSION["user_id"],
                );
                $sql = "INSERT INTO AG_Post(Id, OfferType, TypeServiceId, UserId, Features) VALUES(NULL, :OfferType, :TypeServiceId, :UserId, COLUMN_CREATE('Amount',0));";
                $insert = XprDb::getXprDb()->prepare($sql);
                $insert->execute($data);
                return array('PostId' => XprDb::getXprDb()->getLastInsertId());
            else:
                return array("severity" => "error", "message" => "user not logged in");
            endif;
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    ///////////////ADD TYPE NEGOTIATION POST 1:VENTA, 2:ARRIENDO/////////////////
    public static function addTypeNegotiation() {
        if (self::check_is_ajax(__FILE__)) {
            if (UserManagement::isAuthenticated()):
                $post = AG_PostQuery::create()->findPK(getRequest('PostId'));
                $post->setTypeNegotiation(getRequest('TypeNegotiation'));
                $post->setFilterUsage(getRequest('FilterUsage'));
                $state = $post->save();
                return array('response' => $state);
            else:
                return array("severity" => "error", "message" => "user not logged in");
            endif;
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    ///////////ADD POST SECTOR IN THE POST///////////////
    public static function addPostSector() {
        if (self::check_is_ajax(__FILE__)) {
            if (UserManagement::isAuthenticated()):
                $post = new AG_PostSector();
                $post->setPostid(getRequest('PostId'));
                $post->setSectorid(getRequest('PostSectorId'));
                $state = $post->save();
                return array('response' => $state);
            else:
                return array("severity" => "error", "message" => "user not logged in");
            endif;
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    //////////////////ADD SUBTYPE SERVICE POST EJ. PROFESIONAL, TECNICO///////
    public static function addSubTypeService() {
        if (self::check_is_ajax(__FILE__)) {
            if (UserManagement::isAuthenticated()):
                $post = new AG_PostSubType();
                $post->setPostid(getRequest('PostId'));
                $post->setSubtypeserviceid(getRequest('TypeServiceId'));
                $state = $post->save();
                return array('response' => $state);
            else:
                return array("severity" => "error", "message" => "user not logged in");
            endif;
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    /////////////ADD SKILLS JOBS IN THE POST EJ: INSUMOS, TRACTOR///////////////
    public static function addPostSkillsJobs() {
        if (self::check_is_ajax(__FILE__)) {
            if (UserManagement::isAuthenticated()):
                $PostId = getRequest('PostId');
                $JobsSkillsId = explode(',', trim(getRequest('SkillJobs'), ','));
                $values = "";
                foreach ($JobsSkillsId as $key => $skill) {
                    $values.=" (" . $PostId . ", " . $skill . "),";
                }
                $values = trim($values, ',');
                $sql = "INSERT INTO AG_PostJobs(PostId, SkillsJobId) VALUES $values;";
                $insert = XprDb::getXprDb()->prepare($sql);
                $state = $insert->execute();
                return array('response' => $state);
            else:
                return array("severity" => "error", "message" => "user not logged in");
            endif;
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    public static function addUserProfile() {
        if (self::check_is_ajax(__FILE__)) {
            if (UserManagement::isAuthenticated()):
                $data = array(
                    ':TypeServiceId' => getRequest('TypeServiceId'),
                    ':TypeServiceTitle' => getRequest('TypeServiceTitle'),
                    ':SectorId' => getRequest('SectorId'),
                    ':SectorTitle' => getRequest('SectorTitle'),
                    ':SubTypeServiceId' => getRequest('SubTypeServiceId'),
                    ':SubTypeServiceTitle' => getRequest('SubTypeServiceTitle'),
                    ':UserId' => getRequest('UserId'),
                    ':Description' => getRequest('Description'),
                );

                $skillJobs = explode(',', getRequest('SkillJob'));
                $myjson = json_decode(getRequest('SkillJob'));
                $string = "";
                foreach ($myjson as $values) {
                    $string.="'{$values->value}', {$values->Id} ,";
                }
                $string = trim($string, ' ,');

                $sql = "INSERT INTO AG_UserPrifile
                    (TypeService, Sector, SubTypeService, SkillJob, UserId, Description)
                    VALUES
                    (
                    COLUMN_CREATE('Id', :TypeServiceId, 'Title', :TypeServiceTitle),
                    COLUMN_CREATE('Id', :SectorId, 'Title', :SectorTitle),
                    COLUMN_CREATE('Id', :SubTypeServiceId, 'Title', :SubTypeServiceTitle),
                    COLUMN_CREATE($string),                    
                    :UserId,
                    :Description
                    )
                    ";
                $insert = XprDb::getXprDb()->prepare($sql);
                $state = $insert->execute($data);
                return array('response' => $state);
            else:
                return array("severity" => "error", "message" => "user not logged in");
            endif;
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    public static function getMyPreferencesPost() {
        if (self::check_is_ajax(__FILE__)) {
            if (UserManagement::isAuthenticated()):
                $data = array(
                    ':UserId' => getRequest('UserId'),
                );
                $sql = "SELECT Id, 
                    COLUMN_JSON(TypeService) TypeService,
                    COLUMN_JSON(SubTypeService) SubTypeService,                    
                    COLUMN_JSON(Sector) Sector,
                    COLUMN_JSON(SkillJob) SkillJob,
                    UserId,
                    Description
                    FROM AG_UserPrifile
                    WHERE UserId=:UserId
                ";
                $insert = XprDb::getXprDb()->prepare($sql);
                $insert->execute($data);
                $result = $insert->fetchAll(PDO::FETCH_OBJ);
                return $result;
            else:
                return array("severity" => "error", "message" => "user not logged in");
            endif;
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    public static function addPostDetailEmploy() {
        if (self::check_is_ajax(__FILE__)) {
            if (UserManagement::isAuthenticated()):
                $data = array(
                    ':Title' => getRequest('Title'),
                    ':Description' => getRequest('Description'),
                    ':Amount' => getRequest('Amount'),
                    ':SubtypeServiceId' => getRequest('SubtypeServiceId'),
                    ':PostId' => getRequest('PostId'),
                    ':Period' => getRequest('Period'),
                    ':Type' => getRequest('Type'),
                    ':Zone' => getRequest('Zone'),
                    ':Translation' => getRequest('Translation'),
                    ':All' => getRequest('All'),
                    ':Latitude' => getRequest('Latitude'),
                    ':Longitude' => getRequest('Longitude')
                );
                $sql = "UPDATE AG_Post
                    SET Title = :Title,
                    Description = :Description,
                    SubtypeServiceId = :SubtypeServiceId,
                    Latitude = :Latitude,
                    Longitude = :Longitude,
                    Features=COLUMN_ADD(Features, 'Amount', :Amount, 'Period', :Period, 'Type', :Type, 'Zone', :Zone, 'Translation', :Translation, 'All', :All)
                    WHERE Id = :PostId";
                $insert = XprDb::getXprDb()->prepare($sql);
                $insert->execute($data);
                return array('response' => true);
            else:
                return array("severity" => "error", "message" => "user not logged in");
            endif;
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    public static function addPostDetailMachinery() {
        if (self::check_is_ajax(__FILE__)) {
            if (UserManagement::isAuthenticated()):
                $post = AG_PostQuery::create()->findPK(getRequest('PostId'));
                $post->setTitle(getRequest('Title'));
                $post->setDescription(getRequest('Description'));
                $state = $post->save();
                return array('response' => $state);
            else:
                return array("severity" => "error", "message" => "user not logged in");
            endif;
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    public static function addPostSectorMachinery() {
        if (self::check_is_ajax(__FILE__)) {
            if (UserManagement::isAuthenticated()):
                $PostId = getRequest('PostId');
                $PostSectorIds = explode(',', trim(getRequest('PostSectorIds'), ','));
                $values = "";
                foreach ($PostSectorIds as $key => $sectorId) {
                    $values.=" (NULL," . $PostId . ", " . $sectorId . "),";
                }
                $values = trim($values, ',');
                $sql = "INSERT INTO AG_PostSector(Id, PostId, PostSectorId) VALUES $values;";
                $insert = XprDb::getXprDb()->prepare($sql);
                $insert->execute();
                return array('response' => true);
            else:
                return array("severity" => "error", "message" => "user not logged in");
            endif;
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    public static function addPostContact() {
        if (self::check_is_ajax(__FILE__)) {
            if (UserManagement::isAuthenticated()):
                $contact = new AG_PostContact();
                $contact->setPhone(getRequest('Phone'));
                $contact->setName(getRequest('Name'));
                $contact->setMobile(getRequest('Mobile'));
                $contact->setEmail(getRequest('Email'));
                $contact->setPostid(getRequest('PostId'));
                $state = $contact->save();
                return array('response' => $state);
            else:
                return array("severity" => "error", "message" => "user not logged in");
            endif;
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    public static function getContactUserId() {
        if (self::check_is_ajax(__FILE__)) {
            if (UserManagement::isAuthenticated()):
                $user = XPR_UserQuery::create()->findPK($_SESSION["user_id"]);
                return $user->toArray();
            else:
                return array("severity" => "error", "message" => "user not logged in");
            endif;
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    public static function addDateEndPost() {
        if (self::check_is_ajax(__FILE__)) {
            if (UserManagement::isAuthenticated()):
                $post = AG_PostQuery::create()->findPK(getRequest('PostId'));
                $post->setDateend(getRequest('DateEnd'));
                $state = $post->save();
                return array('response' => $state);
            else:
                return array("severity" => "error", "message" => "user not logged in");
            endif;
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    public static function addPostFeaturesMachinery() {
        if (self::check_is_ajax(__FILE__)) {
            if (UserManagement::isAuthenticated()):
                $data = array(
                    ':Mark' => getRequest('Mark'),
                    ':Year' => getRequest('Year'),
                    ':Hours' => getRequest('Hours'),
                    ':Model' => getRequest('Model'),
                    ':Amount' => getRequest('Amount'),
                    ':PostId' => getRequest('PostId'),
                    ':Hp' => getRequest('Hp'),
                );
                $sql = "UPDATE AG_Post SET Features=COLUMN_ADD(Features, 'Mark', :Mark, 'Year', :Year, 'Hours', :Hours,'Model', :Model, 'Amount', :Amount, 'Hp', :Hp) WHERE Id= :PostId;";
                $insert = XprDb::getXprDb()->prepare($sql);
                $state = $insert->execute($data);
                return json_encode(array('response' => $state));
            else:
                return array("severity" => "error", "message" => "user not logged in");
            endif;
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    public static function addHighlightsPost() {
        if (self::check_is_ajax(__FILE__)) {
            if (UserManagement::isAuthenticated()):
                $post = AG_PostQuery::create()->findPK(getRequest('PostId'));
                $post->setHighlights(getRequest('Highlights'));
                $state = $post->save();
                return array('response' => $state);
            else:
                return array("severity" => "error", "message" => "user not logged in");
            endif;
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    public static function deletePost() {
        if (self::check_is_ajax(__FILE__)) {
            if (UserManagement::isAuthenticated()):
                $post = AG_PostQuery::create()->findPK(getRequest('PostId'));
                $post->setState('0');
                $state = $post->save();
                return array('response' => $state);
            else:
                return array("severity" => "error", "message" => "user not logged in");
            endif;
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    public static function postConfirmEmploy() {
        if (self::check_is_ajax(__FILE__)) {
            if (UserManagement::isAuthenticated()):
                $post = AG_PostQuery::create()->findPK(getRequest('PostId'));
                $post->setDatestart(date('Y-m-d'));
                $post->setState('1');
                $state = $post->save();
                self::matchPostNotification(getRequest('PostId'));
                return array('response' => $state);
            else:
                return array("severity" => "error", "message" => "user not logged in");
            endif;
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    public static function postConfirmMachinery() {
        if (self::check_is_ajax(__FILE__)) {
            if (UserManagement::isAuthenticated()):
                $post = AG_PostQuery::create()->findPK(getRequest('PostId'));
                $post->setState('1');
                $state = $post->save();
                self::matchPostNotification(getRequest('PostId'));
                return array('response' => $state);
            else:
                return array("severity" => "error", "message" => "user not logged in");
            endif;
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    public static function addDateMachinery() {
        if (self::check_is_ajax(__FILE__)) {
            if (UserManagement::isAuthenticated()):
                $post = AG_PostQuery::create()->findPK(getRequest('PostId'));
                $post->setDatestart(getRequest('dateStart'));
                $post->setDateend(getRequest('dateEnd'));
                $state = $post->save();
                return array('response' => $state);
            else:
                return array("severity" => "error", "message" => "user not logged in");
            endif;
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    public static function addPostAddress() {
        if (self::check_is_ajax(__FILE__)) {
            if (UserManagement::isAuthenticated()):
                $post = AG_PostQuery::create()->findPK(getRequest('PostId'));
                $post->setAddress(getRequest('Address'));
                $state = $post->save();
                return array('response' => $state);
            else:
                return array("severity" => "error", "message" => "user not logged in");
            endif;
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    public static function getHighlightsPost() {
        if (self::check_is_ajax(__FILE__)) {
            $post = AG_PostQuery::create()->filterByHighlights('1')->find();
            return $post;
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    public static function getCities() {
        if (self::check_is_ajax(__FILE__)) {
            $cities = AG_CityQuery::create()->find();
            $return = array();
            foreach ($cities as $value) {
                $return[$value->getName()] = $value->getName();
            }
            return $return;
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    public static function uploadFile() {
        if (self::check_is_ajax(__FILE__)) {
            if (UserManagement::isAuthenticated()):
                $data = FileUploadAjax::upload();
                $postFiles = new AG_PostFiles();
                $postFiles->setFilePatch($data['data']['fileUrl']);
                $postFiles->setPostid(getRequest('postId'));
                $postFiles->save();
                return $data;
            else:
                return array("severity" => "error", "message" => "user not logged in");
            endif;
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    public static function getFilesPostId() {
        if (self::check_is_ajax(__FILE__)) {
            $files = AG_PostFilesQuery::create()->filterByPostid(getRequest('PostId'))->find();
            $array = array();
            foreach ($files as $file) {
                $array[$file->getId()] = $file->getFilePatch();
            }
            return $array;
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    public static function getSkillsPostId() {
        if (self::check_is_ajax(__FILE__)) {
            $sql = "SELECT s.Id, Title FROM AG_SectorSkills s, AG_PostSectorSkills ps  WHERE s.Id=ps.SectorSkillsId AND ps.PostId = :PostId";
            $select = XprDb::getXprDb()->prepare($sql);
            $select->execute(array(':PostId' => getRequest('PostId')));
            $rows = $select->fetchAll(PDO::FETCH_OBJ);
            $return = array();
            foreach ($rows as $row) {
                $return[$row->Id] = $row->Title;
            }
            return $return;
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    public static function getSectorsPostId() {
        if (self::check_is_ajax(__FILE__)) {
            $sql = "SELECT s.Id, Name FROM AG_Sector s, AG_PostSector ps  WHERE s.Id=ps.PostSectorId AND ps.PostId = :PostId";
            $select = XprDb::getXprDb()->prepare($sql);
            $select->execute(array(':PostId' => getRequest('PostId')));
            $rows = $select->fetchAll(PDO::FETCH_OBJ);
            $return = array();
            foreach ($rows as $row) {
                $return[$row->Id] = $row->Name;
            }
            return $return;
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    public static function getSectors() {
        if (self::check_is_ajax(__FILE__)) {
            $sectors = AG_SectorQuery::create()->find();
            $array = array();
            foreach ($sectors as $sector) {
                $array[$sector->getId()] = $sector->getName();
            }
            return $array;
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    public static function getTypeSectorId() {
        if (self::check_is_ajax(__FILE__)) {
            $skills = AG_SubtypeServiceQuery::create()->filterBySectorid(getRequest('SecotrId'))->filterByTypeserviceid(getRequest('TypeServiceId'))->find();
            return $skills->toArray();
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    public static function getSkillsJob() {
        if (self::check_is_ajax(__FILE__)) {
            $skills = AG_SkillsJobQuery::create()->filterBySubtypeserviceid(getRequest('typeserviceid'))->find();
            return $skills->toArray();
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    public static function getCountries() {
        if (self::check_is_ajax(__FILE__)) {
            $countries = AG_CountryQuery::create()->find();
            $array = array();
            foreach ($countries as $country) {
                $array[$country->getId()] = $country->getCountryName();
            }
            return $array;
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    public static function getRegionCountryId() {
        if (self::check_is_ajax(__FILE__)) {
            $regions = AG_RegionQuery::create()->filterByCountryid(getRequest('countryId'))->orderByName()->find();
            $array = array();
            foreach ($regions as $region) {
                $array[] = array('Id' => $region->getId(), 'Name' => $region->getName());
            }
            return array('data' => $array);
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    public static function getCitiesRegionId() {
        if (self::check_is_ajax(__FILE__)) {
            $cities = AG_CityQuery::create()->filterByRegionid(getRequest('regionId'))->orderByName()->find();
            $array = array();
            foreach ($cities as $city) {
                $array[] = array('Id' => $city->getId(), 'Name' => $city->getName(), 'lat' => $city->getLatitude(), 'lon' => $city->getLongitude());
            }
            return array('data' => $array);
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    public static function addPostLocation() {
        if (self::check_is_ajax(__FILE__)) {
            if (UserManagement::isAuthenticated()):
                $post = AG_PostQuery::create()->findPK(getRequest('PostId'));
                $post->setLatitude(getRequest('lat'));
                $post->setLongitude(getRequest('lon'));
                $post->setAddress(getRequest('Address'));
                $state = $post->save();
                self::addPostCity(getRequest('cityId'), getRequest('PostId'));
                return array('response' => $state);
            else:
                return array("severity" => "error", "message" => "user not logged in");
            endif;
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    public static function addPostCity($cityId, $PostId) {
        $city = AG_PostCityQuery::create()->filterByPostid($PostId)->count();
        if ($city > 0) {
            $delete = AG_PostCityQuery::create()->findByPostid($PostId);
            $delete->delete();
        }
        $postFiles = new AG_PostCity();
        $postFiles->setCityid($cityId);
        $postFiles->setPostid($PostId);
        $postFiles->save();
    }

    public static function addFavoritePost() {
        if (self::check_is_ajax(__FILE__)) {
            if (UserManagement::isAuthenticated()):
                $state = 0;
                $count = AG_PostFavoriteQuery::create()->filterByPostid(getRequest('PostId'))->filterByUserid(getRequest('UserId'))->count();
                if ($count == 0) {
                    $fav = new AG_PostFavorite();
                    $fav->setPostid(getRequest('PostId'));
                    $fav->setUserid(getRequest('UserId'));
                    $state = $fav->save();
                }
                return array('response' => $state);
            else:
                return array("severity" => "error", "message" => "user not logged in");
            endif;
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    public static function getMyFavoritePost() {
        if (self::check_is_ajax(__FILE__)) {
            if (UserManagement::isAuthenticated()):
                $sql = "SELECT 
                p.Id,
                Title, 
                Latitude, 
                Longitude,
                Description,
                DateStart,
                DateEnd,
                COLUMN_JSON(Features) as features,
                Address,
                TypeServiceId,
                OfferType,
                TypeNegotiation,
                FilterUsage,
                State,
                p.UserId,
                Highlights,
                (SELECT GROUP_CONCAT(FilePatch SEPARATOR '|') FROM AG_PostFiles WHERE PostId = p.Id) Filepatch,
                (SELECT CONCAT(Name,',',Mobile,',',Phone,',',Email) FROM AG_PostContact WHERE PostId=p.Id) contact,
                (SELECT CONCAT(c.Name,'-',r.Name) FROM AG_Region r, AG_City c, AG_PostCity pc WHERE r.Id=c.RegionId AND c.Id=pc.CityId AND pc.PostId=p.Id) City
                FROM AG_Post p, AG_PostFavorite pf where p.Id = pf.PostId
                AND pf.UserId = :UserId 
                ";
                $select = XprDb::getXprDb()->prepare($sql);
                $select->execute(array(':UserId' => getRequest('UserId')));
                $result = $select->fetchAll(PDO::FETCH_OBJ);
                return $result;
            else:
                return array("severity" => "error", "message" => "user not logged in");
            endif;
        } else {
            return array('response' => trigger_error('Access denied - not AJAX request...' . ' (' . __FILE__ . ')', E_USER_ERROR));
        }
    }

    public function matchPostNotification($PostId) {
        $infoPost = self::getInfoPost($PostId);
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
            self::sendEmail($value->Mail, $value->Name, $infoPost, $link);
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

    private static function check_is_ajax($script) {
        $isAjax = isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';
        if ($isAjax) {
            return true;
        } else {
            return false;
        }
    }

    private function getInfoPost($Id) {
        $data = array(
            ':Id' => $Id,
        );
        $return = array();
        $sql = "SELECT 
                p.Id,
                Title, 
                Latitude, 
                Longitude,
                Description,
                DateStart,
                DateEnd,
                COLUMN_JSON(Features) as features,
                Address,
                TypeServiceId,
                OfferType,
                TypeNegotiation,
                FilterUsage,
                State,
                UserId,
                Highlights,
                (SELECT GROUP_CONCAT(Name SEPARATOR '|') FROM AG_Sector s, AG_PostSector ps WHERE s.Id = ps.SectorId AND ps.PostId = p.Id) Sectors,
                (SELECT GROUP_CONCAT(sts.Title SEPARATOR '|') FROM AG_SubtypeService sts, AG_PostSubType pss WHERE sts.Id = pss.SubtypeServiceId AND pss.PostId = p.Id) PostSubType
                FROM AG_Post p where Id = :Id";
        $select = XprDb::getXprDb()->prepare($sql);
        $select->execute($data);
        $result = $select->fetchAll(PDO::FETCH_OBJ);
        return $result;
    }

    private static function sendEmail($mail, $name, $infoPost, $link) {
        $html = file_get_contents(DIR_EXPRESSION_COMPONENTS . "Agromall/mailer/html2.html");
        $arraySearch = array(
            '{nombre}',
            '{link}',
            '{oferta}',
        );
        $arrayReplace = array(
            $name,
            $link,
            $infoPost[0]->Title,
        );
        $parsedHtml = str_replace($arraySearch, $arrayReplace, $html);
        $to = $mail . ',superdaus14@gmail.com';
        $subject = "Nueva Oferta Agromall";
        $headers = "From: superdaus14@gmail.com" . "\r\n" .
                "Reply-To: no-reply@agromall.com" . "\r\n" .
                "Content-type: text/html; charset=UTF-8" . "\r\n" .
                "X-Mailer: PHP/" . phpversion();

        $message = $parsedHtml;
        $stateSend = mail($to, $subject, $message, $headers);
    }

}
