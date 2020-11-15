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

class DrinkTest {
	
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
	void test_mappings() {
		Drink drink = em.find(Drink.class , 1 );
		assertNotNull( drink );
		assertEquals( "Blue Hawaiian".toLowerCase() , drink.getName().toLowerCase() );
		assertEquals( 4.0 , drink.getPrice() );
		drink = null;
	}

}
