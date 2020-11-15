package com.skilldistillery.alccountant.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.alccountant.entities.BarTab;
import com.skilldistillery.alccountant.repositories.BarTabRepository;

@Service
public class BarTabServiceImpl implements BarTabService {
	
	@Autowired
	private BarTabRepository repo;

	@Override
	public List<BarTab> index() {
		return repo.findAll();
	}

	@Override
	public BarTab show(int id) {
		Optional<BarTab> tabOpt = repo.findById(id);
		return tabOpt.isPresent() ? tabOpt.get() : null;
	}

	@Override
	public BarTab create(BarTab tab) {
		return repo.saveAndFlush(tab);
	}

	@Override
	public BarTab update(int tabId, BarTab tab) {
		Optional<BarTab> tabOpt = repo.findById(tabId);
		BarTab managedTab = null;
		if ( tabOpt.isPresent() ) {
			managedTab = tabOpt.get();
			if ( tab.getLocation() != null ) { managedTab.setLocation( tab.getLocation() ); }
			repo.saveAndFlush(managedTab);
		}
		return managedTab;
	}

	@Override
	public boolean delete(int id) {
		boolean deleted = false;
		Optional<BarTab> tabOpt = repo.findById(id);
		if ( tabOpt.isPresent() ) {
			repo.deleteById(id);
			deleted = true;
		}
		return deleted;
	}

	@Override
	public List<BarTab> findBarTabByLocationLike(String kw) {
		return repo.findByLocationLike("%" + kw + "%");
	}

}
