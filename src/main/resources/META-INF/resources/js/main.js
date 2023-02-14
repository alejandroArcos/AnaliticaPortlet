
function barraDeProgreso() {	
	
	$('.bar').show();            
    $("#btn-actu").attr("disabled", "disabled");
    var boton = (".btn_search");
   
};

$( "#anoFolio" ).keyup(function() {
	var regex_numeros = /^[0-9]+$/;
	var tam = $("#anoFolio").val();
	$( "div" ).remove( ".alert.alert-danger" );
	
	
	if(tam.match(regex_numeros)){
		if(tam.length < 4){
			$("#btn-actu").attr("disabled", "disabled");
		}else{
			$("#btn-actu").attr("disabled", false);
		}
	}else{
		$("#btn-actu").attr("disabled", "disabled");
		$("#anoFolio").parent().append(
				"<div class=\"alert alert-danger\" role=\"alert\"> <span class=\"glyphicon glyphicon-ban-circle\"></span>"
				+ " " + '<liferay-ui:message key="analiticaportlet_Analiticaportletmvcportlet.tipoEntrada" />' + "</div>");
	}
});

function obtieneGraficaNueva(){
	$( "div" ).remove( ".alert.alert-danger" );
	var anoBusqueda = $("#anoFolio").val();
	var mesBusqueda = $("#mesGrafica").val();
	var agente = $("#listaAgente").val();
	
	if(anoBusqueda == ""){
		$("#anoFolio").parent().append(
				"<div class=\"alert alert-danger\" role=\"alert\"> <span class=\"glyphicon glyphicon-ban-circle\"></span>"
				+ " " + '<liferay-ui:message key="analiticaportlet_Analiticaportletmvcportlet.requerido" />' + "</div>");
		
	}
	if(mesBusqueda == null){
		$("#mesGrafica").parent().append(
				"<div class=\"alert alert-danger\" role=\"alert\"> <span class=\"glyphicon glyphicon-ban-circle\"></span>"
				+ " " + '<liferay-ui:message key="analiticaportlet_Analiticaportletmvcportlet.requerido" />' + "</div>");
		
	}
	console.log("año:"+anoBusqueda +" mes:"+mesBusqueda);
	if(mesBusqueda != null && anoBusqueda !=  "" ){
		console.log("llama a la barra");
		barraDeProgreso();
		
	$.ajax({
        url: $("#obtieneGrafica").val(),
        type: 'POST',
        data: {mesBusqueda: mesBusqueda,
        	anoBusqueda: anoBusqueda,
        	agente: agente	
        },
       	success: function(data){
       		var DatoKPI = JSON.parse(data);
       		$(".graficaInicio").hide();
       		if(DatoKPI == ""){
       			showMessageError('.navbar', 'Error al consultar la información', 0);
       			return;
       		}
       		showMessageSuccess(".navbar", "Exito al obtener la grafica Pipeline",0); 

       		$(".graficaCono").show();       	    
       	    var chart = AmCharts.makeChart( "chartdiv2", {
       	      "type": "funnel",
       	      "theme": "light",
       	      "dataProvider": DatoKPI,
       	      "balloon": {
       	        "fixedPosition": true
       	      },
       	      "valueField": "value",
       	      "titleField": "title",
       	      "marginRight": 240,
       	      "marginLeft": 50,
       	      "startX": -500,
       	      "depth3D": 100,
       	      "angle": 40,
       	      "outlineAlpha": 1,
       	      "outlineColor": "#FFFFFF",
       	      "outlineThickness": 2,
       	      "labelPosition": "right",
       	      "balloonText": "[[title]]: [[value]][[description]]",
       	      "export": {
       	        "enabled": true
       	      },
  	        "listeners": [{
	            "event": "rendered",
	            "method": function(e) {
	            	$('.bar').hide();
	            	$("#btn-actu").removeAttr("disabled");
	            }
	          }]

       	    } );
       	    
       	}	        
    });
	
	$.ajax({
        url: $("#obtieneGraficaSerial").val(),
        type: 'POST',
        data: {mesBusqueda: mesBusqueda,
        	anoBusqueda: anoBusqueda,
        	agente: agente
        	},
       	success: function(data){
       		console.log(data);
       		var DatoKPI = JSON.parse(data);
       		$(".graficaInicio").hide();
       		if(DatoKPI == ""){
       			showMessageError('.navbar', 'Error al consultar la información', 1);
       		}
       		showMessageSuccess(".navbar", "Exito al obtener la grafica Detalle por Producto",1); 
    	    
    	    datosJson = DatoKPI;

    	    dataProviderHorizontal =  '[';
    		contadorJsonObject = 0; 
    		for (var key in $(datosJson)[0]) { 
    			
    			if( key != "producto" ){
    				if( contadorJsonObject !=0 ){
    					dataProviderHorizontal+= ',';
    				}
    				contadorJsonObject++;
    				dataProviderHorizontal+= getJsonForGraphic( datosJson , key );
    			}
    		}
    	    dataProviderHorizontal+=  ']';
    		console.log( "-----------------------------------------------");
    		console.log( dataProviderHorizontal );
    		dataProviderHorizontal = JSON.parse(dataProviderHorizontal);
    	    
    	    
        	$(".graficaHorizontal").show();       	    
    	    var chart = AmCharts.makeChart("chartdiv5", {
    	        "type": "serial",
    	    	"theme": "light",
    	        "legend": {
    	            "horizontalGap": 10,
    	            "maxColumns": 1,
    	            "position": "right",
    	    		"useGraphSettings": true,
    	    		"markerSize": 10
    	        },
    	        "dataProvider": dataProviderHorizontal ,
    	        "valueAxes": [{
    	            "stackType": "regular",
    	            "axisAlpha": 0.5,
    	            "gridAlpha": 0
    	        }],
    		    "graphs": [{
    		        "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
    		        "fillAlphas": 0.8,
    		        "labelText": "[[value]]",
    		        "lineAlpha": 0.3,
    		        "title": "Paquete Empresarial",
    		        "type": "column",
    				"color": "#000000",
    		        "valueField": "Paquete Empresarial"
    		    }, {
    		        "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
    		        "fillAlphas": 0.8,
    		        "labelText": "[[value]]",
    		        "lineAlpha": 0.3,
    		        "title": "Paquete Familiar",
    		        "type": "column",
    				"color": "#000000",
    		        "valueField": "Paquete Familiar"
    		    }, {
    		        "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
    		        "fillAlphas": 0.8,
    		        "labelText": "[[value]]",
    		        "lineAlpha": 0.3,
    		        "title": "R.C",
    		        "type": "column",
    				"color": "#000000",
    		        "valueField": "R.C"
    		    }, {
    		        "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
    		        "fillAlphas": 0.8,
    		        "labelText": "[[value]]",
    		        "lineAlpha": 0.3,
    		        "title": "Vida",
    		        "type": "column",
    				"color": "#000000",
    		        "valueField": "Vida"
    		    }, {
    		        "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
    		        "fillAlphas": 0.8,
    		        "labelText": "[[value]]",
    		        "lineAlpha": 0.3,
    		        "title": "Transporte",
    		        "type": "column",
    				"color": "#000000",
    		        "valueField": "Transporte"
    		    }],
    	        "rotate": true,
    		    "colors": [ "#0066CC","#E20033","#009900","#99CC00","#8A3399","#EB447E","#666666"],
    	        "categoryField": "year",
    	        "categoryAxis": {
    	            "gridPosition": "start",
    	            "axisAlpha": 0,
    	            "gridAlpha": 0,
    	            "position": "left"
    	        },
    	        "export": {
    	        	"enabled": true
    	         },
    	        "listeners": [{
    	            "event": "rendered",
    	            "method": function(e) {
    	            	$('.bar').hide();
    	            	$("#btn-actu").removeAttr("disabled");
    	            }
    	          }]
    	        
    	    } );
       	    
       	}	        
    });
	
	}
};


function getJsonForGraphic( datosJson,key ){
	var dataProviderHorizontal = '';
	dataProviderHorizontal += '{ "year": "'+key+'",';
	var contadorAux = 0;
	
	$.each(datosJson , function(i, objetoJson) { 
		if( contadorAux!=0 ){
			dataProviderHorizontal += ',';
		}
		contadorAux++;
		dataProviderHorizontal += '"'+objetoJson.producto+'":'+ objetoJson[key];
		if( contadorAux== datosJson.length ){
			dataProviderHorizontal += '}';
		}
		
  });

	return dataProviderHorizontal;
}
    