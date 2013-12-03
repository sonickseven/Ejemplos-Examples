function serachNick(e){
	if(e.which===32){
		bandera=true;
		num=0;
		pruevita='';
	}
	if(typeof(pruevita)=='number'){
		if(se('.buscarNick')===null)
			$(this).focus().after('<article class="buscarNick">Aqui se buscara nick</article>');
		var search=this.value.substring(pruevita);
		/*chatHist.emit('serachNick', {vals: search}, function(){

		});*/
		if(e.which===8)
			if(this.value.length>pruevita){
				pruevita='';
				$('.buscarNick').remove();
			}
	}
	if(bandera){
		num+=1;
		var a=this.value.length;
		ind=this.value.substring(a-1);
		if(num===4)			
			if(ind==='@'){
				var as=this.value.length;
				pruevita=this.value.length;
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
