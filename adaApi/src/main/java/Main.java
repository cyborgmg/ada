import java.text.ParseException;

import org.springframework.web.client.RestTemplate;

import br.com.adaApi.api.security.jwt.JwtAuthenticationRequest;

public class Main {

	public static void main(String[] args) throws ParseException {
		
		
		final String uri = "http://localhost:8080/api/auth";
	     
		RestTemplate restTemplate = new RestTemplate();
	     
		JwtAuthenticationRequest result = restTemplate.getForObject(uri, JwtAuthenticationRequest.class);
	     
	    System.out.println(result);

	}

}

