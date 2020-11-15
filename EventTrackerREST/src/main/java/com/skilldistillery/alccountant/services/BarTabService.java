package com.skilldistillery.alccountant.services;

import java.util.List;

import com.skilldistillery.alccountant.entities.BarTab;

public interface BarTabService {
	List<BarTab> index();
	List<BarTab> findBarTabByLocationLike( String kw );
	BarTab show( int id );
	BarTab create( BarTab tab );
	BarTab update( int tabId , BarTab tab );
	boolean delete( int id );
}
