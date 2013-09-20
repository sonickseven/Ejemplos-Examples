function histori(dato, callback){
    var historias={}, userObj={};
	var usuario=dato.meet.substring(17).substring(0,dato.longs.substring(8));
	timeLine(conexion, usuario, function(a){
        historias=a;
		for (var i = 0; i < a.length; i++){//por cada reesultadode la consulta
            var historia=a[i].historia;//la nombro para que no haya un futuro error
            slt.selectEspecific(conexion, ['nick', 'nombres'], 'usuario', 'cod', a[i].seguido, 'cod', '', 0, 1, function(user){
                console.log(historia+' de '+user[0].nick);//mostraria una historia con su creador !!
                //userObj=user;
            });
        };
	});
    console.log(historias);//muestra {}
	callback(null);// este lo pongo ya cuando este terminado
}

//resultado de esa consulta
//Olle Bratt Pit no eres mi padre!!!  fuck yeah de SonickSeven
//Olle Bratt Pit no eres mi padre!!!  fuck yeah de noa2
//Olle Bratt Pit no eres mi padre!!!  fuck yeah de SonickSeven
//Olle Bratt Pit no eres mi padre!!!  fuck yeah de SonickSeven
//Olle Bratt Pit no eres mi padre!!!  fuck yeah de marbel93
//Olle Bratt Pit no eres mi padre!!!  fuck yeah de marbel93

//muestra simepre la misma historia pero el que cambia es el usuario esta mal :(
