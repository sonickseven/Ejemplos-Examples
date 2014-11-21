select count(sg.cod) cantidad, lp.name
from songs sg INNER join listPlayer lp On lp.cod=sg.listPlayer
INNER join usuario us ON lp.usuario=us.cod
where us.cod=1
group by lp.cod;
