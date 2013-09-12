var io = require('socket.io');
var ws=io.listen(3000);
var conn=require('./conexion');
var conexion=conn.connect, insert=conn.insercion, selects=conn.select, select2=conn.select2;
var d=new Date();
//console.log(d.toLocaleTimeString());
ws.disable('log');
ws.on('connection', function(socket){
	socket.on('chatCreate', function(dato){//envia todos los datos necesarios del user receptor
		selects('usuario', 'cod', conexion, dato.substring(5), 'cod', 0, 10, function(a){//hace una consulta
			socket.emit('dataU', {nick: a[0].nick, doc: '3546841'+a[0].cod, chatBoxTitle: dato});
		});
	});
	
	socket.on('historychat', function(datos){//consulta los datos del historial de chat entre las dos personas
		select2(conexion, 'history_message', 'id_inicia', datos.user.substring(5), 'id_receptor', datos.userRep.substring(7), 'id', 'DESC', 0, 24, function(da){
			if(da.length <1){//si esta vacio como id_inicia entonces busca como id_receptor
				select2(conexion, 'history_message', 'id_receptor', datos.user.substring(5), 'id_inicia', datos.userRep.substring(7), 'id', 'DESC', 0, 24, function(das){
					socket.emit('hismsg', das);//retorna a la pagina los mensajes
				});
			}else{
				socket.emit('hismsg', da);//retorna a la pagina los mensajes
			}
		});
	});

	socket.on('chat', function(data){//funcion que hace insercion del mensaje del chat
		var colum=['id_inicia', 'id_receptor', 'mensaje', 'enviado_por', 'date', 'time', 'visto'];
		var dato=[data.user, data.recep, data.message, data.nick, d.toLocaleDateString(), d.toLocaleTimeString(), 1];
		if(insert('history_message', colum, dato, conexion)){
			var dato={mensaje: data.message, user: data.nick};
			socket.emit('chat_'+user, dato);
		}
	});

	socket.on('mgss', function(dato){//recive los mensajes de los usuarios y le avisa a los receptores
		var column=['id_inicia', 'id_receptor', 'mensaje', 'enviado_por', 'date', 'time', 'visto'];
		var datos=  [ dato.userstart.substring(7), String(dato.usaer).substring(12), dato.mens, dato.nick, dato.date, dato.time, 1];
		insert('history_message', column, datos, conexion, function(a){
			if(!a){
				console.log('hay un error');
			}else{
				selects('usuario', 'cod', conexion, String(dato.usaer).substring(12), 'cod', 0, 10, function(a){
					console.log(dato.nick);
					socket.emit('chat', dato.nick);
				});
				

			}
		});
	});
});
