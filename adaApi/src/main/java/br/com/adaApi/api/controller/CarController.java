package br.com.adaApi.api.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.adaApi.api.entity.Car;
import br.com.adaApi.api.response.Response;
import br.com.adaApi.api.service.CarService;
import br.com.adaApi.api.service.Report;
import net.sf.jasperreports.engine.JRException;

@RestController
@RequestMapping("/api/car")
@CrossOrigin(origins="*")
public class CarController {

	@Autowired
	private CarService carService;
	
	@Autowired
	private Report<Car> reportCar;
	
	
	@PostMapping("/find")
	@PreAuthorize("hasAnyRole('ADMIN','CUSTUMER','TECHNICIAN')")
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
	@PreAuthorize("hasAnyRole('ADMIN','CUSTUMER','TECHNICIAN')")
	public ResponseEntity<Response<List<Car>>> findAll(){
		Response<List<Car>> response = new Response<List<Car>>();
		List<Car> cars = carService.findAll();		
		response.setData(cars);		
		return ResponseEntity.ok(response);	
	}
	
	@PostMapping
	@PreAuthorize("hasAnyRole('ADMIN','CUSTUMER','TECHNICIAN')")
	public ResponseEntity<Response<Car>> createOrUpdate(HttpServletRequest request, @RequestBody Car car, BindingResult result){
		
		Response<Car> response = new Response<Car>();
		
		try {
			validateCreateCar(car, result);
			if(result.hasErrors()) {
				result.getAllErrors().forEach(error-> response.getErrors().add(error.getDefaultMessage()));
				return ResponseEntity.badRequest().body(response); 
			}
			Car carPersisted = (Car) carService.createOrUpdate(car);
			response.setData(carPersisted);
		} catch (DuplicateKeyException de) {
			response.getErrors().add("Car already registred !");
			return ResponseEntity.badRequest().body(response);
		}catch (Exception e) {
			response.getErrors().add(e.getMessage());
			return ResponseEntity.badRequest().body(response);
		}
		
		return ResponseEntity.ok(response);
	}
	
	private void validateCreateCar(Car car, BindingResult result) {
		if(car.getBrand()==null) {
			result.addError(new ObjectError("Car", "Brand no information"));
		}
	}
	
	@DeleteMapping(value="{id}")
	@PreAuthorize("hasAnyRole('ADMIN','CUSTUMER','TECHNICIAN')")
	public ResponseEntity<Response<String>> delete(@PathVariable("id") Long id){
		Response<String> response = new Response<String>();
		Car car = carService.findById(id);
		if(car==null) {
			response.getErrors().add("Register not found "+id);
			return ResponseEntity.badRequest().body(response);
		}
		carService.delete(id);
		return ResponseEntity.ok(new Response<String>());
	}
	
	@PostMapping("/print")
	@PreAuthorize("hasAnyRole('ADMIN','CUSTUMER','TECHNICIAN')")
	public ResponseEntity<byte[]> printAll(HttpServletRequest request, @RequestBody List<Car> cars, BindingResult result) throws JRException, IOException {
		
		return ResponseEntity.ok(reportCar.print("reports/carreport.jrxml", new HashMap<>(), cars));
		
	}
	
}
