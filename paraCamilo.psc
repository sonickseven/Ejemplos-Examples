//numeros de tres en tres
Proceso sin_titulo
	Definir total, i Como Entero;
	total<-0;
	Para i<-3 HASTA 99 Hacer		
		total<-total+i;
		Escribir "numeros ",i;
		i<-i+2;
	finpara
	Escribir "La suma es de: ",total;
FinProceso

//numero factorial
Proceso factorial
	Definir cant Como Entero
	Escribir "Cuantos numero quiere factorizar?"
	Leer cant
	Dimension row[cant]
	Para i<-1 Hasta cant Hacer		
		Escribir "Por favor digite el primer numero a factorializar"
		Leer row[i]
		Escribir "el Factorial de ", row[i]," es ", factoria(row[i])
	Fin Para
FinProceso

Funcion res<-factoria(num)
	total<-1;
	para i<-1 Hasta num
		total<-total*i
	FinPara
	res<-total
FinFuncion


//Notas porcentajes
Proceso sin_titulo
	Definir exFinal, trabaFinal Como numero
	Dimension parciales[3], prom[3];
	Escribir 'Por favor digite las tres notas de los parciales'
	Escribir 'Primer parcial'
	Leer parciales[1]
	Escribir 'segundo parcial'
	Leer parciales[2]
	Escribir 'Tercer parcial'
	Leer parciales[3]
	prom[1]<-(parciales[1]+parciales[2]+parciales[3])/3
	Escribir 'Por favor digite la nota de el examen final'
	Leer exFinal
	Escribir 'Por favor Digite la nota del trabajo final'
	Leer trabaFinal
	prom[2]<-(((prom[1]*45)/100)+((exFinal*35)/100)+((trabaFinal*20)/100))
	Escribir prom[2]
FinProceso


//Este es el de los dias de la semana
Proceso sin_titulo
	Definir dia Como Entero
	Dimension dias[7]
	dias[1]<-'lunes'
	dias[2]<-'Martes'
	dias[3]<-'Miercoles'
	dias[4]<-'Jueves'
	dias[5]<-'Viernes'
	dias[6]<-'Sabado'
	dias[7]<-'Domingo'
	Escribir "Por favor digite el numero para ver el dia"
	Leer dia
	si dia>7 
		Escribir 'Por favor un numero menor a 7'
		Leer dia
	FinSi
	Escribir 'El numero da como resultado: ', dias[dia]
FinProceso

//Este es el de las notas
Proceso Notas
	Definir nota como numero
	Escribir 'Por favor digite la nota'
	Leer nota
	si nota<=2
		Escribir 'Ha obtenido un deficiente'
	Sino
		si nota>=2.1 && nota<=4.4
			Escribir 'Ha obtenido un Insuficiente'
		Sino
			si nota>=4.5 && nota<=4.6
				Escribir 'Ha obtenido un Aceptable'
			Sino
				si nota>=4.7 && nota<=4.8
					Escribir 'ha obtenido un Sobresaliente'
				Sino
					si nota>=4.9 && nota<=5
						Escribir 'ha obtenido un Exelente'
					Sino
						Escribir 'Por favor digite una nota entre 0 y 5'
					FinSi
				FinSi
			FinSi
		FinSi
	FinSi
FinProceso
