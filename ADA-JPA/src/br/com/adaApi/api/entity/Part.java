package br.com.adaApi.api.entity;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the "PART" database table.
 * 
 */
@Entity
@Table(name="PARTE")
@NamedQuery(name="Part.findAll", query="SELECT p FROM Part p")
public class Part implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String numero;
	
	private String des;

	public Part() {
	}

	public String getDes() {
		return this.des;
	}

	public void setDes(String des) {
		this.des = des;
	}

	public String getNumero() {
		return this.numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

}