function random(start, end){
	let numPosibilidades=end-start
	let aleat=Math.random()*numPosibilidades
	aleat=Math.round(aleat)
	return parseInt(start)+aleat
}

var arrayPadre=[], limit=5;

function numeroAzar(cb){
	setTimeout(()=>{
		if(cb){
			return cb(random(0, 20))
		}
	},random(0, 800))
}

  	numeroAzar( rest=>{
		console.log( rest)
	})

function aa(){
	if( arrayPadre.length < limit){
		numeroAzar( rest=>{
			arrayPadre.push( rest)
			aa()
		})
	}else{
		console.log( arrayPadre)
	}
}
