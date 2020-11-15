package com.skilldistillery.alccountant.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.skilldistillery.alccountant.entities.BarTab;
import com.skilldistillery.alccountant.entities.Drink;
import com.skilldistillery.alccountant.repositories.DrinkRepository;

@Service
public class DrinkServiceImpl implements DrinkService {
	
	@Autowired
	private DrinkRepository repo;

	@Override
	public List<Drink> index() {
		return repo.findAll();
	}

	@Override
	public Drink show(int id) {
		Optional<Drink> drinkOpt = repo.findById(id);
		return drinkOpt.isPresent() ? drinkOpt.get() : null;
	}

	@Override
	public Drink create(Drink drink) {
		return repo.saveAndFlush(drink);
	}

	@Override
	public Drink update(int drinkId, Drink drink) {
		Optional<Drink> drinkOpt = repo.findById(drinkId);
		Drink managedDrink = null;
		if ( drinkOpt.isPresent() ) {
			managedDrink = drinkOpt.get();
			if ( drink.getPrice() != null ) { managedDrink.setPrice( drink.getPrice() ); }
			if ( drink.getName() != null ) { managedDrink.setName( drink.getName() ); }
			if ( drink.getTab() != null ) {
				BarTab tab = new BarTab();
				tab.setId( drink.getTab().getId() );
				managedDrink.setTab(tab);
			}
			repo.saveAndFlush(managedDrink);
		}
		return managedDrink;
	}

	@Override
	@Modifying
	@Query( "DELETE FROM Drink d WHERE d.tab_id = :tid AND d.id = :did")
	public boolean delete(int drinkId, int tabId) {
		try {
			repo.deleteById(drinkId);
		} catch ( Exception e ) {
			return false;
		}
		return true;
	}

	@Override
	public List<Drink> findDrinkByTabId(int id) {
		return repo.findByTabId(id);
	}

}
