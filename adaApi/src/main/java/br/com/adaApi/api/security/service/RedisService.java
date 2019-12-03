/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.adaApi.api.security.service;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import redis.clients.jedis.Jedis;

/**
 *
 * @author Narayan <me@ngopal.com.np>
 */
//@Order(Ordered.HIGHEST_PRECEDENCE)
//@Service("redisService")
//@Slf4j
@Component
public class RedisService {
	
	@Value("${redis.host}")
	private String host;
	
	@Value("${redis.port}")
	private Integer port;
	
	@Value("${redis.pass}")
	private String pass;

	private Jedis jedis;
	
	@PostConstruct
	public void init() {
		jedis = new Jedis(host,port); 
		jedis.auth(pass);
	}

	public Jedis getJedis() {
		return jedis;
	}

}
