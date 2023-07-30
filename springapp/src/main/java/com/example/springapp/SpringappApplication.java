package com.example.springapp;
// package main.java.com.example.springapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping; 
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class SpringappApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringappApplication.class, args);
    }

}
