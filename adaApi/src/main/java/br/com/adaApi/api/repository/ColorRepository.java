package br.com.adaApi.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.adaApi.api.entity.Color;

public interface ColorRepository extends JpaRepository<Color, Long> {
}
