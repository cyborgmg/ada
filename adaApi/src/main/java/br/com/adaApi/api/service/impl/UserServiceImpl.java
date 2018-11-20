package br.com.adaApi.api.service.impl;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.adaApi.api.entity.User;
import br.com.adaApi.api.enums.ProfileEnum;
import br.com.adaApi.api.repository.UserRepository;
import br.com.adaApi.api.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public User findByEmail(String email) {
		// TODO Auto-generated method stub
		return userRepository.findByEmail(email);
	}

	@Override
	public User createOrUpdate(User user) {
		User u = userRepository.save(user);
		u.setPassword(null);
		return u;
	}

	@Override
	public User findById(Long id) {
		// TODO Auto-generated method stub
		return userRepository.findById(id).get();
	}

	@Override
	public void delete(Long id) {
		// TODO Auto-generated method stub
		userRepository.deleteById(id);
	}

	@Override
	public Page<User> findAll(int page, int count) {
		// TODO Auto-generated method stub
		return userRepository.findAll((Pageable) new PageRequest(page, count));
	}
	
	@Override
	public List<User> findUserParams(String email, ProfileEnum profile){
		
		String semail = ((email!=null)&&(!email.isEmpty()))?email:"";
		String sprofile = (profile!=null)?profile.name():"";
		
		List<User> users = userRepository.findUserParams(semail, sprofile);
		
		users.forEach( (User user) -> {
			user.setPassword(null);
		});
		
	return users;	
	}

}
