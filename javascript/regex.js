
//buscar una palabra entre dos coincidencias
var ultimo=/faber([^)]+)holas/g.exec('I expect five hundred dollars faber$500holas.');
console.log(ultimo[1]);
