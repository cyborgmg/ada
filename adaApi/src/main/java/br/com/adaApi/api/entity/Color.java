package br.com.adaApi.api.entity;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the COLOR database table.
 * 
 */
@Entity
@NamedQuery(name="Color.findAll", query="SELECT c FROM Color c")
public class Color implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="COLOR_ID_GENERATOR", sequenceName="COLOR_SQ", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="COLOR_ID_GENERATOR")
	private Long id;

	private String nome;

	//bi-directional many-to-one association to Car
	/*@OneToMany(mappedBy="color")
	private List<Car> cars;*/

	public Color() {
	}

	public Color(Long id, String nome) {
		super();
		this.id = id;
		this.nome = nome;
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return this.nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
/*
	public List<Car> getCars() {
		return this.cars;
	}

	public void setCars(List<Car> cars) {
		this.cars = cars;
	}

	public Car addCar(Car car) {
		getCars().add(car);
		car.setColor(this);

		return car;
	}

	public Car removeCar(Car car) {
		getCars().remove(car);
		car.setColor(null);

		return car;
	}
*/
}