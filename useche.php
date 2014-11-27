
    private static function sendEmail($mail, $name, $infoPost, $link, $type, $userInfo) {
       
        $html = file_get_contents(DIR_EXPRESSION_COMPONENTS . "Agromall/mailer/html2.html");
            $arraySearch = array(
                '{nombre}',
                '{link}',
                '{oferta}',
            );
            $arrayReplace = array(
                $name,
                $link,
                $infoPost[0]->Title
            );
        
        $parsedHtml = str_replace($arraySearch, $arrayReplace, $html);
        $to = $mail;
        $subject = "Nueva Oferta Agromall";
        $headers = "From: superdaus14@gmail.com" . "\r\n" .
                "Reply-To: no-reply@agromall.com" . "\r\n" .
                "Content-type: text/html; charset=UTF-8" . "\r\n" .
                "X-Mailer: PHP/" . phpversion();

        $message = $parsedHtml;
        $stateSend = mail($to, $subject, $message, $headers);
    }
