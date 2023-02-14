<%@ include file="/init.jsp" %>

<portlet:resourceURL id="/analitica/obtieneGrafica" var="obtieneGrafica" />
<portlet:resourceURL id="/analitica/obtieneGraficaSerial" var="obtieneGraficaSerial" />

<link rel="stylesheet" href="<%=request.getContextPath()%>/css/export.css">

<style>
	text.amcharts-funnel-label {
	    font-size: 15px;
	}

</style>

<div class="miClaseMensaje"></div>

<div style="display:none;">
	<input id="obtieneGrafica" type="hidden" value="<%= obtieneGrafica %>">
	<input id="obtieneGraficaSerial" type="hidden" value="<%= obtieneGraficaSerial %>">
</div>

<div class="col-12 mt5">
        
	<br/><h5><liferay-ui:message key="analiticaportlet_Analiticaportletmvcportlet.tituloPrincipal"/></h5><br/>

	<form id="formObtieneGrafica" action="${obtieneGrafica}" method="POST">
		<div class="row linea">
		    <div class="col-sm-4">
		        <div class="md-form form-group">
		            <input type="text" id="anoFolio" class="form-control" name="ano" maxlength="4">
		            <label for="ano" ><liferay-ui:message key="analiticaportlet_Analiticaportletmvcportlet.tituloOpcionAno"/></label>
		        </div>
		    </div>
			<div class="col-sm-4">
			    <div class="md-form form-group">
			        <select name="mes" class="mdb-select" id="mesGrafica" >
				       	<option value="-1"> <liferay-ui:message key="analiticaPortlet.seleccione"/> </option>
				       	<option value="0">Todos</option>
						<c:forEach items="${meses}" var="estado">
							<option value="${estado.key}" >${estado.value}</option>
						</c:forEach>
					</select>
			        <label for="mes" ><liferay-ui:message key="analiticaportlet_Analiticaportletmvcportlet.tituloOpcionMes"/></label>
			    </div>
			</div>
			<div class="col-sm-4">
			    <div class="md-form form-group">
			        <select name="agente" class="mdb-select colorful-select dropdown-primary" id="listaAgente" searchable='<liferay-ui:message key="ModuloComisionesPortlet.buscar" />'>
                   		<c:if test="${fn:length(listaAgente) > 1}">
							<option value="0" > Todos </option>
						</c:if>
				       	
				       	<c:set var = "estatusAnterior" value = ""/>
						<c:forEach items="${listaAgente}" var="agente">
							<c:if test = "${agente.idPersona == idAgente}" >
								<c:set var = "estatusAnterior" value = "selected"/>
							</c:if>
							<option value="${agente.idPersona}" ${estatusAnterior }>${agente.nombre} ${agente.appPaterno} ${agente.appMaterno}</option>
							<c:set var = "estatusAnterior" value = ""/>
						</c:forEach>
					</select>
			        <label for="mes" ><liferay-ui:message key="analiticaportlet_Analiticaportletmvcportlet.tituloAgente"/></label>
			    </div>
			</div>
		</div>
		
		</form>
		<div class="row">
			<div class="col-sm-12">
			    <div class="md-form form-group form_search btn_search">
			    	<button type="button" class="btn btn-blue pull-right" id="btn-actu" onclick="obtieneGraficaNueva();">
			        	<a><liferay-ui:message key="analiticaportlet_Analiticaportletmvcportlet.tituloActualizar"/></a>
			        </button>
			    </div>
			</div>
		</div>
        
	<div class="row linea">
		<div class="col-md-12">						
			<div class="progress-search progress primary-color-dark bar" style="display:none">
				<div class="indeterminate"></div>
			</div>
		</div>
		
		<!--graficas oculta-->
        <div class="col-md-12">							
            <div class="row container-fluid graficaCono" style="display:none">						
	            <div class="card col-sm-12">
	                <div class="card-header primary-color white-text"><liferay-ui:message key="analiticaportlet_Analiticaportletmvcportlet.tituloTabla"/></div>
	                <div class="card-body">                                    
	                    <div id="chartdiv2" style="width: 100%; height: 400px; background-color: #FFFFFF;" ></div>
	                    
	                </div>
	            </div>
	        </div>
		</div>
		<div class="col-md-12">						
			<div class="row container-fluid graficaHorizontal" style="display:none">						
	            <div class="card col-sm-12">
	                <div class="card-header primary-color white-text"><liferay-ui:message key="analiticaportlet_Analiticaportletmvcportlet.tituloTabla2"/></div>
	                <div class="card-body">
	                    <div id="chartdiv5" style="width: 100%; height: 400px; background-color: #FFFFFF;" ></div>
	                </div>
	            </div>                                
	        </div>
		</div>
		
	</div>                    
</div>


<script src="<%=request.getContextPath()%>/js/main.js"></script>


