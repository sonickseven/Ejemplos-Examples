//las variables num, pruevita y bandera son globales
function serachNick(e){
	if(e.which===32){//verifica si le dio la tecla espacio
		bandera=true;
		num=0;//si hay un espacio resetea num y pruevita
		pruevita='';
	}
	if(typeof(pruevita)=='number'){
		if(se('.buscarNick')===null)
			$(this).focus().after('<article class="buscarNick">Aqui se buscara nick</article>');// crea un elemento que mostrara el resultado de la consulta
		var search=this.value.substring(pruevita);//mostrara todo lo que hay despues del @
		/*chatHist.emit('serachNick', {vals: search}, function(){

		});*/
		if(e.which===8)
			if(this.value.length>pruevita){
				pruevita='';
				$('.buscarNick').remove();
			}
	}
	if(bandera){//si vandera es verdadero empieza a sumar 
		num+=1;
		var a=this.value.length;
		ind=this.value.substring(a-1);
		if(num===4)//si el numero es cuatro pregunta si comienza por @			
			if(ind==='@'){
				var as=this.value.length;
				pruevita=this.value.length;//dice desde donde empieze a preguntar por @ ya q no puede buscar con todo el valor del textarea
			}else{
				bandera=false;
			}
	}
}

document.addEventListener('DOMContentLoaded', function(){
    se().addEventListener('keydown', serachNick, false)
},false);

function se(tag){
    return document.querySelector(tag);
}
