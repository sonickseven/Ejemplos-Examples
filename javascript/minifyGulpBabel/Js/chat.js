'use strict'
var d = new Date();
var userGlobal='',
	userNick='';
var tituloPage='';
var inFona=false,
	conti=0,
	times;

const chatVar={
	events:()=>{
		if(se('.ultraCap'))
			si('.ultraCap', elem=>{
				elem.addEventListener('click',chatVar.logic.clickRemoveUserChat,false)
			})
		if(se('.ss-dummi'))
			se('.ss-dummi').addEventListener('click',chatVar.logic.closeAddChatBox,false)
		if(se('.addUserToChat .showUserSearch .listedUs'))
			si('.addUserToChat .showUserSearch .listedUs',elem=>{
				elem.addEventListener('click',chatVar.logic.addToListChat,false)
			})
		if(se('.addUserToChat .nickUser')){
			se('.addUserToChat .nickUser').addEventListener('keyup',chatVar.logic.searchUserToChat,false)
			se('.addUserToChat .nickUser').addEventListener('focus',chatVar.logic.focusSearchUserToChat,false)
			se('.addUserToChat .nickUser').addEventListener('blur',chatVar.logic.blurSearchUserToChat,false)
		}
		if(se('.chat')){
			$('body').on('focus', '.chat .textareaC textarea', chatVar.logic.focusChat)
			$('body').on('blur', '.chat .textareaC textarea', chatVar.logic.blurChat)
		}
		if(!chatVar.data.oneTime){
			chatVar.data.oneTime=true
			varStrik.sideBars({
				content:se('body'),
				touchableLeft: se('.leftBarResponsive'),
				touchableRight: se(`.connectsResponsive`)
			}, resp=>{
				if(!resp.err&&resp.type==='showRight'){
					se('.connectsf').click()
				}
				else if(!resp.err&&resp.type==='hideRight'){
					if(se('.dummi-rightbar'))
						se('.dummi-rightbar').click()
				}else if(!resp.err&&resp.type==='showLeft'){
					main.logic.leftBar()
				}else if(!resp.err&&resp.type==='hideLeft'){
					if(se('.dummi-leftBar'))
						se('.dummi-leftBar').click()
				}
			})
			$('body').on('click', '.chat .-chat-showAdd .close-attach-file', chatVar.logic.closeAttachFile)
			$('body').on('click', '.searchUserResponsive .ss-close-icon', chatVar.logic.closeSearchNick)
			$('body').on('click', '#contenthats>i', noMiniza)
			$('body').on('click', '.addUserToChat .adduser', chatVar.logic.sendUserToAddChat)
			$('body').on('click', '.icon-eye-1.ss-button-success',chatVar.logic.fileShareChat)
			$('body').on('click', '.fileShareChat>.header>.icon-minus-circle',chatVar.logic.minShowFileChat)
			$('body').on('click', '.fileShareChat>.header>.icon-cancel-circle',chatVar.logic.closeShowFileChat)
			$('body').on('click', '.minShareFileChat',chatVar.logic.maxShowFileChat)
			$('body').on('click', `.chat .notificateChat .buttonBottom>span`, fileChat.clickAcceptRechazeFile)
			$('body').on('click', `.optAttach>.ss-close-icon`, chatVar.logic.closeAttach)
			$('body').on('click', `.minRightBarResponsive .alertyChat`, chatVar.logic.clickAlertys)

			$('body').on('click', '.searchResponsive', chatVar.logic.responsiveSearch)
			$('body').on('keyup', '.searchUserResponsive .capms input', chatVar.logic.searchNick)
			$('body').on('submit', '.searchUserResponsive form', chatVar.logic.searchNick)
			$('body').on('click', '.searchUserResponsive #resultUserSreah', chatVar.logic.closeSearchNick)

			$('body').on('click', '.newCommentResposive', chatVar.logic.responsiveNewHistory)
			$('body').on('submit', '.responsiveNewHistory>.bodyNewHistory form', chatVar.logic.NewHistory)
			$('body').on('keyup', '.responsiveNewHistory>.bodyNewHistory textarea', chatVar.logic.countLetter)
			$('body').on('change', '.responsiveNewHistory .buttons>.hiddenInput>input', chatVar.logic.fileHistory)
			$('body').on('click', '.popUpPreview>i, .ss-dummi2', main.logic.closePreviewPopUp)

		}

	},
	logic:{
		closeAttachFile: function(ev){
			let boxAttach=this
			boxAttach.parentNode.remove()
		},
		fileHistory: function(ev){
			if(this.files.length>1){
				boot.logic.popUpAlert({err:true, msg: 'Solo puedes escojer un archivo', time:2000})
			}else{
				let file=this.files[0]
				if(file.type.match(/(audio)/g)){
					chatVar.data.fileHistory=file
					selectImageSendChat(file ,fileString=>{
						se('.mediaHistory>div').innerHTML=`<i class="ss-close-icon icon-cancel"></i><audio controls id="musicResponsive" src="${fileString}"></audio>`
						$('.mediaHistory .ss-close-icon').on('click', ()=>{
							se('.mediaHistory>div').innerHTML=''
							chatVar.data.fileHistory=false
						})
					})
				}else if(file.type.match(/(image)/g)){
					if(file.size<5661){
						boot.logic.popUpAlert({err:true, msg: 'La imágen que quieres subir es muy pequeña 😣', time:3000})
					}else if(file.size>12000000){
						boot.logic.popUpAlert({err:true, msg: 'Lo siento amigo, pero imagenes tan pesadas no podemos subir, reducela de tamaño y ahí si vuelvela a subir 😣', time:4000})
					}else{
						chatVar.data.fileHistory=file
						selectImageSendChat(file ,fileString=>{
							se('.mediaHistory>div').innerHTML=`<i class="ss-close-icon icon-cancel"></i><img src="${fileString}" class="previeImgResposnive"/>`
							$('.mediaHistory .ss-close-icon').on('click', ()=>{
								se('.mediaHistory>div').innerHTML=''
								chatVar.data.fileHistory=false
							})
						})
					}
				}else
					boot.logic.popUpAlert({err:true, msg: 'Por el momento solo puedes publicar imagenes y audios 😞', time:2000})
			}
		},
		countLetter: function(){
			let count=(this.value.length-280)*-1
			se('.countLetter').textContent=count
			if(count>-1){
				se('.countLetter').style.color='#444'
				chatVar.data.countLetter=false
				se('.buttons>button').classList.add('ss-button-primary')
				se('.buttons>button').classList.remove('ss-button-unaval')
			}else{
				se('.countLetter').style.color='#bf0202'
				chatVar.data.countLetter=true
				se('.buttons>button').classList.add('ss-button-unaval')
				se('.buttons>button').classList.remove('ss-button-primary')

			}
		},
		closeAttach:function(){
			let box=this.parentNode
			box.remove()
		},
		closeShowFileChat: function(){
			se('.fileShareChat').classList.remove('bounceInLeft')
			se('.fileShareChat').classList.add('bounceOutDown')
			setTimeout(()=>{
				se('.fileShareChat').remove()
			},800)
		},
		maxShowFileChat: function(){
			if(se('.fileShareChat')){
				se('.fileShareChat').classList.remove('bounceOutLeft')
				se('.fileShareChat').classList.add('bounceInLeft')
			}
			if(se('.minShareFileChat')){
				se('.minShareFileChat').classList.add('rotateOutUpLeft')
				setTimeout(()=>{
					se('.minShareFileChat').remove()
				},800)
			}
		},
		minShowFileChat: function(){
			se('.fileShareChat').classList.add('bounceOutLeft')
			se('.fileShareChat').classList.remove('rubberBand')
			if(se('.minShareFileChat')) se('.minShareFileChat')
			$('body').append(`<div class="minShareFileChat animated rotateIn"><i class="icon-volume-up"></i></div>`)
		},
		fileShareChat: function (ev){
			ev.preventDefault()
			let src=this.href,
				type=this.dataset.typefile
			if(se('.fileShareChat')) se('.fileShareChat').remove()
			if(se('.minShareFileChat')) se('.minShareFileChat').remove()
			if(type==='video')
				$('body').prepend(html.fileShareChat({src:src, video: true}))
			else if(type==='audio')
				$('body').prepend(html.fileShareChat({src:src, audio: true}))
			else if(type==='pdf')
				$('body').prepend(html.fileShareChat({src:src, pdf: true}))
		},
		focusChat: function(){
			keyboard.data.chat=this.parentNode.parentNode.dataset.uiid
		},
		blurChat: function(){
			keyboard.data.chat=false
		},
		closeChatRemoveUser:data=>{
			let chatVBox=se(`.chat[data-uiid="${data.iChat}"]>div.iconopt>i.closs`)
			$(chatVBox).trigger('click')
		},addChat:iChat=>{
			if(!localStorage.chats)
				localStorage.chats=iChat
			if(localStorage.chats.indexOf(iChat)<0)
				localStorage.chats+=','+iChat
		},
		onSockets:()=>{
			chatHist.on('chatJoin:'+localStorage.nick, data=>{
				chatVar.logic.addChat(data)
				chatHist.emit('joinChat', data)
			})
			function inRoomChat(){
				if(localStorage.chats){
					var uiids=localStorage.chats.split(',');
					uiids.forEach(function(val){
						chatHist.emit('joinChat', val)
					});
				}
				si('.chat', elem=>{
					chatHist.emit('joinChat', elem.dataset.uiid)
				})
			}
			inRoomChat()
		},removeUserPrepareDM:data=>{
			chatVar.data.iChat=data.iChat
			if(se('.ss-dummi'))
				se('.ss-dummi').remove
			$('body').append('<article class="ss-dummi"></article><article class="removeUserToChat optUserChat"></article>')
			se('.removeUserToChat').innerHTML=chatVar.templates.removeUserToChatDm
			chatHist.emit('optChat', {opt:6, iChat:chatVar.data.iChat}, resa=>{
				if(resa.length)
					resa.forEach((val, key)=>{
						$('.optUserChat>div').append(chatVar.templates.removeUserToChat(val))
						if(key+1===resa.length)
							chatVar.events()
					})
				else
					se('.optUserChat>div').innerHTML='<div class="srgydb">No hay usuarios invitados</div>'
			})
			chatVar.events()
		}, addUserPrepareDM:(data)=>{
			chatVar.data.iChat=data.iChat
			if(se('.ss-dummi'))
				se('.ss-dummi').remove
			$('body').append('<article class="ss-dummi"></article><article class="addUserToChat optUserChat"></article>')
			se('.addUserToChat').innerHTML=chatVar.templates.addUserToChatDm({})
			chatVar.events()
		},searchUserToChat:function(ev){
			var textField=this;
			clearTimeout(chatVar.data.keyUserToChat)
			chatVar.data.keyUserToChat=setTimeout(()=>{
				se('.addUserToChat .showUserSearch').innerHTML=''
				if(textField.value.length>3)
					chatHist.emit('serachNick', {userToChat:textField.value}, resa=>{
						if(resa.length)
							resa.forEach((val, key)=>{
								$('.addUserToChat .showUserSearch').append(chatVar.templates.listsUserResult(val))
								if(key+1===resa.length)
									chatVar.events()
							})
						else
							se('.addUserToChat .showUserSearch').innerHTML='<div class="noResultUser">No hay resultados!!</div>'
					})
				else
					se('.addUserToChat .showUserSearch').innerHTML='<div class="noResultUser">Por favor escribe mas letras para buscar</div>'
			},400)
		},addToListChat:function(){
			let user=this;
			if(!se(`.usersAdded>img[data-cod="${user.dataset.cod}"]`))
				$('.usersAdded').append(`<img src="${user.dataset.img}" data-nick="${user.dataset.nick}" title="${user.dataset.nick}" data-cod="${user.dataset.cod}" />`)
			se('.addUserToChat .showUserSearch').style.display='none'
		},focusSearchUserToChat:()=>{
			se('.addUserToChat .showUserSearch').style.display='block'
		},blurSearchUserToChat:()=>{
			setTimeout(()=>{
				se('.addUserToChat .showUserSearch').style.display='none'
			},100)
		},sendUserToAddChat:()=>{
			let users=[], usersNick=[]
			si('.usersAdded>img', elem=>{
				users.push([elem.dataset.cod,elem.dataset.nick])
			})
			if(users.length){
				chatHist.emit('optChat', {me: localStorage.user,users:users, opt:5, iChat:chatVar.data.iChat}, resa=>{
					alertPop({time: 1500,msg:`se han agregado los usuarios`,  err:false})
					$('.ss-dummi').trigger('click')
					users.forEach(val=>{
						sendLoadMessage({message:`@${val[1]} se ha unido a la conversación`, chat: chatVar.data.iChat})
					})
				})
			}else
				boot.logic.popUpAlert({err: true, msg: 'Primero selecciona los usuarios y despues dale al botón agregar 😊'})
		},closeAddChatBox:()=>{
			si('.ss-dummi, .optUserChat', elem=>{
				elem.remove()
			})
		},clickRemoveUserChat:function(){
			let userClick=this;
			chatHist.emit('optChat', {opt:7, iChat:chatVar.data.iChat, nick:userClick.dataset.nick}, resa=>{
				sendLoadMessage({message:`@${userClick.dataset.nick} ha salido de la conversación`, chat: chatVar.data.iChat})
				chatHist.emit('joinChat', chatVar.data.iChat)
				$('.ss-dummi').trigger('click')
				clearTimeout(chatVar.data.cleatRemoveUser)
				chatVar.data.cleatRemoveUser=setTimeout(()=>{
					chatHist.emit('optChat', {opt:0,chat:chatVar.data.iChat, user:'6545'+userClick.dataset.cod}, resa=>{
					})
				},500)
			})
		},
		createGradient:function(svg,id,color1,color2){
			var defs = svg.append("svg:defs");
		 
			var red_gradient = defs.append("svg:linearGradient")
				.attr("id", id)
				.attr("x1", "0%")
				.attr("y1", "0%")
				.attr("x2", "50%")
				.attr("y2", "100%")
				.attr("spreadMethod", "pad");
		 
			red_gradient.append("svg:stop")
				.attr("offset", "50%")
				.attr("stop-color", color1)
				.attr("stop-opacity", 1);
		 
			red_gradient.append("svg:stop")
				.attr("offset", "100%")
				.attr("stop-color", color2)
				.attr("stop-opacity", 1);
		},alertyChaty: data=>{
			if(se('.minRightBarResponsive')){
				if(!se(`.alertyChat[data-chat="${data.chat}"]`))
					$('.minRightBarResponsive').prepend(`<div class="alertyChat animated" data-chat="${data.chat}" style="background-image: url(${data.pDir})"><span class="alerty-responsive-msg"><span class="noSpace">${data.msg}</span></span></div>`)
				else
					se(`.alertyChat[data-chat="${data.chat}"]`).innerHTML=`<span class="alerty-responsive-msg"><span class="noSpace">${data.msg}</span></span>`
				clearTimeout(chatVar.data.timeCloseMinMsg)
				chatVar.data.timeCloseMinMsg=setTimeout(()=>{
					if(se(`.alertyChat[data-chat="${data.chat}"] .alerty-responsive-msg`))
						se(`.alertyChat[data-chat="${data.chat}"] .alerty-responsive-msg`).remove()
				},10000)
			}
		}, clickAlertys: function(){
			let chat=this
			if(boot.logic.responsive({width:true})){
				if(se(`.contentCOnnectd>.usersf[data-chat="${chat.dataset.chat}"]`)){
					se(`.contentCOnnectd>.usersf[data-chat="${chat.dataset.chat}"]`).click()
				}
				console.log('jejejej')
			}
			chat.classList.add('bounceOutRight')
			setTimeout(()=>{
				chat.remove()
			},500)
		}, responsiveSearch: function(){
			$('body').append(chatVar.templates.responsiveSearchUser)
			let heightr=se('.searchUserResponsive>h4').offsetHeight+se('.fileSearch').offsetHeight,
				strCss=`calc(100vh - ${heightr}px)`
			se('.resultsRespon').style.height=strCss
			varStrik.overflowWindow({hide: true})
		}, closeSearchNick:data=>{
			varStrik.overflowWindow({})
			se('.searchUserResponsive').classList.add('bounceOutDown')
			setTimeout(()=>{
				$('.ss-dummi, .searchUserResponsive').remove()
			},800)
		}, searchNick:function(ev){
			ev.preventDefault()
			let nick=this.value||se('.searchUserResponsive .capms input').value
			clearTimeout(varStrik.vari.searchNickText)
			varStrik.vari.searchNickText=setTimeout(()=>{
				if(nick.length>3){
					chatHist.emit('searching', {val:nick.substr(1)}, resp=>{
						if(!resp.err){
							if(resp.users.length){
								se('.searchUserResponsive .resultsRespon').innerHTML=resp.users.map(val=>html.dmSearchUser(val)).join('')
							}else
								se('.searchUserResponsive .resultsRespon').innerHTML='<div class="uoagwvferg">No hay resultados de la busqueda 😓</div>'
						}else
							boot.logic.popUpAlert({err: true, msg: 'Tenemos probelmas internos, por favor intentalo mas tarde', time:4000})
					})
				}else
					se('.searchUserResponsive .resultsRespon').innerHTML='<div class="uoagwvferg">Escribe mas de 4 letras por favor para especificar</div>'
			},500)
		}, closeResponsiveNewHistory:()=>{
			se('.responsiveNewHistory').classList.add('bounceOutUp')
			setTimeout(()=>{
				si('.responsiveNewHistory, .ss-dummi', elem=>{
					elem.remove()
				})
			},800)
			varStrik.overflowWindow({})
		},responsiveProgress:data=>{
			if(!chatVar.data.oneTimeProgress){
				chatVar.data.oneTimeProgress=true
				se('.mediaHistory>div').innerHTML=''
				chatVar.data.newHistoryChart=varStrik.createChart(se('.mediaHistory>div'))
			}
			if(se('.mediaHistory>div>svg')){
				varStrik.setPercent({
					percent: data,
					ragio: data/100,
					element:{
						pathChart: chatVar.data.newHistoryChart.pathChart,
						svgSelector: '.mediaHistory>div svg',
						patchPorcenty: '.mediaHistory>div svg .porcenty',
						arcLine: chatVar.data.newHistoryChart.arcLine
					}
				})
			}
		},
		newHistory2: data=>{
			chatHist.emit('filesTimeline', data, resp=>{
				if(resp.err){
					boot.logic.popUpAlert({err:true, msg: 'Hemos tenido un problema con el archivo. Intentalo más tarde', time:5000})
					if(se('.responsiveNewHistory .ss-close-icon'))
						se('.responsiveNewHistory .ss-close-icon').click()
				}else
					showHistory({file: resp.src, user: localStorage.user, history: data.history})
					.then(resp=>{
						boot.logic.removePops({})
						if(se('.responsiveNewHistory .ss-close-icon'))
							se('.responsiveNewHistory .ss-close-icon').click()
					}).catch(err=>{console.log(err)})
			});
		},
		 closeResponsiveNewHistory:()=>{
			se('.responsiveNewHistory').classList.add('bounceOutUp')
			setTimeout(()=>{
				si('.responsiveNewHistory, .ss-dummi', elem=>{
					elem.remove()
				})
			},800)
			varStrik.overflowWindow({})
		},NewHistory:function(ev){
			ev.preventDefault()
			let formHitory=this
			if(se('.responsiveNewHistory>.bodyNewHistory textarea').value.length<281){
				$('.bodyNewHistory .buttons').slideUp(500)
				boot.logic.loading({msg: 'Publicando historia'})
				if(!formHitory.oneClick){
					let hisotr=se('.responsiveNewHistory>.bodyNewHistory textarea').value
					formHitory.oneClick=true
					if(chatVar.data.fileHistory){
						if(chatVar.data.fileHistory.type.match(/(image)/g)){
							selectImageSendChat(chatVar.data.fileHistory ,fileString=>{
								imgDimention(fileString, img=>{
									let timelineFile=chatVar.data.fileHistory
									boot.logic.removePops({})
									ajaxSocket('upFileSocket', {fileName: timelineFile.name, file: fileString, prgFn: chatVar.logic.responsiveProgress}).then(resp=>{
										varStrik.data.breakAjaxSocket=false
										formHitory.oneClick=false
										chatVar.data.oneTimeProgress=false
										if(resp.err){
											boot.logic.popUpAlert({err:true, msg: 'Ha ocurrido un error, intentanlo mas tarde'})
											se('.responsiveNewHistory .ss-close-icon').click()
										}else{
											if(resp.src){
												showHistory({file: resp.src, user: localStorage.user, history: data.history})
												.then(resp=>{
													boot.logic.removePops({})
													if(se('.responsiveNewHistory .ss-close-icon'))
														se('.responsiveNewHistory .ss-close-icon').click()
												}).catch(err=>{console.log(err)})
											}else
												chatVar.logic.newHistory2({width:img.width, height: img.height,nick: localStorage.nick, size: timelineFile.size, opt: timelineFile.type, history: hisotr, fileName: timelineFile.name});
										}
										
									}).catch(err=>{
										console.log(err)
									});
									chatVar.data.fileHistory=false;
								})
							})
						}else if(chatVar.data.fileHistory.type.match(/(audio)/g)){
							selectImageSendChat(chatVar.data.fileHistory ,fileString=>{
								boot.logic.removePops({})
								let datas={
									fl_chrono:chatVar.data.fileHistory,
									nick:localStorage.nick,
									user:localStorage.user,
									prgFn:chatVar.logic.responsiveProgress,
								}
								ajaxPuro('/upload', datas, resp=>{
									formHitory.oneClick=false
									chatVar.data.oneTimeProgress=false
									showHistory({file: resp, user: localStorage.user, history: hisotr});
									se('.responsiveNewHistory .ss-close-icon').click()
								});
								$('#NewHistory>input, #NewHistory > .clean, .Compl_comment').fadeIn(500);
								chatVar.data.fileHistory=false;
							})
						}
					}else{
						showHistory({user: localStorage.user, history: hisotr})
						.then(resp=>{
							formHitory.oneClick=false
							boot.logic.removePops({})
							se('.responsiveNewHistory .ss-close-icon').click()
						}).catch(err=>{console.log(err)})
					}
				}
			}else
				boot.logic.popUpAlert({err: true, msg: 'tienes que quitar letras de la historia que quieres publicar', time: 3000})
		},
		responsiveNewHistory: function(){
			$('body').append(`<article class="ss-dummi"></article>${chatVar.templates.responsiveNewHistory({nick:(se('.imgPerfil-visit')?'@'+se('.imgPerfil-visit').dataset.nick:'')})}`)
			$('.responsiveNewHistory .ss-close-icon, .ss-dummi').on('click', chatVar.logic.closeResponsiveNewHistory)
			varStrik.overflowWindow({hide:true})
			let $inputor=$('.bodyNewHistory form textarea')
			.atwho(varStrik.settingTagging)
			.atwho(varStrik.settingEmojis)
			$inputor.caret('pos', 47);
			$inputor.focus().atwho('run');
		}
	},data:{},	
	templates:{
		responsiveNewHistory:data=>{
			return `<article class="responsiveNewHistory animated bounceInUp">
				<i class="ss-close-icon icon-cancel"></i>
				<h4>Nueva Historia</h4>
				<div class="bodyNewHistory">
					<form>
						<div class="ss-row">
							<textarea name="" placeholder="Que está pasando?" required>${data.nick}</textarea>
						</div>
						<div class="ss-row buttons">
							<button type="submit" class="ss-button-primary">Publicar</button>
							<spam class="hiddenInput ss-button-neutra">Escojer archivo
								<input type="file"/>
							</spam>
							<div class="countLetter">280</div>
						</div>
						<div class="ss-row mediaHistory">
							<div></div>
						</div>
					</form>
				</div>
			</article>`
		},
		responsiveSearchUser:`<div class="ss-dummi"></div>
			<article class="searchUserResponsive animated bounceInUp">
				<i class="ss-close-icon icon-cancel"></i>
				<h4>Buscar</h4>
				<div class="fileSearch">
					<form>
						<div class="capms">
							<input type="text" placeholder="Nombre, nick, correo"/>
						</div><div class="capms">
							<button class="ss-button-success icon-search-2"></button>
						</div>
					</form>
				</div>
				<div class="resultsRespon"></div>
			</article>`,
		removeUserToChat:data=>`<div data-nick="${data.nick}" data-cod="${data.cod}" class="ultraCap"><img src="${data.pDir}" title="${data.nick}" class="usImg"><i class="removeUss icon-trash-6"></i></div>`,
		removeUserToChatDm:`<h3>Eliminar usuarios invitados</h3><div></div>`,
		listsUserResult:data=>`<div data-nick="${data.nick}" data-img="${data.pDir}" data-cod="${data.cod}" class="listedUs" title="${data.nick}">
								<img src="${data.pDir}" class="usImg">
								<div class="useInfo">
									<div class="head-use">${data.nick}</div>
									<div class="name-use">${data.nombres} ${data.apellidos}</div>
								</div>
							</div>`,
		addUserToChatDm:data=>{
				let domgChatUserAdd=`<div>
					<h3>Agregar usuario a la conversación</h3>
					<input type="text" class="nickUser" placeholder="Nombre o nick del usuario">
					<button class="adduser icon-plus-circled-1"></button>
					<div class="showUserSearch"></div>
					<div class="usersAdded">
						
					</div>
				</div>`
				return domgChatUserAdd
		}, soundChatOption: `<i class="ss-close-icon icon-cancel"></i><h3>Sonido del chat ♫♫</h3>`+
				`<span data-sound="default.wav" title="Normal">`+
					'<i class="incon-sound icon-volume"></i>'+
					`<div class="nameSound">Por defecto</div>`+
				`</span>`+
				`<span data-sound="birdFly.wav" title="Huyyy!!">`+
					'<i class="incon-sound icon-volume"></i>'+
					`<div class="nameSound">Huyyy</div>`+
				`</span>`+
				`<span data-sound="sapo.wav" title="Sapo">`+
					'<i class="incon-sound icon-volume"></i>'+
					`<div class="nameSound">Sapo</div>`+
				`</span>`+
				`<span data-sound="belching_.wav" title="Erupto">`+
					'<i class="incon-sound icon-volume"></i>'+
					`<div class="nameSound">Erupto</div>`+
				`</span>`+
				`<span data-sound="coin_.wav" title="Moneda">`+
					'<i class="incon-sound icon-volume"></i>'+
					`<div class="nameSound">Moneda</div>`+
				`</span>`+
				`<span data-sound="firecracker.wav" title="Despegue">`+
					'<i class="incon-sound icon-volume"></i>'+
					`<div class="nameSound">Despegue</div>`+
				`</span>`+
				`<span data-sound="pin_minion.wav" title="minion!!">`+
					'<i class="incon-sound icon-volume"></i>'+
					`<div class="nameSound">Minion</div>`+
				`</span>`+
				`<span data-sound="sms.wav" title="Patito de hule">`+
					'<i class="incon-sound icon-volume"></i>'+
					`<div class="nameSound">Patito de hule</div>`+
				`</span>`+
				`<span data-sound="note_iii.wav" title="Campanita">`+
					'<i class="incon-sound icon-volume"></i>'+
					`<div class="nameSound">Campanita</div>`+
				`</span>`,
		stylesChat:`<i class="ss-close-icon icon-cancel"></i><h3>Cambiar color del chat!!</h3>`+
			`<span data-chat="chatNeutro"></span>`+
			`<span data-chat="chatAmarillo"></span>`+
			`<span data-chat="chatAzul"></span>`+
			`<span data-chat="chatGris"></span>`+
			`<span data-chat="chatNegro"></span>`+
			`<span data-chat="chatRojo"></span>`+
			`<span data-chat="chatVerde"></span>`+
			`<span data-chat="chatVioleta"></span>`
	}
}
function clearTimes() {
	clearTimeout(clearConnect)
}
function tituloVibrante(b) {
	var a = se("title");
	var partes = b.split(' ');
	function c() {
		if (inFona) {
			a.textContent = partes[conti];
			times = setTimeout(function() {
				c()
			}, 800)
		} else {
			conti = 0;
			a.textContent = tituloPage;
			clearTime("times")
		} if (conti >= partes.length - 1) {
			conti = -1
		}
		conti += 1
	}
	c();
}

function clearTime(a) {
	if (a === undefined) {
		clearTimeout(clearConnect)
	} else {
		clearTimeout(a)
	}
}
function notiChat(a){
	var queryNode='.chat[data-uiid="'+a.chat+'"]';
	if(se(queryNode)){
		se(queryNode+' .optChat section.msgchat article div[data-typing] span').innerHTML='...✍ ';
		se(queryNode+' .optChat section.msgchat article div[data-typing]').className=(a.device==1?'icon-laptop':'icon-mobile-5');
		if(a.opt===0){
			se(queryNode+' .optChat section.msgchat').title=a.me.nick
			se(queryNode+' .optChat section.msgchat').style.visibility='visible';
			se(queryNode+' .optChat section.msgchat').style.opacity=1;
			se(queryNode+' .optChat section.exter>article[data-msg]>div').dataset.typing='1';
			se(queryNode+' .optChat section.msgchat>article[data-img]>div').style.backgroundImage='url('+a.me.pDir+')';
		}else{
			se(queryNode+' .optChat section.msgchat').style.visibility='hidden';
			se(queryNode+' .optChat section.msgchat').style.opacity=0;
			se(queryNode+' .optChat section.exter>article[data-msg]>div').dataset.typing='0';
		}
	}
}
var clearConnect={};
function sendLoadMessage(datos){
	html.noRunScript(datos.message, text=>{
		html.splitStringMsg(text, emoticonsEncode, {codec:datos.codec}).then(text=>{
			chatHist.emit('mgss', {
				mens: text,
				me: {nick:localStorage.nick, user:localStorage.user},
				chat: datos.chat,
				device: 0//0 pc, 1 mobile
			}, function(dataMsg){

				let boxChat=se(`.chat[data-uiid="${datos.chat}"]`)
				clearTimeout(chatVar.data.conn)
				chatVar.data.conn=setTimeout(()=>{
					notifi.emit('noConnect', {nick:boxChat.dataset.nick}, res=>{
						if(se('.connect article[data-myme="58745812'+res.user+'"]'))
							se('.connect article[data-myme="58745812'+res.user+'"]').remove();
						emitConecDisconnectUser({nick:boxChat.dataset.nick, us:res.user}, false)
					})
				}, 3000);
				var tagy='.chat[data-uiid="'+dataMsg.chat+'"]';
				html.msgChat(dataMsg, function(msgDM){
					$(tagy+'>article>article.contenOptions>div.contentMsg').append(msgDM);
					GNGN()
					$(tagy+'>article>article.contenOptions').animate({
						scrollTop: $(tagy+'>article>article.contenOptions>div').height()
					}, 800);
				});
			})
		})
	});
}
function escribir(b){
	let tagChat = this,
		nodeTag='.chat[data-uiid="'+tagChat.dataset.chat+'"]';
	if(this.value.length>45){
		if(se(nodeTag)){
			se(nodeTag+'>article').style.height='calc(100% - 166px)';
			se(nodeTag+'>div.textareaC').style.height='115px';
		}
	}else{
		if(se(nodeTag)){
			se(nodeTag+'>article').style.height='calc(100% - 79px)';
			se(nodeTag+'>div.textareaC').style.height='30px';
		}
	}
	if(clearConnect.typi)
		clearTimeout(clearConnect.typi)
	else{
		if(b.which!==13){
			chatHist.emit('typing', {
				me: localStorage,
				chat: tagChat.dataset.chat,
				opt:0,
				device:1//PC 2 Mobile
			});
		}
	}
	clearConnect.typi=setTimeout(function(){
		clearConnect.typi=undefined;
		chatHist.emit('typing', {
			me: localStorage,
			chat: tagChat.dataset.chat,
			opt:1,
			device:1//PC 2 Mobile
		});
	},1000)
	if(b.which===13) {
		b.preventDefault();
		if(se(nodeTag)){
			se(nodeTag+'>article').style.height='calc(100% - 79px)';
			se(nodeTag+'>div.textareaC').style.height='30px';
		}
		if(noSpace(tagChat.value)) {
			var message = tagChat.value;
			tagChat.value = '';
			sendLoadMessage({message: message, chat: tagChat.dataset.chat})
		}
	}
}

function titilarChat(chatBox){
	if(se(chatBox+' textarea.textarea')){
		se(chatBox+' textarea.textarea').addEventListener('blur', function(){
			// console.log('no lo esta viendo')
		}, false)
	}
}
function roomChat(chat, user){//functions of add chat to user
	// if(!localStorage.chats)
	// 	localStorage.chats='';
	// if(localStorage.chats.indexOf(chat)<0)
	// 	localStorage.chats+=chat+'_'+user+',';
}
function alertChatBox(data){
	console.log('jejeje que mas')
	return new Promise((res, err)=>{
		let queryNode='.chat[data-uiid="'+data.chat+'"]';
		if(inFona) {
			soundNoti('/public/sounds/'+localStorage.soundChat);
			if(data.nick) {
				notifyMe({
					body: '@'+data.nick+': '+data.msg,
					icon: data.pDir,
					dir: 'ltr'
				})
			}
		}
		res()
		if($(queryNode).css('display')==='none'){
			chatVar.logic.alertyChaty(data)
			if(se('#contenthats>i[data-chat="'+data.chat+'"]>span[data-num]')){
				var num=parseInt(se('#contenthats>i[data-chat="'+data.chat+'"]>span[data-num]').dataset.num);
				num+=1;
				se('#contenthats>i[data-chat="'+data.chat+'"]>span[data-num]').dataset.num=num;
				se('#contenthats>i[data-chat="'+data.chat+'"]>span[data-num]').textContent=num;
				chatHist.emit('optChat', {
					user: localStorage.user,
					chat: data.chat,
					viewed: num,
					opt:4
				}, function(res){
				})
			}
			if(se('#contenthats>i[data-chat="'+data.chat+'"]'))
				se('#contenthats>i[data-chat="'+data.chat+'"]').dataset.message="new";
			soundNoti('/public/sounds/'+localStorage.soundChat)
			//emita para decir cuantos no ha leido
		}else{
			if(se(queryNode+'>article>strong.-ch-noty')){
				se(queryNode+'>article>strong.-ch-noty').textContent='';
				se(queryNode+' >h1').dataset.titilar ='';
				$(queryNode+'>article>article.contenOptions').animate({
					scrollTop: $(queryNode+'>article>article.contenOptions>div.contentMsg').height()
				}, 800);
			}
		}
	})
}
function listen(data){
	notifi.emit('reconnects', {
		nick: data.nick, me: localStorage.user, meNick:localStorage.nick
	})
	let title=se("title"),
		queryNode='.chat[data-uiid="'+data.chat+'"]';
	function createBoxChat(){
		if(!se(queryNode)){
			roomChat(data.chat, data.user);
			soundNoti('/public/sounds/blackhole_shot.wav');
			loadMsg({iChat: data.chat, uss: data.user, me: localStorage.user})
		}else
			alertChatBox({chat:data.chat, nick: data.nick, pDir: data.pDir, msg: data.msg}).then(res=>{
				html.msgChat(data, function(msgDM){
					$(queryNode+'>article>article.contenOptions>div.contentMsg').append(msgDM)
					$(queryNode+'>article>article.contenOptions').animate({
						scrollTop: $(queryNode+'>article>article.contenOptions>div').height()
					}, 800);
					GNGN()
				});
			});
	}
	createBoxChat()
	if(inFona){
		clearTime(times);
		tituloVibrante('mensaje de '+data.nick);
		conti = 0
	}else{
		// console.log("limpiar el titulo")
	}
	titilarChat(queryNode);
}

function indexZ() {
	if ($(this).css("position")==="fixed") {
		si(".chat", function(a) {
			a.style.zIndex = 0
		});
		this.style.zIndex = 1
	} else {
		this.style.zIndex = 0
	}
}
function showIcon(){
	var uid = this.dataset.uiid,
		boxChat=this,
		queryNode='.chat[data-uiid="'+uid+'"]',
		b = se(queryNode+"> article>article.contenOptions"),
		c = se(queryNode+" textarea.textarea");
	b.querySelector("div.contentMsg").style.display = "none";
	if(se(queryNode+"> article>article.contenOptions >div.emotes"))
		se(queryNode+"> article>article.contenOptions>div.emotes").remove()
	$(queryNode+">article>article.contenOptions").append('<div class="emotes"><i class="ss-close-icon icon-cancel"></i></div>')
	$(queryNode+"> article>article.contenOptions >div.emotes").prepend(iconChats.join(''))
	si("div.emotes>.iconChat", function(e) {
		e.addEventListener("click", function() {
			let f = c.value;
			c.value = f+" "+this.dataset.command+" ";
			boxChat.querySelector(".contentMsg").style.display="block";
			boxChat.querySelector(".emotes").remove();
			b.scrollTop = b.scrollHeight;
			c.focus()
		}, false)
	})
	se('div.emotes>.ss-close-icon').addEventListener('click',()=>{
		boxChat.querySelector(".contentMsg").style.display="block";
		if(boxChat.querySelector(".emotes"))
			boxChat.querySelector(".emotes").remove();
		b.scrollTop = b.scrollHeight;
		c.focus()
	},false)
}
function loadMsg(infos){
	var prom=new Promise((res, err)=>{
		console.log(infos)
		chatHist.emit('chatCreate', infos, c=>{
			keyboard.data.chat=c.id
			if(!se('.chat[data-uiid="'+c.id+'"]')){
				chatVar.logic.addChat(c.id)
				var b=se('#contenthats');
				var e=html.domChatBox(c);
				b.insertBefore(e, b.childNodes[0]);
				var queryNode='.chat[data-uiid="'+c.id+'"]'
				se(queryNode+'>article').style.background=' url('+c.uss.bDir+') center / 121%';
				if(c.data.msg.length){
					c.data.msg.forEach(function(h, g){
						html.msgChat(h, function(msgDM){
							$(queryNode+'>article>article.contenOptions>div').append(msgDM);
							if(c.data.msg.length===g+1){
								prepareChats(e)
							}
						});
					});
				}else{
					prepareChats(e)
					e.dataset.hide=false;
				}
				res(true)

			}else
				$('#contenthats>i[data-chat="'+c.id+'"]').trigger('click')
		})

	});
	return prom;
}
function clickToMinizar(){
	let elem=this
	minizar('.chat[data-uiid="'+this.dataset.uiid+'"]');
	chatHist.emit('optChat', {
		user: localStorage.user,
		chat: elem.dataset.uiid,
		min: true,
		opt:1
	}, function(res){
	})
}
function avise(e){
	var boxFile=this;
	if(!boxFile.querySelector('.-chat-showAdd')){
		var showAdd=document.createElement('article')
		showAdd.className='-chat-showAdd'
		showAdd.innerHTML='<i class="ss-close-icon close-attach-file icon-cancel"></i><i class="icon-attach-2"></i>'
		var father=this.querySelector('article>article.contenOptions')
		father.insertBefore(showAdd, father.childNodes[0])
	}
}
function closeChat(){
	var elem=this
	slideAnimation(this);
	chatHist.emit('optChat', {
		user: localStorage.user,
		chat: this.dataset.uiid,
		opt: 0//close the chat
	}, function(asd){
		setTimeout(function(){
			var regex = new RegExp('('+elem.dataset.uiid+'|\,'+elem.dataset.uiid+')','g');
			let chats=localStorage.chats
			localStorage.chats=chats.replace(regex,'')
			elem.remove()
		}, 500)
	});
}
function clickImgChat(ev){
	ev.preventDefault();
	let img=this.childNodes[0]
	showVI.bind(img)()
}
function prepareChats(elem){
	// elem.querySelector('')
	chatHist.emit('joinChat', elem.dataset.uiid)
	elem.querySelector('i.generateIcon').addEventListener('click',showIcon.bind(elem),false)
	elem.querySelector('h1>span').addEventListener('click', varStrik.router.domVisit,false)
	elem.addEventListener('click', indexZ, false);
	elem.querySelector('div.iconopt>i.closs').addEventListener('click', closeChat.bind(elem),false)
	elem.querySelector('div.iconopt>i.minizar').addEventListener('click', clickToMinizar.bind(elem), false);
	elem.querySelector('article>article.contenOptions').scrollTop=elem.querySelector('article>article.contenOptions>div').scrollHeight+100;
	elem.addEventListener('dragenter', avise, false);
	elem.addEventListener('dragover', fileOverChat, false);
	elem.addEventListener('drop', createFileChat, false)
	elem.querySelector('textarea.textarea').addEventListener('keypress', escribir, false);
	elem.querySelector('div.iconopt>i.addTach').addEventListener('click', addTachment, false);
	function tagging(){
		let elemy=elem.querySelector('textarea.textarea')
		if(!elemy.oneTime){
			elemy.oneTime=true
			let $inputor=$(elemy)
			.atwho(varStrik.settingTagging)
			.atwho(varStrik.settingEmojis)
			$inputor.caret('pos', 47);
			$inputor.focus().atwho('run')
		}
	}
	tagging()
}
function upImg(datos, prog, cb){
	if(window.FormData){
		var formdata=new FormData();
		selectImageSendChat(datos.file, (imgString)=>{
			imgDimention(imgString, img=>{
				if(formdata){
					formdata.append('fl_addbook', datos.file);
					formdata.append('table', datos.name);
					formdata.append('nick', datos.nick);
					formdata.append('book', datos.book);
					formdata.append('width', img.width);
					formdata.append('height', img.height);
					ajaxHttpRequest(formdata, prog, cb)
				}else
					errorMsg('Lo sentimos tu navegador es muy antiguo, por favor usa navegadores actualizados como Google Chrome o Fifefox');
			})
		});
	}else
		errorMsg('Lo sentimos tu navegador es muy antiguo, por favor usa navegadores actualizados como Google Chrome o Fifefox');
}



function aksChangePage(a) {
	if(!a) {
		window.onbeforeunload = function() {}
	}else{
		window.onbeforeunload = function() {
			return a
		}
	}
}

function createStream(data, cb, progres) {
	let numer=0,numSplit=9000 ,ended=parseInt(data.fileString.length/numSplit),
		stringBase=''
	if(ended===0)
		ended=1
	function startStream(){
		var pipe=varStrik.splitWords(data.fileString, numSplit);
		data.fileString=pipe[1];
		if(numer===0){
			stringBase=pipe[0].match(/^data(.*)se64/g)[0]
			var g=pipe[0].indexOf("base64");
			pipe[0]=pipe[0].substr(g+7)
		}
		if(numer<=ended){
			let porcenty=parseInt((numer*100)/ended)
			if(progres)
				progres(porcenty)
			chatHist.emit('sendFileChat', {
				stringBase: stringBase,
				fileVari: data.fileVari,
				fileType:data.fileType,
				fileSize:data.fileSize,
				fileName:data.fileName,
				iChat:data.iChat,
				nick:localStorage.nick,
				num: numer,
				porcenty:porcenty,
				fileStream: pipe[0],
				lmt: ended,
				opt:'other',
				opt2: 2
			},(res)=>{
				numer++
				// setTimeout(startStream, 5000);
				startStream();
			});
		}else
			cb(true)
	}
	startStream();
}



var fileChat={
	createChart:chatProgress=>{
		let pie=d3.layout.pie()
			.value(function(d){return d})
			.sort(null);
		let w=chatProgress.offsetWidth/1.4,h=w;
		 
		let outerRadius=(w/2)-15;
		let innerRadius=outerRadius-8;
		 
		let color = ['#f2503f','#ea0859','#404F70'];
		 
		let svg=d3.select(chatProgress)
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
	clickAcceptRechazeFile:function(){
		let button=this,
			parentBox=button.parentNode.parentNode,
			idNotificationChat=parentBox.dataset.num,
			data=JSON.parse(parentBox.dataset.datas)
		chatHist.emit('sendFileChat', {fileVari: data.fileVari, fileName:data.fileName, nickMe:localStorage.nick ,resp: button.dataset.opt,iChat:data.iChat , opt2:1, opt: 'other', nick: data.nick});
		se(`.chat .notificateChat[data-num="${idNotificationChat}"]`).remove();
	},
	reciveFileChat:data=>{
		if(data.opt===0){
			var chatBox=se(`.chat[data-uiid="${data.iChat}"]`),
				notifiBoxChat=chatBox.querySelector('.appendExtraElementChat')
			alertChatBox({chat:data.iChat, nick: data.nick, pDir: data.userImg, msg: 'Quiere enviarte un archivo'});
			$(notifiBoxChat).append(html.notifiChatFile(data))
		}else if(data.opt===1){//enviando el archivo
			var boxChat=se(`.chat[data-uiid="${data.iChat}"]`);
			if(boxChat.querySelector('.waitReplyChat'))
				boxChat.querySelector('.waitReplyChat').remove()
			if(data.resp==='0')
				alertPop({time: 2000,msg:`@${data.nickMe} no quiso aceptar el archivo 😭!!`,  err:true})
			else{
				if(!varStrik.vari.aceptFile) varStrik.vari.aceptFile={}
				if(!varStrik.vari.aceptFile[data.fileVari]){
					let file=varStrik.vari[data.fileVari]
					$(boxChat.querySelector('.contentMsg')).append(html.sendingDatos(data));
					var	porcenText=boxChat.querySelector(`.${data.fileVari} .porfer`), progresBar=boxChat.querySelector(`.${data.fileVari} .progress>div`)
					varStrik.vari.aceptFile[data.fileVari]=true
					selectImageSendChat(file ,fileString=>{
						createStream({fileVari:data.fileVari, fileType:file.type, fileSize:file.size,fileName:data.fileName,fileString:fileString, iChat:data.iChat}, respg=>{
							varStrik.vari.aceptFile[data.fileVari]=false
							delete varStrik.vari[`${data.iChat}${data.fileName}`]
						}, progss=>{
							porcenText.textContent=progss+'%'
							progresBar.style.width=progss+'%'
						});
						
					})
				}
			}
		}else if(data.opt===2){//recibiendo el file
			if(!varStrik.vari.fileChatGet)
				varStrik.vari.fileChatGet={}
			var chatBox=se(`.chat[data-uiid="${data.iChat}"]`),
				notifiBoxChat=chatBox.querySelector('.contentMsg')
			if(!notifiBoxChat.querySelector(`.gettingFileChat[data-filename="${data.fileVari}"] .progress`)){
				varStrik.vari.fileChatGet[data.fileName]=''
				data.size=varStrik.bytesToSize(data.fileSize)
				$(notifiBoxChat).append(html.recivingDatos(data))
			}
			if(!chatVar.data[data.fileVari]){
				chatVar.data.chart=true
				chatVar.data[data.fileVari]=fileChat.createChart(notifiBoxChat.querySelector(`.gettingFileChat[data-filename="${data.fileVari}"] .progress`))
			}
			let selectorCss=`.chat[data-uiid="${data.iChat}"] .contentMsg .gettingFileChat[data-filename="${data.fileVari}"] .progress`

			fileChat.setPercent({
				percent: data.porcenty,
				ragio: data.porcenty/100,
				element:{
					pathChart: chatVar.data[data.fileVari].pathChart,
					svgSelector: selectorCss+' svg',
					patchPorcenty: selectorCss+' svg .porcenty',
					arcLine: chatVar.data[data.fileVari].arcLine
				}
			})

			varStrik.vari.fileChatGet[data.fileName]+=data.fileStream;
			
			if(data.porcenty===100){
				chatHist.emit('sendFileChat',{opt:'other', opt2:3,nick:data.nick , iChat:data.iChat, fileName:data.fileName})

				if(notifiBoxChat.querySelector(`.gettingFileChat[data-filename="${data.fileVari}"]`)){
					notifiBoxChat.querySelector(`.gettingFileChat[data-filename="${data.fileVari}"]`).classList.add('bounceOut')
					setTimeout(()=>{
						notifiBoxChat.querySelector(`.gettingFileChat[data-filename="${data.fileVari}"]`).remove();
					},1000)
				}
				let fileString=varStrik.base64ToArrayBuffer(varStrik.vari.fileChatGet[data.fileName]),
					base64=`${data.stringBase},${varStrik.vari.fileChatGet[data.fileName]}`

				setFile(data, fileString, base64)
				.then(string=>{
					var conetnChatMsg=chatBox.querySelector('.contentMsg');
					$(conetnChatMsg).append(string)
				}).catch(console.log)
			}
		}else if(data.opt===3){
			var chatBox=se(`.chat[data-uiid="${data.iChat}"]`)
			if(chatBox){
				let notifiChat=chatBox.querySelector(`.sending[data-filename="${data.fileName}"]`),
					conteNotifi=chatBox.querySelector(`.contentMsg`)
				if(notifiChat)
					notifiChat.remove();
				$(conteNotifi).append(html.sendingOK(data))
			}
		}
	}
}
function setFile(data, fileString, base64) {
	return new Promise(cb=>{
		aksChangePage()
		let typeFile='', bandera=null;
		if(data.fileType){
			bandera=data.fileType.match(/(image.*|audio.*|video.*|application\/pdf)/g);
			typeFile=data.fileType+";charset=UTF-8"
		}
		let fileName=data.fileName
		let fileBlob=new Blob([fileString], {
			type:typeFile
		})
		if(fileBlob){
			let linkFileBlob=window.URL.createObjectURL(fileBlob)
			if(bandera){
				let typetag=''
				if(data.fileType.match(/video.*/g))
					cb(html.fileChatAudio({type: 'video', preview: base64,href: linkFileBlob, fileName:data.fileName, text:'Ver vídeo', classIcon: 'icon-video'}))
				else if(data.fileType.match(/audio.*/g))
					cb(html.fileChatAudio({type: 'audio', preview: base64,href: linkFileBlob, fileName:data.fileName, text:'Escuchar', classIcon:'icon-music-2'}))
				else if(data.fileType.match(/application\/pdf/g))
					cb(html.fileChatAudio({type: 'pdf', preview: base64,href: linkFileBlob, fileName:data.fileName, text:'Ver PDF', classIcon:'icon-doc-text-1'}))
			}else{
				cb(html.otherTypeFileChat({href:linkFileBlob, fileName:data.fileName}))
				saveAs(fileBlob, data.fileName)
			}
		} else
			alert("Lo sentimos pero tu buscador de internet no soporta enviar archivos por el chat")
	})
}
function createFileChat(a){
	var boxFile=this;
	varStrik.deleteDragsSign()
	a.stopPropagation();
	a.preventDefault();
	var b=a.dataTransfer.files;
	if(b.length>1)
		errorMsg("Solo se envia un archivo", 1, 3000)
	else
		loadFileLocal(this, b[0])
}
function loadFIleAndSend(){
	var b = this.parentNode.parentNode.parentNode,
		a = this.parentNode.parentNode;
	var c = this.files[0];
	a.remove()
	loadFileLocal(b, c)
}
function loadFileLocal(box, file){
	selectImageSendChat(file, function(e){
		if(file.type.match('image.*'))
			sendImg()
		else{
			let tmpString=`${boot.logic.stringGen(15)}`
			varStrik.vari[tmpString]=file
			$(box.querySelector('.appendExtraElementChat')).append(html.waitReplyFile());
			chatHist.emit('sendFileChat', {fileVari:tmpString, fileName:file.name, iChat:box.dataset.uiid, opt2:0, opt: 'other', nick: localStorage.nick},asd=>{
				// console.log(asd)
			});
		}
		function sendFile(archiv, chat){
			console.log('holas jejeje')
			chatHist.emit('sendFileChat', {opt: 'other', me: localStorage.user}, function(asd){
				loadFromFile(file, function(id3){
					id3.opt=0;
					chatHist.emit('ifExist', id3, function(res){
						if(res.res){

						}else{

						}
					})
				});

			});
		}
		function sendAudio(){
			chatHist.emit('sendFileChat', {opt: 'aud', me: localStorage.user}, function(asd){
				loadFromFile(file, function(id3){
					id3.opt=0;
					chatHist.emit('ifExist', id3, function(res){
						if(res.res){

						}else{

						}
					})
				});

			});
		}

		function sendImg(){
			$(box.querySelector('.appendExtraElementChat')).append(html.upImgChat(file))
			chatHist.emit('sendFileChat', {opt: 'img', me: localStorage.user}, function(asd){//busca la info del libro chat
				let dato={name: file.name, size: file.size, nick: localStorage.nick, opt:1};
				chatHist.emit('ifSize',dato,function(aaa){
					if(aaa.res===1)
						upImg({file: file,name: asd.nombre, nick: localStorage.nick, book: asd.cod}, 
							avance=>{
								var prog=parseInt(Math.round((avance.loaded / avance.total)*100));
								box.querySelector('.upImgChat[data-name="'+file.name+'"]>.progress>div').style.width=prog+'%'
								if(prog>99)
									box.querySelector('.upImgChat[data-name="'+file.name+'"]').remove()
							},res=>{
								sendLoadMessage({message: res, chat: box.dataset.uiid, codec:false})
							}
						)
					else{
						box.querySelector('.upImgChat[data-name="'+file.name+'"]').remove()
						let dataImg=aaa.data
						sendLoadMessage({message: `${varStrik.urlMedia}/media/Pic_${dataImg.cod}ML${dataImg.libro}`, chat: box.dataset.uiid})
					}
				});
			});
		}
	})
}

function loadUrl(url, cb, reader) {
	var startDate = new Date().getTime();
	ID3.loadTags(url, function() {
		var endDate = new Date().getTime();
		if (typeof console !== "undefined") console.log("Time: " + ((endDate-startDate)/1000)+"s");
		var tags = ID3.getAllTags(url);
		// $("artist").textContent = tags.artist || "";
		// $("title").textContent = tags.title || "";
		// $("album").textContent = tags.album || "";
		// $("artist").textContent = tags.artist || "";
		// $("year").textContent = tags.year || "";
		// $("comment").textContent = (tags.comment||{}).text || "";
		// $("genre").textContent = tags.genre || "";
		// $("track").textContent = tags.track || "";
		// $("lyrics").textContent = (tags.lyrics||{}).lyrics || "";
		// if( "picture" in tags ) {
		// 	var image = tags.picture;
		// 	var base64String = "";
		// 	for (var i = 0; i < image.data.length; i++) {
		// 		base64String += String.fromCharCode(image.data[i]);
		// 	}
		// 	$("art").src = "data:" + image.format + ";base64," + window.btoa(base64String);
		// 	$("art").style.display = "block";
		// } else {
		// 	$("art").style.display = "none";
		// }
		if(cb) cb(tags);
	},
	{tags: ["artist", "title", "album", "year", "comment", "track", "genre", "lyrics", "picture"],
	 dataReader: reader});
}

function loadFromFile(file, cb) {
	var url = file.urn ||file.name;
	loadUrl(url, cb, FileAPIReader(file));
}
function fileOverChat(a) {
	a.stopPropagation();
	a.preventDefault();
	a.dataTransfer.dropEffect = "copy"
}
function createChat(a){
	if(!se('.user_'+localStorage.user.substr(4)+'_'+a.chat.substr(5))&&!se('.user_'+a.chat.substr(5)+'_'+localStorage.user.substr(4))){
		loadMsg({chat: a.chat,user: localStorage.user, nick: localStorage.nick});
	}
}

function placeCaretAtEnd(e) {
	e.focus();
	if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
		var c = document.createRange();
		c.selectNodeContents(e);
		c.collapse(false);
		var b = window.getSelection();
		b.removeAllRanges();
		b.addRange(c)
	} else {
		if (typeof document.body.createTextRange != "undefined") {
			var a = document.body.createTextRange();
			a.moveToElementText(e);
			a.collapse(false);
			a.select()
		}
	}
}


function addTachment() {
	let bbox=this.parentNode.parentNode,
		queryNode='.chat[data-uiid="'+bbox.dataset.uiid+'"]';
	var c=se(queryNode+'>div.optAttach');
	if (!c) {
		var a = createElement("div");
		a.className = "optAttach";
		a.innerHTML = '<i class="ss-close-icon icon-cancel"></i><div class="fileSend" data-opt="addFile">Enviar archivo<input type="file"/></div><div data-opt="chSound" data-content="'+bbox.dataset.uiid+'">Cambiar el sonido</div><div data-opt="chColor" data-content="'+bbox.dataset.uiid+'">Cambiar el color</div><div data-opt="addUser" data-content="'+bbox.dataset.uiid+'">Agregar usuario al chat</div><div data-opt="removeUser" data-content="'+bbox.dataset.uiid+'">Quitar usuario del chat</div>';
		bbox.insertBefore(a, se(queryNode+'>article'));
		si('div.optAttach>div', elem=> {
			elem.addEventListener("click", moreOptchat, false)
		});
		bbox.querySelector('.fileSend>input[type="file"]').addEventListener("change", loadFIleAndSend, false)
	}else{
		bbox.removeChild(c)
	}
}

function moreOptchat() {
	var e = this.dataset.opt,
		c = this.dataset.content;
	if(se('.chat > article>article[data-chopt="true"]'))
		se('.chat > article>article[data-chopt="true"]').remove();
	// console.log(e, c)
	// return
	if(e!=='addFile') {
		this.parentNode.remove();
		let queryNode='.chat[data-uiid="'+c+'"]',
			b = se(queryNode+'>article'),
			contentOptions= createElement('article');
		contentOptions.dataset.chopt = true;
		switch(e){
			case "chSound":
				b.insertBefore(contentOptions, b.childNodes[0]);
				if(se(queryNode+'>article>article.contenOptions'))
					se(queryNode+'>article>article.contenOptions').style.display='none';
				contentOptions.innerHTML=chatVar.templates.soundChatOption
				let oneTimeHoverMouse
				se('.chat>article>article[data-chopt="true"]>.ss-close-icon').addEventListener('click',()=>{
					contentOptions.remove()
					se(queryNode+'>article>article.contenOptions').style.display='block'
				},false)
				si('.chat [data-chopt="true"]>span[data-sound]', elem=> {
					elem.addEventListener("mouseenter", function() {
						let sound=this.dataset.sound
						clearTimeout(oneTimeHoverMouse)
						oneTimeHoverMouse=setTimeout(()=>{
							soundNoti('/public/sounds/'+sound)
						},1000)
					}, false);
					elem.addEventListener("click", function(){
						let sound=this.dataset.sound
						chatHist.emit('optChat', {
							sound: this.dataset.sound,
							opt: 3
						}, resp=>{
							if(resp.err)
								boot.logic.popUpAlert({err:true, msg: resp.msg, time:4000})
							else
								boot.logic.popUpAlert({msg: 'Sonido del chat cambiado exitosamente 😉',time: 4000})
							contentOptions.remove()
							localStorage.soundChat=sound
							se(queryNode+'>article>article.contenOptions').style.display='block'
						})
					}, false)
				});
				break;
			case "chColor":
				b.insertBefore(contentOptions, b.childNodes[0]);
				if(se(queryNode+'>article>article.contenOptions'))
					se(queryNode+'>article>article.contenOptions').style.display = 'none';
				contentOptions.innerHTML=chatVar.templates.stylesChat
				chBgChat();
			break;
			case 'addUser':
				chatVar.logic.addUserPrepareDM({iChat:c})
				console.log('agregar usuario')
			break;
			case 'removeUser':
				chatVar.logic.removeUserPrepareDM({iChat:c})
			break;
			default:
				console.log("opcion desconocida");
			break
		}
	}
}
function createElement(a) {
	return document.createElement(a)
}

function marginChat(a, b) {
	// console.log(a,b, se(a).offsetHeight)
	if(b)
		se(a).style.marginTop = "0"
	else
		se(a).style.marginTop = "-"+(se(a).offsetHeight - 64)+"px"
}

function chathide(a) {
	minizar('.chat[data-uiid="'+a.id+'"]');
	se('.chat[data-uiid="'+a.id+'"]').style.display='none'
}
function minizar(a) {
	if(boot.logic.responsive({width: true})){
		varStrik.overflowWindow({})
	}
	si(a, function(c) {
		c.dataset.hide='minizar';
		var b = document.createElement('i');
		b.dataset.chat=c.dataset.uiid;
		b.style.background = c.dataset.bg;
		b.title = c.dataset.nick;
		b.innerHTML='<span data-num="0"></span>'
		setTimeout(function() {
			c.style.display = "none";
			se("#contenthats").insertBefore(b, c);
			si("#contenthats>i", function(e) {
				e.addEventListener("click", noMiniza, false)
			})
		}, 880)
	})
}
function noMiniza(){
	if(boot.logic.responsive({width: true})){
		console.log('poner overflow')
		varStrik.overflowWindow({hide: true})
	}
	let elemData=this.dataset;
	keyboard.data.chat=elemData.chat
	var queryNode='.chat[data-uiid="'+this.dataset.chat+'"]', elem2=se(queryNode),
		elemt=this;
	setTimeout(()=>{
		if(elemt.parentNode===se('#contenthats'))
			se('#contenthats').removeChild(elemt);
		elem2.style.display='inline-block';
		setTimeout(function() {
			elem2.dataset.strt = '';
			elem2.dataset.hide = 'maxizar';
			se(queryNode+'>article>article.contenOptions').scrollTop = se(queryNode+'>article>article.contenOptions>div').scrollHeight+100
		}, 30)
	}, 500);
	chatHist.emit('optChat', {
		user: localStorage.user,
		chat: elemData.chat,
		min: false,
		opt: 2
	});
	elemt.dataset.hide = "maxizar"
}
function slideAnimation(elem) {
	elem.dataset.hide = true;
	setTimeout(()=>{
		elem.style.display = "none"
	}, 880)
	
}
var dragonia = "",
	xChat, yChat;

function moveChat(a) {
	a.preventDefault();
	var b = "#"+this.id;
	marginChat(b, true);
	this.style.opacity = 1;
	se(b+">article>div").style.display = "block";
	se(b+">article").scrollTop = se(b+">article>div").scrollHeight;
	se(b).style.top = yChat+"px";
	se(b).style.left = xChat+"px";
	if (yChat+se(b).offsetHeight > alto) {
		se(b).style.position = "relative";
		se(b).style.top = 0;
		se(b).style.left = 0;
		marginChat(b);
		chatHist.emit("chatInfo", {
			user: localStorage.user,
			chat: this.id
		})
	} else {
		marginChat(b, true);
		se(b).style.position = "fixed";
		chatHist.emit("chatInfo", {
			user: localStorage.user,
			x: xChat,
			y: yChat,
			chat: this.id
		})
	}
}

function resizeChat() {
	chatHist.emit("chatInfo", {
		height: $(this).height(),
		width: $(this).width(),
		user: localStorage.user,
		chat: this.id
	})
}

function movingChat(b) {
	b.preventDefault();
	var a = b.clientX - 100,
		c = b.clientY - 70;
	xChat = a;
	yChat = c
}

function dragChat(a) {
	a.dataTransfer.setData("text/html", this.dataset.idd);
	dragonia = "#"+this.id;
	this.style.opacity = 0.3;
	se(dragonia+">article>div").style.display = "none";
	if ($(dragonia).css("position") === "fixed") {
		si(".chat", function(b) {
			b.style.zIndex = 0
		});
		se(dragonia).style.zIndex = 1
	} else {
		se(dragonia).style.zIndex = 0
	}
}
chatHist.on("resTimeline", function(b) {
	$(".subody_2").append(b)
});

function sognSoundPosition() {
	var a = 0;
	if (localStorage.lpSongPosition === "") {
		localStorage.lpSongPosition = 0
	}
	return parseInt(localStorage.lpSongPosition)
}

function sognSound() {
	var a = ("["+localStorage.lpSong+"]");
	a = JSON.parse(a.replace("},]", "}]"));
	return a
}

function prevSong() {
	var a = sognSoundPosition(),
		b = sognSound();
	localStorage.lpSongPosition = a - 1;
	if (localStorage.lpSongPosition < 0) {
		localStorage.lpSongPosition = b.length - 1
	}
	songInfo = b[a - 1];
	notifi.emit("openPlayer", {
		sginfo: songInfo,
		dj: sessionStorage.player,
		opt: 1
	})
}
if(localStorage.nick){
	notifi.on('dj_master:'+localStorage.nick.toLowerCase(), res=>{
		// notifi.emit('openPlayer', {opt:18, idMaster:res.idMaster})
	})
}
function nextSong(b){
	console.log(b,'hsrogerge')
	switch (b.opt){
		case 0:
			var c = sognSoundPosition(),
				f = sognSound().length;
			if (c<f-1){
				var g = sognSound()[localStorage.lpSongPosition];
				notifi.emit("openPlayer", {
					sginfo: g,
					dj: sessionStorage.player,
					opt: 1
				});
				localStorage.lpSongPosition=c+1
			}else{
				var e=localStorage.codSong.substr(0, localStorage.codSong.length-1);
				notifi.emit("openPlayer", {//emite el nevio de la nueva canción
					seru: b.seru,
					lp: b.lp,
					sg: b.sg,
					dj: sessionStorage.player,
					sgs: e,
					opt: 3
				}, function(a) {
					if (!a) {
						localStorage.lpSongPosition = 0;
						nextSong(b);
						errorMsg("Todas las canciones se han reproducido :D", 2, 3000)
					} else {
						localStorage.codSong += a[0].Scod+",";
						localStorage.lpSong += JSON.stringify(a[0])+",";
						localStorage.lpSongPosition = c+1
					}
				})
			}
			break;
		default:
			console.log("option unknow!!");
			break
	}
}
notifi.on('dj'+localStorage.nick, function(a){
	musicVary.startPlayer(a)
	// notifi.emit('openPlayer', {user: a,	lpData: a,opt: 0}, function(c){})
})
var musicVary={
	startPlayer:function(nodateg){
		if(nodateg.cod){
			var a=localStorage.nick.toLowerCase();
			if(!localStorage.nick)
				a='UserExter'+(aleatorio(1, 28762842))
			sessionStorage.player=a;
			notifi.emit('openPlayer', {user: a,	lpData: nodateg,opt: 0}, function(c){
				if(!c){
					errorMsg("No hay algun audio disponible, intenta con otra canción", 1, 3000)
				}else{
					htmPlayer()
					if(c.wind) {
						var b=window.open('/player/?dj='+a);
						// var b=window.open("/LP/"+a, "popupId", "location=no,menubar=no,titlebar=no, resizable=no,toolbar=no, menubar=no,width=666,height=505");
						if(!b){
							errorMsg(browsers()+" tiene las ventanas emergentes bloqueadas.<br> Desbloquealas para poder escuchar ", 1, 5000)
						}else{
							localStorage.removeItem('mediaPlayer')
							varStrik.mediaPlayer=[c.sginfo[0]]
							localStorage.mediaPlayer=JSON.stringify(varStrik.mediaPlayer)
							localStorage.lpSongPosition=varStrik.mediaPlayer.length-1
						}
					}else{
						if(!varStrik.mediaPlayer){
							if(localStorage.mediaPlayer){
								varStrik.mediaPlayer=JSON.parse(localStorage.mediaPlayer)
								if(!varStrik.searchSongArray(varStrik.mediaPlayer, c.sginfo[0].cod)){
									varStrik.mediaPlayer.push(c.sginfo[0])
								}
							}else{
								varStrik.mediaPlayer=[c.sginfo[0]]
								localStorage.mediaPlayer=JSON.stringify(varStrik.mediaPlayer)
							}
						}else{
							if(!varStrik.searchSongArray(varStrik.mediaPlayer, c.sginfo[0].cod)){
								varStrik.mediaPlayer.push(c.sginfo[0])
								localStorage.mediaPlayer=JSON.stringify(varStrik.mediaPlayer)
							}
						}
						localStorage.lpSongPosition=varStrik.mediaPlayer.length-1;
						c.sginfo[0].lp=nodateg.lp
						// if(gloVar) gloVar.mainWind=true;
						notifi.emit('openPlayer', {//envia la canción y al información a los reproductores
							sginfo: c.sginfo[0],
							dj: sessionStorage.player,
							opt: 1
						})
					}
				}
			})
		}else{
			notifi.emit('openPlayer', {user: localStorage.nick.toLowerCase(),	data: nodateg,opt: 15}, function(c){
				if(c.wind)
					window.open('/player/?sg='+nodateg.codito+'&user='+localStorage.nick);
				else
					notifi.emit('openPlayer', {user: localStorage.nick.toLowerCase(),	infoSg: JSON.parse(nodateg.infosg||nodateg.infos),cod: nodateg.codito,opt: 16})
			})
		}
	}
}
function showMsc(){
	musicVary.startPlayer(this.dataset)
}
window.onload = function() {
	// console.log("jsfs gkseurg")
};
document.onreadystatechange = function() {
	if (document.readyState == "interactive") {
		// console.log("jsgfkushgiseg")
	}
	if (document.readyState == "complete") {
		// console.log("buuuuuuu")
	}
};
document.addEventListener('DOMContentLoaded', function(){

	chatVar.events()
	tmplates.updateChatTime()
	chatHist.on('sendFileChat', fileChat.reciveFileChat)
	chatHist.on('sendFileChat:'+localStorage.nick, fileChat.reciveFileChat)
	notifi.on('reconnect'+localStorage.nick, data=>{
		clearTimeout(chatVar.data.conn)
		notifi.emit('enterRoom')
	});
	notifi.on('media_DJ', nextSong);
	if(sessionStorage.player) {
		notifi.emit('openPlayer', {
			wind: sessionStorage.player,
			opener: {nick:localStorage.nick.toLowerCase()},
			opt: 2
		});
		notifi.on(localStorage.nick+"_"+sessionStorage.player, function(b) {
			htmPlayer()
		})
	}
	chatHist.on('close:'+localStorage.nick, chatVar.logic.closeChatRemoveUser);
	notifi.on('leave'+localStorage.nick, leave);
	notifi.on('notific_user_'+localStorage.nick, notification);
	chatHist.on('chatValy'+localStorage.nick, clearTime);
	chatHist.on('typing', notiChat);
	chatHist.on('readMsg', listen);
	notifi.on('notific1', TMChange);



	chatVar.logic.onSockets
	window.addEventListener('popstate', event=>{
		console.log(event.state)
		tmplates.prepareDMHistory(event.state)
	});
	
	si('.chat', elem=>{
		prepareChats(elem)
	})
	// chatHist.emit('openChat', localStorage.user, openChat);
	// redirectUser();
	
	// chatHist.on('sendFileChat3'+localStorage.nick, builtFile);
	// chatHist.on('sendFileChat'+localStorage.nick, confirm);
	sessionStorage.removeItem('bandera');
	sessionStorage.removeItem('titilar');
	sessionStorage.removeItem('nick');
	if(se('.clean')){
		$('.clean').serchNick('@');
		$('.clean').searchSong('&')
	}
	if(se('#design'))
		userGlobal = se('#design').dataset.tag.substr(5), userNick = se('#design').dataset.nick;
	window.addEventListener('blur', function() {
		inFona = true
	});
	window.addEventListener('focus', function() {
		inFona = false
	});
	if(se('title'))
		tituloPage=se('title').textContent
});
var domChats = {}, domChatsArray = [];



function slidedow() {
	images(this.dataset.media, this.dataset.story)
}

function GNGN(){
	//crear nueva historia, ahi que areglar
	if(se('#NewHistory')){
		se('#NewHistory').addEventListener('dragover', fileOverNewHistory, false);
		se('#NewHistory').addEventListener('drop', createFIleHistory, false);
		se('.Compl_comment>div:first-child>input').addEventListener('change', createFIleHistory2, false);
		si('#NewHistory .ss-new-history', elem=>{
			elem.addEventListener('paste', varStrik.editPaste)
		})
	}

	if(!varStrik.data.eventGNG){
		varStrik.data.eventGNG=true



		$('body').on('click', '.chat .imgDecode, .imgDecode',clickImgChat)
		$('body').on('click', '#closeSession, .closeSessionResposnive',varStrik.closeSession)
		$('body').on('submit', '#NewHistory',newHistory)

		$('body').on('keyup', 'section.contentAll li.busr>input, .searching',varStrik.searchUser)
		$('body').on('focus', 'section.contentAll li.busr>input, .searching',varStrik.shoeSaerch)
		$('body').on('blur', 'section.contentAll li.busr>input, .searching',varStrik.hideSaerch)

		$('body').on('click', '.ss-home',varStrik.router.domHome)
		$('body').on('click', 'section.contentAll li.busr>span, .searching',varStrik.anima.showNav)

		$('body').on('click', '.button[data-foll][data-dass]', foller)
		$('body').on('click', '.userCount', varStrik.router.domVisit)
		$('body').on('click', 'span[data-likehis], span[data-nolikehis], span[data-share], .previw-head>.likesPrevi',GNG)
	
		$('body').on('click', 'span[data-resp]',respuesta)
		$('body').on('click', 'span[data-deleteh]',GNG)
		$('body').on('click', '.imageTM, article.bookTM>div, .bookPreviewWindow>div',showVI)

		$('body').on('click', 'article.youtubeTM',youtubeTM)
		$('body').on('click', 'article.vimeoTM',vimeoTM)
		$('body').on('click', 'article.vineTM',vineTM)
		$('body').on('click', '.music-box',showMsc)
		$('body').on('contextmenu', 'article.MusicTM>div',varStrik.rightClick.main)


	}
	aparecer('#comentPho .images', 'div')
	// $('body').prepend(html.fileShareChat({src:'ytsvwebrfgresg', video: true}))
}


function vineTM() {
	var b = this;
	var e = document.createElement('iframe'),
		f = aleatorio(1, 100000);
	e.src = b.dataset.embed;
	var c = b.dataset.dimention;
	c = c.split('_');
	e.className = 'vine-embed';
	e.setAttribute('allowFullScreen', '');
	b.parentNode.insertBefore(e, b);
	b.remove();
}
function vimeoTM() {
	var b=this,
		iframe=document.createElement('iframe'),
		a=aleatorio(1, 100000),
		content=b.parentNode;
	iframe.src = b.dataset.embed;
	iframe.id ='meo'+ b.dataset.idembed;
	iframe.className = 'mediaVimeo';
	iframe.setAttribute('allowFullScreen', '');
	embedVimeoTM(iframe, b, (elem)=>{
		content.insertBefore(elem, iframe);
		iframe.remove()
	})
}

function embedVimeoTM(iframe, thumb, cb) {
	thumb.parentNode.insertBefore(iframe, thumb);
	thumb.remove();
	var player = new Vimeo.Player(iframe,{width:thumb.offsetWidth});
	player.on('play',()=>{
		console.log('inicio el video')
	});
	player.on('ended',()=>{
		cb(thumb)
	})
}

function youtubeTM() {
	var b = this;
	var a = aleatorio(1, 100000),
		c = b.parentNode;
	b.nextSibling.dataset.pstn=a;
	this.id='mediaYoutube'+a;
	this.dataset.tm='';
	youtubeApi2({
		id: b.dataset.id,
		payer: 'mediaYoutube'+a,
		width: (se('article[data-tm]')||se('div.posting>div[data-opt="history"]')).previousSibling.offsetWidth - 50
	}, function(e) {
		$('#mediaYoutube'+a).remove();
		b.id='';
		c.insertBefore(b, se('#post>section:nth-child(2)>article[data-pstn="'+a+'"]'))
	});
}

function youtubeApi2(data, cb) {
	console.log(data)
	var playerY;
	function runAPiYoutube() {
		playerY=new YT.Player(data.payer, {
			width: data.width,
			height: data.width/1.76,
			videoId: data.id,
			playerVars: {autoplay: 1, controls: 0, autohide:1, wmode:'opaque' },
			events: {
				onReady: ready,
				onStateChange: changes
			}
		})
	}
	runAPiYoutube();
	function ready(h) {
		// console.log('hola como estas :D')
	}
	function changes(h){
		if(h.data===0)
			cb(true)
	}
}



function difundir() {
	if (se("#share>span") !== null) {
		si("#share>span", function(a) {
			a.addEventListener("click", share, false)
		})
	}
}

function opctioHistory() {
	GNGN();
	// difundir();
	si("#post>section:nth-child(2)>article:nth-child(2)>span", function(a) {
		a.addEventListener("click", perfilPreview2, false)
	});
	si("a#imgUrl", function(a) {
		a.addEventListener("click", imgUrlShow, false)
	})
}
function respuesta(){
	var a=this.dataset.resp, textField=this,
		c='<div class="response">'+
			'</div>'+
			'<section id="andrea">'+
				`<form>`+
					`<textarea id="alejo" type="text" name="" data-message="${a.substring(5)}" placeholder="Escribe tu respuesta..." class="ssssss"  autofocus></textarea>`+
					`<button type="submit" class="ss-button-success icon-reply-3">Responder</button><span class="county" data-count="${varStrik.limitHistoryText}">${varStrik.limitHistoryText}</span>`+
				`</form>`+
			'</section>'
	if($('.'+a+'rgab').css('display')==='none'){
		se('.'+a+'rgab').innerHTML=c;
		chatHist.emit('rspHist', {history: a}, function(e){
			respDom(e)
			textField.value=''
			if(se('#alejo[data-message="'+a.substring(5)+'"]'))
				se('#alejo[data-message="'+a.substring(5)+'"]').focus()
		})
		let elemi=`.${a}rgab #andrea #alejo`
		if(se(elemi)){
			let $inputor=$(elemi)
			.atwho(varStrik.settingTagging)
			.atwho(varStrik.settingEmojis)
			$inputor.caret('pos', 47)
			$inputor.focus().atwho('run')
		}

		se(`.${a}rgab form`).addEventListener('submit', varStrik.newReply, false)
		se(`.${a}rgab #alejo`).addEventListener('keyup', varStrik.countText, false)
	}
	$(`.${a}rgab`).slideToggle(500)
}
function publicidad() {
	setInterval(function() {
		var b=Math.floor((Math.random()*10)+1);
		se("#publicidad > img").src = "./public/pubicidad/hola"+b+".gif"
	}, 60000);
	$("#publicidad").load()
}

function changeBg(a) {
	$(".buscarNick>li").css({
		background: "none",
		color: "#fff"
	});
	se('.buscarNick>li[data-tabindex="'+a+'"]').style.background="#9EA6FF";
	se('.buscarNick>li[data-tabindex="'+a+'"]').style.color="#000"
}

function leave(b) {
	notifi.emit("enterRoom", localStorage)
}
notifi.on('connect', function(){
	chatVar.logic.onSockets();
	userGlobal=localStorage.user, userNick=localStorage.nick;
	notifi.emit('enterRoom')
});

function startNotific(b) {
	if (b.length > 0) {
		b.forEach(function(c, a) {
			notification({
				type: c
			})
		})
	}
}

function soundNoti(b){
	if(!se('body>audio'))
		$('body').append('<audio autoplay><source src="'+(b||'/public/sounds/notification.wav')+'" type="audio/ogg">Your browser does not support the audio element.</audio>')
	else
		se('body>audio').src=b||'/public/sounds/notification.wav'
}
function showNotificationResponsive(tag){
	let elem=se(`${tag}`)
	if(elem){
		elem.classList.add('fixed-notification')
		if(si('.minLeftBarResponsive>*'))
			se('.minLeftBarResponsive').insertBefore(elem, se('.minLeftBarResponsive>*'))
		else
			se('.minLeftBarResponsive').appendChild(elem)
	}
}
function notification(b){
	if(b.type===1){
		gustaNoGustaDom(b);
		si('.iconNotification.gustar', elem=>{
			elem.dataset.alert='on';
			elem.classList.add('icon-info')
		})
		showNotificationResponsive('.leftBarResponsive .iconNotification.gustar')
		if(inFona){
			soundNoti();
			if (b.userNick){
				notifyMe({
					body: "@"+b.userNick+" le ha dado me gusta a tu historia",
					icon: b.userImg,
					dir: "ltr"
				})
			}
		}
	}else if(b.type===2){
		si('.iconNotification.no_gusta', elem=>{
			elem.dataset.alert = 'on';
			elem.classList.add('icon-info')
		})
		showNotificationResponsive('.leftBarResponsive .iconNotification.no_gusta')
		gustaNoGustaDom(b);
		if(inFona){
			soundNoti();
			if (b.userNick) {
				notifyMe({
					body: "@"+b.userNick+" no le ha gustado una historia tuya",
					icon: b.userImg,
					dir: "ltr"
				})
			}
		}
	} else if(b.type===4){
		si('.iconNotification.mencion', elem=>{
			elem.dataset.alert='on';
			elem.classList.add('icon-info')
		})
		showNotificationResponsive('.leftBarResponsive .iconNotification.mencion')
		if(inFona) {
			soundNoti();
			if (b.userNick) {
				notifyMe({
					body: "@"+b.userNick+" te ha mencionado en una historia :D",
					icon: b.userImg,
					dir: "ltr"
				})
			}
		}
	}else if(b.type===5){
		respDom(b);
		si('.iconNotification.respuesta_2', elem=>{
			elem.dataset.alert = "on";
			elem.classList.add('icon-info')
		})
		showNotificationResponsive('.leftBarResponsive .iconNotification.respuesta_2')
		if(inFona){
			soundNoti();
			if(b.userNick){
				notifyMe({
					body: "@"+b.userNick+" ha enviado una respuesta!!",
					icon: b.userImg,
					dir: "ltr"
				});
			}
		}
	}else if(b.type===6){
		si('.iconNotification.seguidores', elem=>{
			elem.dataset.alert = "on";
			elem.classList.add('icon-info')
		})
		showNotificationResponsive('.leftBarResponsive .iconNotification.seguidores')
		if (inFona) {
			soundNoti();
			if (b.userNick) {
				notifyMe({
					body: "@"+b.userNick+" Te esta siguiendo!!",
					icon: b.userImg,
					dir: "ltr"
				})
			}
		}
	}else if(b.type===45){
		deleteRespues(b)
	}
}
function addtagConnect(data){
	if(!se('.connect [data-myme="58745812'+data.us+'"]'))
		appendConnecters([data]);
	if(!se('.-as-connects [data-myme="58745812'+data.us+'"]'))
		appendConnecters([data]);
}
function gustaNoGustaDom(b){
	if(b.resph){
		if(se('.visorImg .-comnet-reply')){//visor img
			if(se(`#like_${b.resph}>strong`))
				si(`#like_${b.resph}>srong`, elem=>{
					elem.textContent=b.cant2===0?'':b.cant2;
				});
			if(se(`#nolik${b.resph}>strong`))
				si(`#nolik${b.resph}>strong`, elem=>{
					elem.textContent=b.cant===0?'': b.cant;
				});
		}else{
			if(se(`#like_${b.resph}>strong`))
				si(`#like_${b.resph}>strong`, elem=>{
					elem.textContent=(b.cant2===0?'': b.cant2);
				});
			if(se(`#nolik${b.resph}>strong`))
				si(`#nolik${b.resph}>strong`, elem=>{
					elem.textContent=b.cant||'';
				});
		}
	}else{// en la ventana de notificaiones y timeline
		if(se(`[data-likehis="${b.node}"]`)){
			si(`[data-likehis="${b.node}"]>strong`, elem=>{
				elem.textContent=(!b.cant2?'':' '+b.cant2);
			});
			if(b.type===1)
				si(`[data-likehis="${b.node}"]>i`, elem=>{
					elem.classList.add('clickActions')
					setTimeout(()=>{ elem.classList.remove('clickActions')},1000)
				});
		}
		if(se(`[data-nolikehis="${b.node}"]`)){
			si(`[data-nolikehis="${b.node}"]>strong`, elem=>{
				elem.textContent=(!b.cant?'': ' '+b.cant);
			});
			if(b.type===2)
				si(`[data-nolikehis="${b.node}"]>i`, elem=>{
					elem.classList.add('clickActions')
					setTimeout(()=>{ elem.classList.remove('clickActions')},1000)
				});
		}
	}
}
function showHsitoryDOM(a){
	function part2(){
		$('.POST'+a.histo).css({'display':'none'});
		$('.POST'+a.histo).slideDown(500);
		opctioHistory();
	}
	if(se('.subody_2'))
		home.templates.tmplHistory(a.dom).then(res=>{
			$('.subody_2').prepend(res);
			part2()
		}).catch(err=>{
			console.log(err)
		})
	if(se('.posters')){
		visit.templates.tmplHsitoryVisit(a.dom).then(res=>{
			$('article.posters').prepend(res);
			part2()
		}).catch(err=>{
			console.log(err)
		})
	}
}
function TMChange(b){
	if(b.type===1){
		gustaNoGustaDom(b)
	}else if(b.type===2)
		gustaNoGustaDom(b);
	else if(b.type===45){
		deleteRespues(b)
	}else if(b.type===3){
		showHsitoryDOM(b);
	} else if(b.type===4)
			console.log("hola svs")
	else if(b.type===46){//desconectado
		if(typeof(main)!=='undefined')
			main.logic.alertNewDisconnect(b)
		if(se('.connect [data-myme="58745812'+b.us+'"]'))
			se('.connect [data-myme="58745812'+b.us+'"]').remove();
		if(se('.-as-connects [data-myme="58745812'+b.us+'"]'))
			se('.-as-connects [data-myme="58745812'+b.us+'"]').remove();
		si('.'+b.nick+b.us+'>article>article>div>section.exter>article:nth-child(2)>div', elem=>{
			elem.dataset.disconect=1;
		});
		var queryNode='.'+b.nick+b.us;
		if(se(queryNode))
			emitConecDisconnectUser(b, false)
	}else if(b.type===47){//conectado
		if(typeof(main)!=='undefined')
			main.logic.alertNewConnect(b)
		addtagConnect(b);
		si('.'+b.nick+b.us+'>article>article>div>section.exter>article:nth-child(2)>div', elem=>{
			elem.dataset.disconect=0
		});
		var queryNode='.'+b.nick+b.us;
		if(se(queryNode))
			emitConecDisconnectUser(b, true)
	} else if(b.type===5){
		respDom(b)
	}
}
function emitConecDisconnectUser(info, conn){
	var queryNode='.'+info.nick+info.us;
	if(se(queryNode+' section.exter[data-nick="'+info.nick+'"] article')){
		var pDir=se(queryNode+' section.exter[data-nick="'+info.nick+'"] article').dataset.img
		si(queryNode+' .optChat section.msgchat', function(elem){
			elem.querySelector('.pDir').style.background=pDir
			if(conn){
				elem.querySelector('article[data-msg]>div>span').innerHTML='';
				elem.style.opacity=0;
				elem.style.visibility='hidden';
			}
			else{
				elem.querySelector('article[data-msg]>div>span').innerHTML='Desconectado ✈';
				elem.style.opacity=1;
				elem.style.visibility='visible';
			}
		})
	}
}
var cont2 = 0;
(function(a) {
	a.fn.serchNick = function(b) {
		var e = 0,
			c = "";
		a(this).on({
			keypress: function(h) {
				var g = h.which,
				tecla = String.fromCharCode(g).toLowerCase(), event2 = h, letras = b;
				tag = a(this), node = a(this).attr("class");
				if (g === 32) {
					pruevita = "";
					e = 0;
					a(".buscarNick").remove();
					se("."+node).removeEventListener("keydown", prevenir, false)
				}
				if (typeof(pruevita) === "number") {
					if (se(".buscarNick") === null) {
						a(this).focus().after('<ul class="buscarNick"></ul>')
					}
					var f = a(this).val().substring(pruevita+1);
					if (g === 13) {
						event2.preventDefault()
					}
					chatHist.emit("serachNick", {
						vals: f
					}, function(i) {
						se("."+node).addEventListener("keydown", prevenir, false);
						num = i.end;
						if (i.dom !== undefined) {
							se(".buscarNick").innerHTML = i.dom;
							if (g === 8) {
								if (se("."+node).value.length < pruevita) {
									pruevita = "";
									a(".buscarNick").remove()
								}
							}
						} else {
							a(".buscarNick").remove();
							se("."+node).removeEventListener("keydown", prevenir, false)
						} if (se(".buscarNick>li") !== null) {
							si(".buscarNick>li", function(j) {
								j.addEventListener("click", function() {
									se("."+node).value = se("."+node).value.substring(0, pruevita)+" @"+this.dataset.result+" ";
									a(".buscarNick").remove();
									cont2 = 0;
									pruevita = ""
								}, false)
							})
						}
					})
				}
			}
		})
	}
})(jQuery);

function prevenir(a) {
	if (a.which === 38) {
		a.preventDefault()
	}
	if (a.which == 13) {
		a.preventDefault()
	}
	if (a.which === 8) {
		if (se(".clean").value.length < pruevita+2) {
			pruevita = "";
			$(".buscarNick").remove()
		}
	}
	if (a.which == 13) {
		se("."+node).removeEventListener("keydown", prevenir, false);
		se("."+node).value = se("."+node).value.substring(0, pruevita)+" @"+se('.buscarNick>li[data-tabindex="'+cont2+'"]').dataset.result+" ";
		$(".buscarNick").remove();
		cont2 = 0;
		pruevita = "";
	}
	if (a.which === 40) {
		if (cont2 < num) {
			if (cont2 >= 1) {
				cont2 += 1;
				if (se('.buscarNick>li[data-tabindex="'+cont2+'"]') !== null) {
					changeBg(cont2)
				}
			} else {
				cont2 = 1;
				if (se('.buscarNick>li[data-tabindex="'+cont2+'"]') !== null) {
					changeBg(cont2)
				}
			}
		} else {
			cont2 = num;
			if (se('.buscarNick>li[data-tabindex="'+cont2+'"]') !== null) {
				changeBg(cont2)
			}
		}
	}
	if (a.which === 38) {
		if (cont2 > 1) {
			cont2 -= 1;
			if (se('.buscarNick>li[data-tabindex="'+cont2+'"]') !== null) {
				changeBg(cont2)
			}
		} else {
			cont2 = 1;
			if (se('.buscarNick>li[data-tabindex="'+cont2+'"]') !== null) {
				changeBg(cont2)
			}
		}
	}
}

function prevenir21(a) {
	if (event.which === 38) {
		event.preventDefault()
	}
	if (event.which == 13) {
		event.preventDefault()
	}
	if (event.which === 8) {
		if (se("."+node).value.length < NoAjaxs[0]+2) {
			NoAjaxs[0] = "";
			$(".buscarNick").remove()
		}
	}
	if (event.which == 13) {
		se("."+node).removeEventListener("keydown", prevenir21, false);
		se("."+node).value = se("."+node).value.substring(0, NoAjaxs[0])+" &"+se('.buscarNick>li[data-tabindex="'+cont2+'"]').dataset.result+" ";
		$(".buscarNick").remove();
		cont2 = 0;
		soundNoti("..");
		NoAjaxs[0] = "";
	}
	if (event.which === 40) {
		if (cont2 < num) {
			if (cont2 >= 1) {
				cont2 += 1;
				if (se('.buscarNick>li[data-tabindex="'+cont2+'"]') !== null) {
					changeBg(cont2);
					soundNoti(se('.buscarNick>li[data-tabindex="'+cont2+'"]').dataset.file)
				}
			} else {
				cont2 = 1;
				if (se('.buscarNick>li[data-tabindex="'+cont2+'"]') !== null) {
					changeBg(cont2);
					soundNoti(se('.buscarNick>li[data-tabindex="'+cont2+'"]').dataset.file)
				}
			}
		} else {
			cont2 = num;
			if (se('.buscarNick>li[data-tabindex="'+cont2+'"]') !== null) {
				changeBg(cont2);
				soundNoti(se('.buscarNick>li[data-tabindex="'+cont2+'"]').dataset)
			}
		}
	}
	if (event.which === 38) {
		if (cont2 > 1) {
			cont2 -= 1;
			if (se('.buscarNick>li[data-tabindex="'+cont2+'"]') !== null) {
				soundNoti(se('.buscarNick>li[data-tabindex="'+cont2+'"]').dataset.file);
				changeBg(cont2)
			}
		} else {
			cont2 = 1;
			if (se('.buscarNick>li[data-tabindex="'+cont2+'"]') !== null) {
				soundNoti(se('.buscarNick>li[data-tabindex="'+cont2+'"]').dataset.file);
				changeBg(cont2)
			}
		}
	}
}
function readed(b) {
	var a = this;
	se(".user_"+String(a.dataset.user).substring(12)+">h1").dataset.titilar = false
}

function intervals(a) {
	sessionStorage.titilar = "a";
	var b = se(a);
	if ($(b).css("display") === "block") {
		openPrompt();
		window.setTimeout("intervals('"+a+"');", 360000)
	} else {
		sessionStorage.removeItem("titilar")
	}
}

function Titilar(a) {
	var b = se(".user_"+a+">h1");
	if (b !== null) {
		if (b.dataset.titilar === "") {
			if (b.style.textShadow === "rgb(255, 255, 255) 0px 0px 8px" || b.style.textShadow === "0px 0px 8px rgb(255, 255, 255)") {
				b.style.textShadow = "#000 0px 0px 8px"
			} else {
				b.style.textShadow = "0 0 8px #fff"
			}
			window.setTimeout("Titilar('"+a+"');", 300)
		}
	}
};
