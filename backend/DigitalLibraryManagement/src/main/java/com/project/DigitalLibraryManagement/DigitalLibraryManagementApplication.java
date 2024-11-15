package com.project.DigitalLibraryManagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DigitalLibraryManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(DigitalLibraryManagementApplication.class, args);
	}

}
