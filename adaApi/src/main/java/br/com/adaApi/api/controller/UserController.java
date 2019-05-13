package br.com.adaApi.api.controller;

import java.io.IOException;
import java.util.stream.*;
import java.util.*;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
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
import br.com.adaApi.api.entity.User;
import br.com.adaApi.api.response.Response;
import br.com.adaApi.api.service.Report;
import br.com.adaApi.api.service.UserService;
import net.sf.jasperreports.engine.JRException;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins="*")
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private Report<User> reportUser;
	
	@PostMapping
	@PreAuthorize("hasAnyRole('ADMIN')")
	public ResponseEntity<Response<User>> createOrUpdate(HttpServletRequest request, @RequestBody User user, BindingResult result){
		
		Response<User> response = new Response<User>();
		
		try {
			validatecreateOrUpdate(user, result);
			if(result.hasErrors()) {
				result.getAllErrors().forEach(error-> response.getErrors().add(error.getDefaultMessage()));
				return ResponseEntity.badRequest().body(response); 
			}
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			User userPersisted = (User) userService.createOrUpdate(user);
			response.setData(userPersisted);
		} catch (DuplicateKeyException de) {
			response.getErrors().add("E-mail already registred !");
			return ResponseEntity.badRequest().body(response);
		}catch (Exception e) {
			response.getErrors().add(e.getMessage());
			return ResponseEntity.badRequest().body(response);
		}
		
		return ResponseEntity.ok(response);
	}
	
	private void validatecreateOrUpdate(User user, BindingResult result) {
		if(user.getEmail()==null) {
			result.addError(new ObjectError("User", "Email no information"));
		}
		if(user.getPassword()==null) {
			result.addError(new ObjectError("User", "Password no information"));
		}
		if(user.getProfile()==null) {
			result.addError(new ObjectError("User", "Profile no information"));
		}
	}
	
	@PostMapping("/find")
	@PreAuthorize("hasAnyRole('ADMIN')")
	public ResponseEntity<Response<List<User>>> findUserParams(HttpServletRequest request, @RequestBody User user, BindingResult result){
		Response<List<User>> response = new Response<List<User>>();
		try {
			if(result.hasErrors()) {
				result.getAllErrors().forEach(error-> response.getErrors().add(error.getDefaultMessage()));
				return ResponseEntity.badRequest().body(response);
			}
			List<User> userlocks = userService.findUserParams(user.getEmail(), user.getProfile());
			response.setData(userlocks);
		} catch (Exception e) {
			response.getErrors().add(e.getMessage());
			return ResponseEntity.badRequest().body(response);
		}
		return ResponseEntity.ok(response);		
	}
	
	@DeleteMapping(value="{id}")
	@PreAuthorize("hasAnyRole('ADMIN')")
	public ResponseEntity<Response<String>> delete(@PathVariable("id") Long id){
		Response<String> response = new Response<String>();
		User user = userService.findById(id);
		if(user==null) {
			response.getErrors().add("Register not found "+id);
			return ResponseEntity.badRequest().body(response);
		}
		userService.delete(id);
		return ResponseEntity.ok(new Response<String>());
	}

	@GetMapping(value="{page}/{count}")
	@PreAuthorize("hasAnyRole('ADMIN')")
	public ResponseEntity<Response<Page<User>>> findAll(@PathVariable int page, @PathVariable int count){
		Response<Page<User>> response = new Response<Page<User>>();
		Page<User> users = userService.findAll(page, count);		
		response.setData(users);		
		return ResponseEntity.ok(response);	
	}
	
	@PostMapping("/print")
	@PreAuthorize("hasAnyRole('ADMIN','CUSTUMER','TECHNICIAN')")
	public ResponseEntity<byte[]> printAll(HttpServletRequest request, @RequestBody List<User> users, BindingResult result) throws JRException, IOException {
		
		//Ordenando por profile
		users = users.stream().sorted(Comparator.comparing(User::getProfile)).collect(Collectors.toList());
		
		return ResponseEntity.ok(reportUser.print("reports/reportUsers.jrxml", new HashMap<>(), users));
		
	}	
}
