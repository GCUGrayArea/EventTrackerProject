package com.skilldistillery.alccountant.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.alccountant.entities.BarTab;

public interface BarTabRepository extends JpaRepository< BarTab , Integer > {
	List<BarTab> findByLocationLike( String kw );
}
