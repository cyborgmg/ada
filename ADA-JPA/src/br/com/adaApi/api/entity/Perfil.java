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
	@SequenceGenerator(name="PERFIL_ID_GENERATOR", sequenceName="USUARIO_SQ")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="PERFIL_ID_GENERATOR")
	private long id;

	private String nome;

	//bi-directional many-to-many association to Usuario
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
	private List<Usuario> usuarios;

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

	public List<Usuario> getUsuarios() {
		return this.usuarios;
	}

	public void setUsuarios(List<Usuario> usuarios) {
		this.usuarios = usuarios;
	}

}