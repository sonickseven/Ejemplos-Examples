'use strict'
const globals={
	postHistory:{},
	visit:{},
	home:{},
	design:{},
	book:{},
	followmeTmp:{},
	data:{},
	edits:{},
	positionImg:{},
	pictures:{}
}
var varStrik={
	settingMusic:{
		at: '&',
		searchKey: 'keyname',
		insertTpl: '&${cod}',
		displayTpl: '<li class="ss-list-suggert musicTagged">'+
						'<div class="ss-columngh picgut miscTag">'+
							'<img src="${thumbnbail}" alt="${name}" />'+
						'</div>'+
						'<div class="ss-columngh txthis">'+
							'<div class="ss-text-searh"><strong>${keyname}</strong></div>'+
							'<div class="ss-text-searh">${name}</div>'+
							'<div class="ss-text-searh">${artist}</div>'+
						'</div>'+
					'</li>',
		limit: 20,
		callbacks: {
			remoteFilter: (text, cb)=>{
				if(text.length>2){
					varStrik.searchSong({text: text})
					.then(resp=>{
						console.log(resp)
						if(resp.length){
							cb(resp)
						}
					}).catch(console.log)
				}
			}
		}
	},
	settingEmojis:{
		at: ':',
		searchKey: 'strn',
		data: emojis,
		displayTpl: '<li>${strn} <img src="${srcImg}"" height="20" width="20" /></li>',
    	insertTpl: '${code}',
    	delay: 400,
    	limit: 15
	},
	settingTagging:{
		at: '@',
		searchKey: 'nick',
		insertTpl: '@${nick}',
		displayTpl: '<li class="ss-list-suggert">'+
						'<div class="ss-columngh picgut">'+
							'<img src="'+consts.domain+'${pDir}" alt="${nick}" />'+
						'</div>'+
						'<div class="ss-columngh txthis">'+
							'<div class="ss-text-searh"><strong>${nick}</strong></div>'+
							'<div class="ss-text-searh">${nombres}${apellidos}</div>'+
						'</div>'+
					'</li>',
		limit: 10,
		callbacks: {
			remoteFilter: (nick, cb)=>{
				let self = $(this)
				self.data('active', false)
				if(nick.length>2){
					varStrik.searchNick({nick: nick})
					.then(resp=>{
						if(resp.users.length){
							cb(resp.users)
						}
					}).catch(console.log)
				}
			}
		}
	},
	searchSong: data=>
		new Promise(resol=>{
			console.log(data)
			clearTimeout(varStrik.vari.searchSongText)
			varStrik.vari.searchSongText=setTimeout(()=>{
				chatHist.emit('searchSong', {text: data.text, atwho: true}, resol)
			},500)
		})
	,
	searchNick: data=>
		new Promise(resol=>{
			clearTimeout(varStrik.vari.searchNickText)
			varStrik.vari.searchNickText=setTimeout(()=>{
				chatHist.emit('searching', {val: data.nick}, resol)
			},500)
		})
	,
	insertTextAtCursor: text=>{
		let sel,
			range,
			html
		if(window.getSelection){
			sel=window.getSelection();
			if(sel.getRangeAt&&sel.rangeCount){
				range=sel.getRangeAt(0)
				range.deleteContents()
				range.insertNode(document.createTextNode(text))
			}
		}else if(document.selection&&document.selection.createRange)
			document.selection.createRange().text=text;
	},
	editPaste: function(ev){
		ev.preventDefault();
		if(ev.clipboardData&&ev.clipboardData.getData){
			let text=ev.clipboardData.getData('text/plain')
			document.execCommand('insertHTML', false, text)
		}else if(window.clipboardData && window.clipboardData.getData){
			let text = window.clipboardData.getData('Text')
			varStrik.insertTextAtCursor(text)
		}
	},
	validaSize:file=>
		new Promise((go, err)=>{
		    if(file.size<20661){
		        go(4)
		    }else{
		        var resp = false;
		        chatHist.emit('ifSize',{name: file.name, size: file.size, nick: localStorage.nick},function(a){
		            go(a)
		        });
		    }
		})
	,upLoadFullcanvasdataImg:data=>{
	    switch(data.opt){
	        case 'perfil':
	        imgData.proportion=1;
	        imgData.tag='.imgPerfilCont>.imgPerfil-visit, .previewPho';
	        doCanvasDOMCrop.prepareDOM(data.img, data.opt, 0)
	        break;
	        case 'banner':
	        imgData.proportion=4.3;
	        imgData.tag='header.bannered';
	        doCanvasDOMCrop.prepareDOM(data.img, data.opt, 0)
	        break;
	        case 'background':
	        imgData.tag='body';
	        imgData.proportion=data.img.width/data.img.height;
	        doCanvasDOMCrop.prepareDOM(data.img, data.opt, 0);
	        break;
	        default:
	        console.log('no hay opcion definida')
	        break;
	    }
	},
	sideBars:(data, resp)=>{
		let positions={},
			siRightToLeft=false,
			tdcfvyg=0,
			threshold=150,
			restraint=150,
			startTime,
			leftBar=false,
			allowedTime=150,
			middleLeft=data.touchableLeft?data.touchableLeft.offsetWidth/2:2,
			middleRight=data.touchableRight?data.touchableRight.offsetWidth/2:2,
			moveHorizontal=false
		varStrik.data.position2X=0

		data.content.addEventListener('touchstart',ev=>{
			let positionx=ev.changedTouches[0].pageX
			tdcfvyg=ev.changedTouches[0].pageX
			positions.x=positionx
			startTime = new Date().getTime()
			if(positionx>window.innerWidth-30){
				varStrik.data.rightBar=true
			}else if(positionx<30){
				varStrik.data.leftBar=true
			}
		},false)
		data.content.addEventListener('touchmove', ev=>{
			let elapsedTime=new Date().getTime()-startTime,
				positionMoveX=positions.x-(ev.changedTouches[0].pageX)
				positionMoveX=positionMoveX<0?positionMoveX*-1:positionMoveX
			if(elapsedTime>allowedTime&&positionMoveX>50&&(varStrik.data.rightBar||varStrik.data.leftBar)){
				if(varStrik.data.rightBar){
					varStrik.data.position2X=data.touchableRight.offsetWidth-positionMoveX
					data.touchableRight.style.transform=`translate(${(varStrik.data.position2X>0?varStrik.data.position2X:0)}px)`
				}else if(varStrik.data.leftBar){
					varStrik.data.position2X=positionMoveX-data.touchableLeft.offsetWidth
					data.touchableLeft.style.transform=`translate(${(varStrik.data.position2X>0?0:varStrik.data.position2X)}px)`
				}
			}else if(varStrik.data.rightBarActive&&!varStrik.data.rightBar&&elapsedTime>allowedTime&&positionMoveX>60){
				data.touchableRight.style.transform=`translate(${(positionMoveX>data.touchableRight.offsetWidth?data.touchableRight.offsetWidth:positionMoveX)}px)`
				positions.x=positionMoveX
				moveHorizontal=true
			}else if(varStrik.data.leftBarActive&&!varStrik.data.leftBar&&elapsedTime>allowedTime&&positionMoveX>60){
				let temVari=positionMoveX*-1,
					invertWidth=data.touchableLeft.offsetWidth*-1
				varStrik.data.position2X=temVari
				data.touchableLeft.style.transform=`translate(${(temVari<invertWidth?invertWidth:temVari)}px)`
				varStrik.data.position2X=temVari
				moveHorizontal=true
			}
		},false)
		data.content.addEventListener('touchend', ev=>{
			if(varStrik.data.rightBar&&varStrik.data.position2X<200&&varStrik.data.position2X!==0&&!varStrik.data.rightBarActive){
				data.touchableRight.style.transform=`translate(0)`
				varStrik.data.rightBarActive=true
				setTimeout(()=>{
					resp({err:false, type:'showRight'})
				},100)
				if(varStrik.data.leftBarActive)
					resp({err:false, type: 'hideLeft'})
			}else if(!varStrik.data.leftBarActive&&varStrik.data.leftBar&&varStrik.data.position2X!==0&&varStrik.data.position2X>-180){
				data.touchableLeft.style.transform=`translate(0)`
				varStrik.data.leftBarActive=true
				setTimeout(()=>{
					resp({err:false, type:'showLeft'})
				},100)
				if(varStrik.data.rightBarActive)
					resp({err:false, type: 'hideRight'})
			}else if(varStrik.data.rightBar&&varStrik.data.position2X>199){
				data.touchableRight.style.transform=`translate(${data.touchableRight.offsetWidth+10}px)`
				resp({err:true})
			}else if(varStrik.data.rightBarActive&&!varStrik.data.rightBar&&moveHorizontal){
				moveHorizontal=false
				if(positions.x>120){
					data.touchableRight.style.transform=`translate(${data.touchableRight.offsetWidth+10}px)`
					varStrik.data.rightBarActive=false
					resp({err:false, type: 'hideRight'})
				}else{
					data.touchableRight.style.transform=`translate(0)`
					resp({err:true})
				}
			}else if(varStrik.data.leftBarActive&&!varStrik.data.leftBar&&moveHorizontal){
				moveHorizontal=false
				if(varStrik.data.position2X<(middleRight)*-1){
					resp({err:false, type: 'hideLeft'})
				}else{
					data.touchableLeft.style.transform=`translate(0)`
					resp({err:true})
				}
			}
			varStrik.data.rightBar=false
			varStrik.data.leftBar=false
			varStrik.data.position2X=0
		})

	},
	swipedetect:(el, callback)=>{
		callback('')
		let touchsurface = el,
			swipedir='',
			startX,
			startY,
			distX,
			distY,
			threshold = 150,
			restraint = 100,
			allowedTime = 300,
			elapsedTime,
			startTime,
			ismousedown = false,
			detecttouch = !!('ontouchstart' in window) || !!('ontouchstart' in document.documentElement) || !!window.ontouchstart || !!window.Touch || !!window.onmsgesturechange || (window.DocumentTouch && window.document instanceof window.DocumentTouch),
			handleswipe = callback || function(swipedir){}

		touchsurface.addEventListener('touchstart', function(e){
			var touchobj = e.changedTouches[0],
			dist = 0
			startX = touchobj.pageX
			startY = touchobj.pageY
			startTime = new Date().getTime() // record time when finger first makes contact with surface
			// e.preventDefault()
		
		}, false)

		touchsurface.addEventListener('touchmove', function(e){
			// e.preventDefault() // prevent scrolling when inside DIV
		}, false)

		touchsurface.addEventListener('touchend', function(e){
			var touchobj = e.changedTouches[0]
			distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
			distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
			elapsedTime = new Date().getTime() - startTime // get time elapsed
			if(elapsedTime<=allowedTime){ // first condition for awipe met
				if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
					swipedir = (distX < 0)? 'left' : 'right'
				}
				else if (Math.abs(distY) >= threshold  && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
					swipedir = (distY < 0)? 'up' : 'down'
				}else
					swipedir=''
			}
			// check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
			handleswipe(swipedir)
			// e.preventDefault()
		}, false)

		if (!detecttouch){
			document.body.addEventListener('mousedown', function(e){
				if ( isContained(touchsurface, e) ){
					var touchobj = e
					swipedir = 'none'
					dist = 0
					startX = touchobj.pageX
					startY = touchobj.pageY
					startTime = new Date().getTime() // record time when finger first makes contact with surface
					ismousedown = true
					e.preventDefault()
				}
			}, false)
		
			document.body.addEventListener('mousemove', function(e){
				// e.preventDefault() // prevent scrolling when inside DIV
			}, false)
		
			document.body.addEventListener('mouseup', function(e){
				if (ismousedown){
					var touchobj = e
					distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
					distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
					elapsedTime = new Date().getTime() - startTime // get time elapsed
					if (elapsedTime <= allowedTime){ // first condition for awipe met
						if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
							swipedir = (distX < 0)? 'left' : 'right'
						}
						else if (Math.abs(distY) >= threshold  && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
							swipedir = (distY < 0)? 'up' : 'down'
						}
					}
					// check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
					handleswipe(swipedir)
					ismousedown = false
					// e.preventDefault()
				}
			}, false)
		}
	},
	overflowWindow:data=>{
		if(data.hide){
			se('body').style.overflow='hidden'
		}else{
			se('body').style.overflow='visible'
		}
	},
	createChart:tagElem=>{
		let pie=d3.layout.pie()
			.value(function(d){return d})
			.sort(null);
		let w=(tagElem.offsetWidth>280?280:tagElem.offsetWidth)/1.4,
			h=w;
		 
		let outerRadius=(w/2)-15;
		let innerRadius=outerRadius-8;
		 
		let color = ['#f2503f','#ea0859','#404F70'];
		 
		let svg=d3.select(tagElem)
			.append("svg")
			.attr({
				width:w,
				height:h,
				class:'shadow'
			}).append('g')
			.attr({
				transform:'translate('+w/2+','+h/2+')'
			});
		 
		chatVar.logic.createGradient(svg,'gradient',color[0],color[1]);
		 
		let arc=d3.svg.arc()
			.innerRadius(innerRadius)
			.outerRadius(outerRadius)
			.startAngle(0)
			.endAngle(2*Math.PI);
		 
		let arcLine=d3.svg.arc()
			.innerRadius(innerRadius)
			.outerRadius(outerRadius)
			.startAngle(0);
		 
		 
		let pathBackground=svg.append('path')
		 
			.attr({
				d:arc
			})
			.style({
				fill:color[2]
			});
		 
		 
		let pathChart=svg.append('path')
			.datum({endAngle:0})
			.attr({
				d:arcLine,
				class: 'porcenty'
			})
			.style({
				fill:'url(#gradient)'
			});
		 
		let middleCount=svg.append('text')
			.text('0%')
			.attr({
				class:'middleText',
				'text-anchor':'middle',
				dy:15,
				dx:0
			})
			.style({
				fill:color[1],
				'font-size':'40px'
		 
			});
		return {arcLine: arcLine, pathChart: pathChart, middleCount: middleCount}
	},
	setPercent:data=>{
		let arcTween=function(transition, newAngle){
			transition.attrTween('d', function (d) {
				var interpolate = d3.interpolate(d.endAngle, newAngle);
				return function (t) {
					d.endAngle = interpolate(t);
					return data.element.arcLine(d);
				};
			});
		};
		let animate=function(data){
			arcky.transition()
			.duration(100)
			.ease('bounce')
			.call(arcTween,((2*Math.PI))*data.ragio);
			middleCount.textContent=data.percent+'%';
		};
		let arcky=d3.select(se(data.element.patchPorcenty)),
			middleCount=se(data.element.svgSelector+' .middleText')
		animate(data)
	},
	checkUpdates:()=>{//funciones cambios para todos
		chatHist.emit('checkFirstTime',{}, resp=>{
			if(resp.firstTime){
				boot.logic.popUpAlert({time:5000, msg: 'Hemos realizado una actualización y a que no adivinas a quién le toca actualizarse 😏!!'})
				setTimeout(()=>{
					window.location.replace(`/firsttime/`);
				},5000)
			}
		})
	},
	clearLogs:()=>{
		if(typeof(SERVER)!=='undefined'){
			if(SERVER){
				console.log=function(){}
			}
		}
	},
	deleteDragsSign:()=>{
		si('.chat .-chat-showAdd', elem=>{
			elem.remove()
		})
	},generateTime:()=>{
		var now=timeDate()[3],time=now.getTime(),
			expireTime=time+1000*36000000;
		now.setTime(expireTime);
		return now.toGMTString();
	},	serialize:(elem1, cb)=>{
		return new Promise((res, err)=>{
			let data={};
			[].forEach.call(elem1.querySelectorAll('input, select, textarea'), function(elem){
				if(elem.tagName.match(/(INPUT|SELECT|TEXTAREA)/g))
					data[elem.name]=elem.value;
			});
		res(data)
		})
	},closeSession:(e)=>{
		e.preventDefault();
		notifi.emit('dropSess', {nick:localStorage.nick}, function(a){
			if(a.res){
				localStorage.clear();
				document.cookie='fotgna=0000';
				javascript:location.reload();
			}
		});
	},base64ToArrayBuffer:(e)=>{
		var f = window.atob(e);
		var b = f.length;
		var c = new Uint8Array(b);
		for (var g = 0; g < b; g++) {
			var a = f.charCodeAt(g);
			c[g] = a
		}
		return c.buffer
	},
	bytesToSize:(bytes)=>{
		var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		if (bytes == 0) return '0 Byte';
		var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
		return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
	},splitWords:(text, num)=>{
		return [text.substr(0, num), text.substr(num)]
	},vineTM2:function(){
		var boxEmbed=this;
		var iframe=document.createElement('iframe')
		iframe.setAttribute('allowFullScreen', '');
		iframe.src=boxEmbed.dataset.embed
		iframe.className='vineIfraPreview'
		boxEmbed.parentNode.appendChild(iframe, boxEmbed)
		boxEmbed.style.display='none';
	},
	embedYoutube:function(){
		var objBind=this,boxEmbed=this.elem,
			random=aleatorio(1, 100000),
			contentTag=boxEmbed.parentNode,
			tagString=contentTag.innerHTML
		var prom=new Promise((cb, err)=>{
			boxEmbed.id='mediaYoutube'+random;
			youtubeApi2({
				id: boxEmbed.dataset.id,
				payer: 'mediaYoutube'+random,
				width: boxEmbed.offsetWidth
			}, function(res){
				contentTag.innerHTML=tagString
				cb(true)
				objBind.fn()
			});
		})
		return prom;
	},
	data:{},
	vari:{},
	anima:{
		showNav:function(){
			$(this.nextSibling).fadeToggle(500);
		}
	},hideSaerch:function(){
		if(!se('#search>form'))
			$('#search').fadeOut(500);
	},
	shoeSaerch:function(){
		if(this.value&&this.value.length>3)
			$('#search').fadeIn(500);
	},
	searchUser:function(){
		var cojaTexto=this;
		if(cojaTexto.value&&cojaTexto.value.length>3){
			$('#search').fadeIn(500)
			se('#search').innerHTML='<span class="loadsIcon"><i class="animate-spin demo-iconed-load"></i> Cargando...</span>'
			clearTimeout(varStrik.vari.searUser)
			varStrik.vari.searUser=setTimeout(()=>{
				chatHist.emit('searching', {val:cojaTexto.value}, resa=>{
					if(resa.err){
						se('#search').innerHTML='<h4 class="icon-warning">No has inciado sesión</4>';
					}else{
						if(resa.users.length){
							se('#search').innerHTML=''
							resa.users.forEach((val,key)=>{
								$('#search').append(html.dmSearchUser(val))
								if(key+1===resa.users.length)
									GNGN();
							})
						}else{
							se('#search').innerHTML='<h4 class="icon-warning">No hay resultados!!</4>';
						}
					}
				});
			},400)
		}
		else
			$('#search').fadeOut(800)
	},promptOfFollow: function(data){
		var promises=new Promise(function(res, err){
			chatHist.emit('prompt', data, res)
		})
		return promises;
	},positioMenuContext:function(elem){
		var offset = $(elem).offset(),
			sobranteVerti=se('body').offsetHeight-offset.top,
			sobranteHori=se('body').offsetWidth,
			widElem=offset.left+elem.offsetWidth
		if(elem.offsetHeight>sobranteVerti&&widElem>sobranteHori)
			return 0;//se cambia arriba e izquierda
		else if(elem.offsetHeight>sobranteVerti)
			return 1;//solo arriba
		else if(widElem>sobranteHori)
			return 2;
	},rightClick:{
		addSongToListplayer:function(){
			se('#contextmenu').remove();
			chatHist.emit('allListplayer', {opt:1, lp: this.dataset.lp, wm: this.dataset.wm}, function(res){
				if(res.res===10)
					alertPop({time: 1500,msg:'Para crear listas debes de estar registrado',  err:true})
				else if(res.res===2)
					alertPop({time: 1500,msg:'Se ha agregado correctamente',  err:false})
			});
		},addToListaplayer:function(elem){
			if(elem.dataset.clicked==='1'){
				if(!se('#contextmenu .-context-listPlayers')){
					$('#contextmenu>ul>li[data-opt="0"]').append('<div data-poso="right" data-posi="top" class="-context-listPlayers"><span class="loadsIcon"><i class="animate-spin demo-iconed-load"></i> Buscando...</span></div>');
					chatHist.emit('allListplayer', {
						uss: localStorage.user,
						opt: 0
					}, function(list){
						se('#contextmenu .-context-listPlayers').innerHTML='<ul></ul>';
						if(list.length)
							list.forEach(function(val, key){
								$('#contextmenu .-context-listPlayers>ul').append('<li data-wm="'+elem.dataset.cod+'" data-lp="'+val.cod+'" title="'+val.name+'"><span class="noSpace">'+val.name+'</span><i class="icon-clipboard"></i> </li>');
								if((key+1)===list.length){
									se('#contextmenu .-context-listPlayers').style.maxHeight=(se('body').offsetHeight/2)+'px';
									var posi=varStrik.positioMenuContext(se('#contextmenu .-context-listPlayers'));
									if(posi===1){//acomoda el menucontext en otra posición pra que no se vea feo
										se('#contextmenu .-context-listPlayers').dataset.posi='bottom'
									}else if(posi===0){
										se('#contextmenu .-context-listPlayers').dataset.posi='bottom'
										se('#contextmenu .-context-listPlayers').dataset.poso='left';
									}else if(posi===2)
										se('#contextmenu .-context-listPlayers').dataset.poso='left';
									si('.-context-listPlayers li', function(elem){
										elem.addEventListener('click', varStrik.rightClick.addSongToListplayer ,false)
									})
								}
							});
					});
				}
			}else{
				if(se('#contextmenu .-context-listPlayers'))
					se('#contextmenu .-context-listPlayers').remove();
			}
		},shareMusic:function(node){
			if(se('.music-box[data-cod="'+node.dataset.cod+'"]')){
				var infos=JSON.parse(se('.music-box[data-cod="'+node.dataset.cod+'"]').dataset.infos)
				var boxShare=document.createElement('div');
				boxShare.id='boxShare';
				boxShare.innerHTML=html.dmMusicShare(infos);
				se('body').appendChild(boxShare)
				$('body').append('<article class="ss-dummi ng-scope" ng-click="showChat()"></article>')
				si('.ss-dummi, #boxShare>i', function(elem){
					elem.addEventListener('click', function(){
						si('.ss-dummi, #boxShare', function(elem){
							elem.remove();
						})
					},false)
				})

				let $inputor=$('.-boxShare-history textarea')
				.atwho(varStrik.settingTagging)
				.atwho(varStrik.settingEmojis)
				$inputor.caret('pos', 47)
				$inputor.focus().atwho('run')

				se('#boxShare .-chare').addEventListener('click', function(){
					var datos={htry:se('#boxShare .-boxShare-history>textarea').value,
						sg: node.dataset.cod}
					this.style.display='none';
					se('#boxShare .mediaShare>div:nth-child(3)').style.visibility='visible';
					chatHist.emit('allListplayer', {opt:1, wm: node.dataset.cod}, res=>{
						if(res.res===2)
							showHistory({file: 'Aud_'+res.sg, user: localStorage.user, history: datos.htry}).then(sda=>{
								si('.ss-dummi, #boxShare', function(elem){
									elem.remove();
								})
							}).catch(console.log)
					});
				},false)
			}
		},newlistPlayer:function(elem){
			if(se('#boxShareMusic')) se('#boxShareMusic').remove();
			$('body').append('<article class="ss-dummi ng-scope" ng-click="showChat()"></article>');
			var shareMusicBox=document.createElement('div');
			shareMusicBox.id='boxShareMusic';
			shareMusicBox.innerHTML=html.dmCreateListPlayer;
			se('body').appendChild(shareMusicBox);
			si('#boxShareMusic>i, .ss-dummi', function(elem){
				elem.addEventListener('click', function(){
					si('#boxShareMusic, .ss-dummi', function(elem){
						elem.remove();
					})
				},false)
			});
			se('#boxShareMusic>form').addEventListener('submit',function(ev){
				ev.preventDefault();
				html.noRunScript(se('#boxShareMusic>form input[type="text"]').value, text=>{
					chatHist.emit('createList', {name:text, wm: elem.dataset.cod}, asd=>{
						si('#boxShareMusic, .ss-dummi', function(elem){
							elem.remove();
						})
						if(asd.res===2){
							alertPop({time: 2500,msg:'Se ha creado correctamente tu lista de reproducción y se le ha agregado la canción',  err:false})
							showHistory({file: 'lsp_'+asd.lp, user: localStorage.user, history: '@'+localStorage.nick+' ha creado "'+text+'" su nueva lista de reproducción'}).catch(err=>{console.log(err)});
						}
						else if(asd.res===1)
							alertPop({time: 1500,msg:'Para crear listas debes de estar registrado',  err:true})
					})
				});
				se('#boxShareMusic').innerHTML='<span class="loadsIcon"><i class="animate-spin demo-iconed-load"></i> Creando lista de reproducción!!</span>';

			},false)
		}, removeSg:function(elem){
			var datatse=se('.music-box[data-cod="'+elem.dataset.cod+'"]').dataset
			alertPop({opt:0,msg:'Estas seguro de remover la canción de la lista',  err:true}, function(res){
				if(res){
					chatHist.emit('allListplayer', {sg: datatse.scod, opt:2}, function(asc){
						if(asc.res===1)
							alertPop({time: 1500,msg:'No eres el creador de la lista de reproducción, @'+localStorage.nick+' quieres problemas!!',  err:true})
						else if(asc.res===2){
							si('.sound-now>div>.music-box[data-scod="'+datatse.scod+'"], .contentMsuci>.music-box[data-scod="'+datatse.scod+'"]', function(elem){
								elem.remove();
							})
							alertPop({time: 1500,msg:'Se ha quitado la canción con exito',  err:true})
						}
					})
				}
			})
		},getURL:function(elem){
			if(se('#boxShareMusic')) se('#boxShareMusic').remove();
			$('body').append('<article class="ss-dummi ng-scope" ng-click="showChat()"></article>');
			var shareMusicBox=document.createElement('div');
			shareMusicBox.id='boxShareMusic';
			shareMusicBox.innerHTML='<i class="cancelButton icon-cancel-circled-3"></i> <h3>URL de la canción</h3> <div><input type="text" readonly value="'+varStrik.urlMedia+'/player/?sg='+elem.dataset.cod+'"/></div><button class="ss-button-primary">Copiar</button>';
			se('body').appendChild(shareMusicBox);
			se('#boxShareMusic>button').addEventListener('click', function(){
				var urlSong=se('#boxShareMusic input[type="text"]');
				urlSong.select();
				try{
					var successful=document.execCommand('copy');
					var msg = successful ? 'successful' : 'unsuccessful';
					alertPop({time: 1500,msg:'Guardado en el portapapeles!',  err:false})
					closeWindoe()
				}catch (err){
					alertPop({time: 4000,msg:'Tu buscador de internet no permite copiar, haslo manualmente',  err:true})
				}

				function closeWindoe(){
					if(se('#boxShareMusic')){
						se('#boxShareMusic').className='animated zoomOut'
						setTimeout(()=>{
							si('#boxShareMusic, .ss-dummi', elem=>{
								elem.remove()
							})
						},700)
					}
				}
			},false)
			si('#boxShareMusic>i, .ss-dummi', function(elem){
				elem.addEventListener('click', function(){
					si('#boxShareMusic, .ss-dummi', function(elem){
						elem.remove();
					})
				},false)
			});
		},main:function(ev){
			if(se('#contextmenu')) se('#contextmenu').remove();
			ev.preventDefault();
			var boxContextMenu=document.createElement('div');
			boxContextMenu.id='contextmenu';

			// boxContextMenu.style.top=(ev.clientY-10)+'px';
			// boxContextMenu.style.left=(ev.screenX+7)+'px';
			boxContextMenu.style.top=(ev.pageY-10)+'px';
			boxContextMenu.style.left=(ev.pageX+10)+'px';

			boxContextMenu.innerHTML='<ul>'+
					'<li data-clicked="0" data-cod="'+this.dataset.cod+'" data-opt="0" class="icon-list-add">Agregar <i class="icon-right-open-3"></i></li>'+
					'<li data-clicked="0" data-cod="'+this.dataset.cod+'" data-opt="1" class="icon-share-2">Publicar</li>'+
					'<li data-clicked="0" data-cod="'+this.dataset.cod+'" data-opt="4" class="icon-doc-new">Crear nueva lista</li>'+
					(this.dataset.scod?'<li data-clicked="0" data-cod="'+this.dataset.cod+'" data-opt="2" class="icon-trash-6">Quitar de la lista</li>':'')+
					'<li data-clicked="0" data-cod="'+this.dataset.cod+'" data-opt="3" class="icon-link-3">Obtener url</li>'+
				'</ul>'
			se('body').appendChild(boxContextMenu)
			var posi=varStrik.positioMenuContext(boxContextMenu);
			if(posi===0){
				boxContextMenu.style.left=(ev.screenX-boxContextMenu.offsetWidth-50)+'px';
				boxContextMenu.style.top=(ev.pageY-boxContextMenu.offsetHeight)+'px';
			}else if(posi===1)
				boxContextMenu.style.top=(ev.pageY-boxContextMenu.offsetHeight)+'px';
			else if(posi===2)
				boxContextMenu.style.left=(ev.screenX-boxContextMenu.offsetWidth-20)+'px';
			si('#contextmenu>ul>li', function(elem){
				elem.addEventListener('click', function(){
					switch(elem.dataset.opt){
						case '0'://agregar a lista
						if(elem.dataset.clicked==='0')
							elem.dataset.clicked=1;
						else
							elem.dataset.clicked=0;
						varStrik.rightClick.addToListaplayer(elem);
						break;
						case '1'://publicar
						varStrik.rightClick.shareMusic(elem);
						se('#contextmenu').remove();
						break;
						case '4'://nueva lista
						varStrik.rightClick.newlistPlayer(elem)
						se('#contextmenu').remove();
						break;
						case '2':
						varStrik.rightClick.removeSg(elem);
						se('#contextmenu').remove();
						break;
						case '3'://obteger url
						varStrik.rightClick.getURL(elem);
						se('#contextmenu').remove();
						break;
					}
				},false)
			})
			se('html').addEventListener('click',(ev)=>{
				if(!ev.target.className.match(/icon-list-add/))
					if(se('#contextmenu'))
						se('#contextmenu').remove();
			});
		}
	}, postionCursoTextCOment:(ev)=>{
		let key=ev.which
		let tecla=String.fromCharCode(key).toLowerCase();
		if(varStrik.vari.banderaNick)
			if(key===8){
				varStrik.vari.Srachnick=varStrik.vari.Srachnick.substr(0,varStrik.vari.Srachnick.length-1)
				if(varStrik.vari.Srachnick===''){
					varStrik.cancelSearchNick();
				}
			}
	}, showResultUsers:function(data){
		let datos=this;
		varStrik.vari.positioCursoNick=this.posi
		if(se('.showNickuserInfo'))
			se('.showNickuserInfo').innerHTML=''
		if(!data.err){
			if(data.users.length){
				data.users.forEach((val, key)=>{
					$('.showNickuserInfo').append(html.dmSearchUser(val))
					if(key+1===data.users.length){
						if(se('.showNickuserInfo>#resultUserSreah a'))
							si('.showNickuserInfo>#resultUserSreah a', elem=>{
								elem.addEventListener('click',varStrik.addNickToTextField,false)
							})
					}
				})
			}
		}
	},addNickToTextField:function(ev){
		ev.preventDefault()
		let textHisto=varStrik.vari.textBosSrachNick[0], regex=new RegExp('\\b'+varStrik.vari.Srachnick.substr(1)+'\\b','g');
		textHisto.value=textHisto.value.replace(regex,this.dataset.nick+' ')
		varStrik.cancelSearchNick();
		varStrik.vari.textBosSrachNick[0].focus()
	},mainSearchNick:(tag)=>{
		$(tag).unbind().searchNick('@')
		se(tag).addEventListener('keyup',varStrik.postionCursoTextCOment,false)
	},searchSongArray:function(dato, srch){
		var resprs=false
		for(var i=0; i<dato.length;i++){
			if(dato[i].cod===srch)
				resprs=true
		}
		return resprs
	},cancelSearchNick:()=>{
		varStrik.vari.banderaNick=false;
		varStrik.vari.Srachnick='';
		if(se('.showNickuserInfo'))
			se('.showNickuserInfo').remove()
	}, urlMedia:'https://fotogena.co',
	showTransitions:data=>{
		$('body').append(html.waitLoadSrc())
		setTimeout(()=>{
			se('ss-div.transition').dataset.fade='in'
			if(data){
				if(data.oldElem)
					data.oldElem.classList.add('ss-blur-element')
			}
		},100)
	}, hideTransitions:data=>{
		if(data){
			if(data.newElem){
				if(data.newElem)
					data.newElem.classList.remove('ss-blur-element')
				si('.ss-blur-element', elem=>{
					elem.remove()
				})
			}
		}
		if(se('ss-div.transition')){
			se('ss-div.transition').dataset.fade='out'
			setTimeout(()=>{
				se('ss-div.transition').remove()
			},500)
		}
	}, newReply:function(evt){
		evt.preventDefault()
		if(!se('#andrea .ss-button-unava')){
			let reply=this.querySelector('textarea'),
				textReply=reply.value
			reply.value='';
			if(se('#andrea .county'))
				se('#andrea .county').textContent=varStrik.limitHistoryText
			if(noSpace(textReply))
				notifi.emit('responceNew', {opt: 1,cod: reply.dataset.message, message: textReply, tipe: 2}, resb=>{
					respDom(resb)
				})
			else
				errorMsg("Tú respuesta no puede estar vacia", 1, 2000)
		}else
			alertPop({time: 3000,msg:'Has pasado el limite de caracteres, disminuye palabras por favor :)',err:false})
	}, countText:function(){
		let countText=this.value.length,
			total=varStrik.limitHistoryText-countText,
			spanCount=se('#andrea .county')
		if(total>-1){
			spanCount.textContent=total
			spanCount.dataset.count=total
			se('#andrea button').classList.add('ss-button-success')
			se('#andrea button').classList.remove('ss-button-unava')
		}else{
			se('#andrea button').classList.remove('ss-button-success')
			se('#andrea button').classList.add('ss-button-unava')
			spanCount.textContent=''
		}
	}, router:{
		domDesign: function(ev){
			tmplates.appendScript({class:'designJs', src:`/public/${SERVER?'js':'Js'}/ss-design.js`, opt:'js'})
			tmplates.appendScript({class:'designCss', src:`/public/${SERVER?'css':'styles'}/ss-design.css`, opt:'css'})
			function loadSrc(){
				if(typeof(design)==='undefined')
					setTimeout(loadSrc,100)
				else
					design.logic.loadDom();
			}
			loadSrc();
		},
		domVisit:function(ev){
			function loadSrc(){
				if(typeof(visit)==='undefined')
					setTimeout(loadSrc,100)
				else
					visit.logic.loadDom(userNick.dataset.nick).then(resa=>{
						userNick.dataset.selected=0;
					}).catch(console.log);
			}
			ev.preventDefault();
			
			let userNick=this;
			if(!userNick.dataset.selected||userNick.dataset.selected==='0'){
				userNick.dataset.selected=1
				tmplates.appendScript({class:'visitJs', src:`/public/${SERVER?'js':'Js'}/ss-visit.js`, opt:'js'})
				loadSrc();
			}else
				console.log(userNick.dataset)
		},
		domHome:ev=>{
			ev.preventDefault()
			tmplates.appendScript({class:'homejs', src:`/public/${SERVER?'js':'Js'}/ss-home.js`, opt:'js'})
			function loadSrc(){
				if(typeof(home)==='undefined')
					setTimeout(loadSrc, 100)
				else
					home.logic.loadDom();
			}
			loadSrc();
		}
	}, limitHistoryText:280
};

setTimeout(()=>{
	varStrik.clearLogs()
}, 1000)
var visorObj={
	events:()=>{
		si('.visorImg .newComment textarea, textarea.textarea', elem=>{
			elem.addEventListener('focus',visorObj.logic.removeKeyWindow,false)
		})
		si('.visorImg .newComment textarea, textarea.textarea', elem=>{
			elem.addEventListener('blur',visorObj.logic.addKeyWindow,false)
		})
		window.addEventListener('keyup',visorObj.logic.changeImageKey,false)
	},logic:{
		removeKeyWindow:()=>{
			window.removeEventListener('keyup', visorObj.logic.changeImageKey, false);
		},addKeyWindow:()=>{
			window.addEventListener('keyup', visorObj.logic.changeImageKey, false);
		},changeImageKey:function(e){
			if(e.which===39)//va a la derecha
				$('.visorImg>.-visor-img .imgEnd>.r-right').trigger('click')
			else if(e.which===37)
				$('.visorImg>.-visor-img .imgEnd>.r-left').trigger('click')
		}
	}
}
function selectImageSendChat(c, b) {
	var a = new FileReader();
	a.onload = function(f) {
		var e = a.result;
		b(e)
	};
	a.readAsDataURL(c)
}
function timeDate(){
	var fecha=new Date();
	return [fecha.toLocaleTimeString(), fecha.toLocaleDateString(), String(fecha.toISOString()), fecha];
}
(function($){
	$.fn.searchNick=function(cadena){
		varStrik.vari.Srachnick=''
		varStrik.vari.banderaNick=false
		let  container=$(this).parent();
		varStrik.vari.textBosSrachNick=$(this)
		$(this).on({
			keypress:function(e){
				var key=e.which, positionCuros=0,
					keye=e.keyCode,
					tecla=String.fromCharCode(key).toLowerCase(),
					letras=cadena;
				if(tecla==letras){
					varStrik.vari.banderaNick=true
					positionCuros=0;
					// positionCuros=varStrik.vari.textBosSrachNick.prop("selectionStart");
					if(!se('.showNickuserInfo'))
						container.append('<div class="showNickuserInfo"></div>')
				}
				if(varStrik.vari.banderaNick)
					varStrik.vari.Srachnick+=tecla;
				if(key===32)
					varStrik.cancelSearchNick();
				if(varStrik.vari.Srachnick.length>3){
					clearTimeout(varStrik.vari.searchNickText)
					varStrik.vari.searchNickText=setTimeout(()=>{
						chatHist.emit('searching', {val:varStrik.vari.Srachnick.substr(1)}, varStrik.showResultUsers.bind({posi:positionCuros}))
					},500)
				}
			}
		});
	};
	$.fn.faber = function(cadena) {
		$(this).on({
			keypress : function(e){
				var key = e.which,
					keye = e.keyCode,
					tecla = String.fromCharCode(key).toLowerCase(),
					letras = cadena;
				if(letras.indexOf(tecla)==-1 && keye!=9&& (key==37 || keye!=37)&& (keye!=39 || key==39) && keye!=8 && (keye!=46 || key==46) || key==161){
					e.preventDefault();
				}
			}
		});
	};
})( jQuery );
function aleatorio(inferior,superior){
	var numPosibilidades = superior - inferior
	var aleat = Math.random() * numPosibilidades
	aleat = Math.round(aleat)
	return parseInt(inferior) + aleat
}
function showVI() {
	console.log(this.dataset)
	let withsd=($(document).width()<700?($(document).width()*98)/100:($(document).width()*75)/100)
	visorPhoto(this.dataset.seru, withsd, this.dataset.alto, this.dataset.ancho, this.dataset.book, $(this), this.dataset.media)
}
function visorPhoto(utilisateur,ancho, altico, anchito, b, recurso, Media){
	let docElm = document.documentElement;
	$('body').append('<article class="ss-dummi ng-scope" style="z-index: 6;"></article>')
	$('body').append('<section class="visorImg"></section>')
	se('.visorImg').innerHTML=html.domVisotImg

	let $inputor=$('.visorImg .newComment textarea')
	.atwho(varStrik.settingTagging)
	.atwho(varStrik.settingEmojis)
	$inputor.caret('pos', 47)
	$inputor.focus().atwho('run')

	varStrik.vari.uri=window.location.href;
	se('body').style.overflow='hidden'
	function enterFullScreen(){
		if(docElm.requestFullscreen) {
			docElm.requestFullscreen();
		}else if(docElm.mozRequestFullScreen) {
			docElm.mozRequestFullScreen();
		}else if(docElm.webkitRequestFullScreen) {
			docElm.webkitRequestFullScreen();
		}else if(docElm.msRequestFullscreen) {
			docElm.msRequestFullscreen();
		}
	}
	if(boot.logic.responsive({width: true}))
		enterFullScreen()
	function exitFullscreen() {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	}
	si('.visorImg>.-visor-img, .visorImg>i', elem=>{
		elem.addEventListener('click',function(ev){
			if(ev.target.className.match(/(cancelButton|-visor-img|sdgr)/)){
				if(boot.logic.responsive({width: true}))
					exitFullscreen()
				window.removeEventListener('keyup', visorObj.logic.changeImageKey, false);
				try{
					var datasd=JSON.parse(se('.visorImg').dataset.infos)
				}catch(err){
					console.log(err)
				}
				tmplates.data.dass=datasd;
				let pageStatus=se('.visorImg').dataset.page
				history.pushState(datasd,'',pageStatus==='visit'?'/'+datasd.nick:(pageStatus==='home'?'/':varStrik.vari.uri));
				se('body').style.overflow='auto'
				si('.visorImg, .ss-dummi',elem=>{
					elem.remove();
				})
			}
		},false)
	})
	console.log(b, Media)
	chatHist.emit('Visor', {Book:b, Entertain:Media, lmt1:0, lmt2:20},img=>{
		if(img){
			putImgAndComent({nombre:img.img.nombre, width:anchito, heigth:altico, cod:Media.substr(4), Lcod:b.substr(2)});
			varStrik.vari.imgs=img.imgs;
			varStrik.vari.visorKey=img.key;
			si('.visorImg>.-visor-img .optFile>span',elem=>{
				elem.dataset.file='Pic_'+img.img.cod
			})
			se('.visorImg .newComment form').addEventListener('submit',NewResponce,false)
			si('.visorImg>.-visor-img .imgEnd>span',elem=>{
				elem.addEventListener('click',rowStep,false)
			})
				visorObj.events();
		}else{
			se('body').style.overflow='auto'
			si('.visorImg, .ss-dummi',elem=>{
				elem.remove();
			})
		}
	})
}
function rowStep(){
	var elem=this;
	if(elem.dataset.dir==='left'){
		if(varStrik.vari.visorKey+1!==varStrik.vari.imgs.length){
			varStrik.vari.visorKey+=1
			putImgAndComent(varStrik.vari.imgs[varStrik.vari.visorKey])
		}else{
			var img=varStrik.vari.imgs[varStrik.vari.visorKey]
			chatHist.emit('loadImgRow', {cod: img.cod, book: img.Lcod,dir:false}, res=>{
				if(res.length){
					varStrik.vari.visorKey+=1
					varStrik.vari.imgs=varStrik.vari.imgs.concat(res.reverse());
					putImgAndComent(varStrik.vari.imgs[varStrik.vari.visorKey])
				}
			})
		}
	}else{
		if(varStrik.vari.visorKey>0){
			varStrik.vari.visorKey-=1
			putImgAndComent(varStrik.vari.imgs[varStrik.vari.visorKey])
		}else{
			var img=varStrik.vari.imgs[varStrik.vari.visorKey]
			chatHist.emit('loadImgRow', {cod: img.cod, book: img.Lcod,dir:true}, res=>{
				if(res.length){
					varStrik.vari.visorKey=res.length-1
					varStrik.vari.imgs=res.reverse().concat(varStrik.vari.imgs);
					putImgAndComent(varStrik.vari.imgs[varStrik.vari.visorKey])
				}
			})
		}

	}
}
function NewResponce(e){
	e.preventDefault();
	var forms=se('.visorImg .newComment form'),tagText=se('.visorImg .newComment textarea'), msn=tagText.value;
	if(noSpace(msn)&&msn!==''){
		if(tagText.dataset){
			notifi.emit('replyPlayer', {data:forms.dataset, message:msn}, res=>{
				if(forms.dataset.opt==='1')
					se('.visorImg .-comnet-reply').dataset.histo=res.node
				respDom(res)
			});
		}
		this.reset();
	}else{
		errorMsg('Tú historia no puede estar vacia!!', 1, 3000);
	}
}
function loadDomVisor(datos, cb){
	se('.visorImg .-comnet-reply').innerHTML=''
	if(localStorage.nick)
		chatHist.emit('LoadHistVisor', datos, a=>{
			if(a.infoHisto){
				se('.visorImg .newComment form').dataset.cod=a.infoHisto.Hcod
				se('.visorImg .newComment form').dataset.opt=0
				splitStringMsg(a.infoHisto.historia, emoticonsDecode,{codec:true}).then(text=>{
					se('.visorImg .-comment-head').innerHTML=`<div style="background-image:url(${a.infoHisto.dir});" class="img"></div> ${text||''}`
				})
				se('.visorImg .-comnet-reply').dataset.histo='fases'+a.infoHisto.Hcod
				if(a.parte2)
					respDom(a.parte2)
			}else{
				se('.visorImg .newComment form').dataset.cod='Pic_'+a.infoFile.file_info;
				se('.visorImg .newComment form').dataset.opt=1;
				// var srcImg=''
				se('.visorImg .-comment-head').innerHTML=`<div style="background-image:url(${a.infoFile.dir});" class="img"></div>`
			}
			se('.visorImg>.-visor-img .optFile>span[data-opt="0"]').innerHTML='Me gusta '+a.FileCant
			se('.visorImg>.-visor-img .optFile>span[data-opt="1"]').innerHTML='No me gusta '+a.FileNCant
			si('.visorImg>.-visor-img .optFile>span', elem=>{
				elem.addEventListener('click',gngVisor,false)
			})
		});
	else
		cb(false);
}
function putImgAndComent(img){
	se('.sdgr>.imgEnd').dataset.img=JSON.stringify(img)
	if(!se('.visorImg').dataset.page&&tmplates.data.dass){
		varStrik.vari.page=true
		se('.visorImg').dataset.page=tmplates.data.dass.page
		se('.visorImg').dataset.infos=JSON.stringify(tmplates.data.dass)
	}
	function siseImgVisor(){
		if(se('.sdgr>.imgEnd')){
			let tmpImg=JSON.parse(se('.sdgr>.imgEnd').dataset.img)
			let alty=(se('.ss-dummi').offsetHeight*98/100)
				,elemh=se('.ss-dummi').offsetHeight
			alty=((alty)>700?(elemh-80):alty)
			let size2=size(tmpImg.heigth, tmpImg.width, se('.visorImg>.-visor-img').offsetWidth, alty);
			se('.visorImg>.-visor-img .imgEnd').style.backgroundImage=`url(${tmpImg.nombre})`;
			se('.visorImg>.-visor-img .imgEnd').style.width=size2[0]+'px';
			se('.visorImg>.-visor-img .imgEnd').style.height=(size2[1]-5)+'px';
		}
	}
	if(!varStrik.data.resizing){
		varStrik.data.resizing=true
		window.addEventListener('resize',()=>{
			clearTimeout(varStrik.data.resizeVisorImg)
			varStrik.data.resizeVisorImg=setTimeout(siseImgVisor,500)
		},false)
	}
	siseImgVisor()
	if(tmplates.data.dass){
		tmplates.data.dass.page='visor'
		tmplates.data.dass.content=se('.visorImg').innerHTML
		history.pushState(tmplates.data.dass,'imágen', `/media/Pic_${img.cod}ML${img.Lcod}`);
	}
	loadDomVisor({file_info: 'Pic_'+img.cod}, function(a){
		visorObj.events();
	});
	// tmpImg={}
}
function imgDimention(img, cb){
	var image = new Image();
	image.src = img;
	image.onload = function() {
		cb(this);
	};
	image.onerror=function(){
		cb(false)
	}
}
function loadImage(file, cb){
    selectImageSendChat(file,function(fileURL){
		imgData.imgDataUrl=fileURL;
		imgData.name=file.name;
		imgData.type=file.type;
		imgData.size=file.size;
		imgDimention(fileURL, function(img){
		    cb(img)
		});
	});
}
function secontTime(time){
	var hour=parseInt(time/3600)
	var minute=parseInt(time/60)
	var second=time%60;
	if(minute<10)
		minute='0'+minute;
	if(second<10)
		second='0'+second;
	if(hour===0)
		if(minute<100){
			return minute+':'+second;
		}
	else
		if(hour<10)
			return '0'+hour+':'+minute+':'+second;
		else
			return hour+':'+minute+':'+second;
}
function imgUrlShow(ev){
	ev.preventDefault();
	visorPhoto(this.dataset.uss,($(document).width()*76)/100, this.dataset.otla, this.dataset.ohcna, this.dataset.boob, $(this), this.dataset.codito);
}
function noSpace(cadena){
	if(cadena.trim().length===0)
		return false
	else
		return true
}
function size(Jalto, Jancho, ancho, alto2){
	var altura2, al, a, anc, ac, Asize;
	if(Jalto>alto2){//si la altura es mas que
		altura2=((alto2*96)/100);
		al=Jalto-altura2;
		a=al*100/Jalto;
		anc=Jancho*(100-a)/100;
		if(anc>(ancho*95/100)){//ajusta el ancho al porcentaje del alto.html('No Me Gusta '+a.cant);
			anc=(ancho*95)/100;
			ac=Jancho-anc;
			a=ac*100/Jancho;
			altura2=Jalto*(100-a)/100;
		}
	}else if(Jancho>ancho){//si al ancho es mayor al requerido
		anc=(ancho*95)/100;
		ac=Jancho-anc;
		a=ac*100/Jancho;
		altura2=Jalto*(100-a)/100;
	}else if(Jalto*110/100<alto2){
		altura2=alto2*87/100;
		al=altura2-Jalto;
		a=al*100/Jalto;
		altura2=Jalto*(100+a)/100;
		anc=Jancho*(100+a)/100;
		if(anc>ancho*87/100){// si el nuevo tamaño cave en el horizontal
			anc=ancho*87/100;
			ac=anc-Jancho;
			a=ac*100/Jancho;
			altura2=Jalto*(100+a)/100;
		}
	}else if((Jalto<alto2 || Jalto*81/100<alto2)|| (Jancho < (ancho*80/100) || Jancho*81/100 < (ancho*80/100))){//si es menor que tenga su altura normal
		anc=Jancho;
		altura2=Jalto;
	}else if(Jancho*110/100<ancho){
		anc=Jancho;
		altura2=Jalto;
	}
	return Asize=[anc, altura2, ancho, alto2];//el primer y segundo campo son width, height
}

function ajaxSocket(socket, data){
	return new Promise((go, err)=>{
		var numStream2=0;
		if(data.end===undefined){
			var lengrhString=data.file.length;
			data.end=parseInt(lengrhString/7000);
		}
		cicloDeEvio();
		function cicloDeEvio(){
			if(!varStrik.data.breakAjaxSocket){
				var porcent=parseInt((numStream2*100)/data.end);
				data.prgFn(porcent);//function that show the porcentage of upload
				var FileSplit=varStrik.splitWords(data.file, 7000);
				data.file=FileSplit[1];
				if(numStream2===0){
					var ctr=FileSplit[0].indexOf('base64');
					FileSplit[0]=FileSplit[0].substr(ctr+7);
				}
				if(numStream2<=data.end){
					chatHist.emit(socket, {fileName: data.fileName, nm:numStream2 ,nick: localStorage.nick,user: localStorage.user, stream: FileSplit[0], lmt: data.end}, resp=>{
						if(resp.err)
							boot.logic.popUpAlert({err:true, msg: 'Algo salio mal 😞, intentalo mas tarde'})
						else if(!resp.finish){
							numStream2++;
							// setTimeout(cicloDeEvio, 500)
							cicloDeEvio();
						}else if(resp.finish){
							numStream2=0;
							go(resp)
						}else{
							boot.logic.popUpAlert({err:true, msg: 'Algo salio mal 😣, intentalo mas tarde'})
						}
					})
				}
			}else{
				varStrik.data.breakAjaxSocket=false
				go({err:true, msg: 'sending canceled', type: 'canceled'})
			}
		}
	});
}
function intervalo(tag){
	var oTitulo=se(tag);
	if(oTitulo!==null){
		if(num>-1){
			oTitulo.innerHTML=num
			num-=1;
			window.setTimeout("intervalo('"+tag+"');", 1000);
		}else
			num=0;
	}
}
function encriptado(){
	var a=Math.floor((Math.random()*10)+1), str;
	switch(a){
		case 1:
		str='sed47s__iIIMssmkd58d';
		break;
		case 2:
		str='loo9sd987515_5888-78';
		break;
		case 3:
		str='gvbsdrt6g46ser';
		break;
		case 4:
		str='eo_sdr_degr_887498_sljkb';
		break;
		case 5:
		str='osand_k_21ddi_54892_dsbs';
		break;
		case 6:
		str='4816xdfbs6d7fb67d6bd';
		break;
		case 7:
		str='546840sdgr6k6etyk068';
		break;
		case 8:
		str='6846reg4d6rth4d6h_@';
		break;
		case 9:
		str='2394646dtgre';
		break;
		case 10:
		str='3587484ds6a46toy';
		break;
	}
	return str;
}
function browsers(){
	var navedador=navigator.userAgent;
	if(navedador.indexOf('Chrome')>-1)
		return 'Google Chrome';
	else if(navedador.indexOf('Firefox')>-1)
		return 'Firefox';
	else
		return 'Tú explorador'
}
function alertPop(dato, cb){
	if(se('body>article#alertPop')!==null)
		$('body>article#alertPop').remove();
	var body=se('body'), article=document.createElement('article');
	article.innerHTML=dato.msg;
	body.appendChild(article);
	article.id='alertPop';
	if(dato.err)
		article.classList.add('icon-warning');
	else
		article.classList.add('icon-ok-circled');
	if(dato.opt===0){//si necesita aceptar o cancelar
		article.innerHTML=article.innerHTML+'<div><span data-res="1" class="icon-thumbs-up-4">Aceptar</span><span data-res="0" class="icon-thumbs-down-3">Cancelar</span></div>'
		si('article#alertPop span[data-res]', function(elem){
			elem.addEventListener('click', function(){
				if(cb) cb(this.dataset.res==='1'?true:false)
				closeThisWind()
			},false)
		})
	}else{
		setTimeout(function(){
			closeThisWind()
		},50)
	}
	function closeThisWind(){
		if(varStrik.alertPop)
			clearTimeout(varStrik.alertPop);
		varStrik.alertPop=setTimeout(function(){
			$('body>article#alertPop').fadeOut(500, function(){
				$('body>article#alertPop').remove();
			});
		},dato.time||300);
	}
}
function errorMsg2(mensaje, type, cb){
	if(se('body > article#ntfs')!==null)
		$('body > article#ntfs').remove();
	var body=se('body'), article=document.createElement('article');
	body.appendChild(article);
	article.id='ntfs';
	article.innerHTML=mensaje+'<br><span data-opt="true">Aceptar</span><span data-opt="false">Cancelar</span>';
	if(type===1){
		article.classList.add("errores");
	}else if(type===2){
		article.classList.add("notification");
	}
	si('body > article#ntfs>span', function(elem){
		elem.addEventListener('click', function(){
			var opt=this.dataset.opt;
			if(opt==='true')
				cb(true)
			else
				cb(false)
			$('body > article#ntfs').remove();
		},false)
	})
}
function chBgChat(){
	se('.chat article[data-chopt="true"]>.ss-close-icon').addEventListener('click',()=>{
		$('article>article[data-chopt]').remove();
		$('.chat>article>article.contenOptions').css({'display': 'block'})
	},false)
	si('span[data-chat]', function(elem){
		elem.addEventListener('mouseenter', function(){
			se('link#cssChat').href = '/public/'+(SERVER?'css':'styles')+'/'+this.dataset.chat+'.css';
		}, false);
		elem.addEventListener('click', function(){
			chatHist.emit('design', {opt: 2, me:localStorage, val: this.dataset.chat}, function(a){
				if(a)
					boot.logic.popUpAlert({msg: 'El color del chat se ha cambiado correctamente 😏', time: 3000})
				$('article>article[data-chopt]').remove();
				$('.chat>article>article.contenOptions').css({'display': 'block'})
			});
		}, false);
	});
}
function errorMsg(mensaje, type, time){
	if(se('body > article#ntfs')!==null)
		$('body > article#ntfs').remove();
	var body=se('body'), article=document.createElement('article');
	body.appendChild(article);
	article.id='ntfs';
	article.innerHTML=mensaje;
	if(type===1){
		article.classList.add("errores");
	}else if(type===2){
		article.classList.add("notification");
	}
	setTimeout(function(){
		$('body > article#ntfs').fadeOut(500, function(){
			$('body > article#ntfs').remove();
		});
	}, time);
}
function waitLoad(mensaje){
	var body=se('body'), span=document.createElement('span');
	body.appendChild(span);
	var article2=se('body > span');
	article2.innerHTML=mensaje;
	span.classList.add("waitLoad");
}
function Multimedia(){
	if($('.subody_2').css('display')!=='none'){
		se('.allMedia').innerHTML='Multimedia ▼';
		var nomdeia='<section id="error"><p>Lo sentimos pero no tienes ningun video</p></section>';
		var content='<section>'+
						'<span data-ytpe="video">Vídeos</span><span data-ytpe="music">Música</span><span data-ytpe="listPlayer">Listas</span><span data-ytpe="all">Todo!!</span></section>'+
					'<article>'+
					'</article>';
		$('.subody_2').fadeOut(500);
		$('.subody').append('<section id="Media"></section>');
		se('#Media').innerHTML=content;
		chatHist.emit('allMedia',{me:se('#design').dataset.tag, media:'video'},function(a){
			addVideo(a.htm);
		});
		si('#Media > section:nth-child(1) > span[data-ytpe]', function(elem) {
			elem.addEventListener('click', music, false);
		});
	}else{
		$('.subody_2').fadeIn(500);
		se('.allMedia').innerHTML='Multimedia ►';
		numMedia=0;
		$('#Media').remove();
	}
}
var numMedia=0;
function music(){
	chatHist.emit('allMedia',{me:se('#design').dataset.tag, media: this.dataset.ytpe, lmt: numMedia},function(a){
		switch(a.type){
			case 1:
			numMedia=0;
			addVideo(a.htm, function(b){});
			break;
			case 2:
			addSongs(a.htm, function(b){});
			break;
			case 3:
			addListP(a);
			break;
		}
	});
}
function addListP(a){
	numMedia=0;
	si('#Media > section:nth-child(1) > span', function(elem) {
		elem.dataset.chg='';
	});
	se('#Media > section:nth-child(1) > span[data-ytpe="listPlayer"]').dataset.chg=true;
	if(se('#Media>article>article#lp')===null){
		se('#Media>article').innerHTML='<article id="lp"></article>';
	}
	se('#Media>article>article#lp').innerHTML='';
	a.dts.forEach(function(val, key){
		$('#Media>article>article#lp').append('<div data-name="4562'+val.cod+'">'+val.name+'<span>'+val.cantidad+' Canciones</span></div>');
	});
	si('article#lp>div', function(elem) {
		elem.addEventListener('click', showSongLp, false);
	});
}
function showSongLp(){
	numMedia=0;
	var datasets=this.dataset;
	chatHist.emit('songs',{lp: datasets.name, opt:0, lmt: 0},function(a){
		si('article#lp>div[data-name]', function(elem) {
			elem.style.display='none';
		});
		if(se('article#lp>article[data-type="title"]>div')===null){
			$('article#lp').append('<article data-type="title"><div>Nombre</div>'+
						'<div>Artista</div>'+
						'<div>Genero</div>'+
						'<div>Duración</div>'+
						'<div>Opc</div></article>')
		}
		a.sg.forEach(function(val){
				var domsg='<article data-type="sg" data-lp="'+datasets.name.substr(4)+'" data-sg="3452'+val.cod+'"><div>';
				if(val.typeMedia===1)
					domsg+='♫ ';
				else
					domsg+='► ';
				domsg+=val.name+'</div>'+
					'<div>'+val.Artist+'</div>'+
					'<div>'+val.genre+'</div>'+
					'<div>'+secontTime(val.duration)+'</div>'+
					'<div title="opciones">▼</div></article>';
			$('article#lp').append(domsg);
		});
		si('article#lp>article[data-type="sg"]', function(elem){
			elem.addEventListener('contextmenu', addListPlayer, false);
		});
		si('article#lp>article[data-type="sg"]', function(elem){
			elem.addEventListener('click', showMsc,false);
		});
	});
}
function addSongs(all, cb){
	numMedia+=40;
	si('#Media > section:nth-child(1) > span', function(elem) {
		elem.dataset.chg='';
	});
	se('#Media > section:nth-child(1) > span[data-ytpe="music"]').dataset.chg=true;
	if(all.length>0){
		if(se('#Media>article>table#music')===null){
			se('#Media>article').innerHTML='<table id="music">'+
						'<tbody>'+
							'<tr class="headerT">'+
								'<td>Titúlo</td>'+
								'<td>Artista</td>'+
								'<td>Genero</td>'+
								'<td>Duración</td>'+
							'</tr>'+
						'</tbody>'+
					'</table>';
		}
		all.forEach(function(val){
			$('#Media>article>table > tbody').append('<tr data-sg="'+val[3]+'" data-lp="'+val[6]+'" data-nick="'+val[4]+'">'+
										'<td>'+val[0]+'</td>'+
										'<td>'+val[5]+'</td>'+
										'<td>'+val[1]+'</td>'+
										'<td>'+val[2]+'</td>'+
									'</tr>');
		});
		si('#Media > article > table>tbody>tr', function(elem) {//para agregar musica a lista de repro
			elem.addEventListener('contextmenu', addListPlayer, false);
		});
		si('#Media > article > table>tbody>tr', function(elem){//para escuchar la musica
			elem.addEventListener('click',showMsc, false);
		});
		if(all.length<20){
			numMedia=0;
			$('span.moreM').remove();
		}else{
			if(se('span.moreM')===null)
				$('#Media>article').append('<span class="moreM" data-ytpe="music">Mas música ▼</span>');
			se('span.moreM').addEventListener('click', music, false);
		}
	}else
		se('#Media>article').innerHTML='<section id="error"><p>Lo sentimos pero no tienes ningun Audio</p></section>';
}
function addListPlayer(e){//agregar cancion a la lista de reproduccion
	e.preventDefault();
	var datasets=this.dataset;
	$('ul#menuListPlayer').remove();
	var ul=document.createElement('ul');
	var option=[{desc: 'Agregar ►', opt:'lists'},{desc: 'Quitar de la lista', opt:'delete'}];
	ul.id='menuListPlayer';
	ul.style.top=(e.pageY-10)+'px';
	ul.style.left=(e.pageX+10)+'px';
	se('body').insertBefore(ul, se('body').childNodes[0]);
	option.forEach(function(val){
		var li=document.createElement('li');
		li.textContent=val.desc;
		li.dataset.opt=val.opt;
		ul.insertBefore(li, ul.childNodes[0]);
	});
	se('ul#menuListPlayer>li[data-opt="lists"]').addEventListener('mouseleave', function(){
		$('ul#menuListPlayer>li>ul').remove();
	});
	se('ul#menuListPlayer>li[data-opt="delete"]').addEventListener('click', function(){
		chatHist.emit('allListplayer', {uss: localStorage.user, opt:2, sg: datasets.sg, lp: datasets.lp}, function(a){
			if(a){
				errorMsg('Se ha removido la canción de la lista', 2, 1000);
				$('#Media > article:nth-child(2) > table>tbody>tr[data-sg="'+datasets.sg+'"]').remove();
			}else
				errorMsg('Lo sentimos, esta lista de reproducción no es tuya!!', 1, 2000);
		});
	},false);
	se('ul#menuListPlayer>li[data-opt="lists"]').addEventListener('mouseenter', function(){
		$('ul#menuListPlayer>li>ul').remove();
		var lienter=this, ul2=document.createElement('ul');
		lienter.insertBefore(ul2, lienter.childNodes[0]);
		chatHist.emit('allListplayer', {uss: localStorage.user, opt:0}, function(a){
			if(a===1){
				var li=document.createElement('li');
				li.textContent='tienes que estar registrado!!';
				ul2.insertBefore(li, ul2.childNodes[0]);
			}else{
				a.push({name: 'Crear lista', cod: 'create'});
				a.reverse().forEach(function(val){
					var li=document.createElement('li');
					li.dataset.lpCod=val.cod
					li.dataset.sg=datasets.sg;
					li.textContent=val.name;
					ul2.insertBefore(li, ul2.childNodes[0]);
				});
				si('ul#menuListPlayer>li>ul>li', function(elem){//para escuchar la musica
					elem.addEventListener('click',addSongListplayer, false);
				});
			}
		});
	});
	se('html').addEventListener('click',function(){
		$('ul#menuListPlayer').remove();
	});
}
function addVideo(a, cb){
	si('#Media > section:nth-child(1) > span', function(elem) {
		elem.dataset.chg='';
	});
	se('#Media > section:nth-child(1) > span[data-ytpe="video"]').dataset.chg=true;
	if(a.length>0){
		$('#Media>article > *').remove();
		a.forEach(function(val){
			$('#Media>article').append(val);
		});
		si('#Media > article:nth-child(2) > div[data-media="video"]>div', function(elem) {
			elem.addEventListener('click', loadVisorV, false);
		});
	}else
		se('#Media>article').innerHTML='<section id="error"><p>Lo sentimos pero no tienes ningun vídeo</p></section>';
}
function createList(e){
	e.preventDefault();
	var form=this;
	var datos=$(this).serialize();
	chatHist.emit('createList',{sg: this.dataset.sg, name: se('article.newList>form>input[type="text"]').value, user: localStorage.user},function(a){
		if(a===1)
			errorMsg('Tu lista de reproducción se ha creado correctamente y la canción se ha agregado a esa lista :D', 2, 6000);
		else if(a===2)
			errorMsg('La lista de reproducción ya existe!!', 1, 3000);
		else if(a===3)
			errorMsg('Que intentas hacer???', 1, 3000);
		form.reset();
		$('div.Viewer').fadeOut(500);
		setTimeout(function(){
			se('div.Viewer').innerHTML='';
		}, 500);
	});
}
function addSongListplayer(){
	var datasets=this.dataset
	if(datasets.lpCod==='create'){//crear uba nueva lsita de reproduccion
		if(se('div.Viewer')===null)
			errorMsg('Para crear una lista nueva tienes que estar en la ventana principal <a target="_blank" href="/../">dale click acá</a>', 2, 5000);
		else{
			var DOMNewList='<article class="newList">'+
							'<form data-sg="'+datasets.sg+'">'+
								'<h4>Nueva lista de reproducción</h4>'+
								'<input type="text" placeholder="Escribe el nombre de la lista" required/>'+
								'<input type="submit" value="Guardar"/>'+
							'</form>'+
						'</article>';
			$('div.Viewer').fadeIn(800);
			se('div.Viewer').innerHTML=DOMNewList;
			se('article.newList>form').addEventListener('submit', createList,false);
		}
	}else{
		chatHist.emit('allListplayer', {opt:1, uss:localStorage.user, lp: datasets.lpCod, sg: datasets.sg}, function(a){
			if(a===1)
				errorMsg('Para poder hacer esta acción tienes que estar registrado!', 2, 1000);
			else if(a)
				errorMsg('Se ha agregado correctamente', 2, 1000);
		});
	}
}
function loadVisorV(){
	visorVideo(this.dataset.us||'null', this.dataset.file||'vid_'+this.dataset.cod, 0);
}
function cerrar(){
	$('.before').animate({height:'1000px', width:'1000px', opacity:0},300, function(){
		$('.before').remove();
	});
}
function playPreviw(){
	if(se('.before > section > div[data-opt="fplayy"]')!==null){
		se('.before > section > div[data-opt="fplayy"]').dataset.opt='pause';
		listening({id:this.dataset.file, nick: this.dataset.nick});
	}
}
function before(){
	$('#PhotoPreview, #PhotoPreview2').click(function(){
		visorPhoto($(this).data('seru') ,($(document).width()*76)/100, $(this).data('altitis'), $(this).data('anchitis'), $(this).data('boob'), $(this), $(this).data('codito'));
	});
	if(se('.before > section > div[data-opt="fplayy"]'))
		se('.before > section > div[data-opt="fplayy"]').addEventListener('click', playPreviw, false);
	$('#abecera > span').on('click', function(clic){
		var dato={hist:$(this).attr('class'), us: localStorage.user, type: 1};
		notifi.emit('GNG', dato, function(a){
			if(a.type===1)
				$(clic.target).html('Me Gusta '+a.cant);
			else if(a.type===2)
				$(clic.target).html('No Me Gusta '+a.cant);
			else if(a.type===45){
				a.histo.forEach(function(val, key){
					$('.POST'+val).slideUp(500, function(){
						$(this).remove();
						$('.fases'+val+'rgab').remove();
					});
				});
			}
		});
	});
	if(se('.abc')!==null){
		$('.abc').searchSong('&');
		$('.abc').serchNick('@');
	}
	se('#responces_Form').addEventListener('submit', function(e){
		e.preventDefault();
		var tagText=se('.abc'), msn=tagText.value;
		tagText.value='';
		if(noSpace(msn))
			if(tagText.dataset.message===undefined)
				notifi.emit('responceNew', {cod:tagText.dataset.file, message:msn, opt:0}, function(a){
					animateNewReponse(a, tagText.dataset.file)
				});
			else
				notifi.emit('responceNew', {cod:tagText.dataset.message, message:msn, opt:1}, respDom);
	},false);
	function animateNewReponse(a, cod){
		respDom(a);
	}
}
function reproIntra(){
	if(this.dataset.opt==='fplayy'){
		this.dataset.opt='pause';
		soundNoti(this.dataset.src)
	}
	else{
		this.dataset.opt='fplayy';
		soundNoti('...sds')
	}
}
function appendJ(tag, content, node, cb){
	var tagi=document.createElement(tag);
	se(content).insertBefore(tagi,node);
	cb(tagi)
}
function gngVisor(clic){
	var parentContent='<h3>Compartir imágen</h3><form data-fileShare="'+this.dataset.file+'">'+
		'<textarea class="sharetext" placeholder="Escribe tú historia!!"></textarea>'+
		'<button type="submit" class="icon-share-2 ss-button-primary">Publicar</button>'+
		'<span class="icon-cancel ss-button-cancel">Cancelar</span>'+
	'</form>';
	var tag=this.dataset.opsti, file=this.dataset.file;
	this.dataset.opsti='';
	if(tag==='share'){
		var tagi=document.createElement('section');
		se('.visorImg>.-visor-img').insertBefore(tagi,se('.FinalImage'))
		tagi.id='shareDom'; tagi.innerHTML=parentContent;
		se('#shareDom>form').addEventListener('submit', sharePic,false);
		se('#shareDom .icon-cancel').addEventListener('click', ()=>{
			se('#shareDom').className='animated zoomOutUp'
			setTimeout(()=>{
				se('#shareDom').remove()
			},1000)
		},false);

	}else{
		notifi.emit('FileOpti', {opstion: tag, userPhoto: userGlobal, file: file, user: localStorage}, function(a){
			if(!a){
				acceder(false);
			}else{
				si('.visorImg .optFile>span[data-opt="0"]', elem=>{
					elem.textContent='Me gusta '+a.like
				})
				si('.visorImg .optFile>span[data-opt="1"]', elem=>{
					elem.textContent='No me gusta '+a.nolike
				})
				si('.visorImg .optFile>span', elem=>{
					elem.addEventListener('click', gngVisor,false)
				})
			}
		});
	}
}
function sharePic(e){
	e.preventDefault();
	var file=this.dataset.fileshare;
	se('#shareDom .icon-share-2').remove()
	$('#shareDom form').append('<span class="loadsIcon"><i class="animate-spin demo-iconed-load"></i>Publicando...</span>')
	chatHist.emit('difucion',{file: file, meet: localStorage} , a=>{
		showHistory({arreglo: a,file: file, user: localStorage.user, history: se('#shareDom .sharetext').value, NoSee:''})
		.then(res=>{
			se('#shareDom').className='animated zoomOutUp'
			setTimeout(()=>{
				se('#shareDom').remove()
			},1000)
		})
		.catch(err=>{console.log(err)});
	});
}
function notifyMe(data){
	var not;
	if (!("Notification" in window)) {
		console.log("This browser does not support desktop notification");
	}else if (Notification.permission!=='denied') {
		Notification.requestPermission((permission)=>{
			if(permission==="granted"){
				if(varStrik.vari.noty)
					varStrik.vari.noty.close()
				varStrik.vari.noty=new Notification("FOTÓGENA", data);
				varStrik.vari.noty.vibrate
				varStrik.vari.noty.onclick=function(){
					varStrik.vari.noty.close();
					window.focus();
				}
				clearTimeout(varStrik.vari.closeNoty)
				varStrik.vari.closeNoty=setTimeout(()=>{varStrik.vari.noty.close()}, 6000)
			}
		});
	}else
		console.log('Por favor dale en permitir a las notificaciones')
}
function initRemoveElement(myBox){
	if(myBox){
		myBox.classList.add('hideanim');
		myBox.addEventListener('animationend',removeElement);
		myBox.addEventListener('webkitAnimationEnd', removeElement);
		var nextElem=myBox.nextSibling;
		nextElem.classList.add('hideanim-next');
		nextElem.style.marginTop='-'+myBox.offsetHeight+'px';
	}
}
function removeElement(e){
	var elemHide=e.target,
		nextElem=e.target.nextSibling;
	nextElem.classList.remove('hideanim-next');
	nextElem.style.margin='4px auto';
	elemHide.remove();
}
function deleteRespues(b){
	if(!b.histo){
		$(`.fases${b.cod}>strong`).html(b.cant||'');
		$(`[data-resp="fases${b.cod}"]>strong`).html(b.cant||'');//timeline

		$('.contentResponse > article[data-info="' + b.Rcod + '"]').slideUp(500, function() {
			$(this).remove()
		});
		$(`.response > section[data-info="${b.Rcod}"], .preview-replies>[data-info="${b.Rcod}"]`).slideUp(500, function() {
			$(this).remove()
		})
	}else
		b.histo.forEach(function(e) {
			initRemoveElement(se('.POST'+e));
			$('.fases'+e+'rgab').remove()
		});
}
function respDom(b){//funcion que tiene todo lo de respuesta
	if(b.node){
		if(se(`#request>.${b.node}>strong`))
			se(`#request>.${b.node}>strong`).innerHTML=b.cant||'';
		if(se(`span[data-resp="${b.node}"]>strong`))
			se(`span[data-resp="${b.node}"]>strong`).innerHTML=b.cant||'';
		si('.previewFile[data-src]', elem=>{
			elem.addEventListener('click', reproIntra, false)
		});
		b.html.forEach(function(val){
			splitStringMsg(val.respta, emoticonsDecode,{codec:true}).then(text=>{
				val.respta=text
				//las notificaciones
				if(!se(`.popUpPreview .preview-replies[data-history="${b.node}"] section[data-info="5844${val.Rcod}"]`))
					$(`.popUpPreview .preview-replies[data-history="${b.node}"]`).append(html.respince(val))
				//en el timeline
				if(se(`.${b.node}rgab>.response`))
					if(!se(`.${b.node}rgab>.response section[data-info="5844${val.Rcod}"]`))
						$(`.${b.node}rgab>.response`).append(html.respince(val));
				//visor img
				if(!se(`.visorImg .-comnet-reply[data-histo="${b.node}"] section[data-info="5844${val.Rcod}"]`))
					$(`.visorImg .-comnet-reply[data-histo="${b.node}"]`).append(html.respince(val, true))
			})

		});
		$('.contentResponse').animate({scrollTop: ($('article[data-info]').height()*$('article[data-info]').length)}, 800);
		$('.responces').animate({scrollTop: ($('.responces').height())}, 800);
		$('section.contentResponse').animate({scrollTop: ($('section.contentResponse').height())}, 800);
		si('a#imgUrl', function(f) {
			f.addEventListener('click', imgUrlShow, false)
		});
		si('.previewFile[data-src]', function(f) {
			f.addEventListener('click', reproIntra, false)
		})
	}
}
function recargar(objeto){
	$(objeto+' div:first-child').load();
}

function ajax(link,file){
	$.ajax({
		url:link,
		type:'POST',
		data:file
	});
}

function visor(img){
	$('#visor_View').fadeIn(500);
}
function upload(){
	$('.Compl_comment > div:first-child').fadeIn(400);
	$('.Compl_comment > div:last-child').fadeIn(350,function(){
		$('.clean').keyup(function(){
			var caracteres=(($(this).val().length)*-1)+279;//contador de caracteres
			if(caracteres < 0){
				$('#NewHistory > input').fadeOut(500);
			}else{
				$('#NewHistory > input').fadeIn(500);
			}
			$(".Compl_comment > div:last-child").html(caracteres);
		});
	});
}
function show(a, etiqueta){
	var b=a%2;
	if(b===1){
		$(etiqueta).fadeIn(300);
	}else{
		$(etiqueta).fadeOut(300);
	}
}
function formularios(){
	$('.delebook > span:nth-child(2)').on('click', function(){
		notifi.emit('deletePhoto',{borrar:se('.Photoo>h3>span').dataset.cod, meet:localStorage, opt:1}, function(a){
			if(a){
				$('.delebook').fadeOut(800)
				se('.Photoo>h3>span[data-name]').textContent='Libro Borrado!!';
				$('#contenephot *').each(function(){
					$(this).hide(500);
				});
				setTimeout(function(){
					se('#contenephot').innerHTML='';
					mierda=0;
				}, 500);
			}
		});
	});
	$('#permision > form').on('submit', function(e){
		e.preventDefault();
		var formu=$(this);
		var books=se('#permision > form>input[type=hidden]').value,
			codB=se('.Photoo>h3>span').dataset.cod,
			pss=se('#permision > form > article>input[type=radio]:checked').value;
		chatHist.emit('chanePermissBook',{b:books, prm:pss, bis:codB},function(a){
			if(a){
				$('#permision').fadeOut(800);
				formu[0].reset();
				errorMsg('Se ha cambiado con éxito los permisos del libro!', 2, 3000)
			}
		});
	});
	$('#fm_delete').on('submit', function(e){
		e.preventDefault();
		var Vals=[], nodeTag=[];
		$(".Photoo>article>div>input[type=checkbox]:checked").each(function(){
			Vals.push($(this).val());
			nodeTag.push($(this));
			if(Vals.length===$(".Photoo>article>div>input[type=checkbox]:checked").length){
				notifi.emit('deletePhoto',{borrar:Vals, meet:localStorage, opt:0}, function(a){
					if(a)
						nodeTag.forEach(function(val,key){
							val.fadeOut(500);
							val.parent().hide(500);
							setTimeout(function(){
								val.parent().remove();
							},500);
						});
				});
			}
		});
		$('#fm_delete').fadeOut(500);
		si('.Photoo>article>div>input', function(elem){
			elem.dataset.d=1;
		});
	});
}
function agregar_foto(){
	var formulario=se('#addphotoshop > article > article > article > form');
	if(formulario!==null){
		formulario.addEventListener('submit', function(ev){
			ev.preventDefault();
			subirFotos(se('#addphotoshop > article > article > article > form > span > input'),2);
		});
	}
}
function infoBokk(){
	var a=porcentajes(1), infos='<div class="infobox">'+
	'La opción de edición es para darle permiso a otras personas para que agreguen fotos a este libro mas adelante'+
	'</div>';
	if(a%2===0){
		$(infos).prependTo('#abracadabra > i');
		setTimeout(function(){
			$('.infobox').remove();
			porcentajes(1);
		}, 5000);
	}else{
		$('.infobox').remove();
	}
}
function subir_fotos(){
	$('#abracadabra > i').on('click', infoBokk);
	var formulario=se('#book > article > form');
	if(formulario!==null){
		formulario.addEventListener('submit', function(ev){
			ev.preventDefault();
			var datos={edition: $('#abracadabra > select').val(), bokk:$('#book > article > form > input[type=text]').val(), permiss:$('#book > article > form > article > article > input[type=radio]:checked').val(), me:localStorage}
			sessionStorage.bkn=se('#book > article > form > input[type=text]').value;
			notifi.emit('CreateBook', datos, function(a){
				if(a.vali===1)
					alert('el libro ya existe');
				else
					subirFotos(se('#book > article > form >span > input[type=file]'), 1, a.bokk);
			});
		});
	}
}
function subirFotos(input, option, book){
	$('#book > article > form > input').fadeOut(500);
	errorMsg('Las ímagenes se estan subiendo', 2,6000);
	var i = 0, len = input.files.length, file;
	for( ; i < len; i++){
		file = input.files[i];
		if(!!file.type.match(/image.*/)){
			Ajaxs.push({'file': file});
			if(i===(len-1)){
				if(option===1){
					NoAjaxs[0]=se('#book>article>form>article>article>input[type="radio"]:checked').value;
					NoAjaxs[1]=book;
					$('#abracadabra')[0].reset();
				}else if(option===2){
					$('#addphotoshop > article > article > article > form')[0].reset();
				}
			}
		}
	}
	continuar();
}
function continuar(){
	if(window.FormData){
		var formdata = new FormData();
	}
	if(Ajaxs.length>0){
		var proceso = Ajaxs.shift(), f=proceso.file;
		if(f.size>20661){
			dato={name: f.name, size: f.size, nick: localStorage.nick};
			chatHist.emit('ifSize',dato,function(a){
				if(a===4){
					NoAjaxs.push({'file': f, 'motivo': 'muy pequeña'});
					continuar();
				}else if(a===2){
					NoAjaxs.push({'file': f, 'motivo': 'ya existe'});
					continuar();
				}else{
					reader=new FileReader();
					reader.onloadend = (function(theFile) {
						return function(e) {
							$('#addphotoshop > article > article > article > form, #book > article > form').css({'background':'url('+e.target.result+') no-repeat scroll -50px 0/115% rgba(0, 0, 0, 0.8)'});
						};
					})(f);
					reader.readAsDataURL(f);
					if(formdata){
						formdata.append('fl_addbook', f);
						formdata.append('table', sessionStorage.bkn);
						formdata.append('nick', localStorage.nick);
						envio4(formdata);
					}
				}
			});
		}else{
			NoAjaxs.push({'file': f, 'motivo': 'muy pequeña'});
			continuar();
		}
	}else{
		window.opener.document.querySelector('title').innerHTML='Todos los archivos subidos';
		notifi.emit('CreateBook', {book: NoAjaxs[1], nick: localStorage.nick, date: timeDate()[2]}, function(a){//muestra la nueva historia a los usuarios
			var content=window.opener.document.querySelector('.subody_2');
			$(content).prepend(a.dom);
			$('.POST'+a.histo).css({'display':'none'});
			$('.POST'+a.histo).slideDown(500);
		});
		window.opener.errorMsg('Se han terminado de subir las ímagenes', 2,5000);
		$('#sound').html('<audio autoplay>'+
					'<source src="./public/sounds/2315.wav" type="audio/ogg">'+
					'Your browser does not support the audio element.'+
					'</audio>');
		if(NoAjaxs.length===0)
			$('.infoUpload, .infoUpload').html('<div>Fin de la Carga :D</div><div>'+NoAjaxs.length+' archivos con error!!</div>');
		else
			$('.infoUpload, .infoUpload').html('<div>Fin de la Carga :D</div><div>'+(NoAjaxs.length-2)+' archivos con error!!</div>');
		setTimeout(function(){
			//this.window.close();
		},3000);
	}
}

function prigress(prog){
	var p=$('#progresito > div'), mytitle=window.opener.document.querySelector('title');
	p.html(prog+"%");
	p.css({'width':prog+"%"});
	var a=porcentajes(0);
	mytitle.innerHTML=a+' archivos subidos';
}
var oReq=new XMLHttpRequest();
function ajaxHttpRequest(datos, prog, cb){
	oReq.upload.addEventListener('progress',prog, false);
	oReq.open('POST', '/upImages', true);
	oReq.onreadystatechange = function(yy){
		if(this.readyState===4){
			cb(this.responseText)
		}
	}
	oReq.send(datos);
}
function envio4(datos){
	oReq=new XMLHttpRequest();
	var all=new Array(), ai=0;
	oReq.upload.addEventListener('progress',function(e){
		var prog=parseInt(Math.round((e.loaded / e.total)*100));
		prigress(prog);
	}, false);
	oReq.open('POST', '/upImages', true);
	oReq.onreadystatechange = function(yy){
		if(this.readyState===4){
			console.log(this.responseText)
			ai=porcentajes(1);
			$('.infoUpload,  .infoUpload').slideDown(500).css({'display':'block'}).html(ai+' archivos subidos');
			continuar();
		}
	}
	oReq.send(datos);
}

var porcentajes = (function(init){ // esta funcion anonima crea un closure ;
	return function(a){
	init += a;
	return init;
	};
})(0); // el parametro es el valor al que se inicializa la variable dentro del closure ;
function appendConnecters(data){
	if(se('#conectadosss')){
		if(data.length){
			data.forEach(val=>{
				if(!se(`.connect [data-myme="58745812${val.us}"]`))
					$('.connect > section').append('<article data-myme="58745812'+val.us+'" onclick="javascript:createChat({chat:'+"'user_"+val.us+"'"+'})"><label>'+val.nick+'</label>'+
							'<div style="background:url('+val.img+') 0/100%; width:40px; height:40px;" class="images"></div>'+
						'</article>');
			});
		}
	}else if(se('.-as-connects')){
		if(data.length)
			data.forEach(val=>{
				if(!se(`.-as-connects [data-myme="58745812${val.us}"]`))
					$('.-as-connects').append(html.connects(val))
			})
	}
}
function ListChat(){
	chatHist.emit('in',{}, resa=>{
		if(!resa.err){
			if(typeof(main)!=='undefined')
				main.logic.loadResponsiveConnect(resa.list)
			appendConnecters(resa.list);
		}
	});
}
function windoProgress(e){ //crear nuevo libro
	var p=$('#book > article > form > div > div');
	p.html(parseInt(Math.round((e.loaded / e.total)*100))+"%");
	p.css({'width':parseInt((e.loaded / e.total)*100)+"%"});
}
function showHistory(data){
	if(typeof(doCanvasDOMCrop)!=='undefined'){
		doCanvasDOMCrop.data.camera=false
	}
	return new Promise((res, err)=>{
		data.nick=localStorage.nick;
		notifi.emit('newHistory', data, resa=>{
			res(resa)
				if(typeof(showHsitoryDOM)!=='undefined'){
					showHsitoryDOM(resa);
					soundNoti('..');
					NoAjaxs=[];
				}
			if(se('#FileName[data-up="false"]'))
				se('#FileName[data-up="false"]').innerHTML='';
			$('#NewHistory>input, #NewHistory > .clean, .Compl_comment').fadeIn(500, function(){
				$('#NewHistory')[0].reset();
			});
		});
		if(se('section>#shareDom')){
			$('section>#shareDom').hide(500)
			setTimeout(function(){
				$('section>#shareDom').remove();
				window.addEventListener('keyup', RowStep, false);
			}, 500)
		}
	})
}
function reqListener(){
	var res=this.responseText;
	if(res.substring(3)!==''){
		showHistory({file: res, user: localStorage.user, history: pruevita});
	}
}
function adVideoInfo(fdata ,cb){
	fdata.append('genero', se('.genre').value)
	fdata.append('name', se('.name').value)
	if(se('span#ups>input[type=file]').value!=='')
		fdata.append('thumbnail', se('span#ups>input[type=file]').files[0]);
	else if(se('input[type=text]#ups').value!=='')
		fdata.append('second', se('input[type=text]#ups').value);
	cb(fdata);
}
function ajaxPuro(url,data,  cb){
	var fomrD= new FormData(),
		i;
	for(i in data){
		if(i!=='prgFn')
			fomrD.append(i, data[i]);
	}
	var xhr = new XMLHttpRequest();
	xhr.upload.addEventListener('progress', ev=>{
		let prog=parseInt(Math.round((ev.loaded/ev.total)*100));
		data.prgFn(prog)
	}, false);
	xhr.open('POST', url, true);
	xhr.onload=function(){
		cb(this.responseText);
	};
	xhr.send(fomrD);
}
function uploadAJAX(url, funcion, option){
	var fdata;
	clearInterval(tenFavor);
	var xhr = new XMLHttpRequest();
	xhr.upload.addEventListener("progress", funcion, false);
	xhr.open("POST", url, true);
	if(option===undefined){
		fdata = new FormData(se('#NewHistory'));
		fdata.append('user', localStorage.user)
		fdata.append('nick', localStorage.nick)
		fdata.append('table', 'Cronologia')
		xhr.onload=reqListener;
		xhr.send(fdata);
	}else if(option===2){
		fdata = new FormData(TempImage);
		fdata.append('user', localStorage.user)
		fdata.append('nick', localStorage.nick)
		fdata.append('genero', se('.genre').value)
		fdata.append('name', se('.name').value)
		fdata.append('artist', se('.artis').value)
		xhr.onload=reqListener;
		xhr.send(fdata);
	}else if(option===1){
		fdata = new FormData(TempImage);
		adVideoInfo(fdata ,function(a){
			fdata.append('user', localStorage.user)
				fdata.append('nick', localStorage.nick)
			xhr.onload=reqListener;
			xhr.send(a);
		});
	}
}
