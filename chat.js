//chatBoxTitle es el identificador unico de cada chat por que son ventana por usuario, varias ventanas
socket.on('dataU', function(dato){
	socket.emit('historychat', {user:'68458'+userGlobal, userNick: userNick, userRep: dato.doc});//envia los datos para el histori
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
		console.log(datos.length, dato.chatBoxTitle);//me muestra un incremento por cada chat que abro
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
