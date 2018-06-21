'user strict'

function clickVisitimg(e){
	e.preventDefault();
	var a=($(document).width()*76) / 100;
	visorPhoto(this.dataset.seru, a, this.dataset.alto, this.dataset.ancho, this.dataset.book, $(this), this.dataset.media);
}
function dmImg(data){
	return'<a href="/Pic_'+data.Fcod+'M8745'+data.Ucod+'M81'+data.cod+'" data-seru="'+data.Ucod+'" data-book="81'+data.cod+'" data-alto="'+data.heigth+'" data-ancho="'+data.width+'" data-url="'+data.dir+'" data-media="Pic_'+data.Fcod+'" data-thumbs="">'+
		'<img src="'+data.dir.replace('fotos/', 'fotos/T_')+'" alt="">'+
	'</a>';
}
function loadImgs(us){
	if(!se('.-opt-images-cont')){
		if(!se('.-opt-images>article.-opt-images-cont')){
			var articleImg=document.createElement('article');
			articleImg.className='-opt-images-cont';
			se('.-opt-images').appendChild(articleImg);
		}
	
		si('.-opt-images>header>span[data-opt]', elem=>{
			elem.dataset.select=0
		});
		se('.-opt-images>header>span[data-opt="0"]').dataset.select=1;
		if(se('.-opt-images>article.-opt-images-books'))
			se('.-opt-images>article.-opt-images-books').remove();
		if(boot.logic.responsive({width:true})&&$('article.posters').css('display')==='none')
			si('article.posters', elem=>{
				elem.style.display='none';
			});
		else
			si('article.posters', elem=>{
				elem.style.display='block';
			});
		if(se('.-opt-imgBook-posting')){
			se('article.-opt-imgBook-posting').remove();
			GNGN();
		}
		let numy=30;
		function clickMoreImage(){
			let contentImg=this
			if((contentImg.scrollTop+contentImg.clientHeight+200)>contentImg.scrollHeight){
				if(!visit.data.chekedImg){
					visit.data.chekedImg=true
					$('.-opt-images>article.-opt-images-cont')
					.append(`<span class="loadsIcon">
					${boot.templates.threePointSpin()}
					<span class="textLoadinggg">Cargando imágenes...</span></span>`);
					loopImgsVisit(visit.data.loadImg);
				}
			}
		}
		se('.-opt-images-cont').addEventListener('scroll', clickMoreImage, false)
		function loopImgsVisit(data){
			function runArray(arr){
				if(se('.-opt-images-cont .loadsIcon')) se('.-opt-images-cont .loadsIcon').remove();
				if(arr.length){
					visit.data.chekedImg=false
					$('.-opt-images>article.-opt-images-cont').append(arr.map(val=>dmImg(val)).join(''))
					visit.data.loadImg.lmt1+=visit.data.loadImg.lmt2
				}
			}
			chatHist.emit('loadMedias', data, runArray);
		}
		visit.data.loadImg={
			us: us,
			lmt1: 0,
			lmt2: 30,
			opt:0
		}
		loopImgsVisit(visit.data.loadImg);
	}
}
var book={
	data:{
		fiiles:0,
		inputFilesArray:[],
		permi:false,
		edi:false
	},
	init:()=>{
		book.events()
	},
	templates:{
		domImgCalledOfBooks:data=> '<a href="/Pic_'+data.cod+'M8745'+data.suer+'M81'+data.libro+'" class="-opt-imgCalledBook animated pulse" data-media="Pic_'+data.cod+'" data-url="'+data.nombre+'" data-book="81'+data.libro+'" data-seru="'+data.suer+'" data-ancho="'+data.width+'" data-alto="'+data.heigth+'">'+
				'<i class="-opt-delete-img icon-trash"></i>'+
				'<img src="'+data.nombre.replace('fotos/', 'fotos/T_')+'" alt="'+data.name+'">'+
			'</a>',
		loopCallImages:data=>'<article data-book="'+data.cod+'" class="-opt-imgBook-posting">'+
				'<h2>'+data.name+'</h2>'+
				'<button class="ss-button-primary hidden">Guardar</button>'+
				'<div class="-opt-book-heaedr">'+
					'<i data-icon="setting" class="icon-cog-2"></i>'+
					'<ul class="-opt-book-hide-setting hidden-box">'+
						'<li data-opt="0">Editar nombre</li>'+
						'<li data-opt="1">Eliminar Fotos</li>'+
						'<li data-opt="2">Agregar usuario</li>'+
						'<li data-opt="3">Agregar imagenes</li>'+
						'<li data-opt="4">Cambiar permisos</li>'+
						'<li data-opt="5">Eliminar Libro</li>'+
						'<li data-opt="6">Compartir libro</li>'+
					'</ul>'+
					'<i data-icon="close"></i>'+
				'</div>'+
			'</article>',
		loadThreePoints: data=>`<span class="loadsIcon">
			<div class="loader loader-3 cionLoad">
				<div class="dot dot1"></div>
				<div class="dot dot2"></div>
				<div class="dot dot3"></div>
			</div>
			<span class="textLoadinggg">${data.msg}</span></span>`,
		newBook: '<i class="close" data-icon="close"></i>'+
			'<h2>Nuevo Libro</h2>'+
			'<input type="text"class="uniquetext" placeholder="Nombre del libro">'+
			'<strong>Publicarlo para</strong>'+
			'<div class="-opt-optio-permis -opt-permiss">'+
				'<span data-select="0" data-val="1">Solo yo</span><span data-select="0" data-val="2">Amigos</span><span data-select="0" data-val="3">Seguidores</span><span data-select="0" data-val="4">Todos</span>'+
			'</div>'+
			'<strong>Opciones de edición</strong>'+
			'<div class="-opt-optio-permis -opt-edit">'+
				'<span data-select="0" data-val="0">Solo yo</span><span data-select="0" data-val="1">Los que agregue</span>'+
			'</div>'+
			'<div class="dropfiles">'+
				'<span class="-buton-book-upload">Buscar las imágenes'+
					'<input name="fl_addbook[]" multiple="" required="" type="file" />'+
				'</span>'+
				'<span data-disable="true" class="-buton-book-upload -opt-uploadimg-now">Subir las imágenes</span>'+
				'<h3>Suelta aca las imágenes</h3>'+
			'</div>',
		addUserBook:'<article class="-opt-popup">'+
				'<div class="-add-user-book">'+
				'<i class="icon iconabsolute close"></i>'+
				'<h3>Agregar usuario al libro</h3>'+
				'<input type="text" placeholder="Nombre o nick">'+
				'<i class="addbutton icon-plus-1"></i>'+
				'<div class="-privilegies-book-userAdd">'+
					'<strong>Privilegios de usuario</strong>'+
					'<div>'+
						'<div data-typecod="2" data-type="El socio!" title="Puede subir, eliminar y ver fotos">El socio!</div>'+
						'<div data-typecod="3" data-type="Manager" title="Solo puede subir y ver fotos">Manager</div>'+
						'<div data-typecod="4" data-type="Mi perro" title="Este libro aparece en sus fotos">Mi perro!!</div>'+
					'</div>'+
					'<div class="-opt-add-user-icon"></div>'+
				'</div>'+
				'<div class="-opt-users-adds">'+
					'<div class="-opt-result-user" data-hide="1"></div>'+
				'</div></div>'+
			'</article>',
		addUserBookLister:data=>`<i class="-opt-userIcon" data-delete="1" data-privi="${data.editar}" data-uss="${data.Ucod}" data-nick="${data.nick}" title="${data.nick}" style="background-image: url(${data.pDir});"><i></i></i>`,
		addImgBook:'<i data-icon="close" title="Cerrar"></i><h3>Suelta aquí las imagenes</h3>'+
				'<span class="-buton-book-upload">Escojer imagenes'+
				'<input name="fl_addbook[]" multiple="" required="" type="file">'+
				'</span>'+
				'<article class="-opt-show-upload-img">'+
			'</article>',
		changePermiss:'<article class="-opt-popup">'+
				'<div class="-add-user-book">'+
				'<i class="icon iconabsolute close"></i>'+
				'<h3 title="Son la personas que pueden ver las imagenes del libro">Personas que pueden ver las imágenes</h3>'+
				'<div class="-opt-optio-permis -opt-permiss">'+
					'<span data-select="0" data-val="1">Solo yo</span><span data-select="0" data-val="2">Amigos</span><span data-select="0" data-val="3">Seguidores</span><span data-select="0" data-val="4">Todos</span>'+
					'<div class="-opt-resp-permiss">.</div>'+
				'</div>'+
				'<h3 title="Si los usuarios agregados al libro pueden editar cosas en el este">Edición</h3>'+
				'<div class="-opt-optio-permis -opt-edit">'+
					'<span data-select="0" data-val="0">Solo yo</span><span data-select="0" data-val="1">Los que agregue</span>'+
					'<div class="-opt-resp-edit">.</div>'+
				'</div>'+
			'</article>',
		deleteBook:'<article class="-opt-popup">'+
						'<div class="-add-user-book">'+
						'<i class="icon iconabsolute close"></i>'+
						'<h3 title="Piensalo bien">Estas totalmente seguro de Eliminar el Libro <i></i></h3>'+
						'<span data-val="1" class="-opt-delete-book icon-trash ss-button-primary">Seguro</span><span data-val="0" class="-opt-delete-book icon-cancel ss-button-cancel">Cancelar</span>'+
					'</article>',
		windowShareUrlBook:data=>`<div class="ss-dummi ss-share-url-dummi"></div>
			<article class="ss-share-url animated ss-window-pop">
				<i class="ss-close-icon icon-cancel-2"></i>
				<h3>Compartir el link de libro</h3>
				<p class="textMsg">Solo tienes que darle clic en el botón copiar y después pegalo en tus otras redes sociales para que más personas puedan verlo 😉</p>
				<div class="ss-row">
					<input type="text" class="ss-content-url" value="${consts.domain}/book/u=${se('.-opt-images-books>*:nth-child(2)').dataset.suer}&b=${se('.-opt-imgBook-posting').dataset.book}"/>
				</div>
				<div class="ss-row">
					<span class="ss-button-primary icon-tags">Copiar el link</span>
				</div>
			</article>`

	},
	events:()=>{
		console.log('jjeje ya ta')
		if(!globals.book.oneTime){
			globals.book.oneTime=true
			$('body').on('click', '.hidden-box>li',book.logic.optClikedSetting)
			$('body').on('click', 'div.-opt-menu-new-book',book.logic.newBookDm)
			$('body').on('click', '.-opt-uploadimg-now',book.logic.clickToUploadNewBook);
			$('body').on('click', 'article.-opt-posting-newBook>.close',visit.logic.closes,false)
			$('body').on('click', '.dropfiles .beforeUpload', book.logic.removeImgUp)
			$('body').on('click', '.showDragger>.ss-close-icon', book.logic.closeAlertDrop)
			$('body').on('click', '.-opt-imgCalledBook',book.logic.clickVisitimgBook)
			$('body').on('click','i.-opt-userIcon[data-delete]',book.logic.deleteUser)
			$('body').on('click','.ss-share-url .ss-button-primary',book.logic.copyUrlBook)
			$('body').on('click','.ss-share-url-dummi, .ss-close-icon',book.logic.closeWindowShareUrlBook)
		}
		if(se('.-opt-imgBook-posting'))
			se('.-opt-imgBook-posting').addEventListener('scroll', book.logic.moreImgFromBook,false)
		if(se('.-opt-images-books'))
			se('.-opt-images-books').addEventListener('scroll',book.logic.moreBooks,false)
		if(se('.-opt-images-books>div'))
			si('.-opt-images-books>div', elem=>{
				elem.addEventListener('drop', book.logic.dropImg, false)
			})
		if(se('.-opt-images-books>div'))
			si('.-opt-images-books>div', elem=>{
				elem.addEventListener('dragover', book.logic.dropImgOver, false)
			})
		if(se('.-opt-images-books>div'))
			si('.-opt-images-books>div', elem=>{
				elem.addEventListener('dragleave', book.logic.quitarBorder, false)
			})
		if(se('a.-opt-imgCalledBook'))
			si('a.-opt-imgCalledBook', elem=>{
				elem.addEventListener('dragstart', book.logic.drag, false)
			})
		if(se('a.-opt-imgCalledBook'))
			si('a.-opt-imgCalledBook', elem=>{
				elem.addEventListener('dragend', book.logic.handleDragend, false)
			})
		if(se('div.dropfiles')){
			se('div.dropfiles').addEventListener('dragover', book.logic.handleDragOver, false);
			se('div.dropfiles').addEventListener('drop', book.logic.handleFileSelect, false);
		}
	},
	logic:{
		closeWindowShareUrlBook:()=>{
			se('.ss-share-url').classList.add('bounceOutDown')
			setTimeout(()=>{
				si('.ss-share-url, .ss-share-url-dummi', elem=>{
					elem.remove()
				})
			},900)
		},
		copyUrlBook: function(){
			let urlSong=se('.ss-share-url input');
			urlSong.select()
			try{
				let successful=document.execCommand('copy');
				let msg = successful ? 'successful' : 'unsuccessful'
				alertPop({time: 1500,msg:'Copiado correctamente',  err:false})
				book.logic.closeWindowShareUrlBook()
			}catch (err){
				alertPop({time: 4000,msg:'Tu buscador de internet no permite copiar, haslo manualmente',  err:true})
			}
		},
		shareURL: ()=>{
			$('body').append(book.templates.windowShareUrlBook())
		},
		deleteUser:function(){
			var cajaUser=this;
			if(cajaUser.dataset.delete==='1')
				chatHist.emit('loadMedias', {opt: 16, usede: this.dataset.uss, book: se('article.-opt-imgBook-posting').dataset.book}, edel=>{
					if(edel.type===2){
						cajaUser.remove();
						boot.logic.popUpAlert({msg: 'usuario removido correctamente', time:2000})
					}else
						boot.logic.popUpAlert({err:true, msg: edel.res, time: 3000})
				});
			else
				cajaUser.remove();
		},
		removeImgUp:function(ev){
			let boxImg=se(`.dropfiles .beforeUpload[data-position="${this.dataset.position}"]`),
				position=parseInt(this.dataset.position)
			boxImg.classList.add('fadeOut')
			setTimeout(()=>{
				book.data.inputFilesArray.splice(position, 1)
				book.data.fiiles=book.data.inputFilesArray.length;
				boxImg.remove()
			},1000)

		},
		leadFiles:(files, cb)=>{
			let filess=[];
			let len=files.length
			let i=0
			function runTimes(){
				if(i<len){
					filess.push(files[i]);
					selectImageSendChat(files[i], imgbase64=>{
						$('div.dropfiles').append(`<div class="beforeUpload animated fadeIn" data-upload="0" data-position="${si('.dropfiles .beforeUpload')}" style="background-image: url(${imgbase64});" data-img="">`+
							'<div class="ic icon-trash"></div>'+
							'<div role="progressbar"></div>'+
							'</div>');
						i++
						setTimeout(runTimes, 100)
					});
				}else
					cb(filess)
			}
			runTimes()
		},
		validateUpload:()=>{
			if(!se('article.-opt-posting-newBook>input').value)
				se('.-opt-uploadimg-now').dataset.disable=true;
			else if(book.data.fiiles<1)
				se('.-opt-uploadimg-now').dataset.disable=true;
			else if(book.data.permi)
				se('.-opt-uploadimg-now').dataset.disable=false;
			else
				se('.-opt-uploadimg-now').dataset.disable=false;
		},
		validateUploadMsgs:()=>{
			if(book.data.fiiles<1)
				boot.logic.showErrClip({
					elem: `article.-opt-posting-newBook > .dropfiles`,
					type: (boot.logic.responsive({width:true})?'top':'top'),
					msg: 'No has seleccionado ninguna imagen'
				})
			else if(!book.data.permi)
				boot.logic.showErrClip({
					elem: `.-opt-optio-permis.-opt-permiss`,
					type: (boot.logic.responsive({width:true})?'top':'top'),
					msg: 'Selecciona un opción'
				})
			else if(!se('.-opt-posting-newBook input.uniquetext').value)
				boot.logic.showErrClip({
					elem: `.-opt-posting-newBook>h2`, //
					type: (boot.logic.responsive({width:true})?'bottom':'bottom'),
					msg: 'Tienes que ponerle un nombre al libro'
				})
			else
				console.log(book.data.permi)
		}, dmBooksVisit:data=>{
			var timeFor=moment(data.fecha);
			timeFor.locale('es');
			var booky=document.createElement('div');
			booky.dataset.cod=data.cod;
			booky.dataset.name=data.nombre;
			booky.dataset.suer=data.usuario;
			var domi=`<div data-namebook="${data.nombre}">${data.nombre}
					<a href="${consts.domain}/book/u=${data.usuario}&b=${data.cod}" class="ss-new-window icon-popup-2" target="_blank"></a>
					</div>`+
					'<article><div>'
						if(data.images){
							if(data.images.length){
								domi+=data.images.map(val=> `<div class="-opt-images-contentImg">`+
									`<img src="${val.nombre.replace('fotos/', 'fotos/T_')}" alt="">`+
								`</div>`).join('')
							}else
								domi+='<div class="ksgergsrth"> <i class="icon-alert"></i> No tiene imágenes</div>'
						}
					domi+='</div></article>'+
					'<div><span data-cnatf="'+data.cantidadF+'">'+data.cantidadF+' fotos</span>. fecha:'+timeFor.format('DD MMM YYYY')+'</div>';
			booky.innerHTML=domi;
			return booky;
		},uploadImgs:(bookk, imgs)=>{
			se('article.-opt-images-books').insertBefore(book.logic.dmBooksVisit(bookk), se('.-opt-images-books>div[data-cod]'));
			let ii=0;
			function queueSends(){
				if(ii<imgs.length){
					if(imgs[ii]){
						let dato={name: imgs[ii].name, size: imgs[ii].size, nick: localStorage.nick};
						chatHist.emit('ifSize',dato,resa=>{
							if(resa.res===2){
								se('.dropfiles>.beforeUpload[data-position="'+ii+'"][data-upload="0"]').innerHTML=`<div class="kuygsei"><i class="icon-alert"></i><p>Ya esta en fotógena</p></div>`;
								si('.dropfiles>.beforeUpload[data-position="'+ii+'"]', elem=>{
									elem.dataset.upload=1;
								});
								callQuoted()
							}else if(imgs[ii].size<20661){
								se('.dropfiles>.beforeUpload[data-position="'+ii+'"][data-upload="0"]').innerHTML=`<div class="kuygsei"><i class="icon-alert"></i><p>Demaciado pequeña</p></div>`;
								si('.dropfiles>.beforeUpload[data-position="'+ii+'"]', elem=>{
									elem.dataset.upload=1;
								});
								callQuoted()
							}else{
								if(window.FormData){
									var formdata=new FormData();
									if(formdata){
										let boxImg=se('.dropfiles>.beforeUpload[data-position="'+ii+'"][data-upload="0"]')
										selectImageSendChat(imgs[ii], imgbase64=>{
											imgDimention(imgbase64, img=>{
												formdata.append('fl_addbook', imgs[ii]);
												formdata.append('table', bookk.nombre);
												formdata.append('nick', localStorage.nick);
												formdata.append('book', bookk.cod);
												formdata.append('width', img.width);
												formdata.append('height', img.height);
												ajaxHttpRequest(formdata, progres=>{
													let prog=parseInt(Math.round((progres.loaded / progres.total)*100))
													if(boxImg)
														boxImg.querySelector('div[role="progressbar"]').style.width=prog+'%';
												}, resp=>{
													let respy=JSON.parse(resp)
													if(respy.err){
														boot.logic.popUpAlert({msg: 'La imágen que estas intentando subir tiene un problema, intentalo mas tarde', time: 6000})
														boxImg.classList.remove('fadeIn')
														setTimeout(()=>{
															boxImg.classList.add('flash')
															boxImg.classList.add('errUploadImg')
															boxImg.innerHTML='<div class="ic icon-alert"></div>'
														},100)
														setTimeout(callQuoted, 2000)
													}else{
														boxImg.classList.add('fadeOut')
														setTimeout(()=>{
															boxImg.remove()
														},800)
														se('.-opt-images-books>div[data-cod="'+bookk.cod+'"]>div:nth-child(3)>span').dataset.cnatf=ii+1;
														se('.-opt-images-books>div[data-cod="'+bookk.cod+'"]>div:nth-child(3)>span').textContent=(ii+1)+' fotos';
														$('.-opt-images-books>div[data-cod="'+bookk.cod+'"]>article>div').append('<div class="-opt-images-contentImg animated bounceIn">'+
																'<img src="'+imgbase64+'" alt="">'+
															'</div>');
														setTimeout(callQuoted, 1000)
													}
													console.log(resp)
												})
											})
										});
									}else
										errorMsg('Lo sentimos tu navegador es muy antiguo, por favor usa navegadores actualizados como Google Chrome o Fifefox');
								}else
									errorMsg('Lo sentimos tu navegador es muy antiguo, por favor usa navegadores actualizados como Google Chrome o Fifefox');
							}
						});
					}else{
						console.log('la imagen se borro antes se subir')
					}
				}else{

					ii=0;
					boot.logic.popUpAlert({msg: 'Todas las imagenes se han subido con exito', time: 3000})
					visit.logic.closes();
					se('.-opt-images-books>div[data-cod="'+bookk.cod+'"]').click()

					book.data.deleteImg=false;
				}
				function callQuoted(){
					setTimeout(function(){
						ii++;
						queueSends();
					},300);
				}
			}
			queueSends();
		},
		clickToUploadNewBook:function(){
			console.log('jejeje me llamarón ueepa')
			if(this.dataset.disable==='true'){
				boot.logic.popUpAlert({time: 2000,msg:'Alguno campos no estan llenos',err:true})
				book.logic.validateUploadMsgs()
			}else{
				this.dataset.disable=true;
				notifi.emit('loadMedias',{
						permi: se('.-opt-permiss>span[data-select="1"]').dataset.val,
						edit: se('.-opt-edit>span[data-select="1"]').dataset.val,
						opt: 20,
						name: se('article.-opt-posting-newBook>input').value,
						nick: localStorage.nick,
						seru: book.data.user
					}, resp=>{
						if(resp.type===1)
							boot.logic.popUpAlert({err:true, msg: cread.msg, time: 4000})
						else{
							resp.cantidadF=0;
							book.logic.uploadImgs(resp, book.data.inputFilesArray);
						}
				});
			}
		}, closeAlertDrop:()=>{
			if(se('.showDragger'))
				se('.showDragger').remove()
		},handleDragOver:evt=>{
			let boxContent=se('.-opt-posting-newBook>.dropfiles'),
				showDrag=document.createElement('div')
			if(!se('.showDragger>.ss-close-icon')){
				showDrag.className='showDragger'
				boxContent.appendChild(showDrag)
				showDrag.innerHTML='<i class="ss-close-icon icon-cancel"></i><div class="icno-drag icon-plus-1"></div>'
			}
			evt.stopPropagation();
			evt.preventDefault();
			evt.dataTransfer.dropEffect='copy'; // Explicitly show this is a copy.
		},
		handleFileSelect:evt=>{
			evt.stopPropagation();
			evt.preventDefault();
			book.logic.leadFiles(evt.dataTransfer.files, files=>{
				book.data.inputFilesArray=book.data.inputFilesArray.concat(files);
				book.data.fiiles=book.data.inputFilesArray.length;
				book.logic.validateUpload();
			});
			if(se('.dropfiles>.showDragger'))
				se('.dropfiles>.showDragger').remove()
		},
		newBookDm:()=>{
			if(!se('article.-opt-posting-newBook')){
				var newBook=document.createElement('article')
				newBook.className='-opt-posting-newBook';
				newBook.innerHTML=book.templates.newBook;
				se('.mainPost').insertBefore(newBook, se('article.posters'));
				if(se('article.-opt-imgBook-posting'))
					se('article.-opt-imgBook-posting').remove();
				si('article.posters', elem=>{
					elem.style.display='none';
				});
				si('.-opt-permiss>span', elem=>{
					elem.addEventListener('click', function(){
						si('.-opt-permiss>span', elem=>{
							elem.dataset.select=0;
						});
						this.dataset.select=1;
						book.data.permi=true;
						book.logic.validateUpload()
					},false);
				});
				si('.-opt-edit>span', elem=>{
					elem.addEventListener('click', function(){
						si('.-opt-edit>span', elem=>{
							elem.dataset.select=0;
						});
						this.dataset.select=1;
						book.data.edi=true;
						book.logic.validateUpload()
					},false);
				});
				
				se('span.-buton-book-upload>input[type="file"]').addEventListener('change', function(){
					book.logic.leadFiles(this.files, function(files){
						book.data.inputFilesArray=book.data.inputFilesArray.concat(files);
						book.data.fiiles=book.data.inputFilesArray.length;
						book.logic.validateUpload()
					});
				},false);
				se('article.-opt-posting-newBook>input').addEventListener('keyup', function(){
					book.logic.validateUpload();
				},false);
				
				
			}
			book.events()
		},
		moreBooks:function(){
			let contentImg=this
			// if(!boot.logic.responsive({width: true})){
				if(!book.data.noScrollBook)
					if((contentImg.scrollTop+contentImg.clientHeight+200)>contentImg.scrollHeight){
						if(!visit.data.chekedImgBook){
							visit.data.chekedImgBook=true
							book.logic.loopBooks(visit.data.dataBookList);
						}
					}
			// }
		},
		loopBooks:data=>{
			$(`.-opt-images-books`).append(book.templates.loadThreePoints({msg: 'Cargando Libros'}))
			chatHist.emit('loadMedias', data, a=>{
				if(se('.-opt-images-books>.loadsIcon')) se('.-opt-images-books>.loadsIcon').remove()
				visit.data.dataBookList.lmt1+=visit.data.dataBookList.lmt2
				if(a.length)
					a.forEach((val, key)=>{
						se('.-opt-images-books').appendChild(book.logic.dmBooksVisit(val));
						if(a.length===(key+1)){
							visit.data.chekedImgBook=false
						}
					});
			});
		},
		deleteImgs:()=>{
			book.data.deleteImg=true;
			si('i.-opt-delete-img', elem=>{
				elem.style.opacity=1;
				elem.style.visibility='visible';
			});
			if(se('.-finish-delete-img'))
				se('.-finish-delete-img').remove();
			$('article.-opt-imgBook-posting').append('<i class="-finish-delete-img">Deshacer</i>');
			visit.logic.showTimeline()
		},addUserBook:()=>{
			$('article.-opt-imgBook-posting').append(book.templates.addUserBook);
			chatHist.emit('loadMedias', {opt: 15, book: se('article.-opt-imgBook-posting').dataset.book, seru: book.data.user}, udders=>{
				if(udders.length){
					se('.-opt-users-adds').innerHTML=udders.map(val=>book.templates.addUserBookLister(val))
					setTimeout(function(){
						visit.logic.showTimeline();
					},500);
				}else
					setTimeout(function(){
						visit.logic.showTimeline();
					},500);
			})
			function resultDomUser(data){
				return '<article style="background-image: url('+data.bnDir+')" data-imgp="'+data.pDir+'" data-suer="'+data.cod+'" data-nick="'+data.nick+'">'+
					'<img src="'+data.pDir+'" alt=""/>'+
					'<div>'+
						'<span>@'+data.nick+'</span>'+
						'<span>'+data.leyenda+'</span>'+
					'</div>'+
				'</article>';
			}
			function addUserFinish(){
				var users=[];
				si('div.-add-user-book>.-opt-users-adds>i[data-delete="0"]', elem=>{
					users.push({cod:elem.dataset.uss, preivi: elem.dataset.privi})
				});
				if(users.length>0){
					se('div.-add-user-book').innerHTML='<h2>Espera un momento...</h2>';
					console.log('aqui es socio')
					chatHist.emit('loadMedias', {opt: 14, users: users, seru: book.data.user, book: se('article.-opt-imgBook-posting').dataset.book}, c=>{
						boot.logic.popUpAlert({msg: c.res, time: 2000})
						se('article.-opt-popup').remove();
					})
				}else
					errorMsg('Por favor busca los usuarios que vas a agregar', 1, 3000);
			}
			if(se('div.-add-user-book>.addbutton'))
				se('div.-add-user-book>.addbutton').addEventListener('click', addUserFinish,false)
			if(se('div.-add-user-book>.close'))
				se('div.-add-user-book>.close').addEventListener('click', book.logic.closeSubSetting,false)

			function sinNombreXD(){
				var iconUss=se('.-privilegies-book-userAdd i.-opt-userIcon').dataset;
				if(se('.-privilegies-book-userAdd')){
					if(se('.-privilegies-book-userAdd>div:nth-child(3)>i'))
						se('.-privilegies-book-userAdd>div:nth-child(3)>i').remove();
					se('.-privilegies-book-userAdd').style.opacity=0;
					se('.-privilegies-book-userAdd').style.visibility='hidden';
				}
				if(!se('div.-opt-users-adds>i[data-nick="'+iconUss.nick+'"]')){
					$('div.-opt-users-adds').prepend('<i class="-opt-userIcon" data-delete="0" data-privi="'+this.dataset.typecod+'" data-uss="'+iconUss.uss+'" data-nick="'+iconUss.nick+'" title="'+iconUss.nick+'" style="background-image: url('+iconUss.imgp+');"><i></i></i>')
					se('.-opt-result-user').dataset.hide=1;
					si('div.-opt-result-user>article', elem=>{
						elem.remove();
					});
					visit.logic.showTimeline();
				}
			}
			function addClickUser2(){
				var usertag=this;
				console.log('poner los privilegios de los usuarios', usertag.dataset.nick)
				if(!se('div.-opt-users-adds>i[data-nick="'+usertag.dataset.nick+'"]')){
					if(se('.-privilegies-book-userAdd')){
						se('.-privilegies-book-userAdd').style.visibility='visible';
						se('.-privilegies-book-userAdd').style.opacity='1'
						se('div.-add-user-book>input[type="text"]').value='';
					}
					$('.-privilegies-book-userAdd>div:nth-child(3)').append('<i class="-opt-userIcon" data-uss="'+this.dataset.suer+'" data-nick="'+this.dataset.nick+'" title="'+this.dataset.nick+'" style="background-image: url('+this.dataset.imgp+');" data-imgp="'+this.dataset.imgp+'"><i></i></i>');
					if('.-privilegies-book-userAdd>div:nth-child(2)>div')
						si('.-privilegies-book-userAdd>div:nth-child(2)>div', elem=>{
							elem.addEventListener('click', sinNombreXD,false)
						});
				}

			}
			function addCLickUser(){
				if(se('div.-opt-result-user>article'))
					si('div.-opt-result-user>article', elem=>{
						elem.addEventListener('click', addClickUser2,false)
					})
			}
			if(se('div.-add-user-book>input[type="text"]')){
				se('div.-add-user-book>input[type="text"]').addEventListener('focus', function(){
					se('.-opt-result-user').dataset.hide=0;
					addCLickUser();
				});
				se('div.-add-user-book>input[type="text"]').addEventListener('blur', function(){
					se('.-opt-result-user').dataset.hide=1;
				});
				se('div.-add-user-book>input[type="text"]').addEventListener('keyup', function(ev){
					var textBox=this;
					clearTimeout(book.data.searcginuser);
					book.data.searcginuser=setTimeout(function(){
						if(!se('.-opt-loading'))
							$('div.-opt-result-user').append('<div class="-opt-loading">Cargando... <div></div></div>');
						if(se('div.-opt-result-user>h4')) se('div.-opt-result-user>h4').remove();
						if(se('div.-opt-result-user>article'))
							si('div.-opt-result-user>article', elem=>{
								elem.remove();
							})
						if(textBox.value){
							chatHist.emit('searching', {val: textBox.value}, resb=>{
								if(se('.-opt-loading')) se('.-opt-loading').remove();
								if(resb.err){
									$('.-opt-result-user').append('<h4>No has iniciado sesión</h4>');
								}else{
									if(resb.users.length){
										resb.users.forEach(function(val, key){
											$('.-opt-result-user').append(resultDomUser(val));
											if((key+1)>=resb.users.length)
												addCLickUser();
										});
									}else
										$('.-opt-result-user').append('<h4>No hay resultados</h4>');
								}
							});
						}else
							se('.-opt-result-user').dataset.hide=1;
					}, 900);
				},false)
			}
		},addImgToBook:datosImg=>{
			selectImageSendChat(datosImg.file, function(imgbase64){
				imgDimention(imgbase64, function(imgDim){
					var aImg=document.createElement('a');
					aImg.innerHTML='<i class="-opt-delete-img icon-trash"></i><img src="'+imgbase64+'" alt="'+datosImg.bookName+'">'
					aImg.dataset.animation=false;
					aImg.dataset.media=datosImg.media;
					aImg.dataset.url=imgbase64;
					aImg.dataset.book='81'+datosImg.book;
					aImg.dataset.ancho=imgDim.width;
					aImg.dataset.alto=imgDim.height;
					aImg.href='/'+datosImg.media+'M'+localStorage.user+'M81'+datosImg.book;
					aImg.className='-opt-imgCalledBook animated bounceIn';
					se('article.-opt-imgBook-posting').insertBefore(aImg, se('.-opt-imgCalledBook'));
					visit.logic.showTimeline();
				});
			});
		},createAndSendFiles:files=>{
			var outputfiles=[], ii=1;
			function noUploadImg(){
				var imgDel=this.parentNode;
				imgDel.style.width=0;
				imgDel.style.height=0;
				imgDel.style.borderRadius='50%';
				outputfiles[imgDel.dataset.position]=false;
			}
			function nextstep(){
				if(se('article.-opt-show-upload-img>div[data-upload="0"]>div.ic'))
					si('article.-opt-show-upload-img>div[data-upload="0"]>div.ic',elem=>{
						elem.addEventListener('click', noUploadImg,false)
					});
				let limit=outputfiles.length, ii=0;
				function queueSends(){
					if(ii<limit){
						if(outputfiles[ii]){
							let dato={name: outputfiles[ii].name, size: outputfiles[ii].size, nick: localStorage.nick};
							chatHist.emit('ifSize',dato,resa=>{
								if(resa.res===2){
									se('article.-opt-show-upload-img>div[data-position="'+ii+'"][data-upload="0"]').innerHTML=`<div class="kuygsei"><i class="icon-alert"></i><p>Ya esta en fotógena</p></div>`;
									si('article.-opt-show-upload-img>div[data-position="'+ii+'"]', elem=>{
										elem.dataset.upload=1;
									});
									callQuoted()
								}else if(outputfiles[ii].size<20661){
									se('article.-opt-show-upload-img>div[data-position="'+ii+'"][data-upload="0"]').innerHTML=`<div class="kuygsei"><i class="icon-alert"></i><p>Demaciado pequeña</p></div>`;
									si('article.-opt-show-upload-img>div[data-position="'+ii+'"]', elem=>{
										elem.dataset.upload=1;
									});
									callQuoted()
								}else{
									if(window.FormData){
										var formdata=new FormData();
										if(formdata){
											selectImageSendChat(outputfiles[ii], (imgString)=>{
												imgDimention(imgString, img=>{
													formdata.append('fl_addbook', outputfiles[ii]);
													formdata.append('table', se('article.-opt-imgBook-posting>h2').textContent);
													formdata.append('nick', localStorage.nick);
													formdata.append('book', se('article.-opt-imgBook-posting').dataset.book);
													formdata.append('width', img.width);
													formdata.append('height', img.height);
													ajaxHttpRequest(formdata, function(progres){
														var prog=parseInt(Math.round((progres.loaded / progres.total)*100));
														if(se('article.-opt-show-upload-img>div[data-position="'+ii+'"][data-upload="0"]>div[role="progressbar"]'))
															se('article.-opt-show-upload-img>div[data-position="'+ii+'"][data-upload="0"]>div[role="progressbar"]').style.width=prog+'%';
													}, function(resp){
														let respy=JSON.parse(resp)
														if(respy.err){
															boot.logic.popUpAlert({err:true, msg: 'La imagen que se estaba subiendo sufrio un error, intentalo mas tarde', time: 5000})
														}else{
															book.logic.addImgToBook({media: respy.src, file: outputfiles[ii],bookName: se('article.-opt-imgBook-posting>h2').textContent, book: se('article.-opt-imgBook-posting').dataset.book});
															se('article.-opt-show-upload-img>div[data-position="'+ii+'"][data-upload="0"]').remove();
														}
														callQuoted()
														console.log(resp)
													})
												})
											});

										}else
											boot.logic.popUpAlert({msg: 'Lo sentimos tu navegador es muy antiguo, por favor usa navegadores actualizados como Google Chrome o Fifefox', time: 5000})
									}else
										boot.logic.popUpAlert({msg: 'Lo sentimos tu navegador es muy antiguo, por favor usa navegadores actualizados como Google Chrome o Fifefox', time: 5000})
								}
							});
						}else{
							boot.logic.popUpAlert({msg: 'Lo sentimos tu navegador es muy antiguo, por favor usa navegadores actualizados como Google Chrome o Fifefox', time: 5000})
						}
					}else{
						console.log('fin');
						ii=0;
					}
					function callQuoted(){
						setTimeout(function(){
							ii++;
							queueSends();
						},300);
					}
				}
				queueSends();
			}
			let ihi=0
			function runTimes(){
				if(ihi<files.length){
					let file=files[ihi]
					outputfiles[ihi]=file;
					selectImageSendChat(file, imgbase64=>{
						$('.-opt-show-upload-img').append(`<div	class="beforeUpload animated fadeIn" data-upload="0" data-position="${ihi}" style="background-image: url(${imgbase64});" data-img="">`+
								'<div class="ic"></div>'+
								'<div role="progressbar"></div>'+
							'</div>');
						ihi++
						setTimeout(runTimes, 200)
						// runTimes()
					});
				}else
					nextstep()
			}
			runTimes()
		}, addImgBook:()=>{
			chatHist.emit('loadMedias', {opt: 18, seru:book.data.user, book: se('article.-opt-imgBook-posting').dataset.book}, kaus=>{
				if(kaus.type===2){
					let	contentImg=document.createElement('article')
					contentImg.innerHTML=book.templates.addImgBook;
					contentImg.className='-opt-visit-book-addimg';
					function handleDragOver(evt){
						if(!se('.-opt-visit-book-addimg>.showDragger')){
							let showDrag=document.createElement('div')
							showDrag.className='showDragger'
							se('.-opt-visit-book-addimg').appendChild(showDrag)
							showDrag.innerHTML='<i class="ss-close-icon icon-cancel"></i><div class="icno-drag icon-plus-1"></div>'
						}
						evt.stopPropagation();
						evt.preventDefault();
						evt.dataTransfer.dropEffect='copy'; // Explicitly show this is a copy.
					}
					function handleFileSelect(evt){
						evt.stopPropagation();
						evt.preventDefault();
						let files=evt.dataTransfer.files; // FileList object.
						book.logic.createAndSendFiles(files);
						if(se('.-opt-visit-book-addimg>.showDragger'))
							se('.-opt-visit-book-addimg>.showDragger').remove()
					}
					if(se('article.-opt-imgBook-posting')){
						se('article.-opt-imgBook-posting').insertBefore(contentImg, se('.-opt-imgCalledBook'));
						se('article.-opt-visit-book-addimg>i').addEventListener('click', book.logic.closeSubSetting,false);
						var dropZone=se('article.-opt-visit-book-addimg');
						dropZone.addEventListener('dragover', handleDragOver, false);
						dropZone.addEventListener('drop', handleFileSelect, false);
						se('span.-buton-book-upload>input[type="file"]').addEventListener('change', function(){
							book.logic.createAndSendFiles(this.files);
							if(se('.-opt-visit-book-addimg>.showDragger'))
								se('.-opt-visit-book-addimg>.showDragger').remove()
						},false)
					}
				}else
					errorMsg(kaus.res, kaus.type, 2500)
			});
		},
		changePermiss:()=>{
			$('article.-opt-imgBook-posting').append(book.templates.changePermiss);
			if(se('.-opt-optio-permis>span')){
				function alertSaved(tag){
					se(tag).textContent='Se ha guardado correctamente :D';
					setTimeout(function(){
						se(tag).textContent='.';
					}, 1500);
				}
				si('.-opt-permiss>span', elem=>{
					elem.addEventListener('click', function(){
						si('.-opt-permiss>span', elem=>{
							elem.dataset.select=0;
						});
						this.dataset.select=1;
						se('.-opt-resp-permiss').textContent='Guardando...'
						chatHist.emit('loadMedias', {opt:17, opt2:true, val: this.dataset.val, book: se('article.-opt-imgBook-posting').dataset.book}, resp=>{
							 alertSaved('.-opt-resp-permiss')
						});
					}, false);
				});
				si('.-opt-edit>span', elem=>{
					elem.addEventListener('click', function(){
						si('.-opt-edit>span', elem=>{
							elem.dataset.select=0;
						});
						this.dataset.select=1;
						se('.-opt-resp-edit').textContent='Guardando...'
						chatHist.emit('loadMedias', {opt:17, opt2:false, val: this.dataset.val, book: se('article.-opt-imgBook-posting').dataset.book}, resp=>{
							alertSaved('.-opt-resp-edit')
						});
					}, false);
				});
				se('div.-add-user-book>i.close').addEventListener('click',book.logic.closeSubSetting ,false);
			}
			visit.logic.showTimeline();
		}, deleteBook:()=>{
			$('article.-opt-imgBook-posting').append(book.templates.deleteBook);
			if(se('article.-opt-popup .-opt-delete-book')){
				si('article.-opt-popup .-opt-delete-book', elem=>{
					elem.addEventListener('click', function(){
						var codBoo=se('article.-opt-imgBook-posting').dataset.book;
						if(this.dataset.val==='1')
							notifi.emit('loadMedias', {opt: 19, seru: book.data.user, book: codBoo, nick: localStorage.nick},esd=>{
								if(esd.type===2){
									if(se('.-opt-images-books>div[data-cod="'+codBoo+'"]'))
										se('.-opt-images-books>div[data-cod="'+codBoo+'"]').remove();
									si('article.posters', elem=>{
										elem.style.display='block';
									});
									visit.logic.closes();
								}
								boot.logic.popUpAlert({msg: esd.res, time: 4000})
							});
						else
							book.logic.closeSubSetting();
					},false)
				});
				se('article.-opt-popup .close').addEventListener('click', book.logic.closeSubSetting,false);
			}
			visit.logic.showTimeline();
		},
		prepareDM:user=>{
			if(!se('.-opt-images-books')){
				book.data.user=user
				if(se('.-opt-images [data-button]')) se('.-opt-images [data-button]').remove();
				if(se('.-opt-images>article.-opt-images-cont'))
					se('.-opt-images>article.-opt-images-cont').remove();
				if(se('.-opt-images>header>i[data-show="true"]')){
					si('.-opt-images>header> *', elem=>{
						elem.dataset.show=false;
					});
					si('.-opt-images>article.-opt-images-cont', elem=>{
						elem.dataset.size='';
					});
					se('section.subbodyy>article:nth-child(2)').style.flex=2;
				}
				si('.-opt-images>header>span[data-opt]', elem=>{
					elem.dataset.select=0
				});
				se('.-opt-images>header>span[data-opt="1"]').dataset.select=1;
				var bookContent=document.createElement('article');
				bookContent.className='-opt-images-books';
				if(!se('article.-opt-images-books')){
					se('.-opt-images').appendChild(bookContent);
					if(!se('div.-opt-menu-new-book'))
						$('article.-opt-images-books').append('<div class="-opt-menu-new-book">+ Crear un nuevo Libro</div>')
					setTimeout(book.events,500)
				}
				visit.data.dataBookList={
					opt:1,
					us:user,
					lmt1: 0,
					lmt2:15
				}
				book.logic.loopBooks(visit.data.dataBookList);
			}
		},respoCloseImgBook:()=>{

			console.log('cerrando la ventana de magenes')
		},respCloseEditNameBook: ()=>{
			se('.newNameBook').classList.add('bounceOut')
			setTimeout(()=>{
				$('.newNameBook, .ss-dummi').remove()
			},800)
		},respoEditnameBook: function(ev){
			ev.preventDefault()
			let codi=se('.newNameBook input').dataset.codi
			boot.logic.loading({msg: 'Espera por favor'})
			chatHist.emit('loadMedias',{opt: 12, seru: book.data.user, newName: se('.newNameBook input').value, book: codi}, resp=>{
				boot.logic.popUpAlert({msg: resp.res, time: 4000})
				se('.newNameBook').classList.add('bounceOut')
				setTimeout(()=>{
					$('.newNameBook, .ss-dummi').remove()
				},800)
			})
		},
		editnameBook:()=>{
			let codi=se('article.-opt-imgBook-posting').dataset.book;
			if(boot.logic.responsive({width:true})){
				$('body').append(`<div class="ss-dummi"></div>
					<div class="newNameBook ss-modal-fixed animated bounceIn">
						<i class="ss-close-icon icon-cancel"></i>
						<h3 class="ft-title">Nuevo Nombre</h3>
						<form>
							<div class="ss-row-padding">
								<input data-codi="${codi}" type="text" required autofocus placeholder="Escribe el nombre">
							</div>
							<div class="ss-row">
								<button class="ss-button-primary">Guardar</button>
							</div>
						</form>
					</div>`)
			}else{
				se('.-opt-imgBook-posting>.hidden').classList.remove('hidden')
				se('article.-opt-imgBook-posting>h2').setAttribute("contentEditable", true);
				se('article.-opt-imgBook-posting>h2').classList.add('editable-input');
				se('.-opt-imgBook-posting>button').addEventListener('click',sendNewName.bind(se('article.-opt-imgBook-posting>h2')),false)
				se('article.-opt-imgBook-posting>h2').addEventListener('keypress',sendNewName,false)
			}
			function sendNewName(ev){
				var box=this
				if(ev.which===13||ev.which===1){
					se('.-opt-imgBook-posting>button').classList.add('hidden')
					book.logic.closeSubSetting();
					chatHist.emit('loadMedias',{opt: 12, seru: book.data.user, newName: box.textContent, book: codi}, function(b){
						errorMsg(b.res, b.type, 2000)
						if(b.type===2)
							if(se('.-opt-images-books>div[data-cod="'+codi+'"]')){
								se('.-opt-images-books>div[data-cod="'+codi+'"]').dataset.name=box.textContent
								se('.-opt-images-books>div[data-cod="'+codi+'"]>div:nth-child(1)').textContent=box.textContent
							}
					})
				}
				
			}
		},
		closeSubSetting:()=>{
			if(se('article.-opt-popup')){
				se('article.-opt-popup').dataset.hidden=true;
				setTimeout(function(){
					se('article.-opt-popup').remove();
				}, 1000)
			}
			if(se('article.-opt-visit-book-addimg')){
				se('article.-opt-visit-book-addimg').dataset.hidden=true;
				setTimeout(function(){
					se('article.-opt-visit-book-addimg').remove();
				}, 1000)
			}
			if(se('.-finish-delete-img')){
				book.data.deleteImg=false;
				si('i.-opt-delete-img', elem=>{
					elem.style.opacity=0;
					elem.style.visibility='hidden';
				});
				se('.-finish-delete-img').remove();
			}
			if(se('article.-opt-imgBook-posting>h2')){
				se('article.-opt-imgBook-posting>h2').classList.remove('editable-input');
				se('article.-opt-imgBook-posting>h2').setAttribute("contentEditable", false);
			}
		},
		optClikedSetting:function(){
			book.logic.closeSubSetting();
			var opt=this;
			switch(opt.dataset.opt){
				case '0':
				book.logic.editnameBook();
				break;
				case '1':
				book.logic.deleteImgs();
				break;
				case '2':
				book.logic.addUserBook();
				break;
				case '3':
				book.logic.addImgBook();
				break;
				case '4':
				book.logic.changePermiss();
				break;
				case '5':
				book.logic.deleteBook();
				break;
				case '6':
				book.logic.shareURL();
				break;
				default:
				console.log(opt.dataset.opt);
				break;
			}
			book.logic.optionBookSet();
		},
		clickVisitimgBook:function(ev){
			ev.preventDefault();
			var info=this;
			if(book.data.deleteImg){
				if(ev.target.tagName==='I'&&ev.target.className==='-opt-delete-img icon-trash'){
					notifi.emit('loadMedias', {opt: 13, seru: book.data.user, book: info.dataset.book, media: info.dataset.media}, a=>{
						if(a.type===2){
							info.style.width=0;
							setTimeout(function(){
								info.remove();
							}, 1000);
						}else
							errorMsg(a.res, a.type, 2000);
					});
				}else{
					console.log('jejejje bien viejo')
				}
			}else{
				let width=($(document).width()*76) / 100;
				visorPhoto(this.dataset.seru, width, this.dataset.alto, this.dataset.ancho, this.dataset.book, $(this), this.dataset.media);
			}
		},
		handleDragend:function(){
			if(se('.-opt-images-books > div'))
				si('.-opt-images-books > div', elem=>{
					elem.classList.remove('-opt-dom-book-drag');
				})
		},
		quitarBorder:function(e) {
			this.classList.remove('-opt-dom-book-drag');	// this / e.target is previous target element.
		},
		dropImg:function(ev){
			ev.preventDefault()
			console.log(ev.dataTransfer.getData('datas'))
			if(ev.dataTransfer.getData('datas')){
				var data=ev.dataTransfer.getData('datas'),
					objData=JSON.parse(data), booktBox=this,
					contImgBook=booktBox.querySelector('span[data-cnatf]')
				objData.book=this.dataset.cod;
				objData.opt=11;
				chatHist.emit('loadMedias', objData, function(a){
					if(a.type===2){
						contImgBook.textContent=(parseInt(contImgBook.dataset.cnatf)+1)+' fotos';
						contImgBook.dataset.cnatf=(parseInt(contImgBook.dataset.cnatf)+1);
						if(se('.-opt-imgCalledBook[data-media="'+objData.media+'"]')){
							se('.-opt-imgCalledBook[data-media="'+objData.media+'"]').style.width=0;
							setTimeout(function(){
								if(se('.-opt-imgCalledBook[data-media="'+objData.media+'"]'))
									se('.-opt-imgCalledBook[data-media="'+objData.media+'"]').remove();},1500);
						}
					}
					errorMsg(a.res, a.type, 2000);
				})
			}else
				console.log('no esta funcioanndo ok esto')
		},
		dropImgOver:function(ev){
			console.log('ahhh esta encima mio')
			ev.preventDefault();
			this.classList.add('-opt-dom-book-drag');
		},
		drag:function(ev){
			var datas=JSON.stringify(this.dataset);
			ev.dataTransfer.effectAllowed = 'copy';
			ev.dataTransfer.setData('datas', datas);
			if(se('.-opt-images-books>div'))
				si('.-opt-images-books>div', elem=>{
					elem.dataset.alert='drop'
				})
		},
		optionBookSet:()=>{
			var sett=se('.-opt-book-heaedr .hidden-box');
			$(sett).slideToggle(500)
		},
		clickVisitBook: function(){
			console.log('me han dado click rapido jejeje')
			var libs=this
			si('article.mainPost article.-opt-mediainfo-list', elem=>{
				elem.remove();
			});
			if(se('article.-opt-posting-newBook')){
				$('article.-opt-posting-newBook').hide(800);
				setTimeout(()=>{
					$('article.-opt-posting-newBook').remove();
				}, 800);
			}
			book.data.loopCallImages={suer: libs.dataset.suer,opt: 2, cod: libs.dataset.cod, lmt1:0, lmt2:30, name: libs.dataset.name}
			book.logic.loopCallImages();
		},moreImgFromBook:function(){
			let contentImg=this
			if((contentImg.scrollTop+contentImg.clientHeight+200)>contentImg.scrollHeight){
				if(!book.data.imgFromBook){
					book.data.imgFromBook=true
					book.logic.loopCallImages()
				}
			}
		},
		loopCallImages: ()=>{
			book.events()
			if(book.data.loopCallImages.lmt1===0){
				if(se('.-opt-imgBook-posting')){
					se('.-opt-imgBook-posting').remove();
				}
				$('.mainPost').append(book.templates.loopCallImages(book.data.loopCallImages));
				se('.-opt-imgBook-posting').dataset.slide=false
			}
			si('article.posters', elem=>{
				elem.style.display='none';
			});
			if(!se('.-opt-imgBook-posting .loadsIcon'))
				$('.-opt-imgBook-posting').append(`<span class="loadsIcon">
						${boot.templates.rippleSpin({size:'middle'})}
						<span class="textLoadinggg">Cargando imagenes...</span></span>`);
			chatHist.emit('loadMedias',book.data.loopCallImages, function(a){
				console.log(a)
				if(se('.-opt-imgBook-posting .loadsIcon')) se('.-opt-imgBook-posting .loadsIcon').remove();
				var nuii=0;
				if(a.length)
					appendImg();
				else{
					visit.logic.showTimeline()
					book.events()
				}
				function appendImg(){
					if(nuii<a.length){
						a[nuii].name=book.data.loopCallImages.name;
						a[nuii].suer=book.data.loopCallImages.suer;
						$('.-opt-imgBook-posting').append(book.templates.domImgCalledOfBooks(a[nuii]));
						nuii++;
						setTimeout(appendImg, 100);
					}else{
						book.data.loopCallImages.lmt1+=book.data.loopCallImages.lmt2
						setTimeout(()=>{
							book.data.imgFromBook=false
							visit.logic.showTimeline()
						},800)
						book.events()
					}
				}
			});
		}
	}
}

function mainImageButtons(data){
	var dm='<div class="-opt-images -opt-left-menu">'+
				'<header>'+
					'<span data-select="0" data-opt="0">Reciente</span>'+
					'<span data-select="0" data-opt="1">Libros</span>'+
					'<i data-show="false"></i>'+
				'</header>'+
			'</div>';
	if(!se('.-opt-images'))
		se('div.-opt-little-content').innerHTML=dm;
	if(se('.-opt-images>header>span')){
		si('.-opt-images>header>span', elem=>{
			elem.addEventListener('click', function(){
				console.log('jejejej ')
				switch(this.dataset.opt){
					case '0':
					loadImgs(data.cod)
					break;
					case '1':
					book.logic.prepareDM(data.cod);
					break;
				}
			}, false)
		});
	}
	loadImgs(data.cod);
	si('div.-opt-header-menu>span', elem=>{
		elem.dataset.select=0;
	});
	si('.-opt-contentMedia', elem=>{
		elem.style.display='none';
	})
	si('.-opt-images', elem=>{
		elem.style.display='block'
	})
	se('div.-opt-header-menu>span[data-op="0"]').dataset.select=1;
	se('section.subbodyy>article:nth-child(2)').style.flex=2;
	se('section.subbodyy>article:nth-child(2)').style.visibility='visible';
}
var followmeTmp={
	data:{},
	vari:{},
	events:()=>{
		if(!globals.followmeTmp.oneTime){
			globals.followmeTmp.oneTime=true
			$('body').on('click','.-opt-contentFolls>div[data-opt-box="header"]>i',followmeTmp.bigger)
			$('body').on('click','.-opt-folling>.button',foller)
			$('body').on('keyup','.-opt-contentFolls>div[data-opt-box="header"]>input[type="text"]',followmeTmp.searching)
		}
		if(se('div[data-opt-box="contentfolls"]'))
			se('div[data-opt-box="contentfolls"]').addEventListener('scroll', followmeTmp.wheelScroll,false)
	}, moreFollows:function(){
		this.remove();
		loopFollows({user: data.cod, lmt1:numy, lmt2:20, opt: opt});
		numy+=20;
	},bigger:function(){
		if(this.dataset.viewmore==='true'){
			se('section.subbodyy>article:nth-child(2)').style.flex=0;
			this.dataset.viewmore=false;
			this.addEventListener('click', followmeTmp.bigger)
		}else{
			se('section.subbodyy>article:nth-child(2)').style.flex=2;
			this.dataset.viewmore=true;
			this.addEventListener('click', followmeTmp.bigger)
		}
	},searching:function(){
		var userNick=this.value, field=this.dataset.field;
		followmeTmp.vari.pxScroll=0;
		if(!userNick){
			se('article.-opt-contentFolls>div[data-opt-box="content"]>div').innerHTML=''
			followmeTmp.dataArray={user: se('.imgPerfil-visit').dataset.codity, lmt1:0, lmt2:20, opt: followmeTmp.vari.opty}
			followmeTmp.loopArray();
		}else{
			clearTimeout(followmeTmp.searcginuser);
			followmeTmp.searcginuser=setTimeout(()=>{
				followmeTmp.dataArray={user: se('.imgPerfil-visit').dataset.codity, lmt1:0, lmt2:20, opt: 1, nickSearch: userNick, fie:field}
				followmeTmp.loopArray();
			},500)
		}
	},wheelScroll: function(){
		let contentFolls=this
			if((contentFolls.scrollTop+contentFolls.clientHeight+200)>contentFolls.scrollHeight){
				if(!followmeTmp.data.chekedFoll){
					followmeTmp.data.chekedFoll=true
					followmeTmp.loopArray();
				}
			}
	}, loopArray:()=>{
			$('div[data-opt-box="content"]>div').append(`<span class="loadsIcon">
					${boot.templates.rippleSpin({})}
				<span class="textLoadinggg">Cargando Seguidores...</span></span>`)
			chatHist.emit('follAll', followmeTmp.dataArray, a=>{
				console
				if(followmeTmp.dataArray.lmt1===0){
					if(se('article.-opt-contentFolls>div[data-opt-box="content"]>div'))
						se('article.-opt-contentFolls>div[data-opt-box="content"]>div').innerHTML=''
				}
				if(se('div[data-opt-box="content"]>div>.loadsIcon')) se('div[data-opt-box="content"]>div>.loadsIcon').remove();
				if(a.length){
					followmeTmp.data.chekedFoll=false
					$('article.-opt-contentFolls>div[data-opt-box="content"]>div').append(a.map(val=>html.dmFoll(val)).join(''))
					followmeTmp.dataArray.lmt1+=followmeTmp.dataArray.lmt2;
				}
			});
	}, prepareDM:(data, opt)=>{
		followmeTmp.vari.pxScroll=0;
		followmeTmp.vari.opty=opt;
		se('.subbodyy>article:nth-child(2)').style.flex=2;
		se('.subbodyy>article:nth-child(2)').style.visibility='visible';
		if(opt===0){
			si('div.-opt-header-menu>span[data-op]', elem=>{
				elem.dataset.select=0
			});
			se('div.-opt-header-menu>span[data-op="1"]').dataset.select=1;
		}else{
			si('div.-opt-header-menu>span[data-op]', elem=>{
				elem.dataset.select=0
			});
			se('div.-opt-header-menu>span[data-op="2"]').dataset.select=1;
		}

		if(!se('div.-opt-little-content'))
			$('article.-opt-visitor').append('<div class="-opt-little-content"></div>')
		se('div.-opt-little-content').innerHTML=html.folloersDM(opt)
		followmeTmp.dataArray={user: data.cod, lmt1:0, lmt2:20, opt: opt}
		followmeTmp.loopArray();
		followmeTmp.events();
	}
}
function topMenuVisit(objeto){
		var offsetTop=getElementTop(objeto);
		document.addEventListener('scroll', function(){
			if(se(objeto)){
				if(!boot.logic.responsive({width:true})){
					if(($(window).scrollTop()+20)>offsetTop) {
						console.log('jejej que mas papu')
						si('section.subbodyy>article, article.-opt-images-cont, .-opt-images-books, .ghate, .-opt-media-video-lister', elem=>{
							elem.style.overflowY='auto';
						});
						se(objeto).style.position='fixed'
						se('section.subbodyy').style.marginTop='43px'
					}else{

						se(objeto).style.position='static'
						se('section.subbodyy').style.marginTop='0'
						si('section.subbodyy>article, article.-opt-images-cont, .-opt-images-books, .ghate, .-opt-media-video-lister', elem=>{
							elem.style.overflowY='hidden';
						});
					}
				}
			}
		});
}
var visit={
	data:{},
	logic:{
		showTimeline:()=>{
			

			if(se('.-opt-book-heaedr [data-icon="setting"]'))
				se('.-opt-book-heaedr [data-icon="setting"]').addEventListener('click', book.logic.optionBookSet,false)
			if(se('.-opt-book-heaedr [data-icon="close"]'))
				se('.-opt-book-heaedr [data-icon="close"]').addEventListener('click',visit.logic.closes,false)
			if(se('i.-finish-delete-img'))
				se('i.-finish-delete-img').addEventListener('click', book.logic.closeSubSetting,false)
			if(book.data.deleteImg){
				si('i.-opt-delete-img', elem=>{
					elem.style.visibility='visible';
				});
			}
			book.events();

			if(se('article.-opt-imgBook-posting>i[data-icon="close"]')){
				se('article.-opt-imgBook-posting>i[data-icon="close"]').addEventListener('click',visit.logic.closes,false)
			}
		},
		closes:(ev)=>{
			if(se('article.-opt-posting-newBook')){
				$('article.-opt-posting-newBook').hide(800);
				setTimeout(function(){
					se('article.-opt-posting-newBook').remove();
				}, 800);
			}
			if(se('section.subbodyy>article:nth-child(2)'))
				se('section.subbodyy>article:nth-child(2)').style.flex=2;
			if(se('article.-opt-content-list-songs'))
				si('article.-opt-content-list-songs', elem=>{
					elem.remove();
				});
			// if(!boot.logic.responsive({width:true}))
				si('article.posters', elem=>{
					elem.style.display='block';
				});
			if(se('article.-opt-imgBook-posting'))
				se('article.-opt-imgBook-posting').remove();
			GNGN();
			if(boot.logic.responsive({width:true})){
				if(ev){
					if(ev.target){
						if(ev.target.parentNode.className==='-opt-book-heaedr'){
							si('.-opt-images-books>div', elem=>{
								elem.style.display='block'
							})
							book.data.noScrollBook=false
						}
						if(ev.target.className==='closeListerMusic'){
							console.log('jejejej')
							visit.data.noScrollList=false
							si('.-opt-dom-listplayer', elem=>{
								elem.style.display='flex'
							})
							setTimeout(()=>{
								si('.posters', elem=>{
									elem.style.display='none'
								})
							},100)
						}
					}
				}

				si('.posters', elem=>{
					elem.style.display='none'
				})
			}
		},
		mainButtonMenu:data=>{
			mainImageButtons(data);
			si('div.-opt-header-menu>span', elem=>{
				elem.addEventListener('click', function(){
					visit.logic.closes();
					switch(this.dataset.op){
						case '0':
						mainImageButtons(data);
						break;
						case '1':
						followmeTmp.prepareDM(data, 0)
						break;
						case '2':
						followmeTmp.prepareDM(data, 2)
						break;
						case '3':
						multimediaVisits.onlyMusic.prepareDM(data);
						break;
					}
				},false)
			});
		},runTimelineVisit:data=>{
			return new Promise((res1, err)=>{
				if(data.length){
					let numi=0
					function runArray(){
						if(numi<data.length){
							visit.templates.tmplHsitoryVisit(data[numi]).then(res=>{
								$('article.posters').append(res);
								numi++
								runArray();
							}).catch(err=>{
								console.log(err)
							})
						}else{
							if(visit.data.VisitTimelineData)
								visit.data.VisitTimelineData.lt+=visit.data.VisitTimelineData.lt2
							GNGN()
							visit.events();
							res1();
						}
					}
					runArray()
				}else{
					GNGN()
					visit.events();
					res1();
				}
			})
		},loadFunctionVisit:(a)=>{
			console.log('creando el objeto del timeline', se('.posters').offsetHeight)
			visit.data.VisitTimelineData={lt: 0, lt2:20, uss: (localStorage.user?localStorage.user.substr(4):''), meet:'64858'+(a?a.cod:'0')}
			chatHist.emit('visiTimeline', visit.data.VisitTimelineData, b=>{
				if(se('.posters>.loadsIcon')) se('.posters>.loadsIcon').remove();
				visit.logic.runTimelineVisit(b).then(res=>{
					topMenuVisit('section.contentAll>section[data-columns="0"]>nav');
					visit.logic.mainButtonMenu(a)
					tmplates.updateTime()
					ListChat();
				}).catch(err=>{
					console.log(err)
				})
				setTimeout(()=>{
					varStrik.hideTransitions({newElem: se('.allgod')})
				},800)
			})
		},loadDom:(nick)=>{
			if(typeof(home)!=='undefined')
				home.data.callPrompt=false
			varStrik.showTransitions()
			
			si('#god, .visorImg, .connect, .previewPerfilPopUp, .ss-dummi', elem=>{
				elem.classList.add('ss-blur-element')
			})
			se('title').innerHTML=nick;
			varStrik.checkUpdates()
			if(se('.bootstrapCss'))
				se('.bootstrapCss').remove()
			tmplates.appendScript({class:'position', src:`/public/${SERVER?'js':'Js'}/positionImage.js`, opt:'js'})
			tmplates.appendScript({class:'profile', src:`/public/${SERVER?'js':'Js'}/profile.js`, opt:'js'})
			tmplates.appendScript({class:'perfil', src:`/public/${SERVER?'css':'styles'}/perfil.css`, opt:'css'})
			tmplates.appendScript({class:'sPopsition', src:`/public/${SERVER?'css':'styles'}/ss-positionImage.css`, opt:'css'})
			return new Promise((res, err)=>{
				chatHist.emit('loadDoms', {opt: 0, nick: nick}, function(a){
					if(a.err)
						alert('No hay resultados del usuario')
					else{
						se('body').dataset.codim=a.bFotos
						se('body').dataset.srcim=a.bDir
						se('body').style.background='url('+a.bDir+') '+a.bx+'px '+a.byy+'px / '+a.bsize+'% repeat fixed rgb(255, 255, 255)';
						function laterAnimation(elem){
							res()
							if(elem){
								elem.style.display='none';
								elem.dataset.movedom=false;
								elem.remove();
							}
							var sect=document.createElement('section');
							sect.className='allgod ss-blur-element';
							var domPerfilHTML=visit.templates.domPerfil2(a)
							sect.innerHTML=domPerfilHTML;
							tmplates.prepareStyle(a)
							se('body').appendChild(sect);
							$('article.posters').append(`<span class="loadsIcon">
									${boot.templates.heartsSpin()}
								<span class="textLoadinggg">Cargando historias...</span></span>`);
							visit.logic.loadFunctionVisit(a)
							if(a.friend===1){
								tmplates.data.dass1=a
								tmplates.data.dass1.page='visit'
								tmplates.data.dass1.content=se('.allgod').innerHTML
							}
							tmplates.data.dass=a
							// if(typeof(urlOption)!=='undefined'){
							// 	console.log('jejeje que bien ome')
							// 	tmplates.data.dass.page=optUrlPage
							// 	history.pushState(tmplates.data.dass, '',urlOption)
							// 	tmplates.data.dass.content=`<article class="ss-dummi2">${se('.ss-dummi2').innerHTML}</article>${se('.allgod').innerHTML}`
							// }else{
								tmplates.data.dass.page='visit'
								tmplates.data.dass.content=se('.allgod').innerHTML
								history.pushState(tmplates.data.dass, '','/'+a.nick)
							// }
							// console.log(typeof(urlOption), 'se quito el redireccionamiento')

						}
						if(se('.elems-home'))
							si('.elems-home', elem=>{
								elem.remove()
							})
						// laterAnimation()
						if(si('section#god, .allgod'))
							si('section#god, .allgod', (elem)=>{
								elem.parentNode.appendChild(elem)
								clearTimeout(tmplates.data.timeDomLoaded);
								laterAnimation(elem)

							})
						else
							setTimeout(()=>{
								laterAnimation()
							},1000)
					}
				})
				
			});
		},newPostVisit:(e)=>{
			e.preventDefault();	
			if(!se('.newPostVisit')){
				$('.posters').prepend(html.newPostVisit({nick:se('.imgPerfil-visit').dataset.nick}))
				$('.newPostVisit').slideDown(500)
			}
			visit.events()
		}, closeResponChagImg:()=>{
			se('.searchUserResponsive').classList.add('bounceOutDown')
			setTimeout(()=>{
				si('.searchUserResponsive, .ss-dummi', elem=>{
					elem.remove()
				})
			},800)
			varStrik.overflowWindow({hide: false})
		}, sleectResponCHhImage:function(){
			si('.searchUserResponsive, .ss-dummi', elem=>{
				elem.remove()
			})
			varStrik.overflowWindow({hide: false})
			let optedi=this
			switch(optedi.dataset.opt){
				case '0':
					doCanvasDOMCrop.resizeImg(doCanvasDOMCrop.data.table==='banner'?se('.bannered').dataset.codim:se('.imgPerfilCont>.imgPerfil-visit').dataset.codim)
					boot.logic.loading({msg:'Cargando imágen...'})
				break;
				case '2':
					boot.logic.loading({msg:'Cargando imágen...'})
					doCanvasDOMCrop.prepareDMListBook();
				break
				case '3':
					boot.logic.loading({msg:'Cargando imágen...'})
					doCanvasDOMCrop.cameraPic()
				break
				case '4':
					doCanvasDOMCrop.prepareDMinternet();
				break
			}
		},toggleChaImgPerfil:function(){
			console.log('que ma mijito')
			tmplates.appendScript({class:'kinect', src:'/public/libs/kinetic-v5.1.0.js', opt:'js'})
			doCanvasDOMCrop.data.table='perfil'
			if(boot.logic.responsive({width: true})){
				$('body').append(visit.templates.responChangeImg({name: 'perfil'}))
				visit.events()
				varStrik.overflowWindow({hide: true})
			}else{
				if(this.dataset.opt){
					if(this.dataset.opt==='0')
						$('.imgPerfilCont>.optChImg>ul ul').toggle(500)
					else{
						boot.logic.loading({msg:'Cargando imágen...'})
						doCanvasDOMCrop.resizeImg(se('.imgPerfilCont>.imgPerfil-visit').dataset.codim)
					}
				}else if(this.dataset.opt2){
					si('.imgPerfilCont>.optChImg ul',elem=>{
						elem.style.display='none';
					})
					if(this.dataset.opt2==='1'){
						boot.logic.loading({msg:'Cargando imágen...'})
						doCanvasDOMCrop.prepareDMListBook();
					}else if(this.dataset.opt2==='3'){
						doCanvasDOMCrop.prepareDMinternet();
					}else if(this.dataset.opt2==='2'){
						boot.logic.loading({msg:'Cargando imágen...'})
						doCanvasDOMCrop.cameraPic()
					}
				}else{
					$(this.nextSibling).toggle(500)
				}
			}
		}, toggleChgBanner:function(){
			console.log('jejeje')
			tmplates.appendScript({class:'kinect', src:'/public/libs/kinetic-v5.1.0.js', opt:'js'})
			doCanvasDOMCrop.data.table='banner'
			if(boot.logic.responsive({width: true})){
				$('body').append(visit.templates.responChangeImg({name: 'banner'}))
				visit.events()
				varStrik.overflowWindow({hide: true})
			}else{
				if(this.dataset.opt){
					if(this.dataset.opt==='0')
						$('.optChBanner>ul ul').slideToggle(800)
					else{
						si('.optChBanner ul',elem=>{
							elem.style.display='none';
						})
						boot.logic.loading({msg:'Cargando imágen...'})
						doCanvasDOMCrop.resizeImg(se('header.bannered').dataset.codim)
					}
				}else if(this.dataset.opt2){
					si('.optChBanner ul',elem=>{
						elem.style.display='none';
					})
					if(this.dataset.opt2==='1'){
						boot.logic.loading({msg:'Cargando imágen...'})
						doCanvasDOMCrop.prepareDMListBook()
					}else if(this.dataset.opt2==='2'){
						boot.logic.loading({msg:'Cargando imágen...'})
						doCanvasDOMCrop.cameraPic()
					}else if(this.dataset.opt2==='3'){
						doCanvasDOMCrop.prepareDMinternet();
					}
				}else
					$('.optChBanner>ul').slideToggle(500)
			}



		},optionCount:function(ev){
			ev.preventDefault();
			var opt=this.dataset.opt;
			if(opt==='design'){
				varStrik.router.domDesign()
			}else if(opt==='data'){
				tmplates.appendScript({class:'dataJs', src:`/public/${SERVER?'js':'Js'}/ss-data.js`, opt:'js'})
				tmplates.appendScript({class:'dataCss', src:`/public/${SERVER?'css':'styles'}/ss-data.css`, opt:'css'})
				function loadSrc(){
					console.log('jejejej----jajaj')
					if(typeof(datajs)==='undefined')
						setTimeout(loadSrc,100)
					else
						datajs.logic.loadDom()

				}
				loadSrc();
			}
			$('ul.optionsy').fadeOut(600)
		}, scrollVisitTimeLine:function(){//load new post
			let conetPost=se('article.posters').offsetHeight, scrollY=this.scrollTop
			if(!boot.logic.responsive({width: true})){
				if((scrollY+se('.offsetHeight').offsetHeight+100)>conetPost){
					if(!visit.data.banderaTimeLine){
						visit.data.banderaTimeLine=true
						$('article.posters').append(`<span class="loadsIcon">
							<div class="loader loader-13">
								<div class="css-heart heart1"></div>
								<div class="css-heart heart2"></div>
								<div class="css-heart heart3"></div>
								<div class="css-heart heart4"></div>
							</div>
							<span class="textLoadinggg">Cargando historias...</span></span>`);
						chatHist.emit('visiTimeline', visit.data.VisitTimelineData, (b)=>{
							if(se('.posters>.loadsIcon')) se('.posters>.loadsIcon').remove();
							console.log('jejej se puso complicado')
							visit.logic.runTimelineVisit(b).then(res=>{
								visit.data.banderaTimeLine=false
							}).catch(err=>{
								console.log(err)
							})
						})
					}
				}
			}
		}, loadTimelineResponsive:()=>{//case of tab show something
			if((window.innerHeight+window.scrollY+200)>=document.body.offsetHeight){
				if($('.posters').css('display')==='block'){
					if(!visit.data.banderaTimeLine){
						visit.data.banderaTimeLine=true;
						$('.mainPost .posters').append('<span class="loadsIcon"><i class="animate-spin demo-iconed-load"></i> Cargando más historias...</span>');
						chatHist.emit('visiTimeline', visit.data.VisitTimelineData, resp=>{
							if(se('.posters>.loadsIcon')) se('.posters>.loadsIcon').remove();
							console.log('u el arroz con avichuela')
							visit.logic.runTimelineVisit(resp).then(res=>{
								visit.data.banderaTimeLine=false
							}).catch(err=>{
								console.log(err)
							})
						})
					}
				}else if($('.-opt-images.-opt-left-menu').css('display')==='block'){
					console.log('ahh estoy tiste')
					if(se('.-opt-images-cont'))
						se('.-opt-images-cont').style.overflowY='auto'
					else if(se('.-opt-images-books'))
						se('.-opt-images-books').style.overflowY='auto'
				}else if($('.contentMultimeRespo').css('display')==='block'){
					console.log('ahh estoy feliz')
					if(se('.contentMultimeRespo>*'))
						si('.contentMultimeRespo>*', elem=>{
							elem.style.overflowY='auto'
						})
				}
			}else{
				si('.-opt-images-cont', elem=>{
					elem.style.overflowY='hidden'
				})
			}
		},loadFileChange:function(){
			let files=this.files
			if(files.length>1)
				errorMsg('Solo se envia un archivo', 1, 3000)
			else{
				showBarProgress(files[0]);
				fileHIstory=files[0];
			}
		},showTmpFile:file=>{
			visit.data.fileVisitPost=file
			if(file.type.indexOf('image')>-1){
				selectImageSendChat(file, imgString=>{
					se('.previwVsiitFile').innerHTML=`<img src="${imgString}" alt=""/>`
				})
			}else if(file.type.indexOf('audio')>-1){
				se('.previwVsiitFile').innerHTML=`<div class="musicPost icon-music-2 noSpace">${file.name}</div>`
			}
		} ,loadFileVisitPost:function(){
			let fileTag=this,
				file=fileTag.files[0]
			visit.logic.showTmpFile(file)
		},sendHsitoryVisit:()=>{
			let file=se('.newPostVisit .hideInputFile input').files[0],
				historia=se('.newPostVisit #newPostVisit').value
			function laterSendHist(res){
				showHsitoryDOM(res)
				$('.newPostVisit').slideUp(500)
				setTimeout(()=>{
					si('.newPostVisit, .uploadFileVisit',elem=>{
						elem.remove()
					})
				},500)
			}
			function sendHistoryF(htoy){
				if(visit.data.fileVisitPost){
					se('.newPostVisit').classList.add('uploadFileVisit')
					se('.uploadFileVisit').classList.remove('newPostVisit')
					se('.uploadFileVisit').innerHTML=`<div id="FileName"><div></div>${visit.data.fileVisitPost.name}</div>`
					if(visit.data.fileVisitPost.type.match('image.*')){
						if(visit.data.fileVisitPost.size<5661)
							errorMsg('Lo sentimos la imagen que quieres subir es demasiado pequeña!!!', 1, 2000);
						else{
							selectImageSendChat(visit.data.fileVisitPost, (imgString)=>{
								imgDimention(imgString, img=>{
									let timelineFile=visit.data.fileVisitPost;
									se('#FileName').style.display='block';
									ajaxSocket('upFileSocket', {fileName: timelineFile.name, file: imgString, prgFn: SeeProgress}).then(success=>{
										varStrik.data.breakAjaxSocket=false
										if(success.err){
											boot.logic.alertPop({err: true, msg: 'Ha ocurrido un error intentalo mas tarde'})
										}else{
											chatHist.emit('filesTimeline', {width:img.width, height: img.height,nick: localStorage.nick, size: timelineFile.size, opt: timelineFile.type, history: htoy, fileName: timelineFile.name},resa=>{
												showHistory({file: resa.src, user: localStorage.user, history: htoy}).then(laterSendHist).catch(err=>{
													console.log(err)
												});
											});
										}
									}).catch(err=>{console.log(err)});
									visit.data.fileVisitPost=false;
								})
							})
						}
					}else if(visit.data.fileVisitPost.type.match('audio.*')){
							let dataFile={}
							dataFile.fl_chrono=visit.data.fileVisitPost;
							dataFile.nick=localStorage.nick;
							dataFile.user=localStorage.user;
							dataFile.prgFn=seeProgress2;//SeeProgress
							ajaxPuro('/upload', dataFile, function(a){
								showHistory({file: a, user: localStorage.user, history: htoy}).then(laterSendHist).catch(err=>{
									console.log(err)
								});
							});
							fileHIstory=false;
					}
				}else{
					showHistory({user: localStorage.user, history: htoy}).then(laterSendHist).catch(err=>{
						console.log(err)
					});
				}
				
			}
			if(noSpace(historia)&&historia){
				sendHistoryF(historia)
			}else{
				errorMsg('Por favor escribe una historia!!', 1, 2000);
				se('.newPostVisit #newPostVisit').value='';
			}
		},dropFilePost:function(evt){
			evt.stopPropagation();
			evt.preventDefault();
			visit.logic.showTmpFile(evt.dataTransfer.files[0])
		},limitStringPost:function(){
			let limit=280-this.value.length
			se('.limitStr').textContent=limit
			if(limit<1)
				se('.newPostVisit button').style.visibility='hidden'
			else
				se('.newPostVisit button').style.visibility='visible'
		},selectTabResponsive: function(){
			let taby=this
			if(taby.dataset.selected==='0'){
				si('.tabsOptUser>.taby', elem=>{
					elem.dataset.selected=0
				})
				taby.dataset.selected=1
				switch(taby.dataset.section){
					case 'pict':
						if(!se('.-opt-images.-opt-left-menu')){
							se('.-opt-header-menu span[data-op="0"]').click()
						}
						setTimeout(()=>{
							se('.contentTabies').appendChild(se('.-opt-images.-opt-left-menu'))
						},200)
						se('.contentTabies').innerHTML=''
						si('.mainPost .posters', elem=>{
							elem.style.display='none'
						})
					break;
					case 'folls':
						se('.-opt-header-menu span[data-op="1"]').click()
						setTimeout(()=>{
							se('.contentTabies').appendChild(se('.-opt-contentFolls'))
						},200)
						se('.contentTabies').innerHTML=''
						si('.mainPost .posters', elem=>{
							elem.style.display='none'
						})
					break;
					case 'follw':
						se('.-opt-header-menu span[data-op="2"]').click()
						setTimeout(()=>{
							se('.contentTabies').appendChild(se('.-opt-contentFolls'))
						},200)
						se('.contentTabies').innerHTML=''
						si('.mainPost .posters', elem=>{
							elem.style.display='none'
						})
					break;
					case 'hist':
						se('.contentTabies').innerHTML=''
						si('.mainPost .posters', elem=>{
							elem.style.display='block'
						})
					break;
					case 'medi':
						se('.contentTabies').innerHTML=''
						$('.contentTabies').append(visit.templates.multimediaDOMResponsive)
						si('.mainPost .posters', elem=>{
							elem.style.display='none'
						})
					break
				}
			}
		},multimediaResponsive: function(){
			let select=this.dataset.opt
			si('.multimediaDOMResponsive .icogns>div', elem=>{
				elem.dataset.selected='0'
			})
			si('.multimediaDOMResponsive .icogns', elem=>{
				elem.classList.remove('ytsgfer')
				elem.classList.add('fadeOut')
				elem.classList.remove('fadeIn')
				elem.style.display='none'
			})
			this.parentNode.classList.add('ytsgfer')
			this.parentNode.classList.add('fadeIn')
			this.parentNode.classList.remove('fadeOut')
			this.dataset.selected=1
			this.parentNode.style.display='inline-block'



			if(!se('section.-opt-left-menu.-opt-contentMedia'))
				se('div.-opt-header-menu>span[data-op="3"]').click()
			switch(select){
				case 'music':
					if(!se('.-opt-little-content .-opt-contentMusic'))
						se('section.-opt-contentMedia>header>span[data-opt="0"]').click()
					se('.contentMultimeRespo').appendChild(se('.-opt-contentMusic'))
					se('.-opt-media-song').style.display='block'
				break
				case 'list':
					if(!se('.-opt-little-content .-opt-media-list'))
						se('section.-opt-contentMedia>header>span[data-opt="1"]').click()
					se('.contentMultimeRespo').appendChild(se('.-opt-media-list'))
				break
				case 'vide':
					if(!se('.-opt-little-content .-opt-media-video'))
						se('section.-opt-contentMedia>header>span[data-opt="2"]').click()
					se('.contentMultimeRespo').appendChild(se('.-opt-media-video'))
				break
				case 'all':
					if(!se('.-opt-little-content .-opt-media-video-lister'))
						se('section.-opt-contentMedia>header>span[data-opt="3"]').click()
					se('.contentMultimeRespo').appendChild(se('.-opt-media-video-lister'))
				break
			}
			se('.contentMultimeRespo').style.opacity=1
			si('.mainPost .posters', elem=>{
				elem.style.display='none'
			})
		},closeMultimediaRespon:()=>{
			if(se('.-opt-contentMusic'))
				se('.-opt-contentMedia-main').appendChild(se('.-opt-contentMusic'))
			if(se('.-opt-media-video-lister'))
				se('.-opt-media-all').appendChild(se('.-opt-media-video-lister'))
			let deleteNode=document.querySelectorAll('.contentMultimeRespo>*')[1]
			if(deleteNode)
				deleteNode.remove()
			se('.contentMultimeRespo').style.opacity=0


			si('.multimediaDOMResponsive .icogns', elem=>{
				elem.querySelector('div').dataset.selected=0
				elem.classList.remove('ytsgfer')
				elem.classList.add('fadeIn')
				elem.classList.remove('fadeOut')
				elem.style.display='inline-block'
			})
		}, clickVisitimg:function(e){
			e.preventDefault();
			let box=($(document).width()*76)/100;
			visorPhoto(this.dataset.seru, box, this.dataset.alto, this.dataset.ancho, this.dataset.book, $(this), this.dataset.media);
		}, clickBookResponsive: function(){
			let box=this
			book.data.noScrollBook=true
			se('.-opt-images-books').style.overflowY='hidden'
			// $('.-opt-images-books').append('<div class="ss-dummi-height"></div>')
			si('.-opt-images-books>div', elem=>{
				elem.style.display='none'
			})
			box.style.display='block'

			// setTimeout(()=>{
			// 	se('.-opt-images-books').style.height='auto'
			// }, 500)
		}
	},events:()=>{
		if(!globals.visit.oneTime){
			globals.visit.oneTime=true
			console.log('solo una vez y no mas 🤔')
			$('body').on('click', '.otopnsChPerfil .ss-button-primary', visit.logic.sleectResponCHhImage)
			$('body').on('click', '.searchUserResponsive>.icon-cancel', visit.logic.closeResponChagImg)
			$('body').on('click', '.-opt-images-books>div[data-cod]', book.logic.clickVisitBook)
			$('body').on('click', '.-opt-images>article.-opt-images-cont>a', visit.logic.clickVisitimg)
			$('body').on('click', '.tabsOptUser>.taby',visit.logic.selectTabResponsive)
			$('body').on('click', '.newPostVisit button',visit.logic.sendHsitoryVisit)
			$('body').on('click', '.multimediaDOMResponsive .icogns>div',visit.logic.multimediaResponsive)
			$('body').on('click','section.contentAll .write',visit.logic.newPostVisit)
			$('body').on('click', 'ul.optionsy>li',visit.logic.optionCount)
			$('body').on('keyup', '.newPostVisit #newPostVisit',visit.logic.limitStringPost)
			$('body').on('click','.imgPerfilCont>.optChImg>i, .imgPerfilCont>.optChImg>ul li>span, .imgPerfilCont>.optChImg>ul li>ul>li',visit.logic.toggleChaImgPerfil)
			$('body').on('click','.contentMultimeRespo>.ss-close-icon',visit.logic.closeMultimediaRespon)
			$('body').on('click','.optChBanner>i, .optChBanner>ul span, .optChBanner>ul ul li',visit.logic.toggleChgBanner)
			if(boot.logic.responsive({width:true})){
				$('body').on('click', '.-opt-images-books>div', visit.logic.clickBookResponsive)
				$('body').on('submit', '.newNameBook form', book.logic.respoEditnameBook)
				$('body').on('click', '.newNameBook .ss-close-icon', book.logic.respCloseEditNameBook)
				$('body').on('click', '.-opt-book-heaedr [data-icon="close"]', book.logic.respoCloseImgBook)
			}
		}
		function tagging(){
			let classTexti='#newPostVisit'
			if(se(classTexti)){
				if(!se(classTexti).oneTime){
					se(classTexti).oneTime=true
					let $inputor=$(classTexti)
					.atwho(varStrik.settingTagging)
					.atwho(varStrik.settingEmojis)
					$inputor.caret('pos', 47);
					$inputor.focus().atwho('run')
				}
			}
		}
		tagging()
		// if(se('.newPostVisit #newPostVisit'))
		// 	varStrik.mainSearchNick('.newPostVisit #newPostVisit')
		if(se('.newPostVisit'))
			se('.newPostVisit').addEventListener('drop',visit.logic.dropFilePost,false)
		if(se('article.mainPost')){
			if(boot.logic.responsive({width:true}))
				window.addEventListener('scroll', visit.logic.loadTimelineResponsive, false)
			else
				se('article.mainPost').addEventListener('scroll',visit.logic.scrollVisitTimeLine,false)
		}
		if(se('.newPostVisit .hideInputFile input'))
			se('.newPostVisit .hideInputFile input').addEventListener('change',visit.logic.loadFileVisitPost,false)
		if(se('.imgPerfilCont .hideInputFile>input[type="file"]')&&typeof(doCanvasDOMCrop)!=='undefined')
			si('.imgPerfilCont .hideInputFile>input[type="file"], .otopnsChPerfil input[type="file"], .optChBanner .hideInputFile>input[type="file"]', elem=>{
				elem.addEventListener('change',doCanvasDOMCrop.chImg.perfil,false)
			})
	},templates:{
		responChangeImg:data=>`<div class="ss-dummi"></div><article class="searchUserResponsive animated bounceInUp">
				<i class="ss-close-icon icon-cancel"></i>
				<h4>Imágen de perfil</h4>
				<div class="fileSearch">
					<div class="otopnsChPerfil">
						<div class="ss-row-padding">
							<button data-opt="0" class="ss-button-primary icon-resize-full-3">Redimencionar imágen</button>
						</div>
						<div class="ss-row-padding">
							<span data-opt="1" class="ss-button-primary icon-hdd hiddenInput">Del dispositivo
								<input type="file" name="${data.name}" data-opt="${data.name}">
							</span>
						</div>
						<div class="ss-row-padding">
							<button data-opt="2" class="ss-button-primary icon-book-open">De tus libros</button>
						</div>
						<div class="ss-row-padding">
							<button data-opt="3" class="ss-button-primary icon-camera-1">Tomar una foto</button>
						</div>
						<div class="ss-row-padding">
							<button data-opt="4" class="ss-button-primary icon-globe-5">De internet</button>
						</div>
					</div>
				</div>
			</article>`,
		multimediaDOMResponsive:`<div class="multimediaDOMResponsive">`+
				`<div class="icogns animated">
					<div class="icon-music-1" data-selected="0" data-opt="music">Música</div>
				</div>`+
				`<div class="icogns animated">
					<div class="icon-th-list-2" data-selected="0" data-opt="list">Listas</div>
				</div>`+
				`<div class="icogns animated">
					<div class="icon-video-4" data-selected="0" data-opt="vide">Vídeos</div>
				</div>`+
				`<div class="icogns animated">
					<div class="icon-th-3" data-selected="0" data-opt="all">Todo</div>
				</div>`+
				`<div class="contentMultimeRespo"><i class="ss-close-icon icon-cancel"></i></div>`+
			`</div>`
		,
		tmplHsitoryVisit:data=>{
			let prom=new Promise((ress, err)=>{
				let domH='<div class="posting POST'+data.fila5.cod+'">'+
							'<div data-opt="time">'+
								'<span class="timeVisitTime" data-time="'+data.fila5.fecha+'">'+moment(data.fila5.fecha).fromNow()+'</span> <strong>'+moment(data.fila5.fecha).format('MMM Do YY')+'</strong>'+
							'</div>'+
							'<div data-opt="history">';
							splitStringMsg(data.hsHtml, emoticonsDecode, {codec:true}).then(res=>{
									domH+=res+'</div>'+
									(data.fls?
											(typeof(data.fls)==='object'?
												html.files(data.fls)
											:
												data.fls
											)
										:
											'<article></article>'
										)+
									'<div data-opt="actions">'+
										'<span data-action="1" data-resp="fases'+data.fila5.cod+'" data-opt="res" class=""><i class="responsiveIcon icon-reply-3"></i><span class="textResponsive">Responder </span><strong>'+data.cantidad+'</strong></span>'+
										(String(data.fila5.Ucod)===(localStorage.user?localStorage.user.substr(4):'')?'<span class="" data-deleteh="'+data.fila5.cod+'" data-action="1" data-opt="delete"><i class="responsiveIcon icon-trash-6"></i><span class="textResponsive">Eliminar</span><strong></strong></span>':'<span data-action="1" data-share="'+data.fila5.cod+'" data-opt="share"><i class="responsiveIcon icon-share-2"></i><span class="textResponsive">Difundir</span><strong></strong></span>')+
										'<span data-likehis="'+data.fila5.cod+'" data-action="'+(data.meLike?0:1)+'" data-opt="like" class=""><i class="responsiveIcon icon-heart-4"></i><span class="textResponsive">Me gusta </span><strong>'+data.likeCount+'</strong></span>'+
										'<span data-nolikehis="'+data.fila5.cod+'" data-action="'+(data.meNolike?0:1)+'" class="" data-opt="nolike"><i class="responsiveIcon icon-heart-broken"></i><span class="textResponsive">No me gusta </span><strong>'+data.nolikeCount+'</strong></span>'+
									'</div>'+
									'<section id="respuesta" class="fases'+data.fila5.cod+'rgab"></section>'+
								'</div>';
								ress(domH)
							})
			});
			return prom;
		},newPostVisit:data=>`<article class="newPostVisit bubble">
				<div>
					<div>
						<button class="ss-button-primary icon-reply-1">Publicar</button>
					</div>
					<div class="limitStr">280</div>
				</div><div>
					<textarea id="newPostVisit" placeholder="Escribele tu historia...">@${data.nick} </textarea>
				</div>
				<div>
					<span class="hideInputFile icon-attach ss-button-primary">Cargar Archivo <input type="file" id="fileVisit"/></span>
				</div>
				<div class="previwVsiitFile"></div>
			</article>`,
		upImgChat:file=>`<div class="upImgChat" data-name="${file.name}">
				<strong>subiendo...</strong>
				<div class="progress">
					<div></div>
				</div>
			</div>`,
		domPerfil2:data=>{
			return '<section class="contentAll">'+
				'<section data-columns="0">'+
					`<header class="bannered ${(
							data.leyenda.length<100?
								'minLegend'
							:
								(data.leyenda.length>99&&data.leyenda.length<200)?
									'midLegend'
								:
									'maxLegend'
						)}" data-codim="${data.bnFotos}" style="background-image: url(${data.bnDir})">`+
						`<div class="bannerf2" style="background-image: url(${data.bnDir});"></div>`+
						`<div class="bannerf3" style="background-image: url(${data.bnDir});"></div>`+
						'<div class="imgPerfilCont">'+
							'<img data-nick="'+data.nick+'" class="imgPerfil-visit" data-codim="'+data.pFotos+'" data-imgp="'+data.imgsUser[0]+'" src="'+data.pDir+'" data-codity="'+data.cod+'" alt="@'+data.nick+'">'+
							(data.friend===1?
							'<div class="optChImg" title="Cambiar foto de perfil">'+
								'<i class="icon-camera-6"></i>'+
								'<ul>'+
									'<li><span data-opt="0" class="icon-picture-1 noSpace"> Cambiar Foto</span>'+
										'<ul><li data-opt2="0" class="icon-hdd hideInputFile">Del computador'+
											'<input type="file" name="perfil" data-opt="perfil">'+
										'</li><li data-opt2="1" class="icon-th-2">De tus Libros</li><li data-opt2="2" class="icon-camera-1">Con la Cámara</li><li data-opt2="3" class="icon-link-1">De Internet</li></ul>'+
									'</li><li><span class="icon-resize-full-3 noSpace" data-opt="1"> Acomodar Foto</span></li>'+
								'</ul>'+
							'</div>'
							:'')+
						'</div>'+
						'<div class="infosy">'+
							'<span class="name">'+data.nombres+'</span>'+
							`<span style="color:${data.color_leyenda}; text-shadow: 0 0 5px ${data.shadow_legend}" data-text="${data.leyenda}" data-colors='{"color":"${data.color_leyenda}","shadow":"${data.shadow_legend}"}' class="legend">${data.leyenda}</span>`+
						'</div>'+
						(data.friend===1?
						'<div class="optChBanner unIconBannerCamera">'+
							'<i class="icon-camera-1"></i><ul>'+
								'<li><span data-opt="0" class="icon-picture-1 noSpace">Cambiar la foto</span>'+
									'<ul>'+
										'<li data-opt2="0" class="noSpace icon-hdd hideInputFile">Del computador<input type="file" name="banner" data-opt="banner"></li>'+
										'<li data-opt2="1" class="noSpace icon-th-2">De tus libros</li>'+
										'<li data-opt2="2" class="noSpace icon-camera-1">Con la cámara</li>'+
										'<li data-opt2="3" class="noSpace icon-link-1">De internet</li>'+
									'</ul>'+
								'</li>'+
								'<li><span data-opt="1" class="icon-resize-full-3 noSpace">Acomodar</span></li>'+
							'</ul>'+
						'</div>':'')+
					'</header>'+
					'<nav>'+
						'<a href="/" data-home class="ss-home"><i class="respos icon-home-4"></i><span class="resposText">Inicio</span></a>'+
						(data.friend===1?
						'<li class="busr optinos">'+
							'<span class=""><i class="respos icon-cog-3"></i><span class="resposText">Opciones</span></span>'+
							'<ul class="optionsy">'+
								'<li class="" data-opt="design"><a class="editDsign" href="/design/"> Diseño</a></li>'+
								'<li class="" data-opt="data"><a class="editData" href="/myInfo/"> Datos</a></li>'+
							'</ul>'+
						'</li>':''
						)+
						'<li class="busr serachinput2">'+
							'<input type="text" placeholder="buscar">'+
							'<div id="search"></div>'+
						'</li>'+
						`<li class="searchResponsive"><i class="icon-search-2"></i></li>`+
						'<a class="write icon-feather-1" href="#">escribele algo</a>'+
						(data.friend?(data.friend===2?'<span data-foll="0" data-click="true" data-dass="12'+data.cod+'" class="button boton-cancel">No seguir</span>':''):'<span data-foll="1" data-click="true" data-dass="12'+data.cod+'" class="button boton-succes">seguir</span>')+
						`<li class="connectsf">
							<i class="icon-menu"></i>
						</li>`+
					'</nav>'+
					'<section class="subbodyy">'+
						'<article class="-opt-visitor">'+
							'<div class="-opt-header-menu">'+
								'<span data-op="0">Fotos</span>'+
								'<span data-op="1">Seguidores</span>'+
								'<span data-op="2">Siguiendo</span>'+
								'<span data-op="3">Multimedia</span>'+
							'</div>'+
							'<div class="-opt-little-content">'+
							'</div>'+
						'</article>'+
						'<article class="mainPost">'+
							`<div class="tabsOptUser">`+
								`<div class="taby" data-selected="0" data-section="pict">`+
									`<i class="iconTaby icon-picture"></i>`+
									`<span class="minititle">Fotos</span>`+
								`</div>`+
								`<div class="taby" data-selected="0" data-section="folls">`+
									`<i class="iconTaby icon-user"></i>`+
									`<span class="minititle">Seguidores</span>`+
								`</div>`+
								`<div class="taby" data-selected="0" data-section="follw">`+
									`<i class="iconTaby icon-user"></i>`+
									`<span class="minititle">Siguiendo</span>`+
								`</div>`+
								`<div class="taby" data-selected="1" data-section="hist">`+
									`<i class="iconTaby icon-pencil"></i>`+
									`<span class="minititle">Historias</span>`+
								`</div>`+
								`<div class="taby" data-selected="0" data-section="medi">`+
									`<i class="iconTaby icon-cd"></i>`+
									`<span class="minititle">Multimedia</span>`+
								`</div>`+
								`<div class="contentTabies"></div>`+
							`</div>`+
							`<article class="posters">
							</article>`+
						'</article>'+
					'</section>'+
				'</section>'+
				'<aside data-columns="1">'+
					'<article class="-as-prompt">'+
						'<h4>Sugerencias</h4>'+
					'</article>'+
					'<article class="-as-connects">'+
						'<h4>Conectados</h4>'+
					'</article>'+
				'</aside>'+
			'</section>';
		}
	}
}