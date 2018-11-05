package br.com.adaApi.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.adaApi.api.entity.User;

public interface UserRepository extends JpaRepository<User, String> {
	
	public User findByEmail(String email);

}
