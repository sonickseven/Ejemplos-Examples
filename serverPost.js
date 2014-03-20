var io = require('socket.io'), http=require('http'),util = require('util'),
    formidable = require('formidable'), cp=require('./changeData'), md=require('./multimedia'),
    conn=require('./conexion'), ntf=require('./notification'),
    slt=require('./select'), html=require('./funcionesHtml'),
    diseno=require('./funciones'), template=require('fs')
    hp=require('./optionUser'), allClients={}, clientData={},
    rg=require('./registro/registro')

//primero pude resolver lo del method OPTIONS con el objeto headers que creo que era lo que faltaba
//y despues volvia a enviarse una peticion por ajax pero ya si era POST asi que por ahi vi un tutoria de
//como guardar files con formidable y taran funciono bn



var server=http.createServer(function(req, res){
    if(req.url==='/upload'){
        var headers = {};
              // IE8 does not allow domains to be specified, just the *
              // headers["Access-Control-Allow-Origin"] = req.headers.origin;
              headers["Access-Control-Allow-Origin"] = "*";
              headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
              headers["Access-Control-Allow-Credentials"] = false;
              headers["Access-Control-Max-Age"] = '86400'; // 24 hours
              headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
        if(req.method==='OPTIONS'){
              res.writeHead(200, headers);
              res.end();
        }else if(req.method==='POST'){
            var form = new formidable.IncomingForm(),
                files = [],
                fields = [];
            form.uploadDir = '/home/sonick7/';//direccion donde va a ser gusradado
 
            form.on('field', function(field, value) {
                fields.push([field, value]);
              })
              .on('file', function(field, file) {
                console.log(file.name, file.size, file.type, file.path)
                files.push([field, file]);
              })
              .on('end', function() {
                console.log('Upload terminado ');
                res.writeHead(200, headers);
                res.end();
              });
            form.parse(req);//no se que hace eso y para que sirve el modulo util?
        }
    }
});
