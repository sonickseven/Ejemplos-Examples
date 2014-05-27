Proceso calculo
	Definir all, men15, man50, between, i Como Entero;
	men15<-0;
	between<-0;
	man50<-0;
	para i<-0  hasta 100   Hacer
		
		si i<15 Entonces
			men15<-men15+1; 			
		FinSi
		si i>50 Entonces
			man50<-man50+1;
		FinSi
		si i>25 && i<45 Entonces
			between<-between+1;
		FinSi
	FinPara
	Escribir "cantidad menor a 15: ",men15, " cantidad mayor a 50: ", man50, " entre 25 y 45: ", between;	
FinProceso
