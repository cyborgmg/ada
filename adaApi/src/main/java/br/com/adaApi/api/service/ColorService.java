package br.com.adaApi.api.service;

import java.util.List;

import br.com.adaApi.api.dto.DropDown;
import br.com.adaApi.api.entity.Color;

public interface ColorService {

	List<Color> findAll();

	List<DropDown<Color>> findAllDropDown();

}
