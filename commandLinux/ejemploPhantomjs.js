var page = require('webpage').create(),fs = require('fs'), args=require('system').args;
// var url = 'https://www.runt.com.co/portel/libreria/php/01.030528.html?dif=f97fa858404e7c92a818482795a773de';
var url = 'https://www.runt.com.co/consultaCiudadana/#consultaPersona';
// var url = 'https://fotogena.co';

// args.forEach(function(arg, i) {
// 	console.log(i+'::'+arg);
// });

function se(tag){
	return document.querySelector(tag);
}


page.viewportSize = { width: 400, height: 400 };
page.open(url, function (status) {
	if(status==='success'){
		setTimeout(loadScripts, 1500)
		// page.render('example.png')
	}
});

function keys(key){
	var ukey={
		'0': 48,
		'1': 49,
		'2': 50,
		'3': 51,
		'4': 52,
		'5': 53,
		'6': 54,
		'7': 55,
		'8': 56,
		'9': 57,
		'A': 65,
	}
	return ukey[key];
} 


function loadScripts(){
	setTimeout(function(){
		page.render('./captchasIMG/'+args[1]+'.png')
	},500)
	var numiu=0
	function solveCaptcha(){
		if(numiu<120){
			try {
				var f = fs.open('./captchasIMG/'+args[1]+'.txt', 'r');
				var content = f.read()

				var resto=page.evaluate(function(){
					document.querySelector('.form-group:nth-child(2)>.input-group>input').focus();
				});
				//simula escribir con teclado
				var numCeds=args[2].split('')

				numCeds.forEach(function(val){
					if(val) page.sendEvent('keypress', keys(val.toString()));
				})
				var resti=page.evaluate(function(){
					document.querySelector('.form-group:nth-child(3)>.input-group>input').focus();
					
				});
				page.sendEvent('keypress', content);

				page.evaluate(function(){
					document.querySelector('.form-group:nth-child(4)>button').click()
				});
				setTimeout(function(){
					page.render('./captchasIMG/buu.png')
					if(document.querySelector('.panel.panel-default[ng-show="verResultado"]')){
						console.log(document.querySelector('.panel.panel-default[ng-show="verResultado"]').innerHTML)
					}else{
						console.log('no hay respuesta del servidor')
					}
					phantom.exit();
				},2000)


				// try{
				// 	fs.write('./captchasIMG/fg_'+args[1]+'.txt', 'Message to be written to the file', 'w');
				// 	phantom.exit();
				// } catch(e) {
				// 	console.log('erro al escribir el archivo');
				// }

				// console.log(content, 'iygawef erge')

			}catch(e){
				numiu++
				setTimeout(solveCaptcha, 500)
			}
			if(f)
				f.close();
		}else{
			console.log(' no enviarón respuesta del captcha')
			phantom.exit();
		}
	}
	solveCaptcha()
}

