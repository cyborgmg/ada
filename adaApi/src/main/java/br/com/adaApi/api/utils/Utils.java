package br.com.adaApi.api.utils;

import java.io.IOException;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.annotate.JsonAutoDetect.Visibility;
import org.codehaus.jackson.annotate.JsonMethod;
import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

public class Utils {
	
	public static <T> T deserializeJson(final String json, final Class<T> clazz) throws JsonParseException, JsonMappingException, IOException {
	    ObjectMapper om = new ObjectMapper();
	    om.setVisibility(JsonMethod.FIELD, Visibility.ANY);
	    om.configure(DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES, false);
	    return om.readValue(json, clazz);
	}

	public static <T> String serializeToJson(final T object) throws JsonGenerationException, JsonMappingException, IOException {
	    ObjectMapper om = new ObjectMapper();
	    om.setVisibility(JsonMethod.FIELD, Visibility.ANY);
	    return om.writeValueAsString(object);
	}

}
