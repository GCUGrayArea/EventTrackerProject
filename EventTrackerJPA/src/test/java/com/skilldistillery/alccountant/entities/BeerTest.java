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

import com.skilldistillery.alccountant.entities.Beer;

class BeerTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;

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
	void test() {
		Beer beer = em.find(Beer.class, 1);
		assertNotNull( beer );
		assertEquals( "A" , beer.getName() );
		assertEquals( "B", beer.getBrewery() );
		assertEquals( "C" , beer.getStyle() );
		assertEquals( 5.0 , beer.getAbv() );
		assertEquals( "D" , beer.getDescription() );
		beer = null;
	}

}
