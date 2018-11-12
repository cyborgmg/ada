package br.com.adaApi.api.service.impl;


import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.adaApi.api.entity.Car;
import br.com.adaApi.api.entity.Color;
import br.com.adaApi.api.repository.CarRepository;
import br.com.adaApi.api.service.CarService;

@Service
public class CarServiceImpl implements CarService {

	@Autowired
	private CarRepository carRepository;
	
	@Override
	public List<Car> findCarParams(String brand, Color color, BigDecimal price, String saleDate, Long year) {

		String sbrand = ((brand!=null)&&(!brand.isEmpty()))?brand:"";
		String scolornome = color==null?"":( ((color.getNome()!=null)&&(!color.getNome().isEmpty()))?color.getNome():"" );
		String sprice = ((price!=null)&&(price.intValue()!=0))?price.toString():"";
		String ssaleDate = saleDate!=null?saleDate:"";
		String syear = year!=null?year.toString():"";
		
		return carRepository.findCarParams(sbrand, scolornome, sprice, ssaleDate, syear);
	}
	
	@Override
	public List<Car> findAll() {
		// TODO Auto-generated method stub
		return carRepository.findAll();
	}
	
	@Override
	public Car createOrUpdate(Car car) {
		// TODO Auto-generated method stub
		return carRepository.save(car);
	}
	
	@Override
	public Car findById(Long id) {
		// TODO Auto-generated method stub
		return carRepository.findById(id).get();
	}
	
	@Override
	public void delete(Long id) {
		// TODO Auto-generated method stub
		carRepository.deleteById(id);
	}

}
