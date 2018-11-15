package br.com.adaApi.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.adaApi.api.entity.Car;

public interface CarRepository extends JpaRepository<Car, Long> {
	
	@Query("select c from Car c left join c.color where c.brand like :brand ||'%' and nvl(c.color.nome,' ') like :colornome ||'%' and nvl(c.price,0) like :price ||'%' and to_char( nvl(c.saleDate,SYSDATE) , 'dd/mm/yyyy' ) like :saleDate ||'%' and nvl(c.year,0) like :year ||'%'")
	List<Car> findCarParams(@Param("brand") String brand, @Param("colornome") String colornome, @Param("price") String price, @Param("saleDate") String saleDate, @Param("year") String year);

}
