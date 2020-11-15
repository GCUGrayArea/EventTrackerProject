package com.skilldistillery.alccountant.services;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.alccountant.entities.Drink;

public interface DrinkService {
	List<Drink> index();
	List<Drink> findDrinkByTabId( int id );
	Drink show( int id );
	Drink create( Drink drink );
	Drink update( int drinkId , Drink drink );
	@Modifying
	@Query( "DELETE FROM Drink d WHERE d.tab_id = :tid AND d.id = :did")
	boolean delete( @Param("did") int drinkId , @Param("tid") int tabId );
}
