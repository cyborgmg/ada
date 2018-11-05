package br.com.adaApi.api.entity;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import br.com.adaApi.api.enums.ProfileEnum;

import java.util.List;


/**
 * The persistent class for the "USER" database table.
 * 
 */
@Entity
@Table(name="USUARIO")
@NamedQuery(name="User.findAll", query="SELECT u FROM User u")
public class User implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="USER_ID_GENERATOR", sequenceName="USER_SQ", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="USER_ID_GENERATOR")
	private long id;

	@Column(unique=true)
	@NotBlank(message="Email requerido")
	@Email(message="Email inválido")
	private String email;

	private String password;

	@Column(name="PERFIL")
	private ProfileEnum profile;

	public User() {
	}

	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public ProfileEnum getProfile() {
		return this.profile;
	}

	public void setProfile(ProfileEnum profile) {
		this.profile = profile;
	}

}