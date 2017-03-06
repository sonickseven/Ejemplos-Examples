function serialise(dato){
    all=[];
    var datos=dato.split('&');
    for(var i=0; i<datos.length; i++){
        var obj=datos[i].split('=');
        all[i]='"'+obj[0]+'":"'+obj[1]+'"';
    }
    var as=all.join(',');
    return (JSON.parse('{'+as+'}'));//retorna un objeto con el nombre de los inputs
}
