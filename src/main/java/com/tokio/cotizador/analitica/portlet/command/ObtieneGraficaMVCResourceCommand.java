package com.tokio.cotizador.analitica.portlet.command;

import java.util.Calendar;

import javax.portlet.ResourceRequest;
import javax.portlet.ResourceResponse;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import com.google.gson.Gson;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.portlet.bridges.mvc.BaseMVCResourceCommand;
import com.liferay.portal.kernel.portlet.bridges.mvc.MVCResourceCommand;
import com.liferay.portal.kernel.theme.ThemeDisplay;
import com.liferay.portal.kernel.util.ParamUtil;
import com.liferay.portal.kernel.util.WebKeys;
import com.tokio.cotizador.CotizadorService;
import com.tokio.cotizador.Bean.SolicitudResponse;
import com.tokio.cotizador.Bean.SolicitudResponseProducto;
import com.tokio.cotizador.Exception.CotizadorException;
import com.tokio.cotizador.analitica.portlet.constans.AnaliticaPortletKeys;


@Component(
		immediate = true, 
		property = { "javax.portlet.name={" + AnaliticaPortletKeys.PORTLET_NAME+"",
					 "mvc.command.name=/analitica/obtieneGrafica" },
		service = MVCResourceCommand.class
)

public class ObtieneGraficaMVCResourceCommand extends BaseMVCResourceCommand{
	
	private static Log _log = LogFactoryUtil.getLog(ObtieneGraficaMVCResourceCommand.class);
	
	@Reference
	CotizadorService _CotizadorService;

	@Override
	protected void doServeResource(ResourceRequest resourceRequest, ResourceResponse resourceResponse)
			throws Exception {
		_log.info("ObtieneGraficaMVCResourceCommand....");
		ThemeDisplay themeDisplay = (ThemeDisplay)resourceRequest.getAttribute(WebKeys.THEME_DISPLAY);
		String usuario = themeDisplay.getUser().getFullName();
		String pantalla = "LOGIN";
		//Se envia un cero significa que es filtrar por todos
//		String agente = "0";
		String agente = ParamUtil.getString(resourceRequest, "agente");

		int year = ParamUtil.getInteger(resourceRequest, "anoBusqueda");
		int month = ParamUtil.getInteger(resourceRequest, "mesBusqueda");
		//_log.info("año: "+ year +" mes:"+month);
		
		SolicitudResponse solResp = null;
		
		try {
			solResp = _CotizadorService.getCotSol(year, month, agente, usuario, pantalla);
			Gson gson = new Gson();
			String stringJsonDatos = gson.toJson(solResp.getListaDatosKPI());
			resourceResponse.getWriter().write(stringJsonDatos);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		//_log.info("gson1:"+ stringJsonDatos);
		
		
		
	}

}
