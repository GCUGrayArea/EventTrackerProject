package com.skilldistillery.alccountant;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan
@SpringBootApplication
public class EventTrackerRestApplication {

	public static void main(String[] args) {
		SpringApplication.run(EventTrackerRestApplication.class, args);
	}

}
