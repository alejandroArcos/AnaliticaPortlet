package com.tokio.cotizador.analitica.portlet.command;

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
import com.tokio.cotizador.Bean.SolicitudResponseProducto;
import com.tokio.cotizador.analitica.portlet.constans.AnaliticaPortletKeys;

@Component(
		immediate = true, 
		property = { "javax.portlet.name=" + AnaliticaPortletKeys.PORTLET_NAME,
					 "mvc.command.name=/analitica/obtieneGraficaSerial" },
		service = MVCResourceCommand.class
)

public class ObtieneGraficaSerialMVCResourceCommand extends BaseMVCResourceCommand{

	private static Log _log = LogFactoryUtil.getLog(ObtieneGraficaSerialMVCResourceCommand.class);
	
	@Reference
	CotizadorService _CotizadorService;

	@Override
	protected void doServeResource(ResourceRequest resourceRequest, ResourceResponse resourceResponse)
			throws Exception {
		_log.info("ObtieneGraficaSerialMVCResourceCommand....");
		ThemeDisplay themeDisplay = (ThemeDisplay)resourceRequest.getAttribute(WebKeys.THEME_DISPLAY);
		String usuario = themeDisplay.getUser().getFullName();
		String pantalla = "LOGIN";
		//Se envia un cero significa que es filtrar por todos
//		String agente = "2976";
		
		int year = ParamUtil.getInteger(resourceRequest, "anoBusqueda");
		int month = ParamUtil.getInteger(resourceRequest, "mesBusqueda");
		String agente = ParamUtil.getString(resourceRequest, "agente");
		_log.info("año: "+ year +" mes:"+month);
		
		SolicitudResponseProducto solProdResp = null;
		
		try {
			solProdResp = _CotizadorService.getCotSolProd(year, month, agente, usuario, pantalla);
			Gson gson = new Gson();
			String stringJsonDatos = gson.toJson(solProdResp.getListaDatosKPIProd());
			resourceResponse.getWriter().write(stringJsonDatos);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
	}

}
