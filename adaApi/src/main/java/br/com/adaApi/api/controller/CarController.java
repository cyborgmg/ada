package br.com.adaApi.api.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.adaApi.api.entity.Car;
import br.com.adaApi.api.response.Response;
import br.com.adaApi.api.service.CarService;

@RestController
@RequestMapping("/api/car")
@CrossOrigin(origins="*")
public class CarController {

	@Autowired
	private CarService carService;
	
	@PostMapping
	@PreAuthorize("hasAnyRole('ADMIN','CUSTUMER')")
	public ResponseEntity<Response<List<Car>>> findCarParams(HttpServletRequest request, @RequestBody Car car, BindingResult result){
		Response<List<Car>> response = new Response<List<Car>>();
		try {
			
			if(result.hasErrors()) {
				result.getAllErrors().forEach(error-> response.getErrors().add(error.getDefaultMessage()));
				return ResponseEntity.badRequest().body(response);
			}
			
			List<Car> carlocks = carService.findCarParams(car.getBrand(), car.getColor(), car.getPrice(), car.getSaleDate(), car.getYear());
			
			response.setData(carlocks);
			
		} catch (Exception e) {
			response.getErrors().add(e.getMessage());
			return ResponseEntity.badRequest().body(response);
		}
		return ResponseEntity.ok(response);
	}
	
	@GetMapping
	@PreAuthorize("hasAnyRole('ADMIN')")
	public ResponseEntity<Response<List<Car>>> findAll(){
		Response<List<Car>> response = new Response<List<Car>>();
		List<Car> cars = carService.findAll();		
		response.setData(cars);		
		return ResponseEntity.ok(response);	
	}
	
}
