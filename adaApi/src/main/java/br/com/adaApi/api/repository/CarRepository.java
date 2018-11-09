package br.com.adaApi.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.adaApi.api.entity.Car;

public interface CarRepository extends JpaRepository<Car, Long> {
	
	@Query("from Car c where c.brand like :brand ||'%' and c.color.nome like :colornome ||'%' and c.price like :price ||'%' and to_char( c.saleDate, 'dd/mm/yyyy' ) like :saleDate ||'%' and c.year like :year ||'%'")
	List<Car> findCarParams(@Param("brand") String brand, @Param("colornome") String colornome, @Param("price") String price, @Param("saleDate") String saleDate, @Param("year") String year);

}
