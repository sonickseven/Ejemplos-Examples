function selects(tabla, colum, conexion, dato, order, lm, lm2, callback){
	var resp=[];
	conexion.query("SELECT * FROM "+tabla+" WHERE "+colum+"='"+dato+"' ORDER BY "+order+" LIMIT "+lm+','+lm2, function(err, rows, fields){
		if (err) throw err;
		//console.log(rows);
		resp=rows;//muestra la consulta correctamente
	});
	return callback(resp);
}

//como se llama en otro archivo y esta correcto

var conn=require('./conexion');
var conexion=conn.connect, insert=conn.inert, selects=conn.select;

selects('usuario', 'cod', conexion, dato.substring(5), 'cod', 0, 10, function(a){
	console.log(a);//muestra []
});
