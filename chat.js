var socket = io.connect('http://127.0.0.1:3000');
var d=new Date();

$(document).on('ready', function(){
	
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
				'<input type="text" class="msg" requiered placeholder="Respondele" data-user="54878'+dato.doc+'" autofocus/>';
	cont.appendChild(chatt);
	socket.once('hismsg', function(datos){//recive todas las historias del mensaje
		for(var i=datos.length-1; i>=0; i--){//llena el chat con todos los mensajes
			$("#chatbox_"+dato.chatBoxTitle+' > article > div').append('<h4>'+datos[i].enviado_por+'</h4><span>'+datos[i].time+'</span>'+
						'<p>'+datos[i].mensaje+'</p>');
		}
		$("#chatbox_"+dato.chatBoxTitle+' > article').animate({scrollTop: $("#chatbox_"+dato.chatBoxTitle+'> article > div').height()}, 800);
	});
	$('.chat').fadeIn(800);
	//fixed('.chat');
	$('.chat').draggable();
	$("#chatbox_"+dato.chatBoxTitle+' > input').on('keyup', escribir);
	$("#chatbox_"+dato.chatBoxTitle+' > span').on('click', function(){
		$("#chatbox_"+dato.chatBoxTitle).fadeOut(800, function(){
			se('body').removeChild(se("#chatbox_"+dato.chatBoxTitle));
		});
	});
});

socket.on('chat'+userNick, function(datos){
		alert('Tienes un mensaje de '+datos.user);
	});

});
socket.on('connect', function(){
	listen(userNick);
});

function se(tag){
	return document.querySelector(tag);
}
function listen(user){
	
}

function createChat(chatboxtitle){
	if ($("#chatbox_"+chatboxtitle).length > 0) {
		if ($("#chatbox_"+chatboxtitle).css('display')==='none') {
			$("#chatbox_"+chatboxtitle).fadeIn(1000);
		}
		console.log('ya existe');
		return;
	}
	socket.emit('chatCreate', chatboxtitle);
}
function escribir(e){
	if(e.which===13){
		if($(this).val()!==''){
			socket.emit('mgss', {time:d.toLocaleTimeString(), date:d.toLocaleDateString(), usaer: $(this).data('user'), mens: $(this).val(), nick:userNick, userstart: '6841844'+userGlobal});
			$(this).val('');
		}
	}
}
