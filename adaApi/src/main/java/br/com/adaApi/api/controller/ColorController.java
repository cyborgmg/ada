package br.com.adaApi.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.adaApi.api.dto.DropDown;
import br.com.adaApi.api.entity.Color;
import br.com.adaApi.api.response.Response;
import br.com.adaApi.api.service.ColorService;

@RestController
@RequestMapping("/api/color")
@CrossOrigin(origins="*")
public class ColorController {

	@Autowired
	private ColorService colorService;
	
	@GetMapping("/dropdown")
	@PreAuthorize("hasAnyRole('ADMIN','CUSTUMER','TECHNICIAN')")
	public ResponseEntity<Response<List<DropDown<Color>>>> findAllDropDown(){
		Response<List<DropDown<Color>>> response = new Response<List<DropDown<Color>>>();
		List<DropDown<Color>> dropDownColors = colorService.findAllDropDown();		
		response.setData(dropDownColors);		
		return ResponseEntity.ok(response);	
	}
	
}
