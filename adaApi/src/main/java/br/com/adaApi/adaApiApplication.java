package br.com.adaApi;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import br.com.adaApi.api.entity.User;
import br.com.adaApi.api.enums.ProfileEnum;
import br.com.adaApi.api.repository.UserRepository;

@SpringBootApplication
public class adaApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(adaApiApplication.class, args);
	}
	
	@Bean
	CommandLineRunner init(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		return args -> {
				initUsers(userRepository, passwordEncoder);
			};
	}
	
	private void initUsers(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		User admin = new User();
		admin.setEmail("admin@helpdesk.com");
		admin.setPassword(passwordEncoder.encode("123456"));
		admin.setProfile(ProfileEnum.ROLE_ADMIN);
		
		User find = userRepository.findByEmail("admin@helpdesk.com");
		if(find == null ) {
			userRepository.save(admin);
		}
	}
	
}
