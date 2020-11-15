package com.skilldistillery.alccountant.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.alccountant.entities.Drink;

public interface DrinkRepository extends JpaRepository<Drink, Integer> {
	List<Drink> findByTabId( int id );
}
