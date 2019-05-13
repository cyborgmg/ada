package br.com.adaApi.api.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import br.com.adaApi.api.enums.StatusEnum;


/**
 * The persistent class for the CAR database table.
 * 
 */
@Entity
@NamedQuery(name="Car.findAll", query="SELECT c FROM Car c")
public class Car implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@SequenceGenerator(name="CAR_ID_GENERATOR", sequenceName="CAR_SQ", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="CAR_ID_GENERATOR")
	private Long id;

	private String brand;

	private BigDecimal price;

	@Temporal(TemporalType.DATE)
	@Column(name="SALE_DATE")
	private Date saleDate;

	@Column(name="ANO")
	private Long year;

	//bi-directional many-to-one association to Color
	@ManyToOne
	@JoinColumn(name="ID_COLOR")
	private Color color;
	
	@Enumerated(EnumType.STRING)
	@Column(name="STATUS")
	private StatusEnum status;

	public Car() {
	}

	public Car(String brand, BigDecimal price, Date saleDate, Long year, Color color, StatusEnum status) {
		super();
		this.brand = brand;
		this.price = price;
		this.saleDate = saleDate;
		this.year = year;
		this.color = color;
		this.status = status;
	}



	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBrand() {
		return this.brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public BigDecimal getPrice() {
		return this.price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public String getSaleDate() {
		return this.saleDate!=null?(new SimpleDateFormat("dd/MM/yyyy")).format(this.saleDate):null;
	}

	public void setSaleDate(String saleDate) throws ParseException {
		this.saleDate = saleDate!=null?(new SimpleDateFormat("dd/MM/yyyy")).parse(saleDate):null;
	}

	public Long getYear() {
		return this.year;
	}

	public void setYear(Long year) {
		this.year = year;
	}

	public Color getColor() {
		return this.color;
	}

	public void setColor(Color color) {
		this.color = color;
	}

	public StatusEnum getStatus() {
		return status;
	}

	public void setStatus(StatusEnum status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "Car [id=" + id + ", brand=" + brand + ", price=" + price + ", saleDate=" + saleDate + ", year=" + year
				+ ", color=" + color.toString() + ", status=" + status + "]";
	}
	
	

}