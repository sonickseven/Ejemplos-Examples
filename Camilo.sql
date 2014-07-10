SELECT cu.Cod_Curso, al.Nombre AS Estudiante, pr.Nombre AS Docente, cu.Curso AS Curso
FROM ((profesores AS pr INNER JOIN curso AS cu ON pr.Cod_de_Profesor=cu.Cod_de_Profesor)
	INNER jOIN evaluaciones AS ev ON ev.Cod_Curso=cu.Cod_Curso)
	INNER JOIN alumnos AS al ON al.Cod_de_Alumno=ev.Cod_Alumno
ORDER BY cu.Cod_Curso

/*****/

SELECT cu.Cod_Curso, al.Nombre AS Estudiante, cu.Curso AS Curso
FROM (alumnos AS al INNER jOIN evaluaciones AS ev ON al.Cod_de_Alumno=ev.Cod_Alumno)
	INNER jOIN curso AS cu ON ev.Cod_Curso=cu.Cod_Curso
WHERE cu.Cod_Curso=1
ORDER BY al.Cod_de_Alumno;

//mk ahi estan las dos primeras consultas, me falta hacer la de los parametros y las otras
