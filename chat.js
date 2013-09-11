var socket = io.connect('http://127.0.0.1:3000');

socket.on('connect', function(){
	listen(userNick);//user nick es mi nick en la pagina
});

function listen(user){//es una funcion futura todabia no tiene uno pero escucha cuando me envian mensaje
	socket.on('chat'+user, function(datos){
		alert('Tienes un mensaje de '+datos.user);
	});
}

function createChat(chatboxtitle){//chatboxtitle es el identificador unico de cada ventana
	if ($("#chatbox_"+chatboxtitle).length > 0) {
		if ($("#chatbox_"+chatboxtitle).css('display') == 'none') {
			$("#chatbox_"+chatboxtitle).fadeIn(1000);
		}
		console.log('ya existe');
		return;
	}
	socket.emit('chatCreate', chatboxtitle);//envia los dato principales del usuario para esta ventana
}

socket.on('dataU', function(dato){//recoje todos los datos del usuario y tambien se vuelve a recivir chatboxtitle
	socket.emit('historychat', {user:'68458'+userGlobal, userNick: userNick, userRep: dato.doc});//envia los datos para el historial del chat
	var cont=se('body');
	var chatt=document.createElement('section');
	chatt.id="chatbox_"+dato.chatBoxTitle;
	chatt.className='chat';
	chatt.innerHTML='<h1>'+dato.nick+'</h1>'+
				'<span></span>'+
				'<article>'+
					'<div>'+
					'</div>'+
				'</article>'+
				'<input type="text" class="" requiered placeholder="Respondele" data-user="54878'+dato.doc+'" autofocus/>';
	cont.appendChild(chatt);
	socket.on('hismsg', function(datos){//recive todas las historias del mensaje
		console.log(datos.length, dato.chatBoxTitle);
		for(var i=datos.length-1; i>=0; i--){//llena el chat con todos los mensajes
			$("#chatbox_"+dato.chatBoxTitle+' > article > div').append('<h4>'+datos[i].enviado_por+'</h4><span>'+datos[i].time+'</span>'+
						'<p>'+datos[i].mensaje+'</p>');
		}
		$("#chatbox_"+dato.chatBoxTitle+' > article').animate({scrollTop: $('.chat > article > div').height()}, 800);
	});
	$('.chat').fadeIn(800);
	//fixed('.chat');
	$('.chat').draggable();
	$("#chatbox_"+dato.chatBoxTitle+' > span').on('click', function(){
		$("#chatbox_"+dato.chatBoxTitle).fadeOut(800, function(){
			se('body').removeChild(se("#chatbox_"+dato.chatBoxTitle));
		});
	});
});
