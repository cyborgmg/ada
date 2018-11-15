package br.com.adaApi.api.service.impl;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.adaApi.api.dto.DropDown;
import br.com.adaApi.api.entity.Color;
import br.com.adaApi.api.repository.ColorRepository;
import br.com.adaApi.api.service.ColorService;

@Service
public class ColorServiceImpl implements ColorService {

	@Autowired
	private ColorRepository colorRepository;
	
	@Override
	public List<Color> findAll() {
		// TODO Auto-generated method stub
		return colorRepository.findAll();
	}
	
	@Override
	public List<DropDown<Color>> findAllDropDown() {
		
		List<DropDown<Color>> dropDownColors = new ArrayList<DropDown<Color>>();
		
		List<Color> colors = colorRepository.findAll();
		
		dropDownColors.add( new DropDown<Color>("Select Color",null) );
		for (Color color : colors) {
			dropDownColors.add( new DropDown<Color>(color.getNome(),color) );
		}
		
	return dropDownColors;	
	}
	
}
