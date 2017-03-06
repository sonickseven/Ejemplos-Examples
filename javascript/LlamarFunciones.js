function loadPho(a, b){
	if(a.length>0)
		a.forEach(function(val, key){
			$('#fm_delete').after(val);
		});
	loadVi();
	option();
	if(envios<1){
		scrollD(function(b){
			console.log(envios)
			if(b){
				chatHist.emit('BooPho', {maxwell:se('.Photoo>div[data-bobis]').dataset.bobis, count: undefined, lt:envios+=16, lt2: 16}, function(a){
					if(a.dom.length>0){
						a.dom.forEach(function(val, key){
							$('.Photoo').append(val);
						});
						loadPho(a);//se vuelve a llamar
					}
				});
			}
		});
	}
}
function se(tag){
	return document.querySelector(tag);
}
function option(){
	se('#opt').addEventListener('click',function(){
		console.log('Holas me han llamado');//solo se activa si han dado click
	},false);
}
