despues de descar el archivo tar.gz lo descomprimes y despues en consola vas hasta donde el esta y entras, 
despues le das el primer comando:

./configure

si te sale un chorrero de cosas esta bn y si sale error pues ya sabes talves no estas en la carpeta!!!!

despues de darle el ./configure le das:

./make

este si se va ademorar bastante!!!  y despues:

./make install

y listos ya tienes node instalado en tu pc ahora para ver la version del node le das en consola:

node -v

ya esta con npm ahora prueba con un archivo en javascrio secillito como este

/****************esto va en un archivo****************************/
ar http = require(‘http’);
http.createServer(function(request, response) {response.writeHead(200, {‘Content-Type’: ‘text/html’}); 
response.write(‘Hola Mundo\n’); response.end(); }).listen(8888); console.log(‘Inicio el servidor web…’)
/******************************************************************/
lo guardas como app.js  (lo importante es que termine en .js)


despues vas hasta donde dejaste ese archivo por consola y pones node app_o_nombre_que _pusiste.js

y vas a tu explorador y pones 

 http://localhost:8888
 
 si te sale hola mundo esta bn
