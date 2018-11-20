package br.com.adaApi.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.adaApi.api.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	public User findByEmail(String email);
	
	@Query("from User u where u.email like :email ||'%' and u.profile like :profile ||'%'")
	public List<User> findUserParams(@Param("email") String email, @Param("profile") String profile);

}
