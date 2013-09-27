var io = require('socket.io');
var ws=io.listen(3000);
var conn=require('./conexion');
var slt=require('./select');
var diseno=require('./funciones');
var session={};
//var chatOpen={};
//var pub = redis.createClient();
//pub.publish("messages", JSON.stringify({type: "foo", content: "bar"}));
//console.log(pub);
function sessionst(session, callback){
    slt.inicioSession(session, conexion, function(a){
        if(a.val===3){
            session={nick:a.user};
            console.log(session);
            callback({val:3, nick: a.nick, us: a.user});//redirija a index.php
        }else if(a.val===2){
            callback({val:2});
        }else if(a.val===1){
            callback({val:1});
        }
    });
}

var timeLine=slt.timeLine, delete2row=conn.delete2row, conexion=conn.connect, deleteNormal=conn.deleteNormal, insert=conn.insercion, selects=slt.select, select2=slt.select2, SeleChat=slt.SeleChat;
var d=new Date();
ws.disable('log');
ws.on('connection', function(socket){
    socket.on('SessionStart', sessionst);
	socket.on('myTimeline', histori);
	socket.on('datosUsers', function(dato){
		var usuario=dato.meet.substring(14).substring(0,dato.longs.substring(4));
		var columns=['nick', 'nombres'];
		slt.selectEspecific(conexion, columns, 'usuario', 'cod', usuario, 'cod', '', 0, 5, function(a){
			socket.emit('resulltU', a);
		});
	});
	//socket.on('difun', difuciones);
	//var chat=[];
	socket.on('chatCreate', function(dato){//recoje todos los datos del usuario al que se le va a escribir
		var user=dato.user, chat=dato.chat;
		selects('usuario', 'cod', conexion, dato.chat.substring(5), 'cod', 0, 10, function(a){
			socket.emit('dataU', {nick: a[0].nick, doc: '3546841'+a[0].cod, chatBoxTitle: dato.chat});
			select2(conexion, 'chatOpen', 'usuario', user, 'chat', dato.chat, 'cod', '',0, 5, function(da){
				if(da.length<1){
					var column=['usuario', 'chat', 'x', 'y'];
					var dato=[user, chat, 0, 0];
					insert('chatOpen', column, dato, conexion, function(a){
						if(a){console.log('ok too');}
					});
				}else{
					//console.log('actualizar');
				}
			});
			/*chat.push(dato.chat);
			chatOpen={user:chat};
			console.log(chatOpen);*/
		});
	});

	socket.on('openChat', function(dato){
		selects('chatOpen', 'usuario', conexion, dato, 'cod', 0, 1000, function(a){
			socket.emit('nowOpen', a);//envia todos los chat abiertos
		});
	});

	socket.on('historychat', function(datos){//consulta los datos del historial de chat entre las dos personas
		SeleChat(conexion, 'history_message', 'id_inicia', datos.user.substring(5), 'id_receptor', datos.userRep.substring(7), 'id', 'DESC', 0, 24, function(da){
			socket.emit('hismsg', da);
		});
	});

	socket.on('mgss', function(dato){//recive los mensajes de los usuarios y le avisa a los receptores
		var nii=dato.nick, receptor=dato.userstart, msg=dato.mens, hora=dato.time; //las nombro para no tener problemas a futuro
		var column=['id_inicia', 'id_receptor', 'mensaje', 'enviado_por', 'date', 'time', 'visto'];
		var datos=  [ dato.userstart.substring(7), String(dato.usaer).substring(12), dato.mens, dato.nick, dato.date, dato.time, 1];
		insert('history_message', column, datos, conexion, function(a){
			if(!a){
				console.log('hay un error');
			}else{
				selects('usuario', 'cod', conexion, String(dato.usaer).substring(12), 'cod', 0, 10, function(as){
					var d=new Buffer(as[0].conectado).toString();
					if(d==='0'){//valida si el usuario esta conectado
						console.log('no esta conectado');
						var colum=['mensaje'];
						var dato=[1];
						conn.updateGolbal(colum, dato, conexion, 'shows', 'usuario', as[0].cod, function(a){
							if(a)
								console.log('ok');
							else
								console.log('error');
						});
					}else{
						socket.broadcast.emit('chat'+as[0].nick, {nick:nii, doc:receptor, msg: msg, hora: hora});//envia la señal de que se ha enviado un mensaje
					}
				});
			}
		});
	});

	socket.on('closeChat', closeChat);
});

function domHistory(session, usuario, diseno, conexion, selects, fila5, fila6, callback){
    contenido="<section id='post' class='POST"+fila5.cod+">"+
                    "<section id='row'><a href='../proceso_logeo/index.php?cod="+fila6.nick+"' id='comentPho'>"+diseno.photos(fila5, 70, 60)+"<div>"+fila6.nick+"</div></a>"+
                    "<section id='coment'><span id='gaspEr'>";
    if(fila5.file!==null)
        contenido+=diseno.file(fila5.file, fila5.cod);
    else
        contenido+="<span></span>";
    slt.difucion(conexion, 'arreglo', fila5.arreglo, function(difucion){
        if(difucion[0].Ucod!==null){
            if(fila5.seguido!==difucion[0].Ucod){
                contenido+="<span data-perfil='../proceso_logeo/index.php?cod="+difucion[0].nick+"' data-usua='Pic_4587_d58"+difucion[0].Ucod+"' class='creator'>"+diseno.photos(difucion[0], 48, 40)+"</span>";
                validar=true;
            }                
            contenido+='</span>'+diseno.usuarios(fila5.historia, fila5.cod)+' </section>'+
                    '</section>'+
                "<section id='row' class='all'>"+
                    "<div>"+
                    "<div class='Media"+fila5.cod+"'><div>"+
                    "</div>"+
                "</section>"+
                "<section id='row'>";
            if(session.user!==undefined){
                slt.followValidator(conexion, 'seguidor_seguido', 'seguido', fila5.seguido, 'seguidor', String(session.user).substr(4), function(a){
                    if(a.length>0){
                        slt.followValidator(conexion, 'seguidor_seguido', 'seguidor', fila5.seguido, 'seguido', String(session.user).substr(4), function(amigo){
                            if(amigo.length>0){
                                contenido+="<div";
                                if(fila6.conectado==='1'){
                                    contenido+=" class='conectado'";
                                }else{
                                    contenido+=" class='desconectado'";
                                }
                                contenido+='id="CHAT" onclick="javascript:(createChat('+"'user_"+fila5.seguido+"'"+'))"></div>';// createChat('."'user_".$fila5["seguido"]."'".')
                            }else{
                                contenido+='<div class="nofriend"></div>';
                            }

                        });
                    }else{
                        contenido+='<div class="nofriend"></div>';
                    }
                });
            }else{
                contenido+='<div class="nofriend"></div>';
            }
            //alguien me dijo que usuara un setTimeOut para retrasar un poco hasta que ya el callback estubiera completo
            contenido+="<div id='request' class='acciones'>"+
                        "<span class='fases"+fila5.cod+"'>Responder ";
            slt.CountAnswer(conexion, fila5.cod, function(a){// otro callback de mysql
                if(a.length>0){
                    contenido+=a[0].cantidad;
                }
            });
            contenido+='</span></div>';//vuelve a salir del callbcak
            if(session.user!==undefined){
                if(session.userCod===fila5.seguido){
                    contenido+="<div id='delete' class='acciones'><span class=DelHis1245"+fila5.cod+">Eliminar</span></div>";
                }else{
                    contenido+="<div id='share' class='acciones'>"+
                        "<span class='aski2364snouf584"+fila5.cod+"'>Difundir "+difucion[0].cantidad+"</span>"+
                        "</div>";
                }
            }else{
                contenido+="<div  class='acciones'><span class='unlogin'> Difundir <span></div>";
            }
            contenido+="<div id='like' class='acciones'>";
            if(session.user===undefined){
                contenido+='<label class="unlogin"> Me Gusta <label>';
            }else{
                var column=['historia', 'usuario', 'gustaNogusta'];
                var dato=[fila5.cod, session.user, 1];
                slt.UniversalSelect(conexion, 'gustarNogustar', column, dato, 'cod', '', 0, 10, function(row){//nueva consulta
                    if(row.length>0){
                        contenido+='<span class="like89542689'+fila5.cod+'">Me Gusta </span>'; 
                        slt.numerosLikeNo(conexion, 'gustarNogustar', 'historia', fila5.cod, 'gustaNOgusta', 1, function(a){
                            if(a){
                                contenido+=a;
                            }
                        });
                    }else{
                        slt.numerosLikeNo(conexion, 'gustarNogustar', 'historia', fila5['cod'], 'gustaNOgusta', 1, function(a){
                            contenido+=' Me gusta '+a;
                        });
                    }
                });
            }
            contenido+="</div>"+
                "<div id='nolike' class='acciones'>";
            if(session.user===undefined){
                contenido+="<label class='unlogin'> No Me Gusta <label>";
            }else{
                var column=['historia', 'usuario', 'gustaNogusta'];
                var dato=[fila5.cod, session.user, 0];
                slt.UniversalSelect(conexion, 'gustarNogustar', column, dato, 'cod', '', 0, 10, function(resul){
                    if(resul.length>0){
                        slt.numerosLikeNo(conexion, 'gustarNogustar', 'historia', fila5.cod, 'gustaNOgusta', 0, function(a){
                            if(a)
                                contenido+='No Me Gusta '+a;
                        });
                    }else{
                        contenido+='<span class="nolikeassd876sds21'+fila5.cod+'">No Me Gusta </span>';
                        slt.numerosLikeNo(conexion, 'gustarNogustar', 'historia', fila5.cod, 'gustaNOgusta',  0, function(as){
                            if(as)
                                contenido+=as;
                        });
                    }
                });
            }
            contenido+="</div>"+
                "</section>"+
                "</section>"+
                "<section id='respuesta' class='fases"+fila5.cod+"rgab'></section>";
        }
        return callback(contenido);
    });
}

function histori(dato, callback) {
    var usuario = dato.meet.substr(17).substr(0, dato.longs.substr(8)), session=dato.session;
    var historias = [], userObj = [];
    timeLine(conexion, usuario, function(a){
        var loop = a.length, count = 0
        a.forEach(function(ele, ind){// se hace un foreach para recorrer el array ind es el indice y ele es el cotenido
            slt.selectEspecific(conexion, ['nick', 'nombres'], 'usuario', 'cod', ele.seguido, 'cod', '', 0, 1, function (user){
                if(ele.NoSee!==null){
                    switch(ele.NoSee){
                        case String(usuario):
                        console.log('no lo ve el dueño', ind);
                        break;
                        case '0000':
                        console.log('no lo ve nadie', ind);
                        break;
                        default:
                        domHistory(session, usuario, diseno, conexion, slt, ele, user[0], function(e){
                            //socket.emit('resTimeline', e);//problema ya que el socket no esta definido
                            callback(e);
                        });
                        //console.log('otros usuarios');
                        break;
                    }
                }else{
                    domHistory(session, usuario, diseno, conexion, slt, ele, user[0], function(e){
                        //socket.emit('resTimeline', e);//problema ya que el socket no esta definido
                        callback(e)
                    });
                }
                
                if (loop == count){//cuando los dos son iguales se envia el callback
                }
                count++//se incrementa el valor por cada ciclo
            });
        });
    });
}

function closeChat(dato){
	delete2row(conexion, 'chatOpen', 'usuario', dato.user, 'chat', dato.chat);
}

function datosUsers(dato){
	
}

function difuciones(dato, callback){
	slt.difucion(dato, function(a){
		if(!a){
			console.log('error');
		}else{
			callback(a);
		}
	});
}
