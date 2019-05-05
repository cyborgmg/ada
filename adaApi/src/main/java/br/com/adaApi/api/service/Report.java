package br.com.adaApi.api.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import net.sf.jasperreports.engine.JRException;

public interface Report<T> {

	byte[] print(String relat, Map<String, Object> params, List<T> lst) throws IOException, JRException;

	

}
