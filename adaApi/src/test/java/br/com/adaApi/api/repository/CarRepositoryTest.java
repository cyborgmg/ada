package br.com.adaApi.api.repository;

import static org.junit.Assert.*;
import static org.junit.Assert.assertTrue;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.lang.Iterable;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import br.com.adaApi.api.entity.Car;
import br.com.adaApi.api.entity.Color;
import br.com.adaApi.api.enums.StatusEnum;

import static junit.framework.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
public class CarRepositoryTest {
	
	@Autowired
	private CarRepository carRepository;
	
	private List<Car> cars = new ArrayList<Car>();
	 
    @Before
    public void init() throws ParseException {
    	cars.add(new Car("01", new BigDecimal(100) , (new SimpleDateFormat("dd/MM/yyyy")).parse("01/01/2018"), 2000L, new Color(1L,"Orange"), StatusEnum.B));
    	cars.add(new Car("02", new BigDecimal(200) , (new SimpleDateFormat("dd/MM/yyyy")).parse("03/01/2018"), 2001L, new Color(2L,"Black"), StatusEnum.S));
    	cars.add(new Car("03", new BigDecimal(300) , (new SimpleDateFormat("dd/MM/yyyy")).parse("04/01/2018"), 2002L, new Color(3L,"Gray"), StatusEnum.P));
    	
    	/*
    	cars.forEach( (Car car) -> { 
			car = carRepository.save(car);
		} );
		*/
    }
    
    @After
    public void finalize() {
        cars.clear();
        carRepository.deleteAll();
    }
    

	@Test
	public void testFindCarParams() {
		
		carRepository.saveAll((Iterable<Car>)cars);
		
		assertTrue( cars.get(0).getBrand().equals( carRepository.findCarParams("01", null, null, null, null).get(0).getBrand() ) );
		
		assertTrue( cars.get(1).getYear().equals( carRepository.findCarParams(null, null, "200", null, null).get(0).getYear() ) );
		
		assertTrue( cars.get(2).getSaleDate().equals( carRepository.findCarParams(null, null, null, "04/01/2018", null).get(0).getSaleDate() ) );
		
	}

	
	@Test
	public void testSave() {
		
		assertTrue(carRepository.save(cars.get(0))!=null);
		assertTrue(carRepository.save(cars.get(1))!=null);
		assertTrue(carRepository.save(cars.get(2))!=null);
	}

	
	@Test
	public void testFindAll() {
		
		carRepository.saveAll((Iterable<Car>)cars);
	
		assertEquals(3,carRepository.findAll().size());		
	}

	
	@Test
	public void testFindById() {
		
		this.cars = carRepository.saveAll((Iterable<Car>)cars);
		
		assertTrue(carRepository.findById(cars.get(0).getId())!=null);
		assertTrue(carRepository.findById(cars.get(1).getId())!=null);
		assertTrue(carRepository.findById(cars.get(2).getId())!=null);
		
	}

	
	@Test
	public void testDeleteById() {
		
		this.cars = carRepository.saveAll((Iterable<Car>)cars);
		
		carRepository.deleteById(cars.get(0).getId());
		assertEquals(2,carRepository.findAll().size());
		carRepository.deleteById(cars.get(1).getId());
		assertEquals(1,carRepository.findAll().size());
		carRepository.deleteById(cars.get(2).getId());
		assertEquals(0,carRepository.findAll().size());
	}

}
