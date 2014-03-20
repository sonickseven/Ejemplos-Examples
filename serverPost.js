var io = require('socket.io'), http=require('http'),util = require('util'),
    formidable = require('formidable'), cp=require('./changeData'), md=require('./multimedia'),
    conn=require('./conexion'), ntf=require('./notification'),
    slt=require('./select'), html=require('./funcionesHtml'),
    diseno=require('./funciones'), template=require('fs'), express=require('express'), app=express(),
    hp=require('./optionUser'), allClients={}, clientData={},
    rg=require('./registro/registro'), server=http.createServer(app)


app.use(express.urlencoded())//use express.bodyParser() pero la consola me dijo que ya no se usaba
app.use(express.json())
app.set('views',__dirname+'/views'); // declara la carpeta que va a tener html
//app.set('view engine', 'html');
app.configure(function(){
    app.use(express.static(__dirname));
});
app.post('/upload', function(req, res){//aca es donde se escuchara el post teniendo en cuenta que es solo con post sin files
    //console.log(req)
    res.render('index.html', {layout: false});
});
app.engine('html', require('ejs').renderFile);
server.listen(3000);


