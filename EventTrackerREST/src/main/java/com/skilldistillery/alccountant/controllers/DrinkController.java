package com.skilldistillery.alccountant.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.alccountant.entities.BarTab;
import com.skilldistillery.alccountant.entities.Drink;
import com.skilldistillery.alccountant.services.DrinkService;

@RequestMapping("api")
@CrossOrigin({"*" , "localhost:4200"})
@RestController
public class DrinkController {
	
	@Autowired
	private DrinkService svc;
	
	@GetMapping("tabs/{tid}/drinks/{id}")
	public Drink show( @PathVariable int tid , @PathVariable int id , HttpServletResponse response ) {
		Drink drink = svc.show(id);
		if ( drink != null && drink.getTab().getId() != tid ) {
			drink = null;
		}
		if ( drink == null ) {
			response.setStatus(404);
		}
		return drink;
	}
	
	@GetMapping("tabs/{id}/drinks")
	public List<Drink> drinksByTabId( @PathVariable Integer id ) {
		return svc.findDrinkByTabId(id);
	}
	
	@PostMapping("tabs/{tabId}/drinks")
	public Drink create(
			@RequestBody Drink drink ,
			@PathVariable Integer tabId ,
			HttpServletRequest request ,
			HttpServletResponse response ) {
		try {
			BarTab tab = new BarTab();
			tab.setId(tabId);
			drink.setTab(tab);
			drink = svc.create(drink);
			response.setStatus(201);
			StringBuffer url = request.getRequestURL();
			url.append("/").append(drink.getId());
			String urlstr = url.toString();
			response.setHeader("Location", urlstr);
		} catch ( Exception e ) {
			response.setStatus(400);
			drink = null;
		}
		return drink;
	}
	
	@PutMapping("tabs/{tabId}/drinks/{drinkId}")
	public Drink replaceDrink(
			@PathVariable Integer drinkId, 
			@RequestBody Drink drink,
			HttpServletResponse response) {
		try {
			drink = svc.update(drinkId, drink);
			if (drink == null) {
				response.setStatus(404);
			}
		} catch (Exception e) {
			response.setStatus(400);
			drink = null;
		}
		return drink;
	}
	
	@DeleteMapping("drinks/{drinkId}")
	public void deleteDrink(
			@PathVariable Integer drinkId ,
//			@PathVariable Integer tabId ,
			HttpServletResponse response
			) {
		try {
			boolean deleted = svc.delete(drinkId);//, tabId);
			if (deleted) {
				response.setStatus(204);
			}
			else {
				response.setStatus(404);			
			}
		} catch (Exception e) {
			response.setStatus(400);			
		}
	}
	
	
}
