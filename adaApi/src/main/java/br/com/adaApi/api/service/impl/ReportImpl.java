package br.com.adaApi.api.service.impl;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import br.com.adaApi.api.service.Report;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Service
public class ReportImpl<T> implements Report<T>{
	
	@Autowired
	ApplicationContext context;
	
	@Override
	public byte[] print(String relat, Map<String, Object> params, List<T> lst) throws IOException, JRException{
		
		
		Resource resource = context.getResource("classpath:"+relat);
		
		InputStream inputStream = resource.getInputStream();
		
		JasperReport jasperReport = JasperCompileManager.compileReport( inputStream );
		  
		JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource( lst );
		
		JasperPrint print = JasperFillManager.fillReport(jasperReport, params, ds);
		
	return JasperExportManager.exportReportToPdf(print);	
	}
	
}
