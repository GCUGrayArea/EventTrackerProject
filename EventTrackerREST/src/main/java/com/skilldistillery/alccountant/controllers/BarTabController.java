package com.skilldistillery.alccountant.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.alccountant.entities.BarTab;
import com.skilldistillery.alccountant.services.BarTabService;

@RequestMapping("api")
@RestController
public class BarTabController {
	
	@Autowired
	private BarTabService svc;
	
	@GetMapping("tabs")
	public List<BarTab> index() {
		return svc.index();
	}
	
	@GetMapping("tabs/{id}")
	public BarTab show( @PathVariable Integer id ) {
		return svc.show(id);
	}
	
	@GetMapping("tabs/search/{kw}")
	public List<BarTab> tabsByLocationSearch( @PathVariable String kw ) {
		return svc.findBarTabByLocationLike(kw);
	}
	
	@PostMapping("tabs")
	public BarTab create( @RequestBody BarTab tab , HttpServletRequest request , HttpServletResponse response ) {
		try {
			tab = svc.create(tab);
			response.setStatus(201);
			StringBuffer url = request.getRequestURL();
			url.append("/").append(tab.getId());
			String urlstr = url.toString();
			response.setHeader("Location", urlstr);
		} catch ( Exception e ) {
			response.setStatus(400);
			tab = null;
		}
		return tab;
	}
	
	@PutMapping("tabs/{id}")
	public BarTab updateTab( @RequestBody BarTab tab , @PathVariable Integer id , HttpServletResponse response ) {
		try {
			tab = svc.update(id, tab);
			if (tab == null) {
				response.setStatus(404);
			}
		} catch (Exception e) {
			response.setStatus(400);
			tab = null;
		}
		return tab;
	}
	
	@DeleteMapping("tabs/{id}")
	public void delete( @PathVariable Integer id , HttpServletResponse response ) {
		try {
			boolean deleted = svc.delete( id );
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
