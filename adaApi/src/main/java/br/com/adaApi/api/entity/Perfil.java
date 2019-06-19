package br.com.adaApi.api.entity;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the PERFIL database table.
 * 
 */
@Entity
@NamedQuery(name="Perfil.findAll", query="SELECT p FROM Perfil p")
public class Perfil implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="PERFIL_ID_GENERATOR", sequenceName="User_SQ")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="PERFIL_ID_GENERATOR")
	private long id;

	private String nome;

	//bi-directional many-to-many association to User
	@ManyToMany
	@JoinTable(
		name="USER_PERFIL"
		, joinColumns={
			@JoinColumn(name="ID_PERFIL")
			}
		, inverseJoinColumns={
			@JoinColumn(name="ID_USER")
			}
		)
	private List<User> users;

	public Perfil() {
	}

	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNome() {
		return this.nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public List<User> getUsers() {
		return this.users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

}