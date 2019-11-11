package br.com.adaApi.api.controller;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import br.com.adaApi.api.entity.Car;
import br.com.adaApi.api.entity.Color;
import br.com.adaApi.api.enums.StatusEnum;
import br.com.adaApi.api.repository.CarRepository;
import br.com.adaApi.api.response.Response;
import br.com.adaApi.api.security.jwt.JwtTokenUtil;

import static org.hamcrest.Matchers.*;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.io.IOException;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.List;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
public class CarControllerTest {

	private MockMvc mvc;
	
	private String carjson;
	
	private Car car;

    @MockBean
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private WebApplicationContext context;
    
    @Autowired
	private CarRepository carRepository;

    @Before
    public void setup() throws ParseException, JsonGenerationException, JsonMappingException, IOException {
    	
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();
       this.car = new Car("01", new BigDecimal(100) , (new SimpleDateFormat("dd/MM/yyyy")).parse("01/01/2018"), 2000L, new Color(1L,"Orange"), StatusEnum.B);
       this.carjson =  (new ObjectMapper()).writeValueAsString(car);
    }
    
    @After
    public void finalize() {
        carRepository.deleteAll();
    }
    
	@Test
	@WithMockUser(roles = "ADMIN")
	public void testCreateOrUpdate() throws Exception{

		this.mvc.perform(
				post("/api/car")
				.contentType(MediaType.APPLICATION_JSON)
				.content(this.carjson)
				)
		.andExpect(status().isOk())
		.andExpect(jsonPath("$.data.brand").value("01"));
 	   
	}
	
	
	@Test
	@WithMockUser(roles = "ADMIN")
	public void testFindCarParams() throws Exception {
		
		carRepository.deleteAll();
		
		Response<List<Car>> response = new Response<List<Car>>();
		response.setData( Arrays.asList(carRepository.save(this.car)));
		
		this.mvc.perform(
				post("/api/car/find")
				.contentType(MediaType.APPLICATION_JSON)
				.content(this.carjson)
				)
		.andExpect(status().isOk())
		.andExpect( content().json( (new ObjectMapper()).writeValueAsString(response) ) );
		//.andExpect(jsonPath("$.data[0].brand").value("01"));
	}
	
	
	@Test
	@WithMockUser(roles = "ADMIN")
	public void testFindAll() throws Exception {
		
		carRepository.deleteAll();
		
		Response<List<Car>> response = new Response<List<Car>>();
		response.setData( Arrays.asList(carRepository.save(this.car)));
		
		this.mvc.perform(get("/api/car"))
		.andExpect(status().isOk())
		.andExpect( content().json( (new ObjectMapper()).writeValueAsString(response) ) )
		.andExpect(jsonPath("$.data", hasSize(equalTo(1))));
	}

	@Test
	@WithMockUser(roles = "ADMIN")
	public void testDelete() throws Exception {
		
		this.mvc.perform(
				delete("/api/car/"+carRepository.save(this.car).getId())
				)
		.andExpect(status().isOk())
		.andExpect(jsonPath("$.data", nullValue() ));
	}

}

