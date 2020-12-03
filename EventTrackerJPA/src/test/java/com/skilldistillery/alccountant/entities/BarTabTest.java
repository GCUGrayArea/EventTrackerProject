package com.skilldistillery.alccountant.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class BarTabTest {
	
	private static EntityManagerFactory emf;
	private static EntityManager em;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("BeerGuru");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
	}
	
	@Test
	void testMappings() {
		BarTab tab = em.find(BarTab.class, 1);
		assertNotNull( tab );
		assertEquals( "THE RUSTY SPUR".toLowerCase() , tab.getLocation().toLowerCase() );
		assertEquals( "2020" , tab.getCreatedAt().toString().substring( 0 , 4 ) );
		tab = null;
	}
	

}
