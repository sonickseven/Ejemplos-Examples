var circle={
	data:{
		services:{}
	},
	events:function(){

	},
	sockets:function(){
		console.log('llamando a los sockets')
		socket.on('dataJSON', function(data){
			console.log(data[3])
			if(circle.data.services[data[3]])
				circle.data.services[data[3]].push(data)
			else
				circle.data.services[data[3]]=[data]
		})
	},
	templates:{
		circleDiv:'<div id="popUpModalcircle" class="modal fade" role="dialog">'+
				'<div class="modal-dialog">'+
					'<div class="modal-content">'+
						'<div class="modal-header">'+
							'<button type="button" class="close" data-dismiss="modal">&times;</button>'+
							'<h4 class="modal-title" ng-model="title"></h4>'+
						'</div>'+
						'<div class="modal-body">'+
							'<div class="circle"></div>'+
							'<div class="modal-body2"></div>'+
							'<p ng-model="body"></p>'+
						'</div>'+
						'<div class="modal-footer">'+
							'<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>'
	},
	init:function(){
		

	}, logic:{
		drawCircle:function(arcvs){
			console.log('jjajaja')
			if($('#popUpModalcircle').length)
				$('#popUpModalcircle').remove()
			$('.payHomeContent').append(circle.templates.circleDiv)
			var tau = 2 * Math.PI; // http://tauday.com/tau-manifesto

			setTimeout(function(){
				$('#popUpModalcircle').modal('show')
			},500)

			var dimens={width: $('.circle').width(), height: $('.circle').height()},
				minRa=Math.min(dimens.width, dimens.height)
			var svg=d3.select('.circle')
				.append('svg')
				.attr('viewBox', '0 0 '+dimens.width+' '+dimens.height)
			function degs(ang){
				return ang*(Math.PI/180)
			}
			var arcos=[], groups=[],numi=0,
				color = d3.scaleOrdinal(d3.schemeCategory10);

			var group=svg.append('g')
				.attr('transform', 'translate('+dimens.width/2+','+dimens.height/2+')')
				.attr('class', 'father-sub')

			var arc = d3.arc()
				.innerRadius((minRa/2)-50)
				.outerRadius(minRa/2)
			
			function addArchs(){
				if(numi<arcvs.length){
					groups[numi]=group.append('g')
					.datum({startAngle: 0, endAngle: 0})
					.attr("class", arcvs[numi][3]);
					arcos[numi]=groups[numi].append('path')
					.datum({startAngle: 0, endAngle: 0})
					.style('fill', color(numi))
					.attr("d", arc)
					.attr("id", arcvs[numi][3])
					groups[numi].append('text')
					.attr('class', 'option-menu')
					.attr('dy', (0.006*(minRa/2))+'em')
					.append('textPath')
					.attr('xlink:href', '#'+ arcvs[numi][3])
					.attr('text-anchor', 'middle')
					.attr('font-weight','bold')
					.attr('fill','#000')
					.attr('font-size',(0.0035*(minRa/2)) + 'em')
					.attr('startOffset', '25%')


					.text(arcvs[numi][1])

					numi++
					addArchs()
				}else{
					console.log('fin de la creación')
				}
			}
			addArchs()
			setTimeout(function() {
				if(arcos.length){
					var parts=360/arcos.length
					var numi=0
					function animateArcs(){
						if(numi<arcos.length){
							arcos[numi].transition()
					 		.duration(2000)
					 		.attrTween("d", arcTween2({sAng: degs(parts*numi), eAng: degs(parts*(numi+1))}));
					 		numi++
					 		setTimeout(animateArcs, 3000)
						}else{
							console.log('listos ya se termino')
						}
					}
					animateArcs()
				}
			}, 1500);
			function arcTween2(data){
				return function(d) {
					var interpolate = d3.interpolate(d.endAngle, data.eAng);
					var interpolate2 = d3.interpolate(d.startAngle, data.sAng);
					return function(t) {
						d.endAngle = interpolate(t);
						d.startAngle = interpolate2(t);
						return arc(d);
					};
				};
			}
		}
	}
}
