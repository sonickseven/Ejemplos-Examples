para crear una base de dtos es de la siguiente forma:

primero se crea las la base de datos:  con la sentensia create database nombre_de_la_base_de_datos;

deespues se selecciona la base de datos, de la siguiente forma: use nombre_de_la_base_de_datos;

ahora si se crean las tablas se crea asi:  create table nombre_Tabala();

como se ve se ahce con la sentencia de create table que es español es crear tabla  bueno!!!!!

y lo que esta en los parentesis es las columna que la tabla va a tener!! ejemplo:

create table nombre_tabla(
  nombre_campo typo_de_dato atributos_del_campo,
  nombre_campo typo_de_dato atributos_del_campo,
  nombre_campo typo_de_dato atributos_del_campo
);

create table alejandra(
  identificacion bigint auto_increment primary key,
  nombre varchar(20) not null
);

varchar(20) significa que es un campo de tipo texto, como se muestra en acces. Ahora los número en los parentesis significa
el lmite de digitos en el campo. Por ejemplo si hay un varchar(3)  y le queremos insertar estos datos: faber  pues solo quedara
las tres primeras letras que serain fab y el resto se obvia!!.  si es varchar(4) solo paraceria las cuatro primeras letras
que seria fabe y si es varchar(30)  pues el limite es de treinta!! espero hayas entendido sino estas en la inmunda!!!


bigint significa un tipo de datos entero grande ejemplo: un int= entero llega hasta 12232424  y un bigint es un tipo de dato
que soporta hasta 23324235345346  osea es mucho mas grande que el un int !!!  entero si sabes de matematicas es numero!!!  bueno
si no sabes que es entero tambien estas en la inmunda!!

not null es no nulo o es acces seria requerido!!!  bueno ahora si no sabes lo de acces tambien estas en la inmunda!!.
explicando eso es:

        alejandra
-----------------------------------
| idenatificacion | nombre        |
-----------------------------------
| 1292529         | lina Alejandra|
| 2348253         | Faber A.      |
| 253535354       | Sebastian M   |


eso seria la tabla, claro ya con datos en ella!!  bueno.


bueno espero que hayas entendido, esto es algo de lo que se ve normalmente en la programacion, YYYYY  TODO SE SE HACE EN INGLES!!!
