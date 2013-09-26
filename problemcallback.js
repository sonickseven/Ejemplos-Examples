function domHistory(session, usuario, diseno, conexion, selects, fila5, fila6){
    contenido="<section id='post' class='POST"+fila5.cod+">"+
                    "<section id='row'><a href='../proceso_logeo/index.php?cod="+fila6.nick+"' id='comentPho'>"+diseno.photos(fila5, 70, 60)+"<div>"+fila6.nick+"</div></a>"+
                    "<section id='coment'><span id='gaspEr'>";
    if(fila5.file!==null)
        contenido=contenido+diseno.file(fila5.file, fila5.cod);
    else
        contenido=contenido+"<span></span>";
    selects.difucion(conexion, 'arreglo', fila5.arreglo, function(difucion){
        if(difucion[0].Ucod!==null){
            if(fila5.seguido!==difucion[0].Ucod){
                contenido=contenido+"<span data-perfil='../proceso_logeo/index.php?cod="+difucion[0].nick+"' data-usua='Pic_4587_d58"+difucion[0].Ucod+"' class='creator'>"+diseno.photos(difucion[0], 48, 40)+"</span>";
                validar=true;
            }                
            contenido=contenido+'</span>'+diseno.usuarios(fila5.historia, fila5.cod)+' </section>'+
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
                                contenido=contenido+"<div";
                                if(fila6.conectado==='1'){
                                    contenido=contenido+" class='conectado'";
                                }else{
                                    contenido=contenido+" class='desconectado'";
                                }
                                contenido=contenido+'id="CHAT" onclick="javascript:(createChat('."'user_".$fila5["seguido"]."'".'))"></div>';// createChat('."'user_".$fila5["seguido"]."'".')
                            }else{
                                contenido=contenido+'<div class="nofriend"></div>';
                            }

                        });
                    }else{
                        contenido=contenido+'<div class="nofriend"></div>';
                    }
                });
            }else{
                contenido=contenido+'<div class="nofriend"></div>';//se sale del callback :(
            }
        }
    });
}
