package br.com.adaApi.api.service;

import java.math.BigDecimal;
import java.util.List;

import br.com.adaApi.api.entity.Car;
import br.com.adaApi.api.entity.Color;

public interface CarService {

	List<Car> findAll();

	List<Car> findCarParams(String brand, Color color, BigDecimal price, String saleDate, Long year);

	Car createOrUpdate(Car car);

	Car findById(Long id);

	void delete(Long id);

}
