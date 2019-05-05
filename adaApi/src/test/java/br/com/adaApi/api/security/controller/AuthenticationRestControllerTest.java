package br.com.adaApi.api.security.controller;


import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.codehaus.jackson.map.ObjectMapper;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import br.com.adaApi.api.entity.User;
import br.com.adaApi.api.enums.ProfileEnum;
import br.com.adaApi.api.repository.UserRepository;
import br.com.adaApi.api.security.jwt.JwtAuthenticationRequest;
import br.com.adaApi.api.security.jwt.JwtTokenUtil;
import br.com.adaApi.api.security.jwt.JwtUser;
import br.com.adaApi.api.security.jwt.JwtUserFactory;
import br.com.adaApi.api.security.service.JwtUserDetailsServiceImpl;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
public class AuthenticationRestControllerTest {

	private MockMvc mvc;

    @Autowired
    private WebApplicationContext context;

    @MockBean
    private AuthenticationManager authenticationManager;

    @MockBean
    private JwtTokenUtil jwtTokenUtil;

    @MockBean
    private JwtUserDetailsServiceImpl jwtUserDetailsService;
    
    @Autowired
    private UserRepository userRepository;

    @Before
    public void setup() {
    	
        mvc = MockMvcBuilders
            .webAppContextSetup(context)
            .apply(springSecurity())
            .build();
    }
    
    @After
    public void finalize() {
    	userRepository.deleteAll();
    }

    @Test
    @WithAnonymousUser
    public void successfulAuthenticationWithAnonymousUser() throws Exception {

        JwtAuthenticationRequest jwtAuthenticationRequest = new JwtAuthenticationRequest("admin@helpdesk.com", "123456");

        mvc.perform(post("/api/auth")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(jwtAuthenticationRequest)))
            .andExpect(status().isOk());
    }


    @Test
    @WithMockUser(roles = "ADMIN")
    public void successfulRefreshTokenWithAdminRole() throws Exception {

        User user = new User();
        user.setId(0L);
        user.setEmail("admin@helpdesk.com");
        user.setPassword("123456");
        user.setProfile(ProfileEnum.ROLE_ADMIN);
        
        JwtUser jwtUser = JwtUserFactory.create(user);

        when(jwtTokenUtil.getUsernameFromToken(any())).thenReturn(user.getEmail());

        when(jwtUserDetailsService.loadUserByUsername(eq(user.getEmail()))).thenReturn(jwtUser);

        when(jwtTokenUtil.canTokenBeRefreshed(any())).thenReturn(true);

        mvc.perform(get("/api/refresh")
            .header("Authorization", "Bearer 5d1103e-b3e1-4ae9-b606-46c9c1bc915a"))
            .andExpect(status().isOk());
    }
    
    @Test
    @WithMockUser(roles = "ADMIN")
    public void successfulGetTokenAdminRole() throws Exception {

    	User user = new User();
        user.setId(0L);
        user.setEmail("admin@helpdesk.com");
        user.setPassword("123456");
        user.setProfile(ProfileEnum.ROLE_ADMIN);
        
        userRepository.save(user);
        
        JwtUser jwtUser = JwtUserFactory.create(user);

        when(jwtTokenUtil.getUsernameFromToken(any())).thenReturn(user.getEmail());

        when(jwtUserDetailsService.loadUserByUsername(eq(user.getEmail()))).thenReturn(jwtUser);

        when(jwtTokenUtil.canTokenBeRefreshed(any())).thenReturn(true);

        mvc.perform(get("/api/token")
            .header("Authorization", "Bearer 5d1103e-b3e1-4ae9-b606-46c9c1bc915a"))
            .andExpect(status().isOk());
    }
    
}
